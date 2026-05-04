import { FormEvent, useState } from "react";
import { z } from "zod";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

const contactSchema = z.object({
  firstName: z.string().trim().min(2, "Skriv dit fornavn"),
  lastName: z.string().trim().min(2, "Skriv dit efternavn"),
  email: z.string().trim().email("Skriv en gyldig firmamail"),
  phone: z.string().trim().min(8, "Skriv et gyldigt telefonnummer"),
  consent: z.boolean().refine(val => val === true, "Du skal give samtykke for at fortsætte"),
});

type ContactForm = z.infer<typeof contactSchema>;

const initialForm: ContactForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  consent: false,
};

const DemoBooking = () => {
  const [form, setForm] = useState<ContactForm>(initialForm);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = contactSchema.safeParse(form);

    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Fejl i formularen",
        description: "Tjek venligst at alle felter er udfyldt korrekt.",
      });
      return;
    }

    const { firstName, lastName, email, phone } = result.data;
    const subject = encodeURIComponent(`Kort gennemgang af GetXM — ${firstName} ${lastName}`);
    const body = encodeURIComponent(
      [
        `Navn: ${firstName} ${lastName}`,
        `E-mail: ${email}`,
        `Telefon: ${phone}`
      ].join("\n"),
    );

    toast({
      title: "Tak — vi har modtaget jeres oplysninger",
      description: "Din mailklient åbner nu.",
    });
    window.location.href = `mailto:hej@getxm.dk?subject=${subject}&body=${body}`;
  };

  const inputClasses = "w-full h-12 bg-transparent border-b border-[#1A1A1A]/20 focus:border-brand-pink transition-colors outline-none px-0 text-base placeholder:text-muted-foreground/30";
  const labelClasses = "text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider block mb-1";

  return (
    <section id="demo" className="bg-[#F5F3EF] py-24 md:py-40">
      <div className="container px-6">
        <div className="max-w-[580px] mx-auto">

          {/* Header Area */}
          <div className="text-center mb-10 md:mb-12">
            <p className="caption-uppercase text-brand-pink font-bold tracking-[0.2em] mb-4">DEMO</p>
            <h2 className="text-3xl md:text-4xl font-display text-[#1A1A1A] leading-tight mb-6">
              Se GetXM i praksis <br className="hidden md:block" /> — på 15 minutter
            </h2>

            {/* Social Proofs */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4">
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground/70">
                <Check className="h-4 w-4 text-brand-pink" />
                <span>Gratis og uforpligtende</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground/70">
                <Check className="h-4 w-4 text-brand-pink" />
                <span>Live inden 48 timer</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground/70">
                <Check className="h-4 w-4 text-brand-pink" />
                <span>Ingen teknikerbesøg</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-10" onSubmit={handleSubmit}>

            {/* Name Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
              <div className="flex flex-col">
                <label htmlFor="firstName" className={labelClasses}>Fornavn</label>
                <input
                  id="firstName"
                  className={inputClasses}
                  value={form.firstName}
                  onChange={e => setForm({ ...form, firstName: e.target.value })}
                  autoComplete="given-name"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName" className={labelClasses}>Efternavn</label>
                <input
                  id="lastName"
                  className={inputClasses}
                  value={form.lastName}
                  onChange={e => setForm({ ...form, lastName: e.target.value })}
                  autoComplete="family-name"
                />
              </div>
            </div>

            {/* Contact Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
              <div className="flex flex-col">
                <label htmlFor="email" className={labelClasses}>Firmamail</label>
                <input
                  id="email"
                  type="email"
                  className={inputClasses}
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  autoComplete="email"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone" className={labelClasses}>Telefonnummer</label>
                <div className="flex items-center gap-3 border-b border-[#1A1A1A]/20 focus-within:border-brand-pink transition-colors">
                  <span className="text-[#1A1A1A]/40 pb-1 text-sm font-medium">+45</span>
                  <input
                    id="phone"
                    type="tel"
                    className="flex-1 h-12 bg-transparent outline-none text-base"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    autoComplete="tel"
                  />
                </div>
              </div>
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3 pt-2">
              <Checkbox
                id="consent"
                className="mt-1 border-2"
                checked={form.consent}
                onCheckedChange={(checked) => setForm({ ...form, consent: !!checked })}
              />
              <label htmlFor="consent" className="text-[11px] text-muted-foreground/60 leading-tight cursor-pointer">
                Jeg giver mit samtykke til at modtage mere information om GetXM's produkt i henhold til GetXM's privatlivspolitik.
              </label>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full h-14 text-lg font-semibold bg-[#111] hover:bg-black text-white rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                Book en demo
              </Button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default DemoBooking;
