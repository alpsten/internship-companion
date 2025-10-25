import type { ComponentType } from 'react';
import type { MDXProps } from 'mdx/types';

export type Locale = 'sv' | 'en';

export const heroContent = {
  badge: 'Du behöver bara ett ja',
  title: 'Checklistan som gör LIA-jakten tydlig, lugn och genomförbar.',
  description:
    'Strukturera din sökprocess med guider, mallar och trackers på svenska. Allt samlat på ett ställe så att du kan fokusera på nästa steg.'
};

export const journeyHighlights = [
  {
    title: 'Förbered dig',
    description:
      'Uppdatera LinkedIn, GitHub och CV så att rekryterare omedelbart ser vem du är och vad du kan.'
  },
  {
    title: 'Nå ut på riktigt',
    description:
      'Använd mallar som går att anpassa, följ upp respektfullt och bygg relationer istället för massutskick.'
  },
  {
    title: 'Håll momentum',
    description:
      'Följ upp ditt arbete dag för dag, reflektera efter varje svar och fira små segrar.'
  }
];

export const checklistPreview = [
  {
    id: 'headline',
    text: 'Sätt din LinkedIn-rubrik till "Java Developer Student | LIA Våren [år]"'
  },
  {
    id: 'github',
    text: 'Rensa bland GitHub-repon och pinna dina 2–3 starkaste projekt'
  },
  {
    id: 'company-list',
    text: 'Lista fem företag du vill kontakta den här veckan'
  },
  {
    id: 'pitch',
    text: 'Förbered en kort telefonpitch med vem du är och vad du söker'
  }
];

export const faqItems = [
  {
    id: 'start-applying',
    title: 'När ska jag börja söka?',
    content:
      'Så tidigt som möjligt. Ju fler kontakter och iterationer du får in, desto bättre chans att hitta rätt match.'
  },
  {
    id: 'no-portfolio',
    title: 'Jag har inget portfolio ännu, vad gör jag?',
    content:
      'Börja med ett eller två projekt som visar hur du tänker. Det viktiga är tydlighet och dokumentation, inte mängden kod.'
  },
  {
    id: 'no-responses',
    title: 'Ingen svarar på mina utskick, ska jag ge upp?',
    content:
      'Nej! Granska vad du skickat, be om feedback från klasskamrater och bredda listan med bolag. Följ upp en gång till innan du går vidare.'
  },
  {
    id: 'follow-up',
    title: 'Hur ofta kan jag följa upp utan att verka tjatig?',
    content:
      'Skicka en vänlig påminnelse efter 5–7 arbetsdagar. Om du inte får svar, gör ett sista försök efter ytterligare en vecka och gå sedan vidare till nästa företag.'
  },
  {
    id: 'swedish-or-english',
    title: 'Ska jag skriva på svenska eller engelska?',
    content:
      'Spegla företaget. Är deras sajt och annonser på svenska kan du skriva på svenska. Om du är osäker eller om bolaget är internationellt? Kör engelska och visa att du är bekväm i båda språken.'
  },
  {
    id: 'salary-question',
    title: 'Får jag prata om ersättning under intervjun?',
    content:
      'Vänta tills företaget tar upp det eller tills du kommer längre i processen. Fokus i början är att visa vad du vill lära dig och hur du kan bidra.'
  }
];

export type ResourceType = 'Guide' | 'Mall' | 'Tracker';

export interface ResourceFrontmatter {
  title: string;
  type: ResourceType;
  summary: string;
  slug: string;
  stage: 'prepare' | 'network' | 'outreach' | 'interviews' | 'momentum';
  order: number;
  downloadLabel?: string;
  downloadUrl?: string;
  locale?: Locale;
}

interface ResourceModule {
  default: ComponentType<MDXProps>;
  frontmatter: ResourceFrontmatter;
}

const resourceModules = import.meta.glob<ResourceModule>('./content/resources/**/*.mdx', {
  eager: true
});

export interface Resource extends ResourceFrontmatter {
  Content: ComponentType<MDXProps>;
}

export type ResourceSummary = Omit<Resource, 'Content'>;

const resources: Resource[] = Object.values(resourceModules)
  .map((module) => {
    const frontmatter = module.frontmatter ?? ({} as ResourceFrontmatter);
    const locale = (frontmatter.locale ?? 'sv') as Locale;

    return {
      ...frontmatter,
      locale,
      Content: module.default
    } as Resource;
  })
  .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER));

const resourceSummaries: ResourceSummary[] = resources.map(({ Content, ...summary }) => summary);

export const getResourceBySlug = (slug: string, locale: Locale = 'sv') =>
  resources.find((resource) => resource.slug === slug && resource.locale === locale) ??
  resources.find((resource) => resource.slug === slug && resource.locale === 'sv');

export const getResourceSummaryBySlug = (slug: string, locale: Locale = 'sv') =>
  resourceSummaries.find((resource) => resource.slug === slug && resource.locale === locale) ??
  resourceSummaries.find((resource) => resource.slug === slug && resource.locale === 'sv');

export const getResources = (locale: Locale = 'sv') =>
  resources.filter((resource) => resource.locale === locale);

export const getResourceSummaries = (locale: Locale = 'sv') =>
  resourceSummaries.filter((resource) => resource.locale === locale);

export interface PlanTask {
  id: string;
  text: string;
  resourceSlug?: string;
}

export interface PlanStage {
  id: string;
  title: string;
  description: string;
  milestone: string;
  tasks: PlanTask[];
  resourceSlugs?: string[];
  tips?: string[];
}

export const planStages: PlanStage[] = [
  {
    id: 'prepare',
    title: 'Förberedelser',
    description:
      'Gör dig redo att sticka ut med en proffsig LinkedIn, GitHub och ett CV som visar vad du vill bidra med.',
    milestone: 'Profiler och portfolio på plats',
    tasks: [
      {
        id: 'prepare-linkedin',
        text: 'Polera LinkedIn med ny rubrik, uppdaterad om-text och aktuella erfarenheter.',
        resourceSlug: 'linkedin-guide'
      },
      {
        id: 'prepare-github',
        text: 'Rensa bland GitHub-repon, döp om otydliga projekt och lägg till README och license.'
      },
      {
        id: 'prepare-cv',
        text: 'Se över CV:t – börja med utbildning, lägg till teknikstackar och länka portfolio.'
      },
      {
        id: 'prepare-pitch',
        text: 'Skriv en kort hisspitch (30 sekunder) om vem du är och vad du söker.'
      }
    ],
    resourceSlugs: ['linkedin-guide'],
    tips: [
      'Be en klasskompis eller handledare ge snabb feedback på LinkedIn och CV – två ögon ser mer.',
      'Dokumentera varje projekt med README, skärmbilder och lärdomar så rekryterare förstår din process.',
      'Kör en testinspelning av din pitch på mobilen och lyssna – byt ut ord som känns hackiga.'
    ]
  },
  {
    id: 'network',
    title: 'Bygg nätverk',
    description:
      'Kartlägg vilka du redan känner, och hur de kan introducera dig för rätt personer eller företag.',
    milestone: 'Lista med varma kontakter klar',
    tasks: [
      {
        id: 'network-list',
        text: 'Lista familj, vänner, klasskompisar, lärare och tidigare kollegor som kan tipsa dig vidare.'
      },
      {
        id: 'network-message',
        text: 'Skicka ett kort uppdateringsmeddelande till fem personer och berätta att du söker LIA.'
      },
      {
        id: 'network-alumni',
        text: 'Hitta minst två alumner eller tidigare praktikanter som kan dela erfarenheter.'
      },
      {
        id: 'network-follow',
        text: 'Följ tre företag eller handledare på LinkedIn och börja engagera dig i deras inlägg.'
      }
    ],
    resourceSlugs: ['natverksplan'],
    tips: [
      'Var specifik när du ber om hjälp – nämn bransch, period och vad du kan erbjuda.',
      'Följ upp tack-svar inom 24 timmar så relationen känns levande.',
      'Använd ansökningsloggen för att markera "varm kontakt" och vad nästa steg är.'
    ]
  },
  {
    id: 'outreach',
    title: 'Kontakta företag',
    description:
      'Skicka personliga meddelanden, följ upp och håll koll på vem du har pratat med och vad som händer härnäst.',
    milestone: 'Första kontakterna utskickade',
    tasks: [
      {
        id: 'outreach-research',
        text: 'Välj tre företag och skriv ner varför de intresserar dig.'
      },
      {
        id: 'outreach-email',
        text: 'Skicka minst tre anpassade mejl med hjälp av kontaktmallarna.',
        resourceSlug: 'kontaktmallar'
      },
      {
        id: 'outreach-followup',
        text: 'Planera en uppföljning sju dagar efter första utskicket.'
      },
      {
        id: 'outreach-call',
        text: 'Ring ett företag och fråga vem som ansvarar för LIA-praktikanter.'
      }
    ],
    resourceSlugs: ['kontaktmallar'],
    tips: [
      'Skriv alltid två meningar om varför just det företaget – ingen vill ha massmejl.',
      'Planera uppföljning redan när du skickar första mailet och notera datum i loggen.',
      'Ring små företag på förmiddagen – då har de ofta mer tid att prata.'
    ]
  },
  {
    id: 'interviews',
    title: 'Intervjuer',
    description:
      'Förbered svar, samla frågor att ställa och reflektera efter varje samtal för att förbättra nästa gång.',
    milestone: 'Trygg i intervjusituationen',
    tasks: [
      {
        id: 'interview-story',
        text: 'Skriv ner två exempel (STAR-metoden) där du löste ett problem eller lärde dig något svårt.'
      },
      {
        id: 'interview-questions',
        text: 'Förbered tre frågor att ställa till varje företag.'
      },
      {
        id: 'interview-mock',
        text: 'Gör en övningsintervju med en klasskompis eller mentor.'
      },
      {
        id: 'interview-reflect',
        text: 'Skapa en mall för att skriva ner vad som gick bra och vad du vill förbättra efter varje intervju.'
      }
    ],
    resourceSlugs: ['intervjuguide'],
    tips: [
      'Öva dina stories högt – gärna med någon som kan ställa följdfrågor.',
      'Förbered ett block med dina frågor så du slipper improvisera under intervjun.',
      'Skriv tack-mejl samma dag – repetera ett guldkorn från samtalet.'
    ]
  },
  {
    id: 'momentum',
    title: 'Momentum',
    description:
      'Håll energin uppe genom att följa dina siffror, fira små framsteg och justera planen efter feedback.',
    milestone: 'System för uppföljning och motivation',
    tasks: [
      {
        id: 'momentum-tracker',
        text: 'Sätt upp ansökningsloggen och fyll i de kontakter du redan tagit.',
        resourceSlug: 'ansokningslogg'
      },
      {
        id: 'momentum-goals',
        text: 'Bestäm ett veckomål för antal nya kontakter och uppföljningar.'
      },
      {
        id: 'momentum-review',
        text: 'Boka 15 minuter varje vecka för att gå igenom vad som fungerar och vad som behöver justeras.'
      },
      {
        id: 'momentum-celebrate',
        text: 'Fira varje svar eller intervju – skriv ner varför det var ett steg framåt.'
      }
    ],
    resourceSlugs: ['ansokningslogg', 'progress-logg', 'veckoreflektion', 'firaframsteg'],
    tips: [
      'Sätt ett rimligt veckomål (t.ex. tre utskick) och justera efter energinivå.',
      'Blocka kalendern för reflektion varje fredag – bestäm vad du fortsätter, stoppar, startar.',
      'Fira varje aktivitet du genomför, inte bara svaren – det bygger momentum.'
    ]
  }
];

export const getRecommendedResources = (slugs: string[] = [], locale: Locale = 'sv') =>
  slugs
    .map((slug) => getResourceSummaryBySlug(slug, locale))
    .filter((item): item is ResourceSummary => Boolean(item));
