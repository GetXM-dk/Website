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

const ProblemStrip = () => {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="container py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Det skjulte pres på klinikkens hverdag
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              Hvert ubesvaret opkald starter en kædereaktion
            </h2>
          </div>

          <div className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
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

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {items.map(({ tone, icon: Icon, title, body }) => (
            <article
              key={title}
              className={`rounded-3xl p-7 shadow-soft transition-transform duration-300 hover:-translate-y-1 md:p-8 ${toneClasses[tone]}`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background/60 backdrop-blur-sm">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed opacity-80 md:text-base">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemStrip;