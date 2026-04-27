// GetXM demo logic — mock now, API-ready.
// Swap simulateFollowUp() with a real fetch later; the UI consumes the same shape.

export type DemoStep =
  | { kind: "ringing"; label: string }
  | { kind: "missed"; label: string }
  | { kind: "smsSent"; from: string; body: string }
  | { kind: "patientReply"; from: string; body: string }
  | { kind: "getxmReply"; from: string; body: string }
  | { kind: "clinicMessage"; clinic: string; summary: string };

export interface DemoScenario {
  clinicName: string;
  patientNumber: string;
  steps: DemoStep[];
}

export const defaultScenario: DemoScenario = {
  clinicName: "Tandklinikken Søndergade",
  patientNumber: "+45 •• •• •• 42",
  steps: [
    { kind: "ringing", label: "Indgående opkald" },
    { kind: "missed", label: "Ubesvaret opkald" },
    {
      kind: "smsSent",
      from: "GetXM",
      body: "Hej 👋 Vi kunne desværre ikke tage dit opkald lige nu. Skriv gerne her, så hjælper jeg dig videre. Hvad drejer din henvendelse sig om?",
    },
    {
      kind: "patientReply",
      from: "Patient",
      body: "Hej, jeg ville høre hvad det koster at få lavet en tandrensning?",
    },
    {
      kind: "getxmReply",
      from: "GetXM",
      body: "Prisen afhænger af behandlingsbehov, tilskud og den konkrete vurdering. Klinikken kan hjælpe med at afklare det. Skriv gerne dit navn, så giver vi beskeden videre.",
    },
    {
      kind: "clinicMessage",
      clinic: "Tandklinikken Søndergade",
      summary: "Patient spurgte om pris på tandrensning. Bed klinikken kontakte patienten for konkret vurdering.",
    },
  ],
};

/**
 * Simulate a follow-up flow. Returns a scenario the UI can play back step by step.
 * Replace internals with a real API call when backend is wired up — keep the return shape.
 */
export async function simulateFollowUp(): Promise<DemoScenario> {
  return defaultScenario;
}
