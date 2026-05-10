import { Loader2 } from "lucide-react";
import { loadingLines } from "./data";

interface LoadingStepProps {
  loadingIndex: number;
}

export const LoadingStep = ({ loadingIndex }: LoadingStepProps) => {
  return (
    <div className="flex min-h-[500px] flex-col justify-center py-10">
      <div className="px-2 text-white">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
          Vi klargør jeres resultat
        </p>
        <div className="mt-5 flex items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
          <p className="text-2xl font-display">Beregner jeres Respons-score</p>
        </div>
        <div className="mt-10 space-y-4">
          {loadingLines.map((line, index) => {
            const active = index <= loadingIndex;
            return (
              <div key={line} className="flex items-center gap-4 text-base">
                <div
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    active ? "bg-accent" : "bg-white/20"
                  }`}
                />
                <span className={active ? "text-white font-medium" : "text-white/50"}>{line}</span>
              </div>
            );
          })}
        </div>


      </div>
    </div>
  );
};
