import { useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { getPublicApiBaseUrl } from "@/lib/public-api";

import { QuizAnswers, ContactForm, initialForm, contactSchema } from "./phone-test/types";
import {
  questions,
  loadingLines,
  splitFullName,
  getRiskScore,
  getRiskBand,
} from "./phone-test/data";

import { QuizStep } from "./phone-test/QuizStep";
import { LoadingStep } from "./phone-test/LoadingStep";
import { LeadFormStep } from "./phone-test/LeadFormStep";
import { ResultStep } from "./phone-test/ResultStep";

const getProgressPercentage = (step: number) => {
  switch (step) {
    case 1: return 12;
    case 2: return 32;
    case 3: return 52;
    case 4: return 72;
    case 5: return 92;
    default: return 100;
  }
};

const PhoneTestLanding = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentInsight, setCurrentInsight] = useState<string | null>(null);

  const apiBaseUrl = getPublicApiBaseUrl();
  const leadEndpoint = apiBaseUrl
    ? `${apiBaseUrl}/api/v1/website-demo/lead`
    : "/api/v1/website-demo/lead";
  const isPreviewHost = (() => {
    if (typeof window === "undefined") return false;
    const { hostname } = window.location;
    return (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "::1" ||
      hostname.endsWith(".lovableproject.com") ||
      hostname.endsWith(".lovable.app") ||
      hostname.endsWith(".lovable.dev")
    );
  })();
  const isLocalPreview = isPreviewHost;

  const score = useMemo(() => getRiskScore(answers), [answers]);
  const riskBand = useMemo(() => getRiskBand(score), [score]);

  useEffect(() => {
    if (step !== 6) return;

    setLoadingIndex(0);
    const interval = window.setInterval(() => {
      setLoadingIndex((current) => Math.min(current + 1, loadingLines.length - 1));
    }, 420);

    const timeout = window.setTimeout(() => {
      setStep(7);
    }, 2500);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [step]);

  const currentQuestion = questions[step - 1];
  const currentSelection = currentQuestion ? answers[currentQuestion.id] : "";

  const handleAnswer = (value: string) => {
    if (!currentQuestion || isNavigating) return;

    setIsNavigating(true);
    setAnswers((current) => ({ ...current, [currentQuestion.id]: value }));

    const selectedOption = currentQuestion.options.find(o => o.label === value);
    const hasInsight = selectedOption?.insight;
    
    if (hasInsight) {
      setCurrentInsight(selectedOption.insight!);
    }

    const delay = hasInsight ? 1800 : 500;

    window.setTimeout(() => {
      setStep((current) => current + 1);
      setIsNavigating(false);
      setCurrentInsight(null);
    }, delay);
  };

  const handleBack = () => {
    if (step <= 0 || isNavigating) return;
    
    // Spring loading-skærmen (step 6) over, hvis vi går tilbage fra kontaktformularen
    if (step === 7) {
      setStep(5);
      return;
    }
    
    setStep((current) => current - 1);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = contactSchema.safeParse(form);

    if (!validation.success) {
      toast({
        variant: "destructive",
        title: "Tjek venligst dine oplysninger",
        description: validation.error.issues[0]?.message ?? "Formularen kunne ikke valideres.",
      });
      return;
    }

    const { firstName, lastName } = splitFullName(validation.data.fullName);
    const notes = [
      `Kliniktype: ${answers.clinicType}`,
      `Hvem tager telefonen: ${answers.whoAnswers}`,
      `Hvor ofte: ${answers.frequency}`,
      `Uden for åbningstid: ${answers.followup}`,
      `Største pain point: ${answers.painPoint}`,
      `Respons-score: ${score}/11`,
      `Respons-niveau: ${riskBand}`,
    ];

    setIsSubmitting(true);
    try {
      const response = await fetch(leadEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "phone-test",
          first_name: firstName,
          last_name: lastName,
          email: validation.data.email,
          phone: validation.data.phone,
          company_name: answers.clinicType || "Ukendt klinik",
          notes,
        }),
      });

      if (!response.ok) {
        console.error("Lead submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
    } finally {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setStep(8);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F3EF] text-[#1A1A1A]">
      <header className="sticky top-0 z-50 bg-[#F5F3EF] pt-4">
        <div className="container relative px-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {step > 1 && step < 8 && step !== 6 && (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isNavigating}
                  className="text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              )}
              <Link to="/" className="font-display text-xl font-bold tracking-tight text-[#1A1A1A]">
                GetXM
              </Link>
            </div>
            
            {step >= 1 && step <= 5 && (
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Trin {step} af 5
              </span>
            )}
          </div>
        </div>
        {(step >= 1 && step <= 5) && (
          <div className="h-1 w-full bg-black/10">
            <div 
              className="h-full bg-[#151515] transition-all duration-500 ease-in-out" 
              style={{ width: `${getProgressPercentage(step)}%` }}
            />
          </div>
        )}
      </header>

      <main className="container px-6 py-10 md:py-14">
        <div className={`mx-auto w-full transition-all duration-500 ${step === 8 ? "max-w-[720px]" : "max-w-[640px]"}`}>
          {step === 8 ? (
            submitSuccess && <ResultStep answers={answers} />
          ) : (
            <section className={`rounded-[32px] border border-black/8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] transition-colors duration-500 ${step === 6 ? 'bg-[#151515] text-white px-5 py-6 md:px-8 md:py-8' : 'bg-white px-5 py-6 md:px-8 md:py-8'}`}>
              {step >= 1 && step <= 5 && currentQuestion && (
                <QuizStep
                  step={step}
                  currentQuestion={currentQuestion}
                  currentSelection={currentSelection}
                  isNavigating={isNavigating}
                  currentInsight={currentInsight}
                  handleAnswer={handleAnswer}
                />
              )}

              {step === 6 && <LoadingStep loadingIndex={loadingIndex} />}

              {step === 7 && (
                <LeadFormStep
                  form={form}
                  setForm={setForm}
                  isSubmitting={isSubmitting}
                  handleSubmit={handleSubmit}
                />
              )}
            </section>
          )}
        </div>
      </main>

      <footer className="border-t border-black/6 bg-white/70">
        <div className="container flex flex-col gap-3 px-6 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-center">
          <div className="flex flex-wrap items-center gap-5">
            <Link to="/handelsbetingelser" className="hover:text-foreground">
              Handelsbetingelser
            </Link>
            <Link to="/privatlivspolitik" className="hover:text-foreground">
              Privatlivspolitik
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PhoneTestLanding;
