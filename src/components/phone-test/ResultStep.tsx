import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { QuizAnswers } from "./types";
import { 
  diagnosticMapping, 
  getRiskScore, 
  DiagnosticLevel 
} from "./data";

interface ResultStepProps {
  answers: Partial<QuizAnswers>;
}

const LevelIcon = ({ level, className }: { level: DiagnosticLevel; className?: string }) => {
  switch (level) {
    case "red":
      return <XCircle className={className} />;
    case "yellow":
      return <AlertCircle className={className} />;
    case "green":
      return <CheckCircle2 className={className} />;
  }
};

const getLevelColors = (level: DiagnosticLevel) => {
  switch (level) {
    case "red":
      return {
        bg: "bg-[#FEF2F2]",
        border: "border-[#FEE2E2]",
        text: "text-[#991B1B]",
        pillBg: "bg-[#EF4444]",
        pillText: "text-white",
      };
    case "yellow":
      return {
        bg: "bg-[#FFFBEB]",
        border: "border-[#FEF3C7]",
        text: "text-[#92400E]",
        pillBg: "bg-[#F59E0B]",
        pillText: "text-white",
      };
    case "green":
      return {
        bg: "bg-[#F0FDF4]",
        border: "border-[#DCFCE7]",
        text: "text-[#166534]",
        pillBg: "bg-[#10B981]",
        pillText: "text-white",
      };
  }
};

export const ResultStep = ({ answers }: ResultStepProps) => {
  const score = getRiskScore(answers);
  const dotPosition = (score / 11) * 100;
  
  const scaleColor = score <= 3 ? "#10B981" : score <= 7 ? "#F59E0B" : "#EF4444";

  const cards = [
    { category: "Telefonhåndtering", data: diagnosticMapping.whoAnswers[answers.whoAnswers ?? ""] },
    { category: "Afbrydelser", data: diagnosticMapping.frequency[answers.frequency ?? ""] },
    { category: "Uden for åbningstid", data: diagnosticMapping.followup[answers.followup ?? ""] },
  ].filter(c => c.data);

  const painPointCard = diagnosticMapping.painPoint[answers.painPoint ?? ""];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
      {/* Top Section */}
      <section className="text-center space-y-6">
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
            Jeres resultat er klar
          </p>
          <h2 className="text-3xl font-display font-bold text-[#151515] md:text-4xl">
            Hvad koster et mistet opkald jer?
          </h2>
        </div>

        {/* Scale */}
        <div className="mx-auto max-w-md px-4">
          <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-3">
            <span>Lidt</span>
            <span>Meget</span>
          </div>
          <div className="relative h-2 w-full rounded-full bg-black/5 mt-10 mb-4">
            <div 
              className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-4 border-white shadow-md transition-all duration-1000 ease-out"
              style={{ 
                left: `${dotPosition}%`, 
                backgroundColor: scaleColor,
                transform: `translate(-50%, -50%)`
              }}
            />
            <div className="absolute inset-0 rounded-full overflow-hidden">
               <div 
                className="h-full transition-all duration-1000 ease-out opacity-20"
                style={{ width: `${dotPosition}%`, backgroundColor: scaleColor }}
               />
            </div>
          </div>
        </div>
      </section>

      {/* Pain point highlight */}
      {painPointCard && (
        <section className="mx-auto max-w-2xl">
          {(() => {
            const colors = getLevelColors(painPointCard.level);
            return (
              <div className={`flex flex-col gap-4 rounded-2xl border ${colors.border} ${colors.bg} p-5 md:p-6`}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                    <LevelIcon level={painPointCard.level} className={`h-6 w-6 ${painPointCard.level === 'green' ? 'text-[#10B981]' : painPointCard.level === 'yellow' ? 'text-[#F59E0B]' : 'text-[#EF4444]'}`} />
                  </div>
                  <h4 className={`font-display text-lg font-bold ${colors.text}`}>
                    {painPointCard.title}
                  </h4>
                </div>
                <p className={`text-base leading-relaxed ${colors.text} opacity-80`}>
                  {painPointCard.text}
                </p>
              </div>
            );
          })()}
        </section>
      )}

      {/* Breakdown Section */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-2xl font-display font-bold text-[#151515]">
            Hvad koster det jer?
          </h3>
          <p className="text-sm text-muted-foreground">
            Top 4 konsekvenser baseret på jeres svar.
          </p>
        </div>

        <div className="grid gap-4">
          {cards.map((card, idx) => {
            const colors = getLevelColors(card.data!.level);
            return (
              <div 
                key={idx} 
                className={`flex flex-col gap-4 rounded-2xl border ${colors.border} ${colors.bg} p-5 md:p-6 transition-all hover:shadow-sm`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm`}>
                      <LevelIcon level={card.data!.level} className={`h-6 w-6 ${card.data!.level === 'green' ? 'text-[#10B981]' : card.data!.level === 'yellow' ? 'text-[#F59E0B]' : 'text-[#EF4444]'}`} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
                        {card.category}
                      </p>
                      <h4 className={`font-display text-lg font-bold ${colors.text}`}>
                        {card.data!.title}
                      </h4>
                    </div>
                  </div>
                </div>
                <p className={`text-base leading-relaxed ${colors.text} opacity-80`}>
                  {card.data!.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Outro */}
      <section className="rounded-3xl bg-[#FBF8F3] border border-black/5 p-8 text-center space-y-6">
        <p className="text-lg leading-relaxed text-[#151515]/80 max-w-2xl mx-auto">
          Vi sender jer resultatet og kontakter jer med en kort gennemgang.
          På mødet kan vi også beregne et estimat i kroner og øre, hvis I vil se, hvad mistede opkald kan betyde for jeres omsætning.
        </p>
        <div className="pt-2">
          <button className="h-14 rounded-xl bg-[#151515] px-10 text-base font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]">
            Se hvordan GetXM virker
          </button>
        </div>
      </section>
    </div>
  );
};
