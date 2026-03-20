import { useEffect, useMemo, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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
import { useLocale } from './i18n/LocaleContext';

function App() {
  const { locale } = useLocale();
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
      <NavigationBar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/plan" element={<PlanPage onOpenResource={handleOpenResource} />} />
          <Route
            path="/resources"
            element={<ResourcesPage onOpenResource={handleOpenResource} />}
          />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
      <SiteFooter />

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
    </div>
  );
}

export default App;
