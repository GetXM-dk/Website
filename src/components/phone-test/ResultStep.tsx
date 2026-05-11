import { useEffect, useState } from "react";
import { QuizAnswers } from "./types";
import {
  diagnosticMapping,
  getRiskScore,
  getRiskBand,
  DiagnosticLevel,
  resultSummary,
} from "./data";

interface ResultStepProps {
  answers: Partial<QuizAnswers>;
}

const levelAccent = (level: DiagnosticLevel) => {
  switch (level) {
    case "red":
      return "#FF2A2A";
    case "yellow":
      return "#FFA32A";
    case "green":
      return "#2F855A";
  }
};


const bandSentence = (band: "low" | "medium" | "high") => {
  return resultSummary[band];
};

export const ResultStep = ({ answers }: ResultStepProps) => {
  const score = getRiskScore(answers);
  const band = getRiskBand(score);
  const rawPosition = (score / 11) * 100;
  const dotPosition = Math.min(96, Math.max(4, rawPosition));

  const [animatedPosition, setAnimatedPosition] = useState(4);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPosition(dotPosition);
    }, 300);
    return () => clearTimeout(timer);
  }, [dotPosition]);

  const rows = [
    { data: diagnosticMapping.whoAnswers[answers.whoAnswers ?? ""] },
    { data: diagnosticMapping.frequency[answers.frequency ?? ""] },
    { data: diagnosticMapping.followup[answers.followup ?? ""] },
  ].filter((r) => r.data && r.data.level !== "green");

  const painPointCard = diagnosticMapping.painPoint[answers.painPoint ?? ""];

  return (
    <div className="space-y-14 md:space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
      {/* 1 — Headline + impact scale */}
      <section className="space-y-10">
        <div className="space-y-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#151515]/50">
            Jeres resultat er klar
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] text-[#151515] max-w-[18ch]">
            Hvad koster et mistet opkald jer?
          </h2>
        </div>

        <div className="max-w-2xl space-y-4">
          <div className="flex justify-between text-[11px] font-bold uppercase tracking-[0.18em] text-[#151515]/50">
            <span>LAV OMKOSTNING</span>
            <span>HØJ OMKOSTNING</span>
          </div>
          <div
            className="relative h-3.5 w-full rounded-full"
            style={{
              background:
                "linear-gradient(to right, rgba(47,133,90,0.35) 0%, rgba(183,121,31,0.35) 50%, rgba(192,57,43,0.45) 100%)",
            }}
          >
            <div
              className="absolute top-1/2 h-[22px] w-[22px] rounded-full border-[3px] border-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all ease-out"
              style={{ 
                left: `${animatedPosition}%`,
                backgroundColor: "#151515",
                transform: "translate(-50%, -50%)",
                transitionDuration: '1500ms'
              }}
            />
          </div>
          <p className="text-[15px] leading-relaxed text-[#151515]/70 pt-1">
            {bandSentence(band)}
          </p>
        </div>
      </section>

      {/* 2 — Q5 hero */}
      {painPointCard && (
        <section className="py-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#151515]/50 mb-5">
            {painPointCard.costLabel}
          </p>
          <h3 className="font-display text-2xl md:text-3xl font-bold leading-[1.15] text-[#151515]">
            {painPointCard.title}
          </h3>
          <p className="mt-5 text-[17px] md:text-[18px] leading-[1.6] text-[#151515]/75 max-w-[60ch]">
            {painPointCard.text}
          </p>
        </section>
      )}

      {/* 3 — Secondary diagnostics */}
      {rows.length > 0 && (
        <section className="space-y-8">
          <div className="space-y-1.5">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-[#151515]">
              Hvor GetXM kan hjælpe jer
            </h3>
          </div>

          <div className="border-t border-black/10">
            {rows.map((row, idx) => {
              const level = row.data!.level;
              const accent = levelAccent(level);
              return (
                <div
                  key={idx}
                  className="py-8 md:py-10 border-b border-black/10 last:border-b-0 space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-block h-3 w-3 rounded-full shrink-0"
                      style={{ backgroundColor: accent }}
                      aria-hidden
                    />
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#151515]/50">
                      {row.data!.costLabel}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-display text-[20px] md:text-[22px] font-bold leading-tight text-[#151515]">
                      {row.data!.title}
                    </h4>
                    <p className="text-[16px] md:text-[18px] leading-[1.6] text-[#151515]/70 max-w-[62ch]">
                      {row.data!.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 4 — Næste skridt */}
      <section className="rounded-3xl bg-[#151515] p-8 md:p-12 space-y-4">
        <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
          Næste skridt
        </h3>
        <p className="text-[16px] md:text-[17px] leading-[1.65] text-white/75 max-w-[60ch]">
          Vi sender jer resultatet og kontakter jer med en kort gennemgang.
          På mødet kan vi også beregne et estimat i kroner og øre, hvis I vil se,
          hvad mistede opkald kan betyde for jeres omsætning.
        </p>
      </section>
    </div>
  );
};
