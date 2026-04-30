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
      <div aria-hidden className="pointer-events-none absolute inset-0 grain-overlay" />

      <div className="container relative pb-16 pt-28 md:pb-24 md:pt-32 lg:pb-28 lg:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-xs font-large text-muted-foreground">
              <Zap className="h-5.5 w-3.5 text-brand-pink" fill="currentColor" />
              Lynhurtig og automatisk opfølgning på ubesvarede opkald
            </span>
            <h1 className="display-xl mt-6 text-foreground">Et ubesvaret opkald er ikke gratis.</h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              Et ubesvaret opkald er ikke gratis. Når I må slippe telefonen, samler GetXM op med en automatisk SMS.
              Patienten kan forklare behovet, og klinikken får en klar besked om, hvem der ringede, hvad det handlede
              om, og hvad der skal ske nu.{" "}
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              {/* 1. Primær knap - Nu uden pil */}
              <Button asChild size="lg" className="rounded-xl px-7">
                <a href="#pricing">Book en demo</a>
              </Button>

              {/* 2. Sekundær knap - Nu mindre fremtrædende med outline og pil */}
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl px-7 border-border/60 text-muted-foreground hover:text-foreground"
                onClick={handleTryDemo}
              >
                Prøv selv
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["Gratis opsætning", "Behold dit teleselskab", "Kun 349,- /md"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand-pink" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Phone floats directly on the aurora background */}
          <div className="relative flex justify-center">
            <HeroSmsDemo ref={demoRef} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
