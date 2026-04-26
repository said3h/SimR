export const SORT_OPTIONS = {
    UPDATED_DESC: 'updatedAt_desc',
    CREATED_DESC: 'createdAt_desc',
    NAME_ASC: 'name_asc',
    GAME_ASC: 'game_asc',
    FAVORITE_FIRST: 'favorite_first'
};

export function sortSetups(setups, sortKey) {
    const sorted = [...setups];

    switch (sortKey) {
        case SORT_OPTIONS.UPDATED_DESC:
            return sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        case SORT_OPTIONS.CREATED_DESC:
            return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        case SORT_OPTIONS.NAME_ASC:
            return sorted.sort((a, b) => (a.setupName || a.carName || '').localeCompare(b.setupName || b.carName || ''));

        case SORT_OPTIONS.GAME_ASC:
            return sorted.sort((a, b) => (a.gameName || '').localeCompare(b.gameName || ''));

        case SORT_OPTIONS.FAVORITE_FIRST:
            return sorted.sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));

        default:
            return sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }
}

export function filterSetups(setups, criteria = {}) {
    let result = [...setups];

    if (criteria.gameId) {
        result = result.filter(s => s.gameId === criteria.gameId);
    }

    if (criteria.carName) {
        const q = criteria.carName.toLowerCase();
        result = result.filter(s => (s.carName || '').toLowerCase().includes(q));
    }

    if (criteria.track) {
        const q = criteria.track.toLowerCase();
        result = result.filter(s => (s.track || '').toLowerCase().includes(q));
    }

    if (criteria.weatherType) {
        result = result.filter(s => s.weatherType === criteria.weatherType);
    }

    if (criteria.sessionType) {
        result = result.filter(s => s.sessionType === criteria.sessionType);
    }

    if (criteria.favorite === true) {
        result = result.filter(s => s.isFavorite === true);
    }

    if (criteria.tags && criteria.tags.length > 0) {
        result = result.filter(s =>
            criteria.tags.some(tag => (s.tags || []).includes(tag))
        );
    }

    if (criteria.search) {
        const q = criteria.search.toLowerCase();
        result = result.filter(s =>
            (s.setupName || '').toLowerCase().includes(q) ||
            (s.carName || '').toLowerCase().includes(q) ||
            (s.track || '').toLowerCase().includes(q) ||
            (s.notes || '').toLowerCase().includes(q) ||
            (s.gameName || '').toLowerCase().includes(q)
        );
    }

    return result;
}

export function applySortAndFilter(setups, criteria = {}) {
    const filtered = filterSetups(setups, criteria);
    return sortSetups(filtered, criteria.sortBy || SORT_OPTIONS.UPDATED_DESC);
}
