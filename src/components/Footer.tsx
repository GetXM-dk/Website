import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-white py-16 md:py-24">
      <div className="container px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] items-start">
          
          {/* Left Column: Branding, Socials & Company Info */}
          <div className="flex flex-col gap-10">
            {/* Logo */}
            <div>
              <Link to="/" className="text-2xl font-bold font-display tracking-tight text-foreground">GetXM</Link>
            </div>
            
            {/* Social Icons removed as requested */}

            {/* Company Address & Info */}
            <div className="space-y-6 text-[13px] leading-relaxed text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground mb-1">Adler Jung</p>
                <p>(34451648)</p>
              </div>
              
              <div>
                <p>Emdrupvej 28A</p>
                <p>2100 København Ø</p>
                <p>Danmark</p>
              </div>

              <div>
                <a href="mailto:hej@getxm.dk" className="hover:text-foreground transition-colors underline underline-offset-4">
                  hej@getxm.dk
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Descriptions & Navigation (Pleo-inspired layout) */}
          <div className="flex flex-col gap-12 lg:items-end">
            {/* Description Text */}
            <div className="max-w-2xl lg:text-left text-[13px] leading-relaxed text-muted-foreground space-y-5">
              <p>
                GetXM er en dansk softwareløsning udviklet af Adler Jung. Vi hjælper klinikker og virksomheder med at automatisere opfølgningen på ubesvarede opkald via intelligent SMS-teknologi. Vores mål er at sikre, at ingen henvendelse går tabt, og at patienter får svar med det samme, uanset hvor travlt der er i receptionen.
              </p>
              <p>
                Systemet er bygget til at fungere som et sikkert sikkerhedsnet ovenpå eksisterende telefoni, uden krav om tekniske installationer eller skifte af teleselskab. Alle data håndteres fortroligt og sikkert.
              </p>
            </div>
            
            {/* Navigation Links & Copyright */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-[13px] font-semibold text-foreground/70">
              <span className="font-normal text-muted-foreground">© {new Date().getFullYear()} Adler Jung.</span>
              <Link to="/handelsbetingelser" className="hover:text-foreground transition-colors">Handelsbetingelser</Link>
              <Link to="/privatlivspolitik" className="hover:text-foreground transition-colors">Privatlivspolitik</Link>
              <a href="/#demo" className="text-foreground hover:text-accent transition-colors underline underline-offset-4">Book en demo</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;