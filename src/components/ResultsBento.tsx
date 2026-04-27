import { MessageSquareText, Mail, PhoneCall, ShieldCheck } from "lucide-react";

/**
 * Bento grid inspired by customer-result layouts.
 * No fake customer stats or fake testimonials.
 * Focus: concrete product outcomes and low-friction setup.
 */
const ResultsBento = () => {
  return (
    <section className="bg-secondary/40 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            Når telefonen ikke bliver taget
          </span>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            GetXM følger op, før patienten ringer videre
          </h2>

          <p className="mt-3 text-muted-foreground">
            En enkel SMS-flow der hjælper patienten videre og sender de relevante oplysninger til jer.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3 md:auto-rows-[minmax(180px,auto)]">
          {/* Main stat / promise */}
          <article className="rounded-3xl bg-card-warm p-7 text-card-warm-foreground">
            <PhoneCall className="h-6 w-6" />
            <p className="mt-6 text-4xl font-semibold tracking-tight">Ubesvaret opkald</p>
            <p className="mt-3 text-sm opacity-80">Når I ikke når telefonen, aktiveres GetXM automatisk.</p>
            <p className="mt-8 text-xs font-medium uppercase tracking-wide opacity-70">Trigger</p>
          </article>

          <article className="rounded-3xl bg-card-sage p-7 text-card-sage-foreground">
            <MessageSquareText className="h-6 w-6" />
            <p className="mt-6 text-4xl font-semibold tracking-tight">SMS med det samme</p>
            <p className="mt-3 text-sm opacity-80">Patienten får en venlig SMS og kan svare direkte.</p>
            <p className="mt-8 text-xs font-medium uppercase tracking-wide opacity-70">Reaktion</p>
          </article>

          <article className="md:row-span-2 rounded-3xl border border-border bg-card p-7 shadow-soft">
            <ShieldCheck className="h-6 w-6 text-accent" />

            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">Lav risiko at teste</h3>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-sm font-semibold text-foreground">Samme telefonnummer</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Patienterne ringer stadig til jeres normale nummer.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">Samme telefonløsning</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  I beholder jeres nuværende teleselskab og abonnement.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">Kun ved ubesvarede opkald</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  GetXM hjælper kun, når telefonen ikke bliver taget.
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl bg-card-mist p-7 text-card-mist-foreground">
            <Mail className="h-6 w-6" />
            <p className="mt-6 text-4xl font-semibold tracking-tight">Klar besked</p>
            <p className="mt-3 text-sm opacity-80">I får navn, nummer og årsag samlet på mail.</p>
            <p className="mt-8 text-xs font-medium uppercase tracking-wide opacity-70">Opfølgning</p>
          </article>

          <article className="rounded-3xl bg-accent/10 p-7">
            <p className="text-5xl font-semibold tracking-tight text-accent">0</p>
            <p className="mt-3 text-sm text-foreground/80">nye systemer for receptionen at lære.</p>
            <p className="mt-8 text-xs font-medium uppercase tracking-wide text-foreground/60">Administration</p>
          </article>

          <article className="md:col-span-3 rounded-3xl border border-border bg-card p-7 shadow-soft md:p-9">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-3xl">
                <p className="text-lg leading-relaxed text-foreground md:text-xl">
                  GetXM erstatter ikke receptionen. Det fungerer som et sikkerhedsnet, når I ikke når telefonen — så
                  patienten får svar, og I får en tydelig besked at følge op på.
                </p>
              </div>

              <div className="shrink-0 rounded-full bg-secondary px-5 py-3 text-sm font-medium text-foreground">
                Ingen app. Ingen login. Bare SMS.
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ResultsBento;
