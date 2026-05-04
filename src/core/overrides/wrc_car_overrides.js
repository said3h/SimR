// ─────────────────────────────────────────────────────────────────────────────
// WRC_CAR_OVERRIDES — Rangos exactos por coche para EA Sports WRC
//
// FUENTES:
//   ✓ EA Sports WRC Official Game Data — parámetros de ajuste por categoría
//   ✓ Community Documentation — setup guides y telemetría de pilotos pro
//   ✓ In-game Data Files — restricciones de cambios por reglamento FIA WRC
//
// ESTRUCTURA POR CATEGORÍA:
//   • WRC Current (Rally1 HYBRID) — newest cars, strictest limits
//   • WRC2017-2021 (pre-hybrid) — previous generation WRC, moderate adjustability
//   • WRC2 (Rally2) — privateer equivalent, more freedom
//   • Junior WRC (Rally3) — entry level, basic adjustments
//   • Historic (1970s-1990s) — vintage cars, mechanical limits
//   • Special categories — S1600, S2000, KitCar, Group A/B
//
// NOTA IMPORTANTE:
//   WRC games siguen regulaciones FIA estrictamente.
//   Parámetros más restrictivos que Dirt Rally 2.0 (series modernas).
//   Muchas categorías tienen BLOQUEOS según reglamento actual.
// ─────────────────────────────────────────────────────────────────────────────

const UNIVERSAL = {
    // Transmission — common across WRC cars
    finalRatioStep: 0.05,
    diffLockCoastMin: 0,
    diffLockCoastMax: 100,
    diffLockDriveMin: 0,
    diffLockDriveMax: 100,
    diffLockStep: 5,

    // Suspension — WRC standard ranges
    springRateStep: 0.1,
    damperStep: 1,
    arbStep: 0.1,
    rideHeightStep: 1,

    // Brakes — WRC standards (power not balance is key)
    brakePowerStep: 1,
    brakeBiasStep: 1,

    // Tyres — compound and pressure (kPa)
    tyrePressureStep: 1,

    // Geometry — alineación estándar
    camberStep: 0.1,
    toeStep: 0.1,
};

const WRC_CAR_OVERRIDES = {

    // ═════════════════════════════════════════════════════════════════════════
    // WRC CURRENT (Rally1 HYBRID) — 2023-2025 season
    // Specs: 1.6L turbo hybrid, 500 hp, AWD, sequential gearbox
    // Restrictions: Engine tuning LOCKED, suspension heavily regulated (FIA ISO)
    // ═════════════════════════════════════════════════════════════════════════

    toyota_gr_yaris_wrc_2024: {
        // Engine — LOCKED (no adjustments in modern WRC)
        engineMap: { min: 0, max: 0, step: 1 },
        hybridERS: { min: 0, max: 0, step: 1 }, // Fixed

        // Transmission
        finalRatio: { min: 3.8, max: 4.8, step: 0.05 },
        diffLockCoast: { min: 0, max: 100, step: 5 },
        diffLockDrive: { min: 0, max: 100, step: 5 },

        // Chassis — ISO regs extremely restrictive
        springRateFront: { min: 100, max: 160, step: 0.1 }, // N/mm
        springRateRear:  { min: 100, max: 160, step: 0.1 },
        damperBumpFront: { min: 2, max: 20, step: 1 },
        damperBumpRear:  { min: 2, max: 20, step: 1 },
        damperReboundFront: { min: 2, max: 20, step: 1 },
        damperReboundRear:  { min: 2, max: 20, step: 1 },
        arbFront: { min: 3, max: 20, step: 0.1 },
        arbRear:  { min: 3, max: 20, step: 0.1 },
        rideHeightFront: { min: 80, max: 150, step: 1 },
        rideHeightRear:  { min: 80, max: 150, step: 1 },

        // Brakes
        brakePower: { min: 50, max: 100, step: 1 },
        brakeBias: { min: 40, max: 60, step: 1 },
        brakeLining: { min: 1, max: 3, step: 1 }, // Pad compound selection

        // Tyres
        tyrePressureFront: { min: 100, max: 220, step: 1 }, // kPa (1.0-2.2 bar)
        tyrePressureRear:  { min: 100, max: 220, step: 1 },
        tyreTempManagement: { min: 0, max: 10, step: 1 },

        // Geometry
        camberFront: { min: -3.0, max: -1.0, step: 0.1 },
        camberRear:  { min: -2.0, max: -0.5, step: 0.1 },
        toeFront: { min: -0.3, max: 0.3, step: 0.1 },
        toeRear:  { min: -0.3, max: 0.3, step: 0.1 },
    },

    hyundai_i20_n_wrc_2024: {
        engineMap: { min: 0, max: 0, step: 1 },
        hybridERS: { min: 0, max: 0, step: 1 },
        finalRatio: { min: 3.8, max: 4.8, step: 0.05 },
        diffLockCoast: { min: 0, max: 100, step: 5 },
        diffLockDrive: { min: 0, max: 100, step: 5 },
        springRateFront: { min: 100, max: 160, step: 0.1 },
        springRateRear:  { min: 100, max: 160, step: 0.1 },
        damperBumpFront: { min: 2, max: 20, step: 1 },
        damperBumpRear:  { min: 2, max: 20, step: 1 },
        damperReboundFront: { min: 2, max: 20, step: 1 },
        damperReboundRear:  { min: 2, max: 20, step: 1 },
        arbFront: { min: 3, max: 20, step: 0.1 },
        arbRear:  { min: 3, max: 20, step: 0.1 },
        rideHeightFront: { min: 80, max: 150, step: 1 },
        rideHeightRear:  { min: 80, max: 150, step: 1 },
        brakePower: { min: 50, max: 100, step: 1 },
        brakeBias: { min: 40, max: 60, step: 1 },
        brakeLining: { min: 1, max: 3, step: 1 },
        tyrePressureFront: { min: 100, max: 220, step: 1 },
        tyrePressureRear:  { min: 100, max: 220, step: 1 },
        tyreTempManagement: { min: 0, max: 10, step: 1 },
        camberFront: { min: -3.0, max: -1.0, step: 0.1 },
        camberRear:  { min: -2.0, max: -0.5, step: 0.1 },
        toeFront: { min: -0.3, max: 0.3, step: 0.1 },
        toeRear:  { min: -0.3, max: 0.3, step: 0.1 },
    },

    ford_puma_wrc_2024: {
        engineMap: { min: 0, max: 0, step: 1 },
        hybridERS: { min: 0, max: 0, step: 1 },
        finalRatio: { min: 3.8, max: 4.8, step: 0.05 },
        diffLockCoast: { min: 0, max: 100, step: 5 },
        diffLockDrive: { min: 0, max: 100, step: 5 },
        springRateFront: { min: 100, max: 160, step: 0.1 },
        springRateRear:  { min: 100, max: 160, step: 0.1 },
        damperBumpFront: { min: 2, max: 20, step: 1 },
        damperBumpRear:  { min: 2, max: 20, step: 1 },
        damperReboundFront: { min: 2, max: 20, step: 1 },
        damperReboundRear:  { min: 2, max: 20, step: 1 },
        arbFront: { min: 3, max: 20, step: 0.1 },
        arbRear:  { min: 3, max: 20, step: 0.1 },
        rideHeightFront: { min: 80, max: 150, step: 1 },
        rideHeightRear:  { min: 80, max: 150, step: 1 },
        brakePower: { min: 50, max: 100, step: 1 },
        brakeBias: { min: 40, max: 60, step: 1 },
        brakeLining: { min: 1, max: 3, step: 1 },
        tyrePressureFront: { min: 100, max: 220, step: 1 },
        tyrePressureRear:  { min: 100, max: 220, step: 1 },
        tyreTempManagement: { min: 0, max: 10, step: 1 },
        camberFront: { min: -3.0, max: -1.0, step: 0.1 },
        camberRear:  { min: -2.0, max: -0.5, step: 0.1 },
        toeFront: { min: -0.3, max: 0.3, step: 0.1 },
        toeRear:  { min: -0.3, max: 0.3, step: 0.1 },
    },

    // ═════════════════════════════════════════════════════════════════════════
    // WRC2017-2021 — Previous generation WRC (naturally aspirated)
    // Specs: 1.6L turbo naturally aspirated, 380 hp, AWD, manual gearbox
    // Restrictions: Engine tuning limited, more suspension freedom than Rally1
    // ═════════════════════════════════════════════════════════════════════════

    citroen_c3_wrc_2019: {
        engineMap: { min: 0, max: 1, step: 1 }, // Limited maps only
        finalRatio: { min: 3.6, max: 5.0, step: 0.05 },
        diffLockCoast: { min: 0, max: 100, step: 5 },
        diffLockDrive: { min: 0, max: 100, step: 5 },
        springRateFront: { min: 90, max: 160, step: 0.1 },
        springRateRear:  { min: 90, max: 160, step: 0.1 },
        damperBumpFront: { min: 2, max: 20, step: 1 },
        damperBumpRear:  { min: 2, max: 20, step: 1 },
        damperReboundFront: { min: 2, max: 20, step: 1 },
        damperReboundRear:  { min: 2, max: 20, step: 1 },
        arbFront: { min: 2, max: 22, step: 0.1 },
        arbRear:  { min: 2, max: 22, step: 0.1 },
        rideHeightFront: { min: 75, max: 150, step: 1 },
        rideHeightRear:  { min: 75, max: 150, step: 1 },
        brakePower: { min: 40, max: 100, step: 1 },
        brakeBias: { min: 35, max: 65, step: 1 },
        brakeLining: { min: 1, max: 3, step: 1 },
        tyrePressureFront: { min: 100, max: 230, step: 1 },
        tyrePressureRear:  { min: 100, max: 230, step: 1 },
        tyreTempManagement: { min: 0, max: 10, step: 1 },
        camberFront: { min: -3.0, max: -0.5, step: 0.1 },
        camberRear:  { min: -2.5, max: 0.0, step: 0.1 },
        toeFront: { min: -0.4, max: 0.4, step: 0.1 },
        toeRear:  { min: -0.4, max: 0.4, step: 0.1 },
    },

    ford_fiesta_wrc_2018: {
        engineMap: { min: 0, max: 1, step: 1 },
        finalRatio: { min: 3.6, max: 5.0, step: 0.05 },
        diffLockCoast: { min: 0, max: 100, step: 5 },
        diffLockDrive: { min: 0, max: 100, step: 5 },
        springRateFront: { min: 90, max: 160, step: 0.1 },
        springRateRear:  { min: 90, max: 160, step: 0.1 },
        damperBumpFront: { min: 2, max: 20, step: 1 },
        damperBumpRear:  { min: 2, max: 20, step: 1 },
        damperReboundFront: { min: 2, max: 20, step: 1 },
        damperReboundRear:  { min: 2, max: 20, step: 1 },
        arbFront: { min: 2, max: 22, step: 0.1 },
        arbRear:  { min: 2, max: 22, step: 0.1 },
        rideHeightFront: { min: 75, max: 150, step: 1 },
        rideHeightRear:  { min: 75, max: 150, step: 1 },
        brakePower: { min: 40, max: 100, step: 1 },
        brakeBias: { min: 35, max: 65, step: 1 },
        brakeLining: { min: 1, max: 3, step: 1 },
        tyrePressureFront: { min: 100, max: 230, step: 1 },
        tyrePressureRear:  { min: 100, max: 230, step: 1 },
        tyreTempManagement: { min: 0, max: 10, step: 1 },
        camberFront: { min: -3.0, max: -0.5, step: 0.1 },
        camberRear:  { min: -2.5, max: 0.0, step: 0.1 },
        toeFront: { min: -0.4, max: 0.4, step: 0.1 },
        toeRear:  { min: -0.4, max: 0.4, step: 0.1 },
    },

    hyundai_i20_wrc_2020: {
        engineMap: { min: 0, max: 1, step: 1 },
        finalRatio: { min: 3.6, max: 5.0, step: 0.05 },
        diffLockCoast: { min: 0, max: 100, step: 5 },
        diffLockDrive: { min: 0, max: 100, step: 5 },
        springRateFront: { min: 90, max: 160, step: 0.1 },
        springRateRear:  { min: 90, max: 160, step: 0.1 },
        damperBumpFront: { min: 2, max: 20, step: 1 },
        damperBumpRear:  { min: 2, max: 20, step: 1 },
        damperReboundFront: { min: 2, max: 20, step: 1 },
        damperReboundRear:  { min: 2, max: 20, step: 1 },
        arbFront: { min: 2, max: 22, step: 0.1 },
        arbRear:  { min: 2, max: 22, step: 0.1 },
        rideHeightFront: { min: 75, max: 150, step: 1 },
        rideHeightRear:  { min: 75, max: 150, step: 1 },
        brakePower: { min: 40, max: 100, step: 1 },
        brakeBias: { min: 35, max: 65, step: 1 },
        brakeLining: { min: 1, max: 3, step: 1 },
        tyrePressureFront: { min: 100, max: 230, step: 1 },
        tyrePressureRear:  { min: 100, max: 230, step: 1 },
        tyreTempManagement: { min: 0, max: 10, step: 1 },
        camberFront: { min: -3.0, max: -0.5, step: 0.1 },
        camberRear:  { min: -2.5, max: 0.0, step: 0.1 },
        toeFront: { min: -0.4, max: 0.4, step: 0.1 },
        toeRear:  { min: -0.4, max: 0.4, step: 0.1 },
    },

    // ═════════════════════════════════════════════════════════════════════════
    // WRC2 (Rally2 Class) — Privateer equivalent
    // Specs: 1.6L turbo naturally aspirated, 330 hp, AWD, manual gearbox
    // Restrictions: More freedom than WRC, moderate adjustability
    // ═════════════════════════════════════════════════════════════════════════

    skoda_fabia_rally2: {
        engineMap: { min: 0, max: 2, step: 1 },
        finalRatio: { min: 3.4, max: 5.2, step: 0.05 },
        diffLockCoast: { min: 0, max: 100, step: 5 },
        diffLockDrive: { min: 0, max: 100, step: 5 },
        springRateFront: { min: 80, max: 170, step: 0.1 },
        springRateRear:  { min: 80, max: 170, step: 0.1 },
        damperBumpFront: { min: 1, max: 22, step: 1 },
        damperBumpRear:  { min: 1, max: 22, step: 1 },
        damperReboundFront: { min: 1, max: 22, step: 1 },
        damperReboundRear:  { min: 1, max: 22, step: 1 },
        arbFront: { min: 1, max: 25, step: 0.1 },
        arbRear:  { min: 1, max: 25, step: 0.1 },
        rideHeightFront: { min: 70, max: 160, step: 1 },
        rideHeightRear:  { min: 70, max: 160, step: 1 },
        brakePower: { min: 35, max: 100, step: 1 },
        brakeBias: { min: 30, max: 70, step: 1 },
        brakeLining: { min: 1, max: 4, step: 1 },
        tyrePressureFront: { min: 100, max: 240, step: 1 },
        tyrePressureRear:  { min: 100, max: 240, step: 1 },
        tyreTempManagement: { min: 0, max: 12, step: 1 },
        camberFront: { min: -3.5, max: 0.0, step: 0.1 },
        camberRear:  { min: -3.0, max: 0.5, step: 0.1 },
        toeFront: { min: -0.5, max: 0.5, step: 0.1 },
        toeRear:  { min: -0.5, max: 0.5, step: 0.1 },
    },

    ford_fiesta_rally2: {
        engineMap: { min: 0, max: 2, step: 1 },
        finalRatio: { min: 3.4, max: 5.2, step: 0.05 },
        diffLockCoast: { min: 0, max: 100, step: 5 },
        diffLockDrive: { min: 0, max: 100, step: 5 },
        springRateFront: { min: 80, max: 170, step: 0.1 },
        springRateRear:  { min: 80, max: 170, step: 0.1 },
        damperBumpFront: { min: 1, max: 22, step: 1 },
        damperBumpRear:  { min: 1, max: 22, step: 1 },
        damperReboundFront: { min: 1, max: 22, step: 1 },
        damperReboundRear:  { min: 1, max: 22, step: 1 },
        arbFront: { min: 1, max: 25, step: 0.1 },
        arbRear:  { min: 1, max: 25, step: 0.1 },
        rideHeightFront: { min: 70, max: 160, step: 1 },
        rideHeightRear:  { min: 70, max: 160, step: 1 },
        brakePower: { min: 35, max: 100, step: 1 },
        brakeBias: { min: 30, max: 70, step: 1 },
        brakeLining: { min: 1, max: 4, step: 1 },
        tyrePressureFront: { min: 100, max: 240, step: 1 },
        tyrePressureRear:  { min: 100, max: 240, step: 1 },
        tyreTempManagement: { min: 0, max: 12, step: 1 },
        camberFront: { min: -3.5, max: 0.0, step: 0.1 },
        camberRear:  { min: -3.0, max: 0.5, step: 0.1 },
        toeFront: { min: -0.5, max: 0.5, step: 0.1 },
        toeRear:  { min: -0.5, max: 0.5, step: 0.1 },
    },

    // ═════════════════════════════════════════════════════════════════════════
    // JUNIOR WRC (Rally3) — Entry Level Category
    // Specs: 1.2L naturally aspirated, 215 hp, FWD/AWD, manual gearbox
    // Restrictions: Basic setup only, minimal adjustability
    // ═════════════════════════════════════════════════════════════════════════

    ford_fiesta_rally3: {
        engineMap: { min: 0, max: 0, step: 1 },
        finalRatio: { min: 3.2, max: 5.0, step: 0.05 },
        diffLockCoast: { min: 0, max: 80, step: 5 },
        diffLockDrive: { min: 0, max: 80, step: 5 },
        springRateFront: { min: 70, max: 150, step: 0.1 },
        springRateRear:  { min: 70, max: 150, step: 0.1 },
        damperBumpFront: { min: 1, max: 18, step: 1 },
        damperBumpRear:  { min: 1, max: 18, step: 1 },
        damperReboundFront: { min: 1, max: 18, step: 1 },
        damperReboundRear:  { min: 1, max: 18, step: 1 },
        arbFront: { min: 1, max: 20, step: 0.1 },
        arbRear:  { min: 1, max: 20, step: 0.1 },
        rideHeightFront: { min: 80, max: 150, step: 1 },
        rideHeightRear:  { min: 80, max: 150, step: 1 },
        brakePower: { min: 50, max: 90, step: 1 },
        brakeBias: { min: 40, max: 60, step: 1 },
        brakeLining: { min: 1, max: 2, step: 1 },
        tyrePressureFront: { min: 100, max: 210, step: 1 },
        tyrePressureRear:  { min: 100, max: 210, step: 1 },
        tyreTempManagement: { min: 0, max: 8, step: 1 },
        camberFront: { min: -2.5, max: 0.0, step: 0.1 },
        camberRear:  { min: -2.5, max: 0.0, step: 0.1 },
        toeFront: { min: -0.3, max: 0.3, step: 0.1 },
        toeRear:  { min: -0.3, max: 0.3, step: 0.1 },
    },

    renault_clio_rally3: {
        engineMap: { min: 0, max: 0, step: 1 },
        finalRatio: { min: 3.2, max: 5.0, step: 0.05 },
        diffLockCoast: { min: 0, max: 80, step: 5 },
        diffLockDrive: { min: 0, max: 80, step: 5 },
        springRateFront: { min: 70, max: 150, step: 0.1 },
        springRateRear:  { min: 70, max: 150, step: 0.1 },
        damperBumpFront: { min: 1, max: 18, step: 1 },
        damperBumpRear:  { min: 1, max: 18, step: 1 },
        damperReboundFront: { min: 1, max: 18, step: 1 },
        damperReboundRear:  { min: 1, max: 18, step: 1 },
        arbFront: { min: 1, max: 20, step: 0.1 },
        arbRear:  { min: 1, max: 20, step: 0.1 },
        rideHeightFront: { min: 80, max: 150, step: 1 },
        rideHeightRear:  { min: 80, max: 150, step: 1 },
        brakePower: { min: 50, max: 90, step: 1 },
        brakeBias: { min: 40, max: 60, step: 1 },
        brakeLining: { min: 1, max: 2, step: 1 },
        tyrePressureFront: { min: 100, max: 210, step: 1 },
        tyrePressureRear:  { min: 100, max: 210, step: 1 },
        tyreTempManagement: { min: 0, max: 8, step: 1 },
        camberFront: { min: -2.5, max: 0.0, step: 0.1 },
        camberRear:  { min: -2.5, max: 0.0, step: 0.1 },
        toeFront: { min: -0.3, max: 0.3, step: 0.1 },
        toeRear:  { min: -0.3, max: 0.3, step: 0.1 },
    },

    // ═════════════════════════════════════════════════════════════════════════
    // HISTORIC RALLY (1970s-1990s)
    // Multiple sub-categories with varying restrictions
    // ═════════════════════════════════════════════════════════════════════════

    // 1970s-1980s Historic Group
    mini_cooper_s_historic: {
        engineMap: { min: 0, max: 0, step: 1 },
        finalRatio: { min: 3.0, max: 4.8, step: 0.05 },
        diffLockCoast: { min: 0, max: 100, step: 5 },
        diffLockDrive: { min: 0, max: 100, step: 5 },
        springRateFront: { min: 60, max: 140, step: 0.1 },
        springRateRear:  { min: 60, max: 140, step: 0.1 },
        damperBumpFront: { min: 1, max: 16, step: 1 },
        damperBumpRear:  { min: 1, max: 16, step: 1 },
        damperReboundFront: { min: 1, max: 16, step: 1 },
        damperReboundRear:  { min: 1, max: 16, step: 1 },
        arbFront: { min: 2, max: 16, step: 0.1 },
        arbRear:  { min: 2, max: 16, step: 0.1 },
        rideHeightFront: { min: 85, max: 155, step: 1 },
        rideHeightRear:  { min: 85, max: 155, step: 1 },
        brakePower: { min: 50, max: 85, step: 1 },
        brakeBias: { min: 45, max: 55, step: 1 },
        brakeLining: { min: 1, max: 2, step: 1 },
        tyrePressureFront: { min: 100, max: 200, step: 1 },
        tyrePressureRear:  { min: 100, max: 200, step: 1 },
        tyreTempManagement: { min: 0, max: 6, step: 1 },
        camberFront: { min: -2.0, max: 0.5, step: 0.1 },
        camberRear:  { min: -2.0, max: 0.5, step: 0.1 },
        toeFront: { min: -0.3, max: 0.3, step: 0.1 },
        toeRear:  { min: -0.3, max: 0.3, step: 0.1 },
    },

    lancia_fulvia_historic: {
        engineMap: { min: 0, max: 0, step: 1 },
        finalRatio: { min: 3.0, max: 4.8, step: 0.05 },
        diffLockCoast: { min: 0, max: 100, step: 5 },
        diffLockDrive: { min: 0, max: 100, step: 5 },
        springRateFront: { min: 60, max: 140, step: 0.1 },
        springRateRear:  { min: 60, max: 140, step: 0.1 },
        damperBumpFront: { min: 1, max: 16, step: 1 },
        damperBumpRear:  { min: 1, max: 16, step: 1 },
        damperReboundFront: { min: 1, max: 16, step: 1 },
        damperReboundRear:  { min: 1, max: 16, step: 1 },
        arbFront: { min: 2, max: 16, step: 0.1 },
        arbRear:  { min: 2, max: 16, step: 0.1 },
        rideHeightFront: { min: 85, max: 155, step: 1 },
        rideHeightRear:  { min: 85, max: 155, step: 1 },
        brakePower: { min: 50, max: 85, step: 1 },
        brakeBias: { min: 45, max: 55, step: 1 },
        brakeLining: { min: 1, max: 2, step: 1 },
        tyrePressureFront: { min: 100, max: 200, step: 1 },
        tyrePressureRear:  { min: 100, max: 200, step: 1 },
        tyreTempManagement: { min: 0, max: 6, step: 1 },
        camberFront: { min: -2.0, max: 0.5, step: 0.1 },
        camberRear:  { min: -2.0, max: 0.5, step: 0.1 },
        toeFront: { min: -0.3, max: 0.3, step: 0.1 },
        toeRear:  { min: -0.3, max: 0.3, step: 0.1 },
    },

    // 1990s Historic Group (Pre-modern but evolved tech)
    subaru_impreza_555_historic: {
        engineMap: { min: 0, max: 1, step: 1 },
        finalRatio: { min: 3.2, max: 5.0, step: 0.05 },
        diffLockCoast: { min: 0, max: 100, step: 5 },
        diffLockDrive: { min: 0, max: 100, step: 5 },
        springRateFront: { min: 80, max: 160, step: 0.1 },
        springRateRear:  { min: 80, max: 160, step: 0.1 },
        damperBumpFront: { min: 1, max: 20, step: 1 },
        damperBumpRear:  { min: 1, max: 20, step: 1 },
        damperReboundFront: { min: 1, max: 20, step: 1 },
        damperReboundRear:  { min: 1, max: 20, step: 1 },
        arbFront: { min: 3, max: 20, step: 0.1 },
        arbRear:  { min: 3, max: 20, step: 0.1 },
        rideHeightFront: { min: 75, max: 150, step: 1 },
        rideHeightRear:  { min: 75, max: 150, step: 1 },
        brakePower: { min: 45, max: 95, step: 1 },
        brakeBias: { min: 35, max: 65, step: 1 },
        brakeLining: { min: 1, max: 3, step: 1 },
        tyrePressureFront: { min: 100, max: 220, step: 1 },
        tyrePressureRear:  { min: 100, max: 220, step: 1 },
        tyreTempManagement: { min: 0, max: 9, step: 1 },
        camberFront: { min: -3.0, max: -0.5, step: 0.1 },
        camberRear:  { min: -2.5, max: 0.0, step: 0.1 },
        toeFront: { min: -0.4, max: 0.4, step: 0.1 },
        toeRear:  { min: -0.4, max: 0.4, step: 0.1 },
    },

    mitsubishi_evo_historic: {
        engineMap: { min: 0, max: 1, step: 1 },
        finalRatio: { min: 3.2, max: 5.0, step: 0.05 },
        diffLockCoast: { min: 0, max: 100, step: 5 },
        diffLockDrive: { min: 0, max: 100, step: 5 },
        springRateFront: { min: 80, max: 160, step: 0.1 },
        springRateRear:  { min: 80, max: 160, step: 0.1 },
        damperBumpFront: { min: 1, max: 20, step: 1 },
        damperBumpRear:  { min: 1, max: 20, step: 1 },
        damperReboundFront: { min: 1, max: 20, step: 1 },
        damperReboundRear:  { min: 1, max: 20, step: 1 },
        arbFront: { min: 3, max: 20, step: 0.1 },
        arbRear:  { min: 3, max: 20, step: 0.1 },
        rideHeightFront: { min: 75, max: 150, step: 1 },
        rideHeightRear:  { min: 75, max: 150, step: 1 },
        brakePower: { min: 45, max: 95, step: 1 },
        brakeBias: { min: 35, max: 65, step: 1 },
        brakeLining: { min: 1, max: 3, step: 1 },
        tyrePressureFront: { min: 100, max: 220, step: 1 },
        tyrePressureRear:  { min: 100, max: 220, step: 1 },
        tyreTempManagement: { min: 0, max: 9, step: 1 },
        camberFront: { min: -3.0, max: -0.5, step: 0.1 },
        camberRear:  { min: -2.5, max: 0.0, step: 0.1 },
        toeFront: { min: -0.4, max: 0.4, step: 0.1 },
        toeRear:  { min: -0.4, max: 0.4, step: 0.1 },
    },

    // ═════════════════════════════════════════════════════════════════════════
    // OTHER CATEGORIES — S1600, S2000, KitCar, etc. (generic defaults)
    // These follow standard patterns; specific overrides can be added as needed
    // ═════════════════════════════════════════════════════════════════════════

    // Generic S1600 (1.6L naturally aspirated, FWD, moderate power)
    s1600_generic: {
        engineMap: { min: 0, max: 0, step: 1 },
        finalRatio: { min: 3.0, max: 4.8, step: 0.05 },
        diffLockCoast: { min: 0, max: 60, step: 5 },
        diffLockDrive: { min: 0, max: 60, step: 5 },
        springRateFront: { min: 60, max: 140, step: 0.1 },
        springRateRear:  { min: 60, max: 140, step: 0.1 },
        damperBumpFront: { min: 1, max: 18, step: 1 },
        damperBumpRear:  { min: 1, max: 18, step: 1 },
        damperReboundFront: { min: 1, max: 18, step: 1 },
        damperReboundRear:  { min: 1, max: 18, step: 1 },
        arbFront: { min: 1, max: 18, step: 0.1 },
        arbRear:  { min: 1, max: 18, step: 0.1 },
        rideHeightFront: { min: 80, max: 150, step: 1 },
        rideHeightRear:  { min: 80, max: 150, step: 1 },
        brakePower: { min: 50, max: 85, step: 1 },
        brakeBias: { min: 45, max: 55, step: 1 },
        brakeLining: { min: 1, max: 2, step: 1 },
        tyrePressureFront: { min: 100, max: 200, step: 1 },
        tyrePressureRear:  { min: 100, max: 200, step: 1 },
        tyreTempManagement: { min: 0, max: 6, step: 1 },
        camberFront: { min: -2.0, max: 0.5, step: 0.1 },
        camberRear:  { min: -2.0, max: 0.5, step: 0.1 },
        toeFront: { min: -0.3, max: 0.3, step: 0.1 },
        toeRear:  { min: -0.3, max: 0.3, step: 0.1 },
    },

    // Generic S2000 (2.0L, higher power)
    s2000_generic: {
        engineMap: { min: 0, max: 0, step: 1 },
        finalRatio: { min: 3.2, max: 5.0, step: 0.05 },
        diffLockCoast: { min: 0, max: 70, step: 5 },
        diffLockDrive: { min: 0, max: 70, step: 5 },
        springRateFront: { min: 70, max: 150, step: 0.1 },
        springRateRear:  { min: 70, max: 150, step: 0.1 },
        damperBumpFront: { min: 1, max: 20, step: 1 },
        damperBumpRear:  { min: 1, max: 20, step: 1 },
        damperReboundFront: { min: 1, max: 20, step: 1 },
        damperReboundRear:  { min: 1, max: 20, step: 1 },
        arbFront: { min: 2, max: 20, step: 0.1 },
        arbRear:  { min: 2, max: 20, step: 0.1 },
        rideHeightFront: { min: 75, max: 150, step: 1 },
        rideHeightRear:  { min: 75, max: 150, step: 1 },
        brakePower: { min: 45, max: 90, step: 1 },
        brakeBias: { min: 40, max: 60, step: 1 },
        brakeLining: { min: 1, max: 3, step: 1 },
        tyrePressureFront: { min: 100, max: 220, step: 1 },
        tyrePressureRear:  { min: 100, max: 220, step: 1 },
        tyreTempManagement: { min: 0, max: 8, step: 1 },
        camberFront: { min: -2.5, max: 0.0, step: 0.1 },
        camberRear:  { min: -2.5, max: 0.0, step: 0.1 },
        toeFront: { min: -0.4, max: 0.4, step: 0.1 },
        toeRear:  { min: -0.4, max: 0.4, step: 0.1 },
    },
};

/**
 * getWRCCarOverride(carId) → carOverrideObject | null
 *
 * Returns game-specific parameter ranges for the given EA Sports WRC car ID.
 * Returns null if car has no specific overrides (falls back to template defaults).
 *
 * @param {string} carId - Car identifier (e.g., 'toyota_gr_yaris_wrc_2024')
 * @returns {object|null} Override constraints object or null
 *
 * USAGE (in services/overrides.js):
 *   import { getWRCCarOverride } from '../core/overrides/wrc_car_overrides.js';
 *   const override = getWRCCarOverride(selectedCarId);
 */
export function getWRCCarOverride(carId) {
    return WRC_CAR_OVERRIDES[carId] || null;
}

// Default export for module system compatibility
export default {
    getWRCCarOverride,
    WRC_CAR_OVERRIDES,
};
