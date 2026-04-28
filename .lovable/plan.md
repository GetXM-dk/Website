Du kan ikke se den i preview, fordi den nye Problem-sektion endnu ikke er implementeret i koden. Den nuværende `ProblemStrip.tsx` viser stadig den gamle version med kun 3 små kort: “Opkald går tabt”, “Patienten venter ikke” og “Ingen besked”.

Planen er at erstatte den gamle sektion med din færdige version:

1. Opdatér `ProblemStrip.tsx`
   - Brug eyebrow: “Det skjulte pres på klinikkens hverdag”
   - Brug headline: “Hvert ubesvaret opkald starter en kædereaktion”
   - Brug den fulde bodytekst med den korte rytmiske åbning:
     ```text
     Patienten lægger på.
     Ringer igen senere.
     Eller vælger en anden vej.
     ```

2. Tilføj alle 4 Amplify-cards
   - “Bookinger kan gå tabt”
   - “Receptionen får mere pres”
   - “Klinikken virker mindre tilgængelig”
   - “Overblikket forsvinder”

3. Design/layout
   - Gør sektionen mere synlig end den nuværende strip.
   - Brug en bred intro øverst og et 2x2 bento/grid-layout under teksten.
   - Behold stilretningen fra resten af siden: bløde kort, eksisterende farver, rolige borders og god spacing.

4. Teknisk
   - Behold komponentnavnet `ProblemStrip`, så importen i `Index.tsx` fortsat virker.
   - Udskift de gamle 3 cards med de nye 4 cards.
   - Sikr at sektionen fortsat ligger direkte efter Hero i preview.

Når du godkender planen, implementerer jeg ændringen, så den kan ses i preview.