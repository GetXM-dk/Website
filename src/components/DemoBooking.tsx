import { FormEvent, useState } from "react";
import { z } from "zod";
import { Check, ChevronLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

const contactSchema = z.object({
  firstName: z.string().trim().min(2, "Skriv dit fornavn"),
  lastName: z.string().trim().min(2, "Skriv dit efternavn"),
  email: z.string().trim().email("Skriv en gyldig firmamail"),
  phone: z.string().trim().min(8, "Skriv et gyldigt telefonnummer"),
  consent: z.boolean().refine(val => val === true, "Du skal give samtykke for at fortsætte"),
});

type ContactForm = z.infer<typeof contactSchema>;

const DemoBooking = () => {
  const [step, setStep] = useState(0); // 0-2: Questions, 3: Contact
  const [answers, setAnswers] = useState({
    clinicType: "",
    clinicSize: "",
    missedCalls: "",
  });
  const [form, setForm] = useState<ContactForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    consent: false,
  });

  const questions = [
    {
      id: "clinicType",
      title: "Hvilken type klinik er I?",
      options: ["Tandlæge", "Fysioterapi", "Lægehuse", "Dyreklinik", "Speciallæge", "Andet"],
    },
    {
      id: "clinicSize",
      title: "Hvor mange ansatte er I?",
      options: ["1-3 ansatte", "4-10 ansatte", "11-20 ansatte", "20+ ansatte"],
    },
    {
      id: "missedCalls",
      title: "Hvor mange ubesvarede opkald har I ca. om dagen?",
      options: ["0-5 opkald", "5-15 opkald", "15-30 opkald", "30+ opkald"],
    },
  ];

  const handleOptionSelect = (option: string) => {
    const currentQuestion = questions[step];
    setAnswers({ ...answers, [currentQuestion.id]: option });
    setStep(step + 1);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = contactSchema.safeParse(form);

    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Fejl i formularen",
        description: "Tjek venligst at alle felter er udfyldt korrekt.",
      });
      return;
    }

    const { firstName, lastName, email, phone } = result.data;
    const { clinicType, clinicSize, missedCalls } = answers;
    
    const subject = encodeURIComponent(`Ny demo-booking — ${firstName} ${lastName} (${clinicType})`);
    const body = encodeURIComponent(
      [
        `Navn: ${firstName} ${lastName}`,
        `E-mail: ${email}`,
        `Telefon: ${phone}`,
        `--- Kvalificering ---`,
        `Type: ${clinicType}`,
        `Størrelse: ${clinicSize}`,
        `Ubesvarede opkald/dag: ${missedCalls}`
      ].join("\n"),
    );

    toast({
      title: "Tak — vi har modtaget jeres oplysninger",
      description: "Vi kontakter jer hurtigst muligt.",
    });
    window.location.href = `mailto:hej@getxm.dk?subject=${subject}&body=${body}`;
  };

  const inputClasses = "w-full h-12 bg-transparent border-b border-[#1A1A1A]/20 focus:border-accent transition-colors outline-none px-0 text-base placeholder:text-muted-foreground/30";
  const labelClasses = "text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider block mb-1";

  return (
    <section id="demo" className="bg-[#F5F3EF] py-24 md:py-40 min-h-[700px] flex items-center">
      <div className="container px-6">
        <div className="max-w-[580px] mx-auto">

          {/* Section intro — always visible */}
          <div className="text-center mb-10">
            <span className="text-[10px] font-bold text-accent tracking-widest uppercase">
              Book en demo
            </span>
            <h2 className="text-3xl md:text-5xl font-display text-[#1A1A1A] leading-[1.05] mt-4 mb-5">
              Lad os finde ud af, om GetXM passer til jeres klinik
            </h2>
            <p className="text-muted-foreground text-base max-w-[460px] mx-auto">
              Svar på 3 hurtige spørgsmål, så vi kan forberede en demo der matcher jeres hverdag. Tager under 30 sekunder.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mb-12">
            {[0, 1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`h-1.5 rounded-full transition-all duration-500 ${step === s ? 'w-8 bg-accent' : 'w-2 bg-foreground/10'}`} 
              />
            ))}
          </div>

          {step < 3 ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between mb-8">
                {step > 0 && (
                  <button 
                    onClick={() => setStep(step - 1)} 
                    className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" /> Tilbage
                  </button>
                )}
                <span className="text-xs font-medium text-muted-foreground ml-auto">
                  Trin {step + 1} af 4
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-display text-[#1A1A1A] leading-tight mb-10">
                {questions[step].title}
              </h2>

              <div className="space-y-3">
                {questions[step].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    className="w-full text-left p-6 rounded-2xl border border-[#1A1A1A]/5 bg-white/50 hover:bg-white hover:border-accent hover:shadow-xl hover:-translate-y-0.5 transition-all group flex items-center justify-between"
                  >
                    <span className="text-lg font-medium text-[#1A1A1A]">{option}</span>
                    <ArrowRight className="h-5 w-5 text-accent opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between mb-8">
                <button 
                  onClick={() => setStep(2)} 
                  className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" /> Tilbage
                </button>
                <span className="text-xs font-medium text-muted-foreground">
                  Trin 4 af 4
                </span>
              </div>

              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display text-[#1A1A1A] leading-tight mb-4">
                  Hvem skal vi kontakte?
                </h2>
                <p className="text-muted-foreground text-sm">
                  Vi bruger dine oplysninger til at aftale en tid til jeres demo.
                </p>
              </div>

              <form className="space-y-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                  <div className="flex flex-col">
                    <label htmlFor="firstName" className={labelClasses}>Fornavn</label>
                    <input
                      id="firstName"
                      className={inputClasses}
                      value={form.firstName}
                      onChange={e => setForm({ ...form, firstName: e.target.value })}
                      autoComplete="given-name"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="lastName" className={labelClasses}>Efternavn</label>
                    <input
                      id="lastName"
                      className={inputClasses}
                      value={form.lastName}
                      onChange={e => setForm({ ...form, lastName: e.target.value })}
                      autoComplete="family-name"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                  <div className="flex flex-col">
                    <label htmlFor="email" className={labelClasses}>Firmamail</label>
                    <input
                      id="email"
                      type="email"
                      className={inputClasses}
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="phone" className={labelClasses}>Telefonnummer</label>
                    <div className="flex items-center gap-3 border-b border-[#1A1A1A]/20 focus-within:border-accent transition-colors">
                      <span className="text-[#1A1A1A]/40 pb-1 text-sm font-medium">+45</span>
                      <input
                        id="phone"
                        type="tel"
                        className="flex-1 h-12 bg-transparent outline-none text-base"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        autoComplete="tel"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-8 pt-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="consent"
                      className="mt-1 border-2"
                      checked={form.consent}
                      onCheckedChange={(checked) => setForm({ ...form, consent: !!checked })}
                    />
                    <label htmlFor="consent" className="text-[11px] text-muted-foreground/60 leading-tight cursor-pointer">
                      Jeg giver mit samtykke til at blive kontaktet vedrørende demo-bookingen i henhold til GetXM's privatlivspolitik.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-16 text-xl font-bold bg-foreground text-background rounded-xl transition-all shadow-xl hover:bg-accent hover:text-accent-foreground hover:shadow-2xl hover:-translate-y-0.5"
                  >
                    Book en demo
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DemoBooking;
