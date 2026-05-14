# SimRacing Vault

**Tu bóveda personal para guardar y gestionar setups de SimRacing con precisión de competición.**

## 📋 Características

- ✅ **Multi-game support**: Assetto Corsa Competizione (ACC), F1 24, Gran Turismo 7, iRacing
- ✅ **Car-specific overrides**: Rangos verificados y ajustados por modelo de coche
- ✅ **Setup templates**: 5 tabs reales del juego (Tyres, Mechanical Grip, Dampers, Aero, Electronics)
- ✅ **Import/Export**: Guardar y compartir setups en JSON
- ✅ **Voice notes**: Grabar notas sobre el setup
- ✅ **OCR integration**: Importar setups desde screenshots (Tesseract.js)
- ✅ **Setup comparison**: Comparar dos setups lado a lado
- ✅ **Telemetry preview**: Estadísticas y visualización
- ✅ **Community hub**: Compartir y descubrir setups
- ✅ **Version history**: Undo/redo para cambios

## 🚀 Quick Start

```bash
# Instalar dependencias
npm install

# Iniciar dev server
npm run dev
# Abre http://localhost:5173

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🏗️ Arquitectura

Ver [ARCHITECTURE.md](./ARCHITECTURE.md) para detalles completos.

**Stack:**
- **Frontend**: Vite + Vanilla JS + CSS
- **Storage**: localStorage (IndexedDB en futuro)
- **Icons**: Lucide
- **Build**: Vite 8.x
- **No frameworks**: React/Vue/Angular — código vanilla puro

## 📦 Dependencias

| Paquete | Propósito |
|---------|-----------|
| `vite` | Build tool |
| `lucide` | Icon library |
| `lucide-static` | SVG icons |
| `tesseract.js` | OCR (cargado en HTML) |
| `qrcode-generator` | QR codes (cargado en HTML) |

## 🎮 Juegos Soportados

| Juego | Coches | Overrides | Estado |
|-------|--------|-----------|--------|
| **ACC** | 34 (20 GT3, 11 GT4, 3 GTC) | ✅ 70% verificados | Producción |
| **F1 24** | 10 | ⚠️ Stub | En desarrollo |
| **GT7** | N/A | ⚠️ Stub | En desarrollo |
| **iRacing** | N/A | ⚠️ Stub | En desarrollo |

## 📝 Setup Structure

Cada setup contiene:
```json
{
  "id": "setup-uuid",
  "gameId": "acc",
  "gameName": "Assetto Corsa Competizione",
  "carId": "ferrari_296_gt3",
  "carName": "Ferrari 296 GT3 (2023)",
  "track": "Spa",
  "weatherType": "dry",
  "sessionType": "Race",
  "setupName": "Ferrari 296 @ Spa Dry Race",
  "setupData": { /* parámetros por tab */ },
  "tags": ["spa", "wet", "high-downforce"],
  "notes": "...",
  "createdAt": "2026-05-05T...",
  "updatedAt": "2026-05-05T...",
  "isFavorite": false
}
```

## 🔧 Desarrollo

### Estructura de carpetas
```
src/
├── core/                    # Lógica de negocio
│   ├── templates.js         # Plantillas por juego
│   ├── cars.js              # Catálogo de coches
│   ├── circuits.js          # Catálogo de circuitos
│   ├── setupService.js      # Servicio de setups
│   ├── filters.js           # Filtrado/ordenación
│   ├── utils.js             # Utilidades
│   └── overrides/           # Rangos por coche
│       ├── acc_car_overrides.js
│       ├── f1_car_overrides.js
│       ├── gt7_car_overrides.js
│       └── iracing_car_overrides.js
├── web/                     # Capa de web
│   ├── setupService.js      # Wrapper web
│   ├── storage.js           # Abstracción storage
│   └── localStorageSetupRepository.js
└── style.css
main.js                       # Punto de entrada (1700 líneas — REFACTORIZAR)
index.html                    # HTML principal
```

### Testing
```bash
# TODO: Agregar tests
# npm run test        — unit + integration
# npm run test:e2e    — E2E con Playwright
```

## 🐛 Conocidos Issues

- [ ] main.js monolítico (1700 líneas) — refactorizar en módulos
- [ ] Sin error handling en async operations
- [ ] localStorage sin límite de almacenamiento (5-10MB límite)
- [ ] Sin pagination en dashboard (degrade con 1000+ setups)
- [ ] XSS risk — innerHTML sin sanitización
- [ ] Sin testing (unit/integration/E2E)
- [ ] Sin accesibilidad (ARIA labels, keyboard nav)

## 🔐 Seguridad

- ✅ Datos en localStorage (local al navegador)
- ✅ Sin secrets en el código
- ⚠️ HTML rendering sin sanitización (DOMPurify recomendado)
- ⚠️ Validación básica (schemas recomendados)

## 📚 Documentación

- [ARCHITECTURE.md](./ARCHITECTURE.md) — Detalles de arquitectura
- [CONTRIBUTING.md](./CONTRIBUTING.md) — Guía para contribuidores (TODO)
- Memory files en `.claude/memory/` — Contexto del proyecto

## 📈 Roadmap

- [ ] **Phase 1**: Completar overrides (F1/GT7/iRacing)
- [ ] **Phase 2**: Refactorizar main.js + agregar tests
- [ ] **Phase 3**: IndexedDB para mejor performance
- [ ] **Phase 4**: Mobile app (React Native)
- [ ] **Phase 5**: Backend + Cloud sync
- [ ] **Phase 6**: Marketplace de setups

## 🤝 Contribuir

Ver [CONTRIBUTING.md](./CONTRIBUTING.md)

## 📄 License

Privado (por ahora)

---

**Última actualización**: 2026-05-05  
**Versión**: 0.0.0-alpha  
**Estado**: 🚧 En desarrollo activo
