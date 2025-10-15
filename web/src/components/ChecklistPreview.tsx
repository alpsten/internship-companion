import type { FC } from 'react';

type ChecklistItem = {
  id: string;
  text: string;
  done: boolean;
};

interface ChecklistPreviewProps {
  title: string;
  description: string;
  items: ChecklistItem[];
  onToggle: (id: string) => void;
}

const ChecklistPreview: FC<ChecklistPreviewProps> = ({ title, description, items, onToggle }) => (
  <section id="checklista" className="grid gap-8 rounded-3xl bg-white p-8 shadow-md">
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
    <ol className="grid gap-3">
      {items.map((task) => (
        <li key={task.id}>
          <button
            type="button"
            onClick={() => onToggle(task.id)}
            className="focus-ring group flex w-full items-start gap-3 rounded-2xl border border-slate-200 bg-surface p-4 text-left transition ease-in-out-soft hover:-translate-y-0.5 hover:border-primary/60 hover:shadow"
          >
            <span
              className={`mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full border text-sm font-semibold transition ease-in-out-soft ${
                task.done
                  ? 'border-primary bg-primary text-white shadow-elevated'
                  : 'border-primary text-primary'
              }`}
            >
              {task.done ? '✓' : ''}
            </span>
            <p className="text-sm text-slate-700">{task.text}</p>
          </button>
        </li>
      ))}
    </ol>
    <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4 text-sm text-slate-600">
      Dina bockade punkter sparas lokalt i den här webbläsaren.
    </div>
  </section>
);

export default ChecklistPreview;
