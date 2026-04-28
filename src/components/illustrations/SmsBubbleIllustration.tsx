import type { SVGProps } from "react";

const SmsBubbleIllustration = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    {/* Soft background blob */}
    <path
      d="M62 10c26-2 48 16 50 40s-16 46-40 50c-22 4-46-10-52-32-6-22 8-46 28-54 4-2 9-3 14-4Z"
      fill="hsl(var(--card-sage))"
    />

    {/* Back bubble (incoming, light) */}
    <path
      d="M30 38c0-4 3-7 7-7h32c4 0 7 3 7 7v18c0 4-3 7-7 7H46l-8 7v-7h-1c-4 0-7-3-7-7V38Z"
      fill="hsl(var(--background))"
      stroke="hsl(var(--foreground))"
      strokeWidth="2.5"
    />
    <circle cx="44" cy="47" r="2.2" fill="hsl(var(--foreground))" />
    <circle cx="53" cy="47" r="2.2" fill="hsl(var(--foreground))" />
    <circle cx="62" cy="47" r="2.2" fill="hsl(var(--foreground))" />

    {/* Front bubble (outgoing, accent) */}
    <path
      d="M52 64c0-4 3-7 7-7h28c4 0 7 3 7 7v16c0 4-3 7-7 7H72l-8 7v-7h-5c-4 0-7-3-7-7V64Z"
      fill="hsl(var(--accent))"
    />
    {/* Check mark */}
    <path
      d="M65 73l5 5 10-10"
      stroke="hsl(var(--accent-foreground))"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SmsBubbleIllustration;