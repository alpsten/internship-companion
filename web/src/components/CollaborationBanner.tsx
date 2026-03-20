import { useLocale } from '../i18n/LocaleContext';
import { siteConfig } from '../siteConfig';

const bannerCopy = {
  sv: {
    title: 'Bygg vidare tillsammans',
    description:
      'All kod och allt innehåll lever i projektet. Bidra med förbättringar, föreslå nya mallar eller hjälp oss vässa upplevelsen ytterligare.',
    github: 'Öppna GitHub',
    contact: 'Kontakta oss'
  },
  en: {
    title: 'Build together with us',
    description:
      'Every line of code and every asset lives in the project. Submit improvements, suggest new templates, or help us sharpen the experience.',
    github: 'Open GitHub',
    contact: 'Contact us'
  }
};

const CollaborationBanner = () => {
  const { locale } = useLocale();
  const copy = bannerCopy[locale] ?? bannerCopy.sv;

  return (
    <section className="rounded-3xl bg-slate-900 p-8 text-white dark:bg-slate-800">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">{copy.title}</h2>
        <p className="text-sm text-slate-200">{copy.description}</p>
        <div className="flex flex-wrap gap-3">
          <a
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-lg"
            href={siteConfig.repoUrl}
            target="_blank"
            rel="noreferrer"
          >
            {copy.github}
          </a>
          <a
            className="rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            href={`mailto:${siteConfig.contactEmail}`}
          >
            {copy.contact}
          </a>
        </div>
      </div>
    </section>
  );
};

export default CollaborationBanner;
