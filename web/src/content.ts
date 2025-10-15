import type { ComponentType } from 'react';
import type { MDXProps } from 'mdx/types';

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
  }
];

export type ResourceType = 'Guide' | 'Mall' | 'Tracker';

export interface ResourceFrontmatter {
  title: string;
  type: ResourceType;
  summary: string;
  slug: string;
  stage: 'prepare' | 'outreach' | 'momentum';
  order: number;
  downloadLabel?: string;
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

export const resources: Resource[] = Object.values(resourceModules)
  .map((module) => ({
    ...module.frontmatter,
    Content: module.default
  }))
  .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER));

export const resourceSummaries: ResourceSummary[] = resources.map(({ Content, ...summary }) => summary);

export const getResourceBySlug = (slug: string) =>
  resources.find((resource) => resource.slug === slug);

export const getResourceSummaryBySlug = (slug: string) =>
  resourceSummaries.find((resource) => resource.slug === slug);

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
    resourceSlugs: ['linkedin-guide']
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
    resourceSlugs: ['kontaktmallar']
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
    resourceSlugs: ['ansokningslogg']
  }
];

export const getRecommendedResources = (slugs: string[] = []) =>
  slugs
    .map((slug) => getResourceSummaryBySlug(slug))
    .filter((item): item is ResourceSummary => Boolean(item));
