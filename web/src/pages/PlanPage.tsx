import { useEffect, useMemo, useState } from 'react';
import { planStages, getRecommendedResources } from '../content';

interface PlanPageProps {
  onOpenResource: (slug: string) => void;
}

const PLAN_STORAGE_KEY = 'internship-plan-checklist';

const PlanPage = ({ onOpenResource }: PlanPageProps) => {
  const [activeStageId, setActiveStageId] = useState(planStages[0]?.id ?? '');
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const stored = window.localStorage.getItem(PLAN_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as string[];
        setCompletedTasks(parsed);
      } catch (error) {
        console.warn('Kunde inte läsa sparade plan-steg', error);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(completedTasks));
  }, [completedTasks]);

  const totalTasks = useMemo(
    () => planStages.reduce((acc, stage) => acc + stage.tasks.length, 0),
    []
  );

  const completedCount = completedTasks.length;
  const progress = Math.round((completedCount / totalTasks) * 100);

  const activeStage = planStages.find((stage) => stage.id === activeStageId) ?? planStages[0];
  const activeTasks = activeStage?.tasks ?? [];
  const recommendedResources = getRecommendedResources(activeStage?.resourceSlugs);

  const handleToggle = (taskId: string) => {
    setCompletedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((value) => value !== taskId) : [...prev, taskId]
    );
  };

  return (
    <div className="bg-surface pb-16 text-slate-900">
      <section className="bg-gradient-to-br from-primary to-accent text-white">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Planera din LIA
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">
            Bryt ner processen i hanterbara steg.
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Välj fokusområde, bocka av uppgifter och öppna resurser som hjälper dig direkt. Vi sparar din plan lokalt så att du kan fortsätta där du slutade.
          </p>
          <div className="mt-8 rounded-3xl bg-white/10 p-6 backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-wide text-white/70">Din progress</p>
                <p className="text-3xl font-bold text-white">{progress}%</p>
              </div>
              <div className="flex-1">
                <div className="h-2 w-full rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-white transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="text-sm text-white/70">
                {completedCount}/{totalTasks} uppgifter
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto mt-10 flex w-full max-w-5xl flex-col gap-10 px-6 sm:px-10">
        <nav className="flex flex-wrap gap-3">
          {planStages.map((stage) => {
            const isActive = stage.id === activeStage.id;
            const stageCompletedCount = stage.tasks.filter((task) =>
              completedTasks.includes(task.id)
            ).length;
            const stageProgress = Math.round((stageCompletedCount / stage.tasks.length) * 100);

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStageId(stage.id)}
                className={`focus-ring rounded-2xl border px-5 py-4 text-left text-sm font-semibold transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-card ${
                  isActive
                    ? 'border-primary bg-white shadow-card'
                    : 'border-slate-200 bg-white/80'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Steg</p>
                    <p className="text-base text-slate-900">{stage.title}</p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {stageProgress}%
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        <section className="space-y-6 rounded-3xl bg-white p-8 shadow-card">
          <div className="space-y-3">
            <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              {activeStage.milestone}
            </span>
            <h2 className="text-2xl font-semibold text-slate-900">{activeStage.title}</h2>
            <p className="text-sm text-slate-600">{activeStage.description}</p>
          </div>

          <ol className="grid gap-3">
            {activeTasks.map((task) => {
              const done = completedTasks.includes(task.id);
              return (
                <li key={task.id}>
                  <button
                    type="button"
                    onClick={() => handleToggle(task.id)}
                    className="focus-ring group flex w-full items-start gap-3 rounded-2xl border border-slate-200 bg-surface p-4 text-left transition ease-in-out-soft hover:-translate-y-0.5 hover:border-primary/60 hover:shadow"
                  >
                    <span
                      className={`mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full border text-sm font-semibold transition ease-in-out-soft ${
                        done
                          ? 'border-primary bg-primary text-white shadow-elevated'
                          : 'border-primary text-primary'
                      }`}
                    >
                      {done ? '✓' : ''}
                    </span>
                    <div className="flex flex-1 flex-col gap-2">
                      <p className="text-sm text-slate-700">{task.text}</p>
                      {task.resourceSlug ? (
                        <button
                          type="button"
                          className="self-start text-xs font-semibold text-primary hover:underline"
                          onClick={(event) => {
                            event.stopPropagation();
                            onOpenResource(task.resourceSlug);
                          }}
                        >
                          Öppna rekommenderad resurs
                        </button>
                      ) : null}
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>

          {recommendedResources.length > 0 ? (
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <h3 className="text-sm font-semibold text-primary">Förslag på resurser</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {recommendedResources.map((resource) => (
                  <button
                    key={resource.slug}
                    type="button"
                    onClick={() => onOpenResource(resource.slug)}
                    className="focus-ring rounded-full border border-primary/30 bg-white px-4 py-2 text-xs font-semibold text-primary transition hover:border-primary hover:bg-primary/10"
                  >
                    {resource.title}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
};

export default PlanPage;
