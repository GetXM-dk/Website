import React from 'react';

const reasons = [
  {
    number: "01",
    title: "67% bliver afklaret over SMS",
    description: "Åbningstider, priser og bookinglink sendes direkte. Det giver hurtigere svar og færre afbrydelser for jer."
  },
  {
    number: "02",
    title: "Patienten får hjælp med det samme",
    description: "Praktiske spørgsmål klares automatisk via SMS, så patienten ikke skal vente på et opkald for simple svar."
  },
  {
    number: "03",
    title: "Besked når der er brug for jer",
    description: "Når der er brug for personlig opfølgning, får I det vigtigste samlet i en mail, der er lige til at gå til."
  },
  {
    number: "04",
    title: "Annoncer får en chance mere",
    description: "Vi samler op på de henvendelser, I allerede har betalt for via Google eller Facebook, men ikke når at besvare."
  },
  {
    number: "05",
    title: "Intet nyt IT",
    description: "GetXM kører som et sikkerhedsnet ovenpå jeres nuværende telefoni. Ingen nye skærme eller tung IT-installation."
  },
  {
    number: "06",
    title: "Behold nummer og teleselskab",
    description: "I skal hverken skifte nummer eller udbyder. Vi kobler os blot på jeres eksisterende setup."
  },
  {
    number: "07",
    title: "Dansk løsning",
    description: "Dansk support og danskudviklet system, der er bygget specifikt til klinikker og jeres arbejdsgang."
  },
  {
    number: "08",
    title: "Gratis opsætning",
    description: "Vi hjælper jer i gang uden opstartsgebyr eller krav om teknikerbesøg. Det er hurtigt og enkelt."
  },
  {
    number: "09",
    title: "Opsig når du vil",
    description: "Vi tror på løsningen, ikke på binding. I kan derfor opsige løbende, hvis jeres behov ændrer sig."
  },
  {
    number: "10",
    title: "50 opkald inkluderet",
    description: "De første 50 ubesvarede opkald pr. måned er altid inkluderet i prisen. Det gør det nemt at regne med."
  }
];

const WhyGetXM = () => {
  return (
    <section id="why-getxm" className="bg-white">
      <div className="container py-20 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Left — sticky intro */}
          <div className="md:sticky md:top-24 md:self-start">
            <p className="caption-uppercase text-accent font-semibold">DERFOR GETXM</p>
            <h2 className="display-lg mt-4 text-foreground leading-tight font-display">
              10 grunde til, at vælge GetXM
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Hurtigere svar, færre afbrydelser og bedre opfølgning på de opkald, I ikke når — uden nyt nummer, nyt teleselskab eller ny arbejdsgang.
            </p>
            <div className="mt-12 hidden md:block">
              <div className="rounded-2xl overflow-hidden shadow-sm aspect-[4/3]">
                <img
                  src="/why-getxm.jpg"
                  alt="Klinik hverdag"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right — scrollable reasons */}
          <div className="space-y-12 md:space-y-16">
            {reasons.map((reason) => (
              <div key={reason.number} className="group flex gap-6 md:gap-8 border-b border-border/50 pb-12 last:border-0">
                <span className="text-2xl font-bold text-accent/30 font-display transition-colors group-hover:text-accent">
                  {reason.number}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-foreground md:text-2xl font-display">
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyGetXM;
