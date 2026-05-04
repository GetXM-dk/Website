const TelcoText = ({ name }: { name: string }) => (
  <span className="font-bold tracking-tight text-[14px] md:text-[16px] leading-none whitespace-nowrap">{name}</span>
);

const telcos = [
  { name: "TDC Erhverv" },
  { name: "YouSee" },
  { name: "Telenor" },
  { name: "3" },
  { name: "Norlys" },
  { name: "ipnordic" },
  { name: "Relatel" },
  { name: "Telavox" },
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

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 md:gap-3">
          {telcos.map((item) => (
            <div
              key={item.name}
              className="h-10 md:h-12 flex items-center justify-center rounded-lg bg-background/60 border border-border/40 overflow-hidden px-2 opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 cursor-default"
            >
              <TelcoText name={item.name} />
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          Står jeres udbyder ikke her? Det er som regel ikke afgørende. Vi tjekker bare, om ubesvarede opkald kan viderestilles.
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-center text-[10px] leading-relaxed text-muted-foreground/60">
          Varemærker tilhører deres respektive ejere. GetXM er ikke affilieret med de viste selskaber.
        </p>
      </div>
    </div>
  );
};

export default TelcoTrustStrip;