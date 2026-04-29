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
<div className="flex flex-col flex-1 px-10 pb-16 md:px-16 md:pb-24">
  {/* 1. Justér min-h til en lavere værdi (f.eks. fra 5rem til 3rem eller 3.5rem) */}
  <h3 className="display-sm text-[#0B3D3C] min-h-[3rem] md:min-h-[4rem] leading-tight">
    {title}
  </h3>

  {/* 2. Skru ned for mt-4 til f.eks. mt-1 eller mt-2 */}
  <p className="mt-2 text-base leading-relaxed text-gray-700 md:text-lg opacity-90">
    {body}
  </p>
</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnansweredCalls;
