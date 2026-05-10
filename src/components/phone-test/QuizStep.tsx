import { ArrowRight } from "lucide-react";
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
  const maxWords = Math.max(...currentQuestion.options.map((o) => o.label.split(" ").length));
  const useTwoCols = maxWords <= 3 && currentQuestion.id !== "whoAnswers";

  // Split insight into headline, body, and source
  const parts = currentInsight?.split("|") ?? [];
  const insightHeadline = parts[0] || null;
  const insightBody = parts[1] || (parts.length === 1 ? parts[0] : null);
  const insightSource = parts[2] || null;

  return (
    <div className="flex flex-col min-h-[460px]">
      {isNavigating && currentInsight ? (
        <div className="flex flex-1 flex-col items-center justify-center space-y-12 animate-in fade-in zoom-in-95 duration-500 text-center">
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

          <div className={`grid gap-2.5 ${useTwoCols ? "sm:grid-cols-2" : "grid-cols-1"}`}>
            {currentQuestion.options.map((option) => {
              const selected = currentSelection === option.label;

              return (
                <button
                  key={option.label}
                  type="button"
                  disabled={isNavigating}
                  onClick={() => handleAnswer(option.label)}
                  className={`group relative w-full overflow-hidden rounded-2xl border px-5 py-3.5 text-left transition-all duration-300 ${
                    selected
                      ? "border-[#151515] bg-[#151515] text-white shadow-[0_12px_30px_rgba(0,0,0,0.1)]"
                      : "border-black/5 bg-[#FBF8F3] hover:border-black/20 hover:bg-white hover:-translate-y-0.5 active:translate-y-0"
                  }`}
                >
                  {/* Subtle left accent on hover */}
                  {!selected && (
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#151515] opacity-0 transition-opacity group-hover:opacity-100" />
                  )}
                  
                  <span className="relative block text-base font-semibold md:text-lg">{option.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
