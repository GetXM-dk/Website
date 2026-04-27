import { Heart, Users, Inbox } from "lucide-react";

const items = [
  {
    icon: Heart,
    title: "Patienten føler sig set",
    body: "I stedet for stilhed får patienten et hurtigt svar i klinikkens navn.",
  },
  {
    icon: Users,
    title: "Færre tabte henvendelser",
    body: "Folk ringer ikke videre til den næste klinik, mens I venter på at få ringet tilbage.",
  },
  {
    icon: Inbox,
    title: "Ro i receptionen",
    body: "I behøver kun at reagere på de samtaler, hvor klinikken faktisk skal involveres.",
  },
];

const Outcomes = () => {
  return (
    <section className="container py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Hvad I faktisk får ud af det
        </h2>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <Icon className="h-5 w-5 text-accent" />
            <h3 className="mt-3 text-base font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Outcomes;