import type { SVGProps } from "react";

type Tone = "warm" | "sage" | "mist";

interface SectionDividerProps extends SVGProps<SVGSVGElement> {
  tone?: Tone;
  flip?: boolean;
}

const toneToVar: Record<Tone, string> = {
  warm: "hsl(var(--card-warm))",
  sage: "hsl(var(--card-sage))",
  mist: "hsl(var(--card-mist))",
};

const SectionDivider = ({ tone = "warm", flip = false, className, ...props }: SectionDividerProps) => (
  <div aria-hidden className={`pointer-events-none w-full ${className ?? ""}`}>
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block h-12 w-full md:h-16"
      style={flip ? { transform: "scaleY(-1)" } : undefined}
      {...props}
    >
      <path
        d="M0 40 C 240 10, 480 70, 720 40 S 1200 10, 1440 40 L1440 80 L0 80 Z"
        fill={toneToVar[tone]}
        opacity="0.35"
      />
      <path
        d="M0 55 C 280 30, 560 80, 840 55 S 1240 35, 1440 55 L1440 80 L0 80 Z"
        fill={toneToVar[tone]}
        opacity="0.55"
      />
    </svg>
  </div>
);

export default SectionDivider;