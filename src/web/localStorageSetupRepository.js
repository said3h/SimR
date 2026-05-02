import { SetupRepository } from '../core/repository.js';

const STORAGE_KEY = 'sr_vault_setups_v2';

export class LocalStorageSetupRepository extends SetupRepository {
    async _read() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    }

    async _write(setups) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(setups));
    }

    async getAll() {
        return this._read();
    }

    async getById(id) {
        const setups = await this._read();
        return setups.find(s => s.id === id) || null;
    }

    async create(setup) {
        const setups = await this._read();
        setups.push(setup);
        await this._write(setups);
        return setup;
    }

    async update(id, patch) {
        const setups = await this._read();
        const idx = setups.findIndex(s => s.id === id);
        if (idx === -1) throw new Error(`Setup ${id} no encontrado`);
        setups[idx] = { ...setups[idx], ...patch, id, updatedAt: new Date().toISOString() };
        await this._write(setups);
        return setups[idx];
    }

    async delete(id) {
        const setups = await this._read();
        await this._write(setups.filter(s => s.id !== id));
    }

    async bulkDelete(ids) {
        const setups = await this._read();
        await this._write(setups.filter(s => !ids.includes(s.id)));
    }

    async importBatch(incoming) {
        const existing = await this._read();
        const existingIds = new Set(existing.map(s => s.id));

        const toCreate = [];
        const results = { created: 0, duplicates: 0, rejected: 0 };

        for (const raw of incoming) {
            if (!raw || typeof raw !== 'object') {
                results.rejected++;
                continue;
            }
            if (existingIds.has(raw.id)) {
                results.duplicates++;
                continue;
            }
            toCreate.push(raw);
            existingIds.add(raw.id);
            results.created++;
        }

        await this._write([...existing, ...toCreate]);
        return results;
    }

    async exportAll() {
        return this._read();
    }
}

export const setupRepository = new LocalStorageSetupRepository();
