## Mål

Resultatsiden (`/telefon-test`) skal føles som en premium diagnostisk rapport — ikke en alarm-/fejlliste. Q5 løftes som hero-insight, Q2–Q4 bliver roligere kort, og outroet bliver mørkt og markant med en estimat-fokuseret CTA.

Alle ændringer er rene UI/tekst-ændringer i frontend. Score-logik røres ikke.

## Filer der ændres

- `src/components/phone-test/ResultStep.tsx` (hovedparten)
- `src/components/phone-test/data.ts` (kun mindre tekstjusteringer på et par strings — ingen logik)

## 1. Top-sektion (scale)

- Behold eyebrow `JERES RESULTAT ER KLAR` og headline `Hvad koster et mistet opkald jer?`.
- Pak scalen ind i et roligt premium-kort (off-white baggrund, blød border, lille shadow, generøs padding) i stedet for at den svæver løst.
- Behold gradient-bar (grøn → gul → rød) og dot-position.
- `Lidt` / `Meget` labels bliver stående over baren.
- Tilføj en kort støttesætning under baren, fx:
  > Jeres svar peger på, at mistede opkald især kan koste jer overblik, opfølgning og tid.
- Score bruger fortsat kun Q2 + Q3 + Q4 (uændret). Bånd: 0–3 grøn, 4–7 gul, 8–11 rød.

## 2. Hero insight-kort (Q5)

Direkte under scale-kortet, visuelt tungere end de sekundære kort.

- Label: `JERES STØRSTE UDFORDRING` (lille uppercase eyebrow).
- Titel + brødtekst hentes fra `diagnosticMapping.painPoint` (eksisterende tekster matcher allerede specifikationen).
- Stil:
  - Stort kort, mere padding end de sekundære kort.
  - Off-white/lys baggrund med en tynd farvet venstre-accent (4px) i niveauets farve — ikke fyldt rødt panel.
  - Ikon i lille farvet cirkel.
  - Brødtekst i mørk neutral (`text-[#151515]/80`), ikke rød.
  - Fjern "alert"-følelsen.

## 3. Sekundær diagnose-sektion

- Heading ændres til: **De steder, det koster jer mest**
- Subtitle: **Baseret på jeres svar**
- Render Q2 (Telefonhåndtering), Q3 (Afbrydelser), Q4 (Uden for åbningstid) i den rækkefølge.
- Layout: `grid md:grid-cols-3 gap-4` på desktop, stacked på mobil.
- Kort-stil (alle 3, uanset niveau):
  - Hvid/off-white baggrund, neutral border (`border-black/5`), blød shadow.
  - Niveau vises som:
    - Lille farvet badge øverst med label-tekst (grøn=`Fungerer allerede`, gul=`Koster noget`, rød=`Koster meget`).
    - Tynd farvet top- eller venstre-border i niveau-farven.
    - Ikon i farvet cirkel.
  - Kategori-eyebrow (`Telefonhåndtering` osv.) bevares.
  - Titel i mørk display-font.
  - Brødtekst i neutral mørk (`text-[#151515]/75`) — ikke farvet.
- Tekst-indhold matcher allerede specifikationen i `data.ts`; jeg tjekker hver streng og retter kun små afvigelser (fx Q4 grøn: "hjælper patienten videre" → "hjælper mange videre").

## 4. Outro-kort

- Mørk høj-kontrast baggrund (`bg-[#151515]`, lys tekst).
- Titel: **Næste skridt**
- Body:
  > Vi sender jer resultatet og kontakter jer med en kort gennemgang. På mødet kan vi også beregne et estimat i kroner og øre, hvis I vil se, hvad mistede opkald kan betyde for jeres omsætning.
- CTA: Da der ikke findes et faktisk bookingflow i projektet, bruges en sekundær link-stil CTA:
  > Se hvordan estimatet beregnes
  - Implementeres som tekst-link/ghost knap på det mørke kort (ikke en stor primær knap).
  - Ingen onClick-handler endnu (placeholder `href="#"` eller scroll-til-sektion senere).
- Fjern den nuværende `Se hvordan GetXM virker`-knap.

## 5. Tekniske noter

- Tilføj en helper i `ResultStep.tsx`, fx `getLevelLabel(level)` og `getLevelAccent(level)` for badge-tekst og accent-farve, så de sekundære kort ikke længere bruger `getLevelColors` (som farver hele kortet). Behold `getLevelColors` til hero-kortet hvis nyttigt, ellers inline.
- Q5-kortet rendrer fortsat kun hvis `painPointCard` findes.
- Ingen ændringer i `getRiskScore`, `questions`, eller scoring-maps.

## 6. Acceptkriterier-tjek

- Q5 først, visuelt distinkt ✓
- Q5 påvirker ikke score ✓ (kode uændret)
- Scale = Q2+Q3+Q4 ✓
- Sekundære kort er rolige, ikke fulde alert-bokse ✓
- Niveauer synlige men subtile (badge + accent) ✓
- Brødtekst neutral/mørk ✓
- Heading: "De steder, det koster jer mest" ✓
- Outro mørkt og markant ✓
- CTA estimat-fokuseret, ingen "Book mødet" ✓
