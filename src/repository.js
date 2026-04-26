/**
 * SetupRepository — Interfaz abstracta para el acceso a datos de setups.
 *
 * Patrón Adapter: toda la app habla con SetupRepository (interfaz).
 * LocalSetupRepository implementa localStorageHOY.
 * Mañana, FirebaseSetupRepository implementa la MISMA interfaz
 * y se sustituye sin tocar nada más.
 *
 * MÉTODOS OBLIGATORIOS QUE DEBE IMPLEMENTAR cualquier adaptador:
 *   getAll()             → Promise<Setup[]>
 *   getById(id)          → Promise<Setup|null>
 *   create(setup)        → Promise<Setup>
 *   update(id, patch)    → Promise<Setup>
 *   delete(id)           → Promise<void>
 *   bulkDelete(ids)      → Promise<void>
 *   importBatch(setups)  → Promise<{created, updated, rejected}>
 *   exportAll()          → Promise<Setup[]>
 */
export class SetupRepository {
    async getAll() { throw new Error('Not implemented'); }
    async getById(id) { throw new Error('Not implemented'); }
    async create(setup) { throw new Error('Not implemented'); }
    async update(id, patch) { throw new Error('Not implemented'); }
    async delete(id) { throw new Error('Not implemented'); }
    async bulkDelete(ids) { throw new Error('Not implemented'); }
    async importBatch(setups) { throw new Error('Not implemented'); }
    async exportAll() { throw new Error('Not implemented'); }
}

const STORAGE_KEY = 'sr_vault_setups_v2';

export class LocalSetupRepository extends SetupRepository {
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

// Instancia por defecto (localStorage)
export const setupRepository = new LocalSetupRepository();
