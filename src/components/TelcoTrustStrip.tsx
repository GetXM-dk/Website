const telcos = [
  {
    name: "TDC Erhverv",
    logo: "https://via.ritzau.dk/data/images/00264/43213d6c-4c35-4744-8a42-bfa671392467.jpg",
    scale: 1,
  },
  {
    name: "YouSee",
    logo: "https://via.ritzau.dk/data/images/00070/5a5488fc-8dee-4155-931d-dc542b29d29b.png",
    scale: 1,
  },
  {
    name: "Telenor",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Telenor_Logo.svg",
    scale: 1,
  },
  {
    name: "3",
    logo: "https://via.ritzau.dk/data/images/00652/836984f3-3de5-422a-9a9f-22f9b3bb1c4c.png",
    scale: 0.7,
  },
  {
    name: "Norlys",
    logo: "https://telefonisoftware.norlys.dk/images/Norlys_logo.png",
    scale: 1,
  },
  {
    name: "ipnordic",
    logo: "https://ipnordic.dk/wp-content/uploads/ipnordic_CMYK_black.png",
    scale: 1,
  },
  {
    name: "Relatel",
    logo: "https://status.relatel.dk/assets/relatel_logo_high-e864e964.png",
    scale: 0.6,
  },
  {
    name: "Telavox",
    logo: "https://www.telavox.com/wp-content/uploads/2023/06/Telavox_Platform_Logo_Horizontal_Black.svg",
    scale: 1,
  },
];

const TelcoTrustStrip = () => {
  return (
    <div className="mt-16 w-full px-4">
      <div className="mx-auto max-w-4xl rounded-3xl border border-border/70 bg-secondary/40 px-6 py-10 md:px-10 md:py-12">
        <div className="text-center">
          <h3 className="text-base md:text-lg font-semibold text-foreground">
            Behold jeres nuværende telefonløsning
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-xs md:text-sm leading-relaxed text-muted-foreground">
            GetXM kobles normalt på via viderestilling af ubesvarede opkald — uden nyt nummer, ny udbyder eller ny arbejdsgang.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-3">
          {telcos.map((item) => (
            <div
              key={item.name}
              className="h-10 md:h-12 flex items-center justify-center rounded-lg bg-background/60 border border-border/40"
            >
              <img
                src={item.logo}
                alt={`${item.name} logo`}
                style={{ maxHeight: `${item.scale * 100}%` }}
                className="max-w-[75%] w-auto object-contain opacity-50 grayscale contrast-125 transition-all duration-300 hover:opacity-90"
              />
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          Står jeres udbyder ikke her? Det er som regel ikke afgørende. Vi tjekker bare, om ubesvarede opkald kan viderestilles.
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-center text-[10px] leading-relaxed text-muted-foreground/60">
          Logoer tilhører deres respektive ejere. GetXM er ikke affilieret med de viste selskaber.
        </p>
      </div>
    </div>
  );
};

export default TelcoTrustStrip;