import Accordion from '../components/Accordion';
import Hero from '../components/Hero';
import { getFaqItems, getHeroContent } from '../content';
import { useLocale } from '../i18n/LocaleContext';
import type { Locale } from '../content';
import { siteShellClassName } from '../siteConfig';

type FaqCopy = {
  description: string;
};

const faqCopyByLocale: Record<Locale, FaqCopy> = {
  sv: {
    description:
      'Här samlar vi de vanligaste frågorna från LIA-studenter. Säg till om något saknas så fyller vi på.'
  },
  en: {
    description:
      'These are the questions we hear most from internship students. Let us know if something is missing and we will add it.'
  }
};

const FaqPage = () => {
  const { locale } = useLocale();
  const faqItems = getFaqItems(locale);
  const hero = getHeroContent(locale);
  const copy = faqCopyByLocale[locale] ?? faqCopyByLocale.sv;

  return (
    <div className="flex flex-1 flex-col bg-surface text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Hero
        {...hero}
        primaryHref="/plan"
        secondaryHref="/resources"
      />
      <main className={`${siteShellClassName} flex flex-1 flex-col gap-8 py-16`}>
        <section className="rounded-3xl bg-white p-8 shadow-card dark:bg-slate-900">
          <p className="text-sm text-slate-600 dark:text-slate-300">{copy.description}</p>
        </section>
        <section className="rounded-3xl bg-white p-8 shadow-card dark:bg-slate-900">
          <Accordion items={faqItems} />
        </section>
      </main>
    </div>
  );
};

export default FaqPage;
