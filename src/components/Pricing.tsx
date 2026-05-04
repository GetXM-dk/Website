import React from 'react';
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";

const included = [
  "Gratis opsætning",
  "Dansk support",
  "Opsig når du vil",
  "Behold nummer og teleselskab",
  "Virker med alle danske teleselskaber"

];

const Pricing = () => {
  return (
    <section id="pricing" className="bg-[#F9F7F4] py-24 md:py-40">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto text-center">

          {/* Label */}
          <p className="caption-uppercase text-brand-pink font-bold tracking-[0.2em] mb-8">PRIS</p>

          {/* Headline */}
          <h2 className="display-lg text-[#1A1A1A] mb-12 font-display">
            Gør klinikken tilgængelig <br className="hidden md:block" /> for en fast lav pris
          </h2>

          {/* Price Card Container */}
          <div className="flex flex-col items-center">

            {/* The Price */}
            <div className="mb-12">
              <span className="text-8xl md:text-9xl font-bold text-[#1A1A1A] font-display tracking-tight">349</span>
              <span className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] font-display ml-2">kr./md.</span>
            </div>

            {/* Checkmark List */}
            <div className="w-full max-w-sm mb-12">
              <ul className="space-y-4 text-left">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-4 text-[#1A1A1A] text-lg font-medium">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-pink/10 flex items-center justify-center">
                      <Check className="h-4 w-4 text-brand-pink" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider & Extra Cost */}
            <div className="w-full max-w-sm pt-8 border-t border-[#1A1A1A]/10 mb-12">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Priser er ekskl. moms.
              </p>
            </div>

            {/* CTA Button */}
            <div className="w-full max-w-md">
              <Button
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full h-16 text-xl font-semibold bg-[#111] hover:bg-black text-white rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                Book en gratis demo
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
