// ─────────────────────────────────────────────────────────────────────────────
// AC_RALLY_CAR_OVERRIDES — Rangos por coche para Assetto Corsa Rally
// ─────────────────────────────────────────────────────────────────────────────

const UNIVERSAL = {
    tyrePressureMin: 140,
    tyrePressureMax: 260,
    springMin: 60,
    springMax: 200,
    damperMin: 3,
    damperMax: 20,
    arbMin: 0,
    arbMax: 25,
    heightMin: 120,
    heightMax: 280,
    brakeBiasMin: 30,
    brakeBiasMax: 75,
    brakePressureMin: 0.8,
    brakePressureMax: 3.0,
    camberMin: -3.0,
    camberMax: 1.0,
    toeMin: -1.5,
    toeMax: 1.5,
    ratioMin: 3.0,
    ratioMax: 6.5,
    diffLockMin: 0,
    diffLockMax: 100,
};

const AC_RALLY_CAR_OVERRIDES = {
    // Modern Rally
    hyundai_i20_wrc: {
        tyrePressureMin: 150, tyrePressureMax: 250,
        springMin: 75, springMax: 190,
        brakeBiasMin: 35, brakeBiasMax: 70,
        ratioMin: 3.5, ratioMax: 6.0,
    },
    toyota_yaris_gr_wrc: {
        tyrePressureMin: 150, tyrePressureMax: 250,
        springMin: 75, springMax: 190,
        brakeBiasMin: 35, brakeBiasMax: 70,
    },
    ford_fiesta_wrc: {
        tyrePressureMin: 150, tyrePressureMax: 250,
        springMin: 75, springMax: 185,
        brakeBiasMin: 36, brakeBiasMax: 71,
    },

    // Historic Rally (1980s-1990s)
    audi_s1_e2_rally: {
        tyrePressureMin: 160, tyrePressureMax: 260,
        springMin: 80, springMax: 200,
        brakeBiasMin: 40, brakeBiasMax: 75,
        ratioMin: 3.2, ratioMax: 6.0,
    },
    lancia_delta_hf_integrale_rally: {
        tyrePressureMin: 160, tyrePressureMax: 260,
        springMin: 80, springMax: 200,
        brakeBiasMin: 40, brakeBiasMax: 75,
    },
    ford_escort_cosworth_rally: {
        tyrePressureMin: 160, tyrePressureMax: 260,
        springMin: 80, springMax: 195,
        brakeBiasMin: 42, brakeBiasMax: 77,
    },

    // Classic Rally (1970s-1980s)
    fiat_131_rally: {
        tyrePressureMin: 170, tyrePressureMax: 270,
        springMin: 85, springMax: 205,
        brakeBiasMin: 45, brakeBiasMax: 80,
        ratioMin: 4.0, ratioMax: 6.5,
    },
    lancia_stratos_rally: {
        tyrePressureMin: 170, tyrePressureMax: 270,
        springMin: 85, springMax: 205,
        brakeBiasMin: 45, brakeBiasMax: 80,
    },
};

export function getCarOverride(carId) {
    if (!carId) return null;
    const override = AC_RALLY_CAR_OVERRIDES[carId];
    return override ? { ...UNIVERSAL, ...override } : UNIVERSAL;
}
