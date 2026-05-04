/**
 * Game-specific car override logic
 * Handles min/max/step values per car/game
 */

import { getCarOverride as getAccCarOverride } from '../../core/overrides/acc_car_overrides.js';
import { getF1CarOverride } from '../../core/overrides/f1_car_overrides.js';
import { getGT7CarOverride } from '../../core/overrides/gt7_car_overrides.js';
import { getIRacingCarOverride } from '../../core/overrides/iracing_car_overrides.js';
import { getDR2CarOverride } from '../../core/overrides/dr2_car_overrides.js';
import { getWRCCarOverride } from '../../core/overrides/wrc_car_overrides.js';

/**
 * Param → Override key mappings (extensible)
 *
 * Note: For nested override objects like finalRatio: { min: 3.8, max: 4.8, step: 0.05 },
 * we need to extract min/max/step from nested structure at apply-time (see applyGameOverrides).
 * For flat override values, map directly to template parameter IDs.
 */
const OVERRIDE_MAPS = {
  acc: {
    pres_fl:        { min: 'tyrePressureMin',    max: 'tyrePressureMax',    step: 'tyrePressureStep' },
    pres_fr:        { min: 'tyrePressureMin',    max: 'tyrePressureMax',    step: 'tyrePressureStep' },
    pres_rl:        { min: 'tyrePressureMin',    max: 'tyrePressureMax',    step: 'tyrePressureStep' },
    pres_rr:        { min: 'tyrePressureMin',    max: 'tyrePressureMax',    step: 'tyrePressureStep' },
    camber_f:       { min: 'camberFrontMin',     max: 'camberFrontMax',     step: 'camberStep'       },
    camber_r:       { min: 'camberRearMin',      max: 'camberRearMax',      step: 'camberStep'       },
    toe_f:          { min: 'toeFrontMin',        max: 'toeMax',             step: 'toeStep'          },
    toe_r:          { min: 'toeRearMin',         max: 'toeMax',             step: 'toeStep'          },
    caster:         { min: 'casterMin',          max: 'casterMax'                                    },
    arb_f:          { min: 'arbFrontMin',        max: 'arbFrontMax'                                  },
    arb_r:          { min: 'arbRearMin',         max: 'arbRearMax'                                   },
    wrate_f:        { array: 'wheelRateFront'                                                        },
    wrate_r:        { array: 'wheelRateRear'                                                         },
    brake_power:    { min: 'brakePowerMin',      max: 'brakePowerMax',      step: 'brakePowerStep'   },
    brake_bias:     { min: 'brakeBiasMin',       max: 'brakeBiasMax',       step: 'brakeBiasStep'    },
    steering_ratio: { min: 'steeringRatioMin',   max: 'steeringRatioMax'                             },
    diff_preload:   { min: 'diffPreloadMin',     max: 'diffPreloadMax',     step: 'diffPreloadStep'  },
    rh_f:           { min: 'rideHeightFrontMin', max: 'rideHeightFrontMax', step: 'rideHeightStep'   },
    rh_r:           { min: 'rideHeightRearMin',  max: 'rideHeightRearMax',  step: 'rideHeightStep'   },
  },
  f1_24: {
    w_f:    { min: 'wingFrontMin',   max: 'wingFrontMax',   step: 'wingFrontStep'  },
    w_r:    { min: 'wingRearMin',    max: 'wingRearMax',    step: 'wingRearStep'  },
  },
  gt7: {
    pow:    { min: 'powerLimitMin',  max: 'powerLimitMax',  step: 1  },
  },
  iracing: {
    p_fl:   { min: 'tyrePressureMin', max: 'tyrePressureMax', step: 'tyrePressureStep' },
  },
  dr2: {
    // Map template param IDs to override nested object keys
    // Nested objects follow pattern: { min: x, max: y, step: z }
    df_final:        { nested: 'finalRatio' },
    spring_f:        { nested: 'springRateFront' },
    spring_r:        { nested: 'springRateRear' },
    damper_bump:     { nested: 'damperBump' },
    damper_rebound:  { nested: 'damperRebound' },
    arb_f:           { nested: 'arbFront' },
    arb_r:           { nested: 'arbRear' },
    height:          { nested: 'rideHeight' },
    brake_power:     { nested: 'brakePower' },
    brake_bias:      { nested: 'brakeBias' },
    tyre_pres_f:     { nested: 'tyrePressureFront' },
    tyre_pres_r:     { nested: 'tyrePressureRear' },
    tyre_thermal:    { nested: 'tyreBrake' },
    camber_f:        { nested: 'camberFront' },
    camber_r:        { nested: 'camberRear' },
    toe_f:           { nested: 'toeFront' },
    toe_r:           { nested: 'toeRear' },
    // Note: df_lock_* params use template defaults; override diff lock constraints are flat (diffLockMin/Max/Step)
  },
  wrc: {
    // Will be completed after validating WRC override structure
    final_ratio:         { nested: 'finalRatio' },
    diff_lock_accel:     { nested: 'diffLockAccel' },
    diff_lock_coast:     { nested: 'diffLockCoast' },
    diff_lock_decel:     { nested: 'diffLockDecel' },
    spring_f:            { nested: 'springRateFront' },
    spring_r:            { nested: 'springRateRear' },
    damper_bump_slow_f:  { nested: 'damperBumpSlowFront' },
    damper_bump_slow_r:  { nested: 'damperBumpSlowRear' },
    damper_bump_fast_f:  { nested: 'damperBumpFastFront' },
    damper_bump_fast_r:  { nested: 'damperBumpFastRear' },
    damper_rebound_slow_f: { nested: 'damperReboundSlowFront' },
    damper_rebound_slow_r: { nested: 'damperReboundSlowRear' },
    damper_rebound_fast_f: { nested: 'damperReboundFastFront' },
    damper_rebound_fast_r: { nested: 'damperReboundFastRear' },
    arb_f:               { nested: 'arbFront' },
    arb_r:               { nested: 'arbRear' },
    height_f:            { nested: 'rideHeightFront' },
    height_r:            { nested: 'rideHeightRear' },
    brake_power_f:       { nested: 'brakePowerFront' },
    brake_power_r:       { nested: 'brakePowerRear' },
    brake_bias:          { nested: 'brakeBias' },
    handbrake:           { nested: 'handbrakePower' },
    tyre_pres_f:         { nested: 'tyrePressureFront' },
    tyre_pres_r:         { nested: 'tyrePressureRear' },
    tyre_wear:           { nested: 'tyreWear' },
    camber_f:            { nested: 'camberFront' },
    camber_r:            { nested: 'camberRear' },
    toe_f:               { nested: 'toeFront' },
    toe_r:               { nested: 'toeRear' },
  },
  ac: {
    // Assetto Corsa
    tyre_pressure_f:     { min: 'tyrePressureMin', max: 'tyrePressureMax' },
    tyre_pressure_r:     { min: 'tyrePressureMin', max: 'tyrePressureMax' },
    spring_f:            { min: 'springMin', max: 'springMax' },
    spring_r:            { min: 'springMin', max: 'springMax' },
    arb_f:               { min: 'arbMin', max: 'arbMax' },
    arb_r:               { min: 'arbMin', max: 'arbMax' },
    height_f:            { min: 'heightMin', max: 'heightMax' },
    height_r:            { min: 'heightMin', max: 'heightMax' },
    brake_power:         { min: 'brakePowerMin', max: 'brakePowerMax' },
    brake_balance:       { min: 'brakeBiasMin', max: 'brakeBiasMax' },
    camber_f:            { min: 'camberMin', max: 'camberMax' },
    camber_r:            { min: 'camberMin', max: 'camberMax' },
    toe_f:               { min: 'toeMin', max: 'toeMax' },
    toe_r:               { min: 'toeMin', max: 'toeMax' },
    wing_f:              { min: 'wingMin', max: 'wingMax' },
    wing_r:              { min: 'wingMin', max: 'wingMax' },
  },
  forza: {
    // Forza Motorsport
    tyre_pressure_f:     { min: 'tyrePressureMin', max: 'tyrePressureMax' },
    tyre_pressure_r:     { min: 'tyrePressureMin', max: 'tyrePressureMax' },
    spring_f:            { min: 'springMin', max: 'springMax' },
    spring_r:            { min: 'springMin', max: 'springMax' },
    arb_f:               { min: 'arbMin', max: 'arbMax' },
    arb_r:               { min: 'arbMin', max: 'arbMax' },
    height:              { min: 'heightMin', max: 'heightMax' },
    brake_power:         { min: 'brakePowerMin', max: 'brakePowerMax' },
    brake_balance:       { min: 'brakeBiasMin', max: 'brakeBiasMax' },
    final_ratio:         { min: 'ratioMin', max: 'ratioMax' },
    diff_lock:           { min: 'diffLockMin', max: 'diffLockMax' },
    wing_f:              { min: 'wingMin', max: 'wingMax' },
    wing_r:              { min: 'wingMin', max: 'wingMax' },
  },
  rf2: {
    // rFactor 2
    tyre_pressure_f:     { min: 'tyrePressureMin', max: 'tyrePressureMax' },
    tyre_pressure_r:     { min: 'tyrePressureMin', max: 'tyrePressureMax' },
    spring_f:            { min: 'springMin', max: 'springMax' },
    spring_r:            { min: 'springMin', max: 'springMax' },
    damper_f:            { min: 'damperMin', max: 'damperMax' },
    damper_r:            { min: 'damperMin', max: 'damperMax' },
    arb_f:               { min: 'arbMin', max: 'arbMax' },
    arb_r:               { min: 'arbMin', max: 'arbMax' },
    brake_balance:       { min: 'brakeBiasMin', max: 'brakeBiasMax' },
    brake_pressure:      { min: 'brakePressureMin', max: 'brakePressureMax' },
    camber_f:            { min: 'camberMin', max: 'camberMax' },
    camber_r:            { min: 'camberMin', max: 'camberMax' },
    toe_f:               { min: 'toeMin', max: 'toeMax' },
    toe_r:               { min: 'toeMin', max: 'toeMax' },
    final_ratio:         { min: 'ratioMin', max: 'ratioMax' },
  },
  ams2: {
    // Automobilista 2
    tyre_pressure_f:     { min: 'tyrePressureMin', max: 'tyrePressureMax' },
    tyre_pressure_r:     { min: 'tyrePressureMin', max: 'tyrePressureMax' },
    spring_f:            { min: 'springMin', max: 'springMax' },
    spring_r:            { min: 'springMin', max: 'springMax' },
    arb_f:               { min: 'arbMin', max: 'arbMax' },
    arb_r:               { min: 'arbMin', max: 'arbMax' },
    brake_balance:       { min: 'brakeBiasMin', max: 'brakeBiasMax' },
    brake_power:         { min: 'brakePowerMin', max: 'brakePowerMax' },
    final_ratio:         { min: 'ratioMin', max: 'ratioMax' },
    diff_lock:           { min: 'diffLockMin', max: 'diffLockMax' },
    camber_f:            { min: 'camberMin', max: 'camberMax' },
    camber_r:            { min: 'camberMin', max: 'camberMax' },
  },
  rbr: {
    // Richard Burns Rally
    final_ratio:         { min: 'ratioMin', max: 'ratioMax' },
    diff_lock:           { min: 'diffLockMin', max: 'diffLockMax' },
    spring_f:            { min: 'springMin', max: 'springMax' },
    spring_r:            { min: 'springMin', max: 'springMax' },
    damper_f:            { min: 'damperMin', max: 'damperMax' },
    damper_r:            { min: 'damperMin', max: 'damperMax' },
    arb:                 { min: 'arbMin', max: 'arbMax' },
    height:              { min: 'heightMin', max: 'heightMax' },
    brake_balance:       { min: 'brakeBiasMin', max: 'brakeBiasMax' },
    brake_pressure:      { min: 'brakePressureMin', max: 'brakePressureMax' },
    tyre_pressure_f:     { min: 'tyrePressureMin', max: 'tyrePressureMax' },
    tyre_pressure_r:     { min: 'tyrePressureMin', max: 'tyrePressureMax' },
    camber_f:            { min: 'camberMin', max: 'camberMax' },
    camber_r:            { min: 'camberMin', max: 'camberMax' },
    toe_f:               { min: 'toeMin', max: 'toeMax' },
    toe_r:               { min: 'toeMin', max: 'toeMax' },
  }
};

/**
 * Get override function for a game
 * @param {string} gameId - Game identifier (acc, f1_24, gt7, iracing, dr2, wrc)
 * @param {string} carId - Car identifier
 * @returns {Object|null} Override object or null
 */
export function getGameOverride(gameId, carId) {
  if (gameId === 'acc') return getAccCarOverride(carId);
  if (gameId === 'f1_24') return getF1CarOverride(carId);
  if (gameId === 'gt7') return getGT7CarOverride(carId);
  if (gameId === 'iracing') return getIRacingCarOverride(carId);
  if (gameId === 'dr2') return getDR2CarOverride(carId);
  if (gameId === 'wrc') return getWRCCarOverride(carId);
  return null;
}

/**
 * Apply overrides to template params
 * @param {string} gameId - Game identifier
 * @param {Array} params - Template param array
 * @param {Object} override - Override object from getGameOverride()
 * @returns {Array} Patched params array
 */
export function applyGameOverrides(gameId, params, override) {
  if (!override || !params) return params;

  const map = OVERRIDE_MAPS[gameId];
  if (!map) return params;

  return params.map(p => {
    const entry = map[p.id];
    if (!entry) return p;

    const patched = { ...p };

    // Handle nested objects (e.g., finalRatio: { min: 3.8, max: 4.8, step: 0.05 })
    if (entry.nested) {
      const nestedObj = override[entry.nested];
      if (nestedObj && typeof nestedObj === 'object') {
        // Extract min/max/step from nested object
        if (typeof nestedObj.min === 'number') patched.min = nestedObj.min;
        if (typeof nestedObj.max === 'number') patched.max = nestedObj.max;
        if (typeof nestedObj.step === 'number') patched.step = nestedObj.step;
      }
      return patched;
    }

    if (entry.array) {
      const arr = override[entry.array];
      if (Array.isArray(arr) && arr.length > 0) {
        patched.min = arr[0];
        patched.max = arr[arr.length - 1];
      }
      return patched;
    }

    // Apply min/max/step from flat override keys
    for (const [prop, key] of Object.entries(entry)) {
      const val = override[key];
      if (typeof val === 'number') patched[prop] = val;
    }

    return patched;
  });
}

/**
 * Update override status UI
 * @param {string} carId - Car identifier
 * @param {Object} override - Override object
 * @param {string} gameId - Game identifier
 */
export function updateOverrideStatus(carId, override, gameId) {
  const el = document.getElementById('car-override-status');
  if (!el) return;

  if (!carId || !override) {
    el.classList.add('hidden');
    el.textContent = '';
    return;
  }

  // Get car name from GAME_CARS
  const carName = getGameCarName(gameId, carId);
  const className = getCarClassFromId(carId);

  el.classList.remove('hidden');
  el.textContent = `${className} · Rangos específicos cargados ✓`;
}

/**
 * Get car name from car ID
 * @param {string} gameId
 * @param {string} carId
 * @returns {string} Car name or empty
 */
function getGameCarName(gameId, carId) {
  // Placeholder — implement based on game
  return '';
}

/**
 * Get car class (GT3, GT4, etc.) from car ID
 * @param {string} carId
 * @returns {string}
 */
function getCarClassFromId(carId) {
  if (carId.includes('gt3')) return 'GT3';
  if (carId.includes('gt4')) return 'GT4';
  if (carId.includes('cup') || carId.includes('challenge')) return 'GTC';
  return 'GT3'; // default
}
