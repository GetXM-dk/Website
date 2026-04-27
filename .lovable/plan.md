# GetXM — Marketing Landing Page

En one-page hjemmeside der præsenterer GetXM for klinikker og lader besøgende opleve produktet via en interaktiv telefon-mockup.

## Tone & visuel retning

- Minimalistisk healthtech-æstetik: meget hvid plads, sort tekst, én varm accentfarve
- Pill-formede knapper (999px radius), bløde skygger, Inter font
- Rolig, klinikvenlig — ikke sales-y, ingen fake stats, ingen "AI-buzz"
- Mobile-first, responsivt

## Sektioner (one-page, i rækkefølge)

**1. Hero**
- Headline: "God behandling starter, før patienten kommer ind ad døren"
- Supporting line: "Patienten får svar på det, de typisk ringer om — behandlinger, priser, åbningstider og praktiske forhold. Når der kræves opfølgning, får I en klar besked."
- Primær CTA: "Prøv demoen" (scroller til PhoneDemo)
- Sekundær CTA: "Se hvordan det virker"
- Under CTA, tre bullets:
  - I beholder jeres nummer
  - Vi sætter det op for jer
  - Ingen ny arbejdsgang

**2. Problem-strip**
Kort 3-punkts strip: hvad der sker når telefonen ikke bliver taget.

**3. Sådan virker det**
Tre trin:
1. Patienten ringer — I kan ikke tage den
2. **GetXM følger op** — automatisk via SMS
3. I får en klar besked, hvis der skal handles

**4. Interaktiv telefon-demo (`PhoneDemo`)**
- `PhoneMockup`-komponent med state machine: `idle → ringing → missed → smsSent → patientReply → getxmReply → clinicMessage`
- Besøgende klikker "Start demo" og ser et komplet flow afspille sig
- GetXM-svar i demoen: *"Prisen afhænger af behandlingsbehov, tilskud og den konkrete vurdering. Klinikken kan hjælpe med at afklare det. Skriv gerne dit navn, så giver vi beskeden videre."*
- Mock-data drevet af `simulateFollowUp()` i `src/lib/getxm-demo.ts` — API-ready struktur så rigtig backend kan kobles på senere uden UI-ændringer
- Ingen rigtig telefonnummer-input

**5. Outcomes**
Kort sektion med hvad klinikken får ud af det (rolige, ærlige formuleringer — ikke procenttal).

**6. NY: "Mister din klinik patienter uden for åbningstid?"** *(mellem Outcomes og Sammenligning)*
- Bento-grid med 3 dæmpede pastel-cards (blød lys gul / sage / dueblå — på linje med healthtech-paletten, ikke skrigende)
- Sektionsoverskrift: "Mister din klinik patienter uden for åbningstid?"
- Kort intro: "De fleste tabte opkald sker ikke pga. dårlig service — de sker, fordi timing aldrig passer."
- Tre cards:
  - **Efter lukketid** — Patienten ringer, mens de har tid. I ser først opkaldet næste dag.
  - **Midt i behandling** — I kan ikke tage telefonen uden at afbryde patienten foran jer.
  - **Mandag morgen** — Listen med ubesvarede opkald er lang. Det er uklart, hvem der stadig har brug for svar.
- Hvert card: lille ikon/illustration øverst, kort titel, én sætning under
- Afsluttende linje under grid'et: "GetXM tager opfølgningen, så ingen patient bliver efterladt uden svar."

**7. Sådan er vi anderledes**
Sammenligningstabel: GetXM vs. callcenter vs. AI-receptionist.

**8. Pris**
- "349 kr./md."
- "Fast enkel pris for klinikker, der vil følge op på ubesvarede opkald."
- CTA: "Kom i gang"

**9. FAQ**
Accordion med de mest almindelige spørgsmål (opsætning, sikkerhed, patientdata, opsigelse).

**10. Footer**
Kontakt, simple links.

## Ikke med i denne omgang
Backend, database, auth, faktisk SMS-afsendelse, telefonnummer-input i demo, flere sprog, kundelogin, dashboard.

## Tekniske detaljer

- React + Vite + Tailwind + shadcn/ui
- Design-tokens (HSL) i `index.css`: paletten inkl. de tre dæmpede pastel-toner til bento-cards som semantiske tokens (`--card-warm`, `--card-sage`, `--card-mist`) så de er konsistente og let kan justeres
- Komponenter i `src/components/`: `Hero`, `ProblemStrip`, `HowItWorks`, `PhoneDemo` (+ `PhoneMockup`), `Outcomes`, `LostCallsBento` (ny), `ComparisonTable`, `Pricing`, `FAQ`, `Footer`
- Demo-logik isoleret i `src/lib/getxm-demo.ts` med typed scenario-objekter — klar til at swappe mock med rigtig API
- Pill-knapper og 999px radius som global token
