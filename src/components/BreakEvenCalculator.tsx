import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";

const values = [250, 500, 750, 1000, 1500];

const BreakEvenCalculator = () => {
  const [selectedValue, setSelectedValue] = useState<number>(500);
  const [form, setForm] = useState({ name: '', clinic: '', email: '', phone: '' });

  const monthlyPrice = 378;
  const breakEven = monthlyPrice / selectedValue;

  let resultText = "";
  if (breakEven < 1) {
    resultText = "Mindre end én henvendelse pr. måned";
  } else if (breakEven === 1) {
    resultText = "Én henvendelse pr. måned";
  } else {
    resultText = `Ca. ${Math.ceil(breakEven)} henvendelser pr. måned`;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast({ variant: "destructive", title: "Udfyld venligst alle felter" });
      return;
    }

    const subject = encodeURIComponent(`Break-even beregning — ${form.clinic}`);
    const body = encodeURIComponent(
      [
        `Værdi pr. henvendelse: ${selectedValue} kr.`,
        `Resultat: ${resultText}`,
        `---`,
        `Navn: ${form.name}`,
        `Klinik: ${form.clinic}`,
        `E-mail: ${form.email}`,
        `Telefon: ${form.phone}`
      ].join("\n")
    );

    toast({ title: "Tak — vi har modtaget din beregning", description: "Din mailklient åbner nu." });
    window.location.href = `mailto:hej@getxm.dk?subject=${subject}&body=${body}`;
  };

  return (
    <section className="w-full bg-[#F9F9F9] py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* LEFT: CALCULATOR */}
          <div className="space-y-10">
            <div>
              <p className="caption-uppercase text-accent font-semibold">REGNESTYKKET ER ENKELT</p>
              <h2 className="display-lg mt-4 text-foreground leading-tight">Hvor lidt skal der til?</h2>
              <p className="mt-6 text-base text-muted-foreground md:text-lg leading-relaxed">
                GetXM koster 378 kr./md. Vælg hvad én ekstra booking eller patientkontakt cirka er værd for jer.
              </p>
            </div>

            <div className="space-y-6">
              <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Hvad er én ekstra henvendelse værd for jer?
              </Label>
              <div className="flex flex-wrap gap-3">
                {values.map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedValue(v)}
                    className={`h-14 px-6 rounded-xl font-semibold transition-all border-2 ${
                      selectedValue === v 
                        ? "bg-black text-white border-black" 
                        : "bg-white text-foreground border-transparent hover:border-black/10"
                    }`}
                  >
                    {v} kr.
                  </button>
                ))}
              </div>
            </div>

            <div className="p-10 rounded-[2.5rem] bg-white border border-border/50 shadow-soft">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
                Så meget skal GetXM hjælpe videre for at betale sig hjem:
              </p>
              <p className="text-3xl md:text-4xl font-bold text-foreground">
                {resultText}
              </p>
            </div>
          </div>

          {/* RIGHT: LEAD CAPTURE */}
          <div className="flex flex-col rounded-[2.5rem] bg-white border border-border/50 p-8 md:p-12 shadow-soft">
            <div className="mb-10">
              <h3 className="display-sm text-foreground">Vil du se det med jeres egne tal?</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Book en 15 minutters gennemgang, så ser vi på jeres opkaldsflow, åbningstider og typiske henvendelser.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input 
                  placeholder="Navn" 
                  className="h-12 bg-[#F9F9F9] border-none rounded-xl"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                />
                <Input 
                  placeholder="Klinik" 
                  className="h-12 bg-[#F9F9F9] border-none rounded-xl"
                  value={form.clinic}
                  onChange={e => setForm({...form, clinic: e.target.value})}
                />
              </div>
              <Input 
                placeholder="E-mail" 
                type="email"
                className="h-12 bg-[#F9F9F9] border-none rounded-xl"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
              />
              <Input 
                placeholder="Telefon" 
                type="tel"
                className="h-12 bg-[#F9F9F9] border-none rounded-xl"
                value={form.phone}
                onChange={e => setForm({...form, phone: e.target.value})}
              />
              <Button type="submit" className="w-full h-14 bg-black hover:bg-zinc-800 text-white rounded-full font-bold text-lg mt-4">
                Få en konkret vurdering
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BreakEvenCalculator;
