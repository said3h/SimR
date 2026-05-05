// ─────────────────────────────────────────────────────────────────────────────
// RF2_CAR_OVERRIDES — Rangos por coche para rFactor 2
// ─────────────────────────────────────────────────────────────────────────────

const UNIVERSAL = {
    tyrePressureMin: 15.0,
    tyrePressureMax: 35.0,
    springMin: 50,
    springMax: 300,
    damperMin: 5,
    damperMax: 30,
    arbMin: 0,
    arbMax: 60,
    heightMin: 25,
    heightMax: 150,
    brakeBiasMin: 30,
    brakeBiasMax: 70,
    brakePressureMin: 1.0,
    brakePressureMax: 3.0,
    camberMin: -4.0,
    camberMax: 1.0,
    toeMin: -1.5,
    toeMax: 1.5,
    ratioMin: 2.5,
    ratioMax: 6.0,
};

const RF2_CAR_OVERRIDES = {
    dallara_ir18: {
        tyrePressureMin: 17.0, tyrePressureMax: 32.0,
        springMin: 60, springMax: 280,
        brakeBiasMin: 45, brakeBiasMax: 75,
        ratioMin: 3.0, ratioMax: 5.5,
    },
    porsche_911_gt3_r: {
        tyrePressureMin: 18.0, tyrePressureMax: 34.0,
        springMin: 65, springMax: 290,
        brakeBiasMin: 40, brakeBiasMax: 70,
    },
    bmw_m4_gt3: {
        tyrePressureMin: 19.0, tyrePressureMax: 35.0,
        springMin: 70, springMax: 300,
        brakeBiasMin: 38, brakeBiasMax: 68,
    },
    oreca_07_lmp2: {
        tyrePressureMin: 16.0, tyrePressureMax: 30.0,
        springMin: 55, springMax: 270,
        brakeBiasMin: 42, brakeBiasMax: 72,
    },
    lmp3_prototype: {
        tyrePressureMin: 17.0, tyrePressureMax: 31.0,
        springMin: 60, springMax: 280,
        brakeBiasMin: 40, brakeBiasMax: 70,
    },
};

export function getCarOverride(carId) {
    if (!carId) return null;
    const override = RF2_CAR_OVERRIDES[carId];
    return override ? { ...UNIVERSAL, ...override } : UNIVERSAL;
}
