import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import type { Locale } from '../content';
import { trackEvent } from '../analytics';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);
const LOCALE_STORAGE_KEY = 'internship-companion-locale';

type LocaleProviderProps = PropsWithChildren<unknown>;

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') {
      return 'en';
    }
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return stored === 'sv' || stored === 'en' ? (stored as Locale) : 'en';
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale: (next: Locale) => {
        if (next !== locale) {
          trackEvent('language_changed', { locale: next });
        }
        setLocaleState(next);
      }
    }),
    [locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale måste användas inom LocaleProvider');
  }
  return context;
};
