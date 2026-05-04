import React from 'react';

const steps = [
  {
    number: "01",
    title: "Kort introduktion",
    description: "Vi viser løsningen og aftaler, hvilke oplysninger GetXM skal bruge: telefonnummer, åbningstider, bookinglink og de spørgsmål, I ofte får."
  },
  {
    number: "02",
    title: "Vi sætter systemet op",
    description: "Vi indsamler information fra jeres hjemmeside og fra jer til at tilpasse beskeder, praktiske svar og opfølgningsmail."
  },
  {
    number: "03",
    title: "I aktiverer viderestilling",
    description: "Når alt er klar, viderestiller I ubesvarede opkald til GetXM. Derefter følger systemet automatisk op med SMS."
  }
];

const OnboardingFlow = () => {
  return (
    <section className="w-full bg-[#F9F9F9] py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-16 lg:p-24 shadow-sm">

          {/* Header Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 md:mb-32">
            <div className="max-w-xl text-right md:text-left">
              <p className="caption-uppercase text-brand-pink mb-4">VI GØR DET NEMT AT KOMME I GANG</p>
              <h2 className="display-lg text-foreground leading-[1.1] font-display">
                Fra introduktionsmøde til <br className="hidden md:block" /> live på 48 timer
              </h2>
              <p className="mt-8 text-base text-muted-foreground md:text-lg leading-relaxed">
                I beholder jeres teleselskab, nummer og arbejdsgang. Vi indsamler informationen og sætter SMS-flowet op, så GetXM passer til jer.
              </p>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lift aspect-[4/3] lg:aspect-square">
                <img
                  src="/onboarding-session.jpg"
                  alt="Onboarding session"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col">
                <span className="text-5xl md:text-6xl font-bold text-brand-pink/20 mb-8 font-display">{step.number}</span>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 font-display">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
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
