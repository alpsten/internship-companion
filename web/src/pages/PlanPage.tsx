import { useEffect, useMemo, useRef, useState } from 'react';
import { trackEvent } from '../analytics';
import { getProgress, updateProgress } from '../auth';
import { useAuth } from '../auth/AuthContext';
import { getPlanDefaultTips, getPlanStages, getRecommendedResources } from '../content';
import { useLocale } from '../i18n/LocaleContext';
import type { Locale } from '../content';
import { siteShellClassName } from '../siteConfig';

interface PlanPageProps {
  onOpenResource: (slug: string, trigger?: HTMLElement | null) => void;
}

const PLAN_STORAGE_KEY = 'internship-companion-plan';

type PlanCopy = {
  badge: string;
  heroTitle: string;
  heroDescription: string;
  progressLabel: string;
  progressCount: (completed: number, total: number) => string;
  stageIndicatorLabel: string;
  stageProgress: (percent: number) => string;
  stageSummary: (completed: number, total: number) => string;
  milestoneTitle: string;
  milestoneDescription: string;
  recommendedResourcesTitle: string;
  recommendedResourcesEmpty: string;
  openResourceLabel: string;
  tipsTitle: string;
  localProgressStatus: string;
  accountProgressStatus: string;
  savingProgressStatus: string;
  progressSyncError: string;
};

const planCopyByLocale: Record<Locale, PlanCopy> = {
  sv: {
    badge: 'Planera din LIA',
    heroTitle: 'Bryt ner processen i hanterbara steg.',
    heroDescription:
      'Välj fokusområde, bocka av uppgifter och öppna resurser som hjälper dig direkt. Vi sparar din plan lokalt så att du kan fortsätta där du slutade.',
    progressLabel: 'Din progress',
    progressCount: (completed, total) => `${completed}/${total} uppgifter`,
    stageIndicatorLabel: 'Steg',
    stageProgress: (percent) => `${percent}% klart`,
    stageSummary: (completed, total) => `${completed}/${total} uppgifter avklarade`,
    milestoneTitle: 'Målbild',
    milestoneDescription:
      'När du bockat av alla uppgifter i steget är det här resultatet du ska känna igen dig i.',
    recommendedResourcesTitle: 'Rekommenderade resurser',
    recommendedResourcesEmpty:
      'Vi fyller på med fler resurser för det här steget – tipsa gärna om vad som skulle hjälpa dig mest!',
    openResourceLabel: 'Öppna rekommenderad resurs',
    tipsTitle: 'Tips',
    localProgressStatus: 'Sparas lokalt i den här webbläsaren.',
    accountProgressStatus: 'Sparas på ditt konto.',
    savingProgressStatus: 'Sparar progress...',
    progressSyncError:
      'Kunde inte synka med backend. Ändringen sparas lokalt tills anslutningen fungerar igen.'
  },
  en: {
    badge: 'Plan your internship',
    heroTitle: 'Break the process into manageable steps.',
    heroDescription:
      'Pick a focus area, check off tasks, and open resources that help immediately. We store your plan locally so you can continue where you left off.',
    progressLabel: 'Your progress',
    progressCount: (completed, total) => `${completed}/${total} tasks`,
    stageIndicatorLabel: 'Stage',
    stageProgress: (percent) => `${percent}% done`,
    stageSummary: (completed, total) => `${completed}/${total} tasks completed`,
    milestoneTitle: 'Milestone',
    milestoneDescription:
      'Once every task in the stage is checked, this is the outcome you should recognise.',
    recommendedResourcesTitle: 'Recommended resources',
    recommendedResourcesEmpty:
      'More resources for this stage are on the way—tell us what would help you the most!',
    openResourceLabel: 'Open recommended resource',
    tipsTitle: 'Tips',
    localProgressStatus: 'Saved locally in this browser.',
    accountProgressStatus: 'Saved to your account.',
    savingProgressStatus: 'Saving progress...',
    progressSyncError:
      'Could not sync with the backend. Changes are saved locally until the connection works again.'
  }
};

function readStoredCompletedTasks() {
  if (typeof window === 'undefined') {
    return [];
  }

  const stored = window.localStorage.getItem(PLAN_STORAGE_KEY);
  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored);
    return normalizeTaskIds(Array.isArray(parsed) ? parsed : []);
  } catch (error) {
    console.warn('Kunde inte läsa sparade plan-steg', error);
    return [];
  }
}

function normalizeTaskIds(taskIds: string[]) {
  return Array.from(new Set(taskIds.filter((taskId) => typeof taskId === 'string' && taskId)));
}

const PlanPage = ({ onOpenResource }: PlanPageProps) => {
  const { locale } = useLocale();
  const { isAuthenticated, isLoading: isAuthLoading, token } = useAuth();
  const copy = planCopyByLocale[locale] ?? planCopyByLocale.sv;
  const stages = useMemo(() => getPlanStages(locale), [locale]);
  const [activeStageId, setActiveStageId] = useState<string>(stages[0]?.id ?? '');
  const [completedTasks, setCompletedTasks] = useState<string[]>(() => readStoredCompletedTasks());
  const [isAccountProgressReady, setIsAccountProgressReady] = useState(false);
  const [isSavingProgress, setIsSavingProgress] = useState(false);
  const [progressSyncError, setProgressSyncError] = useState<string | null>(null);
  const lastSyncedProgressRef = useRef<string | null>(null);
  const fallbackTips = useMemo(() => getPlanDefaultTips(locale), [locale]);
  const validTaskIds = useMemo(
    () => new Set(stages.flatMap((stage) => stage.tasks.map((task) => task.id))),
    [stages]
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(completedTasks));
  }, [completedTasks]);

  useEffect(() => {
    setCompletedTasks((prev) => {
      const validTasks = prev.filter((taskId) => validTaskIds.has(taskId));
      return validTasks.length === prev.length ? prev : validTasks;
    });
  }, [validTaskIds]);

  useEffect(() => {
    let isCancelled = false;

    if (isAuthLoading) {
      return;
    }

    if (!isAuthenticated || !token) {
      setIsAccountProgressReady(false);
      setIsSavingProgress(false);
      setProgressSyncError(null);
      lastSyncedProgressRef.current = null;
      return;
    }

    const authToken = token;

    async function loadAccountProgress() {
      setIsAccountProgressReady(false);
      setProgressSyncError(null);

      try {
        const response = await getProgress(authToken);
        const accountTasks = normalizeTaskIds(response.completedTaskIds).filter((taskId) =>
          validTaskIds.has(taskId)
        );
        const localTasks = readStoredCompletedTasks().filter((taskId) => validTaskIds.has(taskId));
        const shouldMigrateLocalProgress = accountTasks.length === 0 && localTasks.length > 0;
        const nextTasks = shouldMigrateLocalProgress ? localTasks : accountTasks;

        if (!isCancelled) {
          lastSyncedProgressRef.current = JSON.stringify(accountTasks);
          setCompletedTasks(nextTasks);
          setIsAccountProgressReady(true);
        }
      } catch {
        if (!isCancelled) {
          setProgressSyncError(copy.progressSyncError);
          setIsAccountProgressReady(false);
        }
      }
    }

    void loadAccountProgress();

    return () => {
      isCancelled = true;
    };
  }, [copy.progressSyncError, isAuthenticated, isAuthLoading, token, validTaskIds]);

  useEffect(() => {
    let isCancelled = false;

    if (!isAuthenticated || !token || !isAccountProgressReady) {
      return;
    }

    const authToken = token;
    const progressSnapshot = normalizeTaskIds(completedTasks).filter((taskId) =>
      validTaskIds.has(taskId)
    );
    const progressKey = JSON.stringify(progressSnapshot);

    if (lastSyncedProgressRef.current === progressKey) {
      return;
    }

    async function saveAccountProgress() {
      setIsSavingProgress(true);
      setProgressSyncError(null);

      try {
        const response = await updateProgress(authToken, progressSnapshot);
        const savedTasks = normalizeTaskIds(response.completedTaskIds).filter((taskId) =>
          validTaskIds.has(taskId)
        );

        if (!isCancelled) {
          lastSyncedProgressRef.current = JSON.stringify(savedTasks);
        }
      } catch {
        if (!isCancelled) {
          setProgressSyncError(copy.progressSyncError);
        }
      } finally {
        if (!isCancelled) {
          setIsSavingProgress(false);
        }
      }
    }

    void saveAccountProgress();

    return () => {
      isCancelled = true;
    };
  }, [
    completedTasks,
    copy.progressSyncError,
    isAccountProgressReady,
    isAuthenticated,
    token,
    validTaskIds
  ]);

  useEffect(() => {
    if (!stages.some((stage) => stage.id === activeStageId)) {
      setActiveStageId(stages[0]?.id ?? '');
    }
  }, [stages, activeStageId]);

  const totalTasks = useMemo(
    () => stages.reduce((acc, stage) => acc + stage.tasks.length, 0),
    [stages]
  );

  const completedCount = completedTasks.length;
  const progress = Math.round((completedCount / totalTasks) * 100);

  const activeStage = stages.find((stage) => stage.id === activeStageId) ?? stages[0];
  const activeTasks = activeStage?.tasks ?? [];
  const recommendedResources = getRecommendedResources(activeStage?.resourceSlugs, locale);
  const stageCompletedCount = activeTasks.filter((task) => completedTasks.includes(task.id)).length;
  const stageProgress = activeTasks.length
    ? Math.round((stageCompletedCount / activeTasks.length) * 100)
    : 0;
  const stageTips = activeStage?.tips?.length ? activeStage.tips : fallbackTips;
  const progressStatus = progressSyncError
    ? progressSyncError
    : isAuthenticated
      ? isSavingProgress
        ? copy.savingProgressStatus
        : copy.accountProgressStatus
      : copy.localProgressStatus;

  const handleToggle = (taskId: string) => {
    setCompletedTasks((prev) => {
      const completed = !prev.includes(taskId);

      trackEvent('plan_task_toggled', {
        task_id: taskId,
        stage_id: activeStage.id,
        completed
      });

      return completed
        ? normalizeTaskIds([...prev, taskId])
        : prev.filter((value) => value !== taskId);
    });
  };

  return (
    <div className="bg-surface pb-16 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <section className="bg-gradient-to-br from-primary to-accent text-white">
        <div className={`${siteShellClassName} py-16`}>
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            {copy.badge}
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">{copy.heroTitle}</h1>
          <p className="mt-4 max-w-2xl text-white/80">{copy.heroDescription}</p>
          <div className="mt-8 rounded-3xl bg-white/10 p-6 backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-wide text-white/70">{copy.progressLabel}</p>
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
                {copy.progressCount(completedCount, totalTasks)}
              </div>
            </div>
            <p className="mt-3 text-xs text-white/70">{progressStatus}</p>
          </div>
        </div>
      </section>

      <main className={`${siteShellClassName} mt-10 flex flex-col gap-10`}>
        <nav className="relative flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4">
          {stages.map((stage, index) => {
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
                    ? 'border-primary bg-white shadow-card dark:border-primary/70 dark:bg-slate-800 dark:text-slate-100'
                    : 'border-slate-200 bg-white/80 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 flex-none items-center justify-center rounded-full text-base font-semibold ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
                      {copy.stageIndicatorLabel}
                    </p>
                    <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      {stage.title}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>{stage.milestone}</span>
                  <span className="font-semibold text-primary dark:text-primary">{stageProgress}%</span>
                </div>
              </button>
            );
          })}
        </nav>

        <section className="grid gap-6 rounded-3xl bg-white p-6 shadow-card dark:bg-slate-900 dark:shadow-card lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-10 lg:p-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                {activeStage.milestone}
              </span>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                {activeStage.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">{activeStage.description}</p>
              <div className="flex items-center gap-4 rounded-2xl bg-surface px-4 py-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                <span className="inline-flex items-center gap-2 font-semibold text-primary">
                  {copy.stageProgress(stageProgress)}
                </span>
                <span>{copy.stageSummary(stageCompletedCount, activeTasks.length)}</span>
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
                            : 'border-primary/60 bg-white text-primary dark:bg-slate-800'
                        }`}
                      >
                        {done ? '✓' : index + 1}
                      </span>
                      {showConnector ? (
                        <span className="mt-1 w-px flex-1 bg-slate-200 dark:bg-slate-700" />
                      ) : (
                        <span className="flex-1" />
                      )}
                    </div>
                    <div
                      className="focus-ring group flex flex-1 flex-col gap-3 rounded-2xl border border-slate-200 bg-surface p-4 text-left transition ease-in-out-soft hover:-translate-y-0.5 hover:border-primary/60 hover:shadow dark:border-slate-700 dark:bg-slate-800"
                    >
                      <button
                        type="button"
                        onClick={() => handleToggle(task.id)}
                        className="text-left"
                      >
                        <p className="text-sm text-slate-700 dark:text-slate-200">{task.text}</p>
                      </button>
                      {resourceSlug ? (
                        <button
                          type="button"
                          className="self-start text-xs font-semibold text-primary hover:underline"
                          onClick={(event) => onOpenResource(resourceSlug, event.currentTarget)}
                        >
                          {copy.openResourceLabel}
                        </button>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <aside className="space-y-5 rounded-2xl border border-slate-200 bg-surface p-5 dark:border-slate-700 dark:bg-slate-900">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                {copy.milestoneTitle}
              </h3>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {activeStage.milestone}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {copy.milestoneDescription}
              </p>
            </div>

            {recommendedResources.length > 0 ? (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {copy.recommendedResourcesTitle}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {recommendedResources.map((resource) => (
                    <button
                      key={resource.slug}
                      type="button"
                      onClick={(event) => onOpenResource(resource.slug, event.currentTarget)}
                      className="focus-ring rounded-full border border-primary/30 bg-white px-4 py-2 text-xs font-semibold text-primary transition hover:border-primary hover:bg-primary/10 dark:border-primary/40 dark:bg-slate-800"
                    >
                      {resource.title}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {copy.recommendedResourcesEmpty}
              </p>
            )}

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {copy.tipsTitle}
              </h4>
              <ul className="list-disc pl-5 text-xs text-slate-500 dark:text-slate-400">
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
