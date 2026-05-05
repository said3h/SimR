// ─────────────────────────────────────────────────────────────────────────────
// AC_CAR_OVERRIDES — Rangos por coche para Assetto Corsa
//
// Assetto Corsa es un simulador de physics-driven con constrains mínimos.
// Los rangos aquí se basan en valores reales de setups competitivos.
// ─────────────────────────────────────────────────────────────────────────────

const UNIVERSAL = {
    tyrePressureMin: 18.0,
    tyrePressureMax: 32.0,
    tyrePressureStep: 0.1,
    springMin: 50,
    springMax: 300,
    arbMin: 0,
    arbMax: 50,
    heightMin: 20,
    heightMax: 120,
    brakeBiasMin: 30,
    brakeBiasMax: 70,
    brakePowerMin: 40,
    brakePowerMax: 120,
    camberMin: -4.0,
    camberMax: 1.0,
    toeMin: -1.0,
    toeMax: 1.0,
    wingMin: 0,
    wingMax: 100,
};

const AC_CAR_OVERRIDES = {
    // Ferrari 458 GT2
    ferrari_458_gt2: {
        tyrePressureMin: 19.0, tyrePressureMax: 31.0,
        springMin: 60, springMax: 280,
        brakeBiasMin: 35, brakeBiasMax: 65,
    },
    // Lamborghini Gallardo GT3
    lamborghini_gallardo_gt3: {
        tyrePressureMin: 20.0, tyrePressureMax: 32.0,
        springMin: 70, springMax: 300,
        arbMin: 5, arbMax: 45,
    },
    // Porsche 911 GT3 Cup
    porsche_911_gt3_cup: {
        tyrePressureMin: 18.5, tyrePressureMax: 31.5,
        springMin: 65, springMax: 290,
        brakeBiasMin: 38, brakeBiasMax: 68,
    },
    // McLaren MP4-12C GT3
    mclaren_mp4_12c_gt3: {
        tyrePressureMin: 20.0, tyrePressureMax: 32.0,
        springMin: 75, springMax: 310,
        brakeBiasMin: 36, brakeBiasMax: 64,
    },
    // Nissan GT-R N24
    nissan_gtr_n24: {
        tyrePressureMin: 21.0, tyrePressureMax: 33.0,
        springMin: 80, springMax: 320,
        arbMin: 10, arbMax: 50,
    },
    // BMW M3 E92 GT2
    bmw_m3_e92_gt2: {
        tyrePressureMin: 19.5, tyrePressureMax: 31.5,
        springMin: 65, springMax: 285,
        brakeBiasMin: 37, brakeBiasMax: 67,
    },
    // Aston Martin V12 Vantage GT3
    aston_martin_v12_vantage_gt3: {
        tyrePressureMin: 20.0, tyrePressureMax: 32.0,
        springMin: 70, springMax: 295,
        brakeBiasMin: 35, brakeBiasMax: 65,
    },
    // Formula Renault 3.5
    formula_renault_35: {
        tyrePressureMin: 17.0, tyrePressureMax: 28.0,
        springMin: 40, springMax: 180,
        brakeBiasMin: 45, brakeBiasMax: 75,
        wingMin: 10, wingMax: 80,
    },
};

export function getCarOverride(carId) {
    if (!carId) return null;
    const override = AC_CAR_OVERRIDES[carId];
    return override ? { ...UNIVERSAL, ...override } : UNIVERSAL;
}
