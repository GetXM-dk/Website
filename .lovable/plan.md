## Mål
Gøre demo-booking-sektionen mere selvforklarende ved at tilføje en intro-overskrift + subtekst over kvalificeringsspørgsmålene, så brugeren forstår *hvorfor* de skal svare før de møder formularen. Layout (centreret single-column) bevares.

## Ændringer i `src/components/DemoBooking.tsx`

**1. Sektions-intro (vises altid, over progress bar)**
Tilføj en lille header-blok øverst i sektionen — synlig i alle 4 trin:

- Lille eyebrow-label: `BOOK EN DEMO` (accent-farve, uppercase, tracking-widest)
- H2-overskrift: **"Lad os finde ud af, om GetXM passer til jeres klinik"**
- Subtekst (muted): *"Svar på 3 hurtige spørgsmål, så vi kan forberede en demo der matcher jeres hverdag. Tager under 30 sekunder."*

Denne intro forsvinder ikke mellem trin — den giver konstant kontekst om hvad sektionen handler om.

**2. Reducér den nuværende "KVALIFICERING"/"SIDSTE TRIN" eyebrow**
Da der nu er en sektions-intro, gøres trin-eyebrow'en mindre dominerende — erstattes med en simpel trin-tæller: `Trin 1 af 4`, `Trin 2 af 4` osv. (i stedet for "KVALIFICERING").

**3. Spørgsmålsoverskrifter forbliver som de er** (`questions[step].title`) — de fungerer som per-trin H3.

**4. Sidste trin (kontakt)**
Den nuværende centrede "Hvem skal vi kontakte?" + subtekst beholdes, men sektions-intro'en ovenfor bliver stående så brugeren stadig ser konteksten.

## Det der IKKE ændres
- Layout (centreret, max-w-580)
- Baggrundsfarve `#F5F3EF`
- Progress-indikatoren
- Spørgsmål, options, validering, submit-flow
- Knap-design og kontaktformular-felter

## Visuel reference
```text
┌─────────────────────────────────────┐
│         BOOK EN DEMO                │ ← eyebrow (accent)
│                                     │
│  Lad os finde ud af, om GetXM       │ ← H2 (display font)
│  passer til jeres klinik            │
│                                     │
│  Svar på 3 hurtige spørgsmål...     │ ← muted subtekst
│                                     │
│        ● ● ● ●                      │ ← progress
│                                     │
│  Trin 1 af 4                        │ ← lille trin-tæller
│                                     │
│  Hvilken type klinik er I?          │ ← spørgsmål
│  [ Tandlæge          → ]            │
│  [ Fysioterapi       → ]            │
│  ...                                │
└─────────────────────────────────────┘
```
