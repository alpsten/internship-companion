import type { FC } from 'react';
import type { DownloadOption, ResourceType } from '../content';
import { resolveAssetUrl } from '../siteConfig';

type ResourceItem = {
  slug: string;
  title: string;
  type: ResourceType;
  summary: string;
  downloadLabel?: string;
  downloadUrl?: string;
  downloads?: DownloadOption[];
};

interface ResourceShowcaseProps {
  title: string;
  description: string;
  items: ResourceItem[];
  onSelect: (slug: string) => void;
  primaryActionLabel: string;
  emptyStateMessage: string;
  formatType?: (type: ResourceType) => string;
}

const ResourceShowcase: FC<ResourceShowcaseProps> = ({
  title,
  description,
  items,
  onSelect,
  primaryActionLabel,
  emptyStateMessage,
  formatType
}) => (
  <section id="resurser" className="space-y-6">
    <div>
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
    {items.length ? (
      <div className="grid gap-6 sm:grid-cols-3">
        {items.map((resource) => {
          const resolvedDownloads = (resource.downloads ?? []).map((download) => ({
            ...download,
            url: resolveAssetUrl(download.url)
          }));

          return (
            <article
              key={resource.slug}
              className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="space-y-3">
                <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  {formatType ? formatType(resource.type) : resource.type}
                </span>
                <h3 className="text-lg font-semibold text-slate-900">{resource.title}</h3>
                <p className="text-sm text-slate-600">{resource.summary}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-accent"
                  onClick={() => onSelect(resource.slug)}
                >
                  {primaryActionLabel}
                </button>
                {resolvedDownloads.map((download) => (
                  <a
                    key={download.url}
                    className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
                    href={download.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {download.label}
                  </a>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    ) : (
      <p className="rounded-2xl border border-dashed border-primary/30 bg-white p-6 text-sm text-slate-600">
        {emptyStateMessage}
      </p>
    )}
  </section>
);

export default ResourceShowcase;
