import { FormEvent, useState } from "react";
import { Check } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const contactSchema = z.object({
  firstName: z.string().trim().min(2, "Skriv dit fornavn"),
  lastName: z.string().trim().min(2, "Skriv dit efternavn"),
  email: z.string().trim().email("Skriv en gyldig firmamail"),
  phone: z.string().trim().min(8, "Skriv et gyldigt telefonnummer"),
  companySize: z.string().min(1, "Vælg størrelse"),
  country: z.string().min(1, "Vælg land"),
  consent: z.boolean().refine(val => val === true, "Du skal give samtykke for at fortsætte"),
});

type ContactForm = z.infer<typeof contactSchema>;

const initialForm: ContactForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  companySize: "",
  country: "Danmark",
  consent: false,
};

const included = [
  "Gratis opsætning",
  "50 ubesvarede opkald inkluderet pr. måned",
  "Behold nummer og teleselskab",
  "Dansk support",
] as const;

const contactEmail = "hej@getxm.dk";

const countryData: Record<string, { flag: string; code: string }> = {
  Danmark: { flag: "🇩🇰", code: "+45" },
  Norge: { flag: "🇳🇴", code: "+47" },
  Sverige: { flag: "🇸🇪", code: "+46" },
};

const PricingContact = () => {
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

    const { firstName, lastName, email, phone, companySize, country } = result.data;
    const subject = encodeURIComponent(`Kort gennemgang af GetXM — ${firstName} ${lastName}`);
    const body = encodeURIComponent(
      [
        `Navn: ${firstName} ${lastName}`,
        `E-mail: ${email}`,
        `Telefon: ${phone}`,
        `Størrelse: ${companySize}`,
        `Land: ${country}`
      ].join("\n"),
    );

    toast({
      title: "Tak — vi har modtaget jeres oplysninger",
      description: "Din mailklient åbner nu.",
    });
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="pricing" className="bg-white py-20 md:py-32">
      <div className="container px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px] max-w-6xl mx-auto items-stretch">

          {/* LEFT: FORM */}
          <article className="flex flex-col rounded-[2.5rem] bg-[#F9F9F9] border border-border/50 p-8 md:p-12">
            <div className="max-w-xl">
              <h3 className="display-sm text-foreground">Book en demo</h3>
              <p className="mt-4 text-base text-muted-foreground">
                Udfyld formularen, så kontakter vi jer for en 15 minutters gennemgang.
              </p>
            </div>

            <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">Fornavn *</Label>
                  <Input
                    id="firstName"
                    placeholder=""
                    className="h-12 bg-white border-none shadow-none rounded-xl"
                    value={form.firstName}
                    onChange={e => setForm({ ...form, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">Efternavn *</Label>
                  <Input
                    id="lastName"
                    className="h-12 bg-white border-none shadow-none rounded-xl"
                    value={form.lastName}
                    onChange={e => setForm({ ...form, lastName: e.target.value })}
                  />
                </div>
              </div>

              {/* Email Row */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Firmamail *</Label>
                <Input
                  id="email"
                  type="email"
                  className="h-12 bg-white border-none shadow-none rounded-xl"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>

              {/* Phone Row */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">Telefonnummer *</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center gap-2 pointer-events-none">
                    <span className="text-lg">{countryData[form.country]?.flag || "🇩🇰"}</span>
                    <span className="text-muted-foreground">{countryData[form.country]?.code || "+45"}</span>
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    className="h-12 bg-white border-none shadow-none rounded-xl pl-24"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>

              {/* Size & Country Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Virksomhedens størrelse *</Label>
                  <Select onValueChange={val => setForm({ ...form, companySize: val })}>
                    <SelectTrigger className="h-12 bg-white border-none shadow-none rounded-xl">
                      <SelectValue placeholder="Vælg..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-5">1-5 ansatte</SelectItem>
                      <SelectItem value="6-20">6-20 ansatte</SelectItem>
                      <SelectItem value="21-50">21-50 ansatte</SelectItem>
                      <SelectItem value="50+">50+ ansatte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Land *</Label>
                  <Select defaultValue="Danmark" onValueChange={val => setForm({ ...form, country: val })}>
                    <SelectTrigger className="h-12 bg-white border-none shadow-none rounded-xl">
                      <SelectValue placeholder="Vælg..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Danmark">Danmark</SelectItem>
                      <SelectItem value="Norge">Norge</SelectItem>
                      <SelectItem value="Sverige">Sverige</SelectItem>
                    </SelectContent>
                  </Select>
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
                <Label htmlFor="consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                  Jeg giver mit samtykke til at modtage mere information om GetXM's produkt i henhold til GetXM's privatlivspolitik.
                </Label>
              </div>

              <Button type="submit" className="w-full h-14 text-lg font-semibold bg-[#1A1A1A] hover:bg-black text-white rounded-full transition-all mt-4">
                Book en demo
              </Button>
            </form>
          </article>

          {/* RIGHT: PRICING CARD */}
          <article className="flex flex-col rounded-[2.5rem] bg-[#FFF5F7] border border-brand-pink/20 p-8 md:p-10 text-right">
            <div className="mt-4">
              <span className="text-brand-pink font-semibold text-sm uppercase tracking-wider">Pris</span>
              <p className="text-6xl font-bold tracking-tight text-foreground mt-4 font-sans">
                349
                <span className="text-xl font-semibold text-foreground"> kr./md.</span>
              </p>
            </div>

            <div className="mt-10 flex-1">
              <ul className="space-y-4">
                {included.map((item) => (
                  <li key={item} className="flex flex-row-reverse gap-3 text-sm font-medium text-foreground">
                    <Check className="h-5 w-5 shrink-0 text-brand-pink" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-6 border-t border-brand-pink/10 text-xs text-muted-foreground leading-relaxed">
              <p>7 kr. pr. ekstra ubesvaret opkald.<br />Priser er ekskl. moms.</p>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
};

export default PricingContact;
