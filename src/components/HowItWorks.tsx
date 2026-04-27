const steps = [
  {
    n: "01",
    title: "Patienten ringer — I kan ikke tage den",
    body: "Lukketid, frokost, midt i en behandling. Opkaldet bliver registreret som ubesvaret.",
  },
  {
    n: "02",
    title: "GetXM følger op",
    body: "Automatisk via SMS, sekunder efter det ubesvarede opkald. Med klinikkens navn og tone.",
  },
  {
    n: "03",
    title: "I får en klar besked, hvis der skal handles",
    body: "Ingen lang log at gennemgå. Kun de samtaler, hvor klinikken skal involveres.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how" className="container py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Sådan virker det</h2>
        <p className="mt-3 text-muted-foreground">
          Tre trin. I beholder jeres nummer og jeres arbejdsgang.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <div
            key={s.n}
            className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-lift"
          >
            <div className="text-xs font-medium text-accent">{s.n}</div>
            <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;