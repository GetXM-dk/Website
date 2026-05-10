import { FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ContactForm } from "./types";

interface LeadFormStepProps {
  form: ContactForm;
  setForm: React.Dispatch<React.SetStateAction<ContactForm>>;
  isSubmitting: boolean;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export const LeadFormStep = ({ form, setForm, isSubmitting, handleSubmit }: LeadFormStepProps) => {
  return (
    <div className="min-h-[620px]">
      <div className="space-y-3 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
          Jeres resultat er klar
        </p>
        <h2 className="text-3xl font-display leading-tight text-[#151515] md:text-4xl">
          <span className="hidden md:inline">Indtast dine oplysninger for at se, hvad ubesvarede opkald koster jer.</span>
          <span className="md:hidden">Indtast dine oplysninger for at se resultatet.</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#151515]">Dit navn</label>
          <input
            value={form.fullName}
            onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
            placeholder="Fornavn Efternavn"
            className="h-14 w-full rounded-2xl border border-black/10 bg-[#FBF8F3] px-4 outline-none transition-colors focus:border-foreground"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#151515]">Arbejdsmail</label>
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            placeholder="navn@klinik.dk"
            className="h-14 w-full rounded-2xl border border-black/10 bg-[#FBF8F3] px-4 outline-none transition-colors focus:border-foreground"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#151515]">Telefon</label>
          <input
            type="tel"
            inputMode="numeric"
            value={form.phone}
            onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
            placeholder="12 34 56 78"
            className="h-14 w-full rounded-2xl border border-black/10 bg-[#FBF8F3] px-4 outline-none transition-colors focus:border-foreground"
          />
        </div>

        <label className="flex items-start gap-3 py-2">
          <Checkbox
            checked={form.consent}
            onCheckedChange={(checked) => setForm((current) => ({ ...current, consent: !!checked }))}
            className="mt-0.5"
          />
          <span className="text-sm leading-relaxed text-muted-foreground">
            Jeg accepterer, at GetXM må kontakte mig om mit resultat.
          </span>
        </label>

        <div className="space-y-3 pt-2">
          <Button
            size="lg"
            type="submit"
            disabled={isSubmitting}
            className="h-14 w-full rounded-2xl bg-foreground text-base font-semibold text-background hover:bg-accent hover:text-accent-foreground"
          >
            {isSubmitting ? "Sender..." : "Vis mit resultat"}
            {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Ingen spam. Kun opfølgning på jeres resultat.
          </p>
        </div>
      </form>
    </div>
  );
};
