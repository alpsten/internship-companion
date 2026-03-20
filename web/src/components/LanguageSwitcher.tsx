import { useLocale } from '../i18n/LocaleContext';

const languageCopy = {
  sv: {
    groupLabel: 'Språk',
    englishAria: 'Byt språk till engelska',
    swedishAria: 'Byt språk till svenska'
  },
  en: {
    groupLabel: 'Language',
    englishAria: 'Switch language to English',
    swedishAria: 'Switch language to Swedish'
  }
} as const;

const LanguageSwitcher = () => {
  const { locale, setLocale } = useLocale();
  const copy = languageCopy[locale] ?? languageCopy.en;

  return (
    <div className="control-group" role="group" aria-label={copy.groupLabel}>
      <button
        type="button"
        className={`control-segment ${locale === 'en' ? 'control-segment-active' : ''}`}
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        aria-label={copy.englishAria}
      >
        EN
      </button>
      <button
        type="button"
        className={`control-segment ${locale === 'sv' ? 'control-segment-active' : ''}`}
        onClick={() => setLocale('sv')}
        aria-pressed={locale === 'sv'}
        aria-label={copy.swedishAria}
      >
        SV
      </button>
    </div>
  );
};

export default LanguageSwitcher;
