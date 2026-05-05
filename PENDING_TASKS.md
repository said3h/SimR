# SimRacing Vault - Pending Tasks

**Status:** ✅ Data & Templates Complete | 🔄 Testing & Features Pending  
**Date:** 2026-05-05  
**Session:** Extended (14 games, 1,320+ cars)

---

## PASO 1: Browser Testing & Validation ⏳

### Pre-Testing Checklist
- [ ] Start dev server (`npm run dev`)
- [ ] Open browser at localhost:5173
- [ ] Clear browser cache/cookies

### Template Rendering Tests (14 games)

#### Primary Games (6)
- [ ] **ACC** - Verify 5 tabs (Suspensión, ARBs, Frenos, Electrónica, Drivetrain)
  - Check Ride Height, Wheel Rate, Damper parameters render
  - Verify min/max ranges display correctly
- [ ] **F1 24** - Verify single tab with wing/hybrid parameters
  - Test ERS settings visibility
  - Verify power limits apply per car
- [ ] **GT7** - Verify single tab with power limiter
  - Check parameter ranges
- [ ] **iRacing** - Verify 6 tabs with dynamic car loading
  - Test car selection dropdown
  - Verify override constraints load
- [ ] **DR2** - Verify 5 tabs (Transmisión, Suspensión, Frenos, Neumáticos, Alineación)
  - Confirm FFB tab NOT present (includFFB: false)
  - Check nested object parameters display correctly
- [ ] **WRC** - Verify 5 tabs with rally-specific parameters
  - Test differential lock settings (0-100%)
  - Verify tire pressure ranges for different surfaces

#### Secondary Games (5)
- [ ] **Assetto Corsa** - Verify 4 tabs with car-specific constraints
- [ ] **Forza Motorsport** - Verify 6 tabs (Neumáticos, Transmisión, Geometría, Suspensión, Aero, Frenos/Diff)
- [ ] **rFactor 2** - Verify group_simpro template loads
- [ ] **Automobilista 2** - Verify group_simpro with 104 classes
- [ ] **Richard Burns Rally** - Verify group_rally template with rally parameters

#### Recent Games (3) [NEW]
- [ ] **Le Mans Ultimate** - Verify group_simpro template
  - Check 4 car categories (Hypercar, LMP2, LMGT3, GTE)
  - Verify 10 WEC circuits display
  - Test parameter ranges for prototype racing
- [ ] **Assetto Corsa Rally** - Verify group_rally template
  - Check 3 rally car eras display correctly
  - Verify 30 stage list loads
  - Test rally-specific differential controls
- [ ] **RENNSPORT** - Verify group_standard template
  - Check 3 sports car categories
  - Verify 15 iconic circuits display
  - Test sports car tuning parameters

### Parameter Constraint Tests
- [ ] Car selection dropdown works for all 14 games
- [ ] Override ranges apply when car is selected
- [ ] Min/max values match override definitions
- [ ] Step values work correctly (sliders increment properly)
- [ ] Percentage fields show % symbol
- [ ] Number fields show correct units (mm, kPa, N/mm, etc.)

### UI/UX Tests
- [ ] No console errors when switching games
- [ ] No console errors when selecting cars
- [ ] Tab switching works smoothly
- [ ] Parameter values can be edited
- [ ] UI responsive on desktop viewport
- [ ] Fonts and spacing consistent across all games

### Browser DevTools Console
- [ ] Zero JavaScript errors
- [ ] Zero warnings related to templates or overrides
- [ ] No missing asset warnings
- [ ] Network requests successful

---

## PASO 2: Override Files Creation (if needed) 🔄

### Check Existing Override Files
```
src/core/overrides/
├── acc_car_overrides.js        ✅ Exists
├── f1_car_overrides.js         ✅ Exists
├── gt7_car_overrides.js        ✅ Exists
├── iracing_car_overrides.js    ✅ Exists
├── dr2_car_overrides.js        ✅ Exists
├── wrc_car_overrides.js        ✅ Exists
├── ac_car_overrides.js         ❓ Check if needed
├── forza_car_overrides.js      ❓ Check if needed
├── rf2_car_overrides.js        ❓ Check if needed
├── ams2_car_overrides.js       ❓ Check if needed
├── rbr_car_overrides.js        ❓ Check if needed
├── lmu_car_overrides.js        ❓ Check if needed
├── ac_rally_car_overrides.js   ❓ Check if needed
└── rennsport_car_overrides.js  ❓ Check if needed
```

### For Each Game Needing Override File
- [ ] Research game's car-specific constraints
- [ ] Create override function that returns constraints per carId
- [ ] Import function in `src/modules/services/overrides.js`
- [ ] Add to `getGameOverride()` function
- [ ] Test with sample cars to verify constraints apply

---

## PASO 3: Example Setups Creation (Optional) 📋

### Create Sample Setup Files
For each game, create 2-3 example setups:
- One for road courses (Monza, Spa, etc.)
- One for street circuits (Monaco, Singapore, etc.)
- One for special cases (wet weather, rally stages, etc.)

Structure:
```json
{
  "setupId": "acc_porsche_911_gt3_r_monza_dry",
  "game": "acc",
  "car": "porsche_911_gt3_r",
  "circuit": "monza",
  "conditions": "dry",
  "parameters": {
    "rh_f": 55,
    "rh_r": 65,
    "wrate_f": 130,
    ...
  },
  "author": "SimRacing Vault",
  "notes": "Competitive setup for Monza 1h race"
}
```

---

## PASO 4: API Endpoints (Future) 🌐

### Endpoints to Create
```
GET /api/games                    - List all 14 games
GET /api/games/{gameId}           - Game details
GET /api/games/{gameId}/cars      - Cars for game
GET /api/games/{gameId}/circuits  - Circuits for game
GET /api/cars/{carId}/overrides   - Car constraints
GET /api/setups                   - List user setups
POST /api/setups                  - Save new setup
GET /api/setups/{setupId}         - Get setup details
```

---

## PASO 5: Database Integration (Future) 💾

### Setup Database
- [ ] Choose database (PostgreSQL, MongoDB, etc.)
- [ ] Design schema for games, cars, circuits, setups
- [ ] Migrate JSON data to database
- [ ] Create API service layer

---

## Issue Tracking

### Known Issues
- None currently identified

### Potential Improvements
1. Add car images/icons for better visual identification
2. Add circuit maps/visual representations
3. Create setup comparison tool
4. Add FFB profile presets
5. Add telemetry visualization
6. Create mobile-friendly interface

---

## Current Work Status

✅ **COMPLETED:**
- 14 games with templates
- 1,320+ cars documented
- 226+ circuits/stages documented
- Override mappings for all games
- Build validation (0 errors)
- Git commits tracked

🔄 **IN PROGRESS:**
- Browser testing (PASO 1)
- Need to start testing each game template visually

⏳ **PENDING:**
- PASO 1: Complete browser testing (13 more games to test)
- PASO 2: Create override files for secondary/new games
- PASO 3: Create example setups
- PASO 4: Build API endpoints
- PASO 5: Database integration

---

## Next Immediate Steps

1. **PRIORITY 1:** Complete PASO 1 browser testing
   - Start dev server
   - Test all 14 games rendering
   - Document any issues found

2. **PRIORITY 2:** Create override files for games needing them
   - Check which override files exist
   - Create missing ones
   - Test override constraints

3. **PRIORITY 3:** Create example setups for each game
   - 2-3 setups per game
   - Different circuit types
   - Competitive-level parameters

4. **PRIORITY 4:** Prepare API structure
   - Design endpoints
   - Create API documentation

---

**Status:** Ready for PASO 1 Browser Testing  
**Blockers:** None  
**Risk Level:** Low - All data verified before browser testing

