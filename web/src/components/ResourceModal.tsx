import { useEffect, useId, useRef } from 'react';
import type { ComponentType } from 'react';
import type { MDXProps } from 'mdx/types';
import { trackDownload } from '../analytics';
import { useLocale } from '../i18n/LocaleContext';
import { resolveAssetUrl } from '../siteConfig';
import type { DownloadOption } from '../content';

interface ResourceModalProps {
  resource: {
    slug: string;
    title: string;
    type: string;
    downloadLabel?: string;
    downloadUrl?: string;
    downloads?: DownloadOption[];
    Content: ComponentType<MDXProps>;
  } | null;
  restoreFocusElement: HTMLElement | null;
  onClose: () => void;
}

const modalCopy = {
  sv: {
    closeLabel: 'Stäng resurs',
    description: 'Läser resurs i modal'
  },
  en: {
    closeLabel: 'Close resource',
    description: 'Reading resource in modal'
  }
} as const;

const ResourceModal = ({ resource, restoreFocusElement, onClose }: ResourceModalProps) => {
  const { locale } = useLocale();
  const open = Boolean(resource);
  const titleId = useId();
  const descriptionId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const copy = modalCopy[locale] ?? modalCopy.en;

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !modalRef.current) {
        return;
      }

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements.length) {
        event.preventDefault();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handler);
      restoreFocusElement?.focus();
    };
  }, [onClose, open, restoreFocusElement]);

  if (!open) {
    return null;
  }

  if (!open || !resource) {
    return null;
  }

  const { Content, slug, title, type, downloads = [] } = resource;
  const resolvedDownloads = downloads.map((download) => ({
    ...download,
    url: resolveAssetUrl(download.url)
  }));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-10 dark:bg-slate-900/80"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative flex h-full max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-elevated dark:bg-slate-950 dark:text-slate-100"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-4 dark:border-slate-700">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-primary">{type}</span>
            <h3 id={titleId} className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            {resolvedDownloads.map((download) => (
              <a
                key={download.url}
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary/10 dark:border-primary/60"
                href={download.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackDownload(slug, download.url, 'resource_modal')}
              >
                {download.label}
              </a>
            ))}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="focus-ring rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              aria-label={copy.closeLabel}
            >
              ✕
            </button>
          </div>
        </header>
        <div
          id={descriptionId}
          className="sr-only"
        >
          {copy.description}
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300 [&>h2]:mt-6 [&>h2]:text-base [&>h2]:font-semibold [&>h2]:text-slate-900 [&>h2:first-of-type]:mt-0 [&>h2]:dark:text-slate-100 [&>p]:mt-3 [&>p]:text-slate-700 [&>p]:dark:text-slate-300 [&>ul]:mt-3 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:mt-3 [&>ol]:list-decimal [&>ol]:pl-5 [&>pre]:mt-4 [&>pre]:overflow-x-auto [&>pre]:rounded-2xl [&>pre]:bg-slate-900 [&>pre]:p-4 [&>code]:font-mono">
          <Content />
        </div>
      </div>
    </div>
  );
};

export default ResourceModal;
