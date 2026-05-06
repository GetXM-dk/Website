import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="container px-6 pt-20 pb-12 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
          {/* Left: brand + address (Pleo style) */}
          <div className="flex flex-col gap-10">
            <Link to="/" className="text-3xl font-bold font-display tracking-tight text-foreground">
              GetXM
            </Link>

            <div className="space-y-6 text-[13px] leading-relaxed text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground mb-1">Adler Jung</p>
                <p>CVR 34451648</p>
              </div>
              <div>
                <p>Emdrupvej 28A</p>
                <p>2100 København Ø</p>
                <p>Danmark</p>
              </div>
              <a
                href="mailto:hej@getxm.dk"
                className="inline-block text-foreground hover:text-accent transition-colors underline underline-offset-4"
              >
                hej@getxm.dk
              </a>
              <div>
                <a
                  href="/#demo"
                  className="group mt-6 inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground text-background px-6 py-3.5 text-sm font-semibold transition-all hover:bg-accent hover:text-accent-foreground"
                >
                  Book en demo
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: SEO copy + demo CTA */}
          <div className="flex flex-col gap-10">
            <div className="max-w-2xl space-y-5 text-[13px] leading-relaxed text-muted-foreground">
              <p>
                GetXM er en dansk softwareløsning udviklet af Adler Jung. Vi hjælper klinikker og virksomheder
                med at automatisere opfølgningen på ubesvarede opkald via intelligent SMS-teknologi. Vores mål
                er at sikre, at ingen henvendelse går tabt, og at patienter får svar med det samme, uanset hvor
                travlt der er i receptionen.
              </p>
              <p>
                Systemet er bygget til at fungere som et sikkert sikkerhedsnet ovenpå eksisterende telefoni,
                uden krav om tekniske installationer eller skifte af teleselskab. Alle data håndteres fortroligt
                og sikkert.
              </p>
              <p>
                GetXM er udviklet til tandlæger, læger, fysioterapeuter, klinikker og mindre virksomheder, der
                ønsker færre tabte henvendelser, bedre patientservice og en mere effektiv hverdag i receptionen
                — uden at ændre eksisterende arbejdsgange eller telefonsystem.
              </p>
            </div>

          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-16 pt-8 border-t border-border/60 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[12px] text-muted-foreground">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© {year} Adler Jung. Alle rettigheder forbeholdes.</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-medium text-foreground/70">
            <Link to="/handelsbetingelser" className="hover:text-foreground transition-colors">Handelsbetingelser</Link>
            <Link to="/privatlivspolitik" className="hover:text-foreground transition-colors">Privatlivspolitik</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;