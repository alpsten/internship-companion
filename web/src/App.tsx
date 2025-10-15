import { useEffect, useMemo, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import ResourceModal from './components/ResourceModal';
import SiteFooter from './components/SiteFooter';
import { getResourceBySlug } from './content';
import LandingPage from './pages/LandingPage';
import PlanPage from './pages/PlanPage';

function App() {
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
    () => (activeResource ? getResourceBySlug(activeResource) ?? null : null),
    [activeResource]
  );

  return (
    <div className="flex min-h-screen flex-col bg-surface text-slate-900">
      <NavigationBar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage onOpenResource={setActiveResource} />} />
          <Route path="/plan" element={<PlanPage onOpenResource={setActiveResource} />} />
        </Routes>
      </div>
      <SiteFooter />

      <ResourceModal
        resource={
          selectedResource
            ? {
                title: selectedResource.title,
                type: selectedResource.type,
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
