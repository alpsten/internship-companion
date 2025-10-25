import { Link } from 'react-router-dom';

const AboutPage = () => (
  <div className="bg-surface text-slate-900">
    <section className="bg-gradient-to-br from-primary to-accent text-white">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
          Om projektet
        </span>
        <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">
          Hjälper LIA-studenter hitta fokus, momentum och det avgörande <span className="italic">ja</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-white/80">
          Internship Checklist är ett ideellt driv som samlar guider, mallar och verktyg för att göra
          praktikjakten tydlig och mänsklig. Vi bygger öppet – allt innehåll och all kod finns här i
          repositoriet.
        </p>
      </div>
    </section>

    <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-16 sm:px-10">
      <section className="grid gap-8 rounded-3xl bg-white p-8 shadow-card lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Varför vi bygger</h2>
          <p className="text-sm text-slate-600">
            Många svenska utvecklarstudenter beskriver LIA-perioden som stressig och spretig.
            Genom att bryta ner processen i tydliga steg och erbjuda språk-anpassade mallar vill vi
            skapa en trygg kompanjon som gör det enkelt att ta nästa mikro-steg.
          </p>
          <p className="text-sm text-slate-600">
            Projektet utgår från principerna i produktbriefen: struktur, professionalitet och empati.
            Allt vi publicerar ska ge konkret värde inom några minuter.
          </p>
        </div>
        <div className="space-y-4 rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
            Ledarskap & beslutsvägar
          </h3>
          <p className="text-sm text-slate-600">
            Projektledare är <a className="text-primary underline" href="https://github.com/alpsten">/alpsten</a>.
            Större riktning- och arkitekturbeslut ska förankras med hen innan implementation.
          </p>
          <p className="text-sm text-slate-600">
            Läs <code className="rounded bg-slate-100 px-1 py-0.5 text-xs text-slate-600">docs/AGENTS.md</code>{' '}
            och <code className="rounded bg-slate-100 px-1 py-0.5 text-xs text-slate-600">docs/CODEX.md</code> för
            hur vi samarbetar och skriver kod.
          </p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: 'Produktbrief',
            description:
              'Målgrupper, kärnresor och MVP-scope. Härifrån hämtar vi storyline och prioriteringar.',
            href: '/docs/product-brief.md'
          },
          {
            title: 'Content outline',
            description:
              'Detaljerad struktur för guider, mallar och downloads som driver resursbiblioteket.',
            href: '/docs/content-outline.md'
          },
          {
            title: 'MDX-workflow',
            description:
              'Steg-för-steg för att lägga till nya resurser, koppla dem till plansteg och publicera.',
            href: '/docs/mdx-workflow.md'
          }
        ].map((card) => (
          <a
            key={card.title}
            href={card.href}
            className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="space-y-3">
              <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                Dokumentation
              </span>
              <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
              <p className="text-sm text-slate-600">{card.description}</p>
            </div>
            <span className="mt-6 text-sm font-semibold text-primary">Öppna filen →</span>
          </a>
        ))}
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-card">
        <h2 className="text-2xl font-semibold text-slate-900">Bidra eller återkoppla</h2>
        <p className="mt-4 text-sm text-slate-600">
          Vi välkomnar förbättringar i både innehåll och kod, men följ lagboken i{' '}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs text-slate-600">docs/CODEX.md</code>.
          För nya idéer – börja med ett issue eller ping{' '}
          <a className="text-primary underline" href="https://github.com/alpsten">
            @alpsten
          </a>{' '}
          i Slack/GitHub innan du öppnar en PR. Mindre copy-fixar kan du submit:a direkt med en tydlig
          beskrivning.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/plan"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-accent"
          >
            Utforska plan-flödet
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
          >
            Till startsidan
          </Link>
        </div>
      </section>
    </main>
  </div>
);

export default AboutPage;
