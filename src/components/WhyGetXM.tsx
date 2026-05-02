import meditatingPerson from "@/assets/dance.svg";

const reasons = [
  {
    title: "Gratis opsætning",
    body: "Vi hjælper jer i gang uden opstartsgebyr eller teknikerbesøg.",
  },
  {
    title: "50 opkald inkluderet",
    body: "50 ubesvarede opkald er inkluderet hver måned. Herefter 7 kr. pr. ekstra opkald.",
  },
  {
    title: "Opsig når du vil",
    body: "Ingen lang binding. Opsig med løbende måned plus én måned.",
  },
  {
    title: "Behold jeres telefonnummer",
    body: "Patienterne ringer stadig til det nummer, de allerede kender.",
  },
  {
    title: "Behold jeres teleselskab",
    body: "I beholder jeres teleudbyder og det setup, I allerede bruger.",
  },
  {
    title: "Intet nyt IT",
    body: "Patienten svarer direkte på SMS. Ingen app, intet login og ingen ny portal.",
  },
  {
    title: "67% bliver afklaret over SMS",
    body: "Åbningstider, priser, bookinglink og praktisk info kan sendes direkte til patienten. Det giver hurtigere svar og færre små afbrydelser for jer.",
  },
  {
    title: "Besked, når der er brug for jer",
    body: "Når der er brug for jer, får I det vigtigste samlet på mail.",
  },
  {
    title: "Annoncer får en chance mere",
    body: "Gør jeres annoncer mere effektive. Vi samler op på de henvendelser, I allerede har betalt for, men ikke når at besvare.",
  },
  {
    title: "Dansk løsning til danske klinikker",
    body: "Bygget til klinikker med travle dage, behandlinger og patienter i venteværelset.",
  },
] as const;

const WhyGetXM = () => {
  return (
    <section id="why-getxm" className="bg-white">
      <div className="container py-20 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Left — sticky intro */}
          <div className="md:sticky md:top-24 md:self-start">
            <p className="caption-uppercase text-accent">Derfor GetXM</p>
            <h2 className="display-lg mt-4 text-foreground leading-[1.1]">
              10 grunde til, at <br className="hidden lg:block" /> klinikker vælger GetXM
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Hurtigere svar, færre afbrydelser og bedre opfølgning på de opkald, I ikke når — uden nyt nummer, nyt teleselskab eller ny arbejdsgang.
            </p>
            <div className="p-8 md:p-16 flex justify-center">
              <img
                src={meditatingPerson}
                alt="Illustration af person der danser"
                className="w-full max-w-sm"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right — scrollable reasons grid */}
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
            {reasons.map((reason, i) => (
              <article key={reason.title}>
                <span className="block text-sm font-medium text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-foreground md:text-xl leading-snug">{reason.title}</h3>
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
