import { Question, QuizAnswers } from "./types";

// Centralized labels to avoid duplication and mapping errors
export const OPTION_LABELS = {
  clinicType: {
    DENTAL: "Tandklinik",
    PHYSIO: "Fys / kiro / osteopat",
    PSYCH: "Psykolog / terapi",
    BEAUTY: "Skønhed / velvære",
    OTHER: "Anden klinik",
  },
  whoAnswers: {
    RECEPTION: "Reception / kliniksekretær",
    PRACTITIONERS: "Behandlerne selv",
    ROTATING: "Vi skiftes",
  },
  frequency: {
    RARELY: "Sjældent, vi bliver næsten aldrig afbrudt",
    SOMETIMES: "Indimellem, især i travle perioder",
    OFTEN: "Ofte, telefonen tager fokus flere gange om dagen",
    UNKNOWN: "Vi ved det ikke, vi tager den, når vi kan",
  },
  followup: {
    VOICEMAIL: "De kan lægge en besked",
    TRY_AGAIN: "De må prøve igen i telefontiden",
    INFO: "De får praktisk info på telefonsvareren",
    OTHER: "Andet",
  },
  painPoint: {
    NEW_PATIENTS: "Nye patienter, der ringer forgæves",
    UNFOLLOWED: "Ubesvarede opkald uden opfølgning",
    INTERRUPTIONS: "Afbrydelser midt i behandlinger",
    SIMPLE_QUESTIONS: "Simple spørgsmål, der stjæler tid",
  }
};

export const questions: Question[] = [
  {
    id: "clinicType",
    label: "Din klinik",
    title: "Hvilken type klinik arbejder du i?",
    options: [
      { label: OPTION_LABELS.clinicType.DENTAL },
      { label: OPTION_LABELS.clinicType.PHYSIO },
      { label: OPTION_LABELS.clinicType.PSYCH },
      { label: OPTION_LABELS.clinicType.BEAUTY },
      { label: OPTION_LABELS.clinicType.OTHER },
    ],
  },
  {
    id: "whoAnswers",
    label: "Hvem tager telefonen",
    title: "Hvem tager som regel telefonen hos jer?",
    options: [
      {
        label: OPTION_LABELS.whoAnswers.RECEPTION
      },
      {
        label: OPTION_LABELS.whoAnswers.PRACTITIONERS,
        insight: "Afbrydelser koster fokus|Det er ikke kun selve opkaldet, der koster. Det er tiden bagefter, hvor fokus skal tilbage.|Kilde: University of California, Irvine — Gloria Mark"
      },
      {
        label: OPTION_LABELS.whoAnswers.ROTATING,
        insight: "Når alle ejer telefonen, ejer ingen opfølgningen|Delt ansvar fungerer i rolige perioder. I travle perioder falder opkald mellem to stole.|"
      },
    ],
  },
  {
    id: "frequency",
    label: "Hvor ofte",
    title: "Hvor ofte forstyrrer telefonen arbejdet i klinikken?",
    options: [
      {
        label: OPTION_LABELS.frequency.RARELY
      },
      {
        label: OPTION_LABELS.frequency.SOMETIMES,
        insight: "2 minutters opkald kan koste 23 minutters fokus|Forskning peger på, at det i gennemsnit tager omkring 23 minutter at vende tilbage til en afbrudt opgave.|Kilde: University of California, Irvine — Gloria Mark"
      },
      {
        label: OPTION_LABELS.frequency.OFTEN,
        insight: "2 minutters opkald kan koste 23 minutters fokus|Forskning peger på, at det i gennemsnit tager omkring 23 minutter at vende tilbage til en afbrudt opgave.|Kilde: University of California, Irvine — Gloria Mark"
      },
      {
        label: OPTION_LABELS.frequency.UNKNOWN,
        insight: "Det usynlige kan ikke prioriteres|Hvis I ikke ved, hvor mange opkald I mister, ved I heller ikke, om det var spørgsmål, afbud eller nye bookinger.|"
      },
    ],
  },
  {
    id: "followup",
    label: "Uden for åbningstid",
    title: "Hvad sker der, hvis telefonen ringer uden for åbningstid?",
    options: [
      {
        label: OPTION_LABELS.followup.VOICEMAIL,
        insight: "Telefonsvarer er ikke opfølgning|En besked redder noget. Men arbejdet forsvinder ikke — det flytter sig bare til senere på dagen.|"
      },
      {
        label: OPTION_LABELS.followup.TRY_AGAIN,
        insight: "5 minutter betyder noget|Nye henvendelser, der følges op inden for 5 minutter, er langt mere tilbøjelige til at blive til en booking end dem, der venter 30 minutter eller mere.|Kilde: Harvard Business Review — “The Short Life of Online Sales Leads”"
      },
      {
        label: OPTION_LABELS.followup.INFO
      },
      {
        label: OPTION_LABELS.followup.OTHER
      },
    ],
  },
  {
    id: "painPoint",
    label: "Udfordring",
    title: "Hvad vil I helst undgå?",
    options: [
      {
        label: OPTION_LABELS.painPoint.NEW_PATIENTS,
        insight: "Adgang betyder valg|71% nævner adgang som en vigtig faktor, når de vælger ny behandler. Hvis det er svært at komme igennem, starter relationen skævt.|Kilde: Accenture — Healthcare Experience Research"
      },
      {
        label: OPTION_LABELS.painPoint.UNFOLLOWED,
        insight: "Det dyre er usikkerheden|Det farlige ved et ubesvaret opkald er ikke kun, at det blev misset. Det er, at I ikke ved, hvad I missede.|"
      },
      {
        label: OPTION_LABELS.painPoint.INTERRUPTIONS
      },
      {
        label: OPTION_LABELS.painPoint.SIMPLE_QUESTIONS,
        insight: "Gentagelser är skjult støj|Spørgsmål om priser, åbningstider og booking føles små enkeltvis. Men de fylder samme plads i receptionen som vigtige opkald.|"
      },
    ],
  },
];

export const loadingLines = [
  "Ser på jeres telefonhåndtering",
  "Vurderer hvor ofte I er optaget",
  "Tjekker opkald uden for åbningstid",
  "Finder hvor opkald går tabt",
  "Samler jeres resultat",
];

const whoAnswersPoints: Record<string, number> = {
  [OPTION_LABELS.whoAnswers.RECEPTION]: 0,
  [OPTION_LABELS.whoAnswers.PRACTITIONERS]: 4,
  [OPTION_LABELS.whoAnswers.ROTATING]: 3,
};

const frequencyPoints: Record<string, number> = {
  [OPTION_LABELS.frequency.RARELY]: 0,
  [OPTION_LABELS.frequency.SOMETIMES]: 2,
  [OPTION_LABELS.frequency.OFTEN]: 4,
  [OPTION_LABELS.frequency.UNKNOWN]: 4,
};

const followupPoints: Record<string, number> = {
  [OPTION_LABELS.followup.VOICEMAIL]: 2,
  [OPTION_LABELS.followup.TRY_AGAIN]: 3,
  [OPTION_LABELS.followup.INFO]: 2,
  [OPTION_LABELS.followup.OTHER]: 2,
};

export type DiagnosticLevel = "green" | "yellow" | "red";

export interface DiagnosticCardData {
  category: string;
  title: string;
  text: string;
  level: DiagnosticLevel;
}

export const diagnosticMapping: Record<string, Record<string, Omit<DiagnosticCardData, "category">>> = {
  whoAnswers: {
    [OPTION_LABELS.whoAnswers.RECEPTION]: {
      title: "Klar ejer af telefonen",
      text: "Telefonen har allerede en fast plads hos jer. Hullet opstår især, når receptionen er optaget, lukket eller ikke når at følge op.",
      level: "green",
    },
    [OPTION_LABELS.whoAnswers.ROTATING]: {
      title: "Når alle ejer telefonen, ejer ingen opfølgningen",
      text: "I travle perioder kan det blive uklart, hvem der følger op på de opkald, I ikke når. GetXM samler automatisk op med SMS og giver jer besked, når noget kræver jeres opmærksomhed.",
      level: "yellow",
    },
    [OPTION_LABELS.whoAnswers.PRACTITIONERS]: {
      title: "Når behandleren tager telefonen, koster det behandlingen",
      text: "Et kort opkald bryder fokus og tager tid fra patienten foran jer. GetXM følger op, når I ikke kan svare, så henvendelsen ikke går tabt.",
      level: "red",
    },
  },
  frequency: {
    [OPTION_LABELS.frequency.RARELY]: {
      title: "Et flow der fungerer i hverdagen",
      text: "I oplever ikke telefonen som en stor daglig afbrydelse. Hullet ligger især i de opkald, der kommer, når ingen kan svare.",
      level: "green",
    },
    [OPTION_LABELS.frequency.SOMETIMES]: {
      title: "Brud i arbejdsrytmen",
      text: "Når der er pres på, kan telefonen bryde rytmen og skabe ekstra opfølgning senere.",
      level: "yellow",
    },
    [OPTION_LABELS.frequency.OFTEN]: {
      title: "En arbejdsdag styret af telefonen",
      text: "Når I ofte må afbryde arbejdet, bliver telefonen en løbende kilde til skift i fokus og tabt tempo.",
      level: "red",
    },
    [OPTION_LABELS.frequency.UNKNOWN]: {
      title: "Manglende overblik over mistede opkald",
      text: "Når patienten foran jer prioriteres, kan opkald, I ikke når, forsvinde uden klar opfølgning.",
      level: "red",
    },
  },
  followup: {
    [OPTION_LABELS.followup.INFO]: {
      title: "En vej videre — men ikke for alle",
      text: "Praktisk info hjælper mange videre, men fanger ikke nødvendigvis spørgsmål, afbud eller patienter, der har brug for hjælp først.",
      level: "green",
    },
    [OPTION_LABELS.followup.VOICEMAIL]: {
      title: "Opfølgning der venter på jer",
      text: "En besked hjælper, men I skal stadig samle op senere og finde ud af, hvad patienten havde brug for.",
      level: "yellow",
    },
    [OPTION_LABELS.followup.TRY_AGAIN]: {
      title: "Patienthenvendelser der kan gå tabt",
      text: "Når patienten selv skal prøve igen, er der risiko for, at henvendelsen aldrig bliver til en booking.",
      level: "red",
    },
    [OPTION_LABELS.followup.OTHER]: {
      title: "Et næste skridt der kan være uklart",
      text: "Hvis patienten ikke får en klar vej videre, kan henvendelsen let blive tabt.",
      level: "yellow",
    },
  },
  painPoint: {
    [OPTION_LABELS.painPoint.NEW_PATIENTS]: {
      title: "Nye patienthenvendelser",
      text: "Hvis en ny patient ikke får svar første gang, kan interessen hurtigt gå videre til en anden klinik.",
      level: "red",
    },
    [OPTION_LABELS.painPoint.UNFOLLOWED]: {
      title: "Overblik over vigtige henvendelser",
      text: "Når et opkald ikke bliver taget, ved I ikke, om det var en ny booking, et afbud, et spørgsmål eller noget vigtigt.",
      level: "red",
    },
    [OPTION_LABELS.painPoint.INTERRUPTIONS]: {
      title: "Ro i behandlingen",
      text: "Når telefonen ringer midt i behandlingen, bliver patienten foran jer sat op mod patienten i røret.",
      level: "red",
    },
    [OPTION_LABELS.painPoint.SIMPLE_QUESTIONS]: {
      title: "Tid brugt på gentagelser",
      text: "Booking, priser og åbningstider bør ikke tage tid fra behandlinger eller reception igen og igen.",
      level: "red",
    },
  },
};

export const splitFullName = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) {
    const name = parts[0] || "Ukendt";
    return { firstName: name, lastName: name.length < 2 ? name + "." : name };
  }

  let lastName = parts.at(-1) ?? "Ukendt";
  if (lastName.length < 2) lastName += ".";

  let firstName = parts.slice(0, -1).join(" ");
  if (firstName.length < 2) firstName += ".";

  return { firstName, lastName };
};

export const getRiskScore = (answers: Partial<QuizAnswers>) => {
  const score =
    (whoAnswersPoints[answers.whoAnswers ?? ""] ?? 0) +
    (frequencyPoints[answers.frequency ?? ""] ?? 0) +
    (followupPoints[answers.followup ?? ""] ?? 0);

  return Math.max(0, score);
};

export const getRiskBand = (score: number): "low" | "medium" | "high" => {
  if (score <= 3) return "low";
  if (score <= 7) return "medium";
  return "high";
};
