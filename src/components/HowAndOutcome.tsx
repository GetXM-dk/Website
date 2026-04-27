import { Heart, Users, Inbox } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Patienten ringer",
    body: "I når ikke telefonen, fordi I er optaget, holder pause eller har lukket.",
  },
  {
    n: "02",
    title: "GetXM følger op",
    body: "Patienten får automatisk en SMS og kan svare direkte.",
  },
  {
    n: "03",
    title: "I får besked",
    body: "Vi noterer hvad henvendelsen handler om og sender de relevante oplysninger til jer på mail.",
  },
];

const outcomes = [
  {
    icon: Heart,
    title: "Patienten føler sig set",
    body: "Patienten bliver ikke mødt af tavshed, men får en venlig opfølgning med det samme.",
    tone: "bg-card-warm text-card-warm-foreground",
  },
  {
    icon: Users,
    title: "Færre tabte henvendelser",
    body: "Opkald, I ellers ikke når, bliver samlet op og gjort nemme at følge op på.",
    tone: "bg-card-sage text-card-sage-foreground",
  },
  {
    icon: Inbox,
    title: "Ro i receptionen",
    body: "I kan behandle patienter og håndtere dagen uden at jagte ubesvarede opkald.",
    tone: "bg-card-mist text-card-mist-foreground",
  },
];

const HowAndOutcome = () => {
  return (
    <section id="how" className="container py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Sådan virker det — og hvad I får ud af det
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {/* Left: large white card with 3 steps */}
        <div className="rounded-3xl bg-card p-8 shadow-soft md:p-10">
          <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
            Sådan virker det
          </h3>
          <ol className="mt-8 space-y-8">
            {steps.map((s) => (
              <li key={s.n} className="flex gap-5">
                <span className="text-4xl font-semibold leading-none text-accent md:text-5xl">
                  {s.n}
                </span>
                <div className="pt-1">
                  <h4 className="text-base font-semibold md:text-lg">{s.title}</h4>
                  <p className="mt-1.5 text-sm text-muted-foreground md:text-base">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Right: 3 stacked outcome cards */}
        <div className="flex flex-col gap-6">
          {outcomes.map(({ icon: Icon, title, body, tone }) => (
            <div
              key={title}
              className={`rounded-3xl p-6 shadow-soft md:p-7 ${tone}`}
            >
              <Icon className="h-6 w-6 text-accent" />
              <h3 className="mt-4 text-base font-semibold md:text-lg">{title}</h3>
              <p className="mt-2 text-sm md:text-base opacity-80">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowAndOutcome;