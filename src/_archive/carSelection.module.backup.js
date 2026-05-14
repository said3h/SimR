/**
 * Car selection service
 * Handles car selection for all games (ACC, F1, GT7, iRacing)
 */

import { GAME_CARS } from '../../core/cars.js';
import { getGameOverride, applyGameOverrides, updateOverrideStatus } from './overrides.js';
import { appState } from '../state.js';

/**
 * Populate ACC car select with optgroups by brand
 */
export function populateAccCarSelect() {
  const sel = document.getElementById('car-select-acc');
  if (!sel) return;

  const cars = GAME_CARS.acc || [];

  // Group by brand
  const byBrand = {};
  const ungrouped = [];

  for (const car of cars) {
    const brand = getCarBrand(car.name);
    if (brand) {
      if (!byBrand[brand]) byBrand[brand] = [];
      byBrand[brand].push(car);
    } else {
      ungrouped.push(car);
    }
  }

  const makeOptions = (carList) =>
    carList.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

  const brandOrder = [
    'Ferrari', 'Lamborghini', 'Porsche', 'BMW', 'Mercedes-AMG',
    'Audi', 'Aston Martin', 'McLaren', 'Honda', 'Nissan', 'Lexus',
    'Bentley', 'Alfa Romeo', 'Jaguar', 'Ginetta', 'KTM', 'Maserati',
    'Alpine', 'Chevrolet'
  ];

  let html = `<option value="">— Selecciona coche —</option>`;

  for (const brand of brandOrder) {
    if (!byBrand[brand]) continue;
    html += `<optgroup label="${brand}">${makeOptions(byBrand[brand])}</optgroup>`;
  }

  if (ungrouped.length > 0) {
    ungrouped.sort((a, b) => a.name.localeCompare(b.name));
    html += `<optgroup label="Other">${makeOptions(ungrouped)}</optgroup>`;
  }

  sel.innerHTML = html;
}

/**
 * Populate F1 car select
 */
export function populateF1CarSelect() {
  const sel = document.getElementById('car-select-f1');
  if (!sel) return;

  const cars = GAME_CARS.f1_24 || [];
  const makeOptions = (carList) =>
    carList.map(c => `<option value="${c.id || c}">${typeof c === 'string' ? c : c.name}</option>`).join('');

  sel.innerHTML = `<option value="">— Selecciona monoplaza —</option>` +
    `${makeOptions(cars)}`;
}

/**
 * Populate GT7 car select
 */
export function populateGT7CarSelect() {
  const sel = document.getElementById('car-select-gt7');
  if (!sel) return;

  const cars = GAME_CARS.gt7 || [];
  const makeOptions = (carList) =>
    carList.map(c => `<option value="${c.id || c}">${typeof c === 'string' ? c : c.name}</option>`).join('');

  sel.innerHTML = `<option value="">— Selecciona coche —</option>` +
    `${makeOptions(cars)}`;
}

/**
 * Populate iRacing car select
 */
export function populateIRacingCarSelect() {
  const sel = document.getElementById('car-select-iracing');
  if (!sel) return;

  const cars = GAME_CARS.iracing || [];
  const makeOptions = (carList) =>
    carList.map(c => `<option value="${c.id || c}">${typeof c === 'string' ? c : c.name}</option>`).join('');

  sel.innerHTML = `<option value="">— Selecciona coche —</option>` +
    `${makeOptions(cars)}`;
}

/**
 * Update car field visibility based on game
 * Shows appropriate car selector/input for the selected game
 */
export function updateCarField(gameId) {
  const nameInput = document.getElementById('car-name');
  const accSelect = document.getElementById('car-select-acc');
  const f1Select = document.getElementById('car-select-f1');
  const gt7Select = document.getElementById('car-select-gt7');
  const iracingSelect = document.getElementById('car-select-iracing');

  // Hide all
  [nameInput, accSelect, f1Select, gt7Select, iracingSelect].forEach(el => {
    if (!el) return;
    if (el.tagName === 'INPUT') {
      el.classList.add('hidden');
      el.removeAttribute('required');
    } else {
      el.classList.add('hidden');
      el.removeAttribute('required');
    }
  });

  // Show relevant one
  const selectors = {
    acc: accSelect,
    f1_24: f1Select,
    gt7: gt7Select,
    iracing: iracingSelect
  };

  const selector = selectors[gameId];
  if (selector) {
    selector.classList.remove('hidden');
    selector.setAttribute('required', '');
  } else if (nameInput) {
    nameInput.classList.remove('hidden');
    nameInput.setAttribute('required', '');
  }
}

/**
 * Get car name from car ID
 * @param {string} gameId - Game ID
 * @param {string} carId - Car ID
 * @returns {string} Car name or empty
 */
export function getGameCarName(gameId, carId) {
  if (!carId) return '';

  const cars = GAME_CARS[gameId] || [];

  if (cars.length === 0) return '';

  // If first element is string, this is a simple string array
  if (typeof cars[0] === 'string') {
    const found = cars.find(c => c === carId || (typeof c === 'object' && c.id === carId));
    return typeof found === 'string' ? found : (found?.name || '');
  }

  // Object array with id and name properties
  const found = cars.find(c => c && c.id === carId);
  return found ? found.name : '';
}

/**
 * Get car brand from car name (ACC only)
 * @param {string} carName
 * @returns {string|null} Brand or null
 */
function getCarBrand(carName) {
  if (!carName) return null;

  const brands = {
    'Ferrari':       ['Ferrari'],
    'Lamborghini':   ['Lamborghini'],
    'Porsche':       ['Porsche'],
    'BMW':           ['BMW'],
    'Mercedes-AMG':  ['Mercedes-AMG'],
    'Audi':          ['Audi'],
    'Aston Martin':  ['Aston Martin'],
    'McLaren':       ['McLaren'],
    'Honda':         ['Honda'],
    'Nissan':        ['Nissan'],
    'Lexus':         ['Lexus'],
    'Bentley':       ['Bentley'],
    'Alfa Romeo':    ['Alfa Romeo'],
    'Jaguar':        ['Emil Frey Jaguar'],
    'Ginetta':       ['Ginetta'],
    'KTM':           ['KTM'],
    'Maserati':      ['Maserati'],
    'Alpine':        ['Alpine'],
    'Chevrolet':     ['Chevrolet'],
  };

  for (const [brand, prefixes] of Object.entries(brands)) {
    if (prefixes.some(prefix => carName.startsWith(prefix + ' '))) {
      return brand;
    }
  }

  return null;
}

/**
 * Handle car selection change
 * @param {string} gameId
 * @param {string} carId
 * @param {Function} onOverrideLoaded - Callback when override is loaded
 */
export function onCarSelected(gameId, carId, onOverrideLoaded = null) {
  const override = carId ? getGameOverride(gameId, carId) : null;
  appState._activeOverride = override;

  // Update UI
  updateOverrideStatus(carId, override, gameId);

  // Callback
  if (onOverrideLoaded) {
    onOverrideLoaded(override);
  }
}

/**
 * Update override status UI element
 * @param {string} carId
 * @param {Object} override
 * @param {string} gameId
 */
export function updateOverrideStatus(carId, override, gameId) {
  const { appState, dom } = require('../state.js');
  const el = dom.carOverrideStatus;
  if (!el) return;

  if (!carId || !override) {
    el.classList.add('hidden');
    el.textContent = '';
    return;
  }

  const carName = getGameCarName(gameId, carId);
  const className = getCarClassFromId(carId);

  el.classList.remove('hidden');
  el.textContent = `${className} · Rangos específicos cargados ✓`;
}

/**
 * Get car class from car ID
 * @param {string} carId
 * @returns {string}
 */
function getCarClassFromId(carId) {
  if (carId.includes('gt3')) return 'GT3';
  if (carId.includes('gt4')) return 'GT4';
  if (carId.includes('cup') || carId.includes('challenge')) return 'GTC';
  return 'GT3';
}
