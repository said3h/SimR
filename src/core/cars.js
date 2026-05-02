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
    dr2: [
        { id: 'dr2_toyota_gr_yaris', name: 'Toyota GR Yaris Rally1',  class: 'Rally1' },
        { id: 'dr2_hyundai_i20',     name: 'Hyundai i20 N Rally1',    class: 'Rally1' },
        { id: 'dr2_ford_puma',       name: 'Ford Puma Rally1',        class: 'Rally1' },
        { id: 'dr2_toyota_gr_supra', name: 'Toyota GR Supra Rally2',  class: 'Rally2' },
        { id: 'dr2_skoda_fabia',     name: 'Skoda Fabia RS Rally2',   class: 'Rally2' },
        { id: 'dr2_hyundai_i20_r5',  name: 'Hyundai i20 R5',         class: 'Rally2' },
        { id: 'dr2_ford_fiesta_r5',  name: 'Ford Fiesta R5',         class: 'Rally2' },
        { id: 'dr2_vw_polo_r5',      name: 'Volkswagen Polo GTI R5', class: 'Rally2' },
        { id: 'dr2_subaru_wrx',      name: 'Subaru WRX STI R4',      class: 'Rally2' },
        { id: 'dr2_4c',              name: 'Alfa Romeo 4C Rally',     class: 'Rally2' },
        { id: 'dr2_a110',            name: 'Alpine A110 Rally',       class: 'Rally4' },
        { id: 'dr2_208',             name: 'Peugeot 208 Rally4',     class: 'Rally4' },
        { id: 'dr2_corsa',           name: 'Opel Corsa Rally4',       class: 'Rally4' },
    ],

    // ── EA SPORTS WRC ─────────────────────────────────────────────────────
    wrc: [
        { id: 'wrc_toyota_gr_yaris', name: 'Toyota GR Yaris Rally1',  class: 'Rally1' },
        { id: 'wrc_hyundai_i20',     name: 'Hyundai i20 N Rally1',    class: 'Rally1' },
        { id: 'wrc_ford_puma',       name: 'Ford Puma Rally1',        class: 'Rally1' },
        { id: 'wrc_crewsport',        name: 'Citroën C3 Rally1',       class: 'Rally1' },
        { id: 'wrc_skoda_fabia',     name: 'Skoda Fabia RS Rally2',   class: 'Rally2' },
        { id: 'wrc_hyundai_i20_r5',  name: 'Hyundai i20 R5',         class: 'Rally2' },
        { id: 'wrc_ford_fiesta_r5',  name: 'Ford Fiesta R5',         class: 'Rally2' },
        { id: 'wrc_vw_polo_r5',      name: 'Volkswagen Polo GTI R5', class: 'Rally2' },
        { id: 'wrc_toyota_gr86',     name: 'Toyota GR86 Rally',       class: 'Rally3' },
        { id: 'wrc_subaru_wrx',      name: 'Subaru WRX STI Rally',   class: 'Rally3' },
        { id: 'wrc_a110',            name: 'Alpine A110 Rally',       class: 'Rally3' },
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
