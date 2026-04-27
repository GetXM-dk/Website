import { Quote } from "lucide-react";

const ResultsBento = () => {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-sm text-center">
          <h2 className="text-4xl font-medium tracking-tight md:text-3xl">
            Hvad sker der, når I ikke tager telefonen?
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-4">
          {/* Row 1: short + short + long */}
          <article className="flex min-h-[250px] flex-col justify-between rounded-[28px] bg-[#FFF2A6] p-8 text-[#151515]">
            <div>
              <p className="text-3xl font-medium tracking-tight">98%</p>
              <p className="mt-1 text-xl text-black/60"> af SMS’er læses</p>
            </div>
            <p className="text-sm text-black/55">Når opkaldet ikke bliver taget.</p>
          </article>

          <article className="flex min-h-[250px] flex-col justify-between rounded-[28px] bg-[#B9F2B6] p-8 text-[#151515]">
            <div>
              <p className="text-3xl font-medium tracking-tight">20%/</p>
              <p className="mt-1 text-xl text-black/60">Kun 1/5 lægger en besked, når de ringer til en virksomhed</p>
            </div>
            <p className="text-sm text-black/55">Receptionen skal ikke lære nyt.</p>
          </article>

          <article className="flex min-h-[250px] flex-col justify-between rounded-[28px] border border-black/10 bg-white p-8 shadow-sm md:col-span-2">
            <Quote className="h-5 w-5 text-[#FF6B3A]" />
            <p className="max-w-xl text-2xl leading-tight tracking-tight text-[#151515] md:text-3xl">
              Patienten bliver ikke mødt af stilhed. De får svar med det samme.
            </p>
          </article>

          {/* Row 2: long + short + short */}
          <article className="flex min-h-[250px] flex-col justify-between rounded-[28px] border border-black/10 bg-white p-8 shadow-sm md:col-span-2">
            <Quote className="h-5 w-5 text-[#FF6B3A]" />
            <p className="max-w-xl text-2xl leading-tight tracking-tight text-[#151515] md:text-3xl">
              GetXM er ikke telefonpasning. Det er et sikkerhedsnet, når telefonen ikke bliver taget.
            </p>
          </article>

          <article className="flex min-h-[250px] flex-col justify-between rounded-[28px] bg-[#FFF2A6] p-8 text-[#151515]">
            <div>
              <p className="text-3xl font-medium tracking-tight">Mail</p>
              <p className="mt-1 text-xl text-black/60">klar til jer</p>
            </div>
            <p className="text-sm text-black/55">Navn, nummer og årsag samlet.</p>
          </article>

          <article className="flex min-h-[250px] flex-col justify-between rounded-[28px] bg-[#F8CBE5] p-8 text-[#151515]">
            <div>
              <p className="text-3xl font-medium tracking-tight">Kun</p>
              <p className="mt-1 text-xl text-black/60">ubesvarede opkald</p>
            </div>
            <p className="text-sm text-black/55">Alt andet fortsætter som i dag.</p>
          </article>

          {/* Row 3: short + short + long */}
          <article className="flex min-h-[250px] flex-col justify-between rounded-[28px] bg-[#DED8FF] p-8 text-[#151515]">
            <div>
              <p className="text-3xl font-medium tracking-tight">Samme</p>
              <p className="mt-1 text-xl text-black/60">telefonnummer</p>
            </div>
            <p className="text-sm text-black/55">Patienterne ringer som de plejer.</p>
          </article>

          <article className="flex min-h-[250px] flex-col justify-between rounded-[28px] bg-[#F8CBE5] p-8 text-[#151515]">
            <div>
              <p className="text-3xl font-medium tracking-tight">Ingen</p>
              <p className="mt-1 text-xl text-black/60">app eller login</p>
            </div>
            <p className="text-sm text-black/55">Bare SMS.</p>
          </article>

          <article className="flex min-h-[250px] flex-col justify-between rounded-[28px] border border-black/10 bg-white p-8 shadow-sm md:col-span-2">
            <Quote className="h-5 w-5 text-[#FF6B3A]" />
            <p className="max-w-xl text-2xl leading-tight tracking-tight text-[#151515] md:text-3xl">
              I beholder jeres nummer og telefonløsning. GetXM hjælper kun, når opkaldet ellers ville være tabt.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ResultsBento;
