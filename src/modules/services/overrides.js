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

    if (entry.array) {
      const arr = override[entry.array];
      if (Array.isArray(arr) && arr.length > 0) {
        patched.min = arr[0];
        patched.max = arr[arr.length - 1];
      }
      return patched;
    }

    // Apply min/max/step from override
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
