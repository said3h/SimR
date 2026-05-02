import { SetupServiceClass, SORT_OPTIONS } from '../core/setupService.js';
import { setupRepository } from './localStorageSetupRepository.js';

class WebSetupServiceClass extends SetupServiceClass {
    async exportSetups(filterCriteria = {}, filename = null) {
        const payload = await this.createExportPayload(filterCriteria);
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || `sr_vault_setups_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);

        return { exported: payload.count };
    }
}

export const SetupService = new WebSetupServiceClass(setupRepository);
export { SORT_OPTIONS };
