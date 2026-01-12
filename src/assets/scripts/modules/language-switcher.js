export default class LanguageSwitcher {
  constructor(translationService, selectId = 'languageSwitcher') {
    this.translationService = translationService;
    this.selectId = selectId;
    this.select = null;
  }

  init() {
    this.select = document.getElementById(this.selectId);
    if (!this.select) return;

    const saved = localStorage.getItem('lang') || this.translationService.getCurrentLang();
    if (saved) {
      const optionExists = Array.from(this.select.options).some(opt => opt.value === saved);
      if (optionExists) {
        this.select.value = saved;
        this.translationService.setLanguage(saved);
      }
    }

    this.select.addEventListener('change', (event) => {
      const lang = event.target.value;
      if (!lang) return;
      localStorage.setItem('lang', lang);
      this.translationService.setLanguage(lang);
    });
  }
}
