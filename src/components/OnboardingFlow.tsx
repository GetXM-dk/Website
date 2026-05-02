import React from 'react';

const steps = [
  {
    number: "01",
    title: "Kort gennemgang",
    description: "Mødet er uforpligtende og kan afholdes online over 15 minutter. Her afklarer vi jeres behov, og hvordan GetXM passer ind hos jer."
  },
  {
    number: "02",
    title: "Vi bygger SMS-flowet",
    description: "Vi bruger information fra jeres hjemmeside og fra jer til at tilpasse beskeder, praktiske svar og opfølgningsmail."
  },
  {
    number: "03",
    title: "I aktiverer viderestilling",
    description: "Når alt er klar, viderestiller I ubesvarede opkald til GetXM. Derefter følger vi automatisk op med SMS."
  }
];

const OnboardingFlow = () => {
  return (
    <section className="w-full bg-white py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16 md:mb-24">
            <p className="caption-uppercase text-accent">VI GØR DET NEMT AT KOMME I GANG</p>
            <h2 className="display-lg mt-4 text-foreground leading-[1.1]">
              Fra kort gennemgang til <br className="hidden md:block" /> live SMS-flow
            </h2>
            <p className="mt-6 text-base text-muted-foreground md:text-lg max-w-2xl leading-relaxed">
              I beholder jeres teleselskab, nummer og arbejdsgang. Vi hjælper jer med at samle informationen og sætter SMS-flowet op, så GetXM passer til jeres klinik.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {steps.map((step) => (
              <div key={step.number} className="relative flex flex-col">
                <span className="display-sm text-brand-pink/20 font-bold mb-6">{step.number}</span>
                <h3 className="text-xl font-semibold text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnboardingFlow;
