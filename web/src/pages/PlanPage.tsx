import { useEffect, useMemo, useState } from 'react';
import { planStages, getRecommendedResources } from '../content';
import { useLocale } from '../i18n/LocaleContext';

interface PlanPageProps {
  onOpenResource: (slug: string) => void;
}

const PLAN_STORAGE_KEY = 'internship-plan-checklist';
const defaultTips = [
  'Planera en liten belöning när du avslutar ett steg.',
  'Dela din progress med någon så ni kan peppa varandra.'
];

const PlanPage = ({ onOpenResource }: PlanPageProps) => {
  const { locale } = useLocale();
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
  const recommendedResources = getRecommendedResources(activeStage?.resourceSlugs, locale);
  const stageCompletedCount = activeTasks.filter((task) => completedTasks.includes(task.id)).length;
  const stageProgress = activeTasks.length
    ? Math.round((stageCompletedCount / activeTasks.length) * 100)
    : 0;
  const stageTips = activeStage?.tips?.length ? activeStage.tips : defaultTips;

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
        <nav className="relative flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4">
          <div className="pointer-events-none absolute left-0 top-1/2 hidden h-px w-full -translate-y-1/2 bg-slate-200 md:block" />
          {planStages.map((stage, index) => {
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
                className={`focus-ring relative flex min-w-[220px] snap-start flex-col gap-3 rounded-2xl border px-5 py-4 text-left text-sm transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-card ${
                  isActive
                    ? 'border-primary bg-white shadow-card'
                    : 'border-slate-200 bg-white/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 flex-none items-center justify-center rounded-full text-base font-semibold ${
                      isActive ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Steg</p>
                    <p className="text-base font-semibold text-slate-900">{stage.title}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{stage.milestone}</span>
                  <span className="font-semibold text-primary">{stageProgress}%</span>
                </div>
              </button>
            );
          })}
        </nav>

        <section className="grid gap-6 rounded-3xl bg-white p-6 shadow-card lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-10 lg:p-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                {activeStage.milestone}
              </span>
              <h2 className="text-2xl font-semibold text-slate-900">{activeStage.title}</h2>
              <p className="text-sm text-slate-600">{activeStage.description}</p>
              <div className="flex items-center gap-4 rounded-2xl bg-surface px-4 py-3 text-sm text-slate-600">
                <span className="inline-flex items-center gap-2 font-semibold text-primary">
                  {stageProgress}% klart
                </span>
                <span>
                  {stageCompletedCount}/{activeTasks.length} uppgifter avklarade
                </span>
              </div>
            </div>

            <ol className="space-y-4">
              {activeTasks.map((task, index) => {
                const done = completedTasks.includes(task.id);
                const showConnector = index < activeTasks.length - 1;
                const resourceSlug = task.resourceSlug;

                return (
                  <li key={task.id} className="relative flex gap-4">
                    <div className="flex w-8 flex-col items-center">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full border text-sm font-semibold ${
                          done
                            ? 'border-primary bg-primary text-white shadow-elevated'
                            : 'border-primary/60 bg-white text-primary'
                        }`}
                      >
                        {done ? '✓' : index + 1}
                      </span>
                      {showConnector ? (
                        <span className="mt-1 w-px flex-1 bg-slate-200" />
                      ) : (
                        <span className="flex-1" />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle(task.id)}
                      className="focus-ring group flex flex-1 flex-col gap-3 rounded-2xl border border-slate-200 bg-surface p-4 text-left transition ease-in-out-soft hover:-translate-y-0.5 hover:border-primary/60 hover:shadow"
                    >
                      <p className="text-sm text-slate-700">{task.text}</p>
                      {resourceSlug ? (
                        <button
                          type="button"
                          className="self-start text-xs font-semibold text-primary hover:underline"
                          onClick={(event) => {
                            event.stopPropagation();
                            onOpenResource(resourceSlug);
                          }}
                        >
                          Öppna rekommenderad resurs
                        </button>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <aside className="space-y-5 rounded-2xl border border-slate-200 bg-surface p-5">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Målbild
              </h3>
              <p className="text-sm font-semibold text-slate-900">{activeStage.milestone}</p>
              <p className="text-xs text-slate-500">
                När du bockat av alla uppgifter i steget är det här resultatet du ska känna igen dig i.
              </p>
            </div>

            {recommendedResources.length > 0 ? (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-900">Rekommenderade resurser</h4>
                <div className="flex flex-wrap gap-2">
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
            ) : (
              <p className="text-xs text-slate-500">
                Vi fyller på med fler resurser för det här steget – tipsa gärna om vad som skulle
                hjälpa dig mest!
              </p>
            )}

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-slate-900">Tips</h4>
              <ul className="list-disc pl-5 text-xs text-slate-500">
                {stageTips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default PlanPage;
