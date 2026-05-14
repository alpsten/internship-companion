import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import ResourceModal from './components/ResourceModal';
import SiteFooter from './components/SiteFooter';
import { initAnalytics, trackEvent, trackPageView } from './analytics';
import { getResourceBySlug } from './content';
import LandingPage from './pages/LandingPage';
import PlanPage from './pages/PlanPage';
import ResourcesPage from './pages/ResourcesPage';
import FaqPage from './pages/FaqPage';
import AboutPage from './pages/AboutPage';
import AuthPage from './pages/AuthPage';
import AccountPage from './pages/AccountPage';
import { useAuth } from './auth/AuthContext';
import { useLocale } from './i18n/LocaleContext';
import { siteShellClassName } from './siteConfig';

type ProtectedRouteProps = {
  children: ReactNode;
};

const loadingCopyByLocale = {
  sv: 'Kontrollerar inloggning...',
  en: 'Checking sign-in...'
} as const;

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const { locale } = useLocale();
  const location = useLocation();
  const loadingCopy = loadingCopyByLocale[locale] ?? loadingCopyByLocale.sv;

  if (isLoading) {
    return (
      <main className={`${siteShellClassName} flex flex-1 items-center justify-center py-16`}>
        <p className="text-sm text-slate-600 dark:text-slate-300">{loadingCopy}</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate replace to="/auth" state={{ from: location }} />;
  }

  return children;
}

function App() {
  const { locale } = useLocale();
  const { isAuthenticated } = useAuth();
  const [activeResource, setActiveResource] = useState<string | null>(null);
  const [resourceTrigger, setResourceTrigger] = useState<HTMLElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    setActiveResource(null);

    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        window.requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  useEffect(() => {
    trackPageView(`${location.pathname}${location.search}${location.hash}`);
  }, [location.hash, location.pathname, location.search]);

  const selectedResource = useMemo(
    () => (activeResource ? getResourceBySlug(activeResource, locale) ?? null : null),
    [activeResource, locale]
  );

  const handleOpenResource = (slug: string, trigger?: HTMLElement | null) => {
    setResourceTrigger(
      trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null)
    );
    trackEvent('resource_opened', {
      resource_slug: slug,
      source_path: location.pathname,
      locale
    });
    setActiveResource(slug);
  };

  const handleCloseResource = () => {
    setActiveResource(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      {isAuthenticated ? <NavigationBar /> : null}
      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <LandingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plan"
            element={
              <ProtectedRoute>
                <PlanPage onOpenResource={handleOpenResource} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resources"
            element={
              <ProtectedRoute>
                <ResourcesPage onOpenResource={handleOpenResource} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faq"
            element={
              <ProtectedRoute>
                <FaqPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <AboutPage />
              </ProtectedRoute>
            }
          />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate replace to={isAuthenticated ? '/' : '/auth'} />} />
        </Routes>
      </div>
      {isAuthenticated ? <SiteFooter /> : null}

      {isAuthenticated ? (
        <ResourceModal
          resource={
            selectedResource
              ? {
                  slug: selectedResource.slug,
                  title: selectedResource.title,
                  type: selectedResource.type,
                  downloadLabel: selectedResource.downloadLabel,
                  downloadUrl: selectedResource.downloadUrl,
                  downloads: selectedResource.downloads,
                  Content: selectedResource.Content
                }
              : null
          }
          restoreFocusElement={resourceTrigger}
          onClose={handleCloseResource}
        />
      ) : null}
    </div>
  );
}

export default App;
