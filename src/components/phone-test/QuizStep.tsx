import { ArrowRight, Lightbulb } from "lucide-react";
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
  const headline = parts[0] || null;
  const body = parts[1] || (parts.length === 1 ? parts[0] : null);
  const source = parts[2] || null;

  return (
    <div className="flex flex-col min-h-[520px] md:min-h-[580px]">
      {isNavigating && currentInsight ? (
        <div className="flex flex-1 flex-col items-center justify-center space-y-10 animate-in fade-in zoom-in-95 duration-500 py-10 px-4 text-center">


          <div className="space-y-4 mx-auto max-w-[32ch]">
            {headline && (
              <h3 className="text-sm md:text-base font-bold text-[#151515]/60 uppercase tracking-wide">
                {headline}
              </h3>
            )}
            <div className="space-y-3">
              <p className="text-2xl md:text-3xl font-display font-bold leading-[1.15] text-[#151515]">
                {body}
              </p>
              {source && (
                <p className="text-[11px] leading-normal text-[#151515]/40 italic">
                  {source}
                </p>
              )}
            </div>
          </div>

          <div className="min-h-[64px] flex items-center justify-center">
            {showNextButton && (
              <button
                type="button"
                onClick={handleNext}
                className="group flex items-center gap-2 rounded-full bg-[#151515] px-8 py-3 text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                Næste
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {step === 1 ? (
            <div className="space-y-6 mb-6">
              <div className="space-y-4 pb-8 border-b border-black/5">
                <h1 className="text-3xl font-display leading-tight text-[#151515] md:text-4xl">
                  Ved du, hvad et ubesvaret opkald koster din klinik?
                </h1>
                <p className="text-base leading-relaxed text-[#151515]/60">
                  Svar på 4 korte spørgsmål og få svaret på under 1 minut.
                </p>
              </div>
              <h2 className="text-xl font-display leading-tight text-[#151515] md:text-2xl">
                {currentQuestion.title}
              </h2>
            </div>
          ) : (
            <div className="space-y-4 mb-6">
              <h2 className="text-3xl font-display leading-tight text-[#151515] md:text-4xl">
                {currentQuestion.title}
              </h2>
            </div>
          )}

          <div className={`mt-4 mb-auto grid gap-3 ${useTwoCols ? "sm:grid-cols-2" : "grid-cols-1"}`}>
            {currentQuestion.options.map((option) => {
              const selected = currentSelection === option.label;

              return (
                <button
                  key={option.label}
                  type="button"
                  disabled={isNavigating}
                  onClick={() => handleAnswer(option.label)}
                  className={`w-full rounded-[20px] border px-5 py-4 text-left transition-all ${
                    selected
                      ? "border-foreground bg-[#151515] text-white shadow-[0_16px_40px_rgba(15,23,42,0.14)]"
                      : "border-black/8 bg-[#FBF8F3] hover:border-[#151515] hover:bg-white disabled:opacity-50 disabled:hover:border-black/8 disabled:hover:bg-[#FBF8F3]"
                  }`}
                >
                  <span className="block text-lg font-semibold">{option.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
