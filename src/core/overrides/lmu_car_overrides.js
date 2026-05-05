// ─────────────────────────────────────────────────────────────────────────────
// LMU_CAR_OVERRIDES — Rangos por coche para Le Mans Ultimate (FIA WEC)
// ─────────────────────────────────────────────────────────────────────────────

const UNIVERSAL = {
    tyrePressureMin: 16.0,
    tyrePressureMax: 38.0,
    tyrePressureStep: 0.1,
    springMin: 50,
    springMax: 350,
    damperMin: 5,
    damperMax: 30,
    arbMin: 0,
    arbMax: 80,
    heightMin: 30,
    heightMax: 200,
    brakeBiasMin: 30,
    brakeBiasMax: 75,
    brakeDuctMin: 0,
    brakeDuctMax: 10,
    camberMin: -4.0,
    camberMax: 0.5,
    toeMin: -1.0,
    toeMax: 1.0,
    wingMin: 0,
    wingMax: 150,
    diffPreloadMin: 0,
    diffPreloadMax: 100,
    ratioMin: 2.5,
    ratioMax: 6.0,
};

const LMU_CAR_OVERRIDES = {
    // Hypercars
    porsche_963: {
        tyrePressureMin: 18.0, tyrePressureMax: 36.0,
        springMin: 70, springMax: 320,
        brakeBiasMin: 35, brakeBiasMax: 70,
        ratioMin: 3.0, ratioMax: 5.5,
    },
    ferrari_499p: {
        tyrePressureMin: 17.0, tyrePressureMax: 35.0,
        springMin: 65, springMax: 310,
        brakeBiasMin: 36, brakeBiasMax: 71,
    },
    toyota_gr010: {
        tyrePressureMin: 19.0, tyrePressureMax: 37.0,
        springMin: 75, springMax: 330,
        brakeBiasMin: 34, brakeBiasMax: 69,
    },

    // LMP2
    oreca_07_hybrid: {
        tyrePressureMin: 17.0, tyrePressureMax: 34.0,
        springMin: 60, springMax: 280,
        brakeBiasMin: 40, brakeBiasMax: 70,
        ratioMin: 3.5, ratioMax: 5.8,
    },
    ligier_jsp320: {
        tyrePressureMin: 17.5, tyrePressureMax: 34.5,
        springMin: 62, springMax: 285,
        brakeBiasMin: 39, brakeBiasMax: 69,
    },

    // LMGT3
    porsche_911_gt3_r_lmu: {
        tyrePressureMin: 18.0, tyrePressureMax: 33.0,
        springMin: 55, springMax: 250,
        brakeBiasMin: 42, brakeBiasMax: 72,
    },
    ferrari_296_gt3_lmu: {
        tyrePressureMin: 17.5, tyrePressureMax: 32.5,
        springMin: 54, springMax: 245,
        brakeBiasMin: 43, brakeBiasMax: 73,
    },

    // GTE (Legacy)
    porsche_911_rsr_19: {
        tyrePressureMin: 18.5, tyrePressureMax: 33.5,
        springMin: 58, springMax: 260,
        brakeBiasMin: 41, brakeBiasMax: 71,
    },
};

export function getCarOverride(carId) {
    if (!carId) return null;
    const override = LMU_CAR_OVERRIDES[carId];
    return override ? { ...UNIVERSAL, ...override } : UNIVERSAL;
}
