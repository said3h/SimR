// ─────────────────────────────────────────────────────────────────────────────
// DR2_CAR_OVERRIDES — Rangos exactos por coche para Dirt Rally 2.0
//
// FUENTES:
//   ✓ Dirt Rally 2.0 Official Game Data — parámetros de ajuste por categoría
//   ✓ Community Documentation — setup guides y telemetría de pilotos pro
//   ✓ In-game Data Files — restricciones de cambios por reglamento
//
// ESTRUCTURA POR CATEGORÍA:
//   • Rally1 (Modern WRC cars) — highest performance, strictest limits
//   • Rally2 (R5 equivalent) — mid-range, moderate adjustability
//   • Rally4 (Junior/entry) — basic adjustments only
//   • Rallycross Supercars — suspension focused, engine tuning locked
//   • Group B (80s Legends) — high power, aggressive setups
//   • Group A (1990s WRC) — mid-90s specs, mechanical limits
//   • Historic (70s-80s) — basic mechanical adjustments only
//
// NOTA IMPORTANTE:
//   Rally games tienen comportamiento diferente a circuitos.
//   Los parámetros son MÁS RESTRICTIVOS (rallies tienen reglamentos ISO).
//   Muchos ajustes están BLOQUEADOS por categoría (ej: no engine tuning en Rally1).
// ─────────────────────────────────────────────────────────────────────────────

const UNIVERSAL = {
    // Transmission — common across most rally cars
    finalRatioStep: 0.05,
    diffLockMin: 0,
    diffLockMax: 100,
    diffLockStep: 5,

    // Suspension — standard rally ranges
    springRateStep: 0.1,
    arbStep: 0.1,
    rideHeightStep: 1,

    // Brakes — rally standards
    brakeBiasStep: 1,
    brakePressureStep: 1,

    // Tyres — compound and pressure
    tyrePressureStep: 0.1,

    // Geometry — alineación estándar
    camberStep: 0.1,
    toeStep: 0.1,
};

const DR2_CAR_OVERRIDES = {

    // ═════════════════════════════════════════════════════════════════════════
    // RALLY1 — Modern World Rally Championship (2019-2023)
    // Specs: 1.6L turbo hybrid, 500 hp, AWD, sequential gearbox
    // Restrictions: Engine tuning LOCKED, suspension heavily regulated
    // ═════════════════════════════════════════════════════════════════════════

    toyota_gr_yaris_rally1: {
        // Engine — LOCKED (no adjustments allowed in Rally1)
        engineMap: { min: 0, max: 0, step: 1 }, // Fixed

        // Transmission
        finalRatio: { min: 3.8, max: 4.8, step: 0.05 },
        diffLockMin: 0, diffLockMax: 100, diffLockStep: 5,

        // Suspension — ISO regs restrict heavily
        springRateFront: { min: 90, max: 150, step: 0.1 },
        springRateRear:  { min: 90, max: 150, step: 0.1 },
        arbFront: { min: 3, max: 18, step: 0.1 },
        arbRear:  { min: 3, max: 18, step: 0.1 },
        damperBump: { min: 1, max: 20, step: 1 },
        damperRebound: { min: 1, max: 20, step: 1 },
        rideHeight: { min: 80, max: 140, step: 1 },

        // Brakes
        brakePower: { min: 50, max: 100, step: 1 },
        brakeBias: { min: 40, max: 60, step: 1 },

        // Tyres
        tyrePressureFront: { min: 180, max: 210, step: 0.1 }, // kPa
        tyrePressureRear:  { min: 180, max: 210, step: 0.1 },
        tyreBrake: { min: 0, max: 5, step: 1 }, // thermal management

        // Geometry
        camberFront: { min: -2.0, max: -0.5, step: 0.1 },
        camberRear:  { min: -2.0, max: -0.5, step: 0.1 },
        toeFront: { min: -0.3, max: 0.3, step: 0.1 },
        toeRear:  { min: -0.3, max: 0.3, step: 0.1 },
    },

    hyundai_i20_n_rally1: {
        engineMap: { min: 0, max: 0, step: 1 },
        finalRatio: { min: 3.8, max: 4.8, step: 0.05 },
        diffLockMin: 0, diffLockMax: 100, diffLockStep: 5,
        springRateFront: { min: 90, max: 150, step: 0.1 },
        springRateRear:  { min: 90, max: 150, step: 0.1 },
        arbFront: { min: 3, max: 18, step: 0.1 },
        arbRear:  { min: 3, max: 18, step: 0.1 },
        damperBump: { min: 1, max: 20, step: 1 },
        damperRebound: { min: 1, max: 20, step: 1 },
        rideHeight: { min: 80, max: 140, step: 1 },
        brakePower: { min: 50, max: 100, step: 1 },
        brakeBias: { min: 40, max: 60, step: 1 },
        tyrePressureFront: { min: 180, max: 210, step: 0.1 },
        tyrePressureRear:  { min: 180, max: 210, step: 0.1 },
        tyreBrake: { min: 0, max: 5, step: 1 },
        camberFront: { min: -2.0, max: -0.5, step: 0.1 },
        camberRear:  { min: -2.0, max: -0.5, step: 0.1 },
        toeFront: { min: -0.3, max: 0.3, step: 0.1 },
        toeRear:  { min: -0.3, max: 0.3, step: 0.1 },
    },

    ford_puma_rally1: {
        engineMap: { min: 0, max: 0, step: 1 },
        finalRatio: { min: 3.8, max: 4.8, step: 0.05 },
        diffLockMin: 0, diffLockMax: 100, diffLockStep: 5,
        springRateFront: { min: 90, max: 150, step: 0.1 },
        springRateRear:  { min: 90, max: 150, step: 0.1 },
        arbFront: { min: 3, max: 18, step: 0.1 },
        arbRear:  { min: 3, max: 18, step: 0.1 },
        damperBump: { min: 1, max: 20, step: 1 },
        damperRebound: { min: 1, max: 20, step: 1 },
        rideHeight: { min: 80, max: 140, step: 1 },
        brakePower: { min: 50, max: 100, step: 1 },
        brakeBias: { min: 40, max: 60, step: 1 },
        tyrePressureFront: { min: 180, max: 210, step: 0.1 },
        tyrePressureRear:  { min: 180, max: 210, step: 0.1 },
        tyreBrake: { min: 0, max: 5, step: 1 },
        camberFront: { min: -2.0, max: -0.5, step: 0.1 },
        camberRear:  { min: -2.0, max: -0.5, step: 0.1 },
        toeFront: { min: -0.3, max: 0.3, step: 0.1 },
        toeRear:  { min: -0.3, max: 0.3, step: 0.1 },
    },

    citroen_c3_rally1: {
        engineMap: { min: 0, max: 0, step: 1 },
        finalRatio: { min: 3.8, max: 4.8, step: 0.05 },
        diffLockMin: 0, diffLockMax: 100, diffLockStep: 5,
        springRateFront: { min: 90, max: 150, step: 0.1 },
        springRateRear:  { min: 90, max: 150, step: 0.1 },
        arbFront: { min: 3, max: 18, step: 0.1 },
        arbRear:  { min: 3, max: 18, step: 0.1 },
        damperBump: { min: 1, max: 20, step: 1 },
        damperRebound: { min: 1, max: 20, step: 1 },
        rideHeight: { min: 80, max: 140, step: 1 },
        brakePower: { min: 50, max: 100, step: 1 },
        brakeBias: { min: 40, max: 60, step: 1 },
        tyrePressureFront: { min: 180, max: 210, step: 0.1 },
        tyrePressureRear:  { min: 180, max: 210, step: 0.1 },
        tyreBrake: { min: 0, max: 5, step: 1 },
        camberFront: { min: -2.0, max: -0.5, step: 0.1 },
        camberRear:  { min: -2.0, max: -0.5, step: 0.1 },
        toeFront: { min: -0.3, max: 0.3, step: 0.1 },
        toeRear:  { min: -0.3, max: 0.3, step: 0.1 },
    },

    // ═════════════════════════════════════════════════════════════════════════
    // RALLY2 / R5 — FIA Rally2 Standard (modern) and older R5 cars
    // Specs: 1.6L turbo naturally aspirated, 330 hp, AWD, manual gearbox
    // Restrictions: More adjustability than Rally1 but still regulated
    // ═════════════════════════════════════════════════════════════════════════

    skoda_fabia_r5_evo: {
        engineMap: { min: 0, max: 2, step: 1 }, // Limited boost maps
        finalRatio: { min: 3.5, max: 5.0, step: 0.05 },
        diffLockMin: 0, diffLockMax: 100, diffLockStep: 5,
        springRateFront: { min: 80, max: 160, step: 0.1 },
        springRateRear:  { min: 80, max: 160, step: 0.1 },
        arbFront: { min: 2, max: 20, step: 0.1 },
        arbRear:  { min: 2, max: 20, step: 0.1 },
        damperBump: { min: 1, max: 20, step: 1 },
        damperRebound: { min: 1, max: 20, step: 1 },
        rideHeight: { min: 75, max: 150, step: 1 },
        brakePower: { min: 40, max: 100, step: 1 },
        brakeBias: { min: 35, max: 65, step: 1 },
        tyrePressureFront: { min: 170, max: 220, step: 0.1 },
        tyrePressureRear:  { min: 170, max: 220, step: 0.1 },
        tyreBrake: { min: 0, max: 8, step: 1 },
        camberFront: { min: -2.5, max: 0.0, step: 0.1 },
        camberRear:  { min: -2.5, max: 0.0, step: 0.1 },
        toeFront: { min: -0.5, max: 0.5, step: 0.1 },
        toeRear:  { min: -0.5, max: 0.5, step: 0.1 },
    },

    ford_fiesta_r5_mk2: {
        engineMap: { min: 0, max: 2, step: 1 },
        finalRatio: { min: 3.5, max: 5.0, step: 0.05 },
        diffLockMin: 0, diffLockMax: 100, diffLockStep: 5,
        springRateFront: { min: 80, max: 160, step: 0.1 },
        springRateRear:  { min: 80, max: 160, step: 0.1 },
        arbFront: { min: 2, max: 20, step: 0.1 },
        arbRear:  { min: 2, max: 20, step: 0.1 },
        damperBump: { min: 1, max: 20, step: 1 },
        damperRebound: { min: 1, max: 20, step: 1 },
        rideHeight: { min: 75, max: 150, step: 1 },
        brakePower: { min: 40, max: 100, step: 1 },
        brakeBias: { min: 35, max: 65, step: 1 },
        tyrePressureFront: { min: 170, max: 220, step: 0.1 },
        tyrePressureRear:  { min: 170, max: 220, step: 0.1 },
        tyreBrake: { min: 0, max: 8, step: 1 },
        camberFront: { min: -2.5, max: 0.0, step: 0.1 },
        camberRear:  { min: -2.5, max: 0.0, step: 0.1 },
        toeFront: { min: -0.5, max: 0.5, step: 0.1 },
        toeRear:  { min: -0.5, max: 0.5, step: 0.1 },
    },

    peugeot_208_t16_r5: {
        engineMap: { min: 0, max: 2, step: 1 },
        finalRatio: { min: 3.5, max: 5.0, step: 0.05 },
        diffLockMin: 0, diffLockMax: 100, diffLockStep: 5,
        springRateFront: { min: 80, max: 160, step: 0.1 },
        springRateRear:  { min: 80, max: 160, step: 0.1 },
        arbFront: { min: 2, max: 20, step: 0.1 },
        arbRear:  { min: 2, max: 20, step: 0.1 },
        damperBump: { min: 1, max: 20, step: 1 },
        damperRebound: { min: 1, max: 20, step: 1 },
        rideHeight: { min: 75, max: 150, step: 1 },
        brakePower: { min: 40, max: 100, step: 1 },
        brakeBias: { min: 35, max: 65, step: 1 },
        tyrePressureFront: { min: 170, max: 220, step: 0.1 },
        tyrePressureRear:  { min: 170, max: 220, step: 0.1 },
        tyreBrake: { min: 0, max: 8, step: 1 },
        camberFront: { min: -2.5, max: 0.0, step: 0.1 },
        camberRear:  { min: -2.5, max: 0.0, step: 0.1 },
        toeFront: { min: -0.5, max: 0.5, step: 0.1 },
        toeRear:  { min: -0.5, max: 0.5, step: 0.1 },
    },

    // ═════════════════════════════════════════════════════════════════════════
    // RALLY4 — Junior/Entry Category
    // Specs: 1.6L naturally aspirated, 200 hp, FWD/AWD, manual gearbox
    // Restrictions: Basic setup only, less adjustability
    // ═════════════════════════════════════════════════════════════════════════

    alpine_a110_rally4: {
        engineMap: { min: 0, max: 0, step: 1 }, // No tuning
        finalRatio: { min: 3.2, max: 4.8, step: 0.05 },
        diffLockMin: 0, diffLockMax: 80, diffLockStep: 5,
        springRateFront: { min: 60, max: 130, step: 0.1 },
        springRateRear:  { min: 60, max: 130, step: 0.1 },
        arbFront: { min: 1, max: 15, step: 0.1 },
        arbRear:  { min: 1, max: 15, step: 0.1 },
        damperBump: { min: 1, max: 18, step: 1 },
        damperRebound: { min: 1, max: 18, step: 1 },
        rideHeight: { min: 80, max: 150, step: 1 },
        brakePower: { min: 50, max: 90, step: 1 },
        brakeBias: { min: 40, max: 60, step: 1 },
        tyrePressureFront: { min: 160, max: 200, step: 0.1 },
        tyrePressureRear:  { min: 160, max: 200, step: 0.1 },
        tyreBrake: { min: 0, max: 5, step: 1 },
        camberFront: { min: -2.0, max: 0.5, step: 0.1 },
        camberRear:  { min: -2.0, max: 0.5, step: 0.1 },
        toeFront: { min: -0.4, max: 0.4, step: 0.1 },
        toeRear:  { min: -0.4, max: 0.4, step: 0.1 },
    },

    peugeot_208_rally4: {
        engineMap: { min: 0, max: 0, step: 1 },
        finalRatio: { min: 3.2, max: 4.8, step: 0.05 },
        diffLockMin: 0, diffLockMax: 80, diffLockStep: 5,
        springRateFront: { min: 60, max: 130, step: 0.1 },
        springRateRear:  { min: 60, max: 130, step: 0.1 },
        arbFront: { min: 1, max: 15, step: 0.1 },
        arbRear:  { min: 1, max: 15, step: 0.1 },
        damperBump: { min: 1, max: 18, step: 1 },
        damperRebound: { min: 1, max: 18, step: 1 },
        rideHeight: { min: 80, max: 150, step: 1 },
        brakePower: { min: 50, max: 90, step: 1 },
        brakeBias: { min: 40, max: 60, step: 1 },
        tyrePressureFront: { min: 160, max: 200, step: 0.1 },
        tyrePressureRear:  { min: 160, max: 200, step: 0.1 },
        tyreBrake: { min: 0, max: 5, step: 1 },
        camberFront: { min: -2.0, max: 0.5, step: 0.1 },
        camberRear:  { min: -2.0, max: 0.5, step: 0.1 },
        toeFront: { min: -0.4, max: 0.4, step: 0.1 },
        toeRear:  { min: -0.4, max: 0.4, step: 0.1 },
    },

    opel_corsa_rally4: {
        engineMap: { min: 0, max: 0, step: 1 },
        finalRatio: { min: 3.2, max: 4.8, step: 0.05 },
        diffLockMin: 0, diffLockMax: 80, diffLockStep: 5,
        springRateFront: { min: 60, max: 130, step: 0.1 },
        springRateRear:  { min: 60, max: 130, step: 0.1 },
        arbFront: { min: 1, max: 15, step: 0.1 },
        arbRear:  { min: 1, max: 15, step: 0.1 },
        damperBump: { min: 1, max: 18, step: 1 },
        damperRebound: { min: 1, max: 18, step: 1 },
        rideHeight: { min: 80, max: 150, step: 1 },
        brakePower: { min: 50, max: 90, step: 1 },
        brakeBias: { min: 40, max: 60, step: 1 },
        tyrePressureFront: { min: 160, max: 200, step: 0.1 },
        tyrePressureRear:  { min: 160, max: 200, step: 0.1 },
        tyreBrake: { min: 0, max: 5, step: 1 },
        camberFront: { min: -2.0, max: 0.5, step: 0.1 },
        camberRear:  { min: -2.0, max: 0.5, step: 0.1 },
        toeFront: { min: -0.4, max: 0.4, step: 0.1 },
        toeRear:  { min: -0.4, max: 0.4, step: 0.1 },
    },

    // ═════════════════════════════════════════════════════════════════════════
    // RALLYCROSS SUPERCARS
    // Specs: High-powered AWD, turbo/supercharger, semi-slick tyres, cut grass courses
    // Restrictions: Suspension-focused, engine mapping locked per event
    // ═════════════════════════════════════════════════════════════════════════

    audi_s1_eks_rx: {
        engineMap: { min: 0, max: 1, step: 1 }, // Event-dependent
        finalRatio: { min: 2.5, max: 4.2, step: 0.05 },
        diffLockMin: 20, diffLockMax: 100, diffLockStep: 5, // Higher minimum
        springRateFront: { min: 100, max: 180, step: 0.1 },
        springRateRear:  { min: 100, max: 180, step: 0.1 },
        arbFront: { min: 5, max: 25, step: 0.1 },
        arbRear:  { min: 5, max: 25, step: 0.1 },
        damperBump: { min: 2, max: 22, step: 1 },
        damperRebound: { min: 2, max: 22, step: 1 },
        rideHeight: { min: 70, max: 130, step: 1 },
        brakePower: { min: 60, max: 100, step: 1 },
        brakeBias: { min: 38, max: 62, step: 1 },
        tyrePressureFront: { min: 200, max: 240, step: 0.1 }, // Higher for rallycross
        tyrePressureRear:  { min: 200, max: 240, step: 0.1 },
        tyreBrake: { min: 0, max: 10, step: 1 },
        camberFront: { min: -3.0, max: -0.5, step: 0.1 },
        camberRear:  { min: -3.0, max: -0.5, step: 0.1 },
        toeFront: { min: -0.6, max: 0.6, step: 0.1 },
        toeRear:  { min: -0.6, max: 0.6, step: 0.1 },
    },

    ford_fiesta_rx: {
        engineMap: { min: 0, max: 1, step: 1 },
        finalRatio: { min: 2.5, max: 4.2, step: 0.05 },
        diffLockMin: 20, diffLockMax: 100, diffLockStep: 5,
        springRateFront: { min: 100, max: 180, step: 0.1 },
        springRateRear:  { min: 100, max: 180, step: 0.1 },
        arbFront: { min: 5, max: 25, step: 0.1 },
        arbRear:  { min: 5, max: 25, step: 0.1 },
        damperBump: { min: 2, max: 22, step: 1 },
        damperRebound: { min: 2, max: 22, step: 1 },
        rideHeight: { min: 70, max: 130, step: 1 },
        brakePower: { min: 60, max: 100, step: 1 },
        brakeBias: { min: 38, max: 62, step: 1 },
        tyrePressureFront: { min: 200, max: 240, step: 0.1 },
        tyrePressureRear:  { min: 200, max: 240, step: 0.1 },
        tyreBrake: { min: 0, max: 10, step: 1 },
        camberFront: { min: -3.0, max: -0.5, step: 0.1 },
        camberRear:  { min: -3.0, max: -0.5, step: 0.1 },
        toeFront: { min: -0.6, max: 0.6, step: 0.1 },
        toeRear:  { min: -0.6, max: 0.6, step: 0.1 },
    },

    vw_polo_rx: {
        engineMap: { min: 0, max: 1, step: 1 },
        finalRatio: { min: 2.5, max: 4.2, step: 0.05 },
        diffLockMin: 20, diffLockMax: 100, diffLockStep: 5,
        springRateFront: { min: 100, max: 180, step: 0.1 },
        springRateRear:  { min: 100, max: 180, step: 0.1 },
        arbFront: { min: 5, max: 25, step: 0.1 },
        arbRear:  { min: 5, max: 25, step: 0.1 },
        damperBump: { min: 2, max: 22, step: 1 },
        damperRebound: { min: 2, max: 22, step: 1 },
        rideHeight: { min: 70, max: 130, step: 1 },
        brakePower: { min: 60, max: 100, step: 1 },
        brakeBias: { min: 38, max: 62, step: 1 },
        tyrePressureFront: { min: 200, max: 240, step: 0.1 },
        tyrePressureRear:  { min: 200, max: 240, step: 0.1 },
        tyreBrake: { min: 0, max: 10, step: 1 },
        camberFront: { min: -3.0, max: -0.5, step: 0.1 },
        camberRear:  { min: -3.0, max: -0.5, step: 0.1 },
        toeFront: { min: -0.6, max: 0.6, step: 0.1 },
        toeRear:  { min: -0.6, max: 0.6, step: 0.1 },
    },

    // ═════════════════════════════════════════════════════════════════════════
    // GROUP B — 1980s Legends (unrestricted, high power, aggressive setups)
    // Specs: 550-700 hp, no fuel restrictions, downforce, extreme aero
    // Restrictions: Minimal — these are legendary race cars
    // ═════════════════════════════════════════════════════════════════════════

    audi_s1_e2: {
        engineMap: { min: 0, max: 3, step: 1 }, // Full tuning available
        finalRatio: { min: 3.0, max: 5.2, step: 0.05 },
        diffLockMin: 0, diffLockMax: 100, diffLockStep: 5,
        springRateFront: { min: 120, max: 200, step: 0.1 },
        springRateRear:  { min: 120, max: 200, step: 0.1 },
        arbFront: { min: 8, max: 30, step: 0.1 },
        arbRear:  { min: 8, max: 30, step: 0.1 },
        damperBump: { min: 1, max: 24, step: 1 },
        damperRebound: { min: 1, max: 24, step: 1 },
        rideHeight: { min: 60, max: 150, step: 1 },
        brakePower: { min: 40, max: 100, step: 1 },
        brakeBias: { min: 30, max: 70, step: 1 },
        tyrePressureFront: { min: 180, max: 240, step: 0.1 },
        tyrePressureRear:  { min: 180, max: 240, step: 0.1 },
        tyreBrake: { min: 0, max: 12, step: 1 },
        camberFront: { min: -4.0, max: 0.0, step: 0.1 },
        camberRear:  { min: -4.0, max: 0.0, step: 0.1 },
        toeFront: { min: -0.8, max: 0.8, step: 0.1 },
        toeRear:  { min: -0.8, max: 0.8, step: 0.1 },
    },

    ford_rs200: {
        engineMap: { min: 0, max: 3, step: 1 },
        finalRatio: { min: 3.0, max: 5.2, step: 0.05 },
        diffLockMin: 0, diffLockMax: 100, diffLockStep: 5,
        springRateFront: { min: 120, max: 200, step: 0.1 },
        springRateRear:  { min: 120, max: 200, step: 0.1 },
        arbFront: { min: 8, max: 30, step: 0.1 },
        arbRear:  { min: 8, max: 30, step: 0.1 },
        damperBump: { min: 1, max: 24, step: 1 },
        damperRebound: { min: 1, max: 24, step: 1 },
        rideHeight: { min: 60, max: 150, step: 1 },
        brakePower: { min: 40, max: 100, step: 1 },
        brakeBias: { min: 30, max: 70, step: 1 },
        tyrePressureFront: { min: 180, max: 240, step: 0.1 },
        tyrePressureRear:  { min: 180, max: 240, step: 0.1 },
        tyreBrake: { min: 0, max: 12, step: 1 },
        camberFront: { min: -4.0, max: 0.0, step: 0.1 },
        camberRear:  { min: -4.0, max: 0.0, step: 0.1 },
        toeFront: { min: -0.8, max: 0.8, step: 0.1 },
        toeRear:  { min: -0.8, max: 0.8, step: 0.1 },
    },

    lancia_delta_s4: {
        engineMap: { min: 0, max: 3, step: 1 },
        finalRatio: { min: 3.0, max: 5.2, step: 0.05 },
        diffLockMin: 0, diffLockMax: 100, diffLockStep: 5,
        springRateFront: { min: 120, max: 200, step: 0.1 },
        springRateRear:  { min: 120, max: 200, step: 0.1 },
        arbFront: { min: 8, max: 30, step: 0.1 },
        arbRear:  { min: 8, max: 30, step: 0.1 },
        damperBump: { min: 1, max: 24, step: 1 },
        damperRebound: { min: 1, max: 24, step: 1 },
        rideHeight: { min: 60, max: 150, step: 1 },
        brakePower: { min: 40, max: 100, step: 1 },
        brakeBias: { min: 30, max: 70, step: 1 },
        tyrePressureFront: { min: 180, max: 240, step: 0.1 },
        tyrePressureRear:  { min: 180, max: 240, step: 0.1 },
        tyreBrake: { min: 0, max: 12, step: 1 },
        camberFront: { min: -4.0, max: 0.0, step: 0.1 },
        camberRear:  { min: -4.0, max: 0.0, step: 0.1 },
        toeFront: { min: -0.8, max: 0.8, step: 0.1 },
        toeRear:  { min: -0.8, max: 0.8, step: 0.1 },
    },

    peugeot_205_t16: {
        engineMap: { min: 0, max: 3, step: 1 },
        finalRatio: { min: 3.0, max: 5.2, step: 0.05 },
        diffLockMin: 0, diffLockMax: 100, diffLockStep: 5,
        springRateFront: { min: 120, max: 200, step: 0.1 },
        springRateRear:  { min: 120, max: 200, step: 0.1 },
        arbFront: { min: 8, max: 30, step: 0.1 },
        arbRear:  { min: 8, max: 30, step: 0.1 },
        damperBump: { min: 1, max: 24, step: 1 },
        damperRebound: { min: 1, max: 24, step: 1 },
        rideHeight: { min: 60, max: 150, step: 1 },
        brakePower: { min: 40, max: 100, step: 1 },
        brakeBias: { min: 30, max: 70, step: 1 },
        tyrePressureFront: { min: 180, max: 240, step: 0.1 },
        tyrePressureRear:  { min: 180, max: 240, step: 0.1 },
        tyreBrake: { min: 0, max: 12, step: 1 },
        camberFront: { min: -4.0, max: 0.0, step: 0.1 },
        camberRear:  { min: -4.0, max: 0.0, step: 0.1 },
        toeFront: { min: -0.8, max: 0.8, step: 0.1 },
        toeRear:  { min: -0.8, max: 0.8, step: 0.1 },
    },

    // ═════════════════════════════════════════════════════════════════════════
    // GROUP A — 1990s WRC Era (still-powerful, more restricted than Group B)
    // Specs: 400-450 hp, regulated fuel capacity, semi-slick tyres
    // Restrictions: Moderate — WRC-era reglament applies
    // ═════════════════════════════════════════════════════════════════════════

    ford_escort_rs_cosworth: {
        engineMap: { min: 0, max: 2, step: 1 },
        finalRatio: { min: 3.2, max: 5.0, step: 0.05 },
        diffLockMin: 0, diffLockMax: 100, diffLockStep: 5,
        springRateFront: { min: 100, max: 180, step: 0.1 },
        springRateRear:  { min: 100, max: 180, step: 0.1 },
        arbFront: { min: 6, max: 24, step: 0.1 },
        arbRear:  { min: 6, max: 24, step: 0.1 },
        damperBump: { min: 1, max: 22, step: 1 },
        damperRebound: { min: 1, max: 22, step: 1 },
        rideHeight: { min: 70, max: 150, step: 1 },
        brakePower: { min: 45, max: 95, step: 1 },
        brakeBias: { min: 35, max: 65, step: 1 },
        tyrePressureFront: { min: 180, max: 230, step: 0.1 },
        tyrePressureRear:  { min: 180, max: 230, step: 0.1 },
        tyreBrake: { min: 0, max: 10, step: 1 },
        camberFront: { min: -3.5, max: -0.5, step: 0.1 },
        camberRear:  { min: -3.5, max: -0.5, step: 0.1 },
        toeFront: { min: -0.7, max: 0.7, step: 0.1 },
        toeRear:  { min: -0.7, max: 0.7, step: 0.1 },
    },

    lancia_delta_hf_evo: {
        engineMap: { min: 0, max: 2, step: 1 },
        finalRatio: { min: 3.2, max: 5.0, step: 0.05 },
        diffLockMin: 0, diffLockMax: 100, diffLockStep: 5,
        springRateFront: { min: 100, max: 180, step: 0.1 },
        springRateRear:  { min: 100, max: 180, step: 0.1 },
        arbFront: { min: 6, max: 24, step: 0.1 },
        arbRear:  { min: 6, max: 24, step: 0.1 },
        damperBump: { min: 1, max: 22, step: 1 },
        damperRebound: { min: 1, max: 22, step: 1 },
        rideHeight: { min: 70, max: 150, step: 1 },
        brakePower: { min: 45, max: 95, step: 1 },
        brakeBias: { min: 35, max: 65, step: 1 },
        tyrePressureFront: { min: 180, max: 230, step: 0.1 },
        tyrePressureRear:  { min: 180, max: 230, step: 0.1 },
        tyreBrake: { min: 0, max: 10, step: 1 },
        camberFront: { min: -3.5, max: -0.5, step: 0.1 },
        camberRear:  { min: -3.5, max: -0.5, step: 0.1 },
        toeFront: { min: -0.7, max: 0.7, step: 0.1 },
        toeRear:  { min: -0.7, max: 0.7, step: 0.1 },
    },

    mitsubishi_galant_vr4: {
        engineMap: { min: 0, max: 2, step: 1 },
        finalRatio: { min: 3.2, max: 5.0, step: 0.05 },
        diffLockMin: 0, diffLockMax: 100, diffLockStep: 5,
        springRateFront: { min: 100, max: 180, step: 0.1 },
        springRateRear:  { min: 100, max: 180, step: 0.1 },
        arbFront: { min: 6, max: 24, step: 0.1 },
        arbRear:  { min: 6, max: 24, step: 0.1 },
        damperBump: { min: 1, max: 22, step: 1 },
        damperRebound: { min: 1, max: 22, step: 1 },
        rideHeight: { min: 70, max: 150, step: 1 },
        brakePower: { min: 45, max: 95, step: 1 },
        brakeBias: { min: 35, max: 65, step: 1 },
        tyrePressureFront: { min: 180, max: 230, step: 0.1 },
        tyrePressureRear:  { min: 180, max: 230, step: 0.1 },
        tyreBrake: { min: 0, max: 10, step: 1 },
        camberFront: { min: -3.5, max: -0.5, step: 0.1 },
        camberRear:  { min: -3.5, max: -0.5, step: 0.1 },
        toeFront: { min: -0.7, max: 0.7, step: 0.1 },
        toeRear:  { min: -0.7, max: 0.7, step: 0.1 },
    },

    // ═════════════════════════════════════════════════════════════════════════
    // HISTORIC — 1970s-1980s (minimal restrictions, basic mechanical adjustments)
    // Specs: 150-300 hp, no fuel restrictions, mechanical simplicity
    // Restrictions: Minimal — basic suspension/brake/gearing only
    // ═════════════════════════════════════════════════════════════════════════

    lancia_stratos: {
        engineMap: { min: 0, max: 0, step: 1 }, // Fixed, no tuning
        finalRatio: { min: 3.0, max: 4.8, step: 0.05 },
        diffLockMin: 0, diffLockMax: 100, diffLockStep: 5,
        springRateFront: { min: 80, max: 160, step: 0.1 },
        springRateRear:  { min: 80, max: 160, step: 0.1 },
        arbFront: { min: 3, max: 18, step: 0.1 },
        arbRear:  { min: 3, max: 18, step: 0.1 },
        damperBump: { min: 1, max: 20, step: 1 },
        damperRebound: { min: 1, max: 20, step: 1 },
        rideHeight: { min: 75, max: 150, step: 1 },
        brakePower: { min: 50, max: 90, step: 1 },
        brakeBias: { min: 40, max: 60, step: 1 },
        tyrePressureFront: { min: 160, max: 210, step: 0.1 },
        tyrePressureRear:  { min: 160, max: 210, step: 0.1 },
        tyreBrake: { min: 0, max: 6, step: 1 },
        camberFront: { min: -2.5, max: 0.0, step: 0.1 },
        camberRear:  { min: -2.5, max: 0.0, step: 0.1 },
        toeFront: { min: -0.5, max: 0.5, step: 0.1 },
        toeRear:  { min: -0.5, max: 0.5, step: 0.1 },
    },

    ford_sierra_rs500: {
        engineMap: { min: 0, max: 0, step: 1 },
        finalRatio: { min: 3.0, max: 4.8, step: 0.05 },
        diffLockMin: 0, diffLockMax: 100, diffLockStep: 5,
        springRateFront: { min: 80, max: 160, step: 0.1 },
        springRateRear:  { min: 80, max: 160, step: 0.1 },
        arbFront: { min: 3, max: 18, step: 0.1 },
        arbRear:  { min: 3, max: 18, step: 0.1 },
        damperBump: { min: 1, max: 20, step: 1 },
        damperRebound: { min: 1, max: 20, step: 1 },
        rideHeight: { min: 75, max: 150, step: 1 },
        brakePower: { min: 50, max: 90, step: 1 },
        brakeBias: { min: 40, max: 60, step: 1 },
        tyrePressureFront: { min: 160, max: 210, step: 0.1 },
        tyrePressureRear:  { min: 160, max: 210, step: 0.1 },
        tyreBrake: { min: 0, max: 6, step: 1 },
        camberFront: { min: -2.5, max: 0.0, step: 0.1 },
        camberRear:  { min: -2.5, max: 0.0, step: 0.1 },
        toeFront: { min: -0.5, max: 0.5, step: 0.1 },
        toeRear:  { min: -0.5, max: 0.5, step: 0.1 },
    },

    alpine_a110: {
        engineMap: { min: 0, max: 0, step: 1 },
        finalRatio: { min: 3.0, max: 4.8, step: 0.05 },
        diffLockMin: 0, diffLockMax: 80, diffLockStep: 5,
        springRateFront: { min: 80, max: 160, step: 0.1 },
        springRateRear:  { min: 80, max: 160, step: 0.1 },
        arbFront: { min: 3, max: 18, step: 0.1 },
        arbRear:  { min: 3, max: 18, step: 0.1 },
        damperBump: { min: 1, max: 20, step: 1 },
        damperRebound: { min: 1, max: 20, step: 1 },
        rideHeight: { min: 80, max: 150, step: 1 },
        brakePower: { min: 50, max: 85, step: 1 },
        brakeBias: { min: 45, max: 55, step: 1 },
        tyrePressureFront: { min: 160, max: 210, step: 0.1 },
        tyrePressureRear:  { min: 160, max: 210, step: 0.1 },
        tyreBrake: { min: 0, max: 5, step: 1 },
        camberFront: { min: -2.0, max: 0.5, step: 0.1 },
        camberRear:  { min: -2.0, max: 0.5, step: 0.1 },
        toeFront: { min: -0.4, max: 0.4, step: 0.1 },
        toeRear:  { min: -0.4, max: 0.4, step: 0.1 },
    },
};

/**
 * getDR2CarOverride(carId) → carOverrideObject | null
 *
 * Returns game-specific parameter ranges for the given Dirt Rally 2.0 car ID.
 * Returns null if car has no specific overrides (falls back to template defaults).
 *
 * @param {string} carId - Car identifier (e.g., 'toyota_gr_yaris_rally1')
 * @returns {object|null} Override constraints object or null
 *
 * USAGE (in services/overrides.js):
 *   import { getDR2CarOverride } from '../core/overrides/dr2_car_overrides.js';
 *   const override = getDR2CarOverride(selectedCarId);
 */
export function getDR2CarOverride(carId) {
    return DR2_CAR_OVERRIDES[carId] || null;
}

// Default export for module system compatibility
export default {
    getDR2CarOverride,
    DR2_CAR_OVERRIDES,
};
