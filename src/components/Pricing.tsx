import { Button } from "@/components/ui/button";
import { Sparkles, PhoneCall, CalendarClock } from "lucide-react";

const includes = [
  { icon: Sparkles, label: "Gratis opsætning" },
  { icon: PhoneCall, label: "Ubegrænset opkald" },
  { icon: CalendarClock, label: "Løbende måned + 1 md. i opsigelse" },
];

const Pricing = () => {
  return (
    <section id="pricing" className="container py-20 md:py-28">
      <div className="mx-auto max-w-md">
        <div className="relative overflow-hidden rounded-3xl bg-brand-teal p-8 text-brand-teal-foreground md:p-10">
          {/* peach glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-peach/30 blur-3xl"
          />

          <div className="relative">
            <p className="caption-uppercase text-brand-peach">
              Pris
            </p>

            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="text-base opacity-70">kr</span>
              <span className="display-xl">349</span>
              <span className="text-base opacity-70">DKK / md</span>
            </div>
            <p className="mt-1 text-sm opacity-60">eksklusiv moms</p>

            <Button
              asChild
              size="lg"
              className="mt-6 w-full rounded-full bg-brand-peach text-brand-peach-foreground hover:bg-brand-peach/90"
            >
              <a href="mailto:hej@getxm.dk?subject=Kom%20i%20gang%20med%20GetXM">
                Kom i gang
              </a>
            </Button>

            <ul className="mt-6 space-y-3">
              {includes.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-start gap-2.5 text-sm"
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-peach" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-brand-teal-foreground/15 pt-6 text-center">
              <p className="text-sm">Ønsker du en årlig aftale?</p>
              <p className="mt-1 text-sm opacity-70">
                Ring{" "}
                <a
                  href="tel:+4500000000"
                  className="underline-offset-2 hover:underline"
                >
                  +45 00 00 00 00
                </a>{" "}
                eller skriv til{" "}
                <a
                  href="mailto:hej@getxm.com"
                  className="underline-offset-2 hover:underline"
                >
                  hej@getxm.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;