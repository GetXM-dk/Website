## Mål

To afgrænsede ændringer:

1. Slå "Sådan virker det" + "Outcomes" sammen til én bento-sektion
2. Redesign pris-kortet til mørkt look med coral glow

---

## 1. Ny bento: `HowAndOutcome.tsx`

**Filer:**
- Ny: `src/components/HowAndOutcome.tsx`
- Slet: `src/components/HowItWorks.tsx`, `src/components/Outcomes.tsx`
- Opdater: `src/pages/Index.tsx` (fjern HowItWorks + Outcomes imports/brug, indsæt `<HowAndOutcome />` på samme placering)

**Sektionsoverskrift:** "Sådan virker det — og hvad I får ud af det"

**Layout (desktop, md+):**

```text
┌──────────────────────────┬─────────────────────────┐
│                          │ 1. Patienten føler sig  │
│ Sådan virker det         │    set            (warm)│
│                          ├─────────────────────────┤
│ 01 Patienten ringer      │ 2. Færre tabte          │
│ 02 GetXM følger op       │    henvendelser   (sage)│
│ 03 I får besked          ├─────────────────────────┤
│                          │ 3. Ro i receptionen     │
│                          │                   (mist)│
└──────────────────────────┴─────────────────────────┘
```

- Container: `grid md:grid-cols-2 gap-6`
- Venstre: ét stort hvidt kort (`bg-card`, `rounded-3xl`, `shadow-soft`, `p-8 md:p-10`), `md:row-span-3`. Indeholder titel "Sådan virker det" + 3 trin stablet vertikalt med store tal (text-5xl, accent farve), titel og brødtekst pr. trin
- Højre: `md:col-start-2` med 3 stablede kort i `flex flex-col gap-6`. Hvert kort `rounded-3xl shadow-soft p-6 md:p-7` med tokens: `bg-card-warm`, `bg-card-sage`, `bg-card-mist`. Ikon (Heart/Users/Inbox fra lucide-react) i `text-accent`, titel + brødtekst

**Mobil:** alt stakker automatisk (single column) — først step-kort, så de 3 outcome-kort

**Indhold (eksakt):** se brugerens besked — kopieres ord for ord

---

## 2. Pris-kort redesign

**Fil:** `src/components/Pricing.tsx`

**Kort:**
- `bg-foreground` (mørk ink), `text-background` (lys tekst)
- `relative overflow-hidden` for at indeholde glow
- Subtil coral glow i øverste hjørne: absolut positioneret `div` med `bg-accent/30 blur-3xl` (cirka 200×200, `-top-20 -right-20`, `pointer-events-none`)

**Indhold:**
- Eyebrow: "Pris" (uppercase, tracking-wide, `text-accent`)
- Pris-typografi (flex baseline):
  - `kr` lille (`text-base opacity-70`)
  - `349` stor (`text-7xl font-semibold`)
  - `DKK / md` lille (`text-base opacity-70`)
- Sublinje under: "eksklusiv moms" (`text-sm opacity-60`)
- CTA: `Kom i gang`, full width, `rounded-full`, `bg-accent text-accent-foreground`, hover-state via eksisterende button-variant override
- Bullets med ikoner i `text-accent`:
  - `Sparkles` — Gratis opsætning
  - `PhoneCall` — Ubegrænset opkald
  - `CalendarClock` — Løbende måned + 1 md. i opsigelse
- Skillelinje: `border-t border-background/15` (lys subtil linje på mørk baggrund)
- Under linjen, centreret småtekst:
  - "Ønsker du en årlig aftale?" (`text-sm`)
  - "Ring +45 00 00 00 00 eller skriv til hej@getxm.com" (`text-sm opacity-70`, telefon og mail som `<a>` med underline-on-hover)

**Beholdes:** sektion-id `pricing`, max-w-md container, mailto-link på CTA

---

## Ikke-mål
- Ingen ændringer til Hero, SMS-demo, Navbar, Book demo eller andre sektioner i denne omgang
