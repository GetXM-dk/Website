## Mål

Redesign `/telefon-test` resultatsiden fra bunden, så den føles som en kort, premium diagnostisk rapport — ikke et dashboard, ikke en fejlskærm, ikke en produktside.

Alle ændringer er rene UI/typografi-ændringer i `src/components/phone-test/ResultStep.tsx`. Score-logik, data-mapping og tekster i `data.ts` er allerede korrekte og røres ikke.

## Designretning

**Stilreference:** editorial / executive briefing — kort intern rapport fra et konsulenthus. Off-white sidebaggrund, tung display-overskrift, smal måleskala uden tal, rolige diagnose-blokke som horisontale rækker (ikke 3-kolonners kort), og en mørk bundsektion med lavmælt CTA.

Farve bruges kun som accent — en lille farvet prik, en tynd outline, eller diskret status-pill. Ingen røde/gule/grønne baggrundskort. Ingen ikoner medmindre absolut nødvendigt — typografi, spacing, dividers, prik og pill bærer hierarkiet.

## Sidestruktur

```text
┌─────────────────────────────────────────────────┐
│  JERES RESULTAT ER KLAR                         │
│                                                 │
│  Hvad koster et                                 │
│  mistet opkald jer?                             │  ← stort editorial headline
│                                                 │
│  ─── impact-skala ───                           │
│  Lidt ●━━━━━━━━━━━━━━━━━━━━━━━ Meget           │  ← tynd bar, prik, ingen tal
│  Kort fortolkningssætning under                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐  ← #FFFDF8/white, lysere end siden
│  JERES STØRSTE UDFORDRING                       │
│                                                 │
│  {Q5 titel}                                     │  ← hero-blok, stor type
│  {Q5 brødtekst, generøs linjehøjde}             │     rolig, ingen alert-look
└─────────────────────────────────────────────────┘

  Det koster jer især her
  Baseret på jeres svar

  ──────────────────────────────────────────────
  ● Telefonhåndtering · Fungerer allerede / Koster noget / Koster meget
    {titel}
    {brødtekst}
  ──────────────────────────────────────────────
  ● Afbrydelser · {status}
    {titel}
    {brødtekst}
  ──────────────────────────────────────────────
  ● Uden for åbningstid · {status}
    {titel}
    {brødtekst}
  ──────────────────────────────────────────────

┌─────────────────────────────────────────────────┐  ← mørk bg #151515
│  Næste skridt                                   │
│  {body om opfølgning og estimat}                │
└─────────────────────────────────────────────────┘
```

## Detaljer pr. sektion

### 1. Headline-blok
- Eyebrow: `JERES RESULTAT ER KLAR` (11px, uppercase, tracking, muted).
- H2: `Hvad koster et mistet opkald jer?` — display-font, 40–56px på desktop, balanceret linjebrud, venstrejusteret.

### 2. Impact-skala
- Tynd 6–8px bar, neutral lys grå track med blød indre gradient (grøn → gul → rød) i lav mætning.
- Position via eksisterende `getRiskScore` / 11.
- **Clamp markørposition mellem 4% og 96%** så prikken aldrig klipper i kanten.
- Labels `Lidt` og `Meget` over bar i lille caps. Ingen tal, ingen procent.
- Under bar: én diagnostisk sætning der varierer med båndet:
  - low: "Jeres setup ser ud til at fange det meste — men der er stadig opkald, der kan glide igennem."
  - medium: "Mistede opkald koster jer noget i hverdagen — især overblik og opfølgning."
  - high: "Mistede opkald ser ud til at koste jer markant i tid, opfølgning og nye patienter."

### 3. Q5 hero-blok
- **Lysere end sidebaggrunden** (`#FFFDF8` eller hvid) for klar men rolig adskillelse fra off-white side.
- Generøs padding (40–56px), tynd `border-black/5`, ingen farvet accent-stripe, intet ikon.
- Eyebrow: `JERES STØRSTE UDFORDRING`.
- Titel: 28–32px display, mørk.
- Brødtekst: 17–18px, `text-[#151515]/75`, max-width ~60ch.

### 4. Sekundære diagnoser (Q2/Q3/Q4)
- Heading: `Det koster jer især her`. Subtitle: `Baseret på jeres svar`.
- Layout: vertikale rækker med tynde divider-linjer (`border-black/8`) — læser som en rapport.
- Hver række:
  - Venstre meta-kolonne (~200px desktop): farvet prik (8px) + kategori (`Telefonhåndtering`) + status-pill med tynd farvet outline (`Fungerer allerede` / `Koster noget` / `Koster meget`).
  - Højre indholdskolonne: titel (display, 20px) + brødtekst (16px, neutral mørk).
- Mobile: meta stables over indhold.
- Farve kun til prik + pill-outline + pill-tekst. Ingen farvet baggrund.

### 5. Næste skridt
- Mørk sektion (`bg-[#151515]`, lys tekst), generøs padding, afrundede hjørner.
- Titel: `Næste skridt`.
- Body: eksisterende tekst om opfølgning + estimat.
- **Ingen CTA/ghost-link** — der findes ikke en faktisk estimat-forklaring eller booking-flow at linke til. Sektionen lukker rapporten med tekst alene. Hvis et estimat-modal eller booking-link senere tilføjes, kan en ghost-link `Se hvordan estimatet beregnes →` indsættes her.

## Filer der ændres

- `src/components/phone-test/ResultStep.tsx` — fuld omskrivning af JSX og helpers (drop ikon-import, drop fulde alert-baggrunde).
- Ingen ændringer i `data.ts`, `types.ts` eller scoring.

## Acceptkriterier-tjek

- Svarer klart på "Hvad koster et mistet opkald jer?" ✓
- Q5 er primær personlig indsigt (hero-blok, lysere end siden) ✓
- Q2–Q4 er supporterende diagnoser i rapport-stil rækker ✓
- Premium og rolig — ingen alert-bokse, ingen dashboard-følelse, ingen unødvendige ikoner ✓
- Farve kun som accent (prik + pill-outline) ✓
- Markør på skala clampet 4–96% ✓
- Læsbar mobile (stacked) og desktop (rækker, ikke cramped 3-col) ✓
- Ingen produkt-CTA og ingen død ghost-link ✓
