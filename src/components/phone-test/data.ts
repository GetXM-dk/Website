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
      { label: "Reception / kliniksekretær" },
      { label: "Behandlerne selv" },
      { label: "Vi skiftes" },
    ],
  },
  {
    id: "frequency",
    label: "Hvor ofte",
    title: "Hvor ofte må I afbryde arbejdet for at tage telefonen?",
    options: [
      { label: "Sjældent — vi føler, vi når det meste" },
      { label: "Indimellem — især i travle perioder" },
      { label: "Ofte — vi kan mærke, at vi ikke når alle" },
      { label: "Vi ved det ikke — vi prioriterer patienten foran os" },
    ],
  },
  {
    id: "followup",
    label: "Uden for åbningstid",
    title: "Hvad sker der, hvis en patient ringer uden for åbningstid?",
    options: [
      { label: "De kan lægge en besked" },
      { label: "De må prøve igen i vores telefontid" },
      { label: "De bliver henvist til online booking" },
      { label: "Andet" },
    ],
  },
  {
    id: "painPoint",
    label: "Udfordring",
    title: "Hvad vil I helst undgå?",
    options: [
      { label: "Nye patienter ikke kommer igennem" },
      { label: "Ubesvarede opkald ikke bliver fulgt op" },
      { label: "Dårlig første oplevelse for patienten" },
      { label: "Telefonen afbryder behandlinger" },
      { label: "Simple spørgsmål tager for meget tid" },
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
  "Sjældent — vi føler, vi når det meste": 0,
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
      title: "Telefonen har en fast ejer",
      text: "Når telefonen ligger hos receptionen, har I et stærkere udgangspunkt. Det reducerer risikoen for, at opkald forstyrrer behandlingerne.",
      level: "green",
    },
    "Vi skiftes": {
      title: "Klarhed over hvem der følger op",
      text: "Når flere skiftes til at tage telefonen, kan ansvar og opfølgning blive uklart i travle perioder.",
      level: "yellow",
    },
    "Behandlerne selv": {
      title: "Ro, fokus og tid med patienten",
      text: "Når behandlerne selv tager telefonen, tager opkald tid og opmærksomhed fra patienten foran jer.",
      level: "red",
    },
  },
  frequency: {
    "Sjældent — vi føler, vi når det meste": {
      title: "Arbejdsro i hverdagen",
      text: "Telefonen ser ikke ud til at være en stor daglig afbrydelse hos jer.",
      level: "green",
    },
    "Indimellem — især i travle perioder": {
      title: "Flow i travle perioder",
      text: "Når der er pres på, kan opkald bryde jeres flow og skabe ekstra opfølgning senere.",
      level: "yellow",
    },
    "Ofte — vi kan mærke, at vi ikke når alle": {
      title: "Ro, flow og behandlingsfokus",
      text: "Når I ofte må afbryde arbejdet, mister I flow og skal bruge energi på at komme tilbage til behandlingen.",
      level: "red",
    },
    "Vi ved det ikke — vi prioriterer patienten foran os": {
      title: "Overblik over de opkald I ikke når",
      text: "Når patienten foran jer prioriteres, kan ubesvarede opkald forsvinde uden klar opfølgning.",
      level: "red",
    },
  },
  followup: {
    "De bliver henvist til online booking": {
      title: "En tydelig vej videre for patienten",
      text: "Online booking hjælper patienten videre, men fanger ikke nødvendigvis spørgsmål, afbud eller patienter, der har brug for hjælp først.",
      level: "green",
    },
    "De kan lægge en besked": {
      title: "Tid senere på dagen",
      text: "En besked hjælper, men I skal stadig samle op senere og finde ud af, hvad patienten havde brug for.",
      level: "yellow",
    },
    "De må prøve igen i vores telefontid": {
      title: "Patienthenvendelser der aldrig bliver fulgt op",
      text: "Når patienten selv skal prøve igen, er der risiko for, at henvendelsen aldrig bliver til en booking.",
      level: "red",
    },
    "Andet": {
      title: "Et tydeligt næste skridt for patienten",
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
