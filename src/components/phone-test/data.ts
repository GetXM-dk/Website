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

export const resultSummary = {
  low: "I har godt styr på telefonen i hverdagen. Men der er stadig huller: uden for åbningstid, i travlhed, ved ferie og sygdom.",
  medium: "Mistede opkald koster jer overblik og opfølgning. Hullerne opstår især uden for åbningstid, i travlhed, ved ferie og sygdom.",
  high: "Mistede opkald koster jer tid, ro og nye henvendelser. Hullerne rammer især uden for åbningstid, i travlhed, ved ferie og sygdom.",
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
      title: "Telefonen har en ejer",
      text: "I har en klar struktur for telefonen. Det er et stærkt udgangspunkt — især når hverdagen bliver travl.",
      level: "green",
    },
    [OPTION_LABELS.whoAnswers.ROTATING]: {
      title: "Opfølgningen falder mellem to stole",
      text: "Når telefonen går på skift, bliver det nemt uklart, hvem der samler op på de opkald, I ikke når.",
      level: "yellow",
    },
    [OPTION_LABELS.whoAnswers.PRACTITIONERS]: {
      title: "Behandlerne bliver reception",
      text: "Når behandlerne selv tager telefonen, flytter opkald ind i behandlingsrummet.",
      level: "red",
    },
  },
  frequency: {
    [OPTION_LABELS.frequency.RARELY]: {
      title: "Telefonen er under kontrol",
      text: "I har godt styr på telefonen i åbningstiden. De typiske huller ligger udenom: efter lukketid, i travle perioder, ved ferie og sygdom.",
      level: "green",
    },
    [OPTION_LABELS.frequency.SOMETIMES]: {
      title: "Travlhed skaber efterslæb",
      text: "Når telefonen ringer på de forkerte tidspunkter, bliver små opkald hurtigt til ekstra arbejde senere.",
      level: "yellow",
    },
    [OPTION_LABELS.frequency.OFTEN]: {
      title: "Telefonen tager for meget plads",
      text: "Når telefonen afbryder jer flere gange om dagen, koster det ro, tempo og tid til patienterne.",
      level: "red",
    },
    [OPTION_LABELS.frequency.UNKNOWN]: {
      title: "I ved ikke, hvad I mister",
      text: "Uden overblik ved I ikke, om de opkald I ikke når, er spørgsmål, afbud eller nye bookinger.",
      level: "red",
    },
  },
  followup: {
    [OPTION_LABELS.followup.INFO]: {
      title: "Info løser kun det simple",
      text: "Åbningstider og praktiske beskeder hjælper nogle videre. Aber afbud, spørgsmål og nye patienter kræver ofte et tydeligt næste skridt.",
      level: "green",
    },
    [OPTION_LABELS.followup.VOICEMAIL]: {
      title: "Telefonsvarer skubber arbejdet videre",
      text: "Patienten kan lægge en besked, men opgaven lander stadig hos jer, når I får tid til at lytte og følge op.",
      level: "yellow",
    },
    [OPTION_LABELS.followup.TRY_AGAIN]: {
      title: "Patienten får arbejdet tilbage",
      text: "Når patienten selv skal ringe igen, bliver næste skridt deres ansvar — og henvendelsen kan hurtigt gå kold.",
      level: "red",
    },
    [OPTION_LABELS.followup.OTHER]: {
      title: "Næste skridt forsvinder",
      text: "Hvis patienten ikke ved, hvad der sker efter opkaldet, forsvinder henvendelsen let, før I når at samle op.",
      level: "yellow",
    },
  },
  painPoint: {
    [OPTION_LABELS.painPoint.NEW_PATIENTS]: {
      title: "Omsætning",
      text: "Når en ny patient ikke får svar første gang, flytter interessen hurtigt til en anden klinik.",
      level: "red",
    },
    [OPTION_LABELS.painPoint.UNFOLLOWED]: {
      title: "Overblik",
      text: "Et ubesvaret opkald kan være en booking, et afbud, et spørgsmål eller noget vigtigt. Uden opfølgning ved I det ikke.",
      level: "red",
    },
    [OPTION_LABELS.painPoint.INTERRUPTIONS]: {
      title: "Patientoplevelse",
      text: "Når telefonen ringer midt i behandlingen, bliver patienten foran jer sat på pause for patienten i røret.",
      level: "red",
    },
    [OPTION_LABELS.painPoint.SIMPLE_QUESTIONS]: {
      title: "Arbejdstid",
      text: "Spørgsmål om priser, booking og åbningstider virker små hver for sig, men de fylder hurtigt i hverdagen.",
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
