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
    <section id="top" className="relative overflow-hidden hero-aurora">
      {/* Subtle grain texture for depth */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grain-overlay" />
      {/* Soft fade to background at the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
      />

      <div className="container relative py-16 md:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft backdrop-blur">
              <Zap className="h-3.5 w-3.5 text-accent" fill="currentColor" />
              Lynhurtig og automatisk opfølgning på ubesvarede opkald
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl lg:leading-[1.05]">
              God behandling starter, før patienten kommer ind ad døren.
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              Når I ikke kan tage telefonen, sender GetXM automatisk en SMS til patienten. Vi hjælper patienten videre,
              noterer hvad henvendelsen handler om og sender de relevante oplysninger til jer på mail.{" "}
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Button size="lg" className="rounded-full px-7" onClick={handleTryDemo}>
                Prøv demoen
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
              <Button asChild size="lg" variant="ghost" className="rounded-full px-7">
                <a href="#how">Se hvordan det virker</a>
              </Button>
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["I beholder jeres telefonnummer", "Vi sætter det op for jer", "Ingen ekstra administration"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-accent" />
                    <span>{item}</span>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="flex justify-center px-[3px]">
            <HeroSmsDemo ref={demoRef} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
