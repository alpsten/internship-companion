import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { siteShellClassName } from '../siteConfig';

interface HeroProps {
  badge: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryHref: string;
  secondaryCtaLabel: string;
  secondaryHref: string;
}

const Hero: FC<HeroProps> = ({
  badge,
  title,
  description,
  primaryCtaLabel,
  primaryHref,
  secondaryCtaLabel,
  secondaryHref
}) => (
  <header className="bg-gradient-to-br from-primary to-accent text-white">
    <div className={`${siteShellClassName} flex flex-col gap-6 py-16`}>
      <div className="flex flex-col gap-4">
        <span className="inline-flex w-fit rounded-full bg-white/15 px-3 py-1 text-sm font-semibold uppercase tracking-wide">
          {badge}
        </span>
        <h1 className="text-3xl font-bold leading-tight sm:text-5xl">{title}</h1>
        <p className="max-w-2xl text-lg text-white/80 sm:text-xl">{description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Link
          className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-lg"
          to={primaryHref}
        >
          {primaryCtaLabel}
        </Link>
        <Link
          className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          to={secondaryHref}
        >
          {secondaryCtaLabel}
        </Link>
      </div>
    </div>
  </header>
);

export default Hero;
