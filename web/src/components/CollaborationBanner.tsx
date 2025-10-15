const CollaborationBanner = () => (
  <section className="rounded-3xl bg-slate-900 p-8 text-white">
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Bygg vidare tillsammans</h2>
      <p className="text-sm text-slate-200">
        All kod och allt innehåll lever i GitHub-repot. Bidra med förbättringar, föreslå nya mallar eller hjälp oss översätta till engelska.
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-lg"
          href="https://github.com/alpsten/internship-checklist"
          target="_blank"
          rel="noreferrer"
        >
          Öppna GitHub
        </a>
        <a
          className="rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          href="mailto:contact@example.com"
        >
          Kontakta oss
        </a>
      </div>
    </div>
  </section>
);

export default CollaborationBanner;
