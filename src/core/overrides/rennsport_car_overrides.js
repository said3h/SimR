// ─────────────────────────────────────────────────────────────────────────────
// RENNSPORT_CAR_OVERRIDES — Rangos por coche para RENNSPORT
//
// RENNSPORT focaliza en coches de competición históricos y legendarios.
// ─────────────────────────────────────────────────────────────────────────────

const UNIVERSAL = {
    tyrePressureMin: 16.0,
    tyrePressureMax: 38.0,
    springMin: 40,
    springMax: 350,
    damperMin: 3,
    damperMax: 25,
    arbMin: 0,
    arbMax: 80,
    heightMin: 20,
    heightMax: 180,
    brakeBiasMin: 25,
    brakeBiasMax: 75,
    brakePowerMin: 30,
    brakePowerMax: 150,
    camberMin: -5.0,
    camberMax: 1.0,
    toeMin: -2.0,
    toeMax: 2.0,
    wingMin: 0,
    wingMax: 180,
    ratioMin: 2.5,
    ratioMax: 7.0,
};

const RENNSPORT_CAR_OVERRIDES = {
    // Legendary Sports Cars
    porsche_959: {
        tyrePressureMin: 19.0, tyrePressureMax: 36.0,
        springMin: 70, springMax: 320,
        brakeBiasMin: 35, brakeBiasMax: 70,
        ratioMin: 3.0, ratioMax: 6.0,
    },
    ferrari_testarossa: {
        tyrePressureMin: 18.0, tyrePressureMax: 35.0,
        springMin: 65, springMax: 310,
        brakeBiasMin: 40, brakeBiasMax: 75,
    },
    lamborghini_countach: {
        tyrePressureMin: 18.5, tyrePressureMax: 35.5,
        springMin: 65, springMax: 305,
        brakeBiasMin: 38, brakeBiasMax: 73,
    },

    // Iconic Racers
    porsche_917: {
        tyrePressureMin: 20.0, tyrePressureMax: 37.0,
        springMin: 80, springMax: 330,
        brakeBiasMin: 35, brakeBiasMax: 70,
        ratioMin: 2.8, ratioMax: 5.5,
    },
    ferrari_312t: {
        tyrePressureMin: 17.0, tyrePressureMax: 33.0,
        springMin: 60, springMax: 280,
        brakeBiasMin: 45, brakeBiasMax: 80,
        ratioMin: 3.5, ratioMax: 6.5,
    },
    jaguar_d_type: {
        tyrePressureMin: 19.5, tyrePressureMax: 36.5,
        springMin: 75, springMax: 320,
        brakeBiasMin: 42, brakeBiasMax: 77,
    },

    // Modern Supercars
    porsche_918_spyder: {
        tyrePressureMin: 19.0, tyrePressureMax: 36.0,
        springMin: 70, springMax: 310,
        brakeBiasMin: 36, brakeBiasMax: 71,
    },
    mclaren_p1: {
        tyrePressureMin: 20.0, tyrePressureMax: 37.0,
        springMin: 75, springMax: 320,
        brakeBiasMin: 35, brakeBiasMax: 70,
    },
    ferrari_laferrari: {
        tyrePressureMin: 19.5, tyrePressureMax: 36.5,
        springMin: 72, springMax: 315,
        brakeBiasMin: 36, brakeBiasMax: 71,
    },
    bugatti_veyron_ss: {
        tyrePressureMin: 21.0, tyrePressureMax: 38.0,
        springMin: 80, springMax: 330,
        brakeBiasMin: 32, brakeBiasMax: 67,
        ratioMin: 2.5, ratioMax: 5.8,
    },
};

export function getCarOverride(carId) {
    if (!carId) return null;
    const override = RENNSPORT_CAR_OVERRIDES[carId];
    return override ? { ...UNIVERSAL, ...override } : UNIVERSAL;
}
