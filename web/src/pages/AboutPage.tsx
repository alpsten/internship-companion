import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Locale } from '../content';
import { useLocale } from '../i18n/LocaleContext';
import { repoDocsBaseUrl, siteConfig, siteShellClassName } from '../siteConfig';

type DocCard = {
  title: string;
  description: string;
  href?: string;
};

type AboutCopy = {
  heroBadge: string;
  heroTitle: ReactNode;
  heroDescription: string;
  whyTitle: string;
  whyParagraphs: string[];
  leadershipTitle: string;
  leadershipParagraphs: ReactNode[];
  documentationTitle: string;
  documentationIntro: string;
  documentationSteps: string[];
  docTag: string;
  docCards: DocCard[];
  docCta: string;
  docPlaceholderCta: string;
  contributeTitle: string;
  contributeParagraph: ReactNode;
  explorePlanCta: string;
  backHomeCta: string;
};

const aboutCopy: Record<Locale, AboutCopy> = {
  sv: {
    heroBadge: 'Om projektet',
    heroTitle: (
      <>
        Hjälper LIA-studenter hitta fokus, momentum och det avgörande{' '}
        <span className="italic">ja</span>.
      </>
    ),
    heroDescription:
      `${siteConfig.name} är ett ideellt driv som samlar guider, mallar och verktyg för att göra praktikjakten tydlig och mänsklig. Vi bygger öppet – allt innehåll och all kod finns här i repositoriet.`,
    whyTitle: 'Varför vi bygger',
    whyParagraphs: [
      'Många svenska utvecklarstudenter beskriver LIA-perioden som stressig och spretig. Genom att bryta ner processen i tydliga steg och erbjuda språk-anpassade mallar vill vi skapa en trygg kompanjon som gör det enkelt att ta nästa mikro-steg.',
      'Projektet utgår från principerna i produktbriefen: struktur, professionalitet och empati. Allt vi publicerar ska ge konkret värde inom några minuter.'
    ],
    leadershipTitle: 'Ledarskap & beslutsvägar',
    leadershipParagraphs: [
      <>
        Skapat, byggt och underhållet av{' '}
        <a className="text-primary underline" href={siteConfig.ownerUrl}>
          {siteConfig.ownerName}
        </a>
        . Förändringar som påverkar struktur, innehållsmodell eller publiceringsflöde ska förankras
        innan implementation.
      </>,
      <>
        Dokumentationen håller på att paketeras för nya contributors. Tills dess: håll ändringar små,
        motiverade och enkla att granska.
      </>
    ],
    documentationTitle: 'Dokumentation i tre steg',
    documentationIntro:
      'De här dokumenten är planerade som onboarding-spår för nya contributors. Vi visar strukturen redan nu, men materialet publiceras löpande.',
    documentationSteps: [
      'Börja med produktbriefen för att förstå mål, målgrupper och hur vi mäter framgång.',
      'Läs content outline för att se hur guider, mallar och downloads mappar mot plan-stegen.',
      'Följ MDX-workflow när du skapar eller uppdaterar resurser i repo:t.'
    ],
    docTag: 'Dokumentation',
    docCards: [
      {
        title: 'Produktbrief',
        description:
          'Målgrupper, kärnresor och MVP-scope. Härifrån hämtar vi storyline och prioriteringar.',
        href: `${repoDocsBaseUrl}/product-brief.md`
      },
      {
        title: 'Content outline',
        description: 'Detaljerad struktur för guider, mallar och downloads som driver resursbiblioteket.',
        href: `${repoDocsBaseUrl}/content-outline.md`
      },
      {
        title: 'MDX-workflow',
        description: 'Steg-för-steg för att lägga till nya resurser, koppla dem till plansteg och publicera.',
        href: `${repoDocsBaseUrl}/mdx-workflow.md`
      }
    ],
    docCta: 'Öppna filen →',
    docPlaceholderCta: 'Kommer snart',
    contributeTitle: 'Bidra eller återkoppla',
    contributeParagraph: (
      <>
        Vi välkomnar förbättringar i både innehåll och kod. För större idéer: synka riktning med teamet
        först. Mindre copy-fixar och tydligt avgränsade förbättringar kan skickas direkt med en kort,
        konkret beskrivning.
      </>
    ),
    explorePlanCta: 'Utforska plan-flödet',
    backHomeCta: 'Till startsidan'
  },
  en: {
    heroBadge: 'About the project',
    heroTitle: (
      <>
        Helping LIA students find focus, momentum, and the crucial <span className="italic">yes</span>.
      </>
    ),
    heroDescription:
      `${siteConfig.name} is a volunteer-driven effort that bundles guides, templates, and tools to make the internship search clear and human. We build in the open—every asset and line of code lives in this repository.`,
    whyTitle: 'Why we are building',
    whyParagraphs: [
      'Many Swedish developer students describe the LIA period as stressful and scattered. By breaking the journey into clear stages and offering language-aware templates, we want to provide a trustworthy companion that makes every next step easier.',
      'The product brief anchors us in structure, professionalism, and empathy. Everything we publish should deliver practical value within minutes.'
    ],
    leadershipTitle: 'Leadership & decisions',
    leadershipParagraphs: [
      <>
        Created, built and maintained by{' '}
        <a className="text-primary underline" href={siteConfig.ownerUrl}>
          {siteConfig.ownerName}
        </a>
        . Changes that affect structure, content modeling, or publishing flow should be aligned before
        implementation.
      </>,
      <>
        The contributor documentation is being packaged for new collaborators. Until then, keep changes
        small, motivated, and easy to review.
      </>
    ],
    documentationTitle: 'Documentation in three steps',
    documentationIntro:
      'These documents are planned as the onboarding path for new contributors. We are showing the structure now and publishing the material step by step.',
    documentationSteps: [
      'Start with the product brief to understand goals, audiences, and how we measure success.',
      'Review the content outline to see how guides, templates, and downloads map to the plan stages.',
      'Follow the MDX workflow whenever you create or update resources in the repo.'
    ],
    docTag: 'Documentation',
    docCards: [
      {
        title: 'Product brief',
        description: 'Targets, journeys, and MVP scope—the storyline behind every decision.',
        href: `${repoDocsBaseUrl}/product-brief.md`
      },
      {
        title: 'Content outline',
        description: 'Detailed structure for guides, templates, and downloads that power the resource library.',
        href: `${repoDocsBaseUrl}/content-outline.md`
      },
      {
        title: 'MDX workflow',
        description: 'Step-by-step instructions for adding resources, linking plan stages, and publishing.',
        href: `${repoDocsBaseUrl}/mdx-workflow.md`
      }
    ],
    docCta: 'Open file →',
    docPlaceholderCta: 'Coming soon',
    contributeTitle: 'Contribute or share feedback',
    contributeParagraph: (
      <>
        We welcome improvements to both copy and code. For larger ideas, align direction with the team
        first. Small copy fixes and clearly scoped improvements can be submitted directly with a short,
        concrete summary.
      </>
    ),
    explorePlanCta: 'Explore the plan flow',
    backHomeCta: 'Back to start'
  }
};

const AboutPage = () => {
  const { locale } = useLocale();
  const copy = aboutCopy[locale] ?? aboutCopy.sv;

  return (
    <div className="bg-surface text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <section className="bg-gradient-to-br from-primary to-accent text-white">
        <div className={`${siteShellClassName} py-16`}>
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            {copy.heroBadge}
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">{copy.heroTitle}</h1>
          <p className="mt-6 max-w-2xl text-white/80">{copy.heroDescription}</p>
        </div>
      </section>

      <main className={`${siteShellClassName} flex flex-col gap-12 py-16`}>
        <section className="grid gap-8 rounded-3xl bg-white p-8 shadow-card dark:bg-slate-900 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {copy.whyTitle}
            </h2>
            {copy.whyParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm text-slate-600 dark:text-slate-300">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="space-y-4 rounded-2xl border border-primary/20 bg-primary/5 p-6 dark:border-primary/30 dark:bg-primary/10">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
              {copy.leadershipTitle}
            </h3>
            {copy.leadershipParagraphs.map((paragraph, index) => (
              <p key={index} className="text-sm text-slate-600 dark:text-slate-300">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section id="documentation" className="space-y-6 rounded-3xl bg-white p-8 shadow-card dark:bg-slate-900">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {copy.documentationTitle}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">{copy.documentationIntro}</p>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
              {copy.documentationSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {copy.docCards.map((card) =>
              card.href ? (
                <a
                  key={card.title}
                  href={card.href}
                  className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-surface p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-950"
                >
                  <div className="space-y-3">
                    <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                      {copy.docTag}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{card.description}</p>
                  </div>
                  <span className="mt-6 text-sm font-semibold text-primary">{copy.docCta}</span>
                </a>
              ) : (
                <article
                  key={card.title}
                  className="flex h-full flex-col justify-between rounded-2xl border border-dashed border-slate-300 bg-surface p-6 shadow-sm dark:border-slate-700 dark:bg-slate-950"
                >
                  <div className="space-y-3">
                    <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                      {copy.docTag}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{card.description}</p>
                  </div>
                  <span className="mt-6 text-sm font-semibold text-slate-500 dark:text-slate-400">
                    {copy.docPlaceholderCta}
                  </span>
                </article>
              )
            )}
          </div>
        </section>

        <section className="rounded-3xl bg-white p-8 shadow-card dark:bg-slate-900">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {copy.contributeTitle}
          </h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{copy.contributeParagraph}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/plan"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-accent"
            >
              {copy.explorePlanCta}
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
            >
              {copy.backHomeCta}
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
