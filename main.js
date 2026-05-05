import './style.css';
import {
    createIcons,
    ShieldCheck, LogIn, Gauge, Plus, ArrowLeft,
    Trash2, ChevronRight,
    Search, Download, Upload, Copy, Star, StarOff, Filter,
    Columns, X, FileDown, QrCode, Scan, History, Mic,
    Activity, Globe, UploadCloud, Share2
} from 'lucide';
import { SetupService, SORT_OPTIONS } from './src/web/setupService.js';
import { normalizeImportedSetup } from './src/core/utils.js';
import { GAME_TEMPLATES, GROUPS, FFB_TEMPLATE } from './src/core/templates.js';
import { GAME_CARS } from './src/core/cars.js';
import { GAME_CIRCUITS } from './src/core/circuits.js';
import { getCarOverride as getAccCarOverride } from './src/core/overrides/acc_car_overrides.js';
import { getF1CarOverride } from './src/core/overrides/f1_car_overrides.js';
import { getGT7CarOverride } from './src/core/overrides/gt7_car_overrides.js';
import { getIRacingCarOverride } from './src/core/overrides/iracing_car_overrides.js';
import { getCarOverride as getAcCarOverride } from './src/core/overrides/ac_car_overrides.js';
import { getCarOverride as getForzaCarOverride } from './src/core/overrides/forza_car_overrides.js';
import { getCarOverride as getRf2CarOverride } from './src/core/overrides/rf2_car_overrides.js';
import { getCarOverride as getAms2CarOverride } from './src/core/overrides/ams2_car_overrides.js';
import { getCarOverride as getRbrCarOverride } from './src/core/overrides/rbr_car_overrides.js';
import { getCarOverride as getLmuCarOverride } from './src/core/overrides/lmu_car_overrides.js';
import { getCarOverride as getAcRallyCarOverride } from './src/core/overrides/ac_rally_car_overrides.js';
import { getCarOverride as getRennsportCarOverride } from './src/core/overrides/rennsport_car_overrides.js';

// ── DOM helpers ───────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const authView      = document.getElementById('auth-view');
const appView       = document.getElementById('app');
const gameSelect    = document.getElementById('game-select');
const setupForm     = document.getElementById('setup-form');
const dynamicTabs   = document.getElementById('dynamic-tabs');
const dynamicParams = document.getElementById('dynamic-params');
const setupsGrid    = document.getElementById('setups-grid');
const dashboardView = document.getElementById('dashboard');
const editorView    = document.getElementById('setup-editor');

const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
}[char]));

const escapeAttr = escapeHTML;

// ── Module state ──────────────────────────────────────────────────────────────
let isAuthenticated = false;
let editingSetupId  = null;
let activeTabId     = null;
let _tabData        = {};
let sortBy          = 'updatedAt_desc';
let currentFilters  = {};
let _activeOverride = null;
let _compareSetups  = new Set();
let _telemetrySetupId = null;
let _telemetryVisible = false;
let _communityVisible = false;

// ── ACC car overrides — param → override key mapping ─────────────────────────

const ACC_PARAM_OVERRIDE_MAP = {
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
    bump_slow_f:    { min: 'dampersMin',         max: 'dampersMax'                                   },
    bump_slow_r:    { min: 'dampersMin',         max: 'dampersMax'                                   },
    bump_fast_f:    { min: 'dampersMin',         max: 'dampersMax'                                   },
    bump_fast_r:    { min: 'dampersMin',         max: 'dampersMax'                                   },
    reb_slow_f:     { min: 'dampersMin',         max: 'dampersMax'                                   },
    reb_slow_r:     { min: 'dampersMin',         max: 'dampersMax'                                   },
    reb_fast_f:     { min: 'dampersMin',         max: 'dampersMax'                                   },
    reb_fast_r:     { min: 'dampersMin',         max: 'dampersMax'                                   },
    rh_f:           { min: 'rideHeightFrontMin', max: 'rideHeightFrontMax', step: 'rideHeightStep'   },
    rh_r:           { min: 'rideHeightRearMin',  max: 'rideHeightRearMax',  step: 'rideHeightStep'   },
    splitter:       { min: 'splitterMin',        max: 'splitterMax'                                  },
    wing:           { min: 'rearWingMin',        max: 'rearWingMax'                                  },
    brake_duct_fl:  { min: 'brakeDuctMin',       max: 'brakeDuctMax'                                 },
    brake_duct_fr:  { min: 'brakeDuctMin',       max: 'brakeDuctMax'                                 },
    brake_duct_rl:  { min: 'brakeDuctMin',       max: 'brakeDuctMax'                                 },
    brake_duct_rr:  { min: 'brakeDuctMin',       max: 'brakeDuctMax'                                 },
    tire_blanket_temp: { min: 'tireBlanketMin',   max: 'tireBlanketMax',      step: 'tireBlanketStep'  },
    weight_dist_f:  { min: 'weightDistMin',      max: 'weightDistMax',       step: 'weightDistStep'  },
    weight_dist_r:  { min: 'weightDistMin',      max: 'weightDistMax',       step: 'weightDistStep'  },
    diff_lock_accel: { min: 'diffLockMin',       max: 'diffLockMax',         step: 'diffLockStep'    },
    diff_lock_decel: { min: 'diffLockMin',       max: 'diffLockMax',         step: 'diffLockStep'    },
    cg_height:      { min: 'cgHeightMin',        max: 'cgHeightMax',          step: 'cgHeightStep'    },
};

const F1_PARAM_OVERRIDE_MAP = {
    w_f:    { min: 'wingFrontMin',   max: 'wingFrontMax',   step: 'wingFrontStep'  },
    w_r:    { min: 'wingRearMin',    max: 'wingRearMax',    step: 'wingRearStep'  },
    d_on:   { min: 'diffOnMin',      max: 'diffOnMax',      step: 'diffOnStep'   },
    d_off:  { min: 'diffOffMin',     max: 'diffOffMax',     step: 'diffOffStep'  },
    cam_f:  { min: 'camberFrontMin', max: 'camberFrontMax', step: 'camberStep'   },
    toe_f:  { min: 'toeFrontMin',    max: 'toeFrontMax',    step: 'toeStep'      },
    s_f:    { min: 'suspFrontMin',   max: 'suspFrontMax',   step: 'suspStep'    },
    arb_f:  { min: 'arbFrontMin',    max: 'arbFrontMax',    step: 'arbStep'     },
    h_f:    { min: 'rideHeightFrontMin', max: 'rideHeightFrontMax', step: 'rideHeightStep' },
    bb:     { min: 'brakeBiasMin',   max: 'brakeBiasMax',   step: 'brakeBiasStep' },
    psi_f:  { min: 'tyrePressureMin', max: 'tyrePressureMax', step: 'tyrePressureStep' },
};

const GT7_PARAM_OVERRIDE_MAP = {
    pow:    { min: 'powerLimitMin',  max: 'powerLimitMax',  step: 1  },
    bal:    { min: 'ballastMin',     max: 'ballastMax',     step: 0.5 },
    bal_p:  { min: 'ballastPosMin',  max: 'ballastPosMax',  step: 1  },
    h_f:    { min: 'heightFrontMin', max: 'heightFrontMax', step: 'heightStep' },
    s_e_f:  { min: 'extensionFMin',  max: 'extensionFMax',  step: 'extensionStep' },
    s_c_f:  { min: 'compressionFMin', max: 'compressionFMax', step: 'compressionStep' },
    arb_f:  { min: 'arbFrontMin',   max: 'arbFrontMax',    step: 'arbStep' },
    cam_f:  { min: 'camberFrontMin', max: 'camberFrontMax', step: 'camberStep' },
    bb:     { min: 'brakeBiasMin',   max: 'brakeBiasMax',   step: 'brakeBiasStep' },
    bp:     { min: 'brakePowerMin',  max: 'brakePowerMax',  step: 'brakePowerStep' },
    lsd_i:  { min: 'lsdInitialMin',  max: 'lsdInitialMax',  step: 'lsdStep' },
    aero_f: { min: 'aeroFrontMin',   max: 'aeroFrontMax',   step: 'aeroStep' },
    psi:    { min: 'tyrePressureMin', max: 'tyrePressureMax', step: 'tyrePressureStep' },
};

const IRACING_PARAM_OVERRIDE_MAP = {
    p_fl:   { min: 'tyrePressureMin', max: 'tyrePressureMax', step: 'tyrePressureStep' },
    p_fr:   { min: 'tyrePressureMin', max: 'tyrePressureMax', step: 'tyrePressureStep' },
    h_fl:   { min: 'heightFrontMin', max: 'heightFrontMax', step: 'heightStep' },
    bal:    { min: 'ballastMin',      max: 'ballastMax',      step: 1  },
    s_fl:   { min: 'springRateMin',   max: 'springRateMax',   step: 1  },
    arb_f:  { min: 'arbFrontMin',    max: 'arbFrontMax',      step: 'arbStep' },
    cam_fl: { min: 'camberFrontMin', max: 'camberFrontMax',  step: 'camberStep' },
    toe_fl: { min: 'toeFrontMin',    max: 'toeFrontMax',      step: 'toeStep' },
    bb:     { min: 'brakeBiasMin',   max: 'brakeBiasMax',     step: 'brakeBiasStep' },
    duct_f: { min: 'brakeDuctMin',   max: 'brakeDuctMax',     step: 1  },
    pre:    { min: 'diffPreloadMin', max: 'diffPreloadMax', step: 'diffPreloadStep' },
    wing_f: { min: 'wingFrontMin',   max: 'wingFrontMax',     step: 1  },
    wing_r: { min: 'wingRearMin',    max: 'wingRearMax',      step: 1  },
};

function applyGameOverrides(gameId, params, override) {
    if (!override) return params;
    const map = gameId === 'acc' ? ACC_PARAM_OVERRIDE_MAP
        : gameId === 'f1_24' ? F1_PARAM_OVERRIDE_MAP
        : gameId === 'gt7' ? GT7_PARAM_OVERRIDE_MAP
        : gameId === 'iracing' ? IRACING_PARAM_OVERRIDE_MAP
        : null;
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
        for (const [prop, key] of Object.entries(entry)) {
            const val = override[key];
            if (typeof val === 'number') patched[prop] = val;
        }
        return patched;
    });
}

function getGameOverride(gameId, carId) {
    if (gameId === 'acc') return getAccCarOverride(carId);
    if (gameId === 'f1_24') return getF1CarOverride(carId);
    if (gameId === 'gt7') return getGT7CarOverride(carId);
    if (gameId === 'iracing') return getIRacingCarOverride(carId);
    if (gameId === 'ac') return getAcCarOverride(carId);
    if (gameId === 'forza') return getForzaCarOverride(carId);
    if (gameId === 'rf2') return getRf2CarOverride(carId);
    if (gameId === 'ams2') return getAms2CarOverride(carId);
    if (gameId === 'rbr') return getRbrCarOverride(carId);
    if (gameId === 'lmu') return getLmuCarOverride(carId);
    if (gameId === 'ac_rally') return getAcRallyCarOverride(carId);
    if (gameId === 'rennsport') return getRennsportCarOverride(carId);
    return null;
}

// ── ACC car select helpers ────────────────────────────────────────────────────

const ACC_BRANDS = {
    'Ferrari':       ['Ferrari'],
    'Lamborghini':   ['Lamborghini'],
    'Porsche':      ['Porsche'],
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

const ACC_BRAND_ORDER = [
    'Ferrari', 'Lamborghini', 'Porsche', 'BMW', 'Mercedes-AMG',
    'Audi', 'Aston Martin', 'McLaren', 'Honda', 'Nissan', 'Lexus',
    'Bentley', 'Alfa Romeo', 'Jaguar', 'Ginetta', 'KTM', 'Maserati',
    'Alpine', 'Chevrolet'
];

function getCarBrand(carName) {
    if (!carName) return null;
    for (const [brand, prefixes] of Object.entries(ACC_BRANDS)) {
        if (prefixes.some(prefix => carName.startsWith(prefix + ' '))) return brand;
    }
    return null;
}

function populateAccCarSelect() {
    const sel = $('car-select-acc');
    if (!sel) return;
    const cars = GAME_CARS.acc || [];

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
        carList.map(c => `<option value="${escapeAttr(c.id)}">${escapeHTML(c.name)}</option>`).join('');

    let html = `<option value="">— Selecciona coche —</option>`;

    for (const brand of ACC_BRAND_ORDER) {
        if (!byBrand[brand]) continue;
        html += `<optgroup label="${escapeAttr(brand)}">${makeOptions(byBrand[brand])}</optgroup>`;
    }

    if (ungrouped.length > 0) {
        ungrouped.sort((a, b) => a.name.localeCompare(b.name));
        html += `<optgroup label="Other">${makeOptions(ungrouped)}</optgroup>`;
    }

    sel.innerHTML = html;
}

function populateF1CarSelect() {
    const sel = $('car-select-f1');
    if (!sel) return;
    const cars = GAME_CARS.f1_24 || [];
    const makeOptions = (carList) =>
        carList.map(c => `<option value="${escapeAttr(c.id)}">${escapeHTML(c.name)}</option>`).join('');
    sel.innerHTML = `<option value="">— Selecciona monoplaza —</option>` +
        cars.map(c => `<option value="${escapeAttr(c.id)}">${escapeHTML(c.name)}</option>`).join('');
}

function populateGT7CarSelect() {
    const sel = $('car-select-gt7');
    if (!sel) return;
    const cars = GAME_CARS.gt7 || [];
    const byClass = {};
    for (const car of cars) {
        const cls = car.class || 'Other';
        if (!byClass[cls]) byClass[cls] = [];
        byClass[cls].push(car);
    }
    const classOrder = ['Gr.1', 'Gr.3', 'Gr.4', 'Gr.B', 'Formula', 'Street', 'Rally', 'Other'];
    let html = `<option value="">— Selecciona coche —</option>`;
    for (const cls of classOrder) {
        if (!byClass[cls]) continue;
        html += `<optgroup label="${escapeAttr(cls)}">${byClass[cls].map(c => `<option value="${escapeAttr(c.id)}">${escapeHTML(c.name)}</option>`).join('')}</optgroup>`;
    }
    sel.innerHTML = html;
}

function populateIRacingCarSelect() {
    const sel = $('car-select-iracing');
    if (!sel) return;
    const cars = GAME_CARS.iracing || [];
    const byClass = {};
    for (const car of cars) {
        const cls = car.class || 'Other';
        if (!byClass[cls]) byClass[cls] = [];
        byClass[cls].push(car);
    }
    const preferredOrder = [
        'GT3', 'GT4', 'GTE_GTP', 'Formula', 'Formula_4', 'Super_Formula',
        'IndyCar', 'LMDh', 'LMP2', 'LMP2_LMP3', 'NASCAR', 'NASCAR_Cup',
        'NASCAR_Xfinity', 'NASCAR_Truck', 'V8_Supercars', 'Road',
        'Historic', 'Rallycross', 'Dirt_Oval', 'Dirt_Road',
        'Australian_Prod', 'Global_MX5', 'Other'
    ];
    const remainingClasses = Object.keys(byClass)
        .filter(cls => !preferredOrder.includes(cls))
        .sort((a, b) => a.localeCompare(b));
    const classOrder = [...preferredOrder, ...remainingClasses];
    let html = `<option value="">— Selecciona coche —</option>`;
    for (const cls of classOrder) {
        if (!byClass[cls]) continue;
        html += `<optgroup label="${escapeAttr(cls)}">${byClass[cls].map(c => `<option value="${escapeAttr(c.id)}">${escapeHTML(c.name)}</option>`).join('')}</optgroup>`;
    }
    sel.innerHTML = html;
}

function updateCarField(gameId) {
    const nameInput = $('car-name');
    const selects = ['acc', 'f1_24', 'gt7', 'iracing'].map(id => $(`car-select-${id}`));
    if (!nameInput) return;

    const useSelect = selects[0] && ['acc', 'f1_24', 'gt7', 'iracing'].includes(gameId);
    selects.forEach(sel => {
        if (!sel) return;
        sel.classList.toggle('hidden', sel.id !== `car-select-${gameId}`);
    });
    if (useSelect) {
        nameInput.classList.add('hidden');
        nameInput.removeAttribute('required');
    } else {
        nameInput.classList.remove('hidden');
        nameInput.setAttribute('required', '');
    }
}

function getGameCarName(gameId, carId) {
    const cars = GAME_CARS[gameId] || [];
    const found = cars.find(c => c.id === carId);
    return found ? found.name : '';
}

function updateOverrideStatus(carId, override, gameId) {
    const el = $('car-override-status');
    if (!el) return;
    if (!carId || !override) {
        el.classList.add('hidden');
        el.textContent = '';
        return;
    }
    const cars = GAME_CARS[gameId] || [];
    const car = cars.find(c => c.id === carId);
    const classLabel = car?.class || '';
    const overrideLabel = gameId === 'f1_24' ? 'F1' : gameId === 'gt7' ? car?.class || 'GT' : gameId === 'iracing' ? car?.class || 'Car' : car?.class || '';
    el.classList.remove('hidden');
    el.textContent = `${overrideLabel} · Rangos específicos cargados ✓`;
}

// ── App init ──────────────────────────────────────────────────────────────────

function init() {
    createIcons({ icons: { ShieldCheck, LogIn, Gauge, Plus, ArrowLeft } });
    populateAccCarSelect();
    populateF1CarSelect();
    populateGT7CarSelect();
    populateIRacingCarSelect();
    setupAuthListeners();
    setupAppListeners();
    setupDashboardFilters();
}

function setupAuthListeners() {
    ['login-google', 'login-apple'].forEach(id => {
        const el = $(id);
        if (el) el.addEventListener('click', () => {
            isAuthenticated = true;
            authView.classList.add('hidden');
            appView.classList.remove('hidden');
            renderDashboard();
        });
    });
}

function setupAppListeners() {
    $('new-setup').addEventListener('click', () => openEditor());
    $('back-btn').addEventListener('click', () => showView('dashboard'));

    gameSelect.addEventListener('change', () => {
        activeTabId = null;
        _activeOverride = null;
        updateOverrideStatus(null, null, null);
        updateCarField(gameSelect.value);
        updateCarSuggestions(gameSelect.value);
        populateTrackSuggestions(gameSelect.value);
        renderFields(gameSelect.value, _tabData);
    });

    // Car selects for games with override support
    ['acc', 'f1_24', 'gt7', 'iracing'].forEach(gid => {
        const sel = $(`car-select-${gid}`);
        if (!sel) return;
        sel.addEventListener('change', () => {
            const carId = sel.value;
            _activeOverride = carId ? getGameOverride(gid, carId) : null;
            updateOverrideStatus(carId, _activeOverride, gid);
            renderFields(gid, _tabData);
        });
    });

    // Non-special car name text input
    const carNameInput = $('car-name');
    if (carNameInput) {
        carNameInput.addEventListener('input', debounce(() => {
            updateCarSuggestions(gameSelect.value);
        }, 150));
    }

    setupForm.addEventListener('submit', async e => {
        e.preventDefault();
        await saveSetup();
    });

    $('import-btn')?.addEventListener('click', triggerImport);
    $('export-btn')?.addEventListener('click', () => SetupService.exportSetups(currentFilters));
    $('compare-btn')?.addEventListener('click', openCompareView);
    $('telemetry-btn')?.addEventListener('click', toggleTelemetryView);
    $('community-btn')?.addEventListener('click', toggleCommunityHub);
    $('export-pdf-btn')?.addEventListener('click', exportSetupPDF);
    $('share-qr-btn')?.addEventListener('click', shareSetupQR);
    $('import-ocr-btn')?.addEventListener('click', triggerOCRImport);
    $('version-history-btn')?.addEventListener('click', showVersionHistory);
    $('voice-note-btn')?.addEventListener('click', toggleVoiceNote);

    populateGameSelect();
}

let _voiceRec = null;
let _voiceFinalTranscript = '';

function toggleVoiceNote() {
    const btn = $('voice-note-btn');
    if (!btn) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert('Tu navegador no soporta notas de voz. Prueba Chrome o Edge.');
        return;
    }

    if (_voiceRec && _voiceRec.recording) {
        _voiceRec.stop();
        btn.style.color = 'white';
        return;
    }

    _voiceFinalTranscript = '';
    _voiceRec = new SpeechRecognition();
    _voiceRec.lang = 'es-ES';
    _voiceRec.continuous = true;
    _voiceRec.interimResults = true;
    _voiceRec.recording = true;

    btn.style.color = 'var(--accent)';

    _voiceRec.onresult = event => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const t = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                _voiceFinalTranscript += t + ' ';
            } else {
                interim += t;
            }
        }
        const status = $('voice-status');
        if (status) {
            status.textContent = interim ? `Escuchando: ${interim}…` : 'Escuchando…';
        }
    };

    _voiceRec.onerror = () => {
        btn.style.color = 'white';
        _voiceRec.recording = false;
    };

    _voiceRec.onend = () => {
        btn.style.color = 'white';
        if (_voiceRec.recording) return;
        if (_voiceFinalTranscript.trim()) {
            appendVoiceNote(_voiceFinalTranscript.trim());
        }
    };

    _voiceRec.start();

    const overlay = document.createElement('div');
    overlay.id = 'voice-overlay';
    overlay.style = 'position:fixed;inset:0;background:#000a;z-index:1000;display:flex;align-items:center;justify-content:center;padding:2rem;';
    overlay.innerHTML = `
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:2rem;max-width:320px;text-align:center;">
            <div style="font-size:3rem;margin-bottom:1rem;animation:pulse 1s infinite;">🎙️</div>
            <p style="color:white;margin-bottom:0.5rem;font-weight:600;">Grabando nota de voz…</p>
            <p id="voice-status" style="color:var(--text-secondary);font-size:0.85rem;min-height:1.5em;">Escuchando…</p>
            <p style="color:var(--text-secondary);font-size:0.75rem;margin-bottom:1.5rem;">Habla con claridad. Clic en "Detener" para terminar.</p>
            <button id="stop-voice-btn" style="background:var(--accent);border:none;color:white;padding:0.75rem 2rem;border-radius:8px;cursor:pointer;font-weight:700;">Detener</button>
        </div>
    `;
    document.body.appendChild(overlay);
    $('stop-voice-btn')?.addEventListener('click', () => {
        if (_voiceRec) {
            _voiceRec.recording = false;
            _voiceRec.stop();
        }
        overlay.remove();
    });
}

function appendVoiceNote(text) {
    const activeNoteId = getActiveNotesFieldId();
    if (activeNoteId) {
        const el = document.getElementById(activeNoteId);
        if (el) {
            el.value = (el.value ? el.value + '\n' : '') + `[VOZ] ${text}`;
            el.dispatchEvent(new Event('input'));
            return;
        }
    }
    const globalNote = $('setup-notes');
    if (globalNote) {
        globalNote.value = (globalNote.value ? globalNote.value + '\n' : '') + `[VOZ] ${text}`;
    }
}

function getActiveNotesFieldId() {
    if (!activeTabId || !editingSetupId) return null;
    const template = GAME_TEMPLATES.find(t => t.id === gameSelect.value);
    if (!template?.notes) return null;
    const noteConfig = template.notes.find(n => n.id === `note_${activeTabId}`);
    return noteConfig?.id || null;
}

function updateHistoryButton() {
    const btn = $('version-history-btn');
    if (!btn) return;
    btn.classList.toggle('hidden', !editingSetupId);
}

function triggerOCRImport() {
    const input = $('ocr-file-input');
    input.value = '';
    input.onchange = async e => {
        const file = e.target.files[0];
        if (!file) return;
        await runOCR(file);
    };
    input.click();
}

async function runOCR(file) {
    const progressModal = createProgressModal('Analizando imagen…');
    const Tesseract = window.Tesseract;
    if (!Tesseract) {
        progressModal.remove();
        alert('Librería OCR no cargada. Recarga la página.');
        return;
    }

    try {
        const imageUrl = URL.createObjectURL(file);
        const result = await Tesseract.recognize(imageUrl, 'eng');
        URL.revokeObjectURL(imageUrl);
        progressModal.remove();
        const parsed = parseOCRText(result.data.text);
        showOCRResults(parsed);
    } catch (err) {
        progressModal.remove();
        alert(`Error en OCR: ${err.message}`);
    }
}

function createProgressModal(msg) {
    const div = document.createElement('div');
    div.id = 'ocr-progress';
    div.style = 'position:fixed;inset:0;background:#000a;z-index:2000;display:flex;align-items:center;justify-content:center;';
    div.innerHTML = `<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:2rem;text-align:center;min-width:280px;">
        <p style="color:white;margin-bottom:1rem;" id="ocr-progress-msg">${escapeHTML(msg)}</p>
        <div style="width:100%;height:6px;background:var(--bg-input);border-radius:3px;overflow:hidden;">
            <div id="ocr-progress-bar" style="height:100%;background:var(--accent);width:0%;transition:width 0.3s;"></div>
        </div>
    </div>`;
    document.body.appendChild(div);
    return div;
}

function updateProgressModal(el, msg) {
    const msgEl = el.querySelector('#ocr-progress-msg');
    const barEl = el.querySelector('#ocr-progress-bar');
    if (msgEl) msgEl.textContent = msg;
    if (barEl && msg.includes('%')) {
        const pct = parseInt(msg.replace(/[^0-9]/g, ''));
        barEl.style.width = `${pct}%`;
    }
}

const OCR_PATTERNS = [
    { id: 'pres_fl', label: /tyr(e|)[\s-]?pressure[\s-]?f(lo|ront[\s-]?l)/i },
    { id: 'pres_fr', label: /tyr(e|)[\s-]?pressure[\s-]?f(r|ront[\s-]?r)/i },
    { id: 'pres_rl', label: /tyr(e|)[\s-]?pressure[\s-]?r(ear[\s-]?l|r)/i },
    { id: 'pres_rr', label: /tyr(e|)[\s-]?pressure[\s-]?r(ear[\s-]?r|r)/i },
    { id: 'camber_f', label: /camber[\s-]?f(lo|ront|rontal)/i },
    { id: 'camber_r', label: /camber[\s-]?r(ear|)/i },
    { id: 'toe_f', label: /toe[\s-]?f(lo|ront|rontal)/i },
    { id: 'toe_r', label: /toe[\s-]?r(ear|r)/i },
    { id: 'caster', label: /caster/i },
    { id: 'arb_f', label: /anti[\s-]?roll[\s-]?bar[\s-]?f(lo|ront|rontal|)/i },
    { id: 'arb_r', label: /anti[\s-]?roll[\s-]?bar[\s-]?r(ear|r)/i },
    { id: 'wrate_f', label: /wheel[\s-]?rate[\s-]?f(lo|ront|rontal|)/i },
    { id: 'wrate_r', label: /wheel[\s-]?rate[\s-]?r(ear|r)/i },
    { id: 'brake_bias', label: /brake[\s-]?bias/i },
    { id: 'brake_power', label: /brake[\s-]?power/i },
    { id: 'diff_preload', label: /diff(ferential|)[\s-]?preload/i },
    { id: 'rh_f', label: /ride[\s-]?height[\s-]?f(lo|ront|rontal|)/i },
    { id: 'rh_r', label: /ride[\s-]?height[\s-]?r(ear|r)/i },
    { id: 'splitter', label: /splitter/i },
    { id: 'wing', label: /rear[\s-]?wing/i },
    { id: 'brake_duct_fl', label: /brake[\s-]?duct[\s-]?f(lo|ront[\s-]?l)/i },
    { id: 'brake_duct_fr', label: /brake[\s-]?duct[\s-]?f(r|ront[\s-]?r)/i },
    { id: 'brake_duct_rl', label: /brake[\s-]?duct[\s-]?r(ear[\s-]?l|r)/i },
    { id: 'brake_duct_rr', label: /brake[\s-]?duct[\s-]?r(ear[\s-]?r|r)/i },
    { id: 'tc1', label: /traction[\s-]?control[\s-]?1|tc[\s-]?1|tc1/i },
    { id: 'tc2', label: /traction[\s-]?control[\s-]?2|tc[\s-]?2|tc2/i },
    { id: 'abs', label: /abs(oli)?[\s-]?1|abs/i },
    { id: 'engine_map', label: /engine[\s-]?map/i },
    { id: 'fuel', label: /fuel[\s-]?(to[\s-]?load|load|amount)|fuel/i },
    { id: 'tire_blanket_temp', label: /tire[\s-]?blanket|temp(erature)?[\s-]?blanket/i },
];

const NUM_PATTERNS = [
    /(-?\d+\.?\d*)\s*(psi|°|%|nm|n\/mm|kph|kmh|rpm|kw|hp|celsius|fahrenheit)?/gi,
    /:\s*(-?\d+\.?\d*)/g,
    /\s(-?\d+\.?\d*)\s*(psi|°|%|nm|n\/mm)?/gi,
];

function parseOCRText(text) {
    const found = {};
    const lines = text.split('\n');

    for (const [id, pattern] of OCR_PATTERNS) {
        for (const line of lines) {
            if (pattern.test(line)) {
                for (const numRe of NUM_PATTERNS) {
                    const nums = [...line.matchAll(numRe)];
                    if (nums.length > 0) {
                        const val = parseFloat(nums[0][1]);
                        if (!isNaN(val) && Math.abs(val) < 10000) {
                            found[id] = val;
                            break;
                        }
                    }
                }
            }
        }
    }
    return found;
}

function showOCRResults(parsed) {
    const entries = Object.entries(parsed);
    if (entries.length === 0) {
        alert('No se reconocieron valores numéricos en la imagen. Asegúrate de que la foto sea legible.');
        return;
    }

    const modal = document.createElement('div');
    modal.id = 'ocr-results-modal';
    modal.style = 'position:fixed;inset:0;background:#000a;z-index:1000;display:flex;align-items:center;justify-content:center;padding:2rem;overflow-y:auto;';
    modal.innerHTML = `
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:2rem;max-width:480px;width:100%;max-height:90vh;overflow-y:auto;">
            <h2 style="color:white;margin-bottom:0.5rem;">Valores detectados</h2>
            <p style="color:var(--text-secondary);font-size:0.8rem;margin-bottom:1.5rem;">Revisa y confirma antes de aplicar.</p>
            <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1.5rem;">
                ${entries.map(([k, v]) => `
                    <div style="display:flex;justify-content:space-between;align-items:center;padding:0.6rem 0.8rem;background:var(--bg-input);border-radius:6px;">
                        <label style="color:var(--text-secondary);font-size:0.8rem;">${escapeHTML(k)}</label>
                        <div style="display:flex;align-items:center;gap:0.5rem;">
                            <input type="number" class="ocr-val-input" data-id="${escapeAttr(k)}" value="${escapeAttr(v)}" style="width:80px;background:var(--bg-main);border:1px solid var(--border);color:white;border-radius:6px;padding:0.4rem;text-align:center;">
                            <input type="checkbox" class="ocr-val-check" data-id="${escapeAttr(k)}" checked style="accent-color:var(--accent);">
                        </div>
                    </div>
                `).join('')}
            </div>
            <div style="display:flex;gap:1rem;">
                <button id="ocr-apply" style="flex:1;background:var(--accent);border:none;color:white;padding:0.75rem;border-radius:8px;cursor:pointer;font-weight:700;">Aplicar</button>
                <button id="ocr-cancel" style="flex:1;background:var(--bg-input);border:1px solid var(--border);color:white;padding:0.75rem;border-radius:8px;cursor:pointer;">Cancelar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    $('ocr-apply')?.addEventListener('click', () => {
        document.querySelectorAll('.ocr-val-check:checked').forEach(cb => {
            const id = cb.dataset.id;
            const val = parseFloat($(`ocr-val-input-${id}`)?.value || $(`ocr-val-input[data-id="${id}"]`)?.value);
            if (!isNaN(val)) {
                _tabData[id] = val;
            }
        });
        modal.remove();
        renderFields(gameSelect.value, _tabData);
        alert('Valores OCR aplicados al formulario. Revisa antes de guardar.');
    });
    $('ocr-cancel')?.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
}

function updateCompareButton() {
    const btn = $('compare-btn');
    if (!btn) return;
    btn.classList.toggle('hidden', _compareSetups.size !== 2);
}

async function openCompareView() {
    if (_compareSetups.size !== 2) return;
    const ids = [..._compareSetups];
    const [s1, s2] = await Promise.all([SetupService.getById(ids[0]), SetupService.getById(ids[1])]);
    if (!s1 || !s2) return;
    renderCompareView(s1, s2);
}

function renderCompareView(s1, s2) {
    const overlay = document.createElement('div');
    overlay.id = 'compare-overlay';
    overlay.style = 'position:fixed;inset:0;background:#000c;z-index:1000;display:flex;align-items:center;justify-content:center;padding:2rem;';
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

    const diff = getSetupDifferences(s1, s2);

    overlay.innerHTML = `
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:16px;max-width:900px;width:100%;max-height:90vh;overflow-y:auto;">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:1.5rem;border-bottom:1px solid var(--border);">
                <h2 style="color:white;">Comparar Setups</h2>
                <button id="close-compare" style="background:none;border:none;color:white;cursor:pointer;font-size:1.5rem;padding:0.5rem;">✕</button>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;">
                <div style="padding:1.5rem;border-right:1px solid var(--border);">
                    <div class="compare-header">${escapeHTML(s1.setupName || s1.carName || 'Setup A')}</div>
                    <div class="compare-meta">${escapeHTML(s1.carName || '')} · ${escapeHTML(s1.track || '')}</div>
                    <div class="compare-meta">${escapeHTML(s1.gameName || '')} · ${escapeHTML(s1.weatherType?.toUpperCase() || '')}</div>
                    <div class="compare-params">${renderCompareParams(s1, diff)}</div>
                </div>
                <div style="padding:1.5rem;">
                    <div class="compare-header">${escapeHTML(s2.setupName || s2.carName || 'Setup B')}</div>
                    <div class="compare-meta">${escapeHTML(s2.carName || '')} · ${escapeHTML(s2.track || '')}</div>
                    <div class="compare-meta">${escapeHTML(s2.gameName || '')} · ${escapeHTML(s2.weatherType?.toUpperCase() || '')}</div>
                    <div class="compare-params">${renderCompareParams(s2, diff)}</div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    $('close-compare')?.addEventListener('click', () => overlay.remove());
}

function getSetupDifferences(s1, s2) {
    const diffs = new Set();
    const allKeys = new Set([...Object.keys(s1.setupData || {}), ...Object.keys(s2.setupData || {})]);
    for (const k of allKeys) {
        if (String(s1.setupData?.[k] ?? '') !== String(s2.setupData?.[k] ?? '')) {
            diffs.add(k);
        }
    }
    return diffs;
}

function renderCompareParams(s, diffSet) {
    const data = s.setupData || {};
    if (Object.keys(data).length === 0) return '<p style="color:#555;">Sin parámetros guardados.</p>';
    return Object.entries(data).map(([k, v]) => {
        const isDiff = diffSet.has(k);
        return `<div class="compare-row${isDiff ? ' diff' : ''}">
            <span class="compare-key">${escapeHTML(k)}</span>
            <span class="compare-val">${escapeHTML(v ?? '—')}</span>
        </div>`;
    }).join('');
}

function updateStars(val) {
    $('rating-stars')?.querySelectorAll('.star').forEach(s => {
        s.classList.toggle('filled', parseInt(s.dataset.val) <= val);
    });
}

function highlightStars(val) {
    $('rating-stars')?.querySelectorAll('.star').forEach(s => {
        s.classList.toggle('hovered', parseInt(s.dataset.val) <= val);
    });
}

function setupDashboardFilters() {
    const searchInput  = $('search-input');
    const filterGame   = $('filter-game');
    const filterWeather = $('filter-weather');
    const filterFavorite = $('filter-favorite');
    const sortSelect   = $('sort-select');

    if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
            currentFilters.search = searchInput.value;
            renderDashboard();
        }, 250));
    }
    if (filterGame) filterGame.addEventListener('change', () => {
        currentFilters.gameId = filterGame.value || null;
        renderDashboard();
    });
    if (filterWeather) filterWeather.addEventListener('change', () => {
        currentFilters.weatherType = filterWeather.value || null;
        renderDashboard();
    });
    if (filterFavorite) filterFavorite.addEventListener('change', () => {
        currentFilters.favorite = filterFavorite.checked ? true : null;
        renderDashboard();
    });
    if (sortSelect) sortSelect.addEventListener('change', () => {
        sortBy = sortSelect.value;
        currentFilters.sortBy = sortBy;
        renderDashboard();
    });
}

function debounce(fn, ms) {
    let timer;
    return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

function populateGameSelect() {
    gameSelect.innerHTML = GAME_TEMPLATES.map(g => `<option value="${escapeAttr(g.id)}">${escapeHTML(g.name)}</option>`).join('');
    const filterGame = $('filter-game');
    if (filterGame) {
        filterGame.innerHTML = `<option value="">Todos los juegos</option>` +
            GAME_TEMPLATES.map(g => `<option value="${escapeAttr(g.id)}">${escapeHTML(g.name)}</option>`).join('');
    }
    // Apply correct car field for default-selected game
    updateCarField(gameSelect.value);
    updateCarSuggestions(gameSelect.value);
    populateTrackSuggestions(gameSelect.value);
}

function updateCarSuggestions(gameId) {
    const list = $('car-suggestions');
    if (!list) return;
    const cars = GAME_CARS[gameId] || [];
    list.innerHTML = cars.map(car => {
        if (typeof car === 'object') return `<option value="${escapeAttr(car.name)}">`;
        return `<option value="${escapeAttr(car)}">`;
    }).join('');
}

function populateTrackSuggestions(gameId) {
    const sel = $('track-name');
    if (!sel) return;

    const circuits = GAME_CIRCUITS[gameId] || [];
    sel.innerHTML = '<option value="" disabled selected>Selecciona circuito…</option>';

    if (circuits.length === 0) {
        return;
    }

    const byClass = {};
    for (const c of circuits) {
        const cls = c.class || 'Other';
        if (!byClass[cls]) byClass[cls] = [];
        byClass[cls].push(c);
    }

    const classOrder = [
        'Grand Prix', 'Endurance', 'Street Circuit', 'Road Course',
        'Oval', 'Oval / Road', 'Road Track', 'World Circuits',
        'Circuit Experience', 'Circuit', 'Kart', 'Rally', 'Races', 'Other'
    ];

    const sortedClasses = Object.keys(byClass).sort((a, b) => {
        const ai = classOrder.indexOf(a);
        const bi = classOrder.indexOf(b);
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });

    for (const cls of sortedClasses) {
        const group = document.createElement('optgroup');
        group.label = cls;
        for (const c of byClass[cls]) {
            const opt = document.createElement('option');
            opt.value = c.name;
            opt.textContent = c.name;
            group.appendChild(opt);
        }
        sel.appendChild(group);
    }
}

function showView(view) {
    dashboardView.classList.toggle('hidden', view !== 'dashboard');
    editorView.classList.toggle('hidden', view !== 'editor');
    if (view === 'dashboard') {
        _compareSetups.clear();
        updateCompareButton();
        renderDashboard();
    }
}

async function openEditor(id = null) {
    editingSetupId = id;
    _tabData = {};
    _activeOverride = null;
    setupForm.reset();
    activeTabId = null;

    if (id) {
        const setup = await SetupService.getById(id);
        if (!setup) return;

        gameSelect.value = setup.gameId;
        $('setup-name').value  = setup.setupName   || '';
        $('weather-select').value  = setup.weatherType  || 'dry';
        $('session-select').value  = setup.sessionType  || 'Custom';
        $('setup-tags').value  = (setup.tags || []).join(', ');
        $('setup-notes').value = setup.notes        || '';
        $('setup-rating').value = setup.rating      || 0;
        updateStars(parseInt($('setup-rating').value));
        $('setup-game-version').value = setup.gameVersion || '';
        $('setup-platform').value = setup.platform    || '';
        $('setup-public').checked = setup.isPublic   || false;
        _tabData = { ...setup.setupData };

        updateCarField(setup.gameId);
        populateTrackSuggestions(setup.gameId);
        $('track-name').value  = setup.track        || '';

        const gId = setup.gameId;
        if (['acc', 'f1_24', 'gt7', 'iracing'].includes(gId)) {
            const sel = $(`car-select-${gId}`);
            const carId = setup.carId || null;
            if (sel && carId) sel.value = carId;
            _activeOverride = carId ? getGameOverride(gId, carId) : null;
            updateOverrideStatus(carId, _activeOverride, gId);
        } else {
            $('car-name').value = setup.carName || '';
            updateCarSuggestions(gId);
        }

        renderFields(setup.gameId, _tabData);
    } else {
        $('setup-name').value = '';
        $('setup-tags').value = '';
        $('setup-notes').value = '';
        $('setup-rating').value = 0;
        updateStars(0);
        $('setup-game-version').value = '';
        $('setup-platform').value = '';
        $('setup-public').checked = false;
        updateOverrideStatus(null, null, null);
        updateCarField(gameSelect.value);
        updateCarSuggestions(gameSelect.value);
        populateTrackSuggestions(gameSelect.value);
        _tabData = {};
        renderFields(gameSelect.value, _tabData);
    }

        $('editor-title').textContent = id ? 'Editar Setup' : 'Crear Setup';
    updateHistoryButton();
    showView('editor');
}

function renderFields(gameId, savedParams = {}) {
    const template = GAME_TEMPLATES.find(t => t.id === gameId);
    if (!template) return;

    let tabs = template.tabs;
    if (template.type && GROUPS[template.type]) {
        tabs = GROUPS[template.type];
    }

    const allTabs = [...(tabs || [])];
    if (!allTabs.find(t => t.id === FFB_TEMPLATE.id)) {
        allTabs.push(FFB_TEMPLATE);
    }

    dynamicTabs.classList.remove('hidden');

    if (!activeTabId || !allTabs.find(t => t.id === activeTabId)) {
        activeTabId = allTabs[0].id;
    }

    dynamicTabs.innerHTML = allTabs.map(tab => `
        <div class="tab-link ${tab.id === activeTabId ? 'active' : ''}" data-id="${escapeAttr(tab.id)}">${escapeHTML(tab.name)}</div>
    `).join('');

    dynamicTabs.querySelectorAll('.tab-link').forEach(link => {
        link.addEventListener('click', () => {
            collectCurrentTabData();
            activeTabId = link.dataset.id;
            renderFields(gameId, _tabData);
        });
    });

    const activeTab = allTabs.find(t => t.id === activeTabId);
    const overrideGame = ['acc', 'f1_24', 'gt7', 'iracing'].includes(gameId);
    const params = overrideGame
        ? applyGameOverrides(gameId, activeTab.params, _activeOverride)
        : activeTab.params;
    renderParamsGrid(params, _tabData, overrideGame ? _activeOverride : null);
    renderNotesSection(gameId, activeTabId, _tabData);
}

function collectCurrentTabData() {
    if (!activeTabId) return;
    document.querySelectorAll('#dynamic-params input, #dynamic-params select').forEach(el => {
        if (!el.id) return;
        _tabData[el.id] = (el.id === 'wrate_f' || el.id === 'wrate_r')
            ? parseFloat(el.value) : el.value;
    });
    document.querySelectorAll('#notes-section textarea').forEach(el => {
        if (el.id) _tabData[el.id] = el.value;
    });
}

function renderNotesSection(gameId, tabId, savedParams) {
    const container = $('notes-section');
    if (!container) return;

    const template = GAME_TEMPLATES.find(t => t.id === gameId);
    if (!template?.notes) {
        container.classList.add('hidden');
        container.innerHTML = '';
        return;
    }

    container.classList.remove('hidden');
    const noteConfig = template.notes.find(n => n.id === `note_${tabId}`);
    if (!noteConfig) {
        container.classList.add('hidden');
        container.innerHTML = '';
        return;
    }

    container.innerHTML = `
        <div class="notes-tab-section">
            <label for="${escapeAttr(noteConfig.id)}" class="notes-section-label">${escapeHTML(noteConfig.label)}</label>
            <textarea
                id="${escapeAttr(noteConfig.id)}"
                placeholder="${escapeAttr(noteConfig.placeholder)}"
                style="width:100%;min-height:80px;background:var(--bg-input);border:1px solid var(--border);color:white;border-radius:8px;padding:10px;resize:vertical;font-family:inherit;"
            >${escapeHTML(savedParams[noteConfig.id] || '')}</textarea>
        </div>
    `;
}

function renderParamsGrid(params, savedParams, override) {
    dynamicParams.innerHTML = renderParamsHTML(params, savedParams, override);
    attachParamEvents(params);
}

function renderParamsHTML(params, tabData, override) {
    return params.map(p => {
        const domEl = document.getElementById(p.id);
        const domVal = domEl ? domEl.value : undefined;
        const val = domVal !== undefined
            ? domVal
            : (tabData[p.id] !== undefined
                ? tabData[p.id]
                : (p.type === 'toggle' ? 'Off' : (p.min !== undefined ? p.min : 0)));

        // Wheel Rate — render as select with discrete values from override array
        if (override && (p.id === 'wrate_f' || p.id === 'wrate_r')) {
            const arr = p.id === 'wrate_f' ? override.wheelRateFront : override.wheelRateRear;
            if (Array.isArray(arr) && arr.length > 0) {
                return `<div class="param-item">
                    <label>${escapeHTML(p.l)}</label>
                    <select id="${escapeAttr(p.id)}" name="${escapeAttr(p.id)}" class="wrate-select">
                        ${arr.map((v, i) => `<option value="${escapeAttr(v)}" ${val == v ? 'selected' : ''}>${escapeHTML(v)} N/mm</option>`).join('')}
                    </select>
                </div>`;
            }
        }

        if (p.type === 'options') {
            return `<div class="param-item">
                <label>${escapeHTML(p.l)}</label>
                <select id="${escapeAttr(p.id)}" name="${escapeAttr(p.id)}" style="width:100%;border:none;background:transparent;color:white;font-weight:700;font-size:1.1rem;text-align:center;">
                    ${p.options.map(opt => `<option value="${escapeAttr(opt)}" ${val == opt ? 'selected' : ''}>${escapeHTML(opt)}</option>`).join('')}
                </select>
            </div>`;
        }

        if (p.type === 'toggle') {
            return `<div class="param-item">
                <label>${escapeHTML(p.l)}</label>
                <select id="${escapeAttr(p.id)}" name="${escapeAttr(p.id)}" style="width:100%;border:none;background:transparent;color:white;font-weight:700;font-size:1.1rem;text-align:center;">
                    <option value="Off" ${val === 'Off' ? 'selected' : ''}>OFF</option>
                    <option value="On" ${val === 'On' ? 'selected' : ''}>ON</option>
                </select>
            </div>`;
        }

        if (p.type === 'percentage') {
            return `<div class="param-item">
                <label>${escapeHTML(p.l)}</label>
                <div style="display:flex;align-items:center;justify-content:center;">
                    <input type="number" id="${escapeAttr(p.id)}" name="${escapeAttr(p.id)}" value="${escapeAttr(val)}" style="width:60px;background:transparent;border:none;color:white;font-size:1.2rem;font-weight:700;text-align:center;">
                    <span style="font-size:0.8rem;color:var(--text-secondary);">%</span>
                </div>
            </div>`;
        }

        return `<div class="param-item">
            <label>${escapeHTML(p.l)}</label>
            <div style="display:flex;align-items:center;justify-content:center;">
                <button type="button" class="step-btn" data-id="${escapeAttr(p.id)}" data-dir="down" style="background:none;border:none;color:var(--accent);font-size:1.5rem;cursor:pointer;padding:0 10px;">−</button>
                <input type="number" name="${escapeAttr(p.id)}" id="${escapeAttr(p.id)}" value="${escapeAttr(val)}"
                    min="${p.min !== undefined ? p.min : ''}"
                    max="${p.max !== undefined ? p.max : ''}"
                    step="${escapeAttr(p.step || 1)}"
                    style="width:80px;background:transparent;border:none;color:white;font-size:1.2rem;font-weight:700;text-align:center;">
                <span style="font-size:0.7rem;color:var(--text-secondary);margin-left:-5px;">${escapeHTML(p.s || '')}</span>
                <button type="button" class="step-btn" data-id="${escapeAttr(p.id)}" data-dir="up" style="background:none;border:none;color:var(--accent);font-size:1.5rem;cursor:pointer;padding:0 10px;">+</button>
            </div>
        </div>`;
    }).join('');
}

function attachParamEvents(params) {
    document.querySelectorAll('.step-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = document.getElementById(btn.dataset.id);
            const param = params.find(p => p.id === btn.dataset.id);
            if (!input || !param) return;

            const step = param.step || 1;
            const dir  = btn.dataset.dir === 'up' ? 1 : -1;
            let newVal = parseFloat(input.value) + (step * dir);

            if (param.min !== undefined) newVal = Math.max(param.min, newVal);
            if (param.max !== undefined) newVal = Math.min(param.max, newVal);

            const fixed = newVal
                .toFixed(param.step && param.step < 1 ? 2 : (param.step == 1 ? 0 : 1))
                .replace(/\.00$/, '');
            input.value = fixed;
            _tabData[btn.dataset.id] = (param.id === 'wrate_f' || param.id === 'wrate_r')
                ? newVal : fixed;
        });
    });

    document.querySelectorAll('#dynamic-params input, #dynamic-params select').forEach(el => {
        el.addEventListener('input', () => {
            _tabData[el.id] = (el.id === 'wrate_f' || el.id === 'wrate_r')
                ? parseFloat(el.value) : el.value;
        });
    });
}

async function saveSetup() {
    collectCurrentTabData();

    const nonParamFields = [
        'game-select', 'car-name', 'car-select-acc',
        'setup-name', 'track-name', 'weather-select',
        'session-select', 'setup-notes', 'setup-tags'
    ];
    const setupData = {};
    document.querySelectorAll('#setup-form input, #setup-form select, #setup-form textarea').forEach(el => {
        if (el.id && !nonParamFields.includes(el.id)) {
            setupData[el.id] = el.value;
        }
    });

    const tagsRaw = $('setup-tags').value;
    const tags = tagsRaw
        ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean)
        : [];

    const template = GAME_TEMPLATES.find(t => t.id === gameSelect.value);
    const gameName = template ? template.name : gameSelect.value.toUpperCase();

    // Resolve carId and carName — games with select use it, others use text input
    let carId   = null;
    let carName = '';
    const selGame = gameSelect.value;
    if (['acc', 'f1_24', 'gt7', 'iracing'].includes(selGame)) {
        const sel = $(`car-select-${selGame}`);
        carId   = sel?.value || null;
        carName = carId ? getGameCarName(selGame, carId) : '';
    } else {
        carName = $('car-name').value;
    }

    const payload = {
        gameId:        gameSelect.value,
        gameName,
        carId,
        carName,
        track:         $('track-name').value,
        weatherType:   $('weather-select').value,
        sessionType:   $('session-select').value,
        setupName:     $('setup-name').value || `${carName} @ ${$('track-name').value}`,
        rating:        parseInt($('setup-rating')?.value || 0),
        gameVersion:   $('setup-game-version')?.value || '',
        platform:      $('setup-platform')?.value || '',
        isPublic:      $('setup-public')?.checked || false,
        notes:         Object.keys(setupData)
                       .filter(k => k.startsWith('note_'))
                       .map(k => `[${k.replace('note_', '').toUpperCase()}] ${setupData[k]}`)
                       .filter(s => s.length > 12)
                       .join('\n\n'),
        tags
    };

    try {
        if (editingSetupId) {
            await SetupService.update(editingSetupId, payload);
        } else {
            await SetupService.create(payload);
        }
        showView('dashboard');
    } catch (err) {
        alert(`Error al guardar: ${err.message}`);
    }
}

async function renderDashboard() {
    const setups    = await SetupService.getAll({ ...currentFilters, sortBy });
    const allSetups = await SetupService.getAllRaw();
    const favoriteCount = allSetups.filter(s => s.isFavorite).length;

    if (setups.length === 0) {
        setupsGrid.innerHTML = `<div class="empty-state">
            <i data-lucide="gauge"></i>
            <p>Tu bóveda está vacía. Crea tu primer setup.</p>
        </div>`;
        createIcons({ icons: { Gauge } });
        setupCardsListeners();
        updateStats(allSetups.length, favoriteCount);
        return;
    }

    setupsGrid.innerHTML = setups.map(s => `
        <div class="setup-card${_compareSetups.has(s.id) ? ' selected-for-compare' : ''}" data-id="${escapeAttr(s.id)}">
            <div class="card-header">
                <input type="checkbox" class="compare-check" data-id="${escapeAttr(s.id)}" ${_compareSetups.has(s.id) ? 'checked' : ''}>
                <button class="fav-btn" data-id="${escapeAttr(s.id)}" style="background:none;border:none;cursor:pointer;color:${s.isFavorite ? '#f5c518' : '#555'};">
                    <i data-lucide="${s.isFavorite ? 'star' : 'star-off'}"></i>
                </button>
                <div class="card-badges">
                    <span class="card-badge game-badge">${escapeHTML(s.gameName || s.gameId)}</span>
                    <span class="card-badge">${escapeHTML(s.weatherType?.toUpperCase() || 'DRY')}</span>
                    <span class="card-badge session-badge">${escapeHTML(s.sessionType || 'Custom')}</span>
                    <span class="card-rating">${'★'.repeat(s.rating || 0)}${'☆'.repeat(5 - (s.rating || 0))}</span>
                </div>
            </div>
            <div class="card-info">
                <h3>${escapeHTML(s.setupName || s.carName || 'Sin nombre')}</h3>
                <p class="card-meta">${escapeHTML(s.carName || '')} · ${escapeHTML(s.track || 'Sin pista')} · ${escapeHTML(s.gameName || s.gameId)}</p>
                ${(s.tags || []).length > 0 ? `<div class="card-tags">${s.tags.map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('')}</div>` : ''}
            </div>
            <div class="card-actions">
                <button class="icon-btn duplicate-btn" data-id="${escapeAttr(s.id)}" title="Duplicar"><i data-lucide="copy"></i></button>
                <button class="icon-btn delete-btn" data-id="${escapeAttr(s.id)}" title="Eliminar"><i data-lucide="trash-2"></i></button>
                <i data-lucide="chevron-right" style="color:#555;"></i>
            </div>
        </div>
    `).join('');

    createIcons({ icons: { Star, StarOff, Copy, Trash2, ChevronRight } });
    setupCardsListeners();
    updateStats(allSetups.length, favoriteCount);
}

function setupCardsListeners() {
    document.querySelectorAll('.setup-card').forEach(card => {
        card.addEventListener('click', e => {
            if (e.target.closest('.fav-btn') || e.target.closest('.duplicate-btn') || e.target.closest('.delete-btn')) return;
            openEditor(card.dataset.id);
        });
    });

    document.querySelectorAll('.fav-btn').forEach(btn => {
        btn.addEventListener('click', async e => {
            e.stopPropagation();
            await SetupService.toggleFavorite(btn.dataset.id);
            renderDashboard();
        });
    });

    document.querySelectorAll('.duplicate-btn').forEach(btn => {
        btn.addEventListener('click', async e => {
            e.stopPropagation();
            await SetupService.duplicate(btn.dataset.id);
            renderDashboard();
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async e => {
            e.stopPropagation();
            if (confirm('¿Eliminar este setup?')) {
                await SetupService.delete(btn.dataset.id);
                renderDashboard();
            }
        });
    });

    document.querySelectorAll('.compare-check').forEach(cb => {
        cb.addEventListener('change', e => {
            e.stopPropagation();
            const id = cb.dataset.id;
            if (cb.checked) {
                if (_compareSetups.size >= 2) {
                    cb.checked = false;
                    alert('Selecciona máximo 2 setups para comparar.');
                    return;
                }
                _compareSetups.add(id);
            } else {
                _compareSetups.delete(id);
            }
            updateCompareButton();
            document.querySelectorAll('.setup-card').forEach(card => {
                card.classList.toggle('selected-for-compare', _compareSetups.has(card.dataset.id));
            });
        });
    });
}

function updateStats(total, favorites) {
    const el = $('dashboard-stats');
    if (el) {
        const compareCount = _compareSetups.size;
        const compareHint = compareCount > 0 ? `<span>•</span><span style="color:var(--accent);">${compareCount}/2 seleccionados</span>` : '';
        el.innerHTML = `<span>${total} setups</span><span>•</span><span>${favorites} favoritos</span>${compareHint}`;
    }
}

function exportSetupPDF() {
    collectCurrentTabData();
    window.print();
}

function shareSetupQR() {
    collectCurrentTabData();

    const data = {
        n: $('setup-name')?.value || '',
        g: gameSelect?.value || '',
        c: gameSelect?.value === 'acc'
            ? getAccCarName($('car-select-acc')?.value)?.replace(/ /g, '_').toLowerCase()
            : ($('car-name')?.value || '').replace(/ /g, '_').toLowerCase(),
        t: $('track-name')?.value || '',
        d: _tabData
    };

    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
    const url = `${window.location.origin}${window.location.pathname}?s=${encoded}`;

    const QRCode = window.qrcode || (typeof qrcode !== 'undefined' ? qrcode : null);
    if (!QRCode) {
        alert(' Librería QR no cargada. Recarga la página.');
        return;
    }
    const qr = QRCode(0, 'M');
    qr.addData(url);
    qr.make();

    const modal = document.createElement('div');
    modal.style = 'position:fixed;inset:0;background:#000a;z-index:1000;display:flex;align-items:center;justify-content:center;padding:2rem;';
    modal.innerHTML = `
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:2rem;max-width:360px;text-align:center;">
            <div style="margin-bottom:1.5rem;">
                <div style="display:inline-block;padding:1rem;background:white;border-radius:12px;">${qr.createImgTag(6, 0)}</div>
            </div>
            <p style="color:var(--text-secondary);font-size:0.85rem;margin-bottom:1rem;word-break:break-all;">${url}</p>
            <p style="color:var(--text-secondary);font-size:0.75rem;margin-bottom:1.5rem;">Escanea para abrir este setup</p>
            <button id="close-qr" style="background:var(--accent);border:none;color:white;padding:0.75rem 2rem;border-radius:8px;cursor:pointer;font-weight:700;">Cerrar</button>
        </div>
    `;
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    document.body.appendChild(modal);
    $('close-qr')?.addEventListener('click', () => modal.remove());
}

function toggleTelemetryView() {
    _telemetryVisible = !$telemetryVisible;
    const btn = $('telemetry-btn');
    if (btn) btn.style.color = _telemetryVisible ? 'var(--accent)' : 'white';
    const section = $('telemetry-section');
    if (!_telemetryVisible) {
        section.classList.add('hidden');
        section.innerHTML = '';
        return;
    }
    renderTelemetryPreview();
}

async function renderTelemetryPreview() {
    const section = $('telemetry-section');
    if (!section) return;

    const setups = await SetupService.getAllRaw();
    _telemetrySetups = Object.fromEntries(setups.map(s => [s.id, s]));
    const accSetups = setups.filter(s => s.gameId === 'acc').slice(0, 3);
    if (accSetups.length === 0) {
        section.classList.remove('hidden');
        section.innerHTML = `<p style="color:var(--text-secondary);text-align:center;padding:1rem;">No hay setups ACC para previsualizar.</p>`;
        return;
    }

    section.classList.remove('hidden');
    section.innerHTML = `
        <div style="margin-bottom:1rem;display:flex;align-items:center;justify-content:space-between;">
            <h3 style="color:white;">Telemetry Preview <span style="color:var(--accent);font-size:0.8rem;">(datos simulados)</span></h3>
            <div style="display:flex;gap:0.5rem;">
                ${accSetups.map(s => `
                    <button class="teleprev-btn ${_telemetrySetupId === s.id ? 'active' : ''}" data-id="${escapeAttr(s.id)}" style="background:${_telemetrySetupId === s.id ? 'var(--accent)' : 'var(--bg-input)'};border:1px solid var(--border);color:white;padding:0.4rem 0.8rem;border-radius:6px;cursor:pointer;font-size:0.8rem;">
                        ${escapeHTML(s.setupName || s.carName || 'Setup')}
                    </button>
                `).join('')}
            </div>
        </div>
        <div id="teleprev-chart" style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:1.5rem;"></div>
    `;

    section.querySelectorAll('.teleprev-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            _telemetrySetupId = btn.dataset.id;
            renderTelemetryChart(_telemetrySetupId);
            section.querySelectorAll('.teleprev-btn').forEach(b => {
                b.style.background = b.dataset.id === _telemetrySetupId ? 'var(--accent)' : 'var(--bg-input)';
            });
        });
    });

    if (!_telemetrySetupId || !accSetups.find(s => s.id === _telemetrySetupId)) {
        _telemetrySetupId = accSetups[0].id;
    }
    renderTelemetryChart(_telemetrySetupId);
}

function renderTelemetryChart(setupId) {
    const container = $('teleprev-chart');
    if (!container) return;
    const data = _buildTelemetryData(setupId);
    container.innerHTML = `
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1rem;">
            ${data.map(group => `
                <div>
                    <div style="color:var(--text-secondary);font-size:0.7rem;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:0.75rem;">${escapeHTML(group.label)}</div>
                    ${group.bars.map(bar => `
                        <div style="margin-bottom:0.6rem;">
                            <div style="display:flex;justify-content:space-between;margin-bottom:0.2rem;">
                                <span style="color:var(--text-secondary);font-size:0.75rem;">${escapeHTML(bar.name)}</span>
                                <span style="color:white;font-size:0.75rem;font-weight:600;">${escapeHTML(bar.val)} ${escapeHTML(bar.unit || '')}</span>
                            </div>
                            <div style="background:var(--bg-input);border-radius:3px;height:6px;overflow:hidden;">
                                <div style="width:${bar.pct}%;height:100%;background:${bar.color};border-radius:3px;"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `).join('')}
        </div>
    `;
}

function _buildTelemetryData(setupId) {
    const data = {};
    const d = _telemetrySetups?.[setupId] || {};
    const s = d.setupData || {};
    const maxVals = {
        pres: 34.3, camber: 4.0, toe: 0.4, caster: 16.0,
        arb: 14, wrate: 250, bump: 2000, brake_bias: 60,
        diff: 200, rh: 95, splitter: 10, wing: 10, tc: 11, abs: 12
    };
    const colors = {
        pres: '#00e5ff', camber: '#ff5252', toe: '#ffd54f',
        arb: '#69f0ae', wrate: '#40c4ff', brake_bias: '#ff8a80',
        rh: '#b388ff', splitter: '#a7ffeb', wing: '#ffcc02',
        tc: '#ff6e40', abs: '#f48fb1', diff: '#ce93d8'
    };

    const bar = (name, val, max, color, unit = '') => {
        const pct = Math.min(100, Math.max(0, (Math.abs(val) / max) * 100));
        return { name, val: typeof val === 'number' ? val.toFixed ? val.toFixed(2) : val : val, pct, color, unit };
    };

    return [
        {
            label: 'Tyres', bars: [
                bar('Pressure FL', s.pres_fl, maxVals.pres, colors.pres, 'psi'),
                bar('Pressure FR', s.pres_fr, maxVals.pres, colors.pres, 'psi'),
                bar('Pressure RL', s.pres_rl, maxVals.pres, colors.pres, 'psi'),
                bar('Pressure RR', s.pres_rr, maxVals.pres, colors.pres, 'psi'),
                bar('Camber F', Math.abs(s.camber_f), maxVals.camber, colors.camber, '°'),
                bar('Camber R', Math.abs(s.camber_r), maxVals.camber, colors.camber, '°'),
                bar('Toe F', Math.abs(s.toe_f), maxVals.toe, colors.toe, '°'),
                bar('Toe R', Math.abs(s.toe_r), maxVals.toe, colors.toe, '°'),
            ].filter(b => b.val !== undefined)
        },
        {
            label: 'Mechanical', bars: [
                bar('ARB Front', s.arb_f, maxVals.arb, colors.arb),
                bar('ARB Rear', s.arb_r, maxVals.arb, colors.arb),
                bar('Brake Bias', s.brake_bias, maxVals.brake_bias, colors.brake_bias, '%'),
                bar('Diff Preload', s.diff_preload, maxVals.diff, colors.diff, 'Nm'),
            ].filter(b => b.val !== undefined)
        },
        {
            label: 'Aero', bars: [
                bar('Ride Height F', s.rh_f, maxVals.rh, colors.rh, 'mm'),
                bar('Ride Height R', s.rh_r, maxVals.rh, colors.rh, 'mm'),
                bar('Splitter', s.splitter, maxVals.splitter, colors.splitter),
                bar('Rear Wing', s.wing, maxVals.wing, colors.wing),
            ].filter(b => b.val !== undefined)
        },
        {
            label: 'Electronics', bars: [
                bar('TC1', s.tc1, maxVals.tc, colors.tc),
                bar('TC2', s.tc2, maxVals.tc, colors.tc),
                bar('ABS', s.abs, maxVals.abs, colors.abs),
                bar('Engine Map', s.engine_map, 8, colors.wing),
            ].filter(b => b.val !== undefined)
        }
    ].filter(g => g.bars.length > 0);
}

let _telemetrySetups = null;

function toggleCommunityHub() {
    _communityVisible = !_communityVisible;
    const btn = $('community-btn');
    if (btn) btn.style.color = _communityVisible ? 'var(--accent)' : 'white';
    const section = $('community-section');
    if (!_communityVisible) {
        section.classList.add('hidden');
        section.innerHTML = '';
        return;
    }
    renderCommunityHub();
}

async function renderCommunityHub() {
    const section = $('community-section');
    if (!section) return;
    section.classList.remove('hidden');

    const setups = await SetupService.getAllRaw();
    const publicSetups = setups.filter(s => s.isPublic);

    section.innerHTML = `
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:1.5rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
                <div>
                    <h3 style="color:white;margin-bottom:0.25rem;">🌐 Community Hub</h3>
                    <p style="color:var(--text-secondary);font-size:0.8rem;">Exporta tus setups para compartir o importa setups de otros pilotos.</p>
                </div>
                <div style="display:flex;gap:0.5rem;">
                    <button id="share-public-btn" style="background:var(--accent);border:none;color:white;padding:0.5rem 1rem;border-radius:8px;cursor:pointer;font-size:0.8rem;font-weight:600;display:flex;align-items:center;gap:0.4rem;">
                        <i data-lucide="share-2"></i> Compartir setup actual
                    </button>
                    <button id="import-community-btn" style="background:var(--bg-input);border:1px solid var(--border);color:white;padding:0.5rem 1rem;border-radius:8px;cursor:pointer;font-size:0.8rem;font-weight:600;display:flex;align-items:center;gap:0.4rem;">
                        <i data-lucide="upload-cloud"></i> Importar JSON
                    </button>
                </div>
            </div>

            <div id="public-setups-list">
                ${publicSetups.length === 0 ? `
                    <p style="color:var(--text-secondary);text-align:center;padding:1.5rem;font-size:0.85rem;">
                        No tienes setups públicos aún. Edita un setup y marca "Hacer público" para compartirlo.
                    </p>
                ` : `
                    <div style="display:flex;flex-direction:column;gap:0.75rem;">
                        ${publicSetups.map(s => `
                            <div style="display:flex;justify-content:space-between;align-items:center;padding:0.75rem 1rem;background:var(--bg-input);border-radius:8px;">
                                <div>
                                    <div style="color:white;font-weight:600;font-size:0.9rem;">${escapeHTML(s.setupName || s.carName || 'Sin nombre')}</div>
                                    <div style="color:var(--text-secondary);font-size:0.75rem;">${escapeHTML(s.carName || '')} · ${escapeHTML(s.track || '')} · ${escapeHTML(s.gameName || '')}</div>
                                </div>
                                <div style="display:flex;gap:0.5rem;align-items:center;">
                                    <button class="copy-public-btn" data-id="${escapeAttr(s.id)}" style="background:none;border:1px solid var(--border);color:var(--text-secondary);padding:0.3rem 0.6rem;border-radius:6px;cursor:pointer;font-size:0.75rem;">Copiar JSON</button>
                                    <button class="unpublish-btn" data-id="${escapeAttr(s.id)}" style="background:none;border:1px solid var(--border);color:#ff5252;padding:0.3rem 0.6rem;border-radius:6px;cursor:pointer;font-size:0.75rem;">Ocultar</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `}
            </div>

            <div style="margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid var(--border);">
                <p style="color:var(--text-secondary);font-size:0.8rem;margin-bottom:0.75rem;">💡 Comparte el JSON exportado con otros pilotos. Pueden importarlo desde el botón "Importar JSON".</p>
            </div>
        </div>
    `;

    createIcons({ icons: { Share2, UploadCloud } });

    $('share-public-btn')?.addEventListener('click', () => {
        if (editingSetupId) {
            shareSetupPublic(editingSetupId);
        } else {
            alert('Abre un setup en el editor antes de compartirlo.');
        }
    });

    $('import-community-btn')?.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = async e => {
            const file = e.target.files[0];
            if (!file) return;
            const text = await file.text();
            const result = await importCommunitySetup(text);
            alert(result.message);
            if (result.success) renderCommunityHub();
        };
        input.click();
    });

    section.querySelectorAll('.copy-public-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const s = await SetupService.getById(btn.dataset.id);
            if (!s) return;
            const pub = { ...s, isPublic: true, exportedAt: new Date().toISOString() };
            const json = JSON.stringify(pub, null, 2);
            await navigator.clipboard.writeText(json);
            alert('JSON copiado al portapapeles. Compártelo con otros pilotos.');
        });
    });

    section.querySelectorAll('.unpublish-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            await SetupService.update(btn.dataset.id, { isPublic: false });
            renderCommunityHub();
        });
    });
}

async function shareSetupPublic(setupId) {
    const setup = await SetupService.getById(setupId);
    if (!setup) return;
    const pub = { ...setup, isPublic: true, exportedAt: new Date().toISOString() };
    const json = JSON.stringify(pub, null, 2);
    await navigator.clipboard.writeText(json);
    await SetupService.update(setupId, { isPublic: true });
    alert('✅ Setup publicado:\n\nEl JSON está en tu portapapeles. Cópialo y compártelo.\n\nTambién se guardó como público en tu bóveda.');
}

async function importCommunitySetup(jsonString) {
    let parsed;
    try {
        parsed = JSON.parse(jsonString);
    } catch {
        return { success: false, message: 'JSON inválido.' };
    }
    if (!parsed || !parsed.setupData) {
        return { success: false, message: 'No parece un setup válido.' };
    }
    const imported = normalizeImportedSetup({
        ...parsed,
        id: undefined,
        setupName: parsed.setupName ? `${parsed.setupName} (importado)` : `${parsed.carName || 'Importado'} @ ${parsed.track || '?'}`,
        isPublic: false,
        importedAt: undefined,
        createdAt: undefined,
        updatedAt: undefined,
    });
    try {
        await SetupService.create(imported);
        return { success: true, message: `✅ Setup "${imported.setupName}" importado correctamente.` };
    } catch (e) {
        return { success: false, message: `Error al importar: ${e.message}` };
    }
}

async function showVersionHistory() {
    if (!editingSetupId) return;
    const setup = await SetupService.getById(editingSetupId);
    if (!setup) return;
    const versions = setup.versions || [];
    if (versions.length === 0) {
        alert('No hay historial de versiones.');
        return;
    }

    const modal = document.createElement('div');
    modal.style = 'position:fixed;inset:0;background:#000a;z-index:1000;display:flex;align-items:center;justify-content:center;padding:2rem;overflow-y:auto;';
    modal.innerHTML = `
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:2rem;max-width:520px;width:100%;max-height:85vh;overflow-y:auto;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
                <h2 style="color:white;">Historial de Versiones</h2>
                <button id="close-history" style="background:none;border:none;color:white;cursor:pointer;font-size:1.5rem;padding:0.5rem;">✕</button>
            </div>
            <div style="display:flex;flex-direction:column;gap:0.75rem;">
                ${[...versions].reverse().map(v => `
                    <div style="padding:1rem;background:var(--bg-input);border-radius:8px;border:1px solid var(--border);">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                            <span style="color:var(--accent);font-weight:700;">v${v.v}</span>
                            <span style="color:var(--text-secondary);font-size:0.75rem;">${new Date(v.ts).toLocaleString()}</span>
                        </div>
                        <div style="color:var(--text-secondary);font-size:0.75rem;margin-bottom:0.5rem;">
                            ${v.gameVersion ? `Juego: ${escapeHTML(v.gameVersion)}` : ''} ${v.platform ? ` · ${escapeHTML(v.platform)}` : ''}
                        </div>
                        <div style="color:var(--text-secondary);font-size:0.75rem;margin-bottom:0.75rem;">
                            Params guardados: ${Object.keys(v.setupData || {}).length}
                        </div>
                        <button class="restore-btn" data-v="${v.v}" style="background:var(--accent);border:none;color:white;padding:0.4rem 1rem;border-radius:6px;cursor:pointer;font-size:0.8rem;font-weight:600;">Restaurar esta versión</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    $('close-history')?.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    modal.querySelectorAll('.restore-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const vNum = parseInt(btn.dataset.v);
            await restoreVersion(editingSetupId, vNum);
            modal.remove();
        });
    });
}

async function restoreVersion(setupId, versionNum) {
    if (!confirm(`¿Restaurar versión ${versionNum}? El estado actual se guardará como una nueva versión.`)) return;
    const setup = await SetupService.getById(setupId);
    if (!setup) return;
    const version = (setup.versions || []).find(v => v.v === versionNum);
    if (!version) return;
    _tabData = JSON.parse(JSON.stringify(version.setupData || {}));
    renderFields(setup.gameId, _tabData);
    alert(`Versión ${versionNum} restaurada. Revisa los valores antes de guardar.`);
}

function triggerImport() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async e => {
        const file = e.target.files[0];
        if (!file) return;
        const text = await file.text();
        const result = await SetupService.importSetups(text);
        if (result.success) {
            alert(`Importación completada:\n• ${result.created} importados\n• ${result.duplicates} duplicados omitidos\n• ${result.rejected} rechazados`);
            renderDashboard();
        } else {
            alert(`Error en importación: ${result.reason}`);
        }
    };
    input.click();
}

init();
