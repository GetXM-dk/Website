import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import HeroSmsDemo from "@/components/HeroSmsDemo";
import heroGradient from "@/assets/hero-gradient.png";

const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Aurora gradient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          backgroundImage: `url(${heroGradient})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/30 via-background/40 to-background"
      />

      <div className="container py-16 md:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="text-left">
            <span className="inline-flex items-center rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft backdrop-blur">
              Til klinikker, der mister opkald i travle perioder
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl lg:leading-[1.05]">
              God behandling starter, før patienten kommer ind ad døren.
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              Patienten får svar på det, de typisk ringer om — behandlinger, priser, åbningstider og praktiske forhold. Når der kræves opfølgning, får I en klar besked.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="rounded-full px-7">
                <a href="#pricing">
                  Kom i gang
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost" className="rounded-full px-7">
                <a href="#how">Se hvordan det virker</a>
              </Button>
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {[
                "I beholder jeres nummer",
                "Vi sætter det op for jer",
                "Ingen ekstra administration",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center lg:justify-end">
            <HeroSmsDemo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;