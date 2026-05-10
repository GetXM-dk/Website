import { Question } from "./types";

interface QuizStepProps {
  step: number;
  currentQuestion: Question;
  currentSelection: string;
  isNavigating: boolean;
  currentInsight: string | null;
  handleAnswer: (value: string) => void;
}

export const QuizStep = ({
  step,
  currentQuestion,
  currentSelection,
  isNavigating,
  currentInsight,
  handleAnswer,
}: QuizStepProps) => {
  const maxWords = Math.max(...currentQuestion.options.map((o) => o.label.split(" ").length));
  const useTwoCols = maxWords <= 3 && currentQuestion.id !== "whoAnswers";

  return (
    <div className="flex flex-col min-h-[620px]">
      {step === 1 ? (
        <div className="space-y-6 mb-6">
          <div className="space-y-4 pb-8 border-b border-black/5">
            <h1 className="text-3xl font-display leading-tight text-[#151515] md:text-4xl">
              Ved du, hvad et ubesvaret opkald koster din klinik?
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground">
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
                  : "border-black/8 bg-[#FBF8F3] hover:border-accent hover:bg-white disabled:opacity-50 disabled:hover:border-black/8 disabled:hover:bg-[#FBF8F3]"
              }`}
            >
              <span className="block text-lg font-semibold">{option.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex min-h-[72px] items-end justify-center">
        {currentInsight && (
          <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-300 rounded-2xl bg-accent/10 px-5 py-4 text-sm font-medium leading-relaxed text-accent-foreground text-center">
            {currentInsight}
          </div>
        )}
      </div>
    </div>
  );
};
