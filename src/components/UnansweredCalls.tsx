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
            /* 1. HER MANGLEDE DIN WRAPPER-DIV */
            <div
              key={title}
              className="flex flex-col h-full rounded-[2.5rem] border overflow-hidden"
              style={{ backgroundColor: background, borderColor: border }}
            >
              {/* 2. BILLED-OMRÅDET (Husk at beholde denne for at titlerne flugter) */}
              <div className="flex items-center justify-center h-[300px] md:h-[400px] px-10">
                <img src={image} alt="" loading="lazy" className="max-h-[70%] w-auto object-contain" />
              </div>

              {/* 3. TEKST-OMRÅDET */}
              <div className="flex flex-col flex-1 px-10 pb-16 md:px-16 md:pb-24">
                <h3 className="display-sm text-[#0B3D3C] min-h-[3rem] md:min-h-[4rem] leading-tight">{title}</h3>

                <p className="mt-2 text-base leading-relaxed text-gray-700 md:text-lg opacity-90">{body}</p>
              </div>
            </div> /* Lukker kortet */
          ))}
        </div>
      </div>
    </section> /* Lukker sektionen */
  );
};

export default UnansweredCalls;
