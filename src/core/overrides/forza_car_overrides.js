// ─────────────────────────────────────────────────────────────────────────────
// FORZA_CAR_OVERRIDES — Rangos por coche para Forza Motorsport (2023)
//
// Forza tiene constrains complejos basados en clase de coche y año.
// ─────────────────────────────────────────────────────────────────────────────

const UNIVERSAL = {
    tyrePressureMin: 15.0,
    tyrePressureMax: 45.0,
    tyrePressureStep: 0.1,
    springMin: 40,
    springMax: 400,
    damperMin: 5,
    damperMax: 35,
    arbMin: 0,
    arbMax: 100,
    heightMin: 30,
    heightMax: 200,
    brakeBiasMin: 20,
    brakeBiasMax: 80,
    brakePowerMin: 30,
    brakePowerMax: 150,
    camberMin: -5.0,
    camberMax: 2.0,
    toeMin: -2.0,
    toeMax: 2.0,
    wingMin: 0,
    wingMax: 150,
    ratioMin: 2.0,
    ratioMax: 6.0,
};

const FORZA_CAR_OVERRIDES = {
    // Hypercars
    koenigsegg_jesko: {
        tyrePressureMin: 20.0, tyrePressureMax: 40.0,
        springMin: 80, springMax: 350,
        brakeBiasMin: 35, brakeBiasMax: 75,
        ratioMin: 2.5, ratioMax: 5.5,
    },
    bugatti_bolide: {
        tyrePressureMin: 22.0, tyrePressureMax: 42.0,
        springMin: 90, springMax: 360,
        brakeBiasMin: 38, brakeBiasMax: 78,
    },
    pagani_utopia: {
        tyrePressureMin: 21.0, tyrePressureMax: 41.0,
        springMin: 85, springMax: 355,
        brakeBiasMin: 36, brakeBiasMax: 76,
    },

    // GT3 Racing
    porsche_911_gt3_rs_2022: {
        tyrePressureMin: 18.0, tyrePressureMax: 35.0,
        springMin: 60, springMax: 280,
        brakeBiasMin: 40, brakeBiasMax: 70,
    },
    lamborghini_revuelto_gt3: {
        tyrePressureMin: 19.0, tyrePressureMax: 36.0,
        springMin: 65, springMax: 290,
        brakeBiasMin: 38, brakeBiasMax: 68,
    },
    ferrari_296_gt3: {
        tyrePressureMin: 19.0, tyrePressureMax: 36.0,
        springMin: 65, springMax: 285,
        brakeBiasMin: 37, brakeBiasMax: 67,
    },

    // Formula Racing
    formula_e_2023: {
        tyrePressureMin: 16.0, tyrePressureMax: 28.0,
        springMin: 40, springMax: 180,
        brakeBiasMin: 50, brakeBiasMax: 80,
        ratioMin: 3.0, ratioMax: 5.0,
    },
    chevrolet_corvette_c8r_gt2: {
        tyrePressureMin: 18.0, tyrePressureMax: 35.0,
        springMin: 60, springMax: 280,
        brakeBiasMin: 40, brakeBiasMax: 70,
    },
};

export function getCarOverride(carId) {
    if (!carId) return null;
    const override = FORZA_CAR_OVERRIDES[carId];
    return override ? { ...UNIVERSAL, ...override } : UNIVERSAL;
}
