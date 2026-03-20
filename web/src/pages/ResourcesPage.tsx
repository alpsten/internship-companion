import { useMemo, useState } from 'react';
import { trackDownload } from '../analytics';
import type { Locale, ResourceType } from '../content';
import { getResourceSummaries, getResourceTypeLabel } from '../content';
import { useLocale } from '../i18n/LocaleContext';
import { resolveAssetUrl, siteShellClassName } from '../siteConfig';

interface ResourcesPageProps {
  onOpenResource: (slug: string, trigger?: HTMLElement | null) => void;
}

type FilterId = 'all' | ResourceType;
type FilterOption = {
  id: FilterId;
  label: string;
};

const filterIds: FilterId[] = ['all', 'Guide', 'Mall', 'Tracker'];

const filterLabelsByLocale: Record<Locale, Record<FilterId, string>> = {
  sv: {
    all: 'Alla resurser',
    Guide: 'Guider',
    Mall: 'Mallar',
    Tracker: 'Trackers'
  },
  en: {
    all: 'All resources',
    Guide: 'Guides',
    Mall: 'Templates',
    Tracker: 'Trackers'
  }
};

const featuredResourceOrder = ['ansokningslogg', 'veckoreflektion'];
const modalOnlyDownloadSlugs = new Set(['company-research-sheet']);

type ResourcesCopy = {
  badge: string;
  heroTitle: string;
  heroDescription: string;
  featuredTitle: string;
  featuredDescription: string;
  featuredPrimaryCta: string;
  libraryTitle: string;
  libraryDescription: string;
  cardPrimaryCta: string;
  emptyMessage: string;
};

const resourcesCopyByLocale: Record<Locale, ResourcesCopy> = {
  sv: {
    badge: 'Resursbank',
    heroTitle: 'Guider, mallar och trackers som hjälper dig i varje steg.',
    heroDescription:
      'Allt innehåll är framtaget utifrån produktbriefen och plan-stegen. Filtrera på typ eller öppna direkt för att läsa i modalen.',
    featuredTitle: 'Ladda ner starter pack',
    featuredDescription:
      'Snabbaste vägen till momentum: tracker och veckoreflektion ger dig struktur från dag ett.',
    featuredPrimaryCta: 'Läs här',
    libraryTitle: 'Utforska biblioteket',
    libraryDescription:
      'Filtrera per kategori eller hoppa direkt in i innehållet. Klicka på ett kort för att öppna resursen i modalen.',
    cardPrimaryCta: 'Läs i modalen',
    emptyMessage: 'Vi jobbar på fler resurser i den här kategorin. Tipsa oss gärna om vad som saknas!'
  },
  en: {
    badge: 'Resource library',
    heroTitle: 'Guides, templates, and trackers for every step.',
    heroDescription:
      'Everything is based on the product brief and plan stages. Filter by type or jump straight into the modal.',
    featuredTitle: 'Download the starter pack',
    featuredDescription:
      'The fastest route to momentum: the tracker and weekly reflection give you structure from day one.',
    featuredPrimaryCta: 'Read here',
    libraryTitle: 'Explore the library',
    libraryDescription:
      'Filter by category or dive straight into the content. Click a card to open the resource in the modal.',
    cardPrimaryCta: 'Read in modal',
    emptyMessage:
      'We are adding more resources to this category soon. Let us know what you would find helpful!'
  }
};

const ResourcesPage = ({ onOpenResource }: ResourcesPageProps) => {
  const { locale } = useLocale();
  const copy = resourcesCopyByLocale[locale] ?? resourcesCopyByLocale.sv;
  const labelMap = filterLabelsByLocale[locale] ?? filterLabelsByLocale.sv;
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');

  const filterOptions = useMemo<FilterOption[]>(
    () => filterIds.map((id) => ({ id, label: labelMap[id] })),
    [labelMap]
  );

  const formatResourceType = (type: ResourceType) => getResourceTypeLabel(type, locale);

  const resources = useMemo(() => getResourceSummaries(locale), [locale]);

  const filteredResources = useMemo(
    () =>
      activeFilter === 'all'
        ? resources
        : resources.filter((resource) => resource.type === activeFilter),
    [resources, activeFilter]
  );

  const featuredDownloads = useMemo(
    () =>
      featuredResourceOrder
        .map((slug) => resources.find((resource) => resource.slug === slug))
        .filter(
          (item): item is typeof resources[number] =>
            Boolean(item && item.downloads.length > 0)
        ),
    [resources]
  );

  return (
    <div className="bg-surface text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <section className="bg-gradient-to-br from-primary to-accent text-white">
        <div className={`${siteShellClassName} py-16`}>
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            {copy.badge}
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">{copy.heroTitle}</h1>
          <p className="mt-6 max-w-2xl text-white/80">{copy.heroDescription}</p>
        </div>
      </section>

      <main className={`${siteShellClassName} flex flex-col gap-12 py-16`}>
        {featuredDownloads.length ? (
          <section className="space-y-6 rounded-3xl bg-white p-8 shadow-card dark:bg-slate-900">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                {copy.featuredTitle}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">{copy.featuredDescription}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {featuredDownloads.map((resource, index) => {
                const resolvedDownloads = resource.downloads.map((download) => ({
                  ...download,
                  url: resolveAssetUrl(download.url)
                }));

                return (
                  <article
                    key={`${resource.slug}-${index}`}
                    className="flex h-full flex-col justify-between rounded-2xl border border-primary/20 bg-primary/5 p-6 transition hover:-translate-y-1 hover:shadow dark:border-primary/30 dark:bg-slate-800/60"
                  >
                    <div className="space-y-2">
                      <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                        {formatResourceType(resource.type)}
                      </span>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{resource.summary}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-accent"
                        onClick={(event) => onOpenResource(resource.slug, event.currentTarget)}
                      >
                        {copy.featuredPrimaryCta}
                      </button>
                      {!modalOnlyDownloadSlugs.has(resource.slug) &&
                        resolvedDownloads.map((download) => (
                        <a
                          key={download.url}
                          href={download.url}
                          className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
                          target="_blank"
                          rel="noreferrer"
                          onClick={() =>
                            trackDownload(resource.slug, download.url, 'featured_resource_card')
                          }
                        >
                          {download.label}
                        </a>
                        ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

        <section className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                {copy.libraryTitle}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">{copy.libraryDescription}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => {
                const isActive = option.id === activeFilter;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setActiveFilter(option.id)}
                    className={`focus-ring rounded-full border px-4 py-2 text-xs font-semibold transition ${
                      isActive
                        ? 'border-primary bg-primary text-white shadow-card'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-primary/40 hover:text-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-primary'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource, index) => {
              const resolvedDownloads = resource.downloads.map((download) => ({
                ...download,
                url: resolveAssetUrl(download.url)
              }));

              return (
                <article
                  key={`${resource.slug}-${resource.type}-${index}`}
                  className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="space-y-3">
                    <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                      {formatResourceType(resource.type)}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{resource.summary}</p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={(event) => onOpenResource(resource.slug, event.currentTarget)}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-accent"
                    >
                      {copy.cardPrimaryCta}
                    </button>
                    {!modalOnlyDownloadSlugs.has(resource.slug) &&
                      resolvedDownloads.map((download) => (
                      <a
                        key={download.url}
                        href={download.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10 dark:border-primary/40"
                        onClick={() =>
                          trackDownload(resource.slug, download.url, 'resource_library_card')
                        }
                      >
                        {download.label}
                      </a>
                      ))}
                  </div>
                </article>
              );
            })}
          </div>

          {filteredResources.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-primary/30 bg-white p-6 text-center text-sm text-slate-600 dark:border-primary/40 dark:bg-slate-900 dark:text-slate-300">
              {copy.emptyMessage}
            </p>
          ) : null}
        </section>
      </main>
    </div>
  );
};

export default ResourcesPage;
