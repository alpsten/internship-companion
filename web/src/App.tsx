import { useEffect, useMemo, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import ResourceModal from './components/ResourceModal';
import SiteFooter from './components/SiteFooter';
import { getResourceBySlug } from './content';
import LandingPage from './pages/LandingPage';
import PlanPage from './pages/PlanPage';
import ResourcesPage from './pages/ResourcesPage';
import AboutPage from './pages/AboutPage';
import { useLocale } from './i18n/LocaleContext';

function App() {
  const { locale } = useLocale();
  const [activeResource, setActiveResource] = useState<string | null>(null);
  const location = useLocation();

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

  const selectedResource = useMemo(
    () => (activeResource ? getResourceBySlug(activeResource, locale) ?? null : null),
    [activeResource, locale]
  );

  return (
    <div className="flex min-h-screen flex-col bg-surface text-slate-900">
      <NavigationBar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage onOpenResource={setActiveResource} />} />
          <Route path="/plan" element={<PlanPage onOpenResource={setActiveResource} />} />
          <Route path="/resources" element={<ResourcesPage onOpenResource={setActiveResource} />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
      <SiteFooter />

      <ResourceModal
        resource={
          selectedResource
            ? {
                title: selectedResource.title,
                type: selectedResource.type,
                downloadLabel: selectedResource.downloadLabel,
                downloadUrl: selectedResource.downloadUrl,
                Content: selectedResource.Content
              }
            : null
        }
        onClose={() => setActiveResource(null)}
      />
    </div>
  );
}

export default App;
