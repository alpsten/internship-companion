type AnalyticsValue = string | number | boolean;

export type AnalyticsProps = Record<string, AnalyticsValue>;

const PLAUSIBLE_SCRIPT_ID = 'plausible-script';

const analyticsConfig = {
  plausibleDomain: import.meta.env.VITE_PLAUSIBLE_DOMAIN,
  plausibleApiHost: import.meta.env.VITE_PLAUSIBLE_API_HOST ?? 'https://plausible.io'
} as const;

const normalizeProps = (props: AnalyticsProps = {}) =>
  Object.fromEntries(
    Object.entries(props).map(([key, value]) => [key, String(value)])
  );

export const initAnalytics = () => {
  if (typeof document === 'undefined' || !analyticsConfig.plausibleDomain) {
    return;
  }

  if (document.getElementById(PLAUSIBLE_SCRIPT_ID)) {
    return;
  }

  const script = document.createElement('script');
  script.id = PLAUSIBLE_SCRIPT_ID;
  script.defer = true;
  script.dataset.domain = analyticsConfig.plausibleDomain;
  script.src = `${analyticsConfig.plausibleApiHost}/js/script.js`;
  document.head.appendChild(script);
};

export const trackEvent = (name: string, props: AnalyticsProps = {}) => {
  if (typeof window === 'undefined') {
    return;
  }

  const normalizedProps = normalizeProps(props);

  window.dispatchEvent(
    new CustomEvent('internship-companion:analytics', {
      detail: { name, props: normalizedProps }
    })
  );

  window.plausible?.(name, { props: normalizedProps });
};

export const trackPageView = (path: string, props: AnalyticsProps = {}) => {
  if (typeof window === 'undefined') {
    return;
  }

  const normalizedProps = normalizeProps(props);

  window.dispatchEvent(
    new CustomEvent('internship-companion:pageview', {
      detail: { path, props: normalizedProps }
    })
  );

  if (window.plausible) {
    const currentUrl = new URL(path, window.location.origin).toString();
    window.plausible('pageview', { props: normalizedProps, u: currentUrl });
  }
};

export const trackDownload = (resourceSlug: string, downloadUrl: string, source: string) => {
  trackEvent('resource_downloaded', {
    resource_slug: resourceSlug,
    download_url: downloadUrl,
    source
  });
};
