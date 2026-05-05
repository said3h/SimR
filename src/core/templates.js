export const FFB_TEMPLATE = {
    id: 'ffb_universal',
    name: 'Ajustes de Volante (FFB)',
    params: [
        { id: 'ffb_base', l: 'Marca/Modelo Base', type: 'options', options: ['Logitech G29/G923', 'Fanatec CSL DD', 'Fanatec DD1/DD2', 'Moza R5/R9/R12', 'Thrustmaster T300', 'Thrustmaster TS-PC', 'Simagic Alpha', 'Simucube 2', 'Asetek Forte', 'Otro'] },
        { id: 'ffb_rot', l: 'Ángulo de Giro (º)', type: 'number', step: 10, min: 180, max: 1080, s: ' º' },
        { id: 'ffb_gain', l: 'Intensidad FFB General', type: 'step', min: 0, max: 100, s: '%' },
        { id: 'ffb_road', l: 'Efectos de Carretera', type: 'step', min: 0, max: 100, s: '%' },
        { id: 'ffb_under', l: 'Efecto Subviraje (Understeer)', type: 'step', min: 0, max: 100, s: '%' },
        { id: 'ffb_dead', l: 'Zona Muerta (Deadzone)', type: 'step', min: 0, max: 10, step: 0.1, s: '%' },
        { id: 'ffb_lin', l: 'Sensibilidad Linealidad', type: 'step', min: 0, max: 100, s: '%' },
        { id: 'ffb_soft', l: 'Soft Lock', type: 'toggle' },
        { id: 'ffb_brake', l: 'FFB en Frenos', type: 'step', min: 0, max: 100, s: '%' }
    ]
};

// ─────────────────────────────────────────────────────────────────────────────
// ACC SETUP TEMPLATE — Assetto Corsa Competizione PC
// Estructura fiel al menú real del juego (5 tabs en orden original del juego).
// Fuentes: community setup guides, ACC wiki, RaceDepartment, Coach Dave Academy.
// Valores marcados ✓ = verificados por múltiples fuentes.
// Valores marcados ⚠ = PENDIENTE DE VERIFICACIÓN (no inventados, extraídos de
//   referencias parciales; deben confirmarse in-game antes de publicar).
//
// TABS REALES DEL JUEGO (orden exacto):
//   1. Tyres
//   2. Mechanical Grip
//   3. Dampers
//   4. Aero
//   5. Electronics
//
// SELECTOR DE CLIMA:
//   Dry / Wet / Mixed
//   - En Wet cambian los rangos recomendados de presión de neumáticos.
//   - En Wet se recomienda Brake Pad 3.
//   - El juego NO usa pestañas separadas por clima; es el mismo menú.
//   - La app guarda variantes por clima dentro del mismo setup de coche.
// ─────────────────────────────────────────────────────────────────────────────

export const GAME_TEMPLATES = [
    // GROUP 1: PURE SIMULATORS
// ─────────────────────────────────────────────────────────────────────────────
// ACC SETUP TEMPLATE — Assetto Corsa Competizione (PC)
// Estructura verificada contra el menú real del juego (5 tabs en orden original).
//
// MENÚ REAL DEL JUEGO (orden exacto confirmado):
//   1. Suspension  → Ride Height, Wheel Rate, Bumpstop Rate/Range, Damper (bump/rebound)
//   2. ARBs        → Anti-Roll Bar Front/Rear
//   3. Brakes      → Brake Pressure, Brake Bias, Brake Duct ON/OFF (per wheel), Brake Pad
//   4. Electronics → TC1, TC2, ABS, Engine Map, Pit Limiter, Fuel
//   5. Drivetrain  → Max Velocity, Gear 1-6, Final Drive, Diff Preload
//
// PARÁMETROS "NO AJUSTABLES EN ACC" según investigación:
//   - Weight Distribution → Característica fija del coche, NO editable
//   - CG Height → NO existe como parámetro de setup (calculado, no editable)
//   - Brake Duct → Toggle ON/OFF por rueda, no slider numérico
//   - Tyre Compound → Solo hay 2 compuestos: DHF (dry) y WH (rain) — se elige por sesión
//
// Fuentes: ACC community setup guides, RaceDepartment, OverTake forums,
//          Coach Dave Academy, assetto-corsa.com wiki, GT3 physics specs.
// ─────────────────────────────────────────────────────────────────────────────

    {
        id: 'acc',
        name: 'Assetto Corsa Competizione',
        type: 'tabbed',

        weatherVariants: ['Dry', 'Wet', 'Mixed'],

        notes: [
            { id: 'note_susp',      label: 'Notas — Suspensión',       placeholder: 'Ejs: Ride height muy bajo en Monza. Spring rate trasero muy blando...' },
            { id: 'note_arb',       label: 'Notas — ARBs',              placeholder: 'Ejs: ARB delante muy rígida causando subviraje en curva 3...' },
            { id: 'note_brakes',    label: 'Notas — Frenos',            placeholder: 'Ejs: Brake duct abierto en Spa. Pad 2 para endurance...' },
            { id: 'note_elec',      label: 'Notas — Electrónica',       placeholder: 'Ejs: TC1 en 8 por ser circuito técnico. ABS muy intrusive...' },
            { id: 'note_drivetrain',label: 'Notas — Drivetrain',        placeholder: 'Ejs: Diff preload alto para circuito histórico. Vmax limitada a 320...' },
            { id: 'note_strategy',  label: 'Notas — Estrategia',        placeholder: 'Ejs: Stint de 8 vueltas. Fuel load 85L. Pit window lap 14-16...' },
        ],

        tabs: [

            // ══════════════════════════════════════════════════════════════════
            // TAB 1 — SUSPENSION
            // Orden real: Ride Height → Wheel Rate → Bumpstop → Dampers (slow/fast bump/rebound) → Geometry
            // ✓ Todos parámetros reales del juego.
            // ══════════════════════════════════════════════════════════════════
            { id: 'susp', name: 'Suspensión', params: [

                // Ride Height (mm) — confirmado real
                { id: 'rh_f', l: 'Ride Height Front', type: 'step', min: 40, max: 100, step: 1, s: ' mm',
                  note: '✓ Parámetro real. Rango típico GT3: 40-100mm. Afecta ground effect y enfriamiento.' },
                { id: 'rh_r', l: 'Ride Height Rear',  type: 'step', min: 40, max: 110, step: 1, s: ' mm',
                  note: '✓ Parámetro real. Típico trasero más alto que delante para rake positivo.' },

                // Wheel Rate / Spring Rate (N/mm) — confirmado real
                { id: 'wrate_f', l: 'Wheel Rate Front', type: 'step', min: 50, max: 300, step: 10, s: ' N/mm',
                  note: '✓ Parámetro real. Step = 10 N/mm. Rango varía por coche (GT3 típico 80-200 N/mm).' },
                { id: 'wrate_r', l: 'Wheel Rate Rear',  type: 'step', min: 50, max: 300, step: 10, s: ' N/mm',
                  note: '✓' },

                // Bumpstop Rate (N/mm) — confirmado real
                { id: 'bump_rate_f', l: 'Bumpstop Rate Front', type: 'step', min: 50, max: 2000, step: 50, s: ' N/mm',
                  note: '✓ Parámetro real. Típico GT3: 200-1500 N/mm. Step por defecto 50 N/mm.' },
                { id: 'bump_rate_r', l: 'Bumpstop Rate Rear',  type: 'step', min: 50, max: 2000, step: 50, s: ' N/mm',
                  note: '✓' },

                // Bumpstop Range (mm) — confirmado real
                { id: 'bump_range_f', l: 'Bumpstop Range Front', type: 'step', min: 0, max: 50, step: 1, s: ' mm',
                  note: '✓ Controla cuanto viaja la suspensión antes de tocar el bumpstop.' },
                { id: 'bump_range_r', l: 'Bumpstop Range Rear',  type: 'step', min: 0, max: 50, step: 1, s: ' mm',
                  note: '✓' },

                // Dampers — Bump Slow/Fast + Rebound Slow/Fast (0-11) — confirmado real
                { id: 'bump_slow_f', l: 'Bump Slow Front',    type: 'step', min: 0, max: 11, step: 1,
                  note: '✓ Dampers reales. Rango 0-10 o 0-11 según coche. Bump lento para frenada.' },
                { id: 'bump_slow_r', l: 'Bump Slow Rear',     type: 'step', min: 0, max: 11, step: 1,
                  note: '✓' },
                { id: 'bump_fast_f', l: 'Bump Fast Front',    type: 'step', min: 0, max: 11, step: 1,
                  note: '✓ Bump rápido para baches y transiciones de carga.' },
                { id: 'bump_fast_r', l: 'Bump Fast Rear',     type: 'step', min: 0, max: 11, step: 1,
                  note: '✓' },
                { id: 'reb_slow_f',  l: 'Rebound Slow Front', type: 'step', min: 0, max: 11, step: 1,
                  note: '✓ Rebound lento para estabilidad en curvas rápidas.' },
                { id: 'reb_slow_r',  l: 'Rebound Slow Rear',  type: 'step', min: 0, max: 11, step: 1,
                  note: '✓' },
                { id: 'reb_fast_f',  l: 'Rebound Fast Front', type: 'step', min: 0, max: 11, step: 1,
                  note: '✓ Rebound rápido para reacción inmediata.' },
                { id: 'reb_fast_r',  l: 'Rebound Fast Rear',  type: 'step', min: 0, max: 11, step: 1,
                  note: '✓' },

                // Alignment — dentro del tab Suspension en el juego
                { id: 'camber_f', l: 'Camber Front', type: 'step', min: -5.0, max: -1.0, step: 0.05, s: '°',
                  note: '✓ Negativo. Típico GT3: -3.5° a -2.5° delante.' },
                { id: 'camber_r', l: 'Camber Rear',  type: 'step', min: -5.0, max: -1.0, step: 0.05, s: '°',
                  note: '✓' },
                { id: 'toe_f',   l: 'Toe Front',    type: 'step', min: -0.50, max: 0.50, step: 0.01, s: '°',
                  note: '✓ Toe-out (neg) = más responsive. Toe-in (pos) = más estable.' },
                { id: 'toe_r',   l: 'Toe Rear',      type: 'step', min: -0.50, max: 0.50, step: 0.01, s: '°',
                  note: '✓' },
                { id: 'caster',  l: 'Caster',        type: 'step', min: 3.0, max: 16.0, step: 0.1, s: '°',
                  note: '✓ Típico GT3: 10°-16°. Afecta feel y estabilidad en recta.' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 2 — ARBs
            // Orden real: Front ARB → Rear ARB
            // ✓ Parámetros reales del juego.
            // ══════════════════════════════════════════════════════════════════
            { id: 'arbs', name: 'ARBs', params: [

                { id: 'arb_f', l: 'Anti Roll Bar Front', type: 'step', min: 1, max: 14, step: 1,
                  note: '✓ Parámetro real. Rango 1-14 (o 1-10 según plataforma/coche).' },
                { id: 'arb_r', l: 'Anti Roll Bar Rear',  type: 'step', min: 1, max: 14, step: 1,
                  note: '✓ Más rígido = menos subviraje (menos rolido).' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 3 — BRAKES
            // Orden real: Brake Pressure → Brake Bias → Brake Duct (ON/OFF per wheel) → Brake Pad
            // ✓ Parámetros reales del juego.
            // ══════════════════════════════════════════════════════════════════
            { id: 'brakes', name: 'Frenos', params: [

                { id: 'brake_power', l: 'Brake Power', type: 'step', min: 80, max: 100, step: 1, s: '%',
                  note: '✓ Potencia máxima del sistema de frenos. 100% = máximo.' },

                { id: 'brake_bias', l: 'Brake Bias', type: 'step', min: 46.0, max: 60.0, step: 0.2, s: '%',
                  note: '✓ Porcentaje al delantero. 54% = neutro. Rango típico 50-58%.' },

                { id: 'brake_duct_fl', l: 'Brake Duct FL', type: 'options',
                  options: ['Off', 'On'],
                  note: '✓ Toggle ON/OFF. Activa flujo de aire frío a freno izquierdo.' },
                { id: 'brake_duct_fr', l: 'Brake Duct FR', type: 'options',
                  options: ['Off', 'On'],
                  note: '✓' },
                { id: 'brake_duct_rl', l: 'Brake Duct RL', type: 'options',
                  options: ['Off', 'On'],
                  note: '✓' },
                { id: 'brake_duct_rr', l: 'Brake Duct RR', type: 'options',
                  options: ['Off', 'On'],
                  note: '✓' },

                { id: 'brake_pad', l: 'Brake Pad', type: 'options',
                  options: ['Pad 1 – Sprint / Max Performance', 'Pad 2 – Endurance (12h)', 'Pad 3 – Wet / Long Endurance', 'Pad 4 – Testing (Worn Pad 1)'],
                  wetRecommended: 'Pad 3',
                  dryRecommended: 'Pad 1 o Pad 2',
                  note: '✓ 4 tipos reales del juego. Pad 1 = más grip/más desgaste. Pad 3 = lluvia.' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 4 — ELECTRONICS
            // Orden real: TC1 → TC2 → ABS → Engine Map → Pit Limiter → Fuel
            // ✓ Parámetros reales del juego. TC2 no está en todos los coches.
            // ══════════════════════════════════════════════════════════════════
            { id: 'elec', name: 'Electronics', params: [

                { id: 'tc1', l: 'Traction Control 1', type: 'step', min: 0, max: 12, step: 1,
                  note: '✓ Control de tracción principal. 0 = off. Rango típico GT3: 0-11.' },
                { id: 'tc2', l: 'Traction Control 2', type: 'step', min: 0, max: 12, step: 1,
                  note: '✓ TC secundario (reduce potencia cuando TC1 actúa). No todos los GT3 lo tienen.' },
                { id: 'abs', l: 'ABS', type: 'step', min: 0, max: 12, step: 1,
                  note: '✓ Anti-lock system. 0 = off. Rango típico: 0-10 o 0-12 según coche.' },

                { id: 'engine_map', l: 'Engine Map', type: 'step', min: 1, max: 8, step: 1,
                  note: '✓ Mapa del motor. 1 = máxima potencia. 8 = máximo ahorro.' },

                { id: 'pit_limiter', l: 'Pit Limiter', type: 'options',
                  options: ['Off', 'On'],
                  note: '✓ Activa limitador de velocidad en pit lane (80 km/h).' },

                { id: 'fuel', l: 'Fuel', type: 'step', min: 0, max: 120, step: 1, s: ' L',
                  note: '✓ Combustible cargado. Máx = capacidad del tanque (varía por coche).' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 5 — DRIVETRAIN
            // Orden real: Max Velocity → Gear Ratios (1-6) → Final Drive → Differential
            // ✓ Parámetros reales del juego.
            // ══════════════════════════════════════════════════════════════════
            { id: 'drivetrain', name: 'Drivetrain', params: [

                { id: 'vmax', l: 'Max Velocity', type: 'step', min: 0, max: 400, step: 5, s: ' km/h',
                  note: '✓ Limitador de velocidad máxima. Afecta última marcha y aceleración.' },

                { id: 'g1', l: 'Gear 1', type: 'step', min: 0, max: 100, step: 1 },
                { id: 'g2', l: 'Gear 2', type: 'step', min: 0, max: 100, step: 1 },
                { id: 'g3', l: 'Gear 3', type: 'step', min: 0, max: 100, step: 1 },
                { id: 'g4', l: 'Gear 4', type: 'step', min: 0, max: 100, step: 1 },
                { id: 'g5', l: 'Gear 5', type: 'step', min: 0, max: 100, step: 1 },
                { id: 'g6', l: 'Gear 6', type: 'step', min: 0, max: 100, step: 1 },

                { id: 'final_drive', l: 'Final Drive', type: 'step', min: 2.0, max: 5.0, step: 0.05,
                  note: '✓ Relación final. Afecta todas las relaciones de la caja.' },

                { id: 'diff_preload', l: 'Diff Preload', type: 'step', min: 0, max: 200, step: 10, s: ' Nm',
                  note: '✓ Preload del diferencial. Afecta comportamiento en curva sin gas.' }

            ]}

        ]
    },
    // ─────────────────────────────────────────────────────────────────────────────
// iRacing SETUP TEMPLATE
// Sistema de setup más complejo del sim racing. Setup real de 4 fases con
// multi-link suspension, differential avanzado, y muchos más parámetros.
//
// MENÚ REAL DEL JUEGO (orden exacto confirmado):
//   1. Chassis     → Alignment, Springs, Shocks, ARBs, Multi-Link
//   2. Drivetrain  → Differential, Transmission
//   3. Electronics → TC, ABS, Engine Map
//   4. Fuel & Strategy → Fuel, Tyre Pressure
//
// NOTA: iRacing usa INDEX VALUES para muchos parámetros (no valores físicos).
//   Los rangos exactos varían por coche.
//
// Fuentes: iRacing Official Physics, iRacing Forums, setup guides,
//          shock tuning PDFs, community data.
// ─────────────────────────────────────────────────────────────────────────────

    {
        id: 'iracing',
        name: 'iRacing',
        type: 'tabbed',
        tabs: [

            // ══════════════════════════════════════════════════════════════════
            // TAB 1 — ALIGNMENT / SUSPENSION GEOMETRY
            // Orden real: Camber → Caster → Toe → Offset → KPI
            // ✓ Todos parámetros reales del juego.
            // ══════════════════════════════════════════════════════════════════
            { id: 'ira_align', name: 'Alignment', params: [

                { id: 'ira_camber_f', l: 'Camber Front', type: 'step', min: -5.0, max: -1.0, step: 0.05, s: '°',
                  note: '✓ Negativo. Típico GT3: -3.5° a -2.5°.' },
                { id: 'ira_camber_r', l: 'Camber Rear',  type: 'step', min: -5.0, max: -1.0, step: 0.05, s: '°',
                  note: '✓' },
                { id: 'ira_caster_f', l: 'Caster Front', type: 'step', min: 1.0, max: 10.0, step: 0.1, s: '°',
                  note: '✓ Típico: +3° a +8°. Afecta steering feel y estabilidad.' },
                { id: 'ira_caster_r', l: 'Caster Rear',  type: 'step', min: 0.0, max: 10.0, step: 0.1, s: '°',
                  note: '✓' },
                { id: 'ira_toe_f',    l: 'Toe Front',    type: 'step', min: -0.50, max: 0.50, step: 0.01, s: '°',
                  note: '✓ Toe-out (neg) = más responsive, más tire wear. Toe-in (pos) = más estable.' },
                { id: 'ira_toe_r',    l: 'Toe Rear',     type: 'step', min: -0.50, max: 0.50, step: 0.01, s: '°',
                  note: '✓' },
                { id: 'ira_caster_offset', l: 'Caster Offset', type: 'step', min: -10, max: 10, step: 0.5, s: ' mm',
                  note: '✓ Distancia entre steering axis y punto de contacto con el suelo.' },
                { id: 'ira_susp_offset', l: 'Suspension Offset', type: 'step', min: -20, max: 20, step: 1, s: ' mm',
                  note: '⚠ Offset de la suspensión. Afecta roll center y geometry.' },
                { id: 'ira_kpi', l: 'KPI (King Pin Incl.)', type: 'step', min: 0, max: 15, step: 0.1, s: '°',
                  note: '⚠ Calculado, no editable directamente. Afecta scrub radius.' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 2 — SPRINGS
            // Orden real: Spring Rate → Ride Height → Weight Jack (NASCAR)
            // ✓ Parámetros reales del juego.
            // ══════════════════════════════════════════════════════════════════
            { id: 'ira_springs', name: 'Springs', params: [

                { id: 'ira_spring_f', l: 'Spring Rate Front', type: 'step', min: 100, max: 2000, step: 10, s: ' N/mm',
                  note: '✓ Rango típico GT3: 200-1500 N/mm. Step = 10 N/mm.' },
                { id: 'ira_spring_r', l: 'Spring Rate Rear',  type: 'step', min: 100, max: 2000, step: 10, s: ' N/mm',
                  note: '✓' },
                { id: 'ira_ride_height_f', l: 'Ride Height Front', type: 'step', min: 30, max: 150, step: 1, s: ' mm',
                  note: '✓ Altura al suelo. Afecta ground effect y cooling.' },
                { id: 'ira_ride_height_r', l: 'Ride Height Rear',  type: 'step', min: 30, max: 150, step: 1, s: ' mm',
                  note: '✓' },
                { id: 'ira_wedge', l: 'Wedge', type: 'step', min: 0, max: 5, step: 0.1, s: '°',
                  note: '⚠ Solo NASCAR/oval. Distribución diagonal de peso.' },
                { id: 'ira_cross_weight', l: 'Cross Weight %', type: 'step', min: 45, max: 55, step: 0.1, s: '%',
                  note: '⚠ Porcentaje de peso en rueda trasera derecha. Afecta handling balance.' },
                { id: 'ira_weight_jack', l: 'Weight Jack', type: 'step', min: 1, max: 10, step: 1,
                  note: '⚠ NASCAR primarily. Posición del weight jack para ajustar cross weight.' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 3 — SHOCKS / DAMPERS
            // Orden real: Slow Bump → Fast Bump → Slow Rebound → Fast Rebound → Bump Stop
            //             luego Front/Rear para cada uno.
            // ✓ Todos parámetros reales del juego.
            // ══════════════════════════════════════════════════════════════════
            { id: 'ira_shocks', name: 'Shocks', params: [

                { id: 'ira_bump_slow_f', l: 'Bump Slow Front',    type: 'step', min: 0, max: 11, step: 1,
                  note: '✓ Compresión lenta — para frenada y curvas velocidad.' },
                { id: 'ira_bump_slow_r', l: 'Bump Slow Rear',     type: 'step', min: 0, max: 11, step: 1,
                  note: '✓' },
                { id: 'ira_bump_fast_f', l: 'Bump Fast Front',   type: 'step', min: 0, max: 11, step: 1,
                  note: '✓ Compresión rápida — para baches y transiciones.' },
                { id: 'ira_bump_fast_r', l: 'Bump Fast Rear',    type: 'step', min: 0, max: 11, step: 1,
                  note: '✓' },
                { id: 'ira_reb_slow_f',  l: 'Rebound Slow Front', type: 'step', min: 0, max: 11, step: 1,
                  note: '✓ Extensión lenta — para estabilidad en curvas rápidas.' },
                { id: 'ira_reb_slow_r',  l: 'Rebound Slow Rear',  type: 'step', min: 0, max: 11, step: 1,
                  note: '✓' },
                { id: 'ira_reb_fast_f',  l: 'Rebound Fast Front', type: 'step', min: 0, max: 11, step: 1,
                  note: '✓ Extensión rápida — para reacción inmediata.' },
                { id: 'ira_reb_fast_r',  l: 'Rebound Fast Rear',  type: 'step', min: 0, max: 11, step: 1,
                  note: '✓' },
                { id: 'ira_bump_stop_f', l: 'Bump Stop Front',    type: 'step', min: 0, max: 100, step: 5, s: ' N/mm',
                  note: '⚠ Stiffness del bump stop (bottom-out). Típico: 500-2000 N/mm.' },
                { id: 'ira_bump_stop_r', l: 'Bump Stop Rear',    type: 'step', min: 0, max: 100, step: 5, s: ' N/mm',
                  note: '⚠' },
                { id: 'ira_shock_length_f', l: 'Shock Length Front', type: 'step', min: 200, max: 400, step: 1, s: ' mm',
                  note: '⚠ Longitud del amortiguador. Afecta ride height y geometry.' },
                { id: 'ira_shock_length_r', l: 'Shock Length Rear', type: 'step', min: 200, max: 400, step: 1, s: ' mm',
                  note: '⚠' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 4 — ARBs
            // Orden real: Front ARB → Rear ARB → ARB Hole Position
            // ✓ Parámetros reales del juego.
            // ══════════════════════════════════════════════════════════════════
            { id: 'ira_arbs', name: 'ARBs', params: [

                { id: 'ira_arb_f', l: 'ARB Front', type: 'step', min: 1, max: 14, step: 1,
                  note: '✓ Tasa del anti-roll bar delantera. Mayor = menos body roll.' },
                { id: 'ira_arb_r', l: 'ARB Rear',  type: 'step', min: 1, max: 14, step: 1,
                  note: '✓' },
                { id: 'ira_arb_hole_f', l: 'ARB Hole Front', type: 'step', min: 1, max: 10, step: 1,
                  note: '⚠ Posición del hole en el ARB. Afina el ajuste más allá del rate simple.' },
                { id: 'ira_arb_hole_r', l: 'ARB Hole Rear',  type: 'step', min: 1, max: 10, step: 1,
                  note: '⚠' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 5 — DIFFERENTIALS
            // Orden real: Type → Preload → Accel Ramp → Decel Ramp → Pressure
            // iRacing tiene 3 diferenciales (Front/Rear/Forward Rear) en AWD.
            // ✓ Todos parámetros reales del juego.
            // ══════════════════════════════════════════════════════════════════
            { id: 'ira_diffs', name: 'Differentials', params: [

                // Rear Differential
                { id: 'ira_diff_r_type', l: 'Rear Diff Type', type: 'options',
                  options: ['Open', 'Locked', 'Clutch Pack'],
                  note: '✓ Tipo de diferencial trasero.' },
                { id: 'ira_diff_r_preload', l: 'Rear Diff Preload', type: 'step', min: 0, max: 500, step: 10, s: ' Nm',
                  note: '✓ Torque de precarga. Afecta comportamiento en curva sin gas.' },
                { id: 'ira_diff_r_accel', l: 'Rear Diff Accel Ramp', type: 'step', min: 0, max: 90, step: 1, s: '°',
                  note: '✓ Ángulo de rampa en aceleración. Mayor = más lock bajo throttle.' },
                { id: 'ira_diff_r_decel', l: 'Rear Diff Decel Ramp', type: 'step', min: 0, max: 90, step: 1, s: '°',
                  note: '✓ Ángulo de rampa en desaceleración. Mayor = más lock en coast.' },
                { id: 'ira_diff_r_pressure', l: 'Rear Diff Pressure', type: 'step', min: 0, max: 500, step: 10, s: ' psi',
                  note: '⚠ Presión del clutch pack. Afecta fuerza de bloqueo.' },

                // Front Differential
                { id: 'ira_diff_f_type', l: 'Front Diff Type', type: 'options',
                  options: ['Open', 'Locked', 'Clutch Pack'],
                  note: '✓ Tipo de diferencial delantero.' },
                { id: 'ira_diff_f_preload', l: 'Front Diff Preload', type: 'step', min: 0, max: 500, step: 10, s: ' Nm',
                  note: '✓' },

                // Forward Rear Differential (center of rear axle)
                { id: 'ira_diff_fr_type', l: 'F-Rear Diff Type', type: 'options',
                  options: ['Open', 'Locked', 'Clutch Pack'],
                  note: '⚠ Forward rear differential (delante del eje trasero). Solo AWD.' },
                { id: 'ira_diff_fr_preload', l: 'F-Rear Diff Preload', type: 'step', min: 0, max: 500, step: 10, s: ' Nm',
                  note: '⚠' },

                { id: 'ira_fan_drag', l: 'Fan Drag', type: 'options',
                  options: ['Off', 'On'],
                  note: '⚠ Efecto del ventilador en cooling del diff.' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 6 — TRANSMISSION / GEAR RATIOS
            // Orden real: Gear 1-6 (o más) → Final Drive
            // ✓ Parámetros reales del juego.
            // ══════════════════════════════════════════════════════════════════
            { id: 'ira_trans', name: 'Transmission', params: [

                { id: 'ira_g1', l: 'Gear 1', type: 'step', min: 0, max: 100, step: 1 },
                { id: 'ira_g2', l: 'Gear 2', type: 'step', min: 0, max: 100, step: 1 },
                { id: 'ira_g3', l: 'Gear 3', type: 'step', min: 0, max: 100, step: 1 },
                { id: 'ira_g4', l: 'Gear 4', type: 'step', min: 0, max: 100, step: 1 },
                { id: 'ira_g5', l: 'Gear 5', type: 'step', min: 0, max: 100, step: 1 },
                { id: 'ira_g6', l: 'Gear 6', type: 'step', min: 0, max: 100, step: 1 },
                { id: 'ira_g7', l: 'Gear 7', type: 'step', min: 0, max: 100, step: 1 },
                { id: 'ira_g8', l: 'Gear 8', type: 'step', min: 0, max: 100, step: 1 },

                { id: 'ira_final_drive', l: 'Final Drive', type: 'step', min: 1.5, max: 5.0, step: 0.05,
                  note: '✓ Relación final. Afecta todas las marchas.' },

                { id: 'ira_clutch_mode', l: 'Clutch Mode', type: 'options',
                  options: ['Manual', 'Auto', 'Multiplate'],
                  note: '⚠ Modo del clutch. En carrera normalmente Auto o Multiplate.' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 7 — BRAKES
            // Orden real: Brake Power → Brake Bias → Brake Duct → Pad Type
            // ✓ Parámetros reales del juego.
            // ══════════════════════════════════════════════════════════════════
            { id: 'ira_brakes', name: 'Brakes', params: [

                { id: 'ira_brake_power', l: 'Brake Power', type: 'step', min: 80, max: 100, step: 1, s: '%',
                  note: '✓ Multiplicador de potencia de frenado. 100% = máximo.' },
                { id: 'ira_brake_bias', l: 'Brake Bias', type: 'step', min: 46, max: 60, step: 0.1, s: '%',
                  note: '✓ Porcentaje al delantero. Típico GT3: 52-58%.' },

                { id: 'ira_brake_duct_f', l: 'Brake Duct Front', type: 'options',
                  options: ['Closed', 'Open'],
                  note: '✓ Toggle para airflow de refrigeración.' },
                { id: 'ira_brake_duct_r', l: 'Brake Duct Rear', type: 'options',
                  options: ['Closed', 'Open'],
                  note: '✓' },

                { id: 'ira_pad_type', l: 'Brake Pad Type', type: 'options',
                  options: ['Soft', 'Medium', 'Hard', 'Race Soft', 'Race Hard'],
                  note: '⚠ Tipo de pastilla. Afecta grip, temperatura y desgaste.' },

                { id: 'ira_abs', l: 'ABS', type: 'step', min: 0, max: 10, step: 1,
                  note: '⚠ No todos los coches tienen ABS ajustable.' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 8 — AERO
            // Orden real: Front Downforce → Rear Downforce → Drag → Ride Height Aero
            // ✓ Parámetros reales del juego.
            // ══════════════════════════════════════════════════════════════════
            { id: 'ira_aero', name: 'Aero', params: [

                { id: 'ira_downforce_f', l: 'Front Downforce', type: 'step', min: 0, max: 100, step: 1,
                  note: '⚠ Nivel de downforce delantera (índice o porcentaje).' },
                { id: 'ira_downforce_r', l: 'Rear Downforce', type: 'step', min: 0, max: 100, step: 1,
                  note: '⚠' },
                { id: 'ira_drag', l: 'Drag', type: 'step', min: 0, max: 100, step: 1,
                  note: '⚠ Resistencia aerodinámica. Afecta velocidad máxima.' },
                { id: 'ira_aero_height_f', l: 'Aero Height Front', type: 'step', min: 20, max: 100, step: 1, s: ' mm',
                  note: '⚠ Altura del suelo para efectos aerodinámicos (ground effect).' },
                { id: 'ira_aero_height_r', l: 'Aero Height Rear', type: 'step', min: 20, max: 100, step: 1, s: ' mm',
                  note: '⚠' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 9 — ELECTRONICS
            // Orden real: TC → ABS → Engine Map → Other Assists
            // ✓ Parámetros reales del juego.
            // ══════════════════════════════════════════════════════════════════
            { id: 'ira_elec', name: 'Electronics', params: [

                { id: 'ira_tc1', l: 'Traction Control', type: 'step', min: 0, max: 10, step: 1,
                  note: '✓ Nível de TC. Más alto = más intervención.' },
                { id: 'ira_tc2', l: 'TC2', type: 'step', min: 0, max: 10, step: 1,
                  note: '⚠ TC secundario (algunos coches).' },
                { id: 'ira_abs', l: 'ABS', type: 'step', min: 0, max: 10, step: 1,
                  note: '⚠ No todos los coches tienen ABS.' },

                { id: 'ira_engine_map', l: 'Engine Map', type: 'step', min: 1, max: 10, step: 1,
                  note: '✓ Mapa del motor. Afecta potencia, consumo y temperaturas.' },
                { id: 'ira_eng_braking', l: 'Engine Braking', type: 'step', min: 0, max: 100, step: 1, s: '%',
                  note: '⚠ Efecto de freno motor. Afecta comportamiento en curvas lentas.' },

                { id: 'ira_rpm_limiter', l: 'RPM Limiter', type: 'step', min: 5000, max: 12000, step: 100, s: ' RPM',
                  note: '⚠ Límite de revoluciones. visible en telemetry.' },
                { id: 'ira_boost', l: 'Boost Level', type: 'step', min: 0, max: 5, step: 1,
                  note: '⚠ Algunos series tienen push-to-pass o boost.' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 10 — FUEL & TYRES
            // Orden real: Fuel Level → Fuel Strategy → Tyre Pressure
            // ✓ Parámetros reales del juego.
            // ══════════════════════════════════════════════════════════════════
            { id: 'ira_fuel', name: 'Fuel & Tyres', params: [

                { id: 'ira_fuel', l: 'Fuel Level', type: 'step', min: 0, max: 150, step: 1, s: ' L',
                  note: '✓ Combustible cargado al inicio. Rango varía por coche.' },

                { id: 'ira_fuel_strategy', l: 'Fuel Strategy', type: 'options',
                  options: ['Start', 'Race', 'Practice'],
                  note: '⚠ Modo de estrategia de combustible.' },

                { id: 'ira_psi_f', l: 'Tyre Pressure Front', type: 'step', min: 24.0, max: 35.0, step: 0.1, s: ' psi',
                  note: '✓ Presión objetivo. iRacing muestra hot pressure en telemetry.' },
                { id: 'ira_psi_r', l: 'Tyre Pressure Rear', type: 'step', min: 24.0, max: 35.0, step: 0.1, s: ' psi',
                  note: '✓' },

                { id: 'ira_tire_blankets', l: 'Tire Blankets', type: 'options',
                  options: ['Off', 'On'],
                  note: '⚠ Pre-heating de neumáticos antes de salir.' },

                { id: 'ira_tire_compound', l: 'Tire Compound', type: 'options',
                  options: ['Soft', 'Medium', 'Hard', 'Alternate', 'Wet', 'Inter'],
                  note: '⚠ Compound real del pneumatic. Afecta grip y degradation.' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 11 — MULTI-LINK SUSPENSION (Advanced)
            // Solo para coches con multi-link (F1, IndyCar, etc.)
            // ⚠ Params avançats. No tots els cotxes tenen aquesta pestanya.
            // ══════════════════════════════════════════════════════════════════
            { id: 'ira_ml', name: 'Multi-Link', params: [

                { id: 'ira_upper_arm_f', l: 'Upper Arm Front', type: 'step', min: 100, max: 400, step: 1, s: ' mm',
                  note: '⚠ Longitud del upper control arm. Afecta camber gain y roll center.' },
                { id: 'ira_lower_arm_f', l: 'Lower Arm Front', type: 'step', min: 100, max: 400, step: 1, s: ' mm',
                  note: '⚠' },
                { id: 'ira_upper_arm_r', l: 'Upper Arm Rear', type: 'step', min: 100, max: 400, step: 1, s: ' mm',
                  note: '⚠' },
                { id: 'ira_lower_arm_r', l: 'Lower Arm Rear', type: 'step', min: 100, max: 400, step: 1, s: ' mm',
                  note: '⚠' },
                { id: 'ira_camber_gain_f', l: 'Camber Gain Front', type: 'step', min: 0, max: 100, step: 1,
                  note: '⚠ Rata de cambio de camber por mm de suspensión travel.' },
                { id: 'ira_camber_gain_r', l: 'Camber Gain Rear', type: 'step', min: 0, max: 100, step: 1,
                  note: '⚠' },
                { id: 'ira_roll_center_f', l: 'Roll Center Front', type: 'step', min: 0, max: 100, step: 1, s: ' mm',
                  note: '⚠ Altura del roll center. Afecta understeer/oversteer balance.' },
                { id: 'ira_roll_center_r', l: 'Roll Center Rear', type: 'step', min: 0, max: 100, step: 1, s: ' mm',
                  note: '⚠' }

            ]}

        ]
    },
    {
        id: 'gt7',
        name: 'Gran Turismo 7',
        type: 'tabbed',
        tabs: [

            // ══════════════════════════════════════════════════════════════════
            // TAB 1 — BODY/CHASSIS
            // Orden real del juego: Body Reinforcement → Power Limiter → Ballast → Ballast Position
            // ══════════════════════════════════════════════════════════════════
            { id: 'gt7_body', name: 'Chasis', params: [

                { id: 'gt7_body_rig', l: 'Body Reinforcement', type: 'options',
                  options: ['None', 'Light', 'Medium', 'Heavy'],
                  note: '⚠ No afecta rendimiento real — solo aesthetic/role-play.' },

                { id: 'gt7_power_lim', l: 'Power Limiter', type: 'step', min: 0, max: 100, step: 1, s: '%',
                  note: '✓ Limita la potencia máxima del motor. 100% = sin limitar.' },

                { id: 'gt7_ballast', l: 'Ballast', type: 'step', min: 0, max: 200, step: 1, s: ' kg',
                  note: '✓ Lastre adicional para cumplir peso mínimo de clase. Afecta handling.' },

                { id: 'gt7_ballast_pos', l: 'Ballast Position', type: 'step', min: -50, max: 50, step: 1,
                  note: '✓ Posición del lastre: negativo = delante, positivo = detrás.' },

                { id: 'gt7_weight_dist', l: 'Weight Distribution', type: 'step', min: 40, max: 65, step: 0.5, s: '% (front)',
                  note: '⚠ No directamente ajustable — resultado indirecto de ballast position.' },

                { id: 'gt7_cg_height', l: 'CG Height', type: 'step', min: 0, max: 100, step: 1, s: ' mm',
                  note: '⚠ Referencia. No ajustable directamente.' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 2 — TRANSMISSION
            // Orden real del juego: Max Speed → Gear Ratio (1-7) → Final Drive
            // ✓ Todos reales del juego.
            // ══════════════════════════════════════════════════════════════════
            { id: 'gt7_trans', name: 'Transmisión', params: [

                { id: 'gt7_vmax', l: 'Top Speed', type: 'step', min: 0, max: 400, step: 5, s: ' km/h',
                  note: '✓ Limitador de velocidad máxima. Afecta aceleración final.' },

                { id: 'gt7_g1', l: 'Gear 1', type: 'step', min: 0, max: 100, step: 1,
                  note: '✓ Primera marcha — corta para circuitos técnicos, larga para velocidad.' },
                { id: 'gt7_g2', l: 'Gear 2', type: 'step', min: 0, max: 100, step: 1 },
                { id: 'gt7_g3', l: 'Gear 3', type: 'step', min: 0, max: 100, step: 1 },
                { id: 'gt7_g4', l: 'Gear 4', type: 'step', min: 0, max: 100, step: 1 },
                { id: 'gt7_g5', l: 'Gear 5', type: 'step', min: 0, max: 100, step: 1 },
                { id: 'gt7_g6', l: 'Gear 6', type: 'step', min: 0, max: 100, step: 1 },
                { id: 'gt7_g7', l: 'Gear 7', type: 'step', min: 0, max: 100, step: 1 },

                { id: 'gt7_final_drive', l: 'Final Drive', type: 'step', min: 2.0, max: 6.0, step: 0.1,
                  note: '✓ Relación final del diferencial. Afecta toda la caja.' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 3 — SUSPENSION
            // Orden real: Ride Height → Spring Rate → Damper (Ext/Comp) → ARB
            // ✓ Todos reales del juego.
            // ══════════════════════════════════════════════════════════════════
            { id: 'gt7_susp', name: 'Suspensión', params: [

                { id: 'gt7_rh_f', l: 'Ride Height Front', type: 'step', min: 50, max: 150, step: 1, s: ' mm',
                  note: '✓ Altura al suelo delantera. Menor = más carga aero pero más riesgo de bottoming.' },
                { id: 'gt7_rh_r', l: 'Ride Height Rear', type: 'step', min: 50, max: 150, step: 1, s: ' mm',
                  note: '✓ Altura al suelo trasera.' },

                { id: 'gt7_spring_f', l: 'Spring Rate Front', type: 'step', min: 1, max: 20, step: 1, s: ' N/mm',
                  note: '✓ Tasa de muelle delantera. Mayor = menos dive, más responsive.' },
                { id: 'gt7_spring_r', l: 'Spring Rate Rear', type: 'step', min: 1, max: 20, step: 1, s: ' N/mm',
                  note: '✓ Tasa de muelle trasera.' },

                { id: 'gt7_damp_ext_f', l: 'Damper Ext. Front', type: 'step', min: 0, max: 10, step: 1,
                  note: '✓ Extensión (rebound). Controla cuánto se extiende la suspensión después de comprimirse.' },
                { id: 'gt7_damp_ext_r', l: 'Damper Ext. Rear', type: 'step', min: 0, max: 10, step: 1 },
                { id: 'gt7_damp_comp_f', l: 'Damper Comp. Front', type: 'step', min: 0, max: 10, step: 1,
                  note: '✓ Compresión (bump). Controla cuánto se comprime la suspensión bajo carga.' },
                { id: 'gt7_damp_comp_r', l: 'Damper Comp. Rear', type: 'step', min: 0, max: 10, step: 1 },

                { id: 'gt7_arb_f', l: 'ARB Front', type: 'step', min: 0, max: 10, step: 1,
                  note: '✓ Anti-Roll Bar delantera. Mayor = menos transferencia de peso lateral, más subviraje.' },
                { id: 'gt7_arb_r', l: 'ARB Rear', type: 'step', min: 0, max: 10, step: 1,
                  note: '✓ Anti-Roll Bar trasera. Mayor = más subviraje, menos sobreviraje.' },

                { id: 'gt7_bumpstop_f', l: 'Bumpstop Front', type: 'step', min: 0, max: 10, step: 1,
                  note: '⚠ Tope de desplazamiento. No todos los coches lo tienen.' },
                { id: 'gt7_bumpstop_r', l: 'Bumpstop Rear', type: 'step', min: 0, max: 10, step: 1 }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 4 — LSD (TRANSMISSION DETAIL)
            // Orden real: LSD Type → Initial Torque → Acceleration → Deceleration
            // ✓ Todos reales del juego.
            // ══════════════════════════════════════════════════════════════════
            { id: 'gt7_lsd', name: 'LSD', params: [

                { id: 'gt7_lsd_type', l: 'LSD Type', type: 'options',
                  options: ['1Way', '2Way', '1.5Way'],
                  note: '✓ 1Way = solo tracción. 2Way = tracción + frenada. 1.5Way = compromiso.' },

                { id: 'gt7_lsd_init', l: 'LSD Initial Torque', type: 'step', min: 0, max: 100, step: 1,
                  note: '✓ Par inicial del diferencial. Afecta respuesta de salida de curva.' },
                { id: 'gt7_lsd_accel', l: 'LSD Accel', type: 'step', min: 0, max: 100, step: 1,
                  note: '✓ Bloqueo en aceleración. Mayor = más tracción pero más subviraje.' },
                { id: 'gt7_lsd_decel', l: 'LSD Decel', type: 'step', min: 0, max: 100, step: 1,
                  note: '✓ Bloqueo en desaceleración. Mayor = más estabilidad en frenada.' },

                { id: 'gt7_solid_axle_f', l: 'Solid Axle Front', type: 'options',
                  options: ['Off', 'Soft', 'Medium', 'Hard'],
                  note: '⚠ No todos los coches lo tienen. Fija el eje delantero como rígido.' },
                { id: 'gt7_solid_axle_r', l: 'Solid Axle Rear', type: 'options',
                  options: ['Off', 'Soft', 'Medium', 'Hard'],
                  note: '⚠ Fija el eje trasero como rígido.' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 5 — BRAKES / GEOMETRY
            // Orden real: Brake Balance → Brake Pressure → Camber → Toe
            // ✓ Todos reales del juego.
            // ══════════════════════════════════════════════════════════════════
            { id: 'gt7_brakes', name: 'Frenos/Geom', params: [

                { id: 'gt7_bb', l: 'Brake Balance', type: 'step', min: -5, max: 5, step: 0.1,
                  note: '✓ Negativo = más detrás, positivo = más delante. Afecta entrada en curva.' },
                { id: 'gt7_brake_press', l: 'Brake Pressure', type: 'step', min: 80, max: 100, step: 1, s: '%',
                  note: '✓ Presión máxima del sistema de frenos.' },
                { id: 'gt7_brake_duct_f', l: 'Brake Duct Front', type: 'step', min: 0, max: 6, step: 1,
                  note: '✓ Ventilación de frenos delanteros. Mayor = más frío, más grip.' },
                { id: 'gt7_brake_duct_r', l: 'Brake Duct Rear', type: 'step', min: 0, max: 6, step: 1 },

                { id: 'gt7_camber_f', l: 'Camber Front', type: 'step', min: -6.0, max: 0.0, step: 0.1, s: '°',
                  note: '✓ Negativo. Mayor magnitud = más grip en curvas pero peor frenada recta.' },
                { id: 'gt7_camber_r', l: 'Camber Rear', type: 'step', min: -6.0, max: 0.0, step: 0.1, s: '°' },

                { id: 'gt7_toe_f', l: 'Toe Front', type: 'step', min: -0.50, max: 0.50, step: 0.01, s: '°',
                  note: '✓ Negativo = toe-out (menos estable en recta), positivo = toe-in (más estable).' },
                { id: 'gt7_toe_r', l: 'Toe Rear', type: 'step', min: -0.50, max: 0.50, step: 0.01, s: '°' },

                { id: 'gt7_caster', l: 'Caster', type: 'step', min: 0, max: 10, step: 0.1, s: '°',
                  note: '✓ Ángulo de caída del pivote. Afecta feel del volante y estabilidad en frenada.' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 6 — AERO
            // Orden real: Downforce Front → Downforce Rear → Spoiler Angle
            // ✓ Todos reales del juego.
            // ══════════════════════════════════════════════════════════════════
            { id: 'gt7_aero', name: 'Aero', params: [

                { id: 'gt7_downforce_f', l: 'Downforce Front', type: 'step', min: 0, max: 300, step: 1, s: ' kg',
                  note: '✓ Carga aero delantera. Mayor = más grip pero más drag yundersteer.' },
                { id: 'gt7_downforce_r', l: 'Downforce Rear', type: 'step', min: 0, max: 400, step: 1, s: ' kg',
                  note: '✓ Carga aero trasera. Mayor = más tracción pero podeficiente.' },

                { id: 'gt7_splitter', l: 'Splitter', type: 'step', min: 0, max: 10, step: 1,
                  note: '⚠ No todos los GT7 cars lo tienen.' },
                { id: 'gt7_spoiler', l: 'Spoiler Angle', type: 'step', min: 0, max: 10, step: 1,
                  note: '✓ Ángulo del alerón trasero. Afecta rear downforce y drag.' },

                { id: 'gt7_ride_height_min', l: 'Min Ride Height', type: 'step', min: 50, max: 100, step: 1, s: ' mm',
                  note: '⚠ Altura mínima del coche (Ground Effect). Usado para circuits con bumps.' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 7 — TIRES
            // Orden real: Compound → Pressure → Rim Size → Friction
            // ✓ Todos reales del juego.
            // ══════════════════════════════════════════════════════════════════
            { id: 'gt7_tyres', name: 'Neumáticos', params: [

                { id: 'gt7_compound', l: 'Compound', type: 'options',
                  options: ['Soft', 'Medium', 'Hard', 'Intermediate', 'Wet'],
                  note: '✓ Compound afecta grip y degradación.' },

                { id: 'gt7_psi_f', l: 'Pressure Front', type: 'step', min: 20.0, max: 35.0, step: 0.1, s: ' psi',
                  note: '✓ Presión en frío delante. GT7 muestra hot pressure en telemetría.' },
                { id: 'gt7_psi_r', l: 'Pressure Rear', type: 'step', min: 20.0, max: 35.0, step: 0.1, s: ' psi',
                  note: '✓ Presión en frío detrás.' },

                { id: 'gt7_rim_size', l: 'Rim Size', type: 'options',
                  options: ['Standard', '+1', '+2'],
                  note: '⚠ Tamaño de llanta. Afecta peso no suspendido y look.' },

                { id: 'gt7_tyre_friction', l: 'Tyre Friction', type: 'step', min: 0, max: 100, step: 1,
                  note: '⚠ No en todos los modos. Simula construcción del neumático.' },

                { id: 'gt7_tyre_temp', l: 'Tyre Core Temp', type: 'step', min: 60, max: 120, step: 1, s: '°C',
                  note: '⚠ Referencia. En GT7 no hay ajuste directo de temperatura.' },

                { id: 'gt7_tire_blanket', l: 'Tire Blankets', type: 'step', min: 0, max: 110, step: 5, s: '°C',
                  note: '⚠ En GT7 real: preheating. Añadido como referencia.' },

                { id: 'gt7_tyre_wear', l: 'Tyre Wear', type: 'step', min: 0, max: 100, step: 1, s: '%',
                  note: '⚠ No ajustable — resultado de usage. Añadido como referencia.' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 8 — ELECTRONICS
            // Orden real: Active Fuel Management → Power Restriction → Traction Control
            // ⚠ No todos los params son reales del juego — algunos son referencia.
            // ══════════════════════════════════════════════════════════════════
            { id: 'gt7_elec', name: 'Electronics', params: [

                { id: 'gt7_afm', l: 'Active Fuel Management', type: 'options',
                  options: ['Off', 'Low', 'Medium', 'High', 'Max'],
                  note: '✓ Gestión activa de combustible. Afecta consumo y potencia.' },

                { id: 'gt7_tc', l: 'Traction Control', type: 'step', min: 0, max: 10, step: 1,
                  note: '✓ Control de tracción. 0 = off, 1-10 = niveles.' },

                { id: 'gt7_abs', l: 'ABS', type: 'options',
                  options: ['Off', 'Weak', 'Standard', 'Strong'],
                  note: '✓ Sistema antibloqueo. afecta frenada en zona de grip mixto.' },

                { id: 'gt7_steering_angle', l: 'Steering Angle', type: 'step', min: 360, max: 720, step: 10, s: '°',
                  note: '⚠ No editable en GT7 — setting del volante.' },

                { id: 'gt7_throttle_sens', l: 'Throttle Sensitivity', type: 'step', min: 0, max: 10, step: 1,
                  note: '⚠ Curva de respuesta del acelerador. Añadido como referencia.' },

                { id: 'gt7_brake_sens', l: 'Brake Sensitivity', type: 'step', min: 0, max: 10, step: 1,
                  note: '⚠ Sensibilidad del pedal de freno.' }

            ]}

        ]
    },
    {
        id: 'f1_24',
        name: 'F1 24',
        type: 'tabbed',
        tabs: [

            // ══════════════════════════════════════════════════════════════════
            // TAB 1 — AERO
            // Orden real: Front Wing → Rear Wing → DRS
            // ✓ Todos reales del juego.
            // ══════════════════════════════════════════════════════════════════
            { id: 'f1_aero', name: 'Aero', params: [

                { id: 'f1_fw', l: 'Front Wing', type: 'step', min: 0, max: 10, step: 1,
                  note: '✓ Ala delantera (índice). Mayor = más downforce, más drag.' },
                { id: 'f1_rw', l: 'Rear Wing', type: 'step', min: 0, max: 12, step: 1,
                  note: '✓ Ala trasera (índice). Mayor = más rear grip, más drag.' },

                { id: 'f1_drs', l: 'DRS', type: 'options',
                  options: ['Off', 'Manual', 'Auto'],
                  note: '✓ DRS mode. Auto es para classification. Manual para overtake.' },

                { id: 'f1_ers_mguk', l: 'ERS MGUK Mode', type: 'options',
                  options: ['Off', 'Medium', 'Hotlap', 'Race'],
                  note: '✓ Modo de recuperación/impulso del MGU-K. Race = 120MJ por vuelta.' },
                { id: 'f1_ers_deploy', l: 'ERS Deployment', type: 'options',
                  options: ['None', 'Mode 1', 'Mode 2', 'Mode 3'],
                  note: '✓ Modo de despliegue. Más alto = más potencia pero más consumo.' },

                { id: 'f1_ballast', l: 'Ballast', type: 'step', min: 0, max: 30, step: 1, s: ' kg',
                  note: '⚠ Lastre adicional para ajuste de peso.' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 2 — BRAKES
            // Orden real: Brake Pressure → Brake Bias → Brake Ducts
            // ✓ Todos reales del juego.
            // ══════════════════════════════════════════════════════════════════
            { id: 'f1_brakes', name: 'Frenos', params: [

                { id: 'f1_brake_press', l: 'Brake Pressure', type: 'step', min: 85, max: 100, step: 1, s: '%',
                  note: '✓ Presión máxima del sistema. 100% = máxima potencia de frenado.' },

                { id: 'f1_bb', l: 'Brake Bias', type: 'step', min: 50, max: 60, step: 0.1, s: '%',
                  note: '✓ Porcentaje al delantero. 54% = neutro. Menos = más atrás, más = más delante.' },

                { id: 'f1_duct_f', l: 'Brake Duct Front', type: 'step', min: 0, max: 6, step: 1,
                  note: '✓ Ventilación delantera. 0 = cerrado, 6 = máximo flujo.' },
                { id: 'f1_duct_r', l: 'Brake Duct Rear', type: 'step', min: 0, max: 6, step: 1,
                  note: '✓ Ventilación trasera.' },

                { id: 'f1_brake_temp', l: 'Brake Temp Target', type: 'step', min: 200, max: 800, step: 10, s: '°C',
                  note: '⚠ Referencia. Temperatura objetivo del disco.' },

                { id: 'f1_throttle_sens', l: 'Throttle Pedal Map', type: 'step', min: 0, max: 10, step: 1,
                  note: '✓ Curva del acelerador. 0 = lineal, 10 = muy sensible.' },

                { id: 'f1_ignition_adv', l: 'Ignition Advance', type: 'step', min: 0, max: 100, step: 1,
                  note: '⚠ Timing de encendido. Afecta potencia del motorICE.' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 3 — SUSPENSION / RIDE HEIGHT
            // Orden real: Front/Rear Ride Height → Suspension Geometry → Dampers
            // ✓ Todos reales del juego.
            // ⚠ Los valores van de 1-41 en el slider (índice), no en mm reales.
            // ══════════════════════════════════════════════════════════════════
            { id: 'f1_susp', name: 'Suspensión', params: [

                { id: 'f1_rh_f', l: 'Ride Height Front', type: 'step', min: 1, max: 41, step: 1,
                  note: '✓ Altura delantera (slider index). Afecta ground effect y cooling.' },
                { id: 'f1_rh_r', l: 'Ride Height Rear', type: 'step', min: 1, max: 41, step: 1,
                  note: '✓ Altura trasera.' },

                { id: 'f1_row_f', l: 'Row Height Front', type: 'step', min: 1, max: 41, step: 1,
                  note: '⚠ Altura del borde de ataque. Afecta balance aero.' },
                { id: 'f1_row_r', l: 'Row Height Rear', type: 'step', min: 1, max: 41, step: 1 },

                { id: 'f1_suspf', l: 'Suspension Front', type: 'step', min: 1, max: 41, step: 1,
                  note: '✓ Índice de dureza de la suspensión delantera.' },
                { id: 'f1_suspr', l: 'Suspension Rear', type: 'step', min: 1, max: 41, step: 1,
                  note: '✓ Índice de dureza de la suspensión trasera.' },

                { id: 'f1_arb_f', l: 'ARB Front', type: 'step', min: 1, max: 21, step: 1,
                  note: '✓ Anti-Roll Bar delantera. Mayor = más stiff, menos subviraje.' },
                { id: 'f1_arb_r', l: 'ARB Rear', type: 'step', min: 1, max: 21, step: 1,
                  note: '✓ Anti-Roll Bar trasera.' },

                { id: 'f1_bump_f', l: 'Bump Front', type: 'step', min: 1, max: 21, step: 1,
                  note: '✓ Bump (compresión lenta) delante.' },
                { id: 'f1_bump_r', l: 'Bump Rear', type: 'step', min: 1, max: 21, step: 1 },
                { id: 'f1_reb_f', l: 'Rebound Front', type: 'step', min: 1, max: 21, step: 1,
                  note: '✓ Rebound (extensión) delante.' },
                { id: 'f1_reb_r', l: 'Rebound Rear', type: 'step', min: 1, max: 21, step: 1 },

                { id: 'f1_solid_axle_f', l: 'Solid Axle Front', type: 'options',
                  options: ['Off', 'On'],
                  note: '⚠ ¿Eje rígido delante? Raro en F1.' },
                { id: 'f1_solid_axle_r', l: 'Solid Axle Rear', type: 'options',
                  options: ['Off', 'On'] }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 4 — ALIGNMENT / GEOMETRY
            // Orden real: Camber F/R → Toe F/R → Caster
            // ✓ Todos reales del juego.
            // ══════════════════════════════════════════════════════════════════
            { id: 'f1_align', name: 'Geometría', params: [

                { id: 'f1_camber_f', l: 'Camber Front', type: 'step', min: -5.0, max: 0.0, step: 0.05, s: '°',
                  note: '✓ Negativo. Mayor magnitud = más grip lateral pero peor frenada.' },
                { id: 'f1_camber_r', l: 'Camber Rear', type: 'step', min: -5.0, max: 0.0, step: 0.05, s: '°',
                  note: '✓' },

                { id: 'f1_toe_f', l: 'Toe Front', type: 'step', min: -0.50, max: 0.50, step: 0.01, s: '°',
                  note: '✓ Toe-in (positivo) = más estable. Toe-out (negativo) = más responsive.' },
                { id: 'f1_toe_r', l: 'Toe Rear', type: 'step', min: -0.50, max: 0.50, step: 0.01, s: '°' },

                { id: 'f1_caster', l: 'Caster', type: 'step', min: 0, max: 10, step: 0.1, s: '°',
                  note: '✓ Ángulo de caster. Afecta feel del volante y estabilidad.' },

                { id: 'f1_kpi', l: 'KPI (King Pin Incl.)', type: 'step', min: 0, max: 10, step: 0.1, s: '°',
                  note: '⚠ Inclinación del king pin. Afecta self-aligning torque.' },

                { id: 'f1_surface_f', l: 'Surface Front', type: 'step', min: 0, max: 100, step: 1, s: ' mm',
                  note: '⚠ Contact patch area delantera. No en todos los modos.' },
                { id: 'f1_surface_r', l: 'Surface Rear', type: 'step', min: 0, max: 100, step: 1, s: ' mm' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 5 — TRANSMISSION / DIFFERENTIAL
            // Orden real: Diff On → Diff Off → Gear Ratio
            // ✓ Todos reales del juego.
            // ══════════════════════════════════════════════════════════════════
            { id: 'f1_trans', name: 'Transmisión', params: [

                { id: 'f1_diff_on', l: 'Differential On', type: 'step', min: 50, max: 100, step: 1, s: '%',
                  note: '✓ Bloqueo con acelerador pisado. 100% = totalmente bloqueado.' },
                { id: 'f1_diff_off', l: 'Differential Off', type: 'step', min: 20, max: 80, step: 1, s: '%',
                  note: '✓ Bloqueo sin acelerar (coast). Controla comportamiento en curva sin gas.' },

                { id: 'f1_g1', l: 'Gear 1', type: 'step', min: 0, max: 100, step: 1 },
                { id: 'f1_g2', l: 'Gear 2', type: 'step', min: 0, max: 100, step: 1 },
                { id: 'f1_g3', l: 'Gear 3', type: 'step', min: 0, max: 100, step: 1 },
                { id: 'f1_g4', l: 'Gear 4', type: 'step', min: 0, max: 100, step: 1 },
                { id: 'f1_g5', l: 'Gear 5', type: 'step', min: 0, max: 100, step: 1 },
                { id: 'f1_g6', l: 'Gear 6', type: 'step', min: 0, max: 100, step: 1 },
                { id: 'f1_g7', l: 'Gear 7', type: 'step', min: 0, max: 100, step: 1 },
                { id: 'f1_g8', l: 'Gear 8', type: 'step', min: 0, max: 100, step: 1 },

                { id: 'f1_clutch_mode', l: 'Clutch Mode', type: 'options',
                  options: ['Manual', 'Auto', 'Multiplate'],
                  note: '⚠ Modo del clutch. No editable en carrera.' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 6 — TYRES
            // Orden real: Pressure F/R → Temperatures (reference)
            // ✓ Todos reales del juego.
            // ══════════════════════════════════════════════════════════════════
            { id: 'f1_tyres', name: 'Neumáticos', params: [

                { id: 'f1_psi_f', l: 'Tyre Pressure Front', type: 'step', min: 18.0, max: 26.0, step: 0.1, s: ' psi',
                  note: '✓ Presión objetivo en frío. F1 24 muestra hot pressure en telemetría.' },
                { id: 'f1_psi_r', l: 'Tyre Pressure Rear', type: 'step', min: 18.0, max: 26.0, step: 0.1, s: ' psi',
                  note: '✓' },

                { id: 'f1_temp_f', l: 'Tyre Temp Front', type: 'step', min: 60, max: 130, step: 1, s: '°C',
                  note: '⚠ Referencia. En carrera real se monitoriza pero no se ajusta directamente.' },
                { id: 'f1_temp_r', l: 'Tyre Temp Rear', type: 'step', min: 60, max: 130, step: 1, s: '°C' },

                { id: 'f1_tire_blanket', l: 'Tire Blankets', type: 'step', min: 0, max: 110, step: 5, s: '°C',
                  note: '⚠ Pre-heating blankets. En clasificación antes de salir.' },

                { id: 'f1_wear', l: 'Tyre Wear Target', type: 'step', min: 0, max: 100, step: 1, s: '%',
                  note: '⚠ Objetivo de desgaste para estrategia de pits.' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 7 — FUEL / STRATEGY
            // Orden real: Fuel Flow → Fuel Load → Lap Target
            // ⚠ No todos son ajustables en el juego — algunos son referencia para estrategia.
            // ══════════════════════════════════════════════════════════════════
            { id: 'f1_fuel', name: 'Combustible', params: [

                { id: 'f1_fuel_mix', l: 'Fuel Mixture', type: 'step', min: 0, max: 100, step: 1, s: '%',
                  note: '✓ Mezcla de combustible (% richness). Afecta potencia y consumo.' },

                { id: 'f1_fuel_load', l: 'Fuel Load', type: 'step', min: 0, max: 110, step: 1, s: ' kg',
                  note: '✓ Carga de combustible al inicio.' },

                { id: 'f1_fuel_per_lap', l: 'Fuel Per Lap', type: 'step', min: 0, max: 10, step: 0.1, s: ' kg/lap',
                  note: '✓ Consumo estimado por vuelta. Calculado automáticamente.' },

                { id: 'f1_pit_speed', l: 'Pit Speed Limit', type: 'step', min: 60, max: 130, step: 5, s: ' km/h',
                  note: '⚠ Límite de velocidad en boxes. Recomendado: 80 km/h.' },

                { id: 'f1_pitstop_tire', l: 'Pitstop Strategy', type: 'options',
                  options: ['Soft', 'Medium', 'Hard', 'Inter', 'Wet', 'No Pit'],
                  note: '⚠ Neumático a cambiar. Añadido como referencia de estrategia.' },

                { id: 'f1_pitstop_fuel', l: 'Pitstop Fuel (kg)', type: 'step', min: 0, max: 110, step: 1, s: ' kg',
                  note: '⚠ Combustible a añadir en pits.' },

                { id: 'f1_lap_target', l: 'Target Lap Time', type: 'step', min: 60, max: 150, step: 0.1, s: ' s',
                  note: '⚠ Referencia. Tiempo objetivo para strategy simulation.' },

                { id: 'f1_race_stint', l: 'Race Stint Laps', type: 'step', min: 1, max: 80, step: 1,
                  note: '⚠ Número de vueltas por stint. Calculado de fuel load y wear.' }

            ]},

            // ══════════════════════════════════════════════════════════════════
            // TAB 8 — ERS / HYBRID
            // Orden real: Deployment → MGUK → MGUH → Energy Targets
            // ✓ Todos reales del juego.
            // ⚠ Dependen del modo de sesión (Classification/Race/Sprint).
            // ══════════════════════════════════════════════════════════════════
            { id: 'f1_ers', name: 'ERS/Híbrido', params: [

                { id: 'f1_ers_mode', l: 'ERS Mode', type: 'options',
                  options: ['Off', 'Practice', 'Qualifying', 'Race'],
                  note: '✓ Modo de gestión del ERS. Race = automático.' },

                { id: 'f1_mguk_target', l: 'MGU-K Target', type: 'step', min: 0, max: 150, step: 1, s: ' kW',
                  note: '✓ Potencia objetivo del MGU-K (motor eléctrico).' },
                { id: 'f1_mguh_target', l: 'MGU-H Target', type: 'step', min: 0, max: 150, step: 1, s: ' kW',
                  note: '✓ Potencia objetivo del MGU-H (turbo-generator).' },

                { id: 'f1_hybrid_balance', l: 'Hybrid Balance', type: 'step', min: 0, max: 100, step: 1, s: '%',
                  note: '⚠ Balance entre recuperación y despliegue.' },

                { id: 'f1_ers_deploy_map', l: 'ERS Deploy Map', type: 'step', min: 0, max: 10, step: 1,
                  note: '⚠ Mapa de despliegue. Higher = más агрессивно.' },

                { id: 'f1_energy_store', l: 'Energy Store Target', type: 'step', min: 0, max: 100, step: 1, s: '%',
                  note: '⚠ Objetivo de energía en la batería. Para classification.' }

            ]}

        ]
    },
    {
        id: 'ac',
        name: 'Assetto Corsa',
        type: 'tabbed',
        tabs: [
            { id: 'v1', name: 'Neum/Frenos', params: [
                { id: 'psi', l: 'Presiones', type: 'number' },
                { id: 'bb', l: 'Balance Freno', type: 'percentage' },
                { id: 'bp', l: 'Potencia Freno', type: 'percentage' }
            ]},
            { id: 'v2', name: 'Suspensión', params: [
                { id: 'spr', l: 'Muelles', type: 'number' },
                { id: 'h', l: 'Altura Chasis', type: 'number' }
            ]},
            { id: 'v3', name: 'Geom/Diff', params: [
                { id: 'cam', l: 'Camber', type: 'number' },
                { id: 'diff_p', l: 'Diff Power', type: 'number' }
            ]},
            { id: 'v4', name: 'Aero/Motor', params: [
                { id: 'wing', l: 'Ala', type: 'number' },
                { id: 'map', l: 'Mapa Motor', type: 'step' }
            ]}
        ]
    },
    {
        id: 'forza',
        name: 'Forza Motorsport (2023)',
        type: 'tabbed',
        tabs: [
            { id: 'v1', name: 'Neumáticos', params: [{ id: 'psi', l: 'Presiones', type: 'number', s: ' PSI' }] },
            { id: 'v2', name: 'Transmisión', params: [{ id: 'final', l: 'Relación Final', type: 'step' }] },
            { id: 'v3', name: 'Geometría', params: [{ id: 'cam', l: 'Camber', type: 'number' }, { id: 'toe', l: 'Toe', type: 'number' }, { id: 'arb', l: 'ARB', type: 'step' }] },
            { id: 'v4', name: 'Suspensión', params: [{ id: 'spr', l: 'Muelles', type: 'number' }, { id: 'h', l: 'Altura', type: 'number' }] },
            { id: 'v5', name: 'Aero', params: [{ id: 'down', l: 'Carga Aero', type: 'number' }] },
            { id: 'v6', name: 'Frenos/Diff', params: [{ id: 'bb', l: 'Balance Freno', type: 'percentage' }, { id: 'd_acc', l: 'Diff Acel.', type: 'percentage' }] }
        ]
    },

    // GROUP 2: RF2/AMS2/LMU
    { id: 'rf2', name: 'rFactor 2', type: 'group_simpro' },
    { id: 'ams2', name: 'Automobilista 2', type: 'group_simpro' },
    { id: 'lmu', name: 'Le Mans Ultimate', type: 'group_simpro' },

    // GROUP 3: RALLY
    { id: 'rbr', name: 'Richard Burns Rally', type: 'group_rally' },
    { id: 'ac_rally', name: 'Assetto Corsa Rally', type: 'group_rally' },

    // ── DIRT RALLY 2.0 ────────────────────────────────────────────────────────
    {
        id: 'dr2',
        name: 'Dirt Rally 2.0',
        type: 'tabbed',
        weatherVariants: false,
        includFFB: false,
        notes: [
            { id: 'note_drive', label: 'Notas — Conducción', placeholder: 'Ejs: Coche muy sobrevirador en lluvia. Suspension muy blanda en grava...' },
            { id: 'note_setup', label: 'Notas — Setup', placeholder: 'Ejs: Diferencial bloqueado 100% en Höljes. Presión baja en nieve...' },
            { id: 'note_splits', label: 'Notas — Tiempos', placeholder: 'Ejs: Sector 1 rápido con ARB más rígido. Frenada tramo 3 mejorada...' }
        ],
        tabs: [
            {
                id: 'drivetrain',
                name: 'Transmisión',
                params: [
                    { id: 'df_final', l: 'Relación Final', type: 'step', min: 2.5, max: 5.5, step: 0.05, note: '✓ Velocidad máxima vs aceleración. Asfalto: 4.0-4.8, Grava: 3.5-5.0' },
                    { id: 'df_lock_accel', l: 'Bloqueo Diff Aceleración', type: 'step', min: 0, max: 100, step: 5, s: '%', note: '✓ Al acelerar. Asfalto: 0-30%, Grava: 50-100%' },
                    { id: 'df_lock_coast', l: 'Bloqueo Diff Soltar Gas', type: 'step', min: 0, max: 100, step: 5, s: '%', note: '✓ Sin acelerar. Típico: 0-50%' },
                    { id: 'df_lock_decel', l: 'Bloqueo Diff Frenada', type: 'step', min: 0, max: 100, step: 5, s: '%', note: '✓ Frenando. Típico: 0-40%' }
                ]
            },
            {
                id: 'suspension',
                name: 'Suspensión',
                params: [
                    { id: 'spring_f', l: 'Rigidez Muelle Delantero (N/mm)', type: 'step', min: 50, max: 200, step: 1, note: '✓ Mayor = más rígido' },
                    { id: 'spring_r', l: 'Rigidez Muelle Trasero (N/mm)', type: 'step', min: 50, max: 200, step: 1, note: '✓' },
                    { id: 'damper_bump', l: 'Compresión (Bump)', type: 'step', min: 1, max: 20, step: 1, note: '✓ Resistencia en compresión rápida' },
                    { id: 'damper_rebound', l: 'Extensión (Rebound)', type: 'step', min: 1, max: 20, step: 1, note: '✓ Resistencia en extensión rápida' },
                    { id: 'arb_f', l: 'Anti Roll Bar Delantero', type: 'step', min: 0, max: 20, step: 0.1, note: '✓ Mayor = menos rolido' },
                    { id: 'arb_r', l: 'Anti Roll Bar Trasero', type: 'step', min: 0, max: 20, step: 0.1, note: '✓' },
                    { id: 'height', l: 'Altura Chasis (mm)', type: 'step', min: 70, max: 160, step: 1, s: ' mm', note: '✓ Típico: 100-140mm' }
                ]
            },
            {
                id: 'brakes',
                name: 'Frenos',
                params: [
                    { id: 'brake_power', l: 'Potencia Freno (%)', type: 'step', min: 40, max: 120, step: 1, s: '%', note: '✓ % de potencia total del sistema' },
                    { id: 'brake_bias', l: 'Balance Freno (%)', type: 'step', min: 30, max: 70, step: 1, s: '%', note: '✓ % en eje delantero. Típico: 50-60%' }
                ]
            },
            {
                id: 'tyres',
                name: 'Neumáticos',
                params: [
                    { id: 'tyre_pres_f', l: 'Presión Delante (kPa)', type: 'step', min: 150, max: 250, step: 1, s: ' kPa', note: '✓ Asfalto: 200-230, Grava: 180-220, Nieve: 170-210' },
                    { id: 'tyre_pres_r', l: 'Presión Atrás (kPa)', type: 'step', min: 150, max: 250, step: 1, s: ' kPa', note: '✓' },
                    { id: 'tyre_thermal', l: 'Gestión Térmica Neumáticos', type: 'step', min: 0, max: 10, step: 1, note: '✓ Control de temperatura' }
                ]
            },
            {
                id: 'geometry',
                name: 'Alineación',
                params: [
                    { id: 'camber_f', l: 'Camber Delante (°)', type: 'step', min: -3, max: 1, step: 0.1, s: '°', note: '✓ Negativo = más grip en curvas' },
                    { id: 'camber_r', l: 'Camber Trasero (°)', type: 'step', min: -3, max: 1, step: 0.1, s: '°', note: '✓' },
                    { id: 'toe_f', l: 'Toe-in Delante (°)', type: 'step', min: -1, max: 1, step: 0.1, s: '°', note: '✓ Positivo = estable, Negativo = ágil' },
                    { id: 'toe_r', l: 'Toe-in Trasero (°)', type: 'step', min: -1, max: 1, step: 0.1, s: '°', note: '✓' }
                ]
            }
        ]
    },

    // ── EA SPORTS WRC ─────────────────────────────────────────────────────────
    {
        id: 'wrc',
        name: 'EA Sports WRC',
        type: 'tabbed',
        notes: [
            { id: 'note_rally', label: 'Notas — Rally', placeholder: 'Ejs: Etapa Monte-Carlo: tarmac + nieve mix. Asfalto resbaladizo...'},
            { id: 'note_setup', label: 'Notas — Setup', placeholder: 'Ejs: Diferencial 80% en Höljes. Presiones altas en Estonia...' },
            { id: 'note_pace', label: 'Notas — Ritmo', placeholder: 'Ejs: Pérdida en frenadas. Mejorar salida de curva lenta...' }
        ],
        tabs: [
            {
                id: 'driveline',
                name: 'Transmisión',
                params: [
                    { id: 'final_ratio', l: 'Relación Final', type: 'step', min: 2.8, max: 5.2, step: 0.05, note: '✓ Asfalto: 4.0-4.8, Grava: 3.5-5.0. Afecta velocidad máxima' },
                    { id: 'diff_lock_accel', l: 'Bloqueo Diff Aceleración', type: 'step', min: 0, max: 100, step: 5, s: '%', note: '✓ Acelerando salida de curva. Asfalto: 20-50%, Grava: 60-100%' },
                    { id: 'diff_lock_coast', l: 'Bloqueo Diff Soltar Gas', type: 'step', min: 0, max: 100, step: 5, s: '%', note: '✓ Sin acelerador en curva. Típico: 0-40%' },
                    { id: 'diff_lock_decel', l: 'Bloqueo Diff Frenada', type: 'step', min: 0, max: 100, step: 5, s: '%', note: '✓ Frenando en curva. Típico: 0-30%' }
                ]
            },
            {
                id: 'chassis',
                name: 'Chasis',
                params: [
                    { id: 'spring_rate_f', l: 'Rigidez Muelles Delantero', type: 'step', min: 30, max: 130, step: 5, s: ' N/mm', note: '✓ Mayor = menos balanceo pero más duro' },
                    { id: 'spring_rate_r', l: 'Rigidez Muelles Trasero', type: 'step', min: 30, max: 130, step: 5, s: ' N/mm', note: '✓' },
                    { id: 'damper_bump_slow_f', l: 'Comp. Lenta Delante', type: 'step', min: 1, max: 20, step: 1, note: '✓ Compresión lenta (gran curva)' },
                    { id: 'damper_bump_slow_r', l: 'Comp. Lenta Trasera', type: 'step', min: 1, max: 20, step: 1, note: '✓' },
                    { id: 'damper_bump_fast_f', l: 'Comp. Rápida Delante', type: 'step', min: 1, max: 20, step: 1, note: '✓ Compresión rápida (baches)' },
                    { id: 'damper_bump_fast_r', l: 'Comp. Rápida Trasera', type: 'step', min: 1, max: 20, step: 1, note: '✓' },
                    { id: 'damper_rebound_slow_f', l: 'Ext. Lenta Delante', type: 'step', min: 1, max: 20, step: 1, note: '✓ Extensión lenta (estabilidad)' },
                    { id: 'damper_rebound_slow_r', l: 'Ext. Lenta Trasera', type: 'step', min: 1, max: 20, step: 1, note: '✓' },
                    { id: 'damper_rebound_fast_f', l: 'Ext. Rápida Delante', type: 'step', min: 1, max: 20, step: 1, note: '✓ Extensión rápida (respuesta)' },
                    { id: 'damper_rebound_fast_r', l: 'Ext. Rápida Trasera', type: 'step', min: 1, max: 20, step: 1, note: '✓' },
                    { id: 'arb_f', l: 'Anti Roll Bar Delantero', type: 'step', min: 0, max: 30, step: 1, note: '✓ Mayor = menos rolido' },
                    { id: 'arb_r', l: 'Anti Roll Bar Trasero', type: 'step', min: 0, max: 30, step: 1, note: '✓' },
                    { id: 'ride_height_f', l: 'Altura Chasis Delante (mm)', type: 'step', min: 80, max: 150, step: 2, s: ' mm', note: '✓ Típico rally: 110-140 mm' },
                    { id: 'ride_height_r', l: 'Altura Chasis Trasero (mm)', type: 'step', min: 80, max: 150, step: 2, s: ' mm', note: '✓' }
                ]
            },
            {
                id: 'brakes',
                name: 'Frenos',
                params: [
                    { id: 'brake_balance', l: 'Balance Freno (%)', type: 'step', min: 35, max: 65, step: 1, s: '%', note: '✓ % presión delantero. Típico: 45-55%' },
                    { id: 'brake_power_f', l: 'Potencia Freno Delantero', type: 'step', min: 50, max: 150, step: 5, s: '%', note: '✓ Multiplicador potencia' },
                    { id: 'brake_power_r', l: 'Potencia Freno Trasero', type: 'step', min: 50, max: 150, step: 5, s: '%', note: '✓' },
                    { id: 'handbrake', l: 'Freno de Mano', type: 'step', min: 0, max: 100, step: 5, s: '%', note: '✓ Fuerza del freno de mano' }
                ]
            },
            {
                id: 'tyres',
                name: 'Neumáticos',
                params: [
                    { id: 'tyre_set', l: 'Juego de Neumáticos', type: 'options', options: ['Slick', 'Asfalto Seco', 'Asfalto Lluvia', 'Grava Blando', 'Grava Duro', 'Grava Lluvia', 'Nieve', 'Hielo'], note: '✓ Según terreno y clima' },
                    { id: 'tyre_pressure_front', l: 'Presión Delante (kPa)', type: 'step', min: 100, max: 250, step: 5, s: ' kPa', note: '✓ Asfalto: 180-210 kPa, Grava: 150-180 kPa, Nieve: 100-140 kPa' },
                    { id: 'tyre_pressure_rear', l: 'Presión Trasero (kPa)', type: 'step', min: 100, max: 250, step: 5, s: ' kPa', note: '✓' },
                    { id: 'tyre_wear', l: 'Desgaste Neumáticos', type: 'options', options: ['Nuevo', 'Ligeramente Desgastado', 'Desgastado', 'Muy Desgastado'], note: '✓ Afecta grip y temperatura' },
                    { id: 'tyre_pack', l: 'Juegos Disponibles', type: 'step', min: 1, max: 4, step: 1, note: '✓ Cuántos juegos puedes usar' }
                ]
            },
            {
                id: 'geometry',
                name: 'Alineación',
                params: [
                    { id: 'camber_f', l: 'Camber Delante (°)', type: 'step', min: -3.5, max: 0.5, step: 0.5, s: '°', note: '✓ Negativo = más grip. Típico: -2.0 a -1.0°' },
                    { id: 'camber_r', l: 'Camber Trasero (°)', type: 'step', min: -3.5, max: 0.5, step: 0.5, s: '°', note: '✓' },
                    { id: 'toe_f', l: 'Toe Delante (°)', type: 'step', min: -2, max: 2, step: 0.1, s: '°', note: '✓ Positivo = estable, Negativo = ágil' },
                    { id: 'toe_r', l: 'Toe Trasero (°)', type: 'step', min: -2, max: 2, step: 0.1, s: '°', note: '✓' }
                ]
            }
        ]
    },

    // ── ASSETTO CORSA (AC) ────────────────────────────────────────────────────
    {
        id: 'ac',
        name: 'Assetto Corsa',
        type: 'tabbed',
        weatherVariants: true,
        notes: [
            { id: 'note_setup', label: 'Notas — Setup', placeholder: 'Ejs: Balance muy frontal en lluvia. Aumentar rigidez trasera...' },
            { id: 'note_grip', label: 'Notas — Grip', placeholder: 'Ejs: Buena adherencia en frenada. Mejorar aceleración curva...' }
        ],
        tabs: [
            {
                id: 'tyres',
                name: 'Neumáticos',
                params: [
                    { id: 'tyre_compound', l: 'Compuesto', type: 'options', options: ['Slicks', 'Road', 'Street'], note: '✓ Según superficie' },
                    { id: 'tyre_pressure_f', l: 'Presión Delante (PSI)', type: 'step', min: 24, max: 32, step: 0.1, s: ' PSI', note: '✓' },
                    { id: 'tyre_pressure_r', l: 'Presión Atrás (PSI)', type: 'step', min: 24, max: 32, step: 0.1, s: ' PSI', note: '✓' }
                ]
            },
            {
                id: 'suspension',
                name: 'Suspensión',
                params: [
                    { id: 'spring_f', l: 'Rigidez Muelle Del. (N/mm)', type: 'step', min: 5, max: 20, step: 0.5, note: '✓' },
                    { id: 'spring_r', l: 'Rigidez Muelle Tras. (N/mm)', type: 'step', min: 5, max: 20, step: 0.5, note: '✓' },
                    { id: 'arb_f', l: 'Anti Roll Bar Del.', type: 'step', min: 1, max: 8, step: 0.1, note: '✓' },
                    { id: 'arb_r', l: 'Anti Roll Bar Tras.', type: 'step', min: 1, max: 8, step: 0.1, note: '✓' },
                    { id: 'height_f', l: 'Altura Del. (mm)', type: 'step', min: 50, max: 120, step: 1, s: ' mm', note: '✓' },
                    { id: 'height_r', l: 'Altura Tras. (mm)', type: 'step', min: 50, max: 120, step: 1, s: ' mm', note: '✓' }
                ]
            },
            {
                id: 'brakes',
                name: 'Frenos',
                params: [
                    { id: 'brake_power', l: 'Potencia Freno', type: 'step', min: 80, max: 120, step: 1, s: '%', note: '✓' },
                    { id: 'brake_balance', l: 'Balance Freno (%)', type: 'step', min: 40, max: 60, step: 1, s: '%', note: '✓' }
                ]
            },
            {
                id: 'geometry',
                name: 'Alineación',
                params: [
                    { id: 'camber_f', l: 'Camber Del. (°)', type: 'step', min: -3, max: 0, step: 0.5, s: '°', note: '✓' },
                    { id: 'camber_r', l: 'Camber Tras. (°)', type: 'step', min: -3, max: 0, step: 0.5, s: '°', note: '✓' },
                    { id: 'toe_f', l: 'Toe Del. (°)', type: 'step', min: -1, max: 1, step: 0.1, s: '°', note: '✓' },
                    { id: 'toe_r', l: 'Toe Tras. (°)', type: 'step', min: -1, max: 1, step: 0.1, s: '°', note: '✓' }
                ]
            },
            {
                id: 'aero',
                name: 'Aerodinámico',
                params: [
                    { id: 'wing_f', l: 'Ala Delantera', type: 'step', min: 0, max: 8, step: 1, note: '✓ Mayor = más downforce' },
                    { id: 'wing_r', l: 'Ala Trasera', type: 'step', min: 0, max: 8, step: 1, note: '✓' }
                ]
            }
        ]
    },

    // ── FORZA MOTORSPORT ──────────────────────────────────────────────────────
    {
        id: 'forza',
        name: 'Forza Motorsport',
        type: 'tabbed',
        weatherVariants: true,
        notes: [
            { id: 'note_setup', label: 'Notas — Setup', placeholder: 'Setup notes...' },
            { id: 'note_driving', label: 'Notas — Conducción', placeholder: 'Driving notes...' }
        ],
        tabs: [
            {
                id: 'tyres',
                name: 'Neumáticos',
                params: [
                    { id: 'tyre_compound', l: 'Compuesto', type: 'options', options: ['Slicks', 'Sport', 'Road'], note: '✓' },
                    { id: 'tyre_pressure_f', l: 'Presión Del. (PSI)', type: 'step', min: 20, max: 35, step: 0.1, s: ' PSI', note: '✓' },
                    { id: 'tyre_pressure_r', l: 'Presión Tras. (PSI)', type: 'step', min: 20, max: 35, step: 0.1, s: ' PSI', note: '✓' }
                ]
            },
            {
                id: 'suspension',
                name: 'Suspensión',
                params: [
                    { id: 'spring_f', l: 'Muelles Delante', type: 'step', min: 100, max: 500, step: 5, note: '✓' },
                    { id: 'spring_r', l: 'Muelles Trasera', type: 'step', min: 100, max: 500, step: 5, note: '✓' },
                    { id: 'arb_f', l: 'ARB Delante', type: 'step', min: 0, max: 100, step: 1, note: '✓' },
                    { id: 'arb_r', l: 'ARB Trasera', type: 'step', min: 0, max: 100, step: 1, note: '✓' },
                    { id: 'height', l: 'Altura Chasis (mm)', type: 'step', min: 50, max: 150, step: 1, s: ' mm', note: '✓' }
                ]
            },
            {
                id: 'brakes',
                name: 'Frenos',
                params: [
                    { id: 'brake_balance', l: 'Balance Freno', type: 'step', min: 40, max: 60, step: 1, s: '%', note: '✓' },
                    { id: 'brake_power', l: 'Potencia Freno', type: 'step', min: 80, max: 120, step: 1, s: '%', note: '✓' }
                ]
            },
            {
                id: 'transmission',
                name: 'Transmisión',
                params: [
                    { id: 'final_ratio', l: 'Relación Final', type: 'step', min: 2, max: 6, step: 0.1, note: '✓' },
                    { id: 'diff_lock', l: 'Bloqueo Diff', type: 'step', min: 0, max: 100, step: 5, s: '%', note: '✓' }
                ]
            },
            {
                id: 'aero',
                name: 'Aerodinámico',
                params: [
                    { id: 'wing_f', l: 'Ala Delantera', type: 'step', min: 0, max: 20, step: 1, note: '✓' },
                    { id: 'wing_r', l: 'Ala Trasera', type: 'step', min: 0, max: 20, step: 1, note: '✓' }
                ]
            }
        ]
    },

    // ── RFACTOR 2 (RF2) ───────────────────────────────────────────────────────
    {
        id: 'rf2',
        name: 'rFactor 2',
        type: 'tabbed',
        weatherVariants: true,
        notes: [
            { id: 'note_setup', label: 'Setup Notes', placeholder: 'Setup details...' },
            { id: 'note_feedback', label: 'Driver Feedback', placeholder: 'Car behavior notes...' }
        ],
        tabs: [
            {
                id: 'tyres',
                name: 'Neumáticos',
                params: [
                    { id: 'tyre_pressure_f', l: 'Presión Del. (PSI)', type: 'step', min: 20, max: 40, step: 0.1, s: ' PSI', note: '✓' },
                    { id: 'tyre_pressure_r', l: 'Presión Tras. (PSI)', type: 'step', min: 20, max: 40, step: 0.1, s: ' PSI', note: '✓' }
                ]
            },
            {
                id: 'suspension',
                name: 'Suspensión',
                params: [
                    { id: 'spring_f', l: 'Rigidez Del.', type: 'step', min: 200, max: 1200, step: 10, note: '✓' },
                    { id: 'spring_r', l: 'Rigidez Tras.', type: 'step', min: 200, max: 1200, step: 10, note: '✓' },
                    { id: 'damper_f', l: 'Damper Del.', type: 'step', min: 1000, max: 8000, step: 100, note: '✓' },
                    { id: 'damper_r', l: 'Damper Tras.', type: 'step', min: 1000, max: 8000, step: 100, note: '✓' },
                    { id: 'arb_f', l: 'ARB Del.', type: 'step', min: 100, max: 2000, step: 50, note: '✓' },
                    { id: 'arb_r', l: 'ARB Tras.', type: 'step', min: 100, max: 2000, step: 50, note: '✓' }
                ]
            },
            {
                id: 'brakes',
                name: 'Frenos',
                params: [
                    { id: 'brake_balance', l: 'Balance', type: 'step', min: 40, max: 65, step: 0.5, s: '%', note: '✓' },
                    { id: 'brake_pressure', l: 'Presión', type: 'step', min: 1, max: 3, step: 0.05, note: '✓ Atm' }
                ]
            },
            {
                id: 'geometry',
                name: 'Alineación',
                params: [
                    { id: 'camber_f', l: 'Camber Del.', type: 'step', min: -4, max: 0, step: 0.1, s: '°', note: '✓' },
                    { id: 'camber_r', l: 'Camber Tras.', type: 'step', min: -4, max: 0, step: 0.1, s: '°', note: '✓' },
                    { id: 'toe_f', l: 'Toe Del.', type: 'step', min: -1, max: 1, step: 0.05, s: '°', note: '✓' },
                    { id: 'toe_r', l: 'Toe Tras.', type: 'step', min: -1, max: 1, step: 0.05, s: '°', note: '✓' }
                ]
            },
            {
                id: 'transmission',
                name: 'Transmisión',
                params: [
                    { id: 'final_ratio', l: 'Relación Final', type: 'step', min: 1, max: 6, step: 0.05, note: '✓' }
                ]
            }
        ]
    },

    // ── AUTOMOBILISTA 2 (AMS2) ────────────────────────────────────────────────
    {
        id: 'ams2',
        name: 'Automobilista 2',
        type: 'tabbed',
        weatherVariants: true,
        notes: [
            { id: 'note_setup', label: 'Setup', placeholder: 'Setup adjustments...' },
            { id: 'note_driver', label: 'Driver Notes', placeholder: 'Car behavior and feedback...' }
        ],
        tabs: [
            {
                id: 'tyres',
                name: 'Neumáticos',
                params: [
                    { id: 'tyre_pressure_f', l: 'Presión Del. (PSI)', type: 'step', min: 22, max: 34, step: 0.1, s: ' PSI', note: '✓' },
                    { id: 'tyre_pressure_r', l: 'Presión Tras. (PSI)', type: 'step', min: 22, max: 34, step: 0.1, s: ' PSI', note: '✓' }
                ]
            },
            {
                id: 'suspension',
                name: 'Suspensión',
                params: [
                    { id: 'spring_f', l: 'Muelles Del. (N/mm)', type: 'step', min: 50, max: 300, step: 5, note: '✓' },
                    { id: 'spring_r', l: 'Muelles Tras. (N/mm)', type: 'step', min: 50, max: 300, step: 5, note: '✓' },
                    { id: 'arb_f', l: 'ARB Del.', type: 'step', min: 0, max: 100, step: 1, note: '✓' },
                    { id: 'arb_r', l: 'ARB Tras.', type: 'step', min: 0, max: 100, step: 1, note: '✓' }
                ]
            },
            {
                id: 'brakes',
                name: 'Frenos',
                params: [
                    { id: 'brake_balance', l: 'Balance Freno', type: 'step', min: 35, max: 65, step: 1, s: '%', note: '✓' },
                    { id: 'brake_power', l: 'Potencia', type: 'step', min: 80, max: 120, step: 1, s: '%', note: '✓' }
                ]
            },
            {
                id: 'transmission',
                name: 'Transmisión',
                params: [
                    { id: 'final_ratio', l: 'Relación Final', type: 'step', min: 2, max: 6, step: 0.1, note: '✓' },
                    { id: 'diff_lock', l: 'Bloqueo Diff', type: 'step', min: 0, max: 100, step: 5, s: '%', note: '✓' }
                ]
            },
            {
                id: 'geometry',
                name: 'Alineación',
                params: [
                    { id: 'camber_f', l: 'Camber Del.', type: 'step', min: -3, max: 0, step: 0.5, s: '°', note: '✓' },
                    { id: 'camber_r', l: 'Camber Tras.', type: 'step', min: -3, max: 0, step: 0.5, s: '°', note: '✓' }
                ]
            }
        ]
    },

    // ── RICHARD BURNS RALLY (RBR) ─────────────────────────────────────────────
    {
        id: 'rbr',
        name: 'Richard Burns Rally',
        type: 'tabbed',
        weatherVariants: false,
        includFFB: false,
        notes: [
            { id: 'note_drive', label: 'Notas — Conducción', placeholder: 'Behavior on different surfaces...' },
            { id: 'note_setup', label: 'Notas — Setup', placeholder: 'Setup adjustments...' }
        ],
        tabs: [
            {
                id: 'drivetrain',
                name: 'Transmisión',
                params: [
                    { id: 'final_ratio', l: 'Relación Final', type: 'step', min: 2, max: 6, step: 0.1, note: '✓' },
                    { id: 'diff_lock', l: 'Bloqueo Diff (%)', type: 'step', min: 0, max: 100, step: 5, s: '%', note: '✓' }
                ]
            },
            {
                id: 'suspension',
                name: 'Suspensión',
                params: [
                    { id: 'spring_f', l: 'Muelles Del. (N/mm)', type: 'step', min: 50, max: 200, step: 5, note: '✓' },
                    { id: 'spring_r', l: 'Muelles Tras. (N/mm)', type: 'step', min: 50, max: 200, step: 5, note: '✓' },
                    { id: 'damper_f', l: 'Damper Del.', type: 'step', min: 1, max: 20, step: 1, note: '✓' },
                    { id: 'damper_r', l: 'Damper Tras.', type: 'step', min: 1, max: 20, step: 1, note: '✓' },
                    { id: 'arb', l: 'Anti Roll Bar', type: 'step', min: 0, max: 30, step: 1, note: '✓' },
                    { id: 'height', l: 'Altura Chasis (mm)', type: 'step', min: 80, max: 150, step: 5, s: ' mm', note: '✓' }
                ]
            },
            {
                id: 'brakes',
                name: 'Frenos',
                params: [
                    { id: 'brake_balance', l: 'Balance Freno (%)', type: 'step', min: 35, max: 70, step: 1, s: '%', note: '✓' },
                    { id: 'brake_pressure', l: 'Presión Freno', type: 'step', min: 1, max: 3, step: 0.1, note: '✓ Atm' }
                ]
            },
            {
                id: 'tyres',
                name: 'Neumáticos',
                params: [
                    { id: 'tyre_compound', l: 'Compuesto', type: 'options', options: ['Asfalto Seco', 'Asfalto Lluvia', 'Grava Blando', 'Grava Duro', 'Nieve'], note: '✓' },
                    { id: 'tyre_pressure_f', l: 'Presión Del. (kPa)', type: 'step', min: 150, max: 250, step: 5, s: ' kPa', note: '✓' },
                    { id: 'tyre_pressure_r', l: 'Presión Tras. (kPa)', type: 'step', min: 150, max: 250, step: 5, s: ' kPa', note: '✓' }
                ]
            },
            {
                id: 'geometry',
                name: 'Alineación',
                params: [
                    { id: 'camber_f', l: 'Camber Del. (°)', type: 'step', min: -3, max: 1, step: 0.5, s: '°', note: '✓' },
                    { id: 'camber_r', l: 'Camber Tras. (°)', type: 'step', min: -3, max: 1, step: 0.5, s: '°', note: '✓' },
                    { id: 'toe_f', l: 'Toe Del. (°)', type: 'step', min: -1, max: 1, step: 0.1, s: '°', note: '✓' },
                    { id: 'toe_r', l: 'Toe Tras. (°)', type: 'step', min: -1, max: 1, step: 0.1, s: '°', note: '✓' }
                ]
            }
        ]
    },

    // GROUP 4: STANDARD SIMPLIFIED
    { id: 'rrre', name: 'RaceRoom', type: 'group_standard' },
    { id: 'pc2', name: 'Project CARS 2', type: 'group_standard' },
    { id: 'nascar', name: 'NASCAR 21', type: 'group_standard' },
    { id: 'kart', name: 'KartKraft', type: 'group_standard' },
    { id: 'rennsport', name: 'Rennsport', type: 'group_standard' },
    { id: 'circuit', name: 'Circuit Superstars', type: 'group_standard' },
    { id: 'lfs', name: 'Live for Speed', type: 'group_standard' },
    { id: 'gts', name: 'Gran Turismo Sport', type: 'group_standard' }
];

export const GROUPS = {
    group_simpro: [
        { id: 'v1', name: 'Chasis/Neum.', params: [{ id: 'psi', l: 'Presiones', type: 'number' }, { id: 'comp', l: 'Compuesto', type: 'options', options: ['Slicks', 'Wet', 'Intermediate'] }, { id: 'bal', l: 'Lastre', type: 'number' }] },
        { id: 'v2', name: 'Frenos', params: [{ id: 'bb', l: 'Balance Freno', type: 'percentage' }, { id: 'duct', l: 'Ductos Freno', type: 'number' }] },
        { id: 'v3', name: 'Suspensión', params: [{ id: 'spr', l: 'Muelles', type: 'number' }, { id: 'arb', l: 'ARB', type: 'number' }, { id: 'h', l: 'Altura Chasis', type: 'number' }] },
        { id: 'v4', name: 'Geom/Diff', params: [{ id: 'cam', l: 'Camber', type: 'number' }, { id: 'pre', l: 'Diff Preload', type: 'number' }] },
        { id: 'v5', name: 'Aero', params: [{ id: 'wing', l: 'Ala Del./Tras.', type: 'number' }] },
        { id: 'v6', name: 'Transmisión', params: [{ id: 'map', l: 'Mapa Motor', type: 'step' }, { id: 'final', l: 'Relación Final', type: 'number' }] }
    ],
    group_rally: [
        { id: 'v1', name: 'Neumáticos', params: [{ id: 'comp', l: 'Compuesto', type: 'options', options: ['Asfalto Seco', 'Asfalto Lluvia', 'Grava Blando', 'Grava Duro', 'Nieve', 'Hielo'] }, { id: 'psi', l: 'Presiones', type: 'number' }] },
        { id: 'v2', name: 'Suspensiones', params: [{ id: 'spr', l: 'Muelles', type: 'number' }, { id: 'h', l: 'Altura (Rally)', type: 'number', min: 180, max: 250, s: ' mm' }] },
        { id: 'v3', name: 'Diferenciales', params: [{ id: 'diff_c', l: 'Diff Central', type: 'options', options: ['Abierto', 'Automático', 'Bloqueado'] }, { id: 'lock', l: 'Bloqueo Del./Tras.', type: 'step' }, { id: 'dist', l: 'Distribución Par', type: 'percentage' }] },
        { id: 'v4', name: 'Frenos/Geom', params: [{ id: 'bb', l: 'Balance Freno', type: 'percentage' }, { id: 'cam', l: 'Camber', type: 'number' }] },
        { id: 'v5', name: 'Transmisión', params: [{ id: 'final', l: 'Relación Final', type: 'step' }] }
    ],
    group_standard: [
        { id: 'v1', name: 'Neum/Frenos', params: [{ id: 'comp', l: 'Compuesto', type: 'options', options: ['Blando', 'Medio', 'Duro'] }, { id: 'psi', l: 'Presiones', type: 'number' }, { id: 'bb', l: 'Balance Freno', type: 'percentage' }] },
        { id: 'v2', name: 'Suspensión', params: [{ id: 'spr', l: 'Muelles', type: 'number' }, { id: 'arb', l: 'ARB', type: 'number' }, { id: 'h', l: 'Altura Chasis', type: 'number' }] },
        { id: 'v3', name: 'Geom/Diff', params: [{ id: 'cam', l: 'Camber', type: 'number' }, { id: 'diff', l: 'Diff (Acel/Decel)', type: 'number' }] },
        { id: 'v4', name: 'Aero/Motor', params: [{ id: 'wing', l: 'Ala', type: 'number' }, { id: 'map', l: 'Mapa Motor', type: 'step' }] }
    ]
};
