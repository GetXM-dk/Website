import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const includes = [
  "Automatisk SMS-opfølgning på ubesvarede opkald",
  "Klinikkens navn og tone i alle beskeder",
  "Klar besked til klinikken, når der skal handles",
  "Vi sætter det op for jer",
  "Ingen binding",
];

const Pricing = () => {
  return (
    <section id="pricing" className="container py-20 md:py-28">
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-lift md:p-10">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Pris
          </p>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-5xl font-semibold tracking-tight text-foreground">349 kr.</span>
            <span className="text-base text-muted-foreground">/md.</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Fast enkel pris for klinikker, der vil følge op på ubesvarede opkald.
          </p>

          <Button asChild size="lg" className="mt-6 w-full rounded-full">
            <a href="mailto:hej@getxm.dk?subject=Kom%20i%20gang%20med%20GetXM">Kom i gang</a>
          </Button>

          <ul className="mt-8 space-y-3">
            {includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Pricing;