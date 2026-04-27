import { ReactNode } from "react";

interface PhoneMockupProps {
  children: ReactNode;
  topLabel?: string;
}

const PhoneMockup = ({ children, topLabel }: PhoneMockupProps) => {
  return (
    <div className="relative mx-auto w-[300px] md:w-[340px]">
      {/* Outer body */}
      <div className="relative rounded-[44px] border border-border bg-foreground p-3 shadow-lift">
        {/* Screen */}
        <div className="relative aspect-[9/19] overflow-hidden rounded-[34px] bg-background">
          {/* Notch */}
          <div className="absolute left-1/2 top-2 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-foreground" />
          {/* Status bar */}
          <div className="relative z-10 flex items-center justify-between px-6 pt-3 text-[11px] font-medium text-foreground">
            <span>9:41</span>
            <span className="opacity-0">·</span>
            <span>{topLabel ?? "GetXM"}</span>
          </div>
          {/* Content */}
          <div className="relative z-10 h-[calc(100%-2.25rem)] px-4 pb-4 pt-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;