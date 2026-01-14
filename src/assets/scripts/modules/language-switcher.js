/**
 * LanguageSwitcher coordinates a <select> element with a translation service
 * and persists the chosen language to localStorage.
 *
 * @example
 * // translationService must implement getCurrentLang(): string and setLanguage(lang: string): void
 * const languageSwitcher = new LanguageSwitcher(translationService, 'languageSwitcher');
 * languageSwitcher.init();
 *
 * @param {Object} translationService - Must implement getCurrentLang() and setLanguage(lang)
 * @param {string} [selectId='languageSwitcher'] - DOM id of the <select> element
 */
export default class LanguageSwitcher {
  static STORAGE_KEY = 'lang';

  /**
   * Create a LanguageSwitcher instance
   * @param {Object} translationService - object with getCurrentLang() and setLanguage(lang)
   * @param {string} [selectId='languageSwitcher'] - id of the <select> element to bind
   */
  constructor(translationService, selectId = 'languageSwitcher') {
    if (!translationService) throw new Error('translationService is required');

    /** @private @readonly {Object} */
    this.translationService = translationService;

    /** @private @readonly {string} */
    this.selectId = selectId;

    /** @private {?HTMLSelectElement} */
    this.select = null;

    // bound event handler so it can be removed later
    this._onChange = this._onChange.bind(this);
  }

  /**
   * Initialize the switcher: find the select, apply saved language and attach listener
   * @public
   */
  init() {
    this.select = document.getElementById(this.selectId);
    if (!this.select) {
      const currentLang = this.translationService.getCurrentLang();
      this.translationService.setLanguage(currentLang);
      console.warn(`LanguageSwitcher: select '#${this.selectId}' not found in DOM`);
      return;
    }

    this.applySavedLanguage();
    this.select.addEventListener('change', this._onChange);
  }

  /**
   * Clean up event listeners and references
   * @public
   */
  destroy() {
    if (this.select) {
      this.select.removeEventListener('change', this._onChange);
      this.select = null;
    }
  }

  /**
   * Apply saved language from storage or translationService current language
   * @public
   */
  applySavedLanguage() {
    const saved = this._getSavedLang() || this.translationService.getCurrentLang();
    if (!saved) return;

    const optionExists = this.select && Array.from(this.select.options).some(opt => opt.value === saved);
    if (optionExists) {
      this._setSelectValue(saved);
      try {
        this.translationService.setLanguage(saved);
      } catch {
        // silently ignore service errors
      }
    }
  }

  /**
   * Programmatically set language
   * @param {string} lang - language code to set
   * @public
   */
  setLanguage(lang) {
    if (!lang) return;

    const optionExists = this.select && Array.from(this.select.options).some(opt => opt.value === lang);
    if (optionExists) {
      this._setSelectValue(lang);
      this._saveLang(lang);
      try {
        this.translationService.setLanguage(lang);
      } catch {
        // silently ignore service errors
      }
    } else {
      // persist and attempt to apply even if select doesn't contain the option
      this._saveLang(lang);
      try {
        this.translationService.setLanguage(lang);
      } catch {
        // silently ignore service errors
      }
    }
  }

  /**
   * Internal change handler for the select element
   * @param {Event} event
   * @private
   */
  _onChange(event) {
    const lang = event?.target?.value;
    if (!lang) return;

    this._saveLang(lang);
    try {
      this.translationService.setLanguage(lang);
    } catch {
      // silently ignore service errors
    }
  }

  /**
   * Set the select element value safely
   * @param {string} value
   * @private
   */
  _setSelectValue(value) {
    if (!this.select) return;
    this.select.value = value;
  }

  /**
   * Read saved language from localStorage with safe fallback
   * @returns {string|null}
   * @private
   */
  _getSavedLang() {
    try {
      return localStorage.getItem(LanguageSwitcher.STORAGE_KEY);
    } catch {
      return null;
    }
  }

  /**
   * Save language to localStorage with safe fallback
   * @param {string} lang
   * @private
   */
  _saveLang(lang) {
    try {
      localStorage.setItem(LanguageSwitcher.STORAGE_KEY, lang);
    } catch {
      // ignore storage errors (e.g., privacy mode)
    }
  }
}
