import { Link } from 'react-router-dom';

const SiteFooter = () => (
  <footer className="bg-white py-6">
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
      <p>© {new Date().getFullYear()} Internship Checklist. Byggt för svenska LIA-studenter.</p>
      <nav className="flex gap-4">
        <Link className="hover:text-slate-900" to={{ pathname: '/', hash: '#checklista' }}>
          Checklista
        </Link>
        <Link className="hover:text-slate-900" to="/plan">
          Planera LIA
        </Link>
        <Link className="hover:text-slate-900" to="/resources">
          Resurser
        </Link>
        <Link className="hover:text-slate-900" to="/about">
          Om projektet
        </Link>
        <a className="hover:text-slate-900" href="docs/product-brief.md">
          Produktbrief
        </a>
      </nav>
    </div>
  </footer>
);

export default SiteFooter;
