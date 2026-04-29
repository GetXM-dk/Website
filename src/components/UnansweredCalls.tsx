import React from "react";
import unansweredImg from "@/assets/section-unanswered-call.png";
import onlyNumberImg from "@/assets/section-only-number.png";

const blocks = [
  {
    image: unansweredImg,
    title: "Når I ikke kan svare",
    body: "Telefonen ringer midt i en behandling, mellem to patienter eller efter lukketid. Patienten ringer, når behovet opstår, ikke når der er luft i kalenderen.",
    background: "#F5FFFE",
    border: "#B1FFFF",
  },
  {
    image: onlyNumberImg,
    title: "Så står kun et nummer tilbage",
    body: "Et ubesvaret opkald fortæller ikke, hvad patienten havde brug for. Var det en booking, et afbud, et spørgsmål? Uden samtalen mangler konteksten.",
    background: "#FBF5FF",
    border: "#EFD8FF",
  },
] as const;

const UnansweredCalls = () => {
  return (
    <section style={{ backgroundColor: "#0B3D3C" }} className="w-full">
      <div className="container mx-auto px-6 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {blocks.map(({ image, title, body, background, border }) => (
            <div
              key={title}
              className="flex flex-col h-full rounded-[2.5rem] border overflow-hidden"
              style={{ backgroundColor: background, borderColor: border }}
            >
              {/* 1. Fast højde på billed-containeren sikrer at titlen flugter */}
              <div className="flex items-center justify-center h-[300px] md:h-[400px] px-10">
                <img src={image} alt="" loading="lazy" className="max-h-[70%] w-auto object-contain" />
              </div>

              {/* 2. Tekst-området */}
              <div className="flex flex-col flex-1 px-10 pb-16 md:px-16 md:pb-24">
                {/* 3. min-h på h3 sikrer at brødteksten flugter, selvom titlen er på 1 eller 2 linjer */}
                <h3 className="display-sm text-[#0B3D3C] min-h-[4rem] md:min-h-[5rem]">
                  {title}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-gray-700 md:text-lg opacity-90">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnansweredCalls;
