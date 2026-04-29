## Ny sektion: "Sikkerhedsnettet"

Placering: direkte efter `ProblemStrip` ("Et ubesvaret opkald stopper sjældent ved telefonen") — altså samme plads som den nuværende `HowAndOutcome`. Vi erstatter `HowAndOutcome` med en ny komponent `SafetyNet`, så den nye sektion overtager pladsen og rytmen i `Index.tsx`.

### Designidé

Sektionen skal føles som et roligt "løsnings-løft" efter problembeskrivelsen — lys cremebaggrund, en tydelig intro-blok med eyebrow + headline + brødtekst, og derunder et 2x2 grid med fire outcome-kort i klinikkens brand-farver.

```text
┌───────────────────────────────────────────────────────────┐
│ SIKKERHEDSNETTET                       (eyebrow, accent)  │
│                                                           │
│ Når I ikke kan besvare opkaldet,                          │
│ får patienten stadig svar           (display-lg headline) │
│                                                           │
│ Body (2 afsnit) ...........................               │
│ Mikro-payoff (kursiv/fremhævet linje)                     │
│                                                           │
│   ──── Fra ubesvaret opkald til næste skridt ────         │
│                                                           │
│ ┌────────────────────┐  ┌────────────────────┐            │
│ │ icon               │  │ icon               │            │
│ │ Patienten får svar │  │ Simple spørgsmål   │            │
│ │ med det samme      │  │ klares på SMS      │            │
│ │ body...            │  │ body...            │            │
│ └────────────────────┘  └────────────────────┘            │
│ ┌────────────────────┐  ┌────────────────────┐            │
│ │ icon               │  │ icon               │            │
│ │ I får besked,      │  │ Behold jeres       │            │
│ │ når der er brug…   │  │ nuværende telefoni │            │
│ │ body...            │  │ body...            │            │
│ └────────────────────┘  └────────────────────┘            │
└───────────────────────────────────────────────────────────┘
```

### Visuelt sprog

- **Sektionsbaggrund:** `bg-surface-soft` (samme rolige creme som `ProblemStrip`), så vi får en blød kontrast til den mørke `UnansweredCalls` ovenfor og det hvide canvas nedenfor.
- **Intro-blok:** centreret, max-bredde ~3xl. Eyebrow i `caption-uppercase` med `text-accent` (brand pink). Headline i `display-lg`. Brødtekst i `text-muted-foreground`. Den korte payoff-linje ("Så står I ikke bare med et nummer i opkaldslisten." + de to følgende linjer) får lidt mere vægt — `text-foreground` og `font-medium`, evt. med en tynd venstre-bord eller bare ekstra spacing.
- **Sub-headline over grid:** "Fra ubesvaret opkald til næste skridt" som mindre `display-sm`, centreret, med diskret divider-linje på hver side.
- **Outcome-grid:** 4 kort i 2x2 (`md:grid-cols-2`), `rounded-3xl`, `p-7 md:p-8`, blød skygge (`shadow-soft`). Hvert kort har:
  - lille ikon-badge (44x44, `rounded-2xl`, `bg-background/60`)
  - titel (`text-lg font-semibold`)
  - body (`text-sm md:text-base`, `opacity-80`)
- **Brand-farver per kort** (cykler gennem paletten, samme stil som `LostCallsBento` / `HowAndOutcome`):
  1. "Patienten får svar med det samme" → `bg-brand-peach text-brand-peach-foreground`, ikon `MessageSquare`
  2. "Simple spørgsmål klares på SMS" → `bg-brand-mint text-brand-mint-foreground`, ikon `Sparkles`
  3. "I får besked, når der er brug for jer" → `bg-brand-lavender text-brand-lavender-foreground`, ikon `Mail`
  4. "Behold jeres nuværende telefoni" → `bg-brand-ochre text-brand-ochre-foreground`, ikon `Phone`

Alle ikoner kommer fra `lucide-react`, så vi holder os til eksisterende dependencies.

### Indhold (1:1 fra brief)

- Eyebrow: `Sikkerhedsnettet`
- Headline: `Når I ikke kan besvare opkaldet, får patienten stadig svar`
- Body afsnit 1 + afsnit 2 + payoff-linjerne præcis som leveret.
- Sub-headline: `Fra ubesvaret opkald til næste skridt`
- 4 outcome-kort med titler og brødtekst præcis som leveret.

### Teknisk plan

1. **Opret** `src/components/SafetyNet.tsx` med strukturen ovenfor. Bruger:
  - Tailwind-klasser og eksisterende design tokens (`surface-soft`, `brand-*`, `display-lg/sm`, `caption-uppercase`).
  - `lucide-react` ikoner (`MessageSquare`, `Sparkles`, `Mail`, `Phone`).
  - Et `id="safety-net"` på `<section>` så vi senere kan linke til den.
2. **Opdatér** `src/pages/Index.tsx`:
  - Importér `SafetyNet`.
  - Erstat `<HowAndOutcome />` med `<SafetyNet />` i samme position (efter `<ProblemStrip />`).
  - Fjern import af `HowAndOutcome`.
3. **Behold** `HowAndOutcome.tsx` i filtræet for nu (ikke slet) — så vi kan genbruge mønstre, hvis du vil putte den tilbage andetsteds. Hvis du foretrækker at slette filen helt, gør jeg det.
4. **Ingen** ændringer i CSS/tokens — alt findes allerede i `index.css` og `tailwind.config.ts`.
5. **Ingen** nye assets — vi bruger lucide-ikoner i stedet for illustrationer for at holde sektionen ren og hurtig.

### Åbne spørgsmål (kan besvares når vi bygger, ellers tager jeg defaults ovenfor)

-  `HowAndOutcome` slettes helt.
- Skal sub-headline "Fra ubesvaret opkald til næste skridt" være `display-sm` (foreslået) eller mindre/eyebrow-stil? Default: `display-sm`.

Sig til hvis du vil justere farverytmen, ikon-valget eller intro-stilen, ellers implementerer jeg planen som beskrevet.