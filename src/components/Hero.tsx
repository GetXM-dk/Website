import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="container py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
            Til klinikker, der mister opkald i travle perioder
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground md:text-6xl md:leading-[1.05]">
            God behandling starter, før patienten kommer ind ad døren.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            Patienten får svar på det, de typisk ringer om — behandlinger, priser, åbningstider og praktiske forhold. Når der kræves opfølgning, får I en klar besked.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-7">
              <a href="#demo">
                Prøv demoen
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="rounded-full px-7">
              <a href="#how">Se hvordan det virker</a>
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {[
              "I beholder jeres nummer",
              "Vi sætter det op for jer",
              "Ingen ny arbejdsgang",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;