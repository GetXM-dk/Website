import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Zap } from "lucide-react";
import HeroSmsDemo, { type HeroSmsDemoHandle } from "@/components/HeroSmsDemo";

const Hero = () => {
  const demoRef = useRef<HeroSmsDemoHandle>(null);

  const handleTryDemo = () => {
    demoRef.current?.focusInput();
  };

  return (
    <section id="top" className="relative overflow-hidden bg-background">
      {/* Soft cream-on-cream brand glows for depth without breaking the canvas */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-brand-peach/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-32 h-[420px] w-[420px] rounded-full bg-brand-lavender/20 blur-3xl"
      />

      <div className="container relative py-16 md:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-card/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Zap className="h-3.5 w-3.5 text-brand-pink" fill="currentColor" />
              Lynhurtig og automatisk opfølgning på ubesvarede opkald
            </span>
            <h1 className="display-xl mt-6 text-foreground">
              God behandling starter, før patienten kommer ind ad døren.
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              Når I ikke kan tage telefonen, sender GetXM automatisk en SMS til patienten. Patienten får hjælp videre,
              henvendelsen bliver noteret, og I får de relevante oplysninger samlet på mail{" "}
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Button size="lg" className="rounded-xl px-7" onClick={handleTryDemo}>
                Prøv demoen
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
              <Button asChild size="lg" variant="ghost" className="rounded-xl px-7">
                <a href="#how">Se hvordan det virker</a>
              </Button>
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["Behold nummeret", "Behold teleselskabet", "Få flere bookinger"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand-pink" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hero illustration card holding the phone — surface-soft cream wrapper per design guide */}
          <div className="relative flex justify-center">
            <div className="relative w-full rounded-3xl bg-surface-soft p-6 md:p-10">
              <HeroSmsDemo ref={demoRef} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
