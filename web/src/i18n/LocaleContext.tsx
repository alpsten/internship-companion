import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import type { Locale } from '../content';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export const LocaleProvider = ({ children }: PropsWithChildren) => {
  const [locale, setLocaleState] = useState<Locale>('sv');

  const setLocale = (next: Locale) => {
    if (next !== 'sv') {
      console.warn('Engelsk version kommer snart.');
    }
    setLocaleState(next);
  };

  const value = useMemo(
    () => ({
      locale,
      setLocale
    }),
    [locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale måste användas inom LocaleProvider');
  }
  return context;
};
