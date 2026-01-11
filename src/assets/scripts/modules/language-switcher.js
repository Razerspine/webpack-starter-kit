export default class LanguageSwitcher {
  constructor(translationService) {
    this.translationService = translationService;
  }

  init() {
    document.querySelectorAll('[data-lang]').forEach(btn => {
      console.log(btn);
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        console.log(lang);
        localStorage.setItem('lang', lang);
        this.translationService.setLanguage(lang);
      });
    });
  }
}
