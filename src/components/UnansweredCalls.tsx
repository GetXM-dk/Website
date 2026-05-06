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
            Forskellen på en tabt mulighed og en ny booking ligger i opfølgningen          </p>
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
                    <p className="font-semibold text-foreground text-lg">Patienten ringer videre</p>
                  </div>
                  <p className="text-muted-foreground pl-7">Hvis telefonen ikke bliver taget, finder patienten hurtigt en anden klinik.</p>
                </li>
                <li className="space-y-2">
                  <div className="flex items-center gap-2">
                    <X className="h-5 w-5 text-muted-foreground/60 shrink-0" />
                    <p className="font-semibold text-foreground text-lg">Usynlige henvendelser</p>
                  </div>
                  <p className="text-muted-foreground pl-7">I ved aldrig, om det ubesvarede opkald var en aflysning, et spørgsmål eller en ny stor booking.</p>
                </li>
                <li className="space-y-2">
                  <div className="flex items-center gap-2">
                    <X className="h-5 w-5 text-muted-foreground/60 shrink-0" />
                    <p className="font-semibold text-foreground text-lg">Afbrydelser senere</p>
                  </div>
                  <p className="text-muted-foreground pl-7">Småting, der kunne være klaret på SMS, hober sig op som ekstraarbejde sidst på dagen.</p>
                </li>
                <li className="space-y-2">
                  <div className="flex items-center gap-2">
                    <X className="h-5 w-5 text-muted-foreground/60 shrink-0" />
                    <p className="font-semibold text-foreground text-lg">Spildt budget</p>
                  </div>
                  <p className="text-muted-foreground pl-7">I betaler for at blive fundet online, men mister kunden i det sekund, opkaldet ikke bliver besvaret.</p>
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
                    <p className="font-semibold text-foreground text-lg">Patienten får hjælp</p>
                  </div>
                  <p className="text-muted-foreground pl-7">I stedet for bare at lade den ringe ud, får patienten en direkte vej til booking eller svar.</p>
                </li>
                <li className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-brand-pink shrink-0" />
                    <p className="font-semibold text-foreground text-lg">67% afklares automatisk</p>
                  </div>
                  <p className="text-muted-foreground pl-7">De fleste spørgsmål om priser, åbningstider eller tidsbestilling klares via SMS, uden I skal løfte røret.</p>
                </li>
                <li className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-brand-pink shrink-0" />
                    <p className="font-semibold text-foreground text-lg">Ro til de vigtige opgaver</p>
                  </div>
                  <p className="text-muted-foreground pl-7">I får en samlet besked på mail, når der faktisk er brug for jeres hjælp. Det giver arbejdsro.</p>
                </li>
                <li className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-brand-pink shrink-0" />
                    <p className="font-semibold text-foreground text-lg">Få mere ud af jeres annoncer</p>
                  </div>
                  <p className="text-muted-foreground pl-7">Vi sikrer, at de opkald jeres annoncering skaber, rent faktisk bliver til bookinger i kalenderen.</p>
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
