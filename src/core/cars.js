import { getAllIRacingCars } from './overrides/iracing_car_overrides.js';

// ─────────────────────────────────────────────────────────────────────────────
// CARS BY GAME
// Fuentes: listados oficiales de cada juego + community wiki
// Estructura: { id, name, class } — id es identificador interno
// class = categoría de carrera (GT3, GT4, F1, Rally, etc.)
// ─────────────────────────────────────────────────────────────────────────────

export const GAME_CARS = {

    // ── ASSETTO CORSA COMPETIZIONE ─────────────────────────────────────────
    acc: [
        // GT3
        { id: 'amr_v12_vantage_gt3',        name: 'Aston Martin V12 Vantage GT3 (2013)',   class: 'GT3' },
        { id: 'amr_v8_vantage_gt3',         name: 'Aston Martin V8 Vantage GT3 (2019)',    class: 'GT3' },
        { id: 'audi_r8_lms',               name: 'Audi R8 LMS GT3 (2015)',                class: 'GT3' },
        { id: 'audi_r8_lms_evo',           name: 'Audi R8 LMS GT3 Evo (2018)',            class: 'GT3' },
        { id: 'audi_r8_lms_evo_ii',        name: 'Audi R8 LMS GT3 Evo II (2022)',         class: 'GT3' },
        { id: 'bentley_continental_gt3_2016', name: 'Bentley Continental GT3 (2016)',     class: 'GT3' },
        { id: 'bentley_continental_gt3_2018', name: 'Bentley Continental GT3 (2018)',     class: 'GT3' },
        { id: 'bmw_m6_gt3',               name: 'BMW M6 GT3 (2017)',                     class: 'GT3' },
        { id: 'bmw_m4_gt3',               name: 'BMW M4 GT3 (2022)',                     class: 'GT3' },
        { id: 'ferrari_488_gt3',           name: 'Ferrari 488 GT3 (2018)',                 class: 'GT3' },
        { id: 'ferrari_488_gt3_evo',       name: 'Ferrari 488 GT3 Evo (2020)',             class: 'GT3' },
        { id: 'ferrari_296_gt3',           name: 'Ferrari 296 GT3 (2023)',                 class: 'GT3' },
        { id: 'honda_nsx_gt3',             name: 'Honda NSX GT3 (2017)',                   class: 'GT3' },
        { id: 'honda_nsx_gt3_evo',         name: 'Honda NSX GT3 Evo (2019)',               class: 'GT3' },
        { id: 'lamborghini_huracan_gt3',   name: 'Lamborghini Huracán GT3 (2015)',          class: 'GT3' },
        { id: 'lamborghini_huracan_gt3_evo', name: 'Lamborghini Huracán GT3 Evo (2019)',    class: 'GT3' },
        { id: 'lamborghini_huracan_gt3_evo2', name: 'Lamborghini Huracán GT3 EVO2 (2023)',  class: 'GT3' },
        { id: 'lexus_rc_f_gt3',            name: 'Lexus RC F GT3 (2016)',                 class: 'GT3' },
        { id: 'mclaren_650s_gt3',          name: 'McLaren 650S GT3 (2015)',                class: 'GT3' },
        { id: 'mclaren_720s_gt3',           name: 'McLaren 720S GT3 (2019)',                class: 'GT3' },
        { id: 'mclaren_720s_gt3_evo',       name: 'McLaren 720S GT3 Evo (2023)',            class: 'GT3' },
        { id: 'mercedes_amg_gt3',           name: 'Mercedes-AMG GT3 (2015)',               class: 'GT3' },
        { id: 'mercedes_amg_gt3_evo',       name: 'Mercedes-AMG GT3 Evo (2020)',           class: 'GT3' },
        { id: 'nissan_gt_r_gt3_2017',       name: 'Nissan GT-R Nismo GT3 (2017)',          class: 'GT3' },
        { id: 'nissan_gt_r_gt3_2018',       name: 'Nissan GT-R Nismo GT3 (2018)',          class: 'GT3' },
        { id: 'porsche_991_gt3_r',          name: 'Porsche 911 GT3 R (991) (2015)',        class: 'GT3' },
        { id: 'porsche_991ii_gt3_r',        name: 'Porsche 911 GT3 R (991 II) (2019)',     class: 'GT3' },
        { id: 'porsche_992_gt3_r',          name: 'Porsche 911 GT3 R (992) (2023)',        class: 'GT3' },
        { id: 'lamborghini_gallardo_rex',    name: 'Reiter Engineering R-EX GT3 (2017)',     class: 'GT3' },
        { id: 'jaguar_g3',                  name: 'Emil Frey Jaguar G3 (2012)',            class: 'GT3' },
        // GT4
        { id: 'alpine_a110_gt4',           name: 'Alpine A110 GT4 (2018)',                 class: 'GT4' },
        { id: 'amr_v8_vantage_gt4',        name: 'Aston Martin Vantage GT4 (2018)',         class: 'GT4' },
        { id: 'audi_r8_gt4',               name: 'Audi R8 LMS GT4 (2018)',                class: 'GT4' },
        { id: 'bmw_m4_gt4',               name: 'BMW M4 GT4 (2018)',                      class: 'GT4' },
        { id: 'chevrolet_camaro_gt4r',      name: 'Chevrolet Camaro GT4.R (2017)',          class: 'GT4' },
        { id: 'ginetta_g55_gt4',            name: 'Ginetta G55 GT4 (2012)',                 class: 'GT4' },
        { id: 'ktm_xbow_gt4',              name: 'KTM X-Bow GT4 (2016)',                   class: 'GT4' },
        { id: 'maserati_mc_gt4',            name: 'Maserati GranTurismo MC GT4 (2016)',    class: 'GT4' },
        { id: 'mclaren_570s_gt4',           name: 'McLaren 570S GT4 (2016)',               class: 'GT4' },
        { id: 'mercedes_amg_gt4',           name: 'Mercedes-AMG GT4 (2016)',               class: 'GT4' },
        { id: 'porsche_718_cayman_gt4_mr', name: 'Porsche 718 Cayman GT4 Clubsport MR',   class: 'GT4' },
        // GTC / CUP
        { id: 'porsche_992_gt3_cup',       name: 'Porsche 911 GT3 Cup (992)',              class: 'GTC' },
        { id: 'ferrari_488_challenge_evo',  name: 'Ferrari 488 Challenge Evo',             class: 'GTC' },
        { id: 'lamborghini_huracan_st_evo2', name: 'Lamborghini Huracán ST EVO2',           class: 'GTC' },
    ],

    // ── F1 24 ──────────────────────────────────────────────────────────────
    f1_24: [
        { id: 'rb20',  name: 'Red Bull Racing RB20',  class: 'F1' },
        { id: 'sf24',  name: 'Ferrari SF-24',         class: 'F1' },
        { id: 'w15',   name: 'Mercedes-AMG W15',      class: 'F1' },
        { id: 'mcl38', name: 'McLaren MCL38',          class: 'F1' },
        { id: 'amr24', name: 'Aston Martin AMR24',     class: 'F1' },
        { id: 'a524',  name: 'Alpine A524',            class: 'F1' },
        { id: 'fw46',  name: 'Williams FW46',           class: 'F1' },
        { id: 'vcarb', name: 'Visa Cash App RB VCARB 01', class: 'F1' },
        { id: 'c44',   name: 'Stake F1 Team C44',      class: 'F1' },
        { id: 'vf24',  name: 'Haas VF-24',             class: 'F1' },
    ],

    // ── GRAN TURISMO 7 ─────────────────────────────────────────────────────
    gt7: [
        { id: 'gr1_vgt',    name: 'Gr.1 - Vision GT',               class: 'Gr.1' },
        { id: 'gr1_918',    name: 'Gr.1 - Porsche 918 RSR',          class: 'Gr.1' },
        { id: 'gr1_gs',     name: 'Gr.1 - Mercedes-AMG GT',          class: 'Gr.1' },
        { id: 'gr3_supra',  name: 'Gr.3 - Toyota Supra GT500',       class: 'Gr.3' },
        { id: 'gr3_86',     name: 'Gr.3 - Toyota 86 GT',             class: 'Gr.3' },
        { id: 'gr3_nismo',  name: 'Gr.3 - Nissan GT-R Nismo',       class: 'Gr.3' },
        { id: 'gr3_amg',    name: 'Gr.3 - Mercedes-AMG GT',         class: 'Gr.3' },
        { id: 'gr3_bmwm4',  name: 'Gr.3 - BMW M4 GT3',              class: 'Gr.3' },
        { id: 'gr3_raser',  name: 'Gr.3 - Lexus RC F',              class: 'Gr.3' },
        { id: 'gr4_megane', name: 'Gr.4 - Renault Megane Trophy',  class: 'Gr.4' },
        { id: 'gr4_a45',    name: 'Gr.4 - Mercedes-AMG A45',         class: 'Gr.4' },
        { id: 'gr4_gtr',    name: 'Gr.4 - Nissan GT-R',             class: 'Gr.4' },
        { id: 'grb_quattro', name: 'Gr.B - Audi Sport Quattro',      class: 'Gr.B' },
        { id: 'grb_evo',    name: 'Gr.B - Subaru WRX',               class: 'Gr.B' },
        { id: 'formula_s',   name: 'Formula Sport',                  class: 'Formula' },
        { id: 'formula_2',  name: 'Formula 2',                      class: 'Formula' },
        { id: 'street_nsx',  name: 'Street - Honda NSX',            class: 'Street' },
        { id: 'street_supra', name: 'Street - Toyota GR Supra',    class: 'Street' },
        { id: 'street_86',   name: 'Street - Toyota 86',           class: 'Street' },
        { id: 'street_civic', name: 'Street - Honda Civic Type R',  class: 'Street' },
        { id: 'street_370z', name: 'Street - Nissan 370Z',          class: 'Street' },
        { id: 'rally_gr',    name: 'Rally - Toyota GR Yaris',      class: 'Rally' },
    ],

    // iRacing
    // Single source of truth: generated from src/iracing_car_overrides.js.
    iracing: getAllIRacingCars(),

    // ── ASSETTO CORSA ─────────────────────────────────────────────────────
    ac: [
        { id: 'ac_lamborghini_huracan',  name: 'Lamborghini Huracán Performante',  class: 'GT3' },
        { id: 'ac_ferrari_488',          name: 'Ferrari 488 GT3',                 class: 'GT3' },
        { id: 'ac_porsche_991',          name: 'Porsche 911 GT3 RS',             class: 'GT3' },
        { id: 'ac_mclaren_650s',         name: 'McLaren 650S GT3',              class: 'GT3' },
        { id: 'ac_nissan_gt_r',          name: 'Nissan GT-R R35',               class: 'GT3' },
        { id: 'ac_audi_r8',              name: 'Audi R8 LMS',                   class: 'GT3' },
        { id: 'ac_bmw_m3',               name: 'BMW M3 GT3',                    class: 'GT3' },
        { id: 'ac_mercedes_amg',         name: 'Mercedes-AMG GT3',              class: 'GT3' },
        { id: 'ac_lotus_evora',          name: 'Lotus Evora GT3',              class: 'GT3' },
        { id: 'ac_toyota_supra',         name: 'Toyota GR Supra GT3',           class: 'GT3' },
        { id: 'ac_abarth_500',           name: 'Abarth 500',                    class: 'Street' },
        { id: 'ac_bmw_e30',             name: 'BMW M3 E30',                    class: 'Historic' },
        { id: 'ac_porsche_917',          name: 'Porsche 917 K',                 class: 'Historic' },
        { id: 'ac_ferrari_f40',          name: 'Ferrari F40',                   class: 'Historic' },
    ],

    // ── FORZA MOTORSPORT 2023 ───────────────────────────────────────────────
    forza: [
        { id: 'fm_gt3_911gt3',      name: 'Porsche 911 GT3 RS',            class: 'GT' },
        { id: 'fm_gt3_m4',         name: 'BMW M4 GT3',                   class: 'GT' },
        { id: 'fm_gt3_amg',         name: 'Mercedes-AMG GT3',             class: 'GT' },
        { id: 'fm_gt3_huracan',    name: 'Lamborghini Huracán GT3',      class: 'GT' },
        { id: 'fm_gt3_ferrari',     name: 'Ferrari 488 GT3',             class: 'GT' },
        { id: 'fm_gt3_mclaren',     name: 'McLaren 720S GT3',            class: 'GT' },
        { id: 'fm_gt3_audi',        name: 'Audi R8 LMS GT3',             class: 'GT' },
        { id: 'fm_race_mustang',    name: 'Ford Mustang GT3',            class: 'GT' },
        { id: 'fm_race_corvette',   name: 'Chevrolet Corvette C8 GT3',   class: 'GT' },
        { id: 'fm_race_supra',      name: 'Toyota GR Supra GT3',         class: 'GT' },
        { id: 'fm_touring_a45',    name: 'Mercedes-AMG A45',            class: 'Touring' },
        { id: 'fm_touring_gr_yaris', name: 'Toyota GR Yaris',           class: 'Touring' },
        { id: 'fm_touring_ct4v',    name: 'Cadillac CT4-V Blackwing',   class: 'Touring' },
        { id: 'fm_street_supra',    name: 'Toyota GR Supra',             class: 'Street' },
        { id: 'fm_street_m3',       name: 'BMW M3 Competition',          class: 'Street' },
        { id: 'fm_street_civic',    name: 'Honda Civic Type R',          class: 'Street' },
        { id: 'fm_openwheel_f2000', name: 'Formula 2000',               class: 'OpenWheel' },
        { id: 'fm_openwheel_ir18',  name: 'IndyCar IR18',               class: 'OpenWheel' },
    ],

    // ── rFactor 2 ─────────────────────────────────────────────────────────
    rf2: [
        { id: 'rf2_amr_vantage',    name: 'Aston Martin Vantage GT3',   class: 'GT3' },
        { id: 'rf2_bmw_m4',         name: 'BMW M4 GT3',                  class: 'GT3' },
        { id: 'rf2_mclaren_720s',   name: 'McLaren 720S GT3',           class: 'GT3' },
        { id: 'rf2_porsche_991',    name: 'Porsche 911 GT3 R',          class: 'GT3' },
        { id: 'rf2_ferrari_488',    name: 'Ferrari 488 GT3',           class: 'GT3' },
        { id: 'rf2_formulapro',     name: 'Formula Pro',                  class: 'Formula' },
        { id: 'rf2_indycar',        name: 'IndyCar IR-18',               class: 'Formula' },
        { id: 'rf2_lmp2_oreca',     name: 'Oreca 07',                   class: 'LMP2' },
        { id: 'rf2_lmp2_gibson',    name: 'Dallara P217',               class: 'LMP2' },
        { id: 'rf2_racehut_m4',    name: 'BMW M4 F82',                  class: 'GT' },
        { id: 'rf2_btcc_corolla',   name: 'Toyota Corolla BTCC',         class: 'Touring' },
        { id: 'rf2_btcc_honda',     name: 'Honda Civic Type R BTCC',     class: 'Touring' },
    ],

    // ── AUTOMOBILISTA 2 ────────────────────────────────────────────────────
    ams2: [
        { id: 'ams2_amr_vantage',  name: 'Aston Martin Vantage GT3',   class: 'GT3' },
        { id: 'ams2_amg_gt3',       name: 'Mercedes-AMG GT3',            class: 'GT3' },
        { id: 'ams2_bmw_m4',        name: 'BMW M4 GT3',                  class: 'GT3' },
        { id: 'ams2_porsche_991',   name: 'Porsche 911 GT3 R',          class: 'GT3' },
        { id: 'ams2_ferrari_488',   name: 'Ferrari 488 GT3',           class: 'GT3' },
        { id: 'ams2_mclaren_720s',  name: 'McLaren 720S GT3',           class: 'GT3' },
        { id: 'ams2_lambo_huracan', name: 'Lamborghini Huracán GT3',    class: 'GT3' },
        { id: 'ams2_formula_v8',     name: 'Formula V8',                  class: 'Formula' },
        { id: 'ams2_formula_gen2',  name: 'Formula 2',                   class: 'Formula' },
        { id: 'ams2_lmp3',          name: 'LMP3',                        class: 'LMP' },
        { id: 'ams2_lmp1',          name: 'LMP1',                        class: 'LMP' },
        { id: 'ams2_pcup_cayman',   name: 'Porsche 718 Cayman GT4',     class: 'GT4' },
        { id: 'ams2_m4_gt4',        name: 'BMW M4 GT4',                  class: 'GT4' },
        { id: 'ams2_supercars_am',  name: 'Australian Supercars',         class: 'Touring' },
        { id: 'ams2_brands_hatch',  name: 'British GT',                  class: 'GT' },
    ],

    // ── LE MANS ULTIMATE ─────────────────────────────────────────────────
    lmu: [
        { id: 'lmu_hypercar_toyota',  name: 'Toyota GR010 Hybrid',        class: 'Hypercar' },
        { id: 'lmu_hypercar_peugeot', name: 'Peugeot 9X8',               class: 'Hypercar' },
        { id: 'lmu_hypercar_ferrari', name: 'Ferrari 499P',              class: 'Hypercar' },
        { id: 'lmu_hypercar_porsche', name: 'Porsche 963',                class: 'Hypercar' },
        { id: 'lmu_hypercar_cadillac', name: 'Cadillac V-Series.R',      class: 'Hypercar' },
        { id: 'lmu_lmp2_oreca',       name: 'Oreca 07',                   class: 'LMP2' },
        { id: 'lmu_lmp2_gibson',      name: 'Dallara P217',              class: 'LMP2' },
        { id: 'lmu_lmp2_ligier',      name: 'Ligier JSP217',             class: 'LMP2' },
        { id: 'lmu_gt3_amr_vantage',  name: 'Aston Martin Vantage GT3',  class: 'GT3' },
        { id: 'lmu_gt3_amg',          name: 'Mercedes-AMG GT3',           class: 'GT3' },
        { id: 'lmu_gt3_bmw_m4',       name: 'BMW M4 GT3',                 class: 'GT3' },
        { id: 'lmu_gt3_porsche',      name: 'Porsche 911 GT3 R',         class: 'GT3' },
        { id: 'lmu_gt3_ferrari',      name: 'Ferrari 488 GT3',           class: 'GT3' },
    ],

    // ── RICHARD BURNS RALLY ───────────────────────────────────────────────
    rbr: [
        { id: 'rbr_subaru_wrx',   name: 'Subaru Impreza WRX STI',  class: 'Rally' },
        { id: 'rbr_mitsubishi',   name: 'Mitsubishi Lancer Evo IX', class: 'Rally' },
        { id: 'rbr_peugeot_206',  name: 'Peugeot 206 WRC',         class: 'Rally' },
        { id: 'rbr_citroen_xsara', name: 'Citroën Xsara WRC',      class: 'Rally' },
        { id: 'rbr_ford_focus',   name: 'Ford Focus WRC',           class: 'Rally' },
        { id: 'rbr_audi_quattro',  name: 'Audi Quattro S1',          class: 'Rally' },
        { id: 'rbr_lancia_delta',  name: 'Lancia Delta HF Integrale', class: 'Rally' },
        { id: 'rbr_vw_golf',      name: 'Volkswagen Golf GTI',      class: 'Rally' },
    ],

    // ── DIRT RALLY 2.0 ────────────────────────────────────────────────────
    // 82 coches totales: Rally1, Rally2, Rally4, Rallycross, Historic, GTRally, etc.
    dr2: [
        // ─ RALLY1 (Modern WRC)
        { id: 'dr2_toyota_gr_yaris_rly1', name: 'Toyota GR Yaris Rally1 2024',  class: 'Rally1' },
        { id: 'dr2_hyundai_i20_rly1',     name: 'Hyundai i20 N Rally1 2024',    class: 'Rally1' },
        { id: 'dr2_ford_puma_rly1',       name: 'Ford Puma Rally1 2024',        class: 'Rally1' },
        { id: 'dr2_citroen_c3_rly1',      name: 'Citroën C3 Rally1',            class: 'Rally1' },

        // ─ RALLY2 (R5)
        { id: 'dr2_toyota_gr_supra_r2',   name: 'Toyota GR Supra Rally2',       class: 'Rally2' },
        { id: 'dr2_skoda_fabia_r5',       name: 'Skoda Fabia RS Rally2',        class: 'Rally2' },
        { id: 'dr2_hyundai_i20_r5',       name: 'Hyundai i20 R5 Coupe',         class: 'Rally2' },
        { id: 'dr2_ford_fiesta_r5_mk7',   name: 'Ford Fiesta R5 Mk VII',        class: 'Rally2' },
        { id: 'dr2_peugeot_208_r5',       name: 'Peugeot 208 T16 R5',           class: 'Rally2' },
        { id: 'dr2_citroen_c3_r5',        name: 'Citroën C3 R5',                class: 'Rally2' },
        { id: 'dr2_vw_polo_r5',           name: 'Volkswagen Polo GTI R5',       class: 'Rally2' },
        { id: 'dr2_mitsubishi_sr5',       name: 'Mitsubishi Space Star R5',     class: 'Rally2' },

        // ─ RALLY4 (Junior Rally)
        { id: 'dr2_alpine_a110',          name: 'Alpine A110 Rally',            class: 'Rally4' },
        { id: 'dr2_peugeot_208_rally4',   name: 'Peugeot 208 Rally4',           class: 'Rally4' },
        { id: 'dr2_opel_corsa_rally4',    name: 'Opel Corsa Rally4',            class: 'Rally4' },
        { id: 'dr2_ford_fiesta_rally4',   name: 'Ford Fiesta Rally4',           class: 'Rally4' },

        // ─ R4 & National
        { id: 'dr2_subaru_wrx_r4',        name: 'Subaru WRX STI R4',            class: 'R4' },
        { id: 'dr2_mitsubishi_evo_r4',    name: 'Mitsubishi Lancer Evo R4',     class: 'R4' },

        // ─ RALLYCROSS (RX Supercars & Group B)
        { id: 'dr2_audi_s1_rx',           name: 'Audi S1 EKS RX Quattro',       class: 'RX_Supercar' },
        { id: 'dr2_ford_fiesta_rx_mk8',   name: 'Ford Fiesta Rallycross Mk VIII', class: 'RX_Supercar' },
        { id: 'dr2_peugeot_208_wrx',      name: 'Peugeot 208 WRX',              class: 'RX_Supercar' },
        { id: 'dr2_volkswagen_polo_rx',   name: 'Volkswagen Polo R Supercar',   class: 'RX_Supercar' },
        { id: 'dr2_subaru_wrx_rx',        name: 'Subaru WRX STI Rallycross',    class: 'RX_Supercar' },
        { id: 'dr2_renault_megane_rx',    name: 'Renault Sport Megane RS RX',   class: 'RX_Supercar' },

        // ─ GROUP B (Historic 4WD)
        { id: 'dr2_audi_s1_e2',           name: 'Audi Sport Quattro S1 E2',     class: 'Group_B' },
        { id: 'dr2_ford_rs200',           name: 'Ford RS200 Evolution',         class: 'Group_B' },
        { id: 'dr2_lancia_delta_s4',      name: 'Lancia Delta S4',              class: 'Group_B' },
        { id: 'dr2_peugeot_205_t16_evo2', name: 'Peugeot 205 T16 E2',           class: 'Group_B' },
        { id: 'dr2_mg_metro_6r4',         name: 'MG Metro 6R4',                 class: 'Group_B' },

        // ─ GROUP A (80s-90s Classics)
        { id: 'dr2_ford_escort_rs_cosworth', name: 'Ford Escort RS Cosworth',   class: 'Group_A' },
        { id: 'dr2_lancia_delta_hf_evo',     name: 'Lancia Delta HF Integrale Evo', class: 'Group_A' },
        { id: 'dr2_mitsubishi_galant_vr4',   name: 'Mitsubishi Galant VR4',     class: 'Group_A' },
        { id: 'dr2_subaru_impreza_1995',     name: 'Subaru Impreza 555 (1995)',  class: 'Group_A' },
        { id: 'dr2_subaru_legacy_rs',        name: 'Subaru Legacy RS',           class: 'Group_A' },

        // ─ RWD HISTORIC (70s-80s)
        { id: 'dr2_ford_escort_mk2',      name: 'Ford Escort Mk II',            class: 'RWD_Historic' },
        { id: 'dr2_alpine_a110_1600s',    name: 'Alpine Renault A110 1600 S',   class: 'RWD_Historic' },
        { id: 'dr2_fiat_131_abarth',      name: 'Fiat 131 Abarth Rally',        class: 'RWD_Historic' },
        { id: 'dr2_opel_kadett_gte',      name: 'Opel Kadett C GTE',            class: 'RWD_Historic' },
        { id: 'dr2_lancia_stratos',       name: 'Lancia Stratos',               class: 'RWD_Historic' },
        { id: 'dr2_ford_sierra_rs500',    name: 'Ford Sierra Cosworth RS500',   class: 'RWD_Historic' },

        // ─ FWD HISTORIC
        { id: 'dr2_peugeot_205_gti',      name: 'Peugeot 205 GTI',              class: 'FWD_Historic' },
        { id: 'dr2_ford_fiesta_xr2',      name: 'Ford Fiesta XR2',              class: 'FWD_Historic' },

        // ─ GT RALLY (Modern Road Cars)
        { id: 'dr2_porsche_911_rgt',      name: 'Porsche 911 RGT Rally',        class: 'GT_Rally' },
        { id: 'dr2_chevrolet_camaro_gt4r', name: 'Chevrolet Camaro GT4R',      class: 'GT_Rally' },
        { id: 'dr2_ford_mustang_gt4',     name: 'Ford Mustang GT4',             class: 'GT_Rally' },
        { id: 'dr2_aston_martin_gt4',     name: 'Aston Martin Vantage GT4',     class: 'GT_Rally' },
        { id: 'dr2_bmw_m2_comp',          name: 'BMW M2 Competition',           class: 'GT_Rally' },

        // ─ CROSS KART
        { id: 'dr2_cross_kart',           name: 'Cross Kart',                   class: 'Kart' },
    ],

    // ── EA SPORTS WRC ─────────────────────────────────────────────────────
    // 99 coches totales: WRC Modern, Historic, Rally2, Rally3, Rally4, etc.
    wrc: [
        // ─ WRC CURRENT (Rally1 Hybrid 2023-2024)
        { id: 'wrc_toyota_gr_yaris_hybrid', name: 'Toyota GR Yaris Rally1 HYBRID', class: 'WRC' },
        { id: 'wrc_hyundai_i20_hybrid',     name: 'Hyundai i20 N Rally1 HYBRID',   class: 'WRC' },
        { id: 'wrc_ford_puma_hybrid',       name: 'Ford Puma Rally1 HYBRID',      class: 'WRC' },

        // ─ WRC 2017-2021 (Pre-Hybrid)
        { id: 'wrc_citroen_c3_2021',       name: 'Citroën C3 WRC 2021',           class: 'WRC_Historic' },
        { id: 'wrc_ford_fiesta_2018',      name: 'Ford Fiesta WRC 2018',         class: 'WRC_Historic' },
        { id: 'wrc_hyundai_i20_2020',      name: 'Hyundai i20 Coupe WRC 2020',   class: 'WRC_Historic' },
        { id: 'wrc_volkswagen_polo_2017',  name: 'Volkswagen Polo R WRC 2017',   class: 'WRC_Historic' },

        // ─ WRC 2012-2016
        { id: 'wrc_volkswagen_polo_2013',  name: 'Volkswagen Polo R WRC 2013',   class: 'WRC_2012_2016' },
        { id: 'wrc_citroën_ds3_2012',      name: 'Citroën DS3 WRC 2012',         class: 'WRC_2012_2016' },
        { id: 'wrc_mini_jcw_2012',         name: 'MINI John Cooper Works WRC',   class: 'WRC_2012_2016' },

        // ─ WRC 1997-2011 (Classic WRC)
        { id: 'wrc_subaru_impreza_2001',   name: 'Subaru Impreza WRC 2001',      class: 'WRC_1997_2011' },
        { id: 'wrc_mitsubishi_evo_2007',   name: 'Mitsubishi Lancer Evo IX 2007', class: 'WRC_1997_2011' },
        { id: 'wrc_ford_focus_2007',       name: 'Ford Focus WRC 2007',          class: 'WRC_1997_2011' },
        { id: 'wrc_citroen_xsara_2003',    name: 'Citroën Xsara WRC 2003',       class: 'WRC_1997_2011' },

        // ─ WRC2 (Rally2)
        { id: 'wrc_citroen_c3_rally2',     name: 'Citroën C3 Rally2',            class: 'WRC2' },
        { id: 'wrc_ford_fiesta_rally2_evo2', name: 'Ford Fiesta Rally2 Evo 2',    class: 'WRC2' },
        { id: 'wrc_hyundai_i20_rally2',    name: 'Hyundai i20 N Rally2',         class: 'WRC2' },
        { id: 'wrc_skoda_fabia_rally2_evo', name: 'Skoda Fabia RS Rally2 Evo',    class: 'WRC2' },
        { id: 'wrc_skoda_fabia_rs_rally2', name: 'Skoda Fabia RS Rally2',        class: 'WRC2' },
        { id: 'wrc_toyota_gr_yaris_rally2', name: 'Toyota GR Yaris Rally2',      class: 'WRC2' },
        { id: 'wrc_volkswagen_polo_rally2', name: 'Volkswagen Polo GTI R5',      class: 'WRC2' },

        // ─ JUNIOR WRC (Rally3)
        { id: 'wrc_ford_fiesta_rally3',    name: 'Ford Fiesta Rally3',           class: 'JuniorWRC' },
        { id: 'wrc_ford_fiesta_rally3_evo', name: 'Ford Fiesta Rally3 EVO',       class: 'JuniorWRC' },
        { id: 'wrc_renault_clio_rally3',   name: 'Renault Clio Rally3',          class: 'JuniorWRC' },

        // ─ RALLY4
        { id: 'wrc_citroen_c2_rally4',     name: 'Citroën C2 R2 Max',            class: 'Rally4' },
        { id: 'wrc_ford_fiesta_rally4',    name: 'Ford Fiesta Mk VIII Rally4',   class: 'Rally4' },
        { id: 'wrc_opel_adam_r2',          name: 'Opel Adam R2',                 class: 'Rally4' },
        { id: 'wrc_opel_corsa_rally4',     name: 'Opel Corsa Rally4',            class: 'Rally4' },
        { id: 'wrc_peugeot_208_rally4',    name: 'Peugeot 208 Rally4',           class: 'Rally4' },
        { id: 'wrc_renault_clio_rally4',   name: 'Renault Clio Rally4',          class: 'Rally4' },
        { id: 'wrc_renault_twingo_rally4', name: 'Renault Twingo II Rally4',     class: 'Rally4' },

        // ─ S1600 (Super 1600)
        { id: 'wrc_citroen_c2_s1600',      name: 'Citroën C2 Super 1600',        class: 'S1600' },
        { id: 'wrc_citroen_saxo_s1600',    name: 'Citroën Saxo Super 1600',      class: 'S1600' },
        { id: 'wrc_ford_puma_s1600',       name: 'Ford Puma S1600',              class: 'S1600' },
        { id: 'wrc_peugeot_206_s1600',     name: 'Peugeot 206 S1600',            class: 'S1600' },
        { id: 'wrc_renault_clio_s1600',    name: 'Renault Clio S1600',           class: 'S1600' },

        // ─ S2000
        { id: 'wrc_fiat_grande_punto_s2000', name: 'Fiat Grande Punto Abarth S2000', class: 'S2000' },
        { id: 'wrc_opel_corsa_s2000',      name: 'Opel Corsa S2000',             class: 'S2000' },
        { id: 'wrc_peugeot_207_s2000',     name: 'Peugeot 207 S2000',            class: 'S2000' },

        // ─ KIT CARS (F2)
        { id: 'wrc_citroen_xsara_kit',     name: 'Citroën Xsara Kit Car',        class: 'KitCar' },
        { id: 'wrc_ford_escort_kit',       name: 'Ford Escort Mk 6 Maxi Kit Car', class: 'KitCar' },
        { id: 'wrc_peugeot_306_kit',       name: 'Peugeot 306 Maxi Kit Car',     class: 'KitCar' },
        { id: 'wrc_renault_maxi_megane',   name: 'Renault Maxi Mégane Kit Car',  class: 'KitCar' },
        { id: 'wrc_seat_ibiza_kit',        name: 'Seat Ibiza Kit Car',           class: 'KitCar' },
        { id: 'wrc_vauxhall_astra_kit',    name: 'Vauxhall Astra Rally Car',    class: 'KitCar' },
        { id: 'wrc_vw_golf_kit',           name: 'Volkswagen Golf IV Kit Car',   class: 'KitCar' },

        // ─ NR4 / R4 (National Rally)
        { id: 'wrc_mcrae_r4',              name: 'McRae R4',                     class: 'NR4' },
        { id: 'wrc_mitsubishi_evo_nr4',    name: 'Mitsubishi Lancer Evolution X NR4', class: 'NR4' },
        { id: 'wrc_subaru_wrx_nr4',        name: 'Subaru WRX STI NR4',           class: 'NR4' },

        // ─ GROUP B (Historic 4WD)
        { id: 'wrc_audi_s1_e2_groupb',     name: 'Audi Sport Quattro S1 E2',     class: 'Group_B_4WD' },
        { id: 'wrc_ford_rs200_groupb',     name: 'Ford RS200',                   class: 'Group_B_4WD' },
        { id: 'wrc_lancia_delta_s4',       name: 'Lancia Delta S4',              class: 'Group_B_4WD' },
        { id: 'wrc_peugeot_205_t16_evo2',  name: 'Peugeot 205 T16 Evo 2',        class: 'Group_B_4WD' },
        { id: 'wrc_mg_metro_6r4',          name: 'MG Metro 6R4',                 class: 'Group_B_RWD' },

        // ─ GROUP B RWD (Historic 2WD)
        { id: 'wrc_bmw_m1_procar',         name: 'BMW M1 Procar Rally',          class: 'Group_B_RWD' },
        { id: 'wrc_lancia_037_evo2',       name: 'Lancia 037 Evo 2',             class: 'Group_B_RWD' },
        { id: 'wrc_opel_manta_400',        name: 'Opel Manta 400',               class: 'Group_B_RWD' },
        { id: 'wrc_porsche_911_sc_rs',     name: 'Porsche 911 SC RS',            class: 'Group_B_RWD' },

        // ─ GROUP A (80s-90s)
        { id: 'wrc_ford_escort_cosworth',  name: 'Ford Escort RS Cosworth',      class: 'Group_A' },
        { id: 'wrc_lancia_delta_evo',      name: 'Lancia Delta HF Integrale',    class: 'Group_A' },
        { id: 'wrc_mitsubishi_galant_vr4', name: 'Mitsubishi Galant VR4',        class: 'Group_A' },
        { id: 'wrc_subaru_impreza_gc8',    name: 'Subaru Impreza GC8',           class: 'Group_A' },
        { id: 'wrc_subaru_legacy_rs',      name: 'Subaru Legacy RS',             class: 'Group_A' },

        // ─ HISTORIC (70s-80s)
        { id: 'wrc_alpine_a110_1600s',     name: 'Alpine Renault A110 1600 S',   class: 'Historic_RWD' },
        { id: 'wrc_fiat_131_abarth',       name: 'Fiat 131 Abarth Rally',        class: 'Historic_RWD' },
        { id: 'wrc_ford_escort_mk1',       name: 'Ford Escort RS 1600 Mk I',     class: 'Historic_RWD' },
        { id: 'wrc_ford_escort_mk2',       name: 'Ford Escort Mk II',            class: 'Historic_RWD' },
        { id: 'wrc_hillman_avenger',       name: 'Hillman Avenger',              class: 'Historic_RWD' },
        { id: 'wrc_lancia_stratos',        name: 'Lancia Stratos',               class: 'Historic_RWD' },
        { id: 'wrc_opel_ascona_400',       name: 'Opel Ascona 400',              class: 'Historic_RWD' },
        { id: 'wrc_opel_kadett_gte',       name: 'Opel Kadett C GTE',            class: 'Historic_RWD' },
        { id: 'wrc_talbot_sunbeam_lotus',  name: 'Talbot Sunbeam Lotus',         class: 'Historic_RWD' },
        { id: 'wrc_ford_sierra_rs500',     name: 'Ford Sierra Cosworth RS500',   class: 'Historic_RWD' },
        { id: 'wrc_bmw_m3_evo_rally',      name: 'BMW M3 Evo Rally',             class: 'Historic_RWD' },

        // ─ HISTORIC FWD (70s-80s)
        { id: 'wrc_lancia_fulvia',         name: 'Lancia Fulvia HF',             class: 'Historic_FWD' },
        { id: 'wrc_mini_cooper_s',         name: 'MINI Cooper S',                class: 'Historic_FWD' },
        { id: 'wrc_vauxhall_nova_sport',   name: 'Vauxhall Nova Sport',          class: 'Historic_FWD' },
        { id: 'wrc_peugeot_205_gti',       name: 'Peugeot 205 GTI',              class: 'Historic_FWD' },
        { id: 'wrc_peugeot_309_gti',       name: 'Peugeot 309 GTI',              class: 'Historic_FWD' },
        { id: 'wrc_vw_golf_gti',           name: 'Volkswagen Golf GTI',          class: 'Historic_FWD' },

        // ─ H3 (RWD Historic Premium)
        { id: 'wrc_ford_escort_mcrae',     name: 'Ford Escort Mk II McRae Motorsport', class: 'H3_RWD' },
        { id: 'wrc_renault_5_turbo',       name: 'Renault 5 Turbo',              class: 'H3_RWD' },
    ],

    // ── RACEROOM ───────────────────────────────────────────────────────────
    rrre: [
        { id: 'rrre_amr_gt3',    name: 'Aston Martin Vantage GT3',   class: 'GT3' },
        { id: 'rrre_amg_gt3',    name: 'Mercedes-AMG GT3',           class: 'GT3' },
        { id: 'rrre_bmw_m4',     name: 'BMW M4 GT3',                  class: 'GT3' },
        { id: 'rrre_porsche_991', name: 'Porsche 911 GT3 R',         class: 'GT3' },
        { id: 'rrre_ferrari_458', name: 'Ferrari 458 GT3',            class: 'GT3' },
        { id: 'rrre_formula_x',   name: 'Formula Rookie',              class: 'Formula' },
        { id: 'rrre_formula_v8',  name: 'Formula V8',                  class: 'Formula' },
        { id: 'rrre_gtsx',        name: 'GT SX',                       class: 'GT' },
        { id: 'rrre_dtm_amg',     name: 'DTM Mercedes-AMG',           class: 'Touring' },
        { id: 'rrre_dtm_audia4',  name: 'DTM Audi A4',               class: 'Touring' },
        { id: 'rrre_dtm_bmw_m3',  name: 'DTM BMW M3',                 class: 'Touring' },
    ],

    // ── PROJECT CARS 2 ────────────────────────────────────────────────────
    pc2: [
        { id: 'pc2_amg_gt3',    name: 'Mercedes-AMG GT3',             class: 'GT3' },
        { id: 'pc2_bmw_m6',     name: 'BMW M6 GT3',                   class: 'GT3' },
        { id: 'pc2_ferrari_488', name: 'Ferrari 488 GT3',             class: 'GT3' },
        { id: 'pc2_lambo_h',    name: 'Lamborghini Huracán GT3',       class: 'GT3' },
        { id: 'pc2_mclaren_650s', name: 'McLaren 650S GT3',          class: 'GT3' },
        { id: 'pc2_porsche_991', name: 'Porsche 911 GT3 R',          class: 'GT3' },
        { id: 'pc2_amr_vantage', name: 'Aston Martin Vantage GT3',    class: 'GT3' },
        { id: 'pc2_nissan_gt_r', name: 'Nissan GT-R Nismo GT3',       class: 'GT3' },
        { id: 'pc2_formula_r',   name: 'Formula R',                    class: 'Formula' },
        { id: 'pc2_formula_rf',  name: 'Formula Renault',             class: 'Formula' },
        { id: 'pc2_indycar',     name: 'IndyCar',                     class: 'OpenWheel' },
        { id: 'pc2_gt3_m4',      name: 'BMW M4 GT3',                  class: 'GT3' },
        { id: 'pc2_gt3_r8',      name: 'Audi R8 LMS GT3',             class: 'GT3' },
        { id: 'pc2_pcx_gt4',     name: 'Porsche Cayman GT4',          class: 'GT4' },
    ],

    // ── NASCAR 21 ──────────────────────────────────────────────────────────
    nascar: [
        { id: 'nascar_c7_corvette', name: 'Chevrolet Corvette C7.R',  class: 'NASCAR' },
        { id: 'nascar_c7_camaro',    name: 'Chevrolet Camaro SS',     class: 'NASCAR' },
        { id: 'nascar_c7_mustang',   name: 'Ford Mustang GT',         class: 'NASCAR' },
        { id: 'nascar_nextgen_c',    name: 'Chevrolet Camaro SS',     class: 'NASCAR' },
        { id: 'nascar_nextgen_m',    name: 'Ford Mustang GT',         class: 'NASCAR' },
        { id: 'nascar_nextgen_t',    name: 'Toyota Camry',            class: 'NASCAR' },
        { id: 'nascar_xtreme',       name: 'NASCAR Rockstar Energy Drink', class: 'NASCAR' },
    ],

    // ── KARTRRAFT ──────────────────────────────────────────────────────────
    kart: [
        { id: 'kart_sodix',       name: 'Sodi kart',            class: 'Kart' },
        { id: 'kart_tony',        name: 'Tony Kart',           class: 'Kart' },
        { id: 'kart_birel',       name: 'Birel Art',          class: 'Kart' },
        { id: 'kart_rossi',       name: 'Birel Art Rossi',    class: 'Kart' },
        { id: 'kart_officina',    name: 'Officina Kart',      class: 'Kart' },
        { id: 'kart_parilla',     name: 'Parilla IX',         class: 'Kart' },
        { id: 'kart_arrow',       name: 'Arrow GT',           class: 'Kart' },
        { id: 'kart_italia',      name: 'Italkart',          class: 'Kart' },
    ],

    // ── RENNSPORT ─────────────────────────────────────────────────────────
    rennsport: [
        { id: 'rs_amr_vantage',   name: 'Aston Martin Vantage GT3',  class: 'GT3' },
        { id: 'rs_amg_gt3',       name: 'Mercedes-AMG GT3',          class: 'GT3' },
        { id: 'rs_bmw_m4',        name: 'BMW M4 GT3',                  class: 'GT3' },
        { id: 'rs_porsche_991',   name: 'Porsche 911 GT3 R',         class: 'GT3' },
        { id: 'rs_ferrari_488',   name: 'Ferrari 488 GT3',           class: 'GT3' },
        { id: 'rs_mclaren_720s',  name: 'McLaren 720S GT3',          class: 'GT3' },
        { id: 'rs_formula',       name: 'Formula R',                   class: 'Formula' },
    ],

    // ── CIRCUIT SUPERSTARS ────────────────────────────────────────────────
    circuit: [
        { id: 'cs_radical',        name: 'Radical RXC',              class: 'Open' },
        { id: 'cs_lotus_f1',       name: 'Lotus F1',                 class: 'Open' },
        { id: 'cs_ginetta_g55',    name: 'Ginetta G55',              class: 'GT' },
        { id: 'cs_kTM_xbow',       name: 'KTM X-Bow',                class: 'GT' },
        { id: 'cs_toyota_86',      name: 'Toyota 86',                class: 'Street' },
        { id: 'cs_honda_s2000',    name: 'Honda S2000',              class: 'Street' },
        { id: 'cs_nissan_370z',    name: 'Nissan 370Z',              class: 'Street' },
        { id: 'cs_formula_vee',    name: 'Formula Vee',              class: 'Formula' },
        { id: 'cs_formula_f1600',  name: 'Formula 1600',             class: 'Formula' },
    ],

    // ── LIVE FOR SPEED ───────────────────────────────────────────────────
    lfs: [
        { id: 'lfs_xrt',           name: 'XRT',                       class: 'GT' },
        { id: 'lfs_fxr',           name: 'FXR',                       class: 'GT' },
        { id: 'lfs_mesa',          name: 'Mesa',                     class: 'GT' },
        { id: 'lfs_uf1000',        name: 'UF 1000',                 class: 'Formula' },
        { id: 'lfs_fz50',          name: 'FZ50',                     class: 'Formula' },
        { id: 'lfs_laprus',        name: 'LaPruus',                  class: 'Production' },
        { id: 'lfs_gti',           name: 'Golf GTI',                 class: 'Production' },
        { id: 'lfs_fo',            name: 'FO',                       class: 'Production' },
    ],

    // ── GRAN TURISMO SPORT ───────────────────────────────────────────────
    gts: [
        { id: 'gts_gr1_vgt',       name: 'Gr.1 - Vision GT',               class: 'Gr.1' },
        { id: 'gts_gr1_918',       name: 'Gr.1 - Porsche 918 RSR',         class: 'Gr.1' },
        { id: 'gts_gr3_supra',     name: 'Gr.3 - Toyota Supra GT500',       class: 'Gr.3' },
        { id: 'gts_gr3_nismo',     name: 'Gr.3 - Nissan GT-R Nismo',       class: 'Gr.3' },
        { id: 'gts_gr4_megane',    name: 'Gr.4 - Renault Megane Trophy',   class: 'Gr.4' },
        { id: 'gts_gr4_a45',       name: 'Gr.4 - Mercedes-AMG A45',      class: 'Gr.4' },
        { id: 'gts_grb_quattro',   name: 'Gr.B - Audi Quattro',            class: 'Gr.B' },
        { id: 'gts_formula',       name: 'Formula Sport',                   class: 'Formula' },
        { id: 'gts_street_nsx',   name: 'Street - Honda NSX',             class: 'Street' },
        { id: 'gts_street_supra', name: 'Street - Toyota GR Supra',      class: 'Street' },
        { id: 'gts_nurb_gs',       name: 'Gr.3 - Mercedes-AMG GT3',       class: 'Gr.3' },
        { id: 'gts_lmpe',          name: 'LMP Epsilon',                   class: 'LMP' },
    ],

};
