import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ClinicMatchTest = () => {
  const [step, setStep] = useState<number>(0); // 0: Intro, 1-5: Questions, 6: Contact, 7: Results
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contactInfo, setContactInfo] = useState({
    name: '',
    clinicName: '',
    email: '',
    phone: ''
  });
  const [consent, setConsent] = useState(false);

  // --- QUESTIONS DEFINITION ---
  const questions = [
    {
      id: 'type',
      title: 'Hvilken type klinik er I?',
      options: ['Tandklinik', 'Fysioterapi / behandlerklinik', 'Psykolog / terapeut', 'Dyreklinik', 'Speciallæge', 'Anden klinik']
    },
    {
      id: 'size',
      title: 'Hvor mange arbejder hos jer?',
      options: ['1–3', '4–10', '11–20', '20+']
    },
    {
      id: 'handling',
      title: 'Hvordan håndterer I telefonen i dag?',
      options: ['Receptionen har ansvaret', 'Behandlerne tager den selv', 'Vi deles om telefonen']
    },
    {
      id: 'marketing',
      title: 'Laver I betalt markedsføring?',
      options: ['Ja, fx Google, Meta eller andre', 'Nej', 'Ved ikke']
    },
    {
      id: 'goal',
      title: 'Hvad sker der typisk, når I ikke når telefonen?',
      options: [
        'Patienten prøver igen senere',
        'Vi ringer tilbage, når vi kan',
        'Der bliver lagt en besked',
        'Vi mister nogle henvendelser',
        'Det er lidt tilfældigt, hvem der følger op'
      ]
    }
  ];

  // --- HELPERS & LOGIC ---
  const getMissedCallRange = () => {
    switch (answers.size) {
      case "1–3": return { min: 5, max: 15 };
      case "4–10": return { min: 15, max: 40 };
      case "11–20": return { min: 30, max: 75 };
      case "20+": return { min: 50, max: 120 };
      default: return { min: 15, max: 40 };
    }
  };

  const getSmsResolutionRange = () => {
    const range = getMissedCallRange();
    return {
      min: Math.round(range.min * 0.67),
      max: Math.round(range.max * 0.67),
    };
  };

  const getBookingPotential = () => {
    const sms = getSmsResolutionRange();
    return {
      min: Math.max(1, Math.round(sms.min * 0.30)),
      max: Math.max(1, Math.round(sms.max * 0.30)),
    };
  };

  const getResultCategory = () => {
    let category = "TYDELIGT POTENTIALE";
    let level = 1;

    if (answers.size === "20+" || answers.size === "11–20") {
      category = "MEGET STORT POTENTIALE";
      level = 3;
    } else if (answers.size === "4–10") {
      category = "STORT POTENTIALE";
      level = 2;
    }

    if (answers.marketing === "Ja, fx Google, Meta eller andre" && level < 3) {
      level += 1;
      category = level === 3 ? "MEGET STORT POTENTIALE" : "STORT POTENTIALE";
    }

    return category;
  };

  const getWhyReasons = () => {
    const reasons = [];
    if (["4–10", "11–20", "20+"].includes(answers.size)) {
      reasons.push("I er flere i klinikken, og telefonen kan hurtigt blive en ekstra opgave for receptionen.");
    } else {
      reasons.push("I er et mindre team, hvor ubesvarede opkald lettere bliver en løs ende.");
    }

    if (answers.handling === "Vi deles om telefonen") {
      reasons.push("Når flere deles om telefonen, bliver opfølgning ofte uens.");
    } else if (answers.handling === "Behandlerne tager den selv") {
      reasons.push("Når behandlere selv tager den, rammer opkald ofte midt i behandlingen.");
    }

    if (answers.marketing === "Ja, fx Google, Meta eller andre") {
      reasons.push("I betaler for synlighed, så henvendelser fra annoncer bør samles op hurtigt.");
    }

    if (answers.goal === "Vi mister nogle henvendelser" || answers.goal === "Det er lidt tilfældigt, hvem der følger op") {
      reasons.push("I oplever, at henvendelser kan gå tabt eller blive overset i en travl hverdag.");
    }

    return reasons.slice(0, 3);
  };

  const handleOptionSelect = (option: string) => {
    const currentQuestion = questions[step - 1];
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: option }));
    setStep(prev => prev + 1);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      toast({ variant: "destructive", title: "Samtykke påkrævet", description: "Du skal give samtykke for at se resultatet." });
      return;
    }
    setStep(7);
  };

  const missed = getMissedCallRange();
  const sms = getSmsResolutionRange();
  const booking = getBookingPotential();
  const category = getResultCategory();
  const reasons = getWhyReasons();

  // --- RENDERING ---
  return (
    <section id="match-test" className="bg-white py-24 md:py-32">
      <div className="container px-6">
        <div className="max-w-[600px] mx-auto min-h-[500px] flex flex-col">
          
          {step === 0 && (
            <div className="text-center flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
              <p className="caption-uppercase text-brand-pink font-bold tracking-[0.2em] mb-4">ER VI ET MATCH?</p>
              <h2 className="text-4xl md:text-5xl font-display text-[#1A1A1A] leading-tight mb-6">
                Se om GetXM giver <br /> mening for jer
              </h2>
              <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                Svar på få spørgsmål om jeres klinik, så viser vi, hvor GetXM typisk skaber mest værdi for klinikker som jeres.
              </p>
              <Button 
                onClick={() => setStep(1)}
                className="h-16 px-12 text-xl font-semibold bg-[#111] hover:bg-black text-white rounded-lg transition-all"
              >
                Start testen <ChevronRight className="ml-2 h-6 w-6" />
              </Button>
            </div>
          )}

          {step >= 1 && step <= 5 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between mb-12">
                <button onClick={() => setStep(prev => prev - 1)} className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm transition-colors">
                  <ChevronLeft className="h-4 w-4" /> Tilbage
                </button>
                <span className="text-xs font-bold text-brand-pink tracking-widest uppercase">Spørgsmål {step} af 5</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-display text-[#1A1A1A] mb-8">{questions[step - 1].title}</h3>
              <div className="space-y-3">
                {questions[step - 1].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    className="w-full text-left p-6 rounded-xl border border-[#1A1A1A]/10 hover:border-brand-pink hover:bg-brand-pink/[0.02] transition-all group flex items-center justify-between"
                  >
                    <span className="text-lg font-medium text-[#1A1A1A]">{option}</span>
                    <ArrowRight className="h-5 w-5 text-brand-pink opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="text-center mb-10">
                <h3 className="text-3xl font-display text-[#1A1A1A] mb-4">Se jeres resultat</h3>
                <p className="text-muted-foreground">Indtast dine oplysninger, så viser vi resultatet og sender en kopi til dig.</p>
              </div>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Navn</label>
                    <input 
                      required 
                      className="w-full h-12 bg-transparent border-b border-[#1A1A1A]/20 focus:border-brand-pink outline-none transition-colors"
                      value={contactInfo.name}
                      onChange={e => setContactInfo({...contactInfo, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Kliniknavn</label>
                    <input 
                      required 
                      className="w-full h-12 bg-transparent border-b border-[#1A1A1A]/20 focus:border-brand-pink outline-none transition-colors"
                      value={contactInfo.clinicName}
                      onChange={e => setContactInfo({...contactInfo, clinicName: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">E-mail</label>
                    <input 
                      required 
                      type="email"
                      className="w-full h-12 bg-transparent border-b border-[#1A1A1A]/20 focus:border-brand-pink outline-none transition-colors"
                      value={contactInfo.email}
                      onChange={e => setContactInfo({...contactInfo, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Telefon</label>
                    <input 
                      required 
                      className="w-full h-12 bg-transparent border-b border-[#1A1A1A]/20 focus:border-brand-pink outline-none transition-colors"
                      value={contactInfo.phone}
                      onChange={e => setContactInfo({...contactInfo, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex items-start gap-3 pt-4">
                  <Checkbox 
                    id="consent" 
                    checked={consent}
                    onCheckedChange={(checked) => setConsent(!!checked)}
                    className="mt-1 border-2"
                  />
                  <label htmlFor="consent" className="text-[11px] text-muted-foreground leading-tight cursor-pointer">
                    Ja tak, vis resultatet og kontakt mig gerne om, hvordan GetXM kan passe til vores klinik. Det er uforpligtende.
                  </label>
                </div>
                <Button className="w-full h-14 text-lg font-semibold bg-[#111] hover:bg-black text-white rounded-lg transition-all mt-6">
                  Vis resultatet
                </Button>
              </form>
            </div>
          )}

          {step === 7 && (
            <div className="animate-in fade-in zoom-in duration-700">
              <div className="bg-[#F9F7F4] rounded-[2rem] p-8 md:p-12 border border-[#1A1A1A]/5 shadow-sm text-center">
                
                {/* Conclusion Block */}
                <div className="mb-12">
                  <p className="text-muted-foreground/60 font-bold text-[10px] tracking-[0.2em] uppercase mb-4">JERES RESULTAT</p>
                  <div className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-brand-pink/10 text-brand-pink border border-brand-pink/20 mb-8">
                    {category}
                  </div>

                  <h3 className="text-4xl md:text-5xl font-display text-[#1A1A1A] leading-tight mb-8">
                    {booking.min}–{booking.max} mulige patientkontakter <br /> kan være på spil hver måned
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                    Klinikker som jeres har typisk {missed.min}–{missed.max} ubesvarede opkald om måneden. 
                    Hvis omkring {sms.min}–{sms.max} af dem kan samles op over SMS, og bare 30% bliver til booking eller relevant opfølgning, svarer det til {booking.min}–{booking.max} mulige patientkontakter hver måned.
                  </p>
                </div>

                {/* Metric Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                  <div className="bg-white p-4 rounded-xl border border-[#1A1A1A]/5 flex flex-col justify-center">
                    <div className="text-xl font-display text-[#1A1A1A] mb-0.5">{missed.min}–{missed.max}</div>
                    <p className="text-[10px] text-muted-foreground leading-tight uppercase font-bold tracking-tighter">ubesvarede opkald/md.</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-[#1A1A1A]/5 flex flex-col justify-center">
                    <div className="text-xl font-display text-[#1A1A1A] mb-0.5">{sms.min}–{sms.max}</div>
                    <p className="text-[10px] text-muted-foreground leading-tight uppercase font-bold tracking-tighter">kan samles op med SMS</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-[#1A1A1A]/5 flex flex-col justify-center">
                    <div className="text-xl font-display text-[#1A1A1A] mb-0.5">{booking.min}–{booking.max}</div>
                    <p className="text-[10px] text-muted-foreground leading-tight uppercase font-bold tracking-tighter">mulige patientkontakter</p>
                  </div>
                </div>

                {/* Break-even Line */}
                <p className="text-sm font-medium text-[#1A1A1A] max-w-sm mx-auto mb-12 leading-relaxed">
                  GetXM koster 378 kr./md. Hvis bare én ekstra henvendelse bliver til en booking eller patientkontakt, kan løsningen hurtigt betale sig hjem.
                </p>

                {/* Outcome Section */}
                <div className="mb-12 text-left bg-white/50 p-6 md:p-8 rounded-2xl border border-[#1A1A1A]/5">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A] mb-8 text-center">Det betyder i praksis</h4>
                  
                  <div className="space-y-8">
                    <div className="flex gap-4 items-start">
                      <CheckCircle2 className="h-6 w-6 text-brand-pink shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-bold text-[#1A1A1A] text-base mb-1">Flere henvendelser bliver til dialog</h5>
                        <p className="text-sm text-muted-foreground leading-relaxed">Patienten får svar med det samme, i stedet for at opkaldet stopper i opkaldslisten.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <CheckCircle2 className="h-6 w-6 text-brand-pink shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-bold text-[#1A1A1A] text-base mb-1">Receptionen får færre gentagelser</h5>
                        <p className="text-sm text-muted-foreground leading-relaxed">Bookinglink, priser, åbningstider og praktiske spørgsmål kan klares direkte over SMS.</p>
                      </div>
                    </div>

                    {answers.marketing === 'Ja, fx Google, Meta eller andre' ? (
                      <div className="flex gap-4 items-start">
                        <CheckCircle2 className="h-6 w-6 text-brand-pink shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-bold text-[#1A1A1A] text-base mb-1">Annoncekroner får bedre chance</h5>
                          <p className="text-sm text-muted-foreground leading-relaxed">Når I betaler for at få telefonen til at ringe, skal opkaldet ikke gå tabt, fordi telefonen ikke bliver taget.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-4 items-start">
                        <CheckCircle2 className="h-6 w-6 text-brand-pink shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-bold text-[#1A1A1A] text-base mb-1">Opfølgning sker hurtigere</h5>
                          <p className="text-sm text-muted-foreground leading-relaxed">I får besked, når patienten har brug for personlig opfølgning.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA Block */}
                <div className="mb-8">
                  <h3 className="text-xl font-display text-[#1A1A1A] mb-3">Se hvordan vi samler dem op for jer</h3>
                  <p className="text-sm text-muted-foreground mb-8 max-w-xs mx-auto leading-relaxed">
                    Book en 15 minutters demo, så viser vi, hvordan GetXM kan følge op med jeres åbningstider, bookinglink og typiske henvendelser.
                  </p>
                  <Button 
                    onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} 
                    className="w-full h-16 text-lg font-semibold bg-[#111] hover:bg-black text-white rounded-xl transition-all shadow-xl"
                  >
                    Book en 15 minutters demo
                  </Button>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
                    Gratis demo · Ingen binding · Ingen teknisk forberedelse
                  </p>
                </div>

                {/* Accordion / Disclaimer */}
                <Accordion type="single" collapsible className="w-full mt-10 border-t border-[#1A1A1A]/5 text-left">
                  <AccordionItem value="why" className="border-b border-[#1A1A1A]/5">
                    <AccordionTrigger className="py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 hover:no-underline">
                      Hvorfor dette resultat?
                    </AccordionTrigger>
                    <AccordionContent className="text-[11px] text-muted-foreground/50 leading-relaxed space-y-3">
                      {reasons.map((reason, i) => (
                        <p key={i} className="flex gap-2">
                          <span className="text-brand-pink">•</span> {reason}
                        </p>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="disclaimer" className="border-b border-[#1A1A1A]/5">
                    <AccordionTrigger className="py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 hover:no-underline">
                      Om resultatet
                    </AccordionTrigger>
                    <AccordionContent className="text-[11px] text-muted-foreground/50 leading-relaxed">
                      Resultatet er et estimat baseret på jeres svar, klinikstørrelse og brancherelevante benchmarks. Det endelige potentiale afhænger af jeres opkaldsvolumen, åbningstider, bookingflow og typen af henvendelser.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="source" className="border-b border-[#1A1A1A]/5">
                    <AccordionTrigger className="py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 hover:no-underline">
                      Hvor kommer tallene fra?
                    </AccordionTrigger>
                    <AccordionContent className="text-[11px] text-muted-foreground/50 leading-relaxed">
                      Beregningsmodellen bruger tre antagelser: klinikker i jeres størrelse har typisk {missed.min}–{missed.max} ubesvarede opkald om måneden, ca. 67% kan ofte samles op eller afklares over SMS, og en konservativ booking-/opfølgningsrate på 30% bruges til at estimere potentialet.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="benchmarks" className="border-none">
                    <AccordionTrigger className="py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 hover:no-underline">
                      Kilder
                    </AccordionTrigger>
                    <AccordionContent className="text-[11px] text-muted-foreground/50 leading-relaxed">
                      Benchmarks är baserade på offentligt tilgængelige analyser om missed calls, patientopkald og speed-to-lead i klinik- og sundhedsbranchen, herunder analyser fra bl.a. Peerlogic, Weave/Dental Intelligence og lead response time-studier.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

              </div>
              
              {/* Back to start link */}
              <button onClick={() => setStep(0)} className="w-full text-center mt-8 text-[10px] text-muted-foreground/30 hover:text-foreground transition-colors uppercase tracking-[0.2em] font-bold">
                Tag testen igen
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default ClinicMatchTest;
