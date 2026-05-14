# SimRacing Vault — Architecture Documentation

## System Overview

SimRacing Vault is a setup management application for sim racing with multi-game support (ACC, F1 24, GT7, iRacing). The refactored architecture uses a modular design with clear separation between core state management, business logic services, and UI components.

## Architectural Principles

### 1. **Single Responsibility**
Each module has one clear purpose:
- State modules handle data & DOM
- Service modules handle business logic
- UI modules handle rendering & interaction

### 2. **Unidirectional Dependencies**
```
UI Modules → Services → Utils/State → Core
```
No circular dependencies. UI depends on services, services depend on state, everything can use utils.

### 3. **Loose Coupling via Events**
Features communicate via `dispatchAppEvent()`/`onAppEvent()` rather than direct function calls, enabling:
- Independent feature development
- Easy feature toggling
- Clean separation of concerns

### 4. **Centralized State**
All app state lives in `appState` object in state.js:
- Single source of truth
- Easy debugging (console.log appState)
- Consistent state transitions

### 5. **Safe DOM Access**
All DOM queries go through `dom` property getters in state.js:
- Error handling built-in
- Centralized element lookup
- Easy to refactor HTML later

## Layer Breakdown

### Layer 1: Foundation (Core Utilities)

#### state.js
Provides:
- **appState object**: Complete app state with reset methods
- **dom property getters**: Cached element access (45+ elements)
- **$ helper**: Shorthand for getElementById

**Why separate**: State changes are central to app behavior. Isolating state makes debugging and testing easier.

#### utils.js
Provides:
- **Error handling**: formatError, showError, showView
- **Event utilities**: debounce, safeAddListener, safeGetElement
- **Security**: HTML/attribute escaping

**Why separate**: Utilities are reusable across all modules. Centralizing them reduces duplication.

#### core.js
Provides:
- **initApp()**: Orchestrates startup (populate selects, setup listeners, etc.)
- **dispatchAppEvent/onAppEvent**: Event system for loose coupling

**Why separate**: Initialization orchestration is complex and valuable to isolate. Events enable plugins.

---

### Layer 2: Business Logic Services

Services encapsulate domain logic without UI concerns.

#### services/carSelection.js
Responsible for:
- **Car data population**: Fetches from GAME_CARS and renders into selectors
- **Game-specific grouping**: Optgroups by brand (ACC), class (GT7/iRacing), flat (F1)
- **Car name resolution**: Map carId → carName per game
- **Field visibility**: Show/hide appropriate selector based on game

**Key insight**: Car selection is complex because each game has different car structures. Centralizing it prevents duplication across UI.

#### services/overrides.js
Responsible for:
- **Parameter override mapping**: OVERRIDE_MAPS define param↔override-key relationships
- **Override loading**: dispatcher to game-specific override functions
- **Override application**: Patches template parameters with override values
- **Status updates**: Displays override status in UI

**Key insight**: Overrides are game-specific but follow a consistent pattern. Mapping + dispatcher architecture scales to new games.

---

### Layer 3: UI Components

UI modules handle rendering and user interaction. They depend on services for data but don't contain business logic.

#### ui/dashboard.js
Responsible for:
- **Rendering setup grid**: Fetches setups from SetupService, renders as cards
- **Card interaction**: Favorite, delete, duplicate, compare
- **Stats display**: Total count, favorite count
- **Comparison view**: Side-by-side setup comparison

**Data flow**: 
```
renderDashboard() 
  → SetupService.getAll() 
  → render cards 
  → setupCardsListeners() 
  → click handlers call SetupService methods
  → re-render dashboard
```

#### ui/editor.js
Responsible for:
- **Opening editor**: Load setup or create new
- **Form management**: Collect data, apply overrides
- **Setup persistence**: Call SetupService.create/update
- **Field management**: Car selectors, track suggestions, rating

**Data flow**:
```
openEditor(id) 
  → load setup from SetupService 
  → populate form fields 
  → call renderFields() 
  → user edits 
  → saveSetup() 
  → SetupService.create/update()
  → showView('dashboard')
```

#### ui/params.js
Responsible for:
- **Tab rendering**: Render available tabs for game
- **Parameter grid**: Render all parameters with proper control types
- **Event attachment**: +/- buttons, input changes, step values
- **Notes section**: Game-specific notes textarea

**Key insight**: Parameters are game-specific but rendering logic is generic. Different control types (toggle, percentage, numeric, etc.) handled in renderParamsHTML().

**Data flow**:
```
renderFields(gameId) 
  → get template for game 
  → render tabs 
  → renderParamsGrid() 
  → renderParamsHTML() 
  → attachParamEvents()
  → user interactions update _tabData
```

#### ui/listeners.js
Responsible for:
- **Event binding**: Attach all user-triggered handlers
- **Filter management**: Search, game filter, weather, favorite, sort
- **Auth listeners**: Login buttons
- **Feature delegation**: Import/export, telemetry, OCR, voice, etc.

**Why separate**: Listener setup is complex and easy to miss. Consolidating it ensures nothing is forgotten.

---

## Data Flow Patterns

### Pattern 1: Dashboard Rendering
```
renderDashboard()
  ├─ SetupService.getAll(filters, sortBy)
  ├─ SetupService.getAllRaw()
  ├─ renderSetupCard() for each setup (with escaping)
  ├─ setupCardsListeners() (attach all handlers)
  ├─ createIcons() (Lucide icons)
  └─ updateStats()
```

### Pattern 2: Setup Editing
```
openEditor(id)
  ├─ SetupService.getById(id) if editing
  ├─ Populate form fields
  ├─ updateCarField() → show right selector for game
  ├─ populateTrackSuggestions()
  ├─ renderFields(gameId) → tabs + parameters
  └─ updateHistoryButton() if editing

→ User edits → collectCurrentTabData() → saveSetup()
  ├─ Gather all inputs
  ├─ Parse tags (comma → array)
  ├─ Resolve carId + carName
  ├─ SetupService.create() or .update()
  └─ showView('dashboard')
```

### Pattern 3: Game Change
```
gameSelect change event
  ├─ resetEditor()
  ├─ updateCarField() → hide ACC select, show F1 select, etc.
  ├─ updateCarSuggestions() → populate datalist
  ├─ renderFields(gameId)
  │  ├─ Get template for new game
  │  ├─ renderParamsGrid() with new template params
  │  └─ attachParamEvents()
  └─ Update notes section for new tabs
```

### Pattern 4: Car Selection with Override
```
carSelectAcc change event
  ├─ getGameOverride('acc', carId)
  ├─ Store in appState._activeOverride
  ├─ renderFields('acc', _tabData)
  │  ├─ applyGameOverrides() uses stored override
  │  ├─ Patches min/max/step values
  │  └─ Special handling for wheel rate arrays
  └─ updateOverrideStatus() displays badge
```

### Pattern 5: Filter & Sort
```
Filter/Sort change → setupDashboardFilters()
  ├─ Update appState.currentFilters
  ├─ renderDashboard()
  └─ SetupService.getAll(currentFilters, sortBy)
```

---

## Multi-Game Architecture

Each game has:
1. **Template** (GAME_TEMPLATES) - Tab structure + parameters
2. **Cars** (GAME_CARS) - Car list with metadata
3. **Circuits** (GAME_CIRCUITS) - Track list with class
4. **Overrides** (game-specific functions) - Min/max/step constraints per car

### Override Architecture

**Pattern**:
```
getGameOverride(gameId, carId)
  ├─ 'acc' → getAccCarOverride(carId)
  ├─ 'f1_24' → getF1CarOverride(carId)
  ├─ 'gt7' → getGT7CarOverride(carId)
  └─ 'iracing' → getIRacingCarOverride(carId)

applyGameOverrides(gameId, params, override)
  ├─ Look up gameId in OVERRIDE_MAPS
  ├─ For each param:
  │  ├─ Find override mapping
  │  ├─ Get values from override (min/max/step or array)
  │  └─ Patch param with override values
  └─ Return patched params
```

**Example - ACC Tire Pressure**:
```
Override mapping:
  pres_fl: { min: 'tyrePressureMin', max: 'tyrePressureMax', step: 'tyrePressureStep' }

Override object (from car):
  { tyrePressureMin: 26.0, tyrePressureMax: 32.0, tyrePressureStep: 0.1 }

Result:
  Original param: { id: 'pres_fl', l: 'FL Pressure', min: 0, max: 100, step: 1 }
  Patched param: { id: 'pres_fl', l: 'FL Pressure', min: 26.0, max: 32.0, step: 0.1 }
```

**Adding a New Game**:
1. Create `src/core/overrides/newgame_car_overrides.js` with `getNewgameCarOverride(carId)` function
2. Add import in `services/overrides.js`
3. Add game to `getGameOverride()` dispatcher
4. Add game entry to `OVERRIDE_MAPS`
5. Create template in `GAME_TEMPLATES`
6. Add cars to `GAME_CARS`
7. Add circuits to `GAME_CIRCUITS`

---

## Security Considerations

### XSS Prevention
All user data is escaped before rendering:
```javascript
// escapeHTML in utils.js
const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));
```

Applied everywhere:
- Setup names, car names, track names
- Parameter values and labels
- Tags and notes
- Filter values

### Safe DOM Access
```javascript
// safeGetElement & safeAddListener in utils.js
safeAddListener(el, 'click', () => {
  try {
    // handler code
  } catch (e) {
    console.warn(`Failed to add listener`, e);
  }
});
```

Prevents crashes from missing elements or listener errors.

### localStorage Isolation
`SetupService` uses localStorage for persistence. No sensitive data exposed:
- Setup parameters (game-specific, not credentials)
- Metadata (names, tags, ratings)
- No authentication tokens in localStorage

---

## Testing Strategy

### Unit Tests (Vitest)
Test individual functions:
- `services/overrides.js`: applyGameOverrides() with various game/param combos
- `services/carSelection.js`: getGameCarName(), getCarBrand()
- `utils.js`: debounce, validateRequired, escaping

### Integration Tests
Test module interactions:
- openEditor() → form population → saveSetup() workflow
- Game change → renderFields → proper tabs/params displayed
- Car selection → override loading → params patched correctly
- Filter/sort → dashboard re-render with filtered results

### E2E Tests (Playwright)
Full user flows:
- Create setup for each game
- Edit setup with various parameters
- Compare two setups
- Import/export and verify round-trip
- Voice note, OCR, QR sharing flows

---

## Performance Considerations

### Bundle Size
Current: 926 KB (59 KB gzipped)

**Optimization opportunities**:
1. **Code splitting**: Move features (OCR, voice, telemetry) to dynamic imports
2. **Treeshaking**: Ensure unused code is removed in production build
3. **Lazy routes**: Load editor/dashboard code separately

### Runtime Performance
1. **Debouncing**: Search and car suggestions debounced (150-250ms)
2. **DOM caching**: Elements cached in state.js, no repeated queries
3. **Event delegation**: Consider delegating card listeners to grid instead of individual cards
4. **Virtual scrolling**: For dashboards with 1000+ setups (future optimization)

---

## Extension Points

### Adding a Feature
1. Create `src/modules/features/myfeature.js`
2. Export public functions
3. In `ui/listeners.js`, add button handler that imports and calls feature
4. Use `dispatchAppEvent()` to communicate with rest of app

**Example - New Export Format**:
```javascript
// src/modules/features/export-json.js
export async function exportJSON() {
  const setups = await SetupService.getAll();
  const json = JSON.stringify(setups, null, 2);
  // download
}

// In ui/listeners.js
setupFeatureButtons() {
  const btn = dom.exportJsonBtn;
  if (btn) safeAddListener(btn, 'click', async () => {
    const { exportJSON } = await import('../features/export-json.js');
    exportJSON();
  });
}
```

### Adding a Game
See "Multi-Game Architecture" section above. Minimal changes needed:
- 1 override file
- 1 entry in OVERRIDE_MAPS
- 1 template, cars, circuits data structure

---

## Deployment Checklist

- [ ] All modules bundled correctly (`npm run build`)
- [ ] No console errors in production build
- [ ] All game templates working (ACC, F1, GT7, iRacing)
- [ ] Override loading for each game
- [ ] Dashboard filters functional
- [ ] Setup CRUD operations working
- [ ] Import/export round-trip verified
- [ ] Voice notes and OCR working
- [ ] Comparison view functional
- [ ] Mobile responsive
- [ ] localStorage persists across sessions
- [ ] Error messages display correctly
- [ ] XSS tests (try `<script>` in setup name)

---

## Troubleshooting

### "Cannot find module 'X'"
- Check import path (relative paths need `./`)
- Verify file exists in src/modules/
- Check for circular imports

### "ReferenceError: dom.elementName is undefined"
- Add getter to `state.js` dom object
- Ensure HTML has matching element with id
- Check element id spelling in HTML

### "Setup not saving"
- Check browser console for errors
- Verify localStorage is not full
- Check SetupService.create() is called
- Verify form fields are within #setup-form

### "Override values not applying"
- Check car has override function in src/core/overrides/
- Verify OVERRIDE_MAPS entry exists for game
- Check override object has correct keys
- Log override object to console to inspect

---

## Future Architecture Improvements

1. **TypeScript**: Add type definitions for all modules
2. **State Machine**: Use XState for complex state transitions
3. **Component Library**: Extract UI components (Card, Modal, Button, etc.)
4. **Monorepo**: Separate concerns into packages (api, ui, core)
5. **GraphQL**: Replace localStorage with backend API
6. **Real-time Sync**: WebSockets for collaborative editing
7. **Offline First**: Service workers for offline setup management
