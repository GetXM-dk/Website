import { Question, QuizAnswers } from "./types";

export const questions: Question[] = [
  {
    id: "clinicType",
    label: "Din klinik",
    title: "Hvilken type klinik arbejder du i?",
    options: [
      { label: "Tandklinik" },
      { label: "Fys / kiro / osteopat" },
      { label: "Psykolog / terapi" },
      { label: "Skønhed / velvære" },
      { label: "Anden klinik" },
    ],
  },
  {
    id: "whoAnswers",
    label: "Hvem tager telefonen",
    title: "Hvem tager som regel telefonen hos jer?",
    options: [
      { 
        label: "Reception / kliniksekretær"
      },
      { 
        label: "Behandlerne selv", 
        insight: "Afbrydelser koster fokus|Det er ikke kun selve opkaldet, der koster. Det er tiden bagefter, hvor fokus skal tilbage.|Kilde: University of California, Irvine — Gloria Mark" 
      },
      { 
        label: "Vi skiftes", 
        insight: "Når alle ejer telefonen, ejer ingen opfølgningen|Delt ansvar fungerer i rolige perioder. I travle perioder falder opkald mellem to stole.|" 
      },
    ],
  },
  {
    id: "frequency",
    label: "Hvor ofte",
    title: "Hvor ofte må I afbryde arbejdet for at tage telefonen?",
    options: [
      { 
        label: "Sjældent — vi føler, vi når det meste"
      },
      { 
        label: "Indimellem — især i travle perioder"
      },
      { 
        label: "Ofte — vi kan mærke, at vi ikke når alle", 
        insight: "2 minutters opkald kan koste 23 minutters fokus|Det tager i gennemsnit omkring 23 minutter at vende tilbage til en afbrudt opgave.|Kilde: University of California, Irvine — Gloria Mark" 
      },
      { 
        label: "Vi ved det ikke — vi prioriterer patienten foran os",
        insight: "Det usynlige kan ikke prioriteres|Hvis I ikke ved, hvor mange opkald I mister, ved I heller ikke, om det var spørgsmål, afbud eller nye bookinger.|"
      },
    ],
  },
  {
    id: "followup",
    label: "Uden for åbningstid",
    title: "Hvad sker der, hvis en patient ringer uden for åbningstid?",
    options: [
      { 
        label: "De kan lægge en besked",
        insight: "Telefonsvarer er ikke opfølgning|En besked redder noget. Men arbejdet forsvinder ikke — det flytter sig bare til senere på dagen.|"
      },
      { 
        label: "De må prøve igen i vores telefontid", 
        insight: "5 minutter betyder noget|Nye henvendelser, der følges op inden for 5 minutter, er langt mere tilbøjelige til at blive til en booking end dem, der venter 30 minutter eller mere.|Kilde: Harvard Business Review — “The Short Life of Online Sales Leads”" 
      },
      { 
        label: "De bliver henvist til online booking",
        insight: "Booking løser booking — ikke tvivl|Patienter ringer ofte, fordi de har et spørgsmål, de skal have afklaret først. Et bookinglink svarer ikke på spørgsmål.|"
      },
      { 
        label: "Andet"
      },
    ],
  },
  {
    id: "painPoint",
    label: "Udfordring",
    title: "Hvad vil I helst undgå?",
    options: [
      { 
        label: "Nye patienter ikke kommer igennem", 
        insight: "Adgang betyder valg|71% nævner adgang som en vigtig faktor, når de vælger ny behandler. Hvis det er svært at komme igennem, starter relationen skævt.|Kilde: Accenture — Healthcare Experience Research" 
      },
      { 
        label: "Ubesvarede opkald ikke bliver fulgt op",
        insight: "Det dyre er usikkerheden|Det farlige ved et ubesvaret opkald er ikke kun, at det blev misset. Det er, at I ikke ved, hvad I missede.|"
      },
      { 
        label: "Dårlig første oplevelse for patienten",
        insight: "De fleste klager ikke|96% af utilfredse kunder klager ikke — de forsvinder bare.|Kilde: Harvard Business Review — customer experience research"
      },
      { 
        label: "Telefonen afbryder behandlinger"
      },
      { 
        label: "Simple spørgsmål tager for meget tid",
        insight: "Gentagelser er skjult støj|Spørgsmål om priser, åbningstider og booking føles små enkeltvis. Men de fylder samme plads i receptionen som vigtige opkald.|"
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
  "Reception / kliniksekretær": 0,
  "Behandlerne selv": 4,
  "Vi skiftes": 3,
};

const frequencyPoints: Record<string, number> = {
  "Sjældent — vi føler, we når det meste": 0,
  "Indimellem — især i travle perioder": 2,
  "Ofte — vi kan mærke, at we ikke når alle": 4,
  "Vi ved det ikke — we prioriterer patienten foran os": 4,
};

const followupPoints: Record<string, number> = {
  "De kan lægge en besked": 2,
  "De må prøve igen i vores telefontid": 3,
  "De bliver henvist til online booking": 1,
  "Andet": 2,
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
    "Reception / kliniksekretær": {
      title: "Klar ejer af telefonen",
      text: "Telefonen har allerede en fast plads hos jer. Hullet opstår især, når receptionen er optaget, lukket eller ikke når at følge op.",
      level: "green",
    },
    "Vi skiftes": {
      title: "Klarhed over hvem der følger op",
      text: "Når flere skiftes til at tage telefonen, kan ansvaret blive uklart, især når der er travlt.",
      level: "yellow",
    },
    "Behandlerne selv": {
      title: "Tid væk fra behandlingen",
      text: "Når behandlerne selv tager telefonen, flytter opkald tid og opmærksomhed væk fra patienten foran jer.",
      level: "red",
    },
  },
  frequency: {
    "Sjældent — vi føler, vi når det meste": {
      title: "Et flow der fungerer i hverdagen",
      text: "I oplever ikke telefonen som en stor daglig afbrydelse. Hullet ligger især i de opkald, der kommer, når ingen kan svare.",
      level: "green",
    },
    "Indimellem — især i travle perioder": {
      title: "Brud i arbejdsrytmen",
      text: "Når der er pres på, kan telefonen bryde rytmen og skabe ekstra opfølgning senere.",
      level: "yellow",
    },
    "Ofte — vi kan mærke, at vi ikke når alle": {
      title: "En arbejdsdag styret af telefonen",
      text: "Når I ofte må afbryde arbejdet, bliver telefonen en løbende kilde til skift i fokus og tabt tempo.",
      level: "red",
    },
    "Vi ved det ikke — vi prioriterer patienten foran os": {
      title: "Manglende overblik over mistede opkald",
      text: "Når patienten foran jer prioriteres, kan opkald, I ikke når, forsvinde uden klar opfølgning.",
      level: "red",
    },
  },
  followup: {
    "De bliver henvist til online booking": {
      title: "En vej videre — men ikke for alle",
      text: "Online booking hjælper many videre, men fanger ikke nødvendigvis spørgsmål, afbud eller patienter, der har brug for hjælp først.",
      level: "green",
    },
    "De kan lægge en besked": {
      title: "Opfølgning der venter på jer",
      text: "En besked hjælper, men I skal stadig samle op senere og finde ud af, hvad patienten havde brug for.",
      level: "yellow",
    },
    "De må prøve igen i vores telefontid": {
      title: "Patienthenvendelser der kan gå tabt",
      text: "Når patienten selv skal prøve igen, er der risiko for, at henvendelsen aldrig bliver til en booking.",
      level: "red",
    },
    "Andet": {
      title: "Et næste skridt der kan være uklart",
      text: "Hvis patienten ikke får en klar vej videre, kan henvendelsen let blive tabt.",
      level: "yellow",
    },
  },
  painPoint: {
    "Nye patienter ikke kommer igennem": {
      title: "Nye patienthenvendelser",
      text: "Hvis en ny patient ikke får svar første gang, kan interessen hurtigt gå videre til en anden klinik.",
      level: "red",
    },
    "Ubesvarede opkald ikke bliver fulgt op": {
      title: "Overblik over vigtige henvendelser",
      text: "Når et opkald ikke bliver taget, ved I ikke, om det var en ny booking, et afbud, et spørgsmål eller noget vigtigt.",
      level: "red",
    },
    "Dårlig første oplevelse for patienten": {
      title: "Et stærkt førstehåndsindtryk",
      text: "Den gode behandling starter før patienten kommer ind ad døren. Hvis kontakten starter med tavshed, svækker det oplevelsen.",
      level: "red",
    },
    "Telefonen afbryder behandlinger": {
      title: "Ro i behandlingen",
      text: "Når telefonen ringer midt i behandlingen, bliver patienten foran jer sat op mod patienten i røret.",
      level: "red",
    },
    "Simple spørgsmål tager for meget tid": {
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
