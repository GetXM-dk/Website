const telcos = [
  { 
    name: "TDC Erhverv", 
    logo: "https://via.ritzau.dk/data/images/00264/43213d6c-4c35-4744-8a42-bfa671392467.jpg" 
  },
  { 
    name: "YouSee", 
    logo: "https://via.ritzau.dk/data/images/00070/5a5488fc-8dee-4155-931d-dc542b29d29b.png" 
  },
  { 
    name: "Telenor", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Telenor_Logo.svg" 
  },
  { 
    name: "3", 
    logo: "https://via.ritzau.dk/data/images/00652/836984f3-3de5-422a-9a9f-22f9b3bb1c4c.png" 
  },
  { 
    name: "Norlys", 
    logo: "https://telefonisoftware.norlys.dk/images/Norlys_logo.png" 
  },
  { 
    name: "ipnordic", 
    logo: "https://ipnordic.dk/wp-content/uploads/ipnordic_CMYK_black.png" 
  },
  { 
    name: "Relatel", 
    logo: "https://status.relatel.dk/assets/relatel_logo_high-e864e964.png" 
  },
  { 
    name: "Telavox", 
    logo: "https://www.telavox.com/wp-content/uploads/2023/06/Telavox_Platform_Logo_Horizontal_Black.svg" 
  },
];

const TelcoTrustStrip = () => {
  return (
    <div className="mt-16 w-full px-4">
      <p className="text-center text-sm font-medium text-muted-foreground mb-8">
        Virker med jeres nuværende telefonløsning
      </p>

      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-8 md:gap-x-12">
        {telcos.map((item) => (
          <div
            key={item.name}
            className="h-6 md:h-8 flex items-center justify-center"
          >
            <img
              src={item.logo}
              alt={`${item.name} logo`}
              className="h-full w-auto max-w-[120px] object-contain opacity-50 grayscale contrast-125 transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            />
          </div>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-[10px] md:text-xs leading-relaxed text-muted-foreground/60">
        GetXM kræver kun, at ubesvarede opkald kan viderestilles. I beholder nummer, teleselskab og arbejdsgang.
      </p>
    </div>
  );
};

export default TelcoTrustStrip;