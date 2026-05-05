// ─────────────────────────────────────────────────────────────────────────────
// RBR_CAR_OVERRIDES — Rangos por coche para Richard Burns Rally
// ─────────────────────────────────────────────────────────────────────────────

const UNIVERSAL = {
    ratioMin: 3.0,
    ratioMax: 6.0,
    diffLockMin: 0,
    diffLockMax: 100,
    springMin: 60,
    springMax: 200,
    damperMin: 3,
    damperMax: 20,
    arbMin: 0,
    arbMax: 30,
    heightMin: 100,
    heightMax: 250,
    brakeBiasMin: 30,
    brakeBiasMax: 70,
    brakePressureMin: 0.8,
    brakePressureMax: 3.0,
    tyrePressureMin: 140,
    tyrePressureMax: 250,
    camberMin: -3.0,
    camberMax: 1.0,
    toeMin: -1.0,
    toeMax: 1.0,
};

const RBR_CAR_OVERRIDES = {
    // Modern WRC
    toyota_gr_yaris_2023: {
        ratioMin: 3.5, ratioMax: 5.5,
        diffLockMin: 0, diffLockMax: 100,
        springMin: 70, springMax: 190,
        brakeBiasMin: 35, brakeBiasMax: 65,
    },
    hyundai_i20_n_2023: {
        ratioMin: 3.5, ratioMax: 5.5,
        springMin: 70, springMax: 190,
        brakeBiasMin: 35, brakeBiasMax: 65,
    },
    // 1990s WRC
    ford_escort_cosworth: {
        ratioMin: 3.8, ratioMax: 6.0,
        springMin: 80, springMax: 200,
        brakeBiasMin: 40, brakeBiasMax: 70,
    },
    lancia_delta_hf_integrale: {
        ratioMin: 3.8, ratioMax: 6.0,
        springMin: 80, springMax: 200,
        brakeBiasMin: 40, brakeBiasMax: 70,
    },
    // Group B
    audi_s1_e2: {
        ratioMin: 3.2, ratioMax: 5.8,
        springMin: 75, springMax: 195,
        brakeBiasMin: 38, brakeBiasMax: 68,
    },
    // Classic
    opel_kadett_gt_e: {
        ratioMin: 4.0, ratioMax: 6.2,
        springMin: 60, springMax: 180,
        brakeBiasMin: 45, brakeBiasMax: 75,
    },
};

export function getCarOverride(carId) {
    if (!carId) return null;
    const override = RBR_CAR_OVERRIDES[carId];
    return override ? { ...UNIVERSAL, ...override } : UNIVERSAL;
}
