import type { SVGProps } from "react";

const PhoneRingingIllustration = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    {/* Soft background blob */}
    <path
      d="M60 8c24 0 46 18 48 40 2 24-14 44-36 50-22 6-46-6-54-26-8-22 4-50 24-58 6-3 12-6 18-6Z"
      fill="hsl(var(--card-warm))"
    />

    {/* Sound waves */}
    <path
      d="M28 60c0-9 4-17 10-22"
      stroke="hsl(var(--accent))"
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.55"
    />
    <path
      d="M20 60c0-13 6-25 16-32"
      stroke="hsl(var(--accent))"
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.3"
    />
    <path
      d="M92 60c0-9-4-17-10-22"
      stroke="hsl(var(--accent))"
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.55"
    />
    <path
      d="M100 60c0-13-6-25-16-32"
      stroke="hsl(var(--accent))"
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.3"
    />

    {/* Phone handset */}
    <path
      d="M44 50c0-4 3-7 7-7h4c3 0 5 2 6 5l2 8c0 3-1 5-4 6l-3 1c2 6 6 10 12 12l1-3c1-3 4-4 6-3l8 2c3 1 5 3 5 6v4c0 4-3 7-7 7-20 0-37-17-37-37Z"
      fill="hsl(var(--foreground))"
    />
  </svg>
);

export default PhoneRingingIllustration;