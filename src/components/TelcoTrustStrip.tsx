const TelcoText = ({ name }: { name: string }) => (
  <span className="font-bold tracking-tight text-[12px] md:text-[13px] leading-none whitespace-nowrap">{name}</span>
);

const telcos = [
  { name: "TDC" },
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
    <div className="mt-6 w-full max-w-3xl mx-auto px-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 md:gap-8 justify-items-center">
        {telcos.map((item) => (
          <div
            key={item.name}
            className="flex items-center opacity-30 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 cursor-default"
          >
            <TelcoText name={item.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TelcoTrustStrip;