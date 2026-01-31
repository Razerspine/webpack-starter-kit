import ThemeService from '@scripts/modules/theme-service';
import TranslationService from '@scripts/modules/translation-service';
import ConsoleLogger from '@scripts/utils/console-logger';
import en from '../i18n/en.json';
import uk from '../i18n/uk.json';

(function () {
  const logger = new ConsoleLogger();
  const locales = {en, uk};
  const translationService = new TranslationService(locales, 'en');
  const themeService = new ThemeService({storageKey: 'theme', autoApply: true});

  logger.success('app.js successfully initialized and is now active!');

  document.addEventListener('DOMContentLoaded', () => {
    translationService.init();
    themeService.init();

    const select = document.getElementById('languageSwitcher');

    if (select) {
      select.value = translationService.getCurrentLang();
      select.addEventListener('change', (e) => {
        const lang = e.target.value;
        translationService.setLanguage(lang);
      });
    }

    const switcher = document.getElementById('themeSwitcher');

    if (!switcher) return;
    const initial = themeService.getTheme() || document.documentElement.getAttribute('data-theme') || 'light';
    const iconSelector = '.button-icon use';

    const setIcon = (theme) => {
      const useEl = switcher.querySelector(iconSelector);
      if (!useEl) return;
      const id = theme === 'dark' ? '#icon-light-mode' : '#icon-dark-mode';
      try {
        useEl.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', id);
        useEl.setAttribute('href', id);
      } catch {
      }
    };

    setIcon(initial);
    switcher.setAttribute('aria-pressed', initial === 'dark' ? 'true' : 'false');

    switcher.addEventListener('click', () => {
      const now = themeService.getTheme() || 'light';
      const next = now === 'dark' ? 'light' : 'dark';
      themeService.setTheme(next);
      setIcon(next);
      switcher.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
    });
  });
})();

