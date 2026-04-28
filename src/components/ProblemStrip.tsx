import { useEffect, useRef, useState } from "react";
import { CalendarX, DoorClosed, EyeOff, Waves } from "lucide-react";

const items = [
  {
    tone: "card-warm",
    icon: CalendarX,
    title: "Bookinger kan gå tabt",
    body: "En varm henvendelse kan ende hos en anden klinik, hvis patienten ikke får svar, mens behovet stadig er aktuelt.",
  },
  {
    tone: "card-sage",
    icon: Waves,
    title: "Receptionen får mere pres",
    body: "Patienter, der ikke kommer igennem, ringer ofte igen. Det giver flere afbrydelser, flere løse ender og mindre ro i hverdagen.",
  },
  {
    tone: "card-mist",
    icon: DoorClosed,
    title: "Klinikken virker mindre tilgængelig",
    body: "Lang ventetid og ubesvarede opkald giver patienten en dårlig start, selv når årsagen bare er travlhed.",
  },
  {
    tone: "card-warm",
    icon: EyeOff,
    title: "Overblikket forsvinder",
    body: "Uden opfølgning ved I ikke, hvem der ringede, hvad de ville, eller hvor mange henvendelser der aldrig blev samlet op.",
  },
] as const;

const toneClasses: Record<(typeof items)[number]["tone"], string> = {
  "card-warm": "bg-card-warm text-card-warm-foreground",
  "card-sage": "bg-card-sage text-card-sage-foreground",
  "card-mist": "bg-card-mist text-card-mist-foreground",
};

const ROTATE_MS = 4000;

const ProblemStrip = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
  }, []);

  useEffect(() => {
    if (isPaused || reducedMotionRef.current) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % items.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [isPaused]);

  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="container py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Det skjulte pres på klinikkens hverdag
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              Hvert ubesvaret opkald starter en kædereaktion
            </h2>
            <div className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              <p className="font-medium text-foreground">
                Patienten lægger på.
                <br />
                Ringer igen senere.
                <br />
                Eller vælger en anden vej.
              </p>
              <p className="mt-6">
                Når ingen følger op, mister I ikke bare opkaldet. I mister også overblikket: Hvem ringede,
                hvad var behovet, og hvor hurtigt skulle I reagere?
              </p>
              <p className="mt-4">
                Det er her, et ubesvaret opkald bliver til mere end et ubesvaret opkald.
              </p>
            </div>
          </div>

          <div
            className="flex flex-col gap-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={() => setIsPaused(false)}
          >
            {items.map(({ tone, icon: Icon, title, body }, index) => {
              const isActive = index === activeIndex;
              return (
                <article
                  key={title}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`rounded-3xl p-7 shadow-soft transition-all duration-500 ease-out md:p-8 ${toneClasses[tone]} ${
                    isActive
                      ? "scale-[1.02] opacity-100 shadow-xl"
                      : "scale-100 opacity-70 hover:opacity-90"
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-background/60 backdrop-blur-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
                      <p
                        className={`mt-2 text-sm leading-relaxed transition-opacity duration-500 md:text-base ${
                          isActive ? "opacity-90" : "opacity-75"
                        }`}
                      >
                        {body}
                      </p>
                    </div>
                  </div>
                  {/* Progress bar — kun synlig på det aktive kort */}
                  <div
                    className={`mt-5 h-0.5 w-full overflow-hidden rounded-full bg-foreground/10 transition-opacity duration-300 ${
                      isActive && !isPaused ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div
                      key={`${activeIndex}-${isPaused}`}
                      className="h-full w-full origin-left bg-foreground/40"
                      style={{
                        animation:
                          isActive && !isPaused
                            ? `problem-progress ${ROTATE_MS}ms linear forwards`
                            : "none",
                      }}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes problem-progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
};

export default ProblemStrip;