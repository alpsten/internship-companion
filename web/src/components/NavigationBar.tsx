import { NavLink, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

const linkClasses = (
  { isActive }: { isActive: boolean }
) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
    isActive ? 'bg-primary/10 text-primary' : 'text-slate-700 hover:text-primary'
  }`;

const NavigationBar = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 sm:px-10">
        <NavLink to="/" className="text-base font-semibold text-slate-900">
          Internship Checklist
        </NavLink>
        <nav className="flex items-center gap-2">
          {isLanding ? (
            <a className={linkClasses({ isActive: false })} href="#checklista">
              Checklista
            </a>
          ) : (
            <NavLink className={linkClasses} to="/">
              Hem
            </NavLink>
          )}
          <NavLink className={linkClasses} to="/plan">
            Planera LIA
          </NavLink>
          <NavLink className={linkClasses} to="/resources">
            Resurser
          </NavLink>
          <NavLink className={linkClasses} to="/about">
            Om
          </NavLink>
          <a className={linkClasses({ isActive: false })} href="docs/product-brief.md">
            Produktbrief
          </a>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
};

export default NavigationBar;
