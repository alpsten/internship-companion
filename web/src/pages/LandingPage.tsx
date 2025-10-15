import { useEffect, useMemo, useState } from 'react';
import Accordion from '../components/Accordion';
import ChecklistPreview from '../components/ChecklistPreview';
import CollaborationBanner from '../components/CollaborationBanner';
import Hero from '../components/Hero';
import JourneyHighlights from '../components/JourneyHighlights';
import ResourceShowcase from '../components/ResourceShowcase';
import {
  checklistPreview,
  faqItems,
  heroContent,
  journeyHighlights,
  resourceSummaries
} from '../content';

interface LandingPageProps {
  onOpenResource: (slug: string) => void;
}

const CHECKLIST_STORAGE_KEY = 'internship-checklist-demo';

const LandingPage = ({ onOpenResource }: LandingPageProps) => {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem(CHECKLIST_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as string[];
        setCompleted(parsed);
      } catch (error) {
        console.warn('Kunde inte läsa sparad checklista', error);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(completed));
  }, [completed]);

  const items = useMemo(
    () =>
      checklistPreview.map((item) => ({
        ...item,
        done: completed.includes(item.id)
      })),
    [completed]
  );

  const handleToggle = (id: string) => {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-1 flex-col bg-surface text-slate-900">
      <Hero {...heroContent} />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-16 px-6 py-16 sm:px-10">
        <JourneyHighlights items={journeyHighlights} />

        <ChecklistPreview
          title="Första stegen"
          description="En snabb försmak på checklistan. Du kan testa att bocka av punkterna – vi sparar ditt val i den här webbläsaren."
          items={items}
          onToggle={handleToggle}
        />

        <ResourceShowcase
          title="Resurser att släppa först"
          description="Guider och mallar som bygger vidare på innehållet i produktbriefen. Ladda ner eller läs direkt i appen."
          items={resourceSummaries}
          onSelect={onOpenResource}
        />

        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Vanliga frågor just nu</h2>
            <p className="text-sm text-slate-600">
              Fler frågor finns i checklistan. Berätta gärna vad som saknas så lägger vi till det.
            </p>
          </div>
          <Accordion items={faqItems} />
        </section>

        <CollaborationBanner />
      </main>
    </div>
  );
};

export default LandingPage;
