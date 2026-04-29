import { FormEvent, useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Skriv dit navn").max(100, "Navn må højst være 100 tegn"),
  clinic: z.string().trim().min(2, "Skriv klinik eller firmanavn").max(120, "Kliniknavn må højst være 120 tegn"),
  email: z.string().trim().email("Skriv en gyldig e-mail").max(255, "E-mail må højst være 255 tegn"),
  phone: z
    .string()
    .trim()
    .min(8, "Skriv et gyldigt telefonnummer")
    .max(25, "Telefonnummer må højst være 25 tegn")
    .regex(/^[+0-9\s().-]+$/, "Brug kun tal, mellemrum og +")
    .refine((value) => value.replace(/\D/g, "").length >= 8, "Telefonnummer skal have mindst 8 tal"),
});

type ContactForm = z.infer<typeof contactSchema>;
type ContactErrors = Partial<Record<keyof ContactForm, string>>;

const initialForm: ContactForm = {
  name: "",
  clinic: "",
  email: "",
  phone: "",
};

const included = [
  "Gratis opsætning",
  "50 ubesvarede opkald inkluderet pr. måned",
  "Behold nummer og teleselskab",
  "Dansk support",
] as const;

const contactEmail = "hej@getxm.dk";

const PricingContact = () => {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [errors, setErrors] = useState<ContactErrors>({});

  const updateField = (field: keyof ContactForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = contactSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        clinic: fieldErrors.clinic?.[0],
        email: fieldErrors.email?.[0],
        phone: fieldErrors.phone?.[0],
      });
      return;
    }

    setErrors({});
    setForm(initialForm);
    const { name, clinic, email, phone } = result.data;
    const subject = encodeURIComponent(`Kort gennemgang af GetXM — ${clinic}`);
    const body = encodeURIComponent(
      [`Navn: ${name}`, `Klinik / firmanavn: ${clinic}`, `E-mail: ${email}`, `Telefon: ${phone}`].join("\n"),
    );

    toast({
      title: "Tak — vi har modtaget jeres oplysninger",
      description: "Din mailklient åbner, så forespørgslen kan sendes sikkert.",
    });
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="pricing" className="bg-background py-20 md:py-28">
      <div className="container">
        {/* 1. FJERNET lg:items-start for at lade boksene strække sig til samme højde */}
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <article
            id="kontakt"
            className="order-2 flex flex-col h-full rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8 lg:order-1"
          >
            <div className="max-w-xl">
              <h2 className="display-sm text-foreground">Book din GetXM-demo</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                Udfyld formularen, så kontakter vi jer for en 15 minutters gennemgang.
              </p>
            </div>

            <form className="mt-8 grid gap-4" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="contact-name">Navn</Label>
                  <Input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-clinic">Klinik / firmanavn</Label>
                  <Input
                    id="contact-clinic"
                    name="clinic"
                    autoComplete="organization"
                    value={form.clinic}
                    onChange={(event) => updateField("clinic", event.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="contact-email">E-mail</Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-phone">Telefon</Label>
                  <Input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" size="lg" className="w-full h-12 text-lg rounded-xl">
                  Book en demo
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </form>
          </article>

          {/* 2. PRIS-BOKS: Tilføjet h-full og dine specifikke farver */}
          <article
            className="order-1 flex flex-col h-full rounded-3xl border p-6 shadow-lift md:p-8 lg:order-2"
            style={{
              backgroundColor: "#F5FFFE",
              borderColor: "#B1FFFF",
            }}
          >
            <div className="mt-8">
              <p className="text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
                349
                <span className="mt-2 text-xl font-semibold text-foreground"> kr. /md.</span>
              </p>
            </div>

            {/* flex-1 her sørger for at indholdet fylder pladsen ud */}
            <div className="flex-1">
              <ul className="mt-8 space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 space-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
              <p> 7 kr. pr. ekstra ubesvaret opkald. Priser ekskl. moms</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default PricingContact;
