import type { ComponentType } from 'react';
import type { MDXProps } from 'mdx/types';

export type Locale = 'sv' | 'en';

export interface HeroContent {
  badge: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
}

const heroContentByLocale: Record<Locale, HeroContent> = {
  sv: {
    badge: 'Intro & mindset',
    title: 'Din kompis genom LIA-jakten.',
    description:
      'Vi samlar guider, mallar och mindset-tips så att du kan navigera LIA-processen med lugn, struktur och uthållighet.',
    primaryCtaLabel: 'Utforska plan-flödet',
    secondaryCtaLabel: 'Öppna resursbiblioteket'
  },
  en: {
    badge: 'Intro & mindset',
    title: 'Your companion through the internship hunt.',
    description:
      'Curated guides, templates, and mindset cues that keep your internship search clear, calm, and full of momentum.',
    primaryCtaLabel: 'Explore the plan',
    secondaryCtaLabel: 'Browse resources'
  }
};

const mindsetMantrasByLocale: Record<Locale, string[]> = {
  sv: [
    'Bygg relationer – ett varmt tips slår tio kalla utskick.',
    'Ta små steg varje vecka – jämn takt vinner i längden.',
    'Fira framsteg även när svaret dröjer – uthållighet skapar det där ja:et.'
  ],
  en: [
    'Build relationships—one warm introduction beats ten cold emails.',
    'Take small steps every week—steady pace wins over one-off bursts.',
    'Celebrate progress even when replies are slow—persistence unlocks the “yes”.'
  ]
};

const groundRulesByLocale: Record<Locale, string[]> = {
  sv: [
    'Personalisera varje kontakt och visa att du förstår bolaget.',
    'Följ upp respektfullt – en eller två gånger räcker.',
    'Var ödmjuk, nyfiken och tacka även när svaret är nej.',
    'Logga vad du gör så du ser mönster och lärdomar över tid.'
  ],
  en: [
    'Personalise every outreach and show you understand the company.',
    'Follow up respectfully—once or twice is enough.',
    'Stay humble, curious, and thank people even when the answer is no.',
    'Log your actions so you spot patterns and lessons over time.'
  ]
};

export interface JourneyHighlight {
  title: string;
  description: string;
}

const journeyHighlightsByLocale: Record<Locale, JourneyHighlight[]> = {
  sv: [
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
  ],
  en: [
    {
      title: 'Get prepared',
      description:
        'Refresh LinkedIn, GitHub, and your CV so supervisors instantly understand who you are and what you bring.'
    },
    {
      title: 'Reach out with intent',
      description:
        'Use adaptable templates, follow up respectfully, and build relationships instead of blasting generic messages.'
    },
    {
      title: 'Keep momentum',
      description:
        'Track your actions day by day, reflect after every reply, and celebrate the wins that keep you moving.'
    }
  ]
};

export interface ChecklistPreviewItem {
  id: string;
  text: string;
}

const checklistPreviewByLocale: Record<Locale, ChecklistPreviewItem[]> = {
  sv: [
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
  ],
  en: [
    {
      id: 'headline',
      text: 'Update your LinkedIn headline to “Software Developer Student | Internship Spring [year]”'
    },
    {
      id: 'github',
      text: 'Tidy your GitHub profile and pin the 2–3 projects you want recruiters to see first'
    },
    {
      id: 'company-list',
      text: 'List five companies you want to contact this week'
    },
    {
      id: 'pitch',
      text: 'Draft a 30-second pitch that explains who you are and what internship you want'
    }
  ]
};

export interface FAQItem {
  id: string;
  title: string;
  content: string;
}

const faqItemsByLocale: Record<Locale, FAQItem[]> = {
  sv: [
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
  ],
  en: [
    {
      id: 'start-applying',
      title: 'When should I start applying?',
      content:
        'As early as possible. The more conversations and iterations you get through, the higher your chance of finding a great match.'
    },
    {
      id: 'no-portfolio',
      title: 'I do not have a portfolio yet—what do I do?',
      content:
        'Start with one or two projects that show how you think. Clarity and documentation matter more than having dozens of repos.'
    },
    {
      id: 'no-responses',
      title: 'Nobody is replying to my outreach—should I quit?',
      content:
        'No. Review what you sent, ask classmates for feedback, and widen the list of companies. Send one polite follow-up before you move on.'
    },
    {
      id: 'follow-up',
      title: 'How often can I follow up without feeling pushy?',
      content:
        'Send a friendly reminder after 5–7 business days. If you still do not hear back, try one final follow-up a week later and switch to the next lead.'
    },
    {
      id: 'swedish-or-english',
      title: 'Should I write in Swedish or English?',
      content:
        'Mirror the company. If their site and job ads are in Swedish, go Swedish. If it is international or unclear, go with English and show you are comfortable in both.'
    },
    {
      id: 'salary-question',
      title: 'Can I ask about compensation during the interview?',
      content:
        'Wait until the company brings it up or you are further in the process. Early conversations should focus on what you want to learn and how you can contribute.'
    }
  ]
};

export const getHeroContent = (locale: Locale = 'sv') =>
  heroContentByLocale[locale] ?? heroContentByLocale.sv;

export const getJourneyHighlights = (locale: Locale = 'sv') =>
  journeyHighlightsByLocale[locale] ?? journeyHighlightsByLocale.sv;

export const getMindsetMantras = (locale: Locale = 'sv') =>
  mindsetMantrasByLocale[locale] ?? mindsetMantrasByLocale.sv;

export const getGroundRules = (locale: Locale = 'sv') =>
  groundRulesByLocale[locale] ?? groundRulesByLocale.sv;

export const getChecklistPreview = (locale: Locale = 'sv') =>
  checklistPreviewByLocale[locale] ?? checklistPreviewByLocale.sv;

export const getFaqItems = (locale: Locale = 'sv') =>
  faqItemsByLocale[locale] ?? faqItemsByLocale.sv;

export type ResourceType = 'Guide' | 'Mall' | 'Tracker';

export interface DownloadOption {
  label: string;
  url: string;
}

const resourceOverridesByLocaleAndSlug: Record<Locale, Record<string, Partial<ResourceFrontmatter>>> = {
  sv: {
    'company-research-sheet': {
      title: 'Bolagsresearch',
      type: 'Tracker',
      summary:
        'Research sheet som hjalper dig jamfora bolag, hitta ratt vinklar och skriva mer personliga utskick.',
      slug: 'company-research-sheet',
      stage: 'outreach',
      order: 2
    }
  },
  en: {
    'company-research-sheet': {
      title: 'Company Research Sheet',
      type: 'Tracker',
      summary:
        'A research sheet that helps you compare companies, find stronger angles, and write more personal outreach.',
      slug: 'company-research-sheet',
      stage: 'outreach',
      order: 2,
      locale: 'en'
    }
  }
};

const resourceDownloadsByLocaleAndSlug: Record<Locale, Record<string, DownloadOption[]>> = {
  sv: {
    'company-research-sheet': [
      {
        label: 'Excel (Svenska)',
        url: 'downloads/company-research-sheet.sv.excel.csv'
      },
      {
        label: 'Numbers (Svenska)',
        url: 'downloads/company-research-sheet.sv.numbers'
      },
      {
        label: 'Excel (English)',
        url: 'downloads/company-research-sheet.en.excel.csv'
      },
      {
        label: 'Numbers (English)',
        url: 'downloads/company-research-sheet.en.numbers'
      }
    ]
  },
  en: {
    'company-research-sheet': [
      {
        label: 'Excel (English)',
        url: 'downloads/company-research-sheet.en.excel.csv'
      },
      {
        label: 'Numbers (English)',
        url: 'downloads/company-research-sheet.en.numbers'
      },
      {
        label: 'Excel (Swedish)',
        url: 'downloads/company-research-sheet.sv.excel.csv'
      },
      {
        label: 'Numbers (Swedish)',
        url: 'downloads/company-research-sheet.sv.numbers'
      }
    ]
  }
};

const resourceTypeLabelsByLocale: Record<Locale, Record<ResourceType, string>> = {
  sv: {
    Guide: 'Guide',
    Mall: 'Mall',
    Tracker: 'Tracker'
  },
  en: {
    Guide: 'Guide',
    Mall: 'Template',
    Tracker: 'Tracker'
  }
};

export const getResourceTypeLabel = (type: ResourceType, locale: Locale = 'sv') =>
  (resourceTypeLabelsByLocale[locale] ?? resourceTypeLabelsByLocale.sv)[type] ?? type;

export interface ResourceFrontmatter {
  title: string;
  type: ResourceType;
  summary: string;
  slug: string;
  stage: 'prepare' | 'network' | 'outreach' | 'interviews' | 'momentum';
  order: number;
  downloadLabel?: string;
  downloadUrl?: string;
  downloads?: DownloadOption[];
  locale?: Locale;
}

interface ResourceModule {
  default: ComponentType<MDXProps>;
  frontmatter: ResourceFrontmatter;
}

const resourceModules = import.meta.glob<ResourceModule>('./content/resources/**/*.mdx', {
  eager: true
});

export interface Resource extends Omit<ResourceFrontmatter, 'locale'> {
  locale: Locale;
  downloads: DownloadOption[];
  Content: ComponentType<MDXProps>;
}

export type ResourceSummary = Omit<Resource, 'Content'>;

const resources: Resource[] = Object.values(resourceModules)
  .map((module) => {
    const frontmatter = module.frontmatter ?? ({} as ResourceFrontmatter);
    const locale = (frontmatter.locale ?? 'sv') as Locale;
    const configuredFrontmatter =
      resourceOverridesByLocaleAndSlug[locale]?.[frontmatter.slug ?? ''] ?? {};
    const mergedFrontmatter = {
      ...frontmatter,
      ...configuredFrontmatter
    } as ResourceFrontmatter;
    const configuredDownloads =
      resourceDownloadsByLocaleAndSlug[locale]?.[mergedFrontmatter.slug] ??
      resourceDownloadsByLocaleAndSlug.sv[mergedFrontmatter.slug];
    const downloads =
      configuredDownloads ??
      mergedFrontmatter.downloads ??
      (mergedFrontmatter.downloadLabel && mergedFrontmatter.downloadUrl
        ? [{ label: mergedFrontmatter.downloadLabel, url: mergedFrontmatter.downloadUrl }]
        : []);

    return {
      ...mergedFrontmatter,
      locale,
      downloads,
      Content: module.default
    } as Resource;
  })
  .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER));

const toResourceSummary = (resource: Resource): ResourceSummary => ({
  title: resource.title,
  type: resource.type,
  summary: resource.summary,
  slug: resource.slug,
  stage: resource.stage,
  order: resource.order,
  downloadLabel: resource.downloadLabel,
  downloadUrl: resource.downloadUrl,
  downloads: resource.downloads,
  locale: resource.locale
});

const resourceSummaries: ResourceSummary[] = resources.map(toResourceSummary);

export const getResourceBySlug = (slug: string, locale: Locale = 'sv') =>
  resources.find((resource) => resource.slug === slug && resource.locale === locale) ??
  resources.find((resource) => resource.slug === slug && resource.locale === 'sv');

export const getResourceSummaryBySlug = (slug: string, locale: Locale = 'sv') =>
  resourceSummaries.find((resource) => resource.slug === slug && resource.locale === locale) ??
  resourceSummaries.find((resource) => resource.slug === slug && resource.locale === 'sv');

const getLocalizedVariant = <T extends { slug: string; locale: Locale }>(
  items: T[],
  slug: string,
  locale: Locale
) => {
  const variants = items.filter((item) => item.slug === slug);
  return (
    variants.find((item) => item.locale === locale) ??
    variants.find((item) => item.locale === 'sv') ??
    variants[0]
  ) as T;
};

export const getResources = (locale: Locale = 'sv') => {
  const seen = new Set<string>();
  const unique: Resource[] = [];

  for (const resource of resources) {
    if (seen.has(resource.slug)) {
      continue;
    }
    const preferred = getLocalizedVariant(resources, resource.slug, locale);
    unique.push(preferred);
    seen.add(preferred.slug);
  }

  return unique;
};

export const getResourceSummaries = (locale: Locale = 'sv') => getResources(locale).map(toResourceSummary);

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

const planStagesByLocale: Record<Locale, PlanStage[]> = {
  sv: [
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
          text: 'Välj tre företag och skriv ner varför de intresserar dig.',
          resourceSlug: 'company-research-sheet'
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
      resourceSlugs: ['company-research-sheet', 'kontaktmallar'],
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
  ],
  en: [
    {
      id: 'prepare',
      title: 'Prepare',
      description:
        'Get ready to stand out with a sharp LinkedIn, GitHub, and CV that shows the value you want to add.',
      milestone: 'Profiles and portfolio ready',
      tasks: [
        {
          id: 'prepare-linkedin',
          text: 'Polish LinkedIn with a new headline, refreshed About section, and up-to-date experience.',
          resourceSlug: 'linkedin-guide'
        },
        {
          id: 'prepare-github',
          text: 'Streamline your GitHub: rename unclear repos, archive noise, and add clear READMEs.'
        },
        {
          id: 'prepare-cv',
          text: 'Review your CV—lead with education, add tech stacks, and link to your portfolio.'
        },
        {
          id: 'prepare-pitch',
          text: 'Write a 30-second elevator pitch about who you are and the internship you want.'
        }
      ],
      resourceSlugs: ['linkedin-guide'],
      tips: [
        'Ask a classmate or mentor for a quick review of LinkedIn and your CV—fresh eyes catch gaps.',
        'Document every project with a README, screenshots, and lessons learned so recruiters see your thinking.',
        'Record your pitch on your phone and listen back. Tweak any phrasing that feels clunky.'
      ]
    },
    {
      id: 'network',
      title: 'Map your network',
      description:
        'List the people you already know and how they can introduce you to the right companies or mentors.',
      milestone: 'Warm contact list ready',
      tasks: [
        {
          id: 'network-list',
          text: 'List family, friends, classmates, teachers, and former colleagues who can point you toward companies.'
        },
        {
          id: 'network-message',
          text: 'Send five short update messages letting people know you are searching for an internship.'
        },
        {
          id: 'network-alumni',
          text: 'Find two alumni or former interns who can share their experience.'
        },
        {
          id: 'network-follow',
          text: 'Follow three companies or supervisors on LinkedIn and engage with their posts.'
        }
      ],
      resourceSlugs: ['natverksplan'],
      tips: [
        'Be specific when you ask for help—mention industry, timeline, and what you can contribute.',
        'Always thank people within 24 hours so the relationship stays warm.',
        'Use the application log to tag “warm contact” and note the next step.'
      ]
    },
    {
      id: 'outreach',
      title: 'Reach out',
      description:
        'Send personal messages, follow up with purpose, and stay on top of who you contacted and what happens next.',
      milestone: 'First outreach sent',
      tasks: [
        {
          id: 'outreach-research',
          text: 'Choose three companies and write down why they interest you.',
          resourceSlug: 'company-research-sheet'
        },
        {
          id: 'outreach-email',
          text: 'Send at least three tailored emails using the outreach templates.',
          resourceSlug: 'kontaktmallar'
        },
        {
          id: 'outreach-followup',
          text: 'Schedule a follow-up seven days after each first message.'
        },
        {
          id: 'outreach-call',
          text: 'Call one company to ask who is responsible for interns.'
        }
      ],
      resourceSlugs: ['company-research-sheet', 'kontaktmallar'],
      tips: [
        'Always include two lines about why you chose that company—nobody enjoys mass emails.',
        'Plan the follow-up when you send the first message and log the exact date.',
        'Call smaller companies in the morning—they usually have more time then.'
      ]
    },
    {
      id: 'interviews',
      title: 'Interviews',
      description:
        'Prepare your stories, collect smart questions, and reflect after every conversation to improve the next one.',
      milestone: 'Confident in interview situations',
      tasks: [
        {
          id: 'interview-story',
          text: 'Write two STAR examples where you solved a problem or learned something tough.'
        },
        {
          id: 'interview-questions',
          text: 'Draft three questions you want to ask every company.'
        },
        {
          id: 'interview-mock',
          text: 'Run a mock interview with a classmate or mentor.'
        },
        {
          id: 'interview-reflect',
          text: 'Create a template to log what went well and what to improve after each interview.'
        }
      ],
      resourceSlugs: ['intervjuguide'],
      tips: [
        'Practice your stories out loud—ideally with someone who can ask follow-ups.',
        'Keep a notebook with your questions so you do not have to improvise under pressure.',
        'Send a thank-you email the same day—highlight one memorable part of the conversation.'
      ]
    },
    {
      id: 'momentum',
      title: 'Momentum',
      description:
        'Keep your energy up by tracking progress, celebrating small wins, and adjusting your plan with feedback.',
      milestone: 'System for follow-up and motivation',
      tasks: [
        {
          id: 'momentum-tracker',
          text: 'Set up the application log and add the contacts you already have.',
          resourceSlug: 'ansokningslogg'
        },
        {
          id: 'momentum-goals',
          text: 'Set a weekly target for new outreaches and follow-ups.'
        },
        {
          id: 'momentum-review',
          text: 'Book a 15-minute weekly review to check what works and what needs to change.'
        },
        {
          id: 'momentum-celebrate',
          text: 'Celebrate every reply or interview—note why it was a step forward.'
        }
      ],
      resourceSlugs: ['ansokningslogg', 'progress-logg', 'veckoreflektion', 'firaframsteg'],
      tips: [
        'Pick a realistic weekly goal (for example three outreaches) and adjust to your energy levels.',
        'Block a calendar slot every Friday to decide what to continue, stop, and start.',
        'Celebrate the actions you control, not just the answers—that builds resilience.'
      ]
    }
  ]
};

export const getPlanStages = (locale: Locale = 'sv') =>
  planStagesByLocale[locale] ?? planStagesByLocale.sv;

export const getRecommendedResources = (slugs: string[] = [], locale: Locale = 'sv') =>
  slugs
    .map((slug) => getResourceSummaryBySlug(slug, locale))
    .filter((item): item is ResourceSummary => Boolean(item));

const planDefaultTipsByLocale: Record<Locale, string[]> = {
  sv: [
    'Planera en liten belöning när du avslutar ett steg.',
    'Dela din progress med någon så ni kan peppa varandra.'
  ],
  en: [
    'Plan a small reward when you complete a stage.',
    'Share your progress with someone so you can cheer each other on.'
  ]
};

export const getPlanDefaultTips = (locale: Locale = 'sv') =>
  planDefaultTipsByLocale[locale] ?? planDefaultTipsByLocale.sv;
