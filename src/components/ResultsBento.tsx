import { Quote } from "lucide-react";

const ResultsBento = () => {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="display-lg">
            Hvad sker der, når I ikke tager telefonen?
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-4">
          {/* Row 1: short + short + long */}
          <article className="flex min-h-[250px] flex-col justify-between rounded-3xl bg-brand-ochre p-8 text-brand-ochre-foreground">
            <div>
              <p className="display-md">98%</p>
              <p className="mt-1 text-xl opacity-70">af SMS’er læses</p>
            </div>
            <p className="text-sm opacity-70">90% inden for 3 min.</p>
          </article>

          <article className="flex min-h-[250px] flex-col justify-between rounded-3xl bg-brand-mint p-8 text-brand-mint-foreground">
            <div>
              <p className="display-md">20%</p>
              <p className="mt-1 text-xl opacity-70">Kun 1/5 lægger en besked.</p>
            </div>
            <p className="text-sm opacity-70">Telefonsvareren bliver sjældent brugt.</p>
          </article>

          <article className="flex min-h-[250px] flex-col justify-between rounded-3xl bg-surface-card p-8 md:col-span-2">
            <Quote className="h-5 w-5 text-brand-coral" />
            <p className="display-sm max-w-xl">
              Patienten bliver ikke mødt af stilhed. De får svar med det samme.
            </p>
          </article>

          {/* Row 2: long + short + short */}
          <article className="flex min-h-[250px] flex-col justify-between rounded-3xl bg-brand-teal p-8 text-brand-teal-foreground md:col-span-2">
            <Quote className="h-5 w-5 text-brand-peach" />
            <p className="display-sm max-w-xl">
              GetXM er ikke telefonpasning. Det er et sikkerhedsnet, når telefonen ikke bliver taget.
            </p>
          </article>

          <article className="flex min-h-[250px] flex-col justify-between rounded-3xl bg-brand-peach p-8 text-brand-peach-foreground">
            <div>
              <p className="display-md">Mail</p>
              <p className="mt-1 text-xl opacity-70">klar til jer</p>
            </div>
            <p className="text-sm opacity-70">Navn, nummer og årsag samlet.</p>
          </article>

          <article className="flex min-h-[250px] flex-col justify-between rounded-3xl bg-brand-pink p-8 text-brand-pink-foreground">
            <div>
              <p className="display-md">Kun</p>
              <p className="mt-1 text-xl opacity-80">ubesvarede opkald</p>
            </div>
            <p className="text-sm opacity-80">Alt andet fortsætter som i dag.</p>
          </article>

          {/* Row 3: short + short + long */}
          <article className="flex min-h-[250px] flex-col justify-between rounded-3xl bg-brand-lavender p-8 text-brand-lavender-foreground">
            <div>
              <p className="display-md">Samme</p>
              <p className="mt-1 text-xl opacity-70">telefonnummer</p>
            </div>
            <p className="text-sm opacity-70">Patienterne ringer som de plejer.</p>
          </article>

          <article className="flex min-h-[250px] flex-col justify-between rounded-3xl bg-surface-card p-8">
            <div>
              <p className="display-md">Ingen</p>
              <p className="mt-1 text-xl text-muted-foreground">app eller login</p>
            </div>
            <p className="text-sm text-muted-foreground">Bare SMS.</p>
          </article>

          <article className="flex min-h-[250px] flex-col justify-between rounded-3xl bg-brand-coral p-8 text-brand-coral-foreground md:col-span-2">
            <Quote className="h-5 w-5 opacity-80" />
            <p className="display-sm max-w-xl">
              I beholder jeres nummer og telefonløsning. GetXM hjælper kun, når opkaldet ellers ville være tabt.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ResultsBento;
