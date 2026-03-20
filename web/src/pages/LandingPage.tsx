import Hero from '../components/Hero';
import CollaborationBanner from '../components/CollaborationBanner';
import { getGroundRules, getHeroContent, getMindsetMantras } from '../content';
import { useLocale } from '../i18n/LocaleContext';
import type { Locale } from '../content';
import { Link } from 'react-router-dom';
import { siteConfig, siteShellClassName } from '../siteConfig';

type LandingCopy = {
  introTitle: string;
  introDescription: string;
  groundTitle: string;
  groundDescription: string;
  exploreTitle: string;
  exploreDescription: string;
  exploreLinks: Array<{ label: string; to: string }>;
};

const landingCopyByLocale: Record<Locale, LandingCopy> = {
  sv: {
    introTitle: `Varför vi bygger ${siteConfig.name}`,
    introDescription:
      'LIA-jakten känns ofta spretig och stressig. Här hittar du ett lugnt nav som hjälper dig ta nästa steg utan att tappa momentum.',
    groundTitle: 'Våra riktlinjer',
    groundDescription:
      'Reglerna nedan är grunden i hur vi skriver guider, mallar och plansteg. De håller både ton och process fokuserad.',
    exploreTitle: 'Utforska vidare',
    exploreDescription:
      'Använd flikarna i toppen för att gå igenom plan-flödet, plocka resurser eller läsa mer om projektet.',
    exploreLinks: [
      { label: 'Planera LIA', to: '/plan' },
      { label: 'Resurser', to: '/resources' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Om projektet', to: '/about' }
    ]
  },
  en: {
    introTitle: `Why ${siteConfig.name} exists`,
    introDescription:
      'The internship hunt can feel scattered and stressful. This hub keeps things calm, structured, and focused on your next meaningful action.',
    groundTitle: 'Our ground rules',
    groundDescription:
      'Every guide, template, and plan step leans on these principles so the tone stays human and the process stays focused.',
    exploreTitle: 'Where to go next',
    exploreDescription:
      'Use the navigation to explore the planning flow, open the resource library, or learn more about the project.',
    exploreLinks: [
      { label: 'Plan your internship', to: '/plan' },
      { label: 'Resources', to: '/resources' },
      { label: 'FAQ', to: '/faq' },
      { label: 'About the project', to: '/about' }
    ]
  }
};

const LandingPage = () => {
  const { locale } = useLocale();
  const hero = getHeroContent(locale);
  const mantras = getMindsetMantras(locale);
  const groundRules = getGroundRules(locale);
  const copy = landingCopyByLocale[locale] ?? landingCopyByLocale.sv;

  return (
    <div className="flex flex-1 flex-col bg-surface text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Hero
        {...hero}
        primaryHref="/plan"
        secondaryHref="/resources"
      />

      <main className={`${siteShellClassName} flex flex-1 flex-col gap-16 py-16`}>
        <section className="rounded-3xl bg-white p-8 shadow-card dark:bg-slate-900 dark:shadow-card">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{copy.introTitle}</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{copy.introDescription}</p>
          <ul className="mt-6 grid gap-3 text-sm text-slate-700 sm:grid-cols-2 dark:text-slate-200">
            {mantras.map((mantra) => (
              <li
                key={mantra}
                className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 font-medium text-primary dark:border-primary/30 dark:bg-primary/10"
              >
                {mantra}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{copy.groundTitle}</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{copy.groundDescription}</p>
          <ol className="mt-6 space-y-3 text-sm text-slate-700 dark:text-slate-200">
            {groundRules.map((rule, index) => (
              <li key={rule} className="flex gap-3">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {index + 1}
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{copy.exploreTitle}</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{copy.exploreDescription}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {copy.exploreLinks.map((link) => (
              <Link
                key={link.to}
                className="rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10 dark:hover:bg-primary/20"
                to={link.to}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        <CollaborationBanner />
      </main>
    </div>
  );
};

export default LandingPage;
