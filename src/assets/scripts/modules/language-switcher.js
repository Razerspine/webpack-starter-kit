export default class LanguageSwitcher {
  constructor(translationService) {
    this.translationService = translationService;
  }

  init() {
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        localStorage.setItem('lang', lang);
        this.translationService.setLanguage(lang);
      });
    });
  }
}
