import unansweredImg from "@/assets/section-unanswered-call.png";
import onlyNumberImg from "@/assets/section-only-number.png";

const blocks = [
  {
    image: unansweredImg,
    title: "Når I ikke kan svare",
    body: "Telefonen ringer midt i en behandling, mellem to patienter eller efter lukketid. Patienten ringer, når behovet opstår — ikke når der er luft i kalenderen.",
    background: "#F5FFFE",
    border: "#B1FFFF",
  },
  {
    image: onlyNumberImg,
    title: "Så står kun et nummer tilbage",
    body: "Et ubesvaret opkald fortæller ikke, hvad patienten havde brug for. Var det en booking, en pris, et afbud, et spørgsmål eller noget, der hastede? Uden samtalen mangler konteksten.",
    background: "#FBF5FF",
    border: "#EFD8FF",
  },
] as const;

const UnansweredCalls = () => {
  return (
    <section style={{ backgroundColor: "#0B3D3C" }}>
      <div className="container py-16 md:py-32">
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {blocks.map(({ image, title, body, background, border }) => (
            <div
              key={title}
              className="flex flex-col rounded-3xl px-8 py-10 md:px-10 md:py-12"
              style={{ backgroundColor: background, border: `1px solid ${border}` }}
            >
              <div className="flex flex-1 items-center justify-center pb-12">
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-auto w-full max-w-xs object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground md:text-2xl">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnansweredCalls;
