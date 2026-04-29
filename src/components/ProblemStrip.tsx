import { useEffect, useRef, useState } from "react";
import problemBookings from "@/assets/problem-bookings.png";
import problemReception from "@/assets/problem-reception.png";
import problemAvailability from "@/assets/problem-availability.png";
import problemOverview from "@/assets/problem-overview.png";

const items = [
  {
    image: problemAvailability,
    title: "Indtrykket skabes før samtalen",
    body: "Tilgængelighed skaber tryghed. Et ubesvaret opkald kan få klinikken til at virke svær at få fat i, selv når årsagen bare er en travl formiddag.",
  },

  {
    image: problemBookings,
    title: "Et nummer mangler kontekst",
    body: "I opkaldslisten ligner alle opkald hinanden. Uden samtalen ved I ikke, om det handlede om booking, pris, afbud, spørgsmål eller noget, der hastede.",
  },
  {
    image: problemOverview,
    title: "Receptionen får dobbeltarbejde",
    body: "Det ubesvarede opkald forsvinder ikke altid. Ofte kommer det igen senere — bare på et dårligere tidspunkt, hvor receptionen allerede er i gang med noget andet.",
  },
  {
    image: problemReception,
    title: "Patienten søger videre",
    body: "Når patienten ikke får kontakt, bliver næste skridt ofte at lede efter en anden mulighed. Særligt hvis de bare ville høre en pris, stille et hurtigt spørgsmål eller finde en ledig tid.",
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
              kender Måske var det en booking, en aflysning eller et hurtigt spørgsmål. Når årsagen mangler, bliver det
              svært at prioritere.
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
