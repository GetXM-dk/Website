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

const levelAccent = (level: DiagnosticLevel) => {
  switch (level) {
    case "red":
      return "#EF4444";
    case "yellow":
      return "#F59E0B";
    case "green":
      return "#10B981";
  }
};

const levelLabel = (level: DiagnosticLevel) => {
  switch (level) {
    case "red":
      return "Koster meget";
    case "yellow":
      return "Koster noget";
    case "green":
      return "Fungerer allerede";
  }
};

const levelTint = (level: DiagnosticLevel) => {
  switch (level) {
    case "red":
      return "bg-[#FEF2F2]";
    case "yellow":
      return "bg-[#FFFBEB]";
    case "green":
      return "bg-[#F0FDF4]";
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
      {/* Top Section — scale card */}
      <section className="text-center space-y-6">
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
            Jeres resultat er klar
          </p>
          <h2 className="text-3xl font-display font-bold text-[#151515] md:text-4xl">
            Hvad koster et mistet opkald jer?
          </h2>
        </div>

        <div className="mx-auto max-w-xl rounded-3xl border border-black/5 bg-[#FBF8F3] p-6 md:p-8 shadow-sm">
          <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-4">
            <span>Lidt</span>
            <span>Meget</span>
          </div>
          <div
            className="relative h-2 w-full rounded-full"
            style={{
              background:
                "linear-gradient(to right, #10B981 0%, #F59E0B 50%, #EF4444 100%)",
            }}
          >
            <div
              className="absolute top-1/2 h-4 w-4 rounded-full border-4 border-white shadow-md transition-all duration-1000 ease-out"
              style={{
                left: `${dotPosition}%`,
                backgroundColor: scaleColor,
                transform: `translate(-50%, -50%)`,
              }}
            />
          </div>
          <p className="mt-6 text-sm leading-relaxed text-[#151515]/70">
            Jeres svar peger på, at mistede opkald især kan koste jer overblik, opfølgning og tid.
          </p>
        </div>
      </section>

      {/* Hero insight — Q5 */}
      {painPointCard && (
        <section className="mx-auto max-w-2xl">
          <div
            className="relative overflow-hidden rounded-3xl border border-black/5 bg-white p-7 md:p-9 shadow-sm"
            style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 12px 32px -16px rgba(0,0,0,0.12)" }}
          >
            <div
              className="absolute left-0 top-0 h-full w-1"
              style={{ backgroundColor: levelAccent(painPointCard.level) }}
            />
            <div className="flex items-center gap-3 mb-5">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${levelTint(painPointCard.level)}`}
              >
                <LevelIcon
                  level={painPointCard.level}
                  className="h-5 w-5"
                  // @ts-expect-error inline style on lucide icon
                  style={{ color: levelAccent(painPointCard.level) }}
                />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70">
                Jeres største udfordring
              </p>
            </div>
            <h3 className="font-display text-2xl md:text-[28px] font-bold text-[#151515] leading-tight">
              {painPointCard.title}
            </h3>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-[#151515]/75">
              {painPointCard.text}
            </p>
          </div>
        </section>
      )}

      {/* Secondary diagnostic cards — Q2/Q3/Q4 */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-2xl font-display font-bold text-[#151515]">
            De steder, det koster jer mest
          </h3>
          <p className="text-sm text-muted-foreground">Baseret på jeres svar</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((card, idx) => {
            const level = card.data!.level;
            const accent = levelAccent(level);
            return (
              <div
                key={idx}
                className="relative flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white p-5 md:p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div
                  className="absolute left-0 top-0 h-full w-1"
                  style={{ backgroundColor: accent }}
                />
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${levelTint(level)}`}
                  >
                    <LevelIcon
                      level={level}
                      className="h-5 w-5"
                      // @ts-expect-error inline style on lucide icon
                      style={{ color: accent }}
                    />
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: `${accent}1A`,
                      color: accent,
                    }}
                  >
                    {levelLabel(level)}
                  </span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 mb-1">
                  {card.category}
                </p>
                <h4 className="font-display text-lg font-bold text-[#151515] leading-snug">
                  {card.data!.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-[#151515]/75">
                  {card.data!.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Outro — dark */}
      <section className="rounded-3xl bg-[#151515] p-8 md:p-10 text-center space-y-5">
        <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
          Næste skridt
        </h3>
        <p className="text-base md:text-lg leading-relaxed text-white/75 max-w-2xl mx-auto">
          Vi sender jer resultatet og kontakter jer med en kort gennemgang.
          På mødet kan vi også beregne et estimat i kroner og øre, hvis I vil se,
          hvad mistede opkald kan betyde for jeres omsætning.
        </p>
        <div className="pt-2">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
          >
            Se hvordan estimatet beregnes →
          </a>
        </div>
      </section>
    </div>
  );
};
