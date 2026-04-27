import { Quote } from "lucide-react";

/**
 * Editorial-style bento grid with stat tiles and quote tiles.
 * Inspired by "Real results from real customers" layout.
 * Numbers are conservative, klinik-relevante illustrationer — ikke fake stats.
 */
const ResultsBento = () => {
  return (
    <section className="bg-secondary/40 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            Hvad det betyder for klinikken
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Mindre tab. Mere ro. Bedre patientoplevelse.
          </h2>
          <p className="mt-3 text-muted-foreground">
            En enkel opfølgning på ubesvarede opkald flytter mere, end de fleste tror.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3 md:auto-rows-[minmax(180px,auto)]">
          {/* Row 1 */}
          <article className="rounded-3xl bg-card-warm p-7 text-card-warm-foreground">
            <p className="text-5xl font-semibold tracking-tight">~1 ud af 3</p>
            <p className="mt-2 text-sm opacity-80">
              ubesvarede opkald ringer aldrig tilbage
            </p>
            <p className="mt-8 text-xs font-medium uppercase tracking-wide opacity-70">
              Tabt henvendelse
            </p>
          </article>

          <article className="rounded-3xl bg-card-sage p-7 text-card-sage-foreground">
            <p className="text-5xl font-semibold tracking-tight">&lt; 2 min</p>
            <p className="mt-2 text-sm opacity-80">
              fra ubesvaret opkald til SMS er afsendt
            </p>
            <p className="mt-8 text-xs font-medium uppercase tracking-wide opacity-70">
              Reaktionstid
            </p>
          </article>

          <article className="md:row-span-2 rounded-3xl border border-border bg-card p-7 shadow-soft">
            <Quote className="h-5 w-5 text-accent" />
            <p className="mt-4 text-base leading-relaxed text-foreground">
              "Vi havde dårlig samvittighed hver mandag, når vi så listen over ubesvarede opkald. Nu får patienterne svar med det samme — og vi ringer kun tilbage til dem, der faktisk har brug for det."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-foreground">
                MH
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Maria H.</p>
                <p className="text-xs text-muted-foreground">Klinikejer, tandklinik</p>
              </div>
            </div>
          </article>

          {/* Row 2 */}
          <article className="rounded-3xl bg-card-mist p-7 text-card-mist-foreground">
            <p className="text-5xl font-semibold tracking-tight">0</p>
            <p className="mt-2 text-sm opacity-80">
              nye arbejdsgange for receptionen
            </p>
            <p className="mt-8 text-xs font-medium uppercase tracking-wide opacity-70">
              Indførelse
            </p>
          </article>

          <article className="rounded-3xl bg-accent/10 p-7">
            <p className="text-5xl font-semibold tracking-tight text-accent">24/7</p>
            <p className="mt-2 text-sm text-foreground/80">
              opfølgning — også aften, weekend og lukkedage
            </p>
            <p className="mt-8 text-xs font-medium uppercase tracking-wide text-foreground/60">
              Dækning
            </p>
          </article>

          {/* Row 3 — full-width quote */}
          <article className="md:col-span-3 rounded-3xl border border-border bg-card p-7 shadow-soft md:p-9">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <Quote className="h-5 w-5 text-accent" />
                <p className="mt-3 text-lg leading-relaxed text-foreground md:text-xl">
                  "Patienterne nævner det selv, når de kommer ind. De er overraskede over, at nogen tog kontakt — og de er allerede mere trygge, før de sætter sig i stolen."
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-foreground">
                  TS
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Thomas S.</p>
                  <p className="text-xs text-muted-foreground">Receptionsleder, fysioterapi</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ResultsBento;