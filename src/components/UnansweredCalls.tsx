import { Check, X } from "lucide-react";
import unansweredImg from "@/assets/section-unanswered-call.png";
import onlyNumberImg from "@/assets/section-only-number.png";
import meditatingPersonImg from "../assets/meditating-person.png";
import withoutGetXMImg from "../assets/with-out-getxm.svg";



const UnansweredCalls = () => {
  return (
    <section id="problems" className="w-full bg-white">
      <div className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-6xl mx-auto mb-16 md:mb-24 text-left">
          <p className="caption-uppercase text-accent">Alle opkald er vigtige</p>
          <h2 className="display-lg mt-4 text-foreground">
            Den gode behandling starter, <br /> før patienten kommer ind ad døren
          </h2>
          <p className="mt-6 text-base text-muted-foreground md:text-lg max-w-2xl">
            Det er ikke altid muligt at tage telefonen midt i en behandling eller i en travl reception. Forskellen er, hvad der sker bagefter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* UDEN GETXM */}
          <div className="flex flex-col rounded-[2.5rem] bg-[#F9F9F9] border border-border/50 overflow-hidden">
            <div className="p-10 md:p-14 flex-1">
              <h3 className="display-sm text-foreground mb-10">Uden GetXM</h3>
              <ul className="space-y-8">
                <li className="space-y-2">
                  <div className="flex items-center gap-2">
                    <X className="h-5 w-5 text-muted-foreground/60 shrink-0" />
                    <p className="font-semibold text-foreground text-lg">Opkaldet ringer ud</p>
                  </div>
                  <p className="text-muted-foreground pl-7">Patienten får ikke svar og må selv finde næste skridt.</p>
                </li>
                <li className="space-y-2">
                  <div className="flex items-center gap-2">
                    <X className="h-5 w-5 text-muted-foreground/60 shrink-0" />
                    <p className="font-semibold text-foreground text-lg">Henvendelsen bliver usynlig</p>
                  </div>
                  <p className="text-muted-foreground pl-7">I ved ikke, om det var en booking, et afbud eller et spørgsmål, der krævede svar.</p>
                </li>
                <li className="space-y-2">
                  <div className="flex items-center gap-2">
                    <X className="h-5 w-5 text-muted-foreground/60 shrink-0" />
                    <p className="font-semibold text-foreground text-lg">Arbejdet lander senere</p>
                  </div>
                  <p className="text-muted-foreground pl-7">Små spørgsmål og opfølgning lander senere som ekstra arbejde og afbrydelser.</p>
                </li>
                <li className="space-y-2">
                  <div className="flex items-center gap-2">
                    <X className="h-5 w-5 text-muted-foreground/60 shrink-0" />
                    <p className="font-semibold text-foreground text-lg">Annoncebudgettet går til spilde</p>
                  </div>
                  <p className="text-muted-foreground pl-7">I betaler for at blive fundet online, men mister kunden i det sekund, telefonen ringer forgæves.</p>
                </li>
              </ul>
            </div>
            <div className="px-10 pb-10 flex justify-center">
              <img src={withoutGetXMImg} alt="" className="max-h-[220px] w-auto object-contain" />
            </div>
          </div>

          {/* MED GETXM */}
          <div className="flex flex-col rounded-[2.5rem] bg-[#FFF5F7] border border-brand-pink/10 overflow-hidden">
            <div className="p-10 md:p-14 flex-1">
              <h3 className="display-sm text-foreground mb-10">Med GetXM</h3>
              <ul className="space-y-8">
                <li className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-brand-pink shrink-0" />
                    <p className="font-semibold text-foreground text-lg">Patienten får hjælp med det samme</p>
                  </div>
                  <p className="text-muted-foreground pl-7">I stedet for stilhed får patienten en direkte vej videre.</p>
                </li>
                <li className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-brand-pink shrink-0" />
                    <p className="font-semibold text-foreground text-lg">Mange spørgsmål klares automatisk</p>
                  </div>
                  <p className="text-muted-foreground pl-7">Priser, åbningstider, bookinglink og praktisk info kan sendes direkte til patienten.</p>
                </li>
                <li className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-brand-pink shrink-0" />
                    <p className="font-semibold text-foreground text-lg">I får besked, når der skal følges op</p>
                  </div>
                  <p className="text-muted-foreground pl-7">I får det vigtigste samlet i én besked, så I nemt kan prioritere jeres tid.</p>
                </li>
                <li className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-brand-pink shrink-0" />
                    <p className="font-semibold text-foreground text-lg">Flere kunder for de samme annoncekroner</p>
                  </div>
                  <p className="text-muted-foreground pl-7">Vi sikrer, at de opkald jeres annoncer skaber, faktisk bliver til dialog og bookinger.</p>
                </li>
              </ul>
            </div>
            <div className="px-10 pb-10 flex justify-center">
              <img src={meditatingPersonImg} alt="" className="max-h-[220px] w-auto object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnansweredCalls;
