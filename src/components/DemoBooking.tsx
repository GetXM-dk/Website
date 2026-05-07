import { FormEvent, useState } from "react";
import { z } from "zod";
import { ChevronLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const contactSchema = z.object({
  firstName: z.string().trim().min(2, "Skriv dit fornavn"),
  lastName: z.string().trim().min(2, "Skriv dit efternavn"),
  email: z.string().trim().email("Skriv en gyldig firmamail"),
  phone: z.string().trim().min(8, "Skriv et gyldigt telefonnummer"),
});

type ContactForm = z.infer<typeof contactSchema>;

const DemoBooking = () => {
  const [step, setStep] = useState(0); // 0-2: Questions, 3: Contact
  const [isPreparing, setIsPreparing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState({
    clinicType: "",
    phoneHandling: "",
    missedCalls: "",
  });
  const [form, setForm] = useState<ContactForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const configuredApiUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, "");
  const leadEndpoint = configuredApiUrl
    ? `${configuredApiUrl}/api/v1/website-demo/lead`
    : "/api/v1/website-demo/lead";

  const questions = [
    {
      id: "clinicType",
      title: "Hvilken type klinik er I?",
      options: [
        "Tandlæge",
        "Fysioterapi",
        "Skønhed / Kosmetik",
        "Kiropraktor / Osteopat",
        "Dyreklinik",
        "Andet"
      ],
    },
    {
      id: "phoneHandling",
      title: "Hvem tager sig primært af telefonen i dag?",
      options: [
        "Vi har en receptionist",
        "Behandlerne selv",
        "Vi deles om det",
        "Andet"
      ],
    },
    {
      id: "missedCalls",
      title: "Hvor ofte oplever I, at telefonen ringer, mens I er optaget?",
      options: [
        "Sjældent – vi føler, vi når det meste",
        "Indimellem – især i spidsbelastninger",
        "Ofte – vi kan mærke, at vi ikke når dem alle",
        "Vi tæller ikke – vi prioriterer patienterne i stolen"
      ],
    },
  ];

  const handleOptionSelect = (option: string) => {
    const currentQuestion = questions[step];
    const newAnswers = { ...answers, [currentQuestion.id]: option };
    setAnswers(newAnswers);
    
    if (step === 2) {
      setIsPreparing(true);
      setTimeout(() => {
        setIsPreparing(false);
        setStep(3);
      }, 800);
    } else {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
    const { clinicType, phoneHandling, missedCalls } = answers;

    setIsSubmitting(true);
    try {
      const response = await fetch(leadEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "demo-booking",
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          company_name: clinicType,
          notes: [
            `Klinik-type: ${clinicType}`,
            `Hvem tager telefonen: ${phoneHandling}`,
            `Oplevelse af ubesvarede: ${missedCalls}`,
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Lead submission failed");
      }

      toast({
        title: "Tak — vi har modtaget jeres oplysninger",
        description: "Vi kontakter jer for at aftale jeres 15-minutters demo.",
      });
      setForm({ firstName: "", lastName: "", email: "", phone: "" });
      setAnswers({ clinicType: "", phoneHandling: "", missedCalls: "" });
      setStep(0);
    } catch {
      toast({
        variant: "destructive",
        title: "Kunne ikke sende formularen",
        description: "Prøv igen om et øjeblik, eller skriv til hej@getxm.dk.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full h-14 bg-white border border-[#1A1A1A]/20 rounded-xl focus:border-foreground focus:ring-1 focus:ring-foreground transition-all outline-none px-5 text-base placeholder:text-muted-foreground/30";
  const labelClasses = "text-sm font-semibold text-[#1A1A1A] mb-2 block";

  return (
    <section id="demo" className="bg-[#F5F3EF] py-24 md:py-40 min-h-[750px] flex items-center">
      <div className="container px-6">
        <div className="max-w-[580px] mx-auto">

          {/* Section intro — always visible */}
          <div className="text-center mb-10">
            <span className="text-[10px] font-bold text-accent tracking-widest uppercase">
              Book en demo
            </span>
            <h2 className="text-3xl md:text-5xl font-display text-[#1A1A1A] leading-[1.05] mt-4 mb-5">
              Se hvordan GetXM kan hjælpe jeres klinik på 48 timer
            </h2>
            <p className="text-muted-foreground text-base max-w-[460px] mx-auto">
              Svar på et par spørgsmål, så vi kan skræddersy en demo til jer. Det tager kun et øjeblik.
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

          {isPreparing ? (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
              <Loader2 className="h-10 w-10 text-accent animate-spin mb-6" />
              <p className="text-lg font-display text-[#1A1A1A] animate-pulse">
                Forbereder jeres personlige demo...
              </p>
            </div>
          ) : step < 3 ? (
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="phone" className={labelClasses}>Telefonnummer</label>
                    <div className="flex items-center gap-3 bg-white border border-[#1A1A1A]/20 rounded-xl focus-within:border-foreground focus-within:ring-1 focus-within:ring-foreground transition-all px-5">
                      <span className="text-[#1A1A1A]/40 text-sm font-medium border-r border-[#1A1A1A]/10 pr-3">+45</span>
                      <input
                        id="phone"
                        type="tel"
                        className="flex-1 h-14 bg-transparent outline-none text-base"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        autoComplete="tel"
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-16 text-xl font-bold bg-foreground text-background rounded-xl transition-all shadow-xl hover:bg-accent hover:text-accent-foreground hover:shadow-2xl hover:-translate-y-0.5"
                  >
                    {isSubmitting ? "Sender..." : "Book en demo"}
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
