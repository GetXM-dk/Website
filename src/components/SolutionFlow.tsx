import { PhoneOff, MessageSquare, Sparkles, Mail, ArrowDown } from "lucide-react";

const SolutionFlow = () => {
  return (
    <section id="how" className="bg-white">
      <div className="container py-20 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          {/* Venstre side — tekst */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="caption-uppercase text-accent">Sådan virker det</p>
            <h2 className="display-lg mt-4 text-foreground">GetXM samler op, når I må slippe telefonen</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                Når telefonen ikke bliver taget, sender GetXM automatisk en SMS til patienten. Patienten kan forklare behovet, få svar på praktiske spørgsmål eller bede om at blive ringet op.
              </p>
              <p>
                Når der er brug for jer, får I det vigtigste samlet på mail.
              </p>
            </div>
            <div className="mt-8 space-y-2 border-l-2 border-accent/60 pl-4 text-base font-medium text-foreground md:text-lg">
              <p>Enten får patienten hjælp med det samme.</p>
              <p>Eller I får en besked, der er klar til opfølgning.</p>
            </div>
          </div>

          {/* Højre side — flow */}
          <div className="flex flex-col items-stretch gap-5">
            {/* RÆKKE 1: Step 01 og 02 ved siden af hinanden */}
            <div className="grid gap-5 sm:grid-cols-2">
              <FlowStep
                icon={<PhoneOff className="h-5 w-5" aria-hidden="true" />}
                step="01"
                label="Opkald"
                title="Ubesvaret opkald"
                body="Telefonen bliver ikke taget, fordi I er optaget eller har lukket klinikken."
              />
              <FlowStep
                icon={<MessageSquare className="h-5 w-5" aria-hidden="true" />}
                step="02"
                label="SMS"
                title="Automatisk SMS"
                body="GetXM skriver straks til patienten og spørger, hvad henvendelsen drejer sig om."
              />
            </div>

            {/* MELLEMTEKST & FORBINDELSE */}
            <div className="py-4 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent/80 mb-2">
                Herfra får patienten hjælp på én af to måder:
              </p>
              <Connector split />
            </div>

            {/* RÆKKE 2: Step 3A og 3B ved siden af hinanden */}
            <div className="grid gap-5 sm:grid-cols-2">
              <FlowStep
                icon={<Sparkles className="h-5 w-5" aria-hidden="true" />}
                step="3A"
                label="SMS"
                title="Patienten får svar på SMS"
                body="Praktiske spørgsmål om bookinglink, priser eller info klares automatisk. Det giver patienten svar med det samme og sparer klinikken for arbejdet."
                tone="mint"
              />
              <FlowStep
                icon={<Mail className="h-5 w-5" aria-hidden="true" />}
                step="3B"
                label="Mail"
                title="Fuld overblik i indbakken"
                body="Når vi ikke kan afklare sagen over SMS, samler vi informationen om patientens behov i en mail til jer. I får direkte besked om, hvem der ringede, og hvad de har brug for, så I hurtigt kan ringe tilbage."
                tone="peach"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- HJÆLPE KOMPONENTER (Brug disse præcis som de er her) ---

type FlowStepProps = {
  icon: React.ReactNode;
  step: string;
  label?: string;
  title: string;
  body: string;
  tone?: "default" | "mint" | "peach";
};

const FlowStep = ({ icon, step, label, title, body, tone = "default" }: FlowStepProps) => {
  const customStyles =
    tone === "mint"
      ? { backgroundColor: "#F5FFFE", borderColor: "#B1FFFF" }
      : tone === "peach"
        ? { backgroundColor: "#FBF5FF", borderColor: "#EFD8FF" }
        : {};

  return (
    <article
      className="flex h-full flex-col rounded-3xl border p-6 shadow-soft md:p-7 bg-background text-foreground"
      style={customStyles}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 shadow-sm text-foreground">
            {icon}
          </span>
          <span className="text-sm font-medium opacity-70">{step}</span>
        </div>
        {label && (
          <span className="rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-foreground/70 shadow-sm">
            {label}
          </span>
        )}
      </div>
      <h3 className="mt-5 text-lg font-semibold md:text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed opacity-80 md:text-base">{body}</p>
    </article>
  );
};

const Connector = ({ split = false }: { split?: boolean }) => (
  <div className="flex flex-col items-center py-2" aria-hidden="true">
    <ArrowDown className="h-5 w-5 text-muted-foreground/40" />
    {split && <div className="mt-2 hidden h-px w-full max-w-[200px] bg-border/60 sm:block" />}
  </div>
);

export default SolutionFlow;
