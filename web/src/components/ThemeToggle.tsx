import { useTheme } from '../theme/ThemeContext';
import { useLocale } from '../i18n/LocaleContext';

const themeCopy = {
  sv: {
    groupLabel: 'Tema',
    light: 'Ljust',
    dark: 'Mörkt',
    lightAria: 'Byt till ljust tema',
    darkAria: 'Byt till mörkt tema'
  },
  en: {
    groupLabel: 'Theme',
    light: 'Light',
    dark: 'Dark',
    lightAria: 'Switch to light mode',
    darkAria: 'Switch to dark mode'
  }
} as const;

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const { locale } = useLocale();
  const copy = themeCopy[locale] ?? themeCopy.en;

  return (
    <div className="control-group" role="group" aria-label={copy.groupLabel}>
      <button
        type="button"
        aria-pressed={theme === 'light'}
        aria-label={copy.lightAria}
        onClick={() => setTheme('light')}
        className={`control-segment ${theme === 'light' ? 'control-segment-active' : ''}`}
      >
        {copy.light}
      </button>
      <button
        type="button"
        aria-pressed={theme === 'dark'}
        aria-label={copy.darkAria}
        onClick={() => setTheme('dark')}
        className={`control-segment ${theme === 'dark' ? 'control-segment-active' : ''}`}
      >
        {copy.dark}
      </button>
    </div>
  );
};

export default ThemeToggle;
