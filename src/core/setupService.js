import { applySortAndFilter, sortSetups, SORT_OPTIONS } from './filters.js';
import {
    generateId,
    SETUP_TEMPLATE_VERSION,
    validateSetupPayload,
    normalizeImportedSetup
} from './utils.js';

export class SetupServiceClass {
    constructor(repo) {
        this._repo = repo;
    }

    async getAll(filters = {}) {
        const all = await this._repo.getAll();
        return applySortAndFilter(all, filters);
    }

    async getAllRaw() {
        return this._repo.getAll();
    }

    async getById(id) {
        return this._repo.getById(id);
    }

    async create(payload) {
        const validation = validateSetupPayload(payload);
        if (!validation.valid) {
            throw new Error(`Validación fallida: ${validation.errors.join(', ')}`);
        }

        const template = payload.template || null;
        const now = new Date().toISOString();

        const setup = {
            id: generateId(),
            gameId: payload.gameId,
            gameName: payload.gameName || payload.gameId,
            carId: payload.carId || null,
            carName: payload.carName,
            category: payload.category || null,
            track: payload.track || '',
            weatherType: payload.weatherType || 'dry',
            sessionType: payload.sessionType || 'Custom',
            setupName: payload.setupName || `${payload.carName} @ ${payload.track}`,
            notes: payload.notes || '',
            rating: payload.rating || 0,
            gameVersion: payload.gameVersion || '',
            platform: payload.platform || '',
            isFavorite: false,
            createdAt: now,
            updatedAt: now,
            templateVersion: SETUP_TEMPLATE_VERSION,
            setupData: payload.setupData || {},
            hardwareProfile: payload.hardwareProfile || null,
            tags: payload.tags || [],
            versions: [{
                v: 1,
                ts: now,
                gameVersion: payload.gameVersion || '',
                platform: payload.platform || '',
                setupData: JSON.parse(JSON.stringify(payload.setupData || {}))
            }]
        };

        return this._repo.create(setup);
    }

    async update(id, payload) {
        const existing = await this._repo.getById(id);
        if (!existing) throw new Error(`Setup ${id} no encontrado`);

        const validation = validateSetupPayload({ ...existing, ...payload }, true);
        if (!validation.valid) {
            throw new Error(`Validación fallida: ${validation.errors.join(', ')}`);
        }

        const now = new Date().toISOString();
        const prevVersions = existing.versions || [];
        const newVersionNum = (prevVersions.length > 0 ? Math.max(...prevVersions.map(v => v.v)) : 0) + 1;
        const newVersion = {
            v: newVersionNum,
            ts: now,
            gameVersion: payload.gameVersion || existing.gameVersion || '',
            platform: payload.platform || existing.platform || '',
            setupData: JSON.parse(JSON.stringify(payload.setupData || {}))
        };

        const updated = {
            ...existing,
            ...payload,
            id: existing.id,
            createdAt: existing.createdAt,
            updatedAt: now,
            templateVersion: SETUP_TEMPLATE_VERSION,
            versions: [...prevVersions, newVersion]
        };

        return this._repo.update(id, updated);
    }

    async delete(id) {
        return this._repo.delete(id);
    }

    async bulkDelete(ids) {
        return this._repo.bulkDelete(ids);
    }

    async duplicate(id) {
        const original = await this._repo.getById(id);
        if (!original) throw new Error(`Setup ${id} no encontrado para duplicar`);

        const all = await this._repo.getAll();
        const base = original.setupName || original.carName || 'Copy';

        const copyRegex = /^(.+?)\s*\(Copy(\s+(\d+))?\)$/;
        const existingNames = new Set(all.map(s => s.setupName || s.carName));

        let newName = `${base} (Copy)`;
        if (existingNames.has(newName)) {
            const copies = all
                .map(s => {
                    const m = (s.setupName || s.carName || '').match(copyRegex);
                    if (!m) return null;
                    return { base: m[1], num: m[3] ? parseInt(m[3]) : 1 };
                })
                .filter(Boolean);

            const sameBase = copies.filter(c => c.base === base);
            const maxNum = sameBase.reduce((max, c) => Math.max(max, c.num), 1);
            newName = `${base} (Copy ${maxNum + 1})`;
        }

        const now = new Date().toISOString();
        const duplicate = {
            ...original,
            id: generateId(),
            setupName: newName,
            isFavorite: false,
            createdAt: now,
            updatedAt: now,
            setupData: { ...original.setupData },
            versions: [{
                v: 1,
                ts: now,
                gameVersion: original.gameVersion || '',
                platform: original.platform || '',
                setupData: JSON.parse(JSON.stringify(original.setupData))
            }]
        };

        return this._repo.create(duplicate);
    }

    async toggleFavorite(id) {
        const setup = await this._repo.getById(id);
        if (!setup) throw new Error(`Setup ${id} no encontrado`);
        return this._repo.update(id, { isFavorite: !setup.isFavorite });
    }

    async createExportPayload(filterCriteria = {}) {
        const all = await this._repo.getAll();
        const filtered = applySortAndFilter(all, filterCriteria);

        return {
            version: SETUP_TEMPLATE_VERSION,
            exportedAt: new Date().toISOString(),
            count: filtered.length,
            setups: filtered
        };
    }

    async importSetups(jsonString, strategy = 'skip') {
        let parsed;
        try {
            parsed = JSON.parse(jsonString);
        } catch {
            return { success: false, reason: 'JSON inválido', created: 0, duplicates: 0, rejected: 1 };
        }

        let incoming = [];
        if (Array.isArray(parsed)) {
            incoming = parsed;
        } else if (parsed && Array.isArray(parsed.setups)) {
            incoming = parsed.setups;
        } else if (parsed && typeof parsed === 'object') {
            incoming = [parsed];
        }

        if (incoming.length === 0) {
            return { success: false, reason: 'No se encontraron setups válidos en el archivo', created: 0, duplicates: 0, rejected: 0 };
        }

        const normalized = incoming
            .map(s => {
                try {
                    return normalizeImportedSetup(s);
                } catch {
                    return null;
                }
            })
            .filter(Boolean);

        if (strategy === 'replace') {
            const all = await this._repo.getAll();
            const incomingIds = new Set(normalized.map(s => s.id));
            const toDelete = all.filter(s => incomingIds.has(s.id)).map(s => s.id);
            if (toDelete.length > 0) {
                await this._repo.bulkDelete(toDelete);
            }
        }

        const result = await this._repo.importBatch(normalized);
        return {
            success: true,
            created: result.created,
            duplicates: result.duplicates,
            rejected: result.rejected,
            total: normalized.length
        };
    }

    async getStats() {
        const all = await this._repo.getAll();
        const byGame = {};
        const byWeather = {};
        let favorites = 0;

        for (const s of all) {
            byGame[s.gameId] = (byGame[s.gameId] || 0) + 1;
            byWeather[s.weatherType] = (byWeather[s.weatherType] || 0) + 1;
            if (s.isFavorite) favorites++;
        }

        return {
            total: all.length,
            byGame,
            byWeather,
            favorites
        };
    }

    async getAllTags() {
        const all = await this._repo.getAll();
        const tagSet = new Set();
        for (const s of all) {
            for (const tag of s.tags || []) {
                tagSet.add(tag);
            }
        }
        return [...tagSet].sort();
    }
}

export { SORT_OPTIONS };
