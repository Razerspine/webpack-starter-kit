import en from '../../i18n/en.json';
import uk from '../../i18n/uk.json';

export default class TranslationService {
  constructor(defaultLang = 'en') {
    this.locales = {en, uk};
    this.currentLang = defaultLang;
    this.translations = this.locales[defaultLang];
  }

  init() {
    const savedLang = localStorage.getItem('lang');
    const lang = savedLang || this.currentLang;
    this.setLanguage(lang);
  }

  setLanguage(lang) {
    if (this.locales[lang]) {
      this.translations = this.locales[lang];
      this.currentLang = lang;
    } else {
      console.warn(`No translations for ${lang}, fallback to EN`);
      this.translations = this.locales.en;
      this.currentLang = 'en';
    }
    this.applyTranslations();
  }

  getTranslationKey(path) {
    return path.split('.').reduce((obj, key) => {
      return obj && obj[key] !== undefined ? obj[key] : null;
    }, this.translations) || `${path}`;
  }

  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      el.textContent = this.getTranslationKey(key);
    });
  }

  getCurrentLang() {
    return this.currentLang;
  }
}
