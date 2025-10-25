import { useMemo, useState } from 'react';
import type { ResourceType } from '../content';
import { getResourceSummaries } from '../content';
import { useLocale } from '../i18n/LocaleContext';

interface ResourcesPageProps {
  onOpenResource: (slug: string) => void;
}

type FilterOption = {
  id: 'all' | ResourceType;
  label: string;
};

const filterOptions: FilterOption[] = [
  { id: 'all', label: 'Alla resurser' },
  { id: 'Guide', label: 'Guider' },
  { id: 'Mall', label: 'Mallar' },
  { id: 'Tracker', label: 'Trackers' }
];

const featuredResourceOrder = ['ansokningslogg', 'progress-logg', 'veckoreflektion', 'firaframsteg'];

const ResourcesPage = ({ onOpenResource }: ResourcesPageProps) => {
  const { locale } = useLocale();
  const [activeFilter, setActiveFilter] = useState<FilterOption['id']>('all');

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
            Boolean(item?.downloadLabel && item?.downloadUrl)
        ),
    [resources]
  );

  return (
    <div className="bg-surface text-slate-900">
      <section className="bg-gradient-to-br from-primary to-accent text-white">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Resursbank
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">
            Guider, mallar och trackers som hjälper dig i varje steg.
          </h1>
          <p className="mt-6 max-w-2xl text-white/80">
            Allt innehåll är framtaget utifrån produktbriefen och plan-stegen. Filtrera på typ eller
            öppna direkt för att läsa i modalen. Svenska är först ut – engelska versionen kommer.
          </p>
        </div>
      </section>

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-16 sm:px-10">
        {featuredDownloads.length ? (
          <section className="space-y-6 rounded-3xl bg-white p-8 shadow-card">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-slate-900">Ladda ner starter pack</h2>
              <p className="text-sm text-slate-600">
                Snabbaste vägen till momentum: tracker, progresslogg, veckoreflektion och firalista
                ger dig struktur från dag ett.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {featuredDownloads.map((resource) => (
                <article
                  key={resource.slug}
                  className="flex h-full flex-col justify-between rounded-2xl border border-primary/20 bg-primary/5 p-6 transition hover:-translate-y-1 hover:shadow"
                >
                  <div className="space-y-2">
                    <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                      {resource.type}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-900">{resource.title}</h3>
                    <p className="text-sm text-slate-600">{resource.summary}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-accent"
                      onClick={() => onOpenResource(resource.slug)}
                    >
                      Läs här
                    </button>
                    {resource.downloadUrl && resource.downloadLabel ? (
                      <a
                        href={resource.downloadUrl}
                        className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {resource.downloadLabel}
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Utforska biblioteket</h2>
              <p className="text-sm text-slate-600">
                Filtrera per kategori eller hoppa direkt in i innehållet. Klicka på ett kort för att
                öppna resursen i modalen.
              </p>
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
                        : 'border-slate-200 bg-white text-slate-600 hover:border-primary/40 hover:text-primary'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <article
                key={resource.slug}
                className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="space-y-3">
                  <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                    {resource.type}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900">{resource.title}</h3>
                  <p className="text-sm text-slate-600">{resource.summary}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenResource(resource.slug)}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-accent"
                  >
                    Läs i modalen
                  </button>
                  {resource.downloadUrl && resource.downloadLabel ? (
                    <a
                      href={resource.downloadUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
                    >
                      {resource.downloadLabel}
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          {filteredResources.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-primary/30 bg-white p-6 text-center text-sm text-slate-600">
              Vi jobbar på fler resurser i den här kategorin. Tipsa oss gärna om vad som saknas!
            </p>
          ) : null}
        </section>
      </main>
    </div>
  );
};

export default ResourcesPage;
