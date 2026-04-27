import { Quote } from "lucide-react";

/**
 * Editorial bento grid inspired by "Real results from real customers".
 * No logos. No fake testimonials. Short proof-style product outcomes.
 */
const ResultsBento = () => {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-sm text-center">
          <h2 className="text-4xl font-medium tracking-tight md:text-5xl">
            Hvad sker der, når I ikke tager telefonen?
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {/* Row 1 */}
          <article className="flex min-h-[230px] flex-col justify-between rounded-3xl bg-card-warm p-7 text-card-warm-foreground">
            <div>
              <p className="text-5xl font-medium tracking-tight">SMS</p>
              <p className="mt-1 text-xl opacity-75">sendes straks</p>
            </div>
            <p className="text-sm opacity-70">Når opkaldet ikke bliver taget.</p>
          </article>

          <article className="flex min-h-[230px] flex-col justify-between rounded-3xl bg-card-sage p-7 text-card-sage-foreground">
            <div>
              <p className="text-5xl font-medium tracking-tight">0</p>
              <p className="mt-1 text-xl opacity-75">nye systemer</p>
            </div>
            <p className="text-sm opacity-70">Receptionen skal ikke lære endnu et værktøj.</p>
          </article>

          <article className="flex min-h-[230px] flex-col justify-between rounded-3xl border border-border bg-card p-7 shadow-soft md:col-span-1">
            <Quote className="h-5 w-5 text-accent" />
            <p className="text-2xl leading-snug tracking-tight text-foreground">
              Patienten bliver ikke mødt af stilhed. De får svar med det samme.
            </p>
          </article>

          {/* Row 2 */}
          <article className="flex min-h-[230px] flex-col justify-between rounded-3xl border border-border bg-card p-7 shadow-soft md:col-span-2">
            <Quote className="h-5 w-5 text-accent" />
            <p className="max-w-2xl text-2xl leading-snug tracking-tight text-foreground md:text-3xl">
              GetXM erstatter ikke receptionen. Det fungerer som et sikkerhedsnet, når telefonen ikke bliver taget.
            </p>
          </article>

          <article className="flex min-h-[230px] flex-col justify-between rounded-3xl bg-card-mist p-7 text-card-mist-foreground">
            <div>
              <p className="text-5xl font-medium tracking-tight">Mail</p>
              <p className="mt-1 text-xl opacity-75">klar til jer</p>
            </div>
            <p className="text-sm opacity-70">Navn, nummer og årsag samlet ét sted.</p>
          </article>

          {/* Row 3 */}
          <article className="flex min-h-[230px] flex-col justify-between rounded-3xl bg-accent/10 p-7">
            <div>
              <p className="text-5xl font-medium tracking-tight text-accent">Kun</p>
              <p className="mt-1 text-xl text-foreground/75">ubesvarede opkald</p>
            </div>
            <p className="text-sm text-foreground/65">Jeres normale opkald fortsætter som i dag.</p>
          </article>

          <article className="flex min-h-[230px] flex-col justify-between rounded-3xl bg-card-warm p-7 text-card-warm-foreground">
            <div>
              <p className="text-5xl font-medium tracking-tight">Samme</p>
              <p className="mt-1 text-xl opacity-75">telefonnummer</p>
            </div>
            <p className="text-sm opacity-70">Patienterne ringer stadig som de plejer.</p>
          </article>

          <article className="flex min-h-[230px] flex-col justify-between rounded-3xl border border-border bg-card p-7 shadow-soft">
            <Quote className="h-5 w-5 text-accent" />
            <p className="text-2xl leading-snug tracking-tight text-foreground">
              Ingen app. Ingen login. Bare en SMS, når opkaldet ellers ville være tabt.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ResultsBento;
