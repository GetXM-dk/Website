import { Link } from 'react-router-dom';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container px-6 pt-20 pb-10 md:pt-28 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 md:pb-20 border-b border-background/10">
          <div className="lg:col-span-7">
            <Link to="/" className="inline-block text-3xl font-bold font-display tracking-tight">
              GetXM
            </Link>
            <p className="mt-6 max-w-xl font-display text-3xl md:text-4xl leading-[1.1] tracking-tight">
              Ingen patientopkald skal gå tabt.
            </p>
            <p className="mt-5 max-w-lg text-[14px] leading-relaxed text-background/65">
              Intelligent SMS-opfølgning på ubesvarede opkald — som et sikkerhedsnet
              ovenpå jeres eksisterende telefoni. Ingen installation, intet skift af udbyder.
            </p>

            <a
              href="/#demo"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-background text-foreground px-5 py-3 text-sm font-semibold transition-all hover:bg-accent hover:text-accent-foreground"
            >
              Book en demo
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-8">
            <div>
              <h4 className="caption-uppercase text-background/50 mb-5">Sider</h4>
              <ul className="space-y-3 text-[14px]">
                <li><a href="/#demo" className="hover:text-accent transition-colors">Book demo</a></li>
                <li><Link to="/handelsbetingelser" className="hover:text-accent transition-colors">Handelsbetingelser</Link></li>
                <li><Link to="/privatlivspolitik" className="hover:text-accent transition-colors">Privatlivspolitik</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="caption-uppercase text-background/50 mb-5">Kontakt</h4>
              <ul className="space-y-3 text-[14px] text-background/80">
                <li>
                  <a
                    href="mailto:hej@getxm.dk"
                    className="inline-flex items-center gap-2 hover:text-accent transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    hej@getxm.dk
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>
                    Emdrupvej 28A<br />
                    2100 København Ø<br />
                    Danmark
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[12px] text-background/55">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© {year} Adler Jung</span>
            <span className="hidden md:inline text-background/25">·</span>
            <span>CVR 34451648</span>
            <span className="hidden md:inline text-background/25">·</span>
            <span>Lavet i Danmark</span>
          </div>
          <div className="text-background/45">
            GetXM er et produkt af Adler Jung.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;