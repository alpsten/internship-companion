import type { FC } from 'react';
import type { ResourceType } from '../content';

type ResourceItem = {
  slug: string;
  title: string;
  type: ResourceType;
  summary: string;
};

interface ResourceShowcaseProps {
  title: string;
  description: string;
  items: ResourceItem[];
  onSelect: (slug: string) => void;
}

const ResourceShowcase: FC<ResourceShowcaseProps> = ({
  title,
  description,
  items,
  onSelect
}) => (
  <section id="resurser" className="space-y-6">
    <div>
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
    <div className="grid gap-6 sm:grid-cols-3">
      {items.map((resource) => (
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
          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-accent"
            onClick={() => onSelect(resource.slug)}
          >
            Förhandsvisa
          </button>
        </article>
      ))}
    </div>
  </section>
);

export default ResourceShowcase;
