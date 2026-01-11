import ThemeToggle from '@scripts/modules/theme-toggle';
import TranslationService from '@scripts/modules/translation-service';
import LanguageSwitcher from '@scripts/modules/language-switcher';

(function () {
  console.log('init common.js');

  document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = new ThemeToggle({
      buttonSelector: '#themeToggle',
      iconSelector: '.button-icon',
      dataAttribute: 'data-theme',
      storageKey: 'theme',
    });
    const translationService = new TranslationService();
    translationService.init();

    const languageSwitcher = new LanguageSwitcher(translationService);
    languageSwitcher.init();
  });
})();

