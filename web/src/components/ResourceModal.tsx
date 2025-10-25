import { useEffect } from 'react';
import type { ComponentType } from 'react';
import type { MDXProps } from 'mdx/types';

interface ResourceModalProps {
  resource: {
    title: string;
    type: string;
    downloadLabel?: string;
    downloadUrl?: string;
    Content: ComponentType<MDXProps>;
  } | null;
  onClose: () => void;
}

const ResourceModal = ({ resource, onClose }: ResourceModalProps) => {
  const open = Boolean(resource);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  if (!open || !resource) {
    return null;
  }

  const { Content, title, type, downloadLabel, downloadUrl } = resource;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-10"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative flex h-full max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-elevated"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-primary">{type}</span>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          </div>
          <div className="flex items-center gap-3">
            {downloadUrl && downloadLabel ? (
              <a
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary/10"
                href={downloadUrl}
                target="_blank"
                rel="noreferrer"
              >
                {downloadLabel}
              </a>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="focus-ring rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Stäng"
            >
              ✕
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-6 text-sm leading-relaxed text-slate-700 [&>h2]:mt-6 [&>h2]:text-base [&>h2]:font-semibold [&>h2]:text-slate-900 [&>h2:first-of-type]:mt-0 [&>p]:mt-3 [&>p]:text-slate-700 [&>ul]:mt-3 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:mt-3 [&>ol]:list-decimal [&>ol]:pl-5 [&>pre]:mt-4 [&>pre]:overflow-x-auto [&>pre]:rounded-2xl [&>pre]:bg-slate-900 [&>pre]:p-4 [&>code]:font-mono">
          <Content />
        </div>
      </div>
    </div>
  );
};

export default ResourceModal;
