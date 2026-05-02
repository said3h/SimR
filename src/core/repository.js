/**
 * Platform-neutral persistence contract for setups.
 *
 * Web, React Native, and future backends should implement this same interface.
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
