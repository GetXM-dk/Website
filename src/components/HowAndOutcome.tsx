import { Heart, Users, Inbox } from "lucide-react";
import PhoneRingingIllustration from "@/components/illustrations/PhoneRingingIllustration";
import SmsBubbleIllustration from "@/components/illustrations/SmsBubbleIllustration";
import MailNoteIllustration from "@/components/illustrations/MailNoteIllustration";

const steps = [
  {
    n: "01",
    title: "Patienten ringer",
    body: "I når ikke telefonen, fordi I er optaget, holder pause eller har lukket.",
    illustration: PhoneRingingIllustration,
  },
  {
    n: "02",
    title: "GetXM følger op",
    body: "Patienten får automatisk en SMS og kan svare direkte.",
    illustration: SmsBubbleIllustration,
  },
  {
    n: "03",
    title: "I får besked",
    body: "Vi noterer hvad henvendelsen handler om og sender de relevante oplysninger til jer på mail.",
    illustration: MailNoteIllustration,
  },
];

const outcomes = [
  {
    icon: Heart,
    title: "Patienten føler sig set",
    body: "Patienten bliver ikke mødt af tavshed, men får en venlig opfølgning med det samme.",
    tone: "bg-brand-peach text-brand-peach-foreground",
  },
  {
    icon: Users,
    title: "Færre tabte henvendelser",
    body: "Opkald, I ellers ikke når, bliver samlet op og gjort nemme at følge op på.",
    tone: "bg-brand-lavender text-brand-lavender-foreground",
  },
  {
    icon: Inbox,
    title: "Ro i receptionen",
    body: "I kan behandle patienter og håndtere dagen uden at jagte ubesvarede opkald.",
    tone: "bg-brand-ochre text-brand-ochre-foreground",
  },
];

const HowAndOutcome = () => {
  return (
    <section id="how" className="container py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="display-lg">
          Sådan virker det — og hvad I får ud af det
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {/* Left: cream surface card with 3 steps */}
        <div className="rounded-3xl bg-surface-card p-8 md:p-10">
          <h3 className="display-sm">
            Sådan virker det
          </h3>
          <ol className="mt-8 space-y-8">
            {steps.map(({ n, title, body, illustration: Illustration }) => (
              <li key={n} className="flex items-start gap-5">
                <Illustration className="h-16 w-16 shrink-0 md:h-20 md:w-20" />
                <div className="pt-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Trin {n}
                  </span>
                  <h4 className="mt-1 text-base font-semibold md:text-lg">{title}</h4>
                  <p className="mt-1.5 text-sm text-muted-foreground md:text-base">
                    {body}
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