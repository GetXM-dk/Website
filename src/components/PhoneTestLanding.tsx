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

  const scrollToTop = () => {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTo(0, 0);
      if ('scrollTo' in document.body) {
        (document.body as any).scrollTo(0, 0);
      }
    });
  };

  // Scroll to top on every step, insight or state change
  useEffect(() => {
    scrollToTop();
  }, [step, currentInsight, isNavigating, submitSuccess]);

  const currentQuestion = questions[step - 1];
  const currentSelection = currentQuestion ? answers[currentQuestion.id] : "";

  const [showNextButton, setShowNextButton] = useState(false);
  const navigationTimeoutRef = useMemo(() => ({ current: null as number | null }), []);

  const handleNext = () => {
    if (navigationTimeoutRef.current) {
      window.clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }
    setStep((current) => current + 1);
    setCurrentInsight(null);
    setShowNextButton(false);
    
    // Safety delay to prevent "click-through" to the next screen
    window.setTimeout(() => {
      setIsNavigating(false);
    }, 300);
  };

  const handleAnswer = (value: string) => {
    if (!currentQuestion || isNavigating) return;

    setIsNavigating(true);
    setAnswers((current) => ({ ...current, [currentQuestion.id]: value }));

    const selectedOption = currentQuestion.options.find(o => o.label === value);
    const hasInsight = selectedOption?.insight;
    
    if (hasInsight) {
      setCurrentInsight(selectedOption.insight!);
      
      // Show button after short delay
      window.setTimeout(() => {
        setShowNextButton(true);
      }, 800);

      // Auto-advance after 8 seconds
      navigationTimeoutRef.current = window.setTimeout(() => {
        handleNext();
      }, 8000);
    } else {
      // Immediate move if no insight
      window.setTimeout(() => {
        setStep((current) => current + 1);
        setIsNavigating(false);
      }, 400);
    }
  };

  const handleBack = () => {
    if (step <= 0 || isNavigating) return;
    
    if (navigationTimeoutRef.current) {
      window.clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }
    
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
    <div className="min-h-screen bg-[#F5F3EF] text-[#1A1A1A] flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-[#F5F3EF] pt-4">
        <div className="container relative px-6 pb-4 mx-auto max-w-[1200px]">
          <div className="flex items-center justify-between">
            <Link to="/" className="font-display text-xl font-bold tracking-tight text-[#1A1A1A]">
              GetXM
            </Link>
          </div>
        </div>
        {step >= 1 && step <= 5 && (
          <div className="h-1 w-full bg-black/5">
            <div 
              className="h-full bg-[#151515] transition-all duration-500 ease-in-out" 
              style={{ width: `${getProgressPercentage(step)}%` }}
            />
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col justify-start py-8 md:py-16">
        <div className="container px-4 mx-auto">
          {step === 8 && submitSuccess ? (
            <div className="mx-auto max-w-[760px]">
              <ResultStep answers={answers} />
            </div>
          ) : (
            <div className="mx-auto max-w-[760px]">
              <div className={`rounded-[32px] border border-black/8 shadow-[0_24px_70px_rgba(15,23,42,0.06)] transition-all duration-500 overflow-hidden ${
                (isNavigating && currentInsight) || step === 6 
                  ? 'bg-[#151515] text-white' 
                  : 'bg-white'
              }`}>
                {/* Internal Step Indicator - only for quiz questions */}
                {step > 1 && step <= 5 && !currentInsight && (
                  <div className="px-8 pt-8 md:px-12 md:pt-12 flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#151515]/40">
                      Trin {step} af 5
                    </span>
                  </div>
                )}

                <div className="px-5 py-8 md:px-12 md:py-12">
                  {step >= 1 && step <= 5 && (
                    <QuizStep
                      step={step}
                      currentQuestion={currentQuestion}
                      currentSelection={currentSelection}
                      isNavigating={isNavigating}
                      currentInsight={currentInsight}
                      showNextButton={showNextButton}
                      handleAnswer={handleAnswer}
                      handleNext={handleNext}
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
                </div>
              </div>

              {/* Back button */}
              {step > 1 && step <= 5 && !isNavigating && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-sm font-medium text-[#151515]/40 hover:text-[#151515] transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Gå tilbage
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="py-12 text-center bg-[#F5F3EF]">
        <div className="flex justify-center gap-8 text-[13px] font-medium text-[#151515]/30">
          <a href="#" className="hover:text-[#151515] transition-colors">Privatlivspolitik</a>
          <a href="#" className="hover:text-[#151515] transition-colors">Handelsbetingelser</a>
          <a href="#" className="hover:text-[#151515] transition-colors">Kontakt</a>
        </div>
        <p className="mt-4 text-[11px] text-[#151515]/20 font-medium tracking-wide">
          &copy; {new Date().getFullYear()} GETXM &middot; OPTIMERING AF KLINIKDRIFT
        </p>
      </footer>
    </div>
  );
};

export default PhoneTestLanding;
