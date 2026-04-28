import { useEffect, useRef, useState } from "react";
import problemBookings from "@/assets/problem-bookings.png";
import problemReception from "@/assets/problem-reception.png";
import problemAvailability from "@/assets/problem-availability.png";
import problemOverview from "@/assets/problem-overview.png";

const items = [
  {
    image: problemBookings,
    title: "Tabt omsætning",
    body: "En varm henvendelse kan ende hos en anden klinik, hvis patienten ikke får svar, mens behovet stadig er aktuelt.",
  },
  {
    image: problemReception,
    title: "Receptionen får mere pres",
    body: "Patienter, der ikke kommer igennem, ringer ofte igen. Det giver flere afbrydelser, flere løse ender og mindre ro i hverdagen.",
  },
  {
    image: problemAvailability,
    title: "Klinikken virker mindre tilgængelig",
    body: "Lang ventetid og ubesvarede opkald giver patienten en dårlig start, selv når årsagen bare er travlhed.",
  },
  {
    image: problemOverview,
    title: "Overblikket forsvinder",
    body: "Uden opfølgning ved I ikke, hvem der ringede, hvad de ville, eller hvor mange henvendelser der aldrig blev samlet op.",
  },
] as const;

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
    <section className="border-y border-border bg-surface-soft">
      <div className="container py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="text-muted-foreground">Den usynlige kædereaktion</p>
          <h2 className="display-lg mt-4 text-foreground">Et ubesvaret opkald stopper sjældent ved telefonen</h2>
          <div className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              Stilheden snyder, når telefonen ringer ud. Det er ikke bare et ubesvaret opkald. Det er et behov, I ikke
              kender. <p>Måske var det en ny booking, der nu går videre.</p>{" "}
              <p> Måske en aflysning, der kunne have frigivet tid til en anden patient.</p>{" "}
              <p>Måske et spørgsmål, der kommer tilbage senere som en afbrydelse.</p> Når I ikke kender årsagen til
              opkaldet, bliver det svært at prioritere.
            </p>
            <p className="mt-4">
              Tilbage står klinikken med løse ender, men uden viden om, hvilken ende I skal trækkes i først.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <div
            className="flex flex-col gap-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={() => setIsPaused(false)}
          >
            {items.map(({ image, title, body }, index) => {
              const isActive = index === activeIndex;
              return (
                <article
                  key={title}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`rounded-3xl border bg-card p-5 transition-all duration-500 ease-out md:p-6 ${
                    isActive
                      ? "scale-[1.02] border-foreground/15 opacity-100 shadow-lift"
                      : "scale-100 border-border opacity-70 hover:opacity-90"
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl md:h-24 md:w-24">
                      <img
                        src={image}
                        alt=""
                        loading="lazy"
                        width={512}
                        height={512}
                        className="h-16 w-16 object-contain md:h-20 md:w-20"
                      />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">{title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">{body}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemStrip;
