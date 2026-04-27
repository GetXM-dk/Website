import { PhoneOff, Clock, MessageSquareOff } from "lucide-react";

const items = [
  {
    icon: PhoneOff,
    title: "Opkald går tabt",
    body: "I travle perioder kan receptionen ikke nå alt — og opkaldet bliver væk.",
  },
  {
    icon: Clock,
    title: "Patienten venter ikke",
    body: "Hvis ingen svarer hurtigt, ringer patienten ofte videre til den næste klinik.",
  },
  {
    icon: MessageSquareOff,
    title: "Ingen besked",
    body: "De fleste lægger ikke voicemail. I ved aldrig, hvem der prøvede at få fat i jer.",
  },
];

const ProblemStrip = () => {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="container grid gap-8 py-12 md:grid-cols-3 md:py-16">
        {items.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background text-foreground shadow-soft">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProblemStrip;