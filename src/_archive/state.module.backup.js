/**
 * Global application state
 * IMPORTANT: Migrate to Context/Store pattern in future refactoring
 */

export const appState = {
  // Auth
  isAuthenticated: false,

  // Editor
  editingSetupId: null,
  activeTabId: null,
  _tabData: {},

  // Filters & Sort
  sortBy: 'updatedAt_desc',
  currentFilters: {},

  // Overrides
  _activeOverride: null,

  // Features (orthogonal)
  _compareSetups: new Set(),
  _telemetrySetupId: null,
  _telemetryVisible: false,
  _communityVisible: false,

  // Reset for new session
  reset() {
    this.editingSetupId = null;
    this.activeTabId = null;
    this._tabData = {};
    this._activeOverride = null;
  },

  // Reset for new editor
  resetEditor() {
    this._tabData = {};
    this._activeOverride = null;
    this.activeTabId = null;
  }
};

/**
 * Get DOM elements (cached)
 */
export const dom = {
  // Auth & app views
  get authView() { return document.getElementById('auth-view'); },
  get appView() { return document.getElementById('app'); },

  // Main selects
  get gameSelect() { return document.getElementById('game-select'); },
  get setupForm() { return document.getElementById('setup-form'); },

  // Dynamic content areas
  get dynamicTabs() { return document.getElementById('dynamic-tabs'); },
  get dynamicParams() { return document.getElementById('dynamic-params'); },
  get notesSection() { return document.getElementById('notes-section'); },

  // Dashboard
  get setupsGrid() { return document.getElementById('setups-grid'); },
  get dashboardView() { return document.getElementById('dashboard'); },
  get statsInfo() { return document.getElementById('stats-info'); },

  // Editor
  get editorView() { return document.getElementById('setup-editor'); },
  get editorTitle() { return document.getElementById('editor-title'); },

  // Car selects
  get carSelectAcc() { return document.getElementById('car-select-acc'); },
  get carSelectF1() { return document.getElementById('car-select-f1'); },
  get carSelectGt7() { return document.getElementById('car-select-gt7'); },
  get carSelectIracing() { return document.getElementById('car-select-iracing'); },
  get carName() { return document.getElementById('car-name'); },
  get carSuggestions() { return document.getElementById('car-suggestions'); },
  get carOverrideStatus() { return document.getElementById('car-override-status'); },

  // Setup form fields
  get setupName() { return document.getElementById('setup-name'); },
  get trackName() { return document.getElementById('track-name'); },
  get weatherSelect() { return document.getElementById('weather-select'); },
  get sessionSelect() { return document.getElementById('session-select'); },
  get setupTags() { return document.getElementById('setup-tags'); },
  get setupNotes() { return document.getElementById('setup-notes'); },
  get setupRating() { return document.getElementById('setup-rating'); },
  get ratingStars() { return document.getElementById('rating-stars'); },
  get setupGameVersion() { return document.getElementById('setup-game-version'); },
  get setupPlatform() { return document.getElementById('setup-platform'); },
  get setupPublic() { return document.getElementById('setup-public'); },

  // Dashboard filters
  get searchInput() { return document.getElementById('search-input'); },
  get filterGame() { return document.getElementById('filter-game'); },
  get filterWeather() { return document.getElementById('filter-weather'); },
  get filterFavorite() { return document.getElementById('filter-favorite'); },
  get sortSelect() { return document.getElementById('sort-select'); },

  // Action buttons
  get newSetup() { return document.getElementById('new-setup'); },
  get backBtn() { return document.getElementById('back-btn'); },
  get importBtn() { return document.getElementById('import-btn'); },
  get exportBtn() { return document.getElementById('export-btn'); },
  get compareBtn() { return document.getElementById('compare-btn'); },
  get telemetryBtn() { return document.getElementById('telemetry-btn'); },
  get communityBtn() { return document.getElementById('community-btn'); },
  get exportPdfBtn() { return document.getElementById('export-pdf-btn'); },
  get shareQrBtn() { return document.getElementById('share-qr-btn'); },
  get importOcrBtn() { return document.getElementById('import-ocr-btn'); },
  get versionHistoryBtn() { return document.getElementById('version-history-btn'); },
  get voiceNoteBtn() { return document.getElementById('voice-note-btn'); },

  // Auth buttons
  get loginGoogle() { return document.getElementById('login-google'); },
  get loginApple() { return document.getElementById('login-apple'); },
};

/**
 * Helper: get element by ID
 */
export const $(id) => document.getElementById(id);
