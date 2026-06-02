import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";

const features = [
  "De første 50 opkald hver måned – altid inkluderet i prisen.",
  "Gratis opsætning – vi bygger jeres SMS-flow og gør alt det tekniske klar.",
  "Dansk support – vi kender jeres hverdag og sidder klar til at hjælpe.",
  "Behold jeres nummer – fungerer med TDC, 3, Telenor, Telavox og alle andre.",
  "Fuld fleksibilitet – vælg løbende måned eller spar penge med en 12-måneders løsning."
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);

  const monthlyPrice = 504;
  const yearlyPrice = 378;
  const savings = (monthlyPrice - yearlyPrice) * 12;

  return (
    <section id="pricing" className="bg-[#F9F7F4] py-24 md:py-32">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <h2 className="display-lg text-foreground mb-4 font-display">
            Alt inkluderet i én simpel plan
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            Ingen skjulte gebyrer. Ingen teknikerbesøg. Bare fuldt overblik.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <button
              onClick={() => setIsYearly(false)}
              className={`text-sm font-semibold transition-colors ${!isYearly ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Månedlig betaling
            </button>
            <div
              className={`relative w-14 h-7 rounded-full cursor-pointer p-1 transition-colors ${isYearly ? 'bg-foreground' : 'bg-black/10'}`}
              onClick={() => setIsYearly(!isYearly)}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${isYearly ? 'translate-x-7' : 'translate-x-0'}`}
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsYearly(true)}
                className={`text-sm font-semibold transition-colors ${isYearly ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Årlig betaling
              </button>
              <span className="hidden md:inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                Spar {savings.toLocaleString('da-DK')} kr.
              </span>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="relative max-w-2xl mx-auto">
            {/* Savings Tag (Top) */}
            {isYearly && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                <div className="inline-flex items-center gap-2 bg-[#E7F8F1] text-[#0D9488] px-6 py-2.5 rounded-full text-sm font-bold shadow-xl animate-in fade-in zoom-in-95">
                  <Check className="w-4 h-4 stroke-[3]" />
                  FÅ 3 MÅNEDER GRATIS
                </div>
              </div>
            )}

            <div className="bg-white rounded-[2.5rem] border border-border/50 p-8 md:p-14 shadow-lift transition-all hover:shadow-2xl">
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-6xl md:text-7xl font-bold tracking-tight text-foreground">
                    {isYearly ? yearlyPrice : monthlyPrice}
                  </span>
                  <div className="text-left">
                    <p className="text-xl md:text-2xl font-semibold text-foreground">kr./md.</p>
                    <p className="text-sm text-muted-foreground">ekskl. moms</p>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-12 text-left max-w-md mx-auto">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-accent/10 flex items-center justify-center">
                      <Check className="h-2.5 w-2.5 text-accent" />
                    </div>
                    <p className="text-[13px] md:text-[14px] leading-relaxed text-foreground/70">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="space-y-4">
                <Button
                  onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full h-16 text-xl font-bold bg-foreground text-background rounded-2xl shadow-xl transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-2xl hover:-translate-y-0.5"
                >
                  Book en demo
                </Button>
                <p className="text-sm text-muted-foreground">
                  Uforpligtende gennemgang på 15 minutter
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
