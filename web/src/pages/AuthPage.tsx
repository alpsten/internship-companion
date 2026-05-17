import { FormEvent, useMemo, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ApiError } from '../auth';
import { useAuth } from '../auth/AuthContext';
import { useLocale } from '../i18n/LocaleContext';
import { siteConfig, siteShellClassName } from '../siteConfig';

type AuthMode = 'login' | 'register' | 'verify';

const copyByLocale = {
  sv: {
    login: 'Logga in',
    register: 'Skapa konto',
    title: `Välkommen till ${siteConfig.name}`,
    description:
      'Logga in eller skapa ett konto med din verifierade skoldomän för att komma åt planering, resurser och ditt sparade checklistläge.',
    name: 'Namn',
    email: 'E-post',
    password: 'Lösenord',
    submitLogin: 'Logga in',
    submitRegister: 'Skapa konto',
    helper: 'Exempel på verifierade domäner: yh.nackademin.se och hogwarts.wiz.',
    loading: 'Bearbetar...',
    verifyTitle: 'Kontrollera din e-post',
    verifyDescription: (email: string) => `Vi skickade en sexsiffrig kod till ${email}. Koden gäller i 15 minuter.`,
    verifyCode: 'Verifieringskod',
    verifyCodePlaceholder: '000000',
    submitVerify: 'Verifiera',
    resendCode: 'Skicka ny kod',
    resendCodeSent: 'Ny kod skickad!'
  },
  en: {
    login: 'Log in',
    register: 'Create account',
    title: `Welcome to ${siteConfig.name}`,
    description:
      'Log in or create an account with your verified school domain to access planning, resources, and saved checklist progress.',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    submitLogin: 'Log in',
    submitRegister: 'Create account',
    helper: 'Example verified domains: yh.nackademin.se and hogwarts.wiz.',
    loading: 'Working...',
    verifyTitle: 'Check your email',
    verifyDescription: (email: string) => `We sent a 6-digit code to ${email}. It expires in 15 minutes.`,
    verifyCode: 'Verification code',
    verifyCodePlaceholder: '000000',
    submitVerify: 'Verify',
    resendCode: 'Resend code',
    resendCodeSent: 'New code sent!'
  }
} as const;

const tabClassName = (isActive: boolean) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
    isActive
      ? 'bg-primary text-white'
      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
  }`;

const AuthPage = () => {
  const { locale } = useLocale();
  const { isAuthenticated, isLoading, login, register, verifyEmail, resendVerification } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [pendingEmail, setPendingEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendSent, setResendSent] = useState(false);
  const copy = copyByLocale[locale] ?? copyByLocale.sv;
  const redirectPath = useMemo(
    () => (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/account',
    [location.state]
  );

  if (isAuthenticated) {
    return <Navigate replace to={redirectPath} />;
  }

  if (isLoading) {
    return (
      <main className={`${siteShellClassName} flex flex-1 items-center justify-center py-16`}>
        <p className="text-sm text-slate-600 dark:text-slate-300">{copy.loading}</p>
      </main>
    );
  }

  const goToVerify = (verifyEmail: string) => {
    setPendingEmail(verifyEmail);
    setCode('');
    setError(null);
    setResendSent(false);
    setMode('verify');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (mode === 'register') {
        const registeredEmail = await register({ name, email, password });
        goToVerify(registeredEmail);
      } else if (mode === 'login') {
        try {
          await login({ email, password });
          navigate(redirectPath, { replace: true });
        } catch (loginError) {
          if (loginError instanceof ApiError && loginError.status === 403) {
            goToVerify(email);
            return;
          }
          throw loginError;
        }
      } else {
        await verifyEmail(pendingEmail, code);
        navigate(redirectPath, { replace: true });
      }
    } catch (submissionError) {
      if (submissionError instanceof ApiError) {
        setError(submissionError.message);
      } else {
        setError(
          locale === 'sv'
            ? 'Kunde inte kontakta backend. Kontrollera att backend-servern körs och att frontendens adress är tillåten.'
            : 'Could not reach the backend. Check that the backend server is running and that the frontend origin is allowed.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setError(null);
    setResendSent(false);
    try {
      await resendVerification(pendingEmail);
      setResendSent(true);
    } catch (resendError) {
      if (resendError instanceof ApiError) {
        setError(resendError.message);
      }
    }
  };

  if (mode === 'verify') {
    return (
      <main className={`${siteShellClassName} flex flex-1 items-center py-16`}>
        <section className="mx-auto w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-card dark:border-slate-700 dark:bg-slate-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-2xl">
            ✉️
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-100">
            {copy.verifyTitle}
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            {copy.verifyDescription(pendingEmail)}
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                {copy.verifyCode}
              </span>
              <input
                autoComplete="one-time-code"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-center text-2xl font-semibold tracking-[0.5em] text-slate-900 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                inputMode="numeric"
                maxLength={6}
                onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder={copy.verifyCodePlaceholder}
                required
                type="text"
                value={code}
              />
            </label>

            {error ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200">
                {error}
              </div>
            ) : null}

            {resendSent ? (
              <p className="text-center text-sm font-medium text-primary">{copy.resendCodeSent}</p>
            ) : null}

            <button
              className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting || code.length < 6}
              type="submit"
            >
              {isSubmitting ? copy.loading : copy.submitVerify}
            </button>

            <button
              className="w-full text-center text-sm text-slate-500 underline-offset-2 hover:text-primary hover:underline dark:text-slate-400"
              onClick={handleResend}
              type="button"
            >
              {copy.resendCode}
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className={`${siteShellClassName} flex flex-1 items-center py-16`}>
      <section className="mx-auto w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-card dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-wrap gap-3">
          <button
            className={tabClassName(mode === 'login')}
            onClick={() => setMode('login')}
            type="button"
          >
            {copy.login}
          </button>
          <button
            className={tabClassName(mode === 'register')}
            onClick={() => setMode('register')}
            type="button"
          >
            {copy.register}
          </button>
        </div>

        <h1 className="mt-6 text-3xl font-semibold text-slate-900 dark:text-slate-100">
          {copy.title}
        </h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{copy.description}</p>
        <p className="mt-2 text-sm font-medium text-primary">{copy.helper}</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {mode === 'register' ? (
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                {copy.name}
              </span>
              <input
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                onChange={(event) => setName(event.target.value)}
                required
                type="text"
                value={name}
              />
            </label>
          ) : null}

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              {copy.email}
            </span>
            <input
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              {copy.password}
            </span>
            <input
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              minLength={8}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
          </label>

          {error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200">
              {error}
            </div>
          ) : null}

          <button
            className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting
              ? copy.loading
              : mode === 'register'
                ? copy.submitRegister
                : copy.submitLogin}
          </button>
        </form>
      </section>
    </main>
  );
};

export default AuthPage;
