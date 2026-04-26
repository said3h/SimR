export const SETUP_TEMPLATE_VERSION = '1.0';

export const VALID_WEATHER_TYPES = ['dry', 'wet', 'mixed'];
export const VALID_SESSION_TYPES = ['Qualy', 'Race', 'Practice', 'Hotlap', 'Custom'];

export function validateSetupPayload(payload, isUpdate = false) {
    const errors = [];

    if (!isUpdate) {
        if (!payload.gameId) errors.push('gameId es obligatorio');
        if (!payload.carName || !payload.carName.trim()) errors.push('carName es obligatorio');
    }

    if (payload.weatherType && !VALID_WEATHER_TYPES.includes(payload.weatherType)) {
        errors.push(`weatherType inválido: ${payload.weatherType}. Válidos: ${VALID_WEATHER_TYPES.join(', ')}`);
    }

    if (payload.sessionType && !VALID_SESSION_TYPES.includes(payload.sessionType)) {
        errors.push(`sessionType inválido: ${payload.sessionType}. Válidos: ${VALID_SESSION_TYPES.join(', ')}`);
    }

    if (payload.setupName !== undefined && typeof payload.setupName !== 'string') {
        errors.push('setupName debe ser string');
    }

    if (payload.isFavorite !== undefined && typeof payload.isFavorite !== 'boolean') {
        errors.push('isFavorite debe ser boolean');
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

export function normalizeImportedSetup(raw) {
    return {
        id: raw.id || generateId(),
        gameId: raw.gameId || 'unknown',
        gameName: raw.gameName || raw.gameId || 'Unknown',
        carId: raw.carId || null,
        carName: raw.carName || raw.car || 'Unknown',
        category: raw.category || null,
        track: raw.track || '',
        weatherType: VALID_WEATHER_TYPES.includes(raw.weatherType) ? raw.weatherType : 'dry',
        sessionType: VALID_SESSION_TYPES.includes(raw.sessionType) ? raw.sessionType : 'Custom',
        setupName: raw.setupName || raw.name || 'Untitled Setup',
        notes: raw.notes || '',
        isFavorite: Boolean(raw.isFavorite),
        createdAt: raw.createdAt || new Date().toISOString(),
        updatedAt: raw.updatedAt || new Date().toISOString(),
        templateVersion: raw.templateVersion || SETUP_TEMPLATE_VERSION,
        setupData: raw.setupData || raw.params || {},
        hardwareProfile: raw.hardwareProfile || null,
        tags: Array.isArray(raw.tags) ? raw.tags : []
    };
}

export function generateId() {
    return `setup_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}
