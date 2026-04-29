const reasons = [
  {
    title: "Gratis opsætning",
    body: "Vi hjælper jer i gang uden opstartsgebyr. Ingen tekniker på besøg. Ingen tung opsætning. Bare et sikkerhedsnet, der bliver koblet på jeres nuværende telefoni.",
  },
  {
    title: "50 opkald inkluderet",
    body: "Hver måned er 50 ubesvarede opkald inkluderet i løsningen. Det gør prisen enkel at forstå og nem at regne med. Herefter 7 kr. pr. ekstra ubesvaret opkald.",
  },
  {
    title: "Opsig når du vil",
    body: "Ingen lang binding. I kan opsige med løbende måned plus én måned, hvis GetXM ikke længere passer til klinikken.",
  },
  {
    title: "Behold jeres telefonnummer",
    body: "Patienterne ringer til det nummer, de allerede kender. I slipper for at ændre hjemmeside, Google-profil, visitkort, skilte eller annoncer.",
  },
  {
    title: "Behold jeres teleselskab",
    body: "I skal ikke skifte teleudbyder eller købe nyt udstyr. GetXM lægger sig ovenpå det setup, I allerede bruger.",
  },
  {
    title: "Intet nyt IT",
    body: "Patienten får en SMS og svarer direkte. Ingen app. Intet login. Ingen ny portal eller IT implementering.",
  },
  {
    title: "67% bliver afklaret over SMS",
    body: "Åbningstider, priser, bookinglink og praktisk info kan sendes direkte til patienten. Det giver hurtigere svar og færre små afbrydelser for jer.",
  },
  {
    title: "Besked, når der er brug for jer",
    body: "Hvis patienten ønsker opkald eller har brug for personlig opfølgning, får I det vigtigste samlet på mail: hvem det er, hvad det handler om, og hvad patienten ønsker nu.",
  },
  {
    title: "Få mere ud af jeres annoncekroner",
    body: "Når I betaler for at få telefonen til at ringe, må opkaldet ikke ende som ubesvaret. GetXM hjælper flere henvendelser videre, også når I ikke kan tage telefonen.",
  },
  {
    title: "Dansk løsning til danske klinikker",
    body: "GetXM er bygget til klinikker, hvor telefonen ringer midt i behandlinger, travle dage og patienter i venteværelset. I får hjælp på dansk — fra nogen, der forstår hverdagen.",
  },
] as const;

const WhyGetXM = () => {
  return (
    <section id="why-getxm" className="bg-background">
      <div className="container py-20 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Left — sticky intro */}
          <div className="md:sticky md:top-24 md:self-start">
            <p className="caption-uppercase text-muted-foreground">Derfor GetXM</p>
            <h2 className="display-lg mt-4 text-foreground">10 grunde til, at klinikker vælger GetXM</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              GetXM hjælper jer med at svare hurtigere, samle bedre beskeder og aflaste receptionen — uden at skifte
              nummer, teleselskab eller arbejdsgang.
            </p>
          </div>

          {/* Right — scrollable reasons grid */}
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {reasons.map((reason, i) => (
              <article key={reason.title}>
                <span className="block text-sm font-medium text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-foreground md:text-xl">{reason.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{reason.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyGetXM;
