import { useLocale } from '../i18n/LocaleContext';

const LanguageSwitcher = () => {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs text-slate-500">
      <button
        type="button"
        className={`font-semibold ${locale === 'sv' ? 'text-primary' : ''}`}
        onClick={() => setLocale('sv')}
      >
        Svenska
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        className="cursor-not-allowed text-slate-400"
        onClick={() => setLocale('en')}
        title="Engelsk version kommer snart"
      >
        English
      </button>
    </div>
  );
};

export default LanguageSwitcher;
