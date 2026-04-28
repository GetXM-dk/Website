import unansweredImg from "@/assets/section-unanswered-call.png";
import onlyNumberImg from "@/assets/section-only-number.png";

const blocks = [
  {
    image: unansweredImg,
    title: "Når I ikke kan svare",
    body: "Telefonen ringer midt i en behandling, mellem to patienter eller efter lukketid. Patienten ringer, når behovet opstår — ikke når der er luft i kalenderen.",
    bg: "bg-[hsl(160_60%_94%)]",
    reverse: false,
  },
  {
    image: onlyNumberImg,
    title: "Så står kun et nummer tilbage",
    body: "Et ubesvaret opkald fortæller ikke, hvad patienten havde brug for. Var det en booking, en pris, et afbud, et spørgsmål eller noget, der hastede? Uden samtalen mangler konteksten.",
    bg: "bg-[hsl(270_55%_94%)]",
    reverse: true,
  },
] as const;

const UnansweredCalls = () => {
  return (
    <section className="bg-background">
      <div className="container space-y-6 py-16 md:py-24">
        {blocks.map(({ image, title, body, bg, reverse }) => (
          <div
            key={title}
            className={`overflow-hidden rounded-3xl ${bg} px-6 py-12 md:px-12 md:py-16`}
          >
            <div
              className={`grid items-center gap-8 md:grid-cols-2 md:gap-12 ${
                reverse ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div>
                <h3 className="display-md text-foreground">{title}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {body}
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-auto w-full max-w-md object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UnansweredCalls;