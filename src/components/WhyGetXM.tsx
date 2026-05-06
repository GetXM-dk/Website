import React from 'react';

const reasons = [
  {
    number: "01",
    title: "Mindre støj, mere arbejdsro",
    description: "Hele 67 % af alle henvendelser (booking, priser og info) afklares automatisk via SMS, så I får færre afbrydelser i hverdagen."
  },
  {
    number: "02",
    title: "Patienten får svar med det samme",
    description: "Patienten bliver mødt af hjælp fremfor tavshed, hvilket giver en bedre oplevelse og hurtigere afklaring."
  },
  {
    number: "03",
    title: "Overblik direkte i indbakken",
    description: "I får kun besked, når en sag kræver jeres personlige opfølgning. Vi sender navn, nummer og info samlet i én mail."
  },
  {
    number: "04",
    title: "Få mere ud af jeres annoncer",
    description: "Vi samler op på de henvendelser, I allerede har betalt for via Google eller Facebook, men ikke når at besvare."
  },
  {
    number: "05",
    title: "Behold jeres nuværende setup",
    description: "I skal hverken skifte nummer eller teleselskab. GetXM kører som et sikkerhedsnet ovenpå jeres eksisterende telefoni."
  },
  {
    number: "06",
    title: "Enkelt og risikofrit",
    description: "Kom i gang med gratis opsætning, dansk support og ingen binding. De første 50 opkald hver måned er inkluderet i prisen."
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
              6 grunde til, at vælge GetXM
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Telefonpasning hjælper jer med at tage telefonen. GetXM hjælper jer med at følge op på de opkald, I ikke når — så færre henvendelser ender som tabte muligheder.
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
