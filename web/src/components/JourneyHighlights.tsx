import type { FC } from 'react';

type Highlight = {
  title: string;
  description: string;
};

interface JourneyHighlightsProps {
  items: Highlight[];
}

const JourneyHighlights: FC<JourneyHighlightsProps> = ({ items }) => (
  <section className="grid gap-6 sm:grid-cols-3">
    {items.map((item) => (
      <article
        key={item.title}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
      >
        <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
        <p className="mt-2 text-sm text-slate-600">{item.description}</p>
      </article>
    ))}
  </section>
);

export default JourneyHighlights;
