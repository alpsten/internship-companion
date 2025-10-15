import type { FC } from 'react';

interface HeroProps {
  badge: string;
  title: string;
  description: string;
}

const Hero: FC<HeroProps> = ({ badge, title, description }) => (
  <header className="bg-gradient-to-br from-primary to-accent text-white">
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-16 sm:px-10">
      <div className="flex flex-col gap-4">
        <span className="inline-flex w-fit rounded-full bg-white/15 px-3 py-1 text-sm font-semibold uppercase tracking-wide">
          {badge}
        </span>
        <h1 className="text-3xl font-bold leading-tight sm:text-5xl">{title}</h1>
        <p className="max-w-2xl text-lg text-white/80 sm:text-xl">{description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <a
          className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-lg"
          href="#checklista"
        >
          Börja med checklistan
        </a>
        <a
          className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          href="#resurser"
        >
          Utforska resurser
        </a>
      </div>
    </div>
  </header>
);

export default Hero;
