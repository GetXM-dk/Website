import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Question } from "./types";

interface QuizStepProps {
  step: number;
  currentQuestion: Question;
  currentSelection: string;
  isNavigating: boolean;
  currentInsight: string | null;
  showNextButton: boolean;
  handleAnswer: (value: string) => void;
  handleNext: () => void;
}

export const QuizStep = ({
  step,
  currentQuestion,
  currentSelection,
  isNavigating,
  currentInsight,
  showNextButton,
  handleAnswer,
  handleNext,
}: QuizStepProps) => {
  const [progress, setProgress] = useState(0);

  // Split insight into headline, body, and source
  const parts = currentInsight?.split("|") ?? [];
  const insightHeadline = parts[0] || null;
  const insightBody = parts[1] || (parts.length === 1 ? parts[0] : null);
  const insightSource = parts[2] || null;

  // Reset and start progress bar when insight appears
  useEffect(() => {
    if (isNavigating && currentInsight) {
      setProgress(0);
      const timer = setTimeout(() => setProgress(100), 50);
      return () => clearTimeout(timer);
    } else {
      setProgress(0);
    }
  }, [isNavigating, currentInsight]);

  return (
    <div className="flex flex-col min-h-[460px]">
      {isNavigating && currentInsight ? (
        <div className="relative flex flex-1 flex-col items-center justify-center space-y-12 animate-in fade-in zoom-in-95 duration-500 text-center">
          <div className="space-y-6 mx-auto max-w-[40ch]">
            {insightHeadline && (
              <h3 className="text-2xl md:text-3xl font-display font-bold leading-[1.15] text-[#F5F3EF]">
                {insightHeadline}
              </h3>
            )}
            
            <div className="space-y-4">
              <p className="text-base md:text-lg leading-relaxed text-[#F5F3EF]/75">
                {insightBody}
              </p>
              {insightSource && (
                <p className="text-[11px] leading-normal text-[#F5F3EF]/40 italic">
                  {insightSource}
                </p>
              )}
            </div>
          </div>

          <div className="min-h-[64px] flex items-center justify-center">
            {showNextButton && (
              <button
                type="button"
                onClick={handleNext}
                className="group flex items-center gap-2 rounded-full bg-[#F5F3EF] px-8 py-3 text-sm font-bold text-[#151515] transition-all hover:scale-105 active:scale-95 animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                Næste
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            )}
          </div>

          {/* Progress bar at the bottom of the card content area */}
          <div className="absolute -bottom-8 -left-5 -right-5 md:-bottom-12 md:-left-12 md:-right-12 h-1.5 bg-white/10 overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-[8000ms] ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <>
          {step === 1 && (
            <div className="space-y-6 mb-10">
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#151515]/40">
                  Telefon-testen
                </span>
                <h1 className="text-3xl font-display font-bold leading-[1.1] text-[#151515] md:text-4xl lg:text-5xl">
                  Ved du, hvad et ubesvaret opkald koster din klinik?
                </h1>
                <p className="text-base md:text-lg text-[#151515]/50">
                  Svar på 4 korte spørgsmål og få svaret på under 1 minut.
                </p>
              </div>
              <div className="h-px w-full bg-black/5" />
            </div>
          )}

          <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-display font-bold leading-tight text-[#151515] md:text-3xl">
              {step}. {currentQuestion.title}
            </h2>
          </div>

          <div className="flex flex-col border-t border-black/10">
            {currentQuestion.options.map((option, index) => {
              const selected = currentSelection === option.label;
              const letter = String.fromCharCode(65 + index);

              return (
                <button
                  key={option.label}
                  type="button"
                  disabled={isNavigating}
                  onClick={() => handleAnswer(option.label)}
                  className={`group flex items-center justify-between w-full border-b border-black/10 py-5 text-left transition-all duration-300 px-2 ${
                    selected
                      ? "bg-[#151515]/[0.03]"
                      : "hover:bg-[#151515]/[0.02]"
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <span className={`text-sm font-bold transition-colors ${
                      selected ? "text-[#151515]" : "text-[#151515]/30"
                    }`}>
                      {letter}
                    </span>
                    <span className={`text-base md:text-lg font-semibold transition-colors ${
                      selected ? "text-[#151515]" : "text-[#151515]/80 group-hover:text-[#151515]"
                    }`}>
                      {option.label}
                    </span>
                  </div>
                  
                  <div className={`transition-all duration-300 transform ${
                    selected 
                      ? "translate-x-0 opacity-100" 
                      : "translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}>
                    <ArrowRight className={`h-5 w-5 ${selected ? "text-[#151515]" : "text-[#151515]/40"}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
