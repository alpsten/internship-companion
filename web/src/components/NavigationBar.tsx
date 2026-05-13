import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useLocale } from '../i18n/LocaleContext';
import { siteConfig, siteShellClassName } from '../siteConfig';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
    isActive
      ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary'
      : 'text-slate-700 hover:text-primary dark:text-slate-300 dark:hover:text-primary'
  }`;

const navCopy = {
  sv: {
    home: 'Hem',
    plan: 'Planering',
    resources: 'Resurser',
    faq: 'FAQ',
    about: 'Om',
    account: 'Konto',
    login: 'Logga in',
    logout: 'Logga ut'
  },
  en: {
    home: 'Home',
    plan: 'Planning',
    resources: 'Resources',
    faq: 'FAQ',
    about: 'About',
    account: 'Account',
    login: 'Log in',
    logout: 'Log out'
  }
};

const NavigationBar = () => {
  const { locale } = useLocale();
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const copy = navCopy[locale] ?? navCopy.sv;

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur dark:bg-slate-900/80">
      <div className={`${siteShellClassName} flex items-center justify-between py-4`}>
        <NavLink
          to="/"
          className="inline-flex items-center rounded-full border border-primary/20 bg-white/75 px-4 py-2 text-base font-semibold text-slate-900 shadow-sm transition hover:border-primary/40 hover:bg-white dark:border-primary/30 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:border-primary/50 dark:hover:bg-slate-900"
        >
          {siteConfig.name}
        </NavLink>
        <nav className="flex items-center gap-2">
          <NavLink className={linkClasses} to="/">
            {copy.home}
          </NavLink>
          <NavLink className={linkClasses} to="/plan">
            {copy.plan}
          </NavLink>
          <NavLink className={linkClasses} to="/resources">
            {copy.resources}
          </NavLink>
          <NavLink className={linkClasses} to="/faq">
            {copy.faq}
          </NavLink>
          <NavLink className={linkClasses} to="/about">
            {copy.about}
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink className={linkClasses} to="/account">
                {user?.name ?? copy.account}
              </NavLink>
              <button
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-primary"
                onClick={() => void handleLogout()}
                type="button"
              >
                {copy.logout}
              </button>
            </>
          ) : (
            <NavLink className={linkClasses} to="/auth">
              {copy.login}
            </NavLink>
          )}
          <ThemeToggle />
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
};

export default NavigationBar;
