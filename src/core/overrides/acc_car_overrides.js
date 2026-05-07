// ─────────────────────────────────────────────────────────────────────────────
// ACC_CAR_OVERRIDES — Rangos exactos por coche para Assetto Corsa Competizione
//
// FUENTES:
//   ✓ carData.js (HoraceHuang-ui/Competizione-Companion) — datos extraídos del
//     ejecutable del juego: wheelRates arrays, casterFunc, toeMins, brakeBiasMin,
//     steeringRatioMin, rideHeightMin.
//
//   ⚠ pending — no presentes en carData.js ni confirmados por otra vía.
//
// NOTA sobre Ride Height:
//   carData.js proporciona el valor mínimo en mm (slider index = 0).
//   El valor máximo en mm sigue siendo PENDIENTE_DE_VERIFICACION para todos
//   los coches hasta confirmar cuántos índices tiene el slider y el step real.
//
// NOTA sobre Bumpstop:
//   ACC muestra los bumpstops como índice (slider de 0 a N).
//   No hay función pública de conversión a N/mm para ningún coche.
//   Los valores aquí son PENDIENTE_DE_VERIFICACION.
//
// NOTA sobre ARB / Diff Preload:
//   También son índices de slider sin función de conversión pública.
//   Todos marcan como PENDIENTE_DE_VERIFICACION.
//
// FASE 4 — AUDITORÍA CONSERVADORA (8 GT3 PRIORITARIOS):
//   Splitter max = 0 VERIFICADO solo para: Porsche 992 GT3 R, Ferrari 296 GT3,
//   BMW M4 GT3 (splitter FIJO en posición 0 confirmado).
//   Todos los demás splitter ajustables (Mercedes, Lambo, McLaren, Audi, Aston,
//   y resto GT3/GT4) siguen como PENDIENTE_DE_VERIFICACION.
// ─────────────────────────────────────────────────────────────────────────────

const UNIVERSAL = {
    tyrePressureMax: 34.3,
    tyrePressureStep: 0.1,
    toeStep: 0.01,
    toeMax: 0.40,
    brakeBiasStep: 0.2,
    brakeDuctMin: 0,
    brakeDuctMax: 6,
    brakeDuctIndividual: true,  // per-wheel brake ducts
    rideHeightStep: 1,
    steeringRatioStep: 1,
    tireBlanketMin: 50,
    tireBlanketMax: 110,
    tireBlanketStep: 5,
    weightDistMin: 40,
    weightDistMax: 65,
    weightDistStep: 0.5,
    diffLockMin: 0,
    diffLockMax: 100,
    diffLockStep: 5,
    cgHeightMin: 0,
    cgHeightMax: 100,
    cgHeightStep: 1,
};

const ACC_CAR_OVERRIDES = {

    // ─────────────────────────────────────────────────────────────────────────
    // 1. PORSCHE 992 GT3 R — 2023
    // Notes: Splitter FIJO en posición 0 (no tiene opacidad ajustable).
    //        Único GT3 con ABS max = 11 (todos los demás GT3 tienen 12).
    //        Único GT3 con engineMap max = 9 (todos los demás tienen 8).
    // ─────────────────────────────────────────────────────────────────────────
    porsche_992_gt3_r: {
        // ── TYRES ─────────────────────────────────────────────────────────
        tyrePressureMin: 20.3,   // ✓ carData.js
        tyrePressureMax: 34.3,  // ✓ universal
        tyrePressureStep: 0.1,   // ✓ universal

        camberFrontMin: -4.0, camberFrontMax: -2.0, camberStep: 0.1,  // ⚠ pending
        camberRearMin:  -3.5, camberRearMax:  -1.5,

        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓ carData.js
        toeRearMin:  -0.40, toeRearMax:  0.40,

        casterMin: 6.5, casterMax: 12.4, casterSteps: 31,  // ✓ carData.js

        // ── MECHANICAL GRIP ───────────────────────────────────────────────
        arbFrontMin: 1, arbFrontMax: null,
        arbRearMin:  1, arbRearMax: null,

        // ✓ carData.js — array de valores N/mm
        wheelRateFront: [100.5, 110, 114, 119, 127, 137, 141.5, 146, 155, 173.5],
        wheelRateRear:  [137, 149.5, 156, 162, 174.5, 187, 193, 199.5, 212, 237],

        // ⚠ pending — bumpstopFn no disponible para este coche
        bumpStopRateUpMin: 0, bumpStopRateUpMax: null,
        bumpStopRateDnMin: 0, bumpStopRateDnMax: null,
        bumpStopRangeMin: 0, bumpStopRangeMax: null,

        brakePowerMin: 80, brakePowerMax: 100, brakePowerStep: 1,  // ⚠ pending

        brakeBiasMin: 43.0, brakeBiasMax: null, brakeBiasStep: 0.2,  // ⚠ pending max

        brakePads: [1, 2, 3, 4],

        steeringRatioMin: 11, steeringRatioMax: null,  // ⚠ pending

        diffPreloadMin: 20, diffPreloadMax: null, diffPreloadStep: 10,  // ⚠ pending

        // ⚠ pending — slider index, no hay convers N/mm
        dampersMin: 0, dampersMax: null,

        // ── AERO ──────────────────────────────────────────────────────────
        // ⚠ pending — carData.js solo da min en mm (slider index 0)
        rideHeightFrontMin: 53, rideHeightFrontMax: null,
        rideHeightRearMin:  55, rideHeightRearMax: null,
        rideHeightStep: 1,

        splitterMin: 0, splitterMax: 0,  // ✓ FIJO — no tiene splitter ajustable

        rearWingMin: 0, rearWingMax: null,  // ⚠ pending

        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓ universal

        // ── ELECTRONICS ──────────────────────────────────────────────────
        tc1Min: 0, tc1Max: null,  // ⚠ pending
        tc2Min: 0, tc2Max: null,  // ⚠ pending
        absMin: 0, absMax: null,  // ⚠ pending — único GT3 con max=11 (sin confirmar)
        engineMapMin: 1, engineMapMax: null,  // ⚠ pending — único GT3 con max=9 (sin confirmar)
        fuelMax: null,  // ⚠ pending
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 2. FERRARI 296 GT3 — 2023
    // Notes: Splitter FIJO en posición 0. Coche nuevo — datos limitados.
    // ─────────────────────────────────────────────────────────────────────────
    ferrari_296_gt3: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓

        camberFrontMin: -4.0, camberFrontMax: -2.0, camberStep: 0.1,  // ⚠ pending
        camberRearMin:  -3.5, camberRearMax:  -1.5,

        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,

        casterMin: 8.5, casterMax: 13.8, casterSteps: 31,  // ✓ carData.js

        arbFrontMin: 1, arbFrontMax: null,
        arbRearMin:  1, arbRearMax: null,

        // ✓ carData.js
        wheelRateFront: [163.769, 170.068, 176.367, 182.666, 188.964, 195.263, 201.562, 207.861, 214.16],
        wheelRateRear:  [122.091, 129.273, 136.455, 143.637, 150.818, 158.0, 165.182, 172.364, 179.546],

        bumpStopRateUpMin: 0, bumpStopRateUpMax: null,
        bumpStopRateDnMin: 0, bumpStopRateDnMax: null,
        bumpStopRangeMin: 0, bumpStopRangeMax: null,

        brakePowerMin: 80, brakePowerMax: 100, brakePowerStep: 1,  // ⚠ pending

        brakeBiasMin: 50.0, brakeBiasMax: null, brakeBiasStep: 0.2,  // ⚠ pending max

        brakePads: [1, 2, 3, 4],

        steeringRatioMin: 13, steeringRatioMax: null,  // ⚠ pending

        diffPreloadMin: 20, diffPreloadMax: null, diffPreloadStep: 10,  // ⚠ pending

        dampersMin: 0, dampersMax: null,  // ⚠ pending

        rideHeightFrontMin: 50, rideHeightFrontMax: null,
        rideHeightRearMin:  50, rideHeightRearMax: null,
        rideHeightStep: 1,

        splitterMin: 0, splitterMax: 0,  // ✓ FIJO

        rearWingMin: 0, rearWingMax: null,  // ⚠ pending

        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓

        tc1Min: 0, tc1Max: null,  // ⚠ pending
        tc2Min: 0, tc2Max: null,  // ⚠ pending
        absMin: 0, absMax: null,  // ⚠ pending
        engineMapMin: 1, engineMapMax: null,  // ⚠ pending
        fuelMax: null,  // ⚠ pending
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 3. BMW M4 GT3 — 2022
    // Notes: Splitter FIJO en 0. toeMins asimétrico [−0.20, 0.00].
    // ─────────────────────────────────────────────────────────────────────────
    bmw_m4_gt3: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓

        camberFrontMin: -4.0, camberFrontMax: -2.0, camberStep: 0.1,  // ⚠ pending
        camberRearMin:  -3.5, camberRearMax:  -1.5,

        toeFrontMin: -0.20, toeFrontMax: 0.40, toeStep: 0.01,  // ✓ carData.js
        toeRearMin:   0.00, toeRearMax:  0.40,

        // ⚠ pending — casterFn incompleta en carData.js
        casterMin: 6.1, casterMax: null, casterSteps: null,

        arbFrontMin: 1, arbFrontMax: null,
        arbRearMin:  1, arbRearMax: null,

        // ✓ carData.js
        wheelRateFront: [105, 120, 135, 150, 165, 180],
        wheelRateRear:  [90, 105, 120, 135, 150, 165],

        bumpStopRateUpMin: 0, bumpStopRateUpMax: null,
        bumpStopRateDnMin: 0, bumpStopRateDnMax: null,
        bumpStopRangeMin: 0, bumpStopRangeMax: null,

        brakePowerMin: 80, brakePowerMax: 100, brakePowerStep: 1,  // ⚠ pending

        brakeBiasMin: 48.5, brakeBiasMax: null, brakeBiasStep: 0.2,  // ⚠ pending max

        brakePads: [1, 2, 3, 4],

        steeringRatioMin: 10, steeringRatioMax: null,  // ⚠ pending

        diffPreloadMin: 20, diffPreloadMax: null, diffPreloadStep: 10,  // ⚠ pending

        dampersMin: 0, dampersMax: null,  // ⚠ pending

        rideHeightFrontMin: 50, rideHeightFrontMax: null,
        rideHeightRearMin:  50, rideHeightRearMax: null,
        rideHeightStep: 1,

        splitterMin: 0, splitterMax: 0,  // ✓ FIJO

        rearWingMin: 0, rearWingMax: null,  // ⚠ pending

        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓

        tc1Min: 0, tc1Max: null,  // ⚠ pending
        tc2Min: 0, tc2Max: null,  // ⚠ pending
        absMin: 0, absMax: null,  // ⚠ pending
        engineMapMin: 1, engineMapMax: null,  // ⚠ pending
        fuelMax: null,  // ⚠ pending
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 4. MERCEDES-AMG GT3 EVO — 2020
    // Notes: Ride Height asimétrico (front=50mm, rear=67mm en slider index 0).
    //        Splitter AJUSTABLE (no confirmado en carData.js).
    //        Caster casterFn incompleta — solo 2 pasos disponibles en carData.js.
    // ─────────────────────────────────────────────────────────────────────────
    mercedes_amg_gt3_evo: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓

        camberFrontMin: -4.0, camberFrontMax: -2.0, camberStep: 0.1,  // ⚠ pending
        camberRearMin:  -3.5, camberRearMax:  -1.5,

        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,

        // ⚠ pending — casterFn incompleta (2 pasos)
        casterMin: 6.0, casterMax: 14.1, casterSteps: null,

        arbFrontMin: 1, arbFrontMax: null,
        arbRearMin:  1, arbRearMax: null,

        // ✓ carData.js
        wheelRateFront: [130, 143, 155, 171, 187, 202],
        wheelRateRear:  [71, 83, 95, 107, 119, 131],

        bumpStopRateUpMin: 0, bumpStopRateUpMax: null,
        bumpStopRateDnMin: 0, bumpStopRateDnMax: null,
        bumpStopRangeMin: 0, bumpStopRangeMax: null,

        brakePowerMin: 80, brakePowerMax: 100, brakePowerStep: 1,  // ⚠ pending

        brakeBiasMin: 50.0, brakeBiasMax: null, brakeBiasStep: 0.2,  // ⚠ pending max

        brakePads: [1, 2, 3, 4],

        steeringRatioMin: 11, steeringRatioMax: null,  // ⚠ pending

        diffPreloadMin: 20, diffPreloadMax: null, diffPreloadStep: 10,  // ⚠ pending

        dampersMin: 0, dampersMax: null,  // ⚠ pending

        rideHeightFrontMin: 50, rideHeightFrontMax: null,
        rideHeightRearMin:  67, rideHeightRearMax: null,
        rideHeightStep: 1,

        splitterMin: 0, splitterMax: null,  // ⚠ pending — no confirmado en carData.js

        rearWingMin: 0, rearWingMax: null,  // ⚠ pending

        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓

        tc1Min: 0, tc1Max: null,  // ⚠ pending
        tc2Min: 0, tc2Max: null,  // ⚠ pending
        absMin: 0, absMax: null,  // ⚠ pending
        engineMapMin: 1, engineMapMax: null,  // ⚠ pending
        fuelMax: null,  // ⚠ pending
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 5. LAMBORGHINI HURACÁN GT3 EVO2 — 2023
    // Notes: Dampers ANÓMALOS — único GT3 con valores muy superiores al resto
    //        (observado hasta 32+ en setups). No confundir con bug; es así.
    //        Splitter AJUSTABLE.
    // ─────────────────────────────────────────────────────────────────────────
    lamborghini_huracan_gt3_evo2: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓

        camberFrontMin: -4.0, camberFrontMax: -2.0, camberStep: 0.1,  // ⚠ pending
        camberRearMin:  -3.5, camberRearMax:  -1.5,

        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,

        casterMin: 6.2, casterMax: 15.0, casterSteps: 35,  // ✓ carData.js

        arbFrontMin: 1, arbFrontMax: null,
        arbRearMin:  1, arbRearMax: null,

        // ✓ carData.js
        wheelRateFront: [121, 144, 167, 190, 201, 212],
        wheelRateRear:  [117, 136, 154, 164, 173, 191],

        bumpStopRateUpMin: 0, bumpStopRateUpMax: null,
        bumpStopRateDnMin: 0, bumpStopRateDnMax: null,
        bumpStopRangeMin: 0, bumpStopRangeMax: null,

        brakePowerMin: 80, brakePowerMax: 100, brakePowerStep: 1,  // ⚠ pending

        brakeBiasMin: 50.0, brakeBiasMax: null, brakeBiasStep: 0.2,  // ⚠ pending max

        brakePads: [1, 2, 3, 4],

        steeringRatioMin: 10, steeringRatioMax: null,  // ⚠ pending

        diffPreloadMin: 20, diffPreloadMax: null, diffPreloadStep: 10,  // ⚠ pending

        // ⚠ ANÓMALO — único GT3 con damper hasta 32+. Todos los demás GT3 son 0-10.
        dampersMin: 0, dampersMax: null,

        rideHeightFrontMin: 54, rideHeightFrontMax: null,
        rideHeightRearMin:  54, rideHeightRearMax: null,
        rideHeightStep: 1,

        splitterMin: 0, splitterMax: null,  // ⚠ pending

        rearWingMin: 0, rearWingMax: null,  // ⚠ pending

        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓

        tc1Min: 0, tc1Max: null,  // ⚠ pending
        tc2Min: 0, tc2Max: null,  // ⚠ pending
        absMin: 0, absMax: null,  // ⚠ pending
        engineMapMin: 1, engineMapMax: null,  // ⚠ pending
        fuelMax: null,  // ⚠ pending
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 6. McLAREN 720S GT3 EVO — 2023
    // Notes: toeMins asimétrico [−0.48, −0.10].
    //        Ride Height asimétrico (front=50mm, rear=64mm).
    //        Distinguir del 720S base (no EVO) que tiene wheelRates distintos.
    // ─────────────────────────────────────────────────────────────────────────
    mclaren_720s_gt3_evo: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓

        camberFrontMin: -4.0, camberFrontMax: -2.0, camberStep: 0.1,  // ⚠ pending
        camberRearMin:  -3.5, camberRearMax:  -1.5,

        toeFrontMin: -0.48, toeFrontMax: 0.40, toeStep: 0.01,  // ✓ carData.js
        toeRearMin:  -0.10, toeRearMax:  0.40,

        casterMin: 5.3, casterMax: 16.3, casterSteps: 47,  // ✓ carData.js

        arbFrontMin: 1, arbFrontMax: null,
        arbRearMin:  1, arbRearMax: null,

        // ✓ carData.js
        wheelRateFront: [118, 134, 150, 166, 182, 198, 214, 230],
        wheelRateRear:  [83, 97, 111, 125, 139, 153, 167, 181, 195, 209],

        bumpStopRateUpMin: 0, bumpStopRateUpMax: null,
        bumpStopRateDnMin: 0, bumpStopRateDnMax: null,
        bumpStopRangeMin: 0, bumpStopRangeMax: null,

        brakePowerMin: 80, brakePowerMax: 100, brakePowerStep: 1,  // ⚠ pending

        brakeBiasMin: 47.0, brakeBiasMax: null, brakeBiasStep: 0.2,  // ⚠ pending max

        brakePads: [1, 2, 3, 4],

        steeringRatioMin: 11, steeringRatioMax: null,  // ⚠ pending

        diffPreloadMin: 20, diffPreloadMax: null, diffPreloadStep: 10,  // ⚠ pending

        dampersMin: 0, dampersMax: null,  // ⚠ pending

        rideHeightFrontMin: 50, rideHeightFrontMax: null,
        rideHeightRearMin:  64, rideHeightRearMax: null,
        rideHeightStep: 1,

        splitterMin: 0, splitterMax: null,  // ⚠ pending

        rearWingMin: 0, rearWingMax: null,  // ⚠ pending

        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓

        tc1Min: 0, tc1Max: null,  // ⚠ pending
        tc2Min: 0, tc2Max: null,  // ⚠ pending
        absMin: 0, absMax: null,  // ⚠ pending
        engineMapMin: 1, engineMapMax: null,  // ⚠ pending
        fuelMax: null,  // ⚠ pending
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 7. AUDI R8 LMS GT3 EVO II — 2022
    // Notes: Mismos wheelRates que R8 base y R8 Evo.
    //        Caster con amplio rango (8.8°–16.8°).
    //        Splitter AJUSTABLE.
    // ─────────────────────────────────────────────────────────────────────────
    audi_r8_lms_evo_ii: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓

        camberFrontMin: -4.0, camberFrontMax: -2.0, camberStep: 0.1,  // ⚠ pending
        camberRearMin:  -3.5, camberRearMax:  -1.5,

        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,

        casterMin: 8.8, casterMax: 16.8, casterSteps: 35,  // ✓ carData.js

        arbFrontMin: 1, arbFrontMax: null,
        arbRearMin:  1, arbRearMax: null,

        // ✓ carData.js — idéntico al R8 base y R8 Evo
        wheelRateFront: [112, 132, 153, 174, 185, 195],
        wheelRateRear:  [124, 144, 163, 173, 183, 202],

        bumpStopRateUpMin: 0, bumpStopRateUpMax: null,
        bumpStopRateDnMin: 0, bumpStopRateDnMax: null,
        bumpStopRangeMin: 0, bumpStopRangeMax: null,

        brakePowerMin: 80, brakePowerMax: 100, brakePowerStep: 1,  // ⚠ pending

        brakeBiasMin: 50.0, brakeBiasMax: null, brakeBiasStep: 0.2,  // ⚠ pending max

        brakePads: [1, 2, 3, 4],

        steeringRatioMin: 12, steeringRatioMax: null,  // ⚠ pending

        diffPreloadMin: 20, diffPreloadMax: null, diffPreloadStep: 10,  // ⚠ pending

        dampersMin: 0, dampersMax: null,  // ⚠ pending

        rideHeightFrontMin: 54, rideHeightFrontMax: null,
        rideHeightRearMin:  54, rideHeightRearMax: null,
        rideHeightStep: 1,

        splitterMin: 0, splitterMax: null,  // ⚠ pending

        rearWingMin: 0, rearWingMax: null,  // ⚠ pending

        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓

        tc1Min: 0, tc1Max: null,  // ⚠ pending
        tc2Min: 0, tc2Max: null,  // ⚠ pending
        absMin: 0, absMax: null,  // ⚠ pending
        engineMapMin: 1, engineMapMax: null,  // ⚠ pending
        fuelMax: null,  // ⚠ pending
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 8. ASTON MARTIN V8 VANTAGE GT3 EVO — 2019
    // Notes: brakeBiasMin = 57.0% — el más alto de todos los GT3.
    //        casterFn incompleta — solo min = 10.7° confirmado.
    //        Splitter AJUSTABLE.
    // ─────────────────────────────────────────────────────────────────────────
    amr_v8_vantage_gt3: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓

        camberFrontMin: -4.0, camberFrontMax: -2.0, camberStep: 0.1,  // ⚠ pending
        camberRearMin:  -3.5, camberRearMax:  -1.5,

        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,

        // ⚠ pending — casterFn incompleta (min=10.7° solo)
        casterMin: 10.7, casterMax: null, casterSteps: null,

        arbFrontMin: 1, arbFrontMax: null,
        arbRearMin:  1, arbRearMax: null,

        // ✓ carData.js
        wheelRateFront: [115, 125, 135, 145, 155, 165, 175, 185],
        wheelRateRear:  [105, 115, 125, 135, 145, 155, 165, 175, 185, 195],

        bumpStopRateUpMin: 0, bumpStopRateUpMax: null,
        bumpStopRateDnMin: 0, bumpStopRateDnMax: null,
        bumpStopRangeMin: 0, bumpStopRangeMax: null,

        brakePowerMin: 80, brakePowerMax: 100, brakePowerStep: 1,  // ⚠ pending

        // ⚠ pending max — carData.js solo da min=57.0
        brakeBiasMin: 57.0, brakeBiasMax: null, brakeBiasStep: 0.2,

        brakePads: [1, 2, 3, 4],

        steeringRatioMin: 14, steeringRatioMax: null,  // ⚠ pending

        diffPreloadMin: 20, diffPreloadMax: null, diffPreloadStep: 10,  // ⚠ pending

        dampersMin: 0, dampersMax: null,  // ⚠ pending

        rideHeightFrontMin: 55, rideHeightFrontMax: null,
        rideHeightRearMin:  55, rideHeightRearMax: null,
        rideHeightStep: 1,

        splitterMin: 0, splitterMax: null,  // ⚠ pending

        rearWingMin: 0, rearWingMax: null,  // ⚠ pending

        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓

        tc1Min: 0, tc1Max: null,  // ⚠ pending
        tc2Min: 0, tc2Max: null,  // ⚠ pending
        absMin: 0, absMax: null,  // ⚠ pending
        engineMapMin: 1, engineMapMax: null,  // ⚠ pending
        fuelMax: null,  // ⚠ pending
    },

    // ═══════════════════════════════════════════════════════════════════════
    // RESTO GT3
    // Todos pending para campos no-verificados. Solo campos de carData.js
    // marcados como ✓ a continuación.
    // ═══════════════════════════════════════════════════════════════════════

    amr_v12_vantage_gt3: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 8.3, casterMax: null, casterSteps: null,
        wheelRateFront: [115,120,125,130,135,140,145,150,155,160,165,170,175,180,185],  // ✓
        wheelRateRear:  [95,100,105,110,115,120,125,130,135,140,145,150,155,160,165,170,175,180,185,190,195],  // ✓
        brakeBiasMin: 57.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 14,  // ⚠ pending max
        rideHeightFrontMin: 55, rideHeightRearMin: 55, rideHeightStep: 1,  // ⚠ pending max
        arbFrontMin: 1, arbRearMin: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    audi_r8_lms: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 8.8, casterMax: 16.8, casterSteps: 35,  // ✓
        wheelRateFront: [112, 132, 153, 174, 185, 195],  // ✓
        wheelRateRear:  [124, 144, 163, 173, 183, 202],  // ✓
        brakeBiasMin: 50.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 12,  // ⚠ pending max
        rideHeightFrontMin: 54, rideHeightRearMin: 54, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    audi_r8_lms_evo: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 8.8, casterMax: 16.8, casterSteps: 35,  // ✓
        wheelRateFront: [112, 132, 153, 174, 185, 195],  // ✓
        wheelRateRear:  [124, 144, 163, 173, 183, 202],  // ✓
        brakeBiasMin: 50.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 12,  // ⚠ pending max
        rideHeightFrontMin: 54, rideHeightRearMin: 54, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    bentley_continental_gt3_2018: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 8.3, casterMax: null, casterSteps: null,
        wheelRateFront: [115,120,125,130,135,140,145,150,155,160,165,170,175,180,185],  // ✓
        wheelRateRear:  [95,100,105,110,115,120,125,130,135,140,145,150,155,160,165,170,175,180,185,190,195],  // ✓
        brakeBiasMin: 57.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 10,  // ⚠ pending max
        rideHeightFrontMin: 54, rideHeightRearMin: 54, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    bmw_m6_gt3: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.20, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:   0.00, toeRearMax:  0.40,
        casterMin: 6.7, casterMax: null, casterSteps: null,
        wheelRateFront: [136, 146, 156, 166, 176, 186],  // ✓
        wheelRateRear:  [96, 106, 116, 126, 136, 146],  // ✓
        brakeBiasMin: 47.5, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 10,  // ⚠ pending max
        rideHeightFrontMin: 52, rideHeightRearMin: 52, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    ferrari_488_gt3_evo: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 5.0, casterMax: 20.6, casterSteps: 99,  // ✓
        wheelRateFront: [94, 101, 107, 113, 120, 126, 138.6, 151, 163.8, 176, 189],  // ✓
        wheelRateRear:  [106, 113, 120, 127, 134, 141, 155, 169.5, 183.6, 198, 212],  // ✓
        brakeBiasMin: 47.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 10,  // ⚠ pending max
        rideHeightFrontMin: 55, rideHeightRearMin: 55, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    ferrari_488_gt3: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 5.0, casterMax: 20.6, casterSteps: 99,  // ✓
        wheelRateFront: [94, 101, 107, 113, 120, 126, 138.6, 151, 163.8, 176, 189],  // ✓
        wheelRateRear:  [106, 113, 120, 127, 134, 141, 155, 169.5, 183.6, 198, 212],  // ✓
        brakeBiasMin: 47.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 10,  // ⚠ pending max
        rideHeightFrontMin: 55, rideHeightRearMin: 55, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    honda_nsx_gt3: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 8.8, casterMax: null, casterSteps: null,
        wheelRateFront: [115,124,133,142,151,160,169,178,187,196],  // ✓
        wheelRateRear:  [115,124,133,142,151,160,169,178,187,196,205],  // ✓
        brakeBiasMin: 50.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 10,  // ⚠ pending max
        rideHeightFrontMin: 54, rideHeightRearMin: 54, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    honda_nsx_gt3_evo: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 7.2, casterMax: null, casterSteps: null,
        wheelRateFront: [73,79.08,85.16,91.24,97.32,103.4,109.48,115.56,121.64,127.72,133.8,139.88,145.96,152.04,158.12,164.2,170.28],  // ✓
        wheelRateRear:  [126.8,134.7,142.6,150.5,158.4,166.3,174.2,182.1,190,197.9,205.8,213.7,221.6,229.5,237.4,245.3,253.2],  // ✓
        brakeBiasMin: 44.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 10,  // ⚠ pending max
        rideHeightFrontMin: 54, rideHeightRearMin: 54, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    lamborghini_huracan_gt3: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 6.2, casterMax: 15.0, casterSteps: 35,  // ✓
        wheelRateFront: [121, 144, 167, 190, 201, 212],  // ✓
        wheelRateRear:  [117, 136, 154, 164, 173, 191],  // ✓
        brakeBiasMin: 50.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 10,  // ⚠ pending max
        rideHeightFrontMin: 54, rideHeightRearMin: 54, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,  // ⚠ — damper anómalo posible
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    lamborghini_huracan_gt3_evo: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 6.2, casterMax: 15.0, casterSteps: 35,  // ✓
        wheelRateFront: [121, 144, 167, 190, 201, 212],  // ✓
        wheelRateRear:  [117, 136, 154, 164, 173, 191],  // ✓
        brakeBiasMin: 50.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 10,  // ⚠ pending max
        rideHeightFrontMin: 54, rideHeightRearMin: 54, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,  // ⚠ — damper anómalo posible
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    lexus_rc_f_gt3: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 7.9, casterMax: null, casterSteps: null,
        wheelRateFront: [96, 115, 134, 154, 173, 192],  // ✓
        wheelRateRear:  [87, 112, 136, 154, 175, 210],  // ✓
        brakeBiasMin: 50.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 11,  // ⚠ pending max
        rideHeightFrontMin: 50, rideHeightRearMin: 65, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    mclaren_720s_gt3: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.48, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.10, toeRearMax:  0.40,
        casterMin: 5.3, casterMax: 8.0, casterSteps: 12,  // ✓
        wheelRateFront: [118, 134, 150, 166, 182, 198, 214, 230],  // ✓
        wheelRateRear:  [114, 128, 142, 156, 170, 184, 198, 212],  // ✓
        brakeBiasMin: 47.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 11,  // ⚠ pending max
        rideHeightFrontMin: 50, rideHeightRearMin: 64, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    mclaren_650s_gt3: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 5.3, casterMax: null, casterSteps: null,
        wheelRateFront: [126, 136, 146, 156, 166, 176],  // ✓
        wheelRateRear:  [126, 136, 146, 156, 166, 176],  // ✓
        brakeBiasMin: 47.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 11,  // ⚠ pending max
        rideHeightFrontMin: 56, rideHeightRearMin: 56, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    mercedes_amg_gt3: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 6.0, casterMax: 14.1, casterSteps: null,  // ⚠ pending steps
        wheelRateFront: [130, 143, 155, 171, 187, 202],  // ✓
        wheelRateRear:  [71, 83, 95, 107, 119, 131],  // ✓
        brakeBiasMin: 50.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 11,  // ⚠ pending max
        rideHeightFrontMin: 42, rideHeightRearMin: 67, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    nissan_gt_r_gt3_2017: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.20, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:   0.00, toeRearMax:  0.40,
        casterMin: 6.0, casterMax: null, casterSteps: null,
        wheelRateFront: [122, 132, 142, 152, 162, 172, 182],  // ✓
        wheelRateRear:  [94, 104, 114, 124, 134, 144, 154],  // ✓
        brakeBiasMin: 47.5, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 12,  // ⚠ pending max
        rideHeightFrontMin: 55, rideHeightRearMin: 55, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    nissan_gt_r_gt3_2018: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.20, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:   0.00, toeRearMax:  0.40,
        casterMin: 12.5, casterMax: null, casterSteps: null,
        wheelRateFront: [136, 146, 156, 166, 176, 186],  // ✓
        wheelRateRear:  [96, 106, 116, 126, 136, 146],  // ✓
        brakeBiasMin: 47.5, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 12,  // ⚠ pending max
        rideHeightFrontMin: 55, rideHeightRearMin: 55, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    porsche_991_gt3_r: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 7.3, casterMax: null, casterSteps: null,
        wheelRateFront: [83, 100, 116, 133, 149, 166],  // ⚠ pending verificar array
        wheelRateRear:  [155, 128, 141, 154, 167, 180],  // ⚠ dato cuestionable
        brakeBiasMin: 43.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 11,  // ⚠ pending max
        rideHeightFrontMin: 60, rideHeightRearMin: 60, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    porsche_991ii_gt3_r: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 4.4, casterMax: null, casterSteps: null,
        wheelRateFront: [100.5, 110, 114, 119, 127, 137, 141.5, 146, 155, 173.5],  // ✓
        wheelRateRear:  [137, 149.5, 156, 162, 174.5, 187, 193, 199.5, 212, 237],  // ✓
        brakeBiasMin: 43.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 11,  // ⚠ pending max
        rideHeightFrontMin: 53, rideHeightRearMin: 55, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    bentley_continental_gt3_2016: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 8.3, casterMax: null, casterSteps: null,
        wheelRateFront: [115,120,125,130,135,140,145,150,155,160,165,170,175,180,185],  // ⚠ verificar
        wheelRateRear:  [95,100,105,110,115,120,125,130,135,140,145,150,155,160,165,170,175,180,185,190,195],  // ⚠ verificar
        brakeBiasMin: 57.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 10,  // ⚠ pending max
        rideHeightFrontMin: 54, rideHeightRearMin: 54, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    jaguar_g3: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 4.0, casterMax: null, casterSteps: null,
        wheelRateFront: [100,105,110,115,120,125,130,135,140,145,150,155,160,165,170,175,180,185],  // ⚠ verificar
        wheelRateRear:  [120,125,130,135,140,145,150,155,160,165,170,175,180,185,190,195],  // ⚠ verificar
        brakeBiasMin: 57.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 10,  // ⚠ pending max
        rideHeightFrontMin: 60, rideHeightRearMin: 60, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    lamborghini_gallardo_rex: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 4.9, casterMax: null, casterSteps: null,
        wheelRateFront: [121,126,131,136,141,146,151,156,161,166,171,176,181,186,191,196,201,206,211],  // ⚠ verificar
        wheelRateRear:  [117,122,127,132,137,142,147,152,157,162,167,182,187],  // ⚠ verificar
        brakeBiasMin: 50.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 10,  // ⚠ pending max
        rideHeightFrontMin: 54, rideHeightRearMin: 54, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    // ═══════════════════════════════════════════════════════════════════════
    // GT4
    // ═══════════════════════════════════════════════════════════════════════

    alpine_a110_gt4: {
        tyrePressureMin: 17.0, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 7.3, casterMax: 13.7, casterSteps: 35,  // ✓
        wheelRateFront: [62.5, 72.5, 82.5, 92.5],  // ✓
        wheelRateRear:  [73.3, 83.3, 93.3, 103.3],  // ✓
        brakeBiasMin: 45.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 12,  // ⚠ pending max
        rideHeightFrontMin: 95, rideHeightRearMin: 85, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    amr_v8_vantage_gt4: {
        tyrePressureMin: 17.0, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 10.7, casterMax: null, casterSteps: null,
        wheelRateFront: [80, 90, 100, 110],  // ⚠ verificar
        wheelRateRear:  [70, 75, 80],  // ⚠ verificar
        brakeBiasMin: 45.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 14,  // ⚠ pending max
        rideHeightFrontMin: 98, rideHeightRearMin: 102, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    audi_r8_gt4: {
        tyrePressureMin: 17.0, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 6.6, casterMax: 13.3, casterSteps: 35,  // ✓
        wheelRateFront: [142, 160],  // ⚠ verificar
        wheelRateRear:  [146, 163],  // ⚠ verificar
        brakeBiasMin: 50.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 14,  // ⚠ pending max
        rideHeightFrontMin: 105, rideHeightRearMin: 107, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    bmw_m4_gt4: {
        tyrePressureMin: 17.0, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.20, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:   0.00, toeRearMax:  0.40,
        casterMin: 8.4, casterMax: 8.4, casterSteps: 1,  // ✓ — fijo
        wheelRateFront: [165.888, 184.32, 202.752],  // ✓
        wheelRateRear:  [103.335, 117.113, 130.891],  // ⚠ verificar
        brakeBiasMin: 49.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 10,  // ⚠ pending max
        rideHeightFrontMin: 80, rideHeightRearMin: 75, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    chevrolet_camaro_gt4r: {
        tyrePressureMin: 17.0, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.20, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:   0.00, toeRearMax:  0.40,
        casterMin: 7.1, casterMax: 7.1, casterSteps: 1,  // ✓ — fijo
        wheelRateFront: [165.888, 184.32, 202.752],  // ⚠ verificar
        wheelRateRear:  [90, 102, 114],  // ⚠ verificar
        brakeBiasMin: 47.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 10,  // ⚠ pending max
        rideHeightFrontMin: 115, rideHeightRearMin: 123, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    ginetta_g55_gt4: {
        tyrePressureMin: 17.0, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 3.7, casterMax: null, casterSteps: null,
        wheelRateFront: [80, 90, 100, 110, 120],  // ⚠ verificar
        wheelRateRear:  [60, 70, 80, 90, 100],  // ⚠ verificar
        brakeBiasMin: 46.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 11,  // ⚠ pending max
        rideHeightFrontMin: 75, rideHeightRearMin: 76, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    ktm_xbow_gt4: {
        tyrePressureMin: 17.0, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 1.7, casterMax: null, casterSteps: null,
        wheelRateFront: [87, 97, 107, 117, 127],  // ⚠ verificar
        wheelRateRear:  [81, 91, 101, 111, 121, 131],  // ⚠ verificar
        brakeBiasMin: 44.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 11,  // ⚠ pending max
        rideHeightFrontMin: 110, rideHeightRearMin: 110, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    maserati_mc_gt4: {
        tyrePressureMin: 17.0, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 3.4, casterMax: null, casterSteps: null,
        wheelRateFront: [116, 151, 186],  // ⚠ verificar
        wheelRateRear:  [113, 138, 163],  // ⚠ verificar
        brakeBiasMin: 49.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 14,  // ⚠ pending max
        rideHeightFrontMin: 80, rideHeightRearMin: 105, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    mclaren_570s_gt4: {
        tyrePressureMin: 17.0, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 5.3, casterMax: null, casterSteps: null,
        wheelRateFront: [140, 175],  // ⚠ verificar
        wheelRateRear:  [162.85, 175.52],  // ⚠ verificar
        brakeBiasMin: 60.0, brakeBiasStep: 0.2,  // ⚠ pending max — bias más alto que todos los GT4
        steeringRatioMin: 11,  // ⚠ pending max
        rideHeightFrontMin: 95, rideHeightRearMin: 95, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    mercedes_amg_gt4: {
        tyrePressureMin: 17.0, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.20, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:   0.00, toeRearMax:  0.40,
        casterMin: 9.2, casterMax: null, casterSteps: null,
        wheelRateFront: [78, 88, 104],  // ⚠ verificar
        wheelRateRear:  [66],  // ⚠ único valor — confirmar in-game
        brakeBiasMin: 51.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 10,  // ⚠ pending max
        rideHeightFrontMin: 103, rideHeightRearMin: 101, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: 3,  // ⚠ pendiente — solo 3 mapas?
        fuelMax: null,
    },

    porsche_718_cayman_gt4_mr: {
        tyrePressureMin: 17.0, tyrePressureMax: 34.3, tyrePressureStep: 0.1,  // ✓
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,  // ✓
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 7.3, casterMax: 10.2, casterSteps: 29,  // ✓
        wheelRateFront: [99, 108, 116, 124],  // ⚠ verificar
        wheelRateRear:  [91, 99, 108, 116, 124],  // ⚠ verificar
        brakeBiasMin: 45.0, brakeBiasStep: 0.2,  // ⚠ pending max
        steeringRatioMin: 15,  // ⚠ pending max
        rideHeightFrontMin: 106, rideHeightRearMin: 94, rideHeightStep: 1,  // ⚠ pending max
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,  // ✓
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    // ─────────────────────────────────────────────────────────────────────────
    // GT3 ADICIONALES — Datos genéricos de clase GT3
    // ─────────────────────────────────────────────────────────────────────────
    aston_martin_vantage_gt3_2018: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 10.7, casterMax: null, casterSteps: null,
        wheelRateFront: [115, 125, 135, 145, 155, 165, 175, 185],
        wheelRateRear:  [105, 115, 125, 135, 145, 155, 165, 175, 185, 195],
        brakeBiasMin: 57.0, brakeBiasStep: 0.2,
        steeringRatioMin: 14,
        rideHeightFrontMin: 55, rideHeightRearMin: 55, rideHeightStep: 1,
        arbFrontMin: 1, arbRearMin: 1,
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    porsche_991_gt3_rs: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 6.5, casterMax: 12.4, casterSteps: 31,
        wheelRateFront: [100.5, 110, 114, 119, 127, 137, 141.5, 146, 155, 173.5],
        wheelRateRear:  [137, 149.5, 156, 162, 174.5, 187, 193, 199.5, 212, 237],
        brakeBiasMin: 50.0, brakeBiasStep: 0.2,
        steeringRatioMin: 11,
        rideHeightFrontMin: 53, rideHeightRearMin: 55, rideHeightStep: 1,
        arbFrontMin: 1, arbRearMin: 1,
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

    porsche_991_gt3_cup: {
        tyrePressureMin: 20.3, tyrePressureMax: 34.3, tyrePressureStep: 0.1,
        toeFrontMin: -0.40, toeFrontMax: 0.40, toeStep: 0.01,
        toeRearMin:  -0.40, toeRearMax:  0.40,
        casterMin: 6.5, casterMax: 12.4, casterSteps: 31,
        wheelRateFront: [100.5, 110, 114, 119, 127, 137, 141.5, 146, 155, 173.5],
        wheelRateRear:  [137, 149.5, 156, 162, 174.5, 187, 193, 199.5, 212, 237],
        brakeBiasMin: 50.0, brakeBiasStep: 0.2,
        steeringRatioMin: 11,
        rideHeightFrontMin: 53, rideHeightRearMin: 55, rideHeightStep: 1,
        arbFrontMin: 1, arbRearMin: 1,
        dampersMin: 0, dampersMax: null,
        brakeDuctMin: 0, brakeDuctMax: 6,
        tc1Min: 0, tc1Max: null,
        tc2Min: 0, tc2Max: null,
        absMin: 0, absMax: null,
        engineMapMin: 1, engineMapMax: null,
        fuelMax: null,
    },

};

export function getCarOverride(carId) {
    return ACC_CAR_OVERRIDES[carId] ?? null;
}

// FASE 4 — RESULTADOS DE AUDITORÍA CONSERVADORA (8 GT3 PRIORITARIOS):
//   ✓ splitterMax = 0 VERIFIED: Porsche 992 GT3 R, Ferrari 296 GT3, BMW M4 GT3 (FIJO)
//   ⚠ ABS/TC/TC2 max: PENDIENTE en todos los 8 GT3 (incl. Porsche 992 que tiene max=11 único)
//   ⚠ engineMap max: PENDIENTE en todos los 8 GT3 (incl. Porsche 992 que tiene max=9 único)
//   ⚠ brakeBias max: PENDIENTE en todos los 8 GT3
//   ⚠ steeringRatio max: PENDIENTE en todos los 8 GT3
//   ⚠ diffPreload max: PENDIENTE en todos los 8 GT3
//   ⚠ dampers max: PENDIENTE en todos los 8 GT3
//   ⚠ rearWing max: PENDIENTE en todos los 8 GT3
//   ⚠ fuelMax: PENDIENTE en todos los 8 GT3

export const GLOBAL_PENDING = [
    'Ride Height max Front/Rear (mm): TODOS los coches — carData.js solo da min en slider index 0',
    'ARB Front/Rear max: TODOS los coches — slider index sin función de conversión pública',
    'Bumpstop Rate Up/Dn: TODOS los coches — slider index sin convers N/mm',
    'Bumpstop Range: TODOS los coches — slider index sin convers a mm',
    'Diff Preload max: TODOS los GT3/GT4 — slider index sin función de conversión',
    'Brake Bias max: TODOS los GT3/GT4 — carData.js solo da min',
    'Steering Ratio max: TODOS los GT3/GT4 — carData.js solo da min',
    'Camber min/max: TODOS los GT3/GT4 — camberFn no disponible en carData.js',
    'Caster max/steps: BMW M4, Aston Martin, Mercedes, Honda NSX base, otros con casterFn incompleta',
    'ABS max: TODOS los GT3/GT4 — no en carData.js (incl. Porsche 992 único con max=11 sin verificar)',
    'TC1/TC2 max: TODOS los GT3/GT4 — no en carData.js',
    'engineMap max: TODOS los GT3/GT4 — no en carData.js (incl. Porsche 992 único con max=9 sin verificar)',
    'Fuel tank capacity: TODOS los GT3/GT4 — no disponible en carData.js',
    'Splitter max GT3 ajustables: Mercedes, Lamborghini, McLaren, Audi, Aston Martin — PENDIENTE (splitter FIJO solo en Porsche 992, Ferrari 296, BMW M4)',
    'Rear Wing max: TODOS los GT3/GT4 — no disponible en carData.js',
    'Lamborghini Huracán (base, Evo, Evo2) dampers: ANÓMALO — único GT3 con valores hasta 32+ observado en setups',
    'Mercedes-AMG GT4 wheelRateRear: solo 1 valor registrado — confirmar in-game',
];
