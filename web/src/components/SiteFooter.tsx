import { Link } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext';
import { siteConfig, siteShellClassName } from '../siteConfig';

const footerCopy = {
  sv: {
    tagline: 'Byggt för svenska LIA-studenter.',
    plan: 'Planering',
    resources: 'Resurser',
    faq: 'FAQ',
    about: 'Om projektet'
  },
  en: {
    tagline: 'Built for Swedish LIA students.',
    plan: 'Planning',
    resources: 'Resources',
    faq: 'FAQ',
    about: 'About the project'
  }
};

const SiteFooter = () => {
  const { locale } = useLocale();
  const copy = footerCopy[locale] ?? footerCopy.sv;

  return (
    <footer className="bg-white py-6 dark:bg-slate-900">
      <div className={`${siteShellClassName} flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:text-slate-400`}>
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. {copy.tagline}
        </p>
        <nav className="flex gap-4">
          <Link className="hover:text-slate-900 dark:hover:text-slate-100" to="/plan">
            {copy.plan}
          </Link>
          <Link className="hover:text-slate-900 dark:hover:text-slate-100" to="/resources">
            {copy.resources}
          </Link>
          <Link className="hover:text-slate-900 dark:hover:text-slate-100" to="/faq">
            {copy.faq}
          </Link>
          <Link className="hover:text-slate-900 dark:hover:text-slate-100" to="/about">
            {copy.about}
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default SiteFooter;
