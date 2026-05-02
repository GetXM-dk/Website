import { ReactNode } from "react";

interface PhoneMockupProps {
  children: ReactNode;
  topLabel?: string;
}

const PhoneMockup = ({ children }: PhoneMockupProps) => {
  return (
    <div className="relative mx-auto w-[300px] md:w-[340px]">
      {/* Outer body */}
      <div className="relative rounded-[44px] border border-border bg-foreground p-2.5 shadow-lift">
        {/* Screen */}
        <div className="relative aspect-[9/19] overflow-hidden rounded-[34px] bg-background">
          {/* Notch */}
          <div className="absolute left-1/2 top-2 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-foreground" />
          {/* Content (notch spacing only) */}
          <div className="relative z-10 h-full px-4 pb-4 pt-12">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;