import ThemeToggle from '@scripts/modules/theme-toggle';
import TranslationService from '@scripts/modules/translation-service';
import LanguageSwitcher from '@scripts/modules/language-switcher';
import ConsoleLogger from '@scripts/utils/console-logger';
import en from '../i18n/en.json';
import uk from '../i18n/uk.json';

(function () {
  const logger = new ConsoleLogger();
  logger.success('common.js successfully initialized and is now active!');

  const locales = {en, uk};
  const translationService = new TranslationService(locales, 'en');
  translationService.init();

  const languageSwitcher = new LanguageSwitcher(translationService, 'languageSwitcher');

  document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = new ThemeToggle();
    languageSwitcher.init();
  });
})();

