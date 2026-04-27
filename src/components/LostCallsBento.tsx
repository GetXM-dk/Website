import { MoonStar, Stethoscope, CalendarClock } from "lucide-react";

const cards = [
  {
    tone: "card-warm",
    icon: MoonStar,
    eyebrow: "Efter lukketid",
    body: "Patienten ringer, mens de har tid. I ser først opkaldet næste dag.",
  },
  {
    tone: "card-sage",
    icon: Stethoscope,
    eyebrow: "Midt i behandling",
    body: "I kan ikke tage telefonen uden at afbryde patienten foran jer.",
  },
  {
    tone: "card-mist",
    icon: CalendarClock,
    eyebrow: "Mandag morgen",
    body: "Listen med ubesvarede opkald er lang. Det er uklart, hvem der stadig har brug for svar.",
  },
] as const;

const toneClasses: Record<(typeof cards)[number]["tone"], string> = {
  "card-warm": "bg-card-warm text-card-warm-foreground",
  "card-sage": "bg-card-sage text-card-sage-foreground",
  "card-mist": "bg-card-mist text-card-mist-foreground",
};

const LostCallsBento = () => {
  return (
    <section className="container py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Mister din klinik patienter uden for åbningstid?
        </h2>
        <p className="mt-3 text-muted-foreground">
          De fleste tabte opkald sker ikke pga. dårlig service — de sker, fordi timing aldrig passer.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {cards.map(({ tone, icon: Icon, eyebrow, body }) => (
          <article
            key={eyebrow}
            className={`group rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1 ${toneClasses[tone]}`}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-background/60 backdrop-blur-sm">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-6 text-lg font-semibold">{eyebrow}</h3>
            <p className="mt-2 text-sm leading-relaxed opacity-80">{body}</p>
          </article>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-xl text-center text-sm text-muted-foreground">
        GetXM tager opfølgningen, så ingen patient bliver efterladt uden svar.
      </p>
    </section>
  );
};

export default LostCallsBento;