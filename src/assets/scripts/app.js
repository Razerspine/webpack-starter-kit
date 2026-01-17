import ThemeToggle from '@scripts/modules/theme-toggle';
import TranslationService from '@scripts/modules/translation-service';
import LanguageSwitcher from '@scripts/modules/language-switcher';
import ConsoleLogger from '@scripts/utils/console-logger';
import en from '../i18n/en.json';
import uk from '../i18n/uk.json';

(function () {
  const logger = new ConsoleLogger();
  const locales = {en, uk};
  const translationService = new TranslationService(locales, 'en');
  const languageSwitcher = new LanguageSwitcher(translationService, 'languageSwitcher');

  logger.success('app.js successfully initialized and is now active!');

  document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = new ThemeToggle();
    translationService.init();
    languageSwitcher.init();
  });
})();

