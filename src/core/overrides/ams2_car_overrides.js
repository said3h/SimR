// ─────────────────────────────────────────────────────────────────────────────
// AMS2_CAR_OVERRIDES — Rangos por coche para Automobilista 2
// ─────────────────────────────────────────────────────────────────────────────

const UNIVERSAL = {
    tyrePressureMin: 14.0,
    tyrePressureMax: 38.0,
    springMin: 40,
    springMax: 350,
    arbMin: 0,
    arbMax: 80,
    heightMin: 20,
    heightMax: 160,
    brakeBiasMin: 25,
    brakeBiasMax: 75,
    brakePowerMin: 35,
    brakePowerMax: 140,
    diffLockMin: 0,
    diffLockMax: 100,
    camberMin: -5.0,
    camberMax: 2.0,
    toeMin: -2.0,
    toeMax: 2.0,
    ratioMin: 2.0,
    ratioMax: 7.0,
};

const AMS2_CAR_OVERRIDES = {
    // Stock Car V8
    stock_car_v8_2023: {
        tyrePressureMin: 18.0, tyrePressureMax: 36.0,
        springMin: 80, springMax: 320,
        brakeBiasMin: 40, brakeBiasMax: 70,
        ratioMin: 3.0, ratioMax: 6.0,
    },
    // Formula Truck
    formula_truck_2023: {
        tyrePressureMin: 16.0, tyrePressureMax: 34.0,
        springMin: 70, springMax: 300,
        brakeBiasMin: 45, brakeBiasMax: 75,
    },
    // Porsche 911 GT3 Cup
    porsche_911_gt3_cup_ams2: {
        tyrePressureMin: 18.0, tyrePressureMax: 34.0,
        springMin: 60, springMax: 280,
        brakeBiasMin: 42, brakeBiasMax: 72,
    },
    // BMW M3 E46 GT
    bmw_m3_e46_gt: {
        tyrePressureMin: 17.0, tyrePressureMax: 33.0,
        springMin: 65, springMax: 290,
        brakeBiasMin: 40, brakeBiasMax: 70,
    },
    // Chevrolet Corvette C7 GT3
    corvette_c7_gt3: {
        tyrePressureMin: 19.0, tyrePressureMax: 35.0,
        springMin: 70, springMax: 300,
        brakeBiasMin: 38, brakeBiasMax: 68,
    },
};

export function getCarOverride(carId) {
    if (!carId) return null;
    const override = AMS2_CAR_OVERRIDES[carId];
    return override ? { ...UNIVERSAL, ...override } : UNIVERSAL;
}
