import type { SVGProps } from "react";

const MailNoteIllustration = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    {/* Soft background blob */}
    <path
      d="M58 8c24-2 48 14 52 38 4 24-12 48-34 54-22 6-48-8-54-30-6-22 8-48 28-58 3-2 5-3 8-4Z"
      fill="hsl(var(--card-mist))"
    />

    {/* Note paper behind */}
    <rect
      x="32"
      y="28"
      width="56"
      height="44"
      rx="6"
      fill="hsl(var(--background))"
      stroke="hsl(var(--foreground))"
      strokeWidth="2.5"
    />
    <path d="M40 40h40" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
    <path d="M40 50h32" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
    <path d="M40 60h24" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />

    {/* Envelope front */}
    <rect
      x="28"
      y="62"
      width="64"
      height="38"
      rx="6"
      fill="hsl(var(--foreground))"
    />
    <path
      d="M28 70l32 18 32-18"
      stroke="hsl(var(--card-mist))"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Accent dot (notification) */}
    <circle cx="92" cy="64" r="7" fill="hsl(var(--accent))" stroke="hsl(var(--background))" strokeWidth="2.5" />
  </svg>
);

export default MailNoteIllustration;