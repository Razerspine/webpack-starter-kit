/**
 * ThemeToggle manages a theme toggle button, persists the chosen theme,
 * and applies it to the document root via a data attribute.
 *
 * - Safe localStorage access with graceful fallback.
 * - Exposes public methods for programmatic control and cleanup.
 *
 * @example
 * // default usage (auto init)
 * const themeToggle = new ThemeToggle();
 *
 * // custom selectors
 * const themeToggle = new ThemeToggle({
 *   buttonSelector: '#themeToggle',
 *   iconSelector: '.button-icon',
 *   dataAttribute: 'data-theme',
 *   storageKey: 'theme'
 * });
 *
 * // programmatic control
 * themeToggle.setTheme('dark');
 * themeToggle.destroy();
 */
export default class ThemeToggle {
  /**
   * Create a ThemeToggle instance.
   * @param {Object} [options] - configuration options
   * @param {string} [options.buttonSelector='#themeToggle'] - selector for the toggle button
   * @param {string} [options.iconSelector='.button-icon'] - selector for the icon inside the button
   * @param {string} [options.dataAttribute='data-theme'] - attribute on root element used to store theme
   * @param {string} [options.storageKey='theme'] - localStorage key for persisted theme
   * @param {boolean} [options.autoInit=true] - whether to call init() automatically
   */
  constructor(
    {
      buttonSelector = '#themeToggle',
      iconSelector = '.button-icon',
      dataAttribute = 'data-theme',
      storageKey = 'theme',
      autoInit = true,
    } = {}
  ) {
    /** @private @readonly {string} */
    this.buttonSelector = buttonSelector;

    /** @private @readonly {string} */
    this.iconSelector = iconSelector;

    /** @private @readonly {string} */
    this.dataAttribute = dataAttribute;

    /** @private @readonly {string} */
    this.storageKey = storageKey;

    /** @private {HTMLElement} */
    this.root = document.documentElement;

    /** @private {?HTMLElement} */
    this.button = null;

    /** @private {Function} */
    this._onClick = this._onClick.bind(this);

    if (autoInit) this.init();
  }

  /**
   * Initialize: find button, apply persisted or preferred theme, attach click listener.
   * Safe to call multiple times.
   * @public
   */
  init() {
    this.button = document.querySelector(this.buttonSelector);

    const theme = this._getInitialTheme();
    this._applyTheme(theme);

    if (!this.button) {
      return;
    }

    this._updateIcon(theme);
    this.button.addEventListener('click', this._onClick);
  }

  /**
   * Remove event listeners and clear references to avoid memory leaks.
   * @public
   */
  destroy() {
    if (this.button) {
      this.button.removeEventListener('click', this._onClick);
    }
    this.button = null;
  }

  /**
   * Toggle handler bound to the button click.
   * Determines next theme, applies it, persists it and updates icon.
   * @private
   */
  _onClick() {
    const current = this.getTheme() || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  /**
   * Determine initial theme:
   * 1. value from localStorage if valid
   * 2. system preference (prefers-color-scheme)
   * 3. fallback to 'light'
   * @returns {'dark'|'light'}
   * @private
   */
  _getInitialTheme() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored === 'dark' || stored === 'light') return stored;
    } catch {
      // localStorage unavailable — fall through to system preference
    }

    const prefersDark = typeof window !== 'undefined'
      && window.matchMedia
      && window.matchMedia('(prefers-color-scheme: dark)').matches;

    return prefersDark ? 'dark' : 'light';
  }

  /**
   * Apply theme to the document root by setting the configured data attribute.
   * @param {'dark'|'light'} theme
   * @private
   */
  _applyTheme(theme) {
    if (!theme) return;
    this.root.setAttribute(this.dataAttribute, theme);
  }

  /**
   * Update the icon inside the button to reflect the current theme.
   * Expects the icon element to accept textContent (e.g., material icons).
   * @param {'dark'|'light'} theme
   * @private
   */
  _updateIcon(theme) {
    if (!this.button) return;
    const icon = this.button.querySelector(this.iconSelector);
    if (!icon) return;
    // swap icon text; adjust to your icon system if needed
    icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
  }

  /**
   * Persist theme to localStorage with safe fallback.
   * @param {'dark'|'light'} theme
   * @private
   */
  _saveTheme(theme) {
    try {
      localStorage.setItem(this.storageKey, theme);
    } catch {
      // ignore storage errors (e.g., privacy mode)
    }
  }

  /**
   * Public: set theme programmatically.
   * Applies theme, updates icon and persists selection.
   * @param {'dark'|'light'} theme
   * @public
   */
  setTheme(theme) {
    if (theme !== 'dark' && theme !== 'light') {
      return;
    }
    this._applyTheme(theme);
    this._saveTheme(theme);
    this._updateIcon(theme);
  }

  /**
   * Public: get currently applied theme from the root attribute.
   * @returns {'dark'|'light'|null}
   * @public
   */
  getTheme() {
    const value = this.root.getAttribute(this.dataAttribute);
    return value === 'dark' || value === 'light' ? value : null;
  }
}
