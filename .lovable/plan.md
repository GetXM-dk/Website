## Ændringer på resultatsiden (`/telefon-test`)

Rene tekstændringer — ingen logik ændres.

### 1. Section-header i `src/components/phone-test/ResultStep.tsx`

- "Hvor koster det jer?" → **"Hvad koster det jer?"**
- "Top 4 områder baseret på jeres svar" → **"Top 4 konsekvenser baseret på jeres svar."**

### 2. Card-titler og brødtekst i `src/components/phone-test/data.ts`

Opdater `diagnosticMapping` så `title` udtrykker hvad det koster (gevinsten/konsekvensen) i stedet for problemet, og brødtekst justeres til de nye formuleringer.

**Card 1 — Telefonhåndtering (`whoAnswers`)**
- Reception/kliniksekretær (grøn): titel = "Telefonen har en fast ejer" · tekst = "Når telefonen ligger hos receptionen, har I et stærkere udgangspunkt. Det reducerer risikoen for, at opkald forstyrrer behandlingerne."
- Vi skiftes (gul): titel = "Klarhed over hvem der følger op" · tekst = uændret
- Behandlerne selv (rød): titel = "Ro, fokus og tid med patienten" · tekst = "Når behandlerne selv tager telefonen, tager opkald tid og opmærksomhed fra patienten foran jer."

**Card 2 — Afbrydelser (`frequency`)**
- Sjældent (grøn): titel = "Arbejdsro i hverdagen" · tekst = uændret
- Indimellem (gul): titel = "Flow i travle perioder" · tekst = "Når der er pres på, kan opkald bryde jeres flow og skabe ekstra opfølgning senere."
- Ofte (rød): titel = "Ro, flow og behandlingsfokus" · tekst = "Når I ofte må afbryde arbejdet, mister I flow og skal bruge energi på at komme tilbage til behandlingen."
- Vi ved det ikke (rød): titel = "Overblik over de opkald I ikke når" · tekst = uændret

**Card 3 — Uden for åbningstid (`followup`)**
- Online booking (grøn): titel = "En tydelig vej videre for patienten" · tekst = "Online booking hjælper patienten videre, men fanger ikke nødvendigvis spørgsmål, afbud eller patienter, der har brug for hjælp først."
- Lægge besked (gul): titel = "Tid senere på dagen" · tekst = uændret
- Prøve igen i telefontid (rød): titel = "Patienthenvendelser der aldrig bliver fulgt op" · tekst = uændret
- Andet (gul): titel = "Et tydeligt næste skridt for patienten" · tekst = "Hvis patienten ikke får en klar vej videre, kan henvendelsen let blive tabt."

**Card 4 — Jeres største problem (`painPoint`)**
- Nye patienter ikke kommer igennem: titel = "Nye patienthenvendelser" · tekst = uændret
- Ubesvarede opkald ikke bliver fulgt op: titel = "Overblik over vigtige henvendelser" · tekst = "Når et opkald ikke bliver taget, ved I ikke, om det var en ny booking, et afbud, et spørgsmål eller noget vigtigt."
- Dårlig første oplevelse: titel = "Et stærkt førstehåndsindtryk" · tekst = uændret
- Telefonen afbryder behandlinger: titel = "Ro i behandlingen" · tekst = uændret
- Simple spørgsmål tager for meget tid: titel = "Tid brugt på gentagelser" · tekst = uændret

### Filer der ændres
- `src/components/phone-test/data.ts`
- `src/components/phone-test/ResultStep.tsx`
