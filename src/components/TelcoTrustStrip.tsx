const telcos = [
  "TDC Erhverv",
  "YouSee",
  "Telia",
  "Telenor",
  "3",
  "Norlys",
  "ipnordic",
  "Relatel",
  "Telavox",
];

const TelcoTrustStrip = () => {
  return (
    <div className="mt-16 w-full">
      <p className="text-center text-sm font-medium text-muted-foreground">
        Virker med jeres nuværende telefonløsning
      </p>

      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-14">
        {telcos.map((name) => (
          <li
            key={name}
            className="text-base font-semibold tracking-tight text-muted-foreground/70 grayscale opacity-80 transition-opacity hover:opacity-100 md:text-lg"
          >
            {name}
          </li>
        ))}
      </ul>

      <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground/80">
        GetXM kræver normalt kun, at ubesvarede opkald kan viderestilles. I beholder nummer, teleselskab og arbejdsgang.
      </p>
    </div>
  );
};

export default TelcoTrustStrip;