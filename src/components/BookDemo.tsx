import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Form = {
  name: string;
  email: string;
  phone: string;
  company: string;
};

const initial: Form = { name: "", email: "", phone: "", company: "" };

const BookDemo = () => {
  const [form, setForm] = useState<Form>(initial);
  const [submitting, setSubmitting] = useState(false);

  const update = (key: keyof Form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const company = form.company.trim();

    if (!name || !email || !phone || !company) {
      toast.error("Udfyld venligst alle felter");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Indtast en gyldig email");
      return;
    }
    if (!/^\+?[0-9 ]{8,20}$/.test(phone)) {
      toast.error("Indtast et gyldigt telefonnummer");
      return;
    }

    setSubmitting(true);
    const subject = encodeURIComponent("Book demo — GetXM");
    const body = encodeURIComponent(
      `Navn: ${name}\nFirma: ${company}\nEmail: ${email}\nTelefon: ${phone}\n`,
    );
    window.location.href = `mailto:hej@getxm.dk?subject=${subject}&body=${body}`;

    setTimeout(() => {
      toast.success("Tak! Vi vender tilbage hurtigst muligt.");
      setForm(initial);
      setSubmitting(false);
    }, 400);
  };

  return (
    <section id="book" className="container py-20 md:py-28">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-accent">
            Book demo
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Se GetXM i jeres klinik
          </h2>
          <p className="mt-3 text-muted-foreground">
            15 minutter. Vi viser hvordan opfølgningen passer ind i jeres dag.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-10 rounded-3xl bg-card p-6 shadow-lift md:p-10"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bd-name">Navn</Label>
              <Input
                id="bd-name"
                value={form.name}
                onChange={update("name")}
                placeholder="Dit fulde navn"
                autoComplete="name"
                maxLength={100}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bd-company">Firmanavn</Label>
              <Input
                id="bd-company"
                value={form.company}
                onChange={update("company")}
                placeholder="Klinikkens navn"
                autoComplete="organization"
                maxLength={100}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bd-email">Email</Label>
              <Input
                id="bd-email"
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="dig@klinik.dk"
                autoComplete="email"
                maxLength={255}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bd-phone">Telefon</Label>
              <Input
                id="bd-phone"
                type="tel"
                value={form.phone}
                onChange={update("phone")}
                placeholder="+45 12 34 56 78"
                autoComplete="tel"
                maxLength={20}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="mt-6 w-full rounded-full"
          >
            {submitting ? "Sender…" : "Book demo"}
          </Button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Vi vender tilbage inden for én arbejdsdag.
          </p>
        </form>
      </div>
    </section>
  );
};

export default BookDemo;