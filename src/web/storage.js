/**
 * @deprecated — ESTE ARCHIVO NO FORMA PARTE DEL FLUJO ACTUAL.
 *
 * Fue la primera capa de almacenamiento (localStorage directo).
 * Reemplazado por:
 *   - src/repository.js   → SetupRepository + LocalSetupRepository
 *   - src/setupService.js → SetupService (usa repository)
 *
 * NO se usa en ningún lugar de la app actual.
 * NO eliminar todavía. Se eliminará tras período de confirmación.
 */

const STORAGE_KEY = 'sim_setup_pro_data';

export const Storage = {
    saveSetup(setup) {
        const setups = this.getSetups();
        const index = setups.findIndex(s => s.id === setup.id);
        
        if (index > -1) {
            setups[index] = setup;
        } else {
            setups.push(setup);
        }
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(setups));
    },

    getSetups() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    getSetupById(id) {
        return this.getSetups().find(s => s.id === id);
    },

    deleteSetup(id) {
        const setups = this.getSetups().filter(s => s.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(setups));
    },

    exportSetups() {
        const data = localStorage.getItem(STORAGE_KEY);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sim_setups_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
    }
};
