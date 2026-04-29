import { PhoneOff, MessageSquare, Sparkles, Mail, ArrowDown } from "lucide-react";

const SolutionFlow = () => {
  return (
    <section id="how" className="bg-surface-soft">
      <div className="container py-20 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          {/* Left — text */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="caption-uppercase text-accent">Når opkaldet glipper</p>
            <h2 className="display-lg mt-4 text-foreground">GetXM samler op, når I må slippe telefonen</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                Når telefonen ikke bliver taget, sender GetXM automatisk en SMS til patienten. Patienten kan svare
                direkte, forklare behovet eller bede om at blive ringet op.
              </p>
              <p>
                Mange henvendelser kan afklares direkte med svar om åbningstider, priser, booking, afbud eller praktisk
                information. Når der er brug for jer, samler GetXM det vigtigste og sender det til klinikken på mail.
              </p>
            </div>
            <div className="mt-8 space-y-2 border-l-2 border-accent/60 pl-4 text-base font-medium text-foreground md:text-lg">
              <p>Enten får patienten hjælp med det samme.</p>
              <p>Eller receptionen får en besked, der er klar til opfølgning.</p>
            </div>
          </div>

          {/* Right — flow */}
          <div className="flex flex-col items-stretch gap-5">
            {/* Step 1 */}
            <FlowStep
              icon={<PhoneOff className="h-5 w-5" aria-hidden="true" />}
              step="01"
              title="Ubesvaret opkald"
              body="Telefonen bliver ikke taget, fordi I er optaget, i behandling eller har lukket."
            />

            <Connector />

            {/* Step 2 */}
            <FlowStep
              icon={<MessageSquare className="h-5 w-5" aria-hidden="true" />}
              step="02"
              label="SMS"
              title="Automatisk SMS"
              body="GetXM skriver til patienten med det samme og spørger, hvad henvendelsen drejer sig om."
            />

            <Connector split />

            {/* Step 3 — split outcomes */}
            <div className="grid gap-5 sm:grid-cols-2">
              <FlowStep
                icon={<Sparkles className="h-5 w-5" aria-hidden="true" />}
                step="3A"
                label="SMS"
                title="Patienten får svar på SMS"
                body="Ofte stillede spørgsmål kan klares med bookinglink, priser, åbningstider eller praktisk information."
                tone="mint"
              />
              <FlowStep
                icon={<Mail className="h-5 w-5" aria-hidden="true" />}
                step="3B"
                label="Mail"
                title="Klinikken får besked"
                body="Når der er brug for jer, får I en samlet mail med det vigtigste: hvem der kontaktede jer, hvad de har brug for, og hvad næste skridt er."
                tone="peach"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

type FlowStepProps = {
  icon: React.ReactNode;
  step: string;
  label?: string;
  title: string;
  body: string;
  tone?: "default" | "mint" | "peach";
};

const FlowStep = ({ icon, step, label, title, body, tone = "default" }: FlowStepProps) => {
  const toneClasses =
    tone === "mint"
      ? "border-transparent bg-brand-mint text-brand-mint-foreground"
      : tone === "peach"
        ? "border-transparent bg-brand-peach text-brand-peach-foreground"
        : "border-border/60 bg-background text-foreground";

  return (
    <article className={`flex h-full flex-col rounded-3xl border p-6 shadow-soft md:p-7 ${toneClasses}`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-background/60 text-foreground">
            {icon}
          </span>
          <span className="text-sm font-medium opacity-70">{step}</span>
        </div>
        {label ? (
          <span className="rounded-full bg-background/60 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-foreground/70">
            {label}
          </span>
        ) : null}
      </div>
      <h3 className="mt-5 text-lg font-semibold md:text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed opacity-80 md:text-base">{body}</p>
    </article>
  );
};

const Connector = ({ split = false }: { split?: boolean }) => (
  <div className="flex flex-col items-center" aria-hidden="true">
    <ArrowDown className="h-5 w-5 text-muted-foreground/60" />
    {split ? <div className="mt-1 hidden h-px w-1/2 bg-border sm:block" /> : null}
  </div>
);

export default SolutionFlow;
