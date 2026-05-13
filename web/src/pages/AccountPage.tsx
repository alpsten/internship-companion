import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getSchoolProfile, type SchoolProfile } from '../auth';
import { useAuth } from '../auth/AuthContext';
import { useLocale } from '../i18n/LocaleContext';
import { siteShellClassName } from '../siteConfig';

const copyByLocale = {
  sv: {
    title: 'Ditt konto',
    description: 'Du är nu inloggad i den första fullstack-versionen av Internship Companion.',
    name: 'Namn',
    email: 'E-post',
    school: 'Skola',
    domain: 'Verifierad domän',
    schoolProfile: 'Skolprofil',
    loading: 'Laddar konto...'
  },
  en: {
    title: 'Your account',
    description: 'You are now signed in to the first full-stack version of Internship Companion.',
    name: 'Name',
    email: 'Email',
    school: 'School',
    domain: 'Verified domain',
    schoolProfile: 'School profile',
    loading: 'Loading account...'
  }
} as const;

const AccountPage = () => {
  const { locale } = useLocale();
  const { isAuthenticated, isLoading, token, user } = useAuth();
  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile | null>(null);
  const copy = copyByLocale[locale] ?? copyByLocale.sv;

  useEffect(() => {
    let isCancelled = false;

    if (!isAuthenticated || !token) {
      setSchoolProfile(null);
      return;
    }

    const authToken = token;

    async function loadSchoolProfile() {
      try {
        const profile = await getSchoolProfile(authToken);
        if (!isCancelled) {
          setSchoolProfile(profile);
        }
      } catch {
        if (!isCancelled) {
          setSchoolProfile(null);
        }
      }
    }

    void loadSchoolProfile();

    return () => {
      isCancelled = true;
    };
  }, [isAuthenticated, token]);

  if (isLoading) {
    return (
      <main className={`${siteShellClassName} flex flex-1 items-center justify-center py-16`}>
        <p className="text-sm text-slate-600 dark:text-slate-300">{copy.loading}</p>
      </main>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate replace to="/auth" />;
  }

  return (
    <main className={`${siteShellClassName} flex flex-1 py-16`}>
      <section className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-card dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">{copy.title}</h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{copy.description}</p>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/70">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {copy.name}
            </dt>
            <dd className="mt-2 text-base font-medium text-slate-900 dark:text-slate-100">
              {user.name}
            </dd>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/70">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {copy.email}
            </dt>
            <dd className="mt-2 text-base font-medium text-slate-900 dark:text-slate-100">
              {user.email}
            </dd>
          </div>
          {schoolProfile ? (
            <>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/70">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {copy.school}
                </dt>
                <dd className="mt-2 text-base font-medium text-slate-900 dark:text-slate-100">
                  {schoolProfile.name}
                </dd>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/70">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {copy.domain}
                </dt>
                <dd className="mt-2 text-base font-medium text-slate-900 dark:text-slate-100">
                  @{schoolProfile.domain}
                </dd>
              </div>
            </>
          ) : null}
        </dl>

        {schoolProfile ? (
          <section className="mt-6 rounded-3xl border border-primary/20 bg-primary/5 p-6 dark:border-primary/30 dark:bg-primary/10">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              {copy.schoolProfile}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
              {schoolProfile.theme}
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              {schoolProfile.welcomeMessage}
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-slate-700 dark:text-slate-200">
              {schoolProfile.highlights.map((highlight) => (
                <li key={highlight} className="rounded-2xl bg-white/70 px-4 py-3 dark:bg-slate-950/50">
                  {highlight}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </section>
    </main>
  );
};

export default AccountPage;
