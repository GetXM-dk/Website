import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowDown, Zap } from "lucide-react";
import HeroSmsDemo, { type HeroSmsDemoHandle } from "@/components/HeroSmsDemo";
import TelcoTrustStrip from "@/components/TelcoTrustStrip";

const Hero = () => {
  const demoRef = useRef<HeroSmsDemoHandle>(null);

  const handleTryDemo = () => {
    const demoElement = document.getElementById("hero-demo");
    if (demoElement) {
      demoElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    // Focus with a small delay to allow scroll to start
    setTimeout(() => {
      demoRef.current?.focusInput();
    }, 600);
  };

  return (
    <section id="top" className="relative overflow-hidden bg-white">
      <div className="container relative pb-16 pt-28 md:pb-24 md:pt-32 lg:pb-28 lg:pt-36">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-xs font-large text-muted-foreground">
              <Zap className="h-5.5 w-3.5 text-brand-pink" fill="currentColor" />
              Lynhurtig og automatisk opfølgning på ubesvarede opkald
            </span>
            <h1 className="display-2xl mt-6 text-foreground max-w-3xl">Et ubesvaret opkald er ikke gratis</h1>
            <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
              Få styr på de opkald, I ikke når, uden at skifte teleselskab eller arbejdsgang. GetXM følger op med SMS, hjælper patienten videre og giver jer besked, så I ved, om der skal følges op.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="rounded-xl px-7">
                <a href="#pricing">Book en demo</a>
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="rounded-xl px-7 text-muted-foreground hover:text-foreground"
                onClick={handleTryDemo}
              >
                Prøv selv
                <ArrowDown className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Phone mockup centered below with features under it */}
          <div id="hero-demo" className="mt-24 w-full flex flex-col items-center">
            <HeroSmsDemo ref={demoRef} />

            <ul className="mt-12 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm md:text-base text-muted-foreground">
              {["Gratis opsætning", "Behold jeres teleselskab", "Kun 349,- /md"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-brand-pink" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <TelcoTrustStrip />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
