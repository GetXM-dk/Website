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
      {/* 1. Containeren er centreret med mx-auto og har luft i top/bund */}
      <div className="container mx-auto px-6 py-20 md:py-32">
        {/* 2. Grid med moderat gap for at undgå at kasserne bliver for smalle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {blocks.map(({ image, title, body, background, border }) => (
            <div
              key={title}
              className="flex flex-col rounded-[2.5rem] border overflow-hidden"
              style={{ backgroundColor: background, borderColor: border }}
            >
              {/* 3. Illustrationens område: Masser af luft over og under billedet */}
              <div className="flex items-center justify-center pt-20 pb-16 md:pt-28 md:pb-20 px-10">
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  className="h-auto w-full max-w-[240px] md:max-w-[280px] object-contain"
                />
              </div>

              {/* 4. Tekst-området: Luft i bunden og siderne */}
              <div className="px-10 pb-16 md:px-16 md:pb-24">
                <h3 className="text-2xl font-bold text-[#0B3D3C] md:text-3xl leading-tight">{title}</h3>
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
