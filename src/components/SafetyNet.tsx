import { MessageSquare, Sparkles, Mail, Phone } from "lucide-react";

const outcomes = [
  {
    icon: MessageSquare,
    title: "Patienten får svar med det samme",
    body: "I stedet for en død linje får patienten en SMS, der hjælper dem videre. Det skaber tryghed og gør det mindre nødvendigt at søge videre.",
    tone: "bg-brand-peach text-brand-peach-foreground",
  },
  {
    icon: Sparkles,
    title: "Simple spørgsmål klares på SMS",
    body: "Åbningstider, priser og bookinglink kan besvares automatisk. Det giver færre rutineopgaver i receptionen og hurtigere hjælp til patienten.",
    tone: "bg-brand-mint text-brand-mint-foreground",
  },
  {
    icon: Mail,
    title: "I får besked, når der er brug for jer",
    body: "Hvis henvendelsen kræver personlig opfølgning, får I det vigtigste samlet på mail: hvem det er, hvad det drejer sig om, og hvad patienten ønsker nu.",
    tone: "bg-brand-lavender text-brand-lavender-foreground",
  },
  {
    icon: Phone,
    title: "Behold jeres nuværende telefoni",
    body: "Ingen nyt nummer. Ingen nyt teleselskab. GetXM fungerer som et ekstra lag ovenpå det setup, I allerede bruger i klinikken.",
    tone: "bg-brand-ochre text-brand-ochre-foreground",
  },
] as const;

const SafetyNet = () => {
  return (
    <section id="safety-net" className="bg-surface-soft border-y border-border">
      <div className="container py-20 md:py-28">
        {/* Intro */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="caption-uppercase text-accent">Sikkerhedsnettet</p>
          <h2 className="display-lg mt-4 text-foreground">
            Når I ikke kan besvare opkaldet, får patienten stadig svar
          </h2>
          <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              Når I ikke kan tage telefonen, sender GetXM automatisk en SMS til patienten med det samme. Her kan
              patienten stille et spørgsmål, give en besked eller bede om at blive ringet op.
            </p>
            <p>
              Kan spørgsmålet klares med et bookinglink eller praktisk info, får patienten svar direkte på SMS. Kræver
              henvendelsen jeres hjælp, samler GetXM det vigtigste og sender det til jer på mail.
            </p>
          </div>

          <div className="mt-8 inline-block rounded-2xl border-l-2 border-accent bg-background/60 px-5 py-4 text-left">
            <p className="text-base font-medium text-foreground md:text-lg">
              Så står I ikke bare med et nummer i opkaldslisten.
            </p>
            <p className="mt-1 text-sm text-muted-foreground md:text-base">
              I får enten en patient, der er hjulpet videre — eller en besked, I kan handle på.
            </p>
          </div>
        </div>

        {/* Sub-headline with dividers */}
        <div className="mx-auto mt-16 flex max-w-3xl items-center gap-5">
          <span className="h-px flex-1 bg-border" />
          <h3 className="display-sm whitespace-nowrap text-foreground">
            Fra ubesvaret opkald til næste skridt
          </h3>
          <span className="h-px flex-1 bg-border" />
        </div>

        {/* 2x2 outcome grid */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2 md:gap-6">
          {outcomes.map(({ icon: Icon, title, body, tone }) => (
            <article
              key={title}
              className={`group rounded-3xl p-7 shadow-soft transition-transform duration-300 hover:-translate-y-1 md:p-8 ${tone}`}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-background/60 backdrop-blur-sm">
                <Icon className="h-5 w-5" />
              </div>
              <h4 className="mt-6 text-lg font-semibold md:text-xl">{title}</h4>
              <p className="mt-2 text-sm leading-relaxed opacity-80 md:text-base">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SafetyNet;