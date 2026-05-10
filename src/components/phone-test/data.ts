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
        label: "Reception / kliniksekretær", 
        insight: "Stærkt udgangspunkt.|Men hullet opstår stadig, når receptionen er optaget eller har lukket." 
      },
      { 
        label: "Behandlerne selv", 
        insight: "Behandleren i røret.|Når behandleren tager telefonen, mister patienten foran jer opmærksomhed — også hvis opkaldet kun varer kort tid." 
      },
      { 
        label: "Vi skiftes", 
        insight: "Delt ansvar for opkald.|Når telefonen deles mellem flere, kan det blive uklart, hvem der følger op på de opkald, der ikke blev taget." 
      },
    ],
  },
  {
    id: "frequency",
    label: "Hvor ofte",
    title: "Hvor ofte må I afbryde arbejdet for at tage telefonen?",
    options: [
      { 
        label: "Sjældent — vi føler, vi når det meste",
        insight: "Godt tegn.|De fleste opkald bliver nok håndteret — men de få, der glipper, kan stadig være vigtige."
      },
      { 
        label: "Indimellem — især i travle perioder", 
        insight: "Uforudsete afbrydelser.|Få afbrydelser kan virke harmløse, men de rammer ofte, når klinikken i forvejen er presset." 
      },
      { 
        label: "Ofte — vi kan mærke, at vi ikke når alle", 
        insight: "Hyppige afbrydelser.|Hyppige afbrydelser koster ikke kun tid. De koster fokus — og fokus er svært at genvinde midt i en behandling." 
      },
      { 
        label: "Vi ved det ikke — vi prioriterer patienten foran os",
        insight: "Det skjulte tab.|Når I ikke ved, hvor mange opkald I mister, ved I heller ikke, om det var spørgsmål, afbud eller nye bookinger."
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
        insight: "En besked redder noget.|Men opgaven flytter stadig tilbage til jer senere på dagen."
      },
      { 
        label: "De må prøve igen i vores telefontid", 
        insight: "Opfølgningen placeres hos patienten.|Når patienten selv skal prøve igen, ligger opfølgningen hos patienten — ikke hos klinikken." 
      },
      { 
        label: "De bliver henvist til online booking",
        insight: "Godt setup.|Men patienter ringer ofte, når de har brug for afklaring — ikke kun et link."
      },
      { 
        label: "Andet",
        insight: "Utydeligt næste skridt.|Når næste skridt ikke er tydeligt, kan selv interesserede patienter falde fra."
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
        insight: "Patienter har lav tålmodighed.|Hvis de ikke får svar første gang, er næste klinik ofte kun ét klik væk." 
      },
      { 
        label: "Ubesvarede opkald ikke bliver fulgt op",
        insight: "Det farlige ved et ubesvaret opkald.|Det er ikke kun, at det blev misset. Det er, at I ikke ved, hvad I missede."
      },
      { 
        label: "Dårlig første oplevelse for patienten",
        insight: "Første indtryk starter i telefonen.|Første indtryk starter før behandlingen. For mange patienter starter det i telefonen."
      },
      { 
        label: "Telefonen afbryder behandlinger",
        insight: "Konkurrence om opmærksomhed.|Når telefonen ringer midt i en behandling, konkurrerer to patienter om jeres opmærksomhed."
      },
      { 
        label: "Simple spørgsmål tager for meget tid",
        insight: "Mange bække små.|Praktiske spørgsmål føles små enkeltvis. Samlet kan de stjæle meget tid fra klinikken."
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
  "Ofte — vi kan mærke, at vi ikke når alle": 4,
  "Vi ved det ikke — vi prioriterer patienten foran os": 4,
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
      text: "Online booking hjælper mange videre, men fanger ikke nødvendigvis spørgsmål, afbud eller patienter, der har brug for hjælp først.",
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
