export const SETUP_TEMPLATE_VERSION = '1.0';

export const VALID_WEATHER_TYPES = ['dry', 'wet', 'mixed'];
export const VALID_SESSION_TYPES = ['Qualy', 'Race', 'Practice', 'Hotlap', 'Custom'];

const MAX_TEXT_LENGTH = 5000;
const MAX_TAG_LENGTH = 40;
const MAX_TAGS = 20;

function cleanString(value, fallback = '') {
    if (typeof value !== 'string') return fallback;
    return value.trim().slice(0, MAX_TEXT_LENGTH);
}

function cleanRating(value) {
    const rating = Number.parseInt(value, 10);
    if (!Number.isFinite(rating)) return 0;
    return Math.min(5, Math.max(0, rating));
}

function cleanTags(tags) {
    if (!Array.isArray(tags)) return [];
    return tags
        .filter(tag => typeof tag === 'string')
        .map(tag => tag.trim().slice(0, MAX_TAG_LENGTH))
        .filter(Boolean)
        .slice(0, MAX_TAGS);
}

function cleanVersions(versions) {
    if (!Array.isArray(versions)) return [];
    return versions
        .filter(version => version && typeof version === 'object' && !Array.isArray(version))
        .map((version, index) => ({
            v: Number.isFinite(Number(version.v)) ? Number(version.v) : index + 1,
            ts: cleanString(version.ts) || new Date().toISOString(),
            gameVersion: cleanString(version.gameVersion),
            platform: cleanString(version.platform),
            setupData: version.setupData && typeof version.setupData === 'object' && !Array.isArray(version.setupData)
                ? version.setupData
                : {}
        }));
}

export function validateSetupPayload(payload, isUpdate = false) {
    const errors = [];

    if (!isUpdate) {
        if (!payload.gameId) errors.push('gameId es obligatorio');
        if (!payload.carName || !payload.carName.trim()) errors.push('carName es obligatorio');
    }

    if (payload.weatherType && !VALID_WEATHER_TYPES.includes(payload.weatherType)) {
        errors.push(`weatherType invalido: ${payload.weatherType}. Validos: ${VALID_WEATHER_TYPES.join(', ')}`);
    }

    if (payload.sessionType && !VALID_SESSION_TYPES.includes(payload.sessionType)) {
        errors.push(`sessionType invalido: ${payload.sessionType}. Validos: ${VALID_SESSION_TYPES.join(', ')}`);
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
    const now = new Date().toISOString();
    const setupData = raw.setupData && typeof raw.setupData === 'object' && !Array.isArray(raw.setupData)
        ? raw.setupData
        : (raw.params && typeof raw.params === 'object' && !Array.isArray(raw.params) ? raw.params : {});

    return {
        id: cleanString(raw.id) || generateId(),
        gameId: cleanString(raw.gameId, 'unknown') || 'unknown',
        gameName: cleanString(raw.gameName || raw.gameId, 'Unknown') || 'Unknown',
        carId: cleanString(raw.carId) || null,
        carName: cleanString(raw.carName || raw.car, 'Unknown') || 'Unknown',
        category: cleanString(raw.category) || null,
        track: cleanString(raw.track),
        weatherType: VALID_WEATHER_TYPES.includes(raw.weatherType) ? raw.weatherType : 'dry',
        sessionType: VALID_SESSION_TYPES.includes(raw.sessionType) ? raw.sessionType : 'Custom',
        setupName: cleanString(raw.setupName || raw.name, 'Untitled Setup') || 'Untitled Setup',
        notes: cleanString(raw.notes),
        rating: cleanRating(raw.rating),
        gameVersion: cleanString(raw.gameVersion),
        platform: cleanString(raw.platform),
        isFavorite: Boolean(raw.isFavorite),
        isPublic: Boolean(raw.isPublic),
        createdAt: cleanString(raw.createdAt) || now,
        updatedAt: cleanString(raw.updatedAt) || now,
        templateVersion: cleanString(raw.templateVersion) || SETUP_TEMPLATE_VERSION,
        setupData,
        hardwareProfile: raw.hardwareProfile && typeof raw.hardwareProfile === 'object' && !Array.isArray(raw.hardwareProfile)
            ? raw.hardwareProfile
            : null,
        tags: cleanTags(raw.tags),
        versions: cleanVersions(raw.versions)
    };
}

export function generateId() {
    return `setup_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}
