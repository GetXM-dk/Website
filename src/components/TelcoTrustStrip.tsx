const TDCLogo = () => (
  <svg viewBox="0 0 1500 1500" className="w-full h-full" id="Layer_1" version="1.1">
    <path fill="#0000bf" d="M473.9,53.5c-192.7,0-310,98.3-343.8,292L7.7,1038.3c-38.6,220.8,70.2,348.2,291.5,348.2h667.3c193.6,0,309.5-98.3,343.8-292l122.1-692.8c38.6-220.8-70.2-348.2-291.5-348.2H473.9Z"></path>
    <path fill="#fff" d="M620.1,904c-10.1,0-18.4-8.3-18.4-18.4v-238.8c0-10.1,8.3-18.4,18.4-18.4h41.3c15.4,0,27.7-12.3,27.7-27.7v-47.9c0-10.1,8.3-18.4,18.4-18.4h14.9c110.6,0,199.8,94.4,190.1,204.6-9.7,110.2-82.5,165.1-185.7,165.1h-106.7ZM715.8,619c-15.4,0-27.7,12.3-27.7,27.7v148.8c0,13.2,10.5,24.1,24.1,24.1h13.6c54.9,0,100.1-43.5,101-98.3.9-60.1-40.4-102.3-100.1-102.3h-11Z"></path>
    <path fill="#fff" d="M1151.8,904c-111.1,0-191.4-76.8-191.4-184.8s80.3-184.8,191.4-184.8h21.1c7.9,0,14.5,6.6,14.5,14.5v55.8c0,7.9-6.6,14.5-14.5,14.5h-21.1c-61,0-104.9,42.1-104.9,100.1s42.1,100.1,104.9,100.1h21.1c7.9,0,14.5,6.6,14.5,14.5v55.8c0,7.9-6.6,14.5-14.5,14.5h-21.1Z"></path>
    <path fill="#fff" d="M386.6,904c-7.9,0-14.5-6.6-14.5-14.5v-246.7c0-13.2-10.5-24.1-24.1-24.1h-81.2c-7.9,0-14.5-6.6-14.5-14.5v-55.8c0-7.9,6.6-14.5,14.5-14.5h296.3c7.9,0,14.5,6.6,14.5,14.5v55.8c0,7.9-6.6,14.5-14.5,14.5h-81.2c-13.2,0-24.1,10.5-24.1,24.1v246.7c0,7.9-6.6,14.5-14.5,14.5h-57.5.9Z"></path>
  </svg>
);

const telcos = [
  {
    name: "TDC Erhverv",
    logo: <TDCLogo />,
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
    logo: "https://ik.imagekit.io/businesswith/tr:w-200,h-100,cm-pad_resize,dpr-2/logo/telavox-logo.png",
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
              className="h-10 md:h-12 flex items-center justify-center rounded-lg bg-background/60 border border-border/40 overflow-hidden"
            >
              <div 
                style={{ maxHeight: `${item.scale * 100}%` }}
                className="max-w-[75%] w-full h-full flex items-center justify-center opacity-50 grayscale contrast-125 transition-all duration-300 hover:opacity-90"
              >
                {typeof item.logo === "string" ? (
                  <img
                    src={item.logo}
                    alt={`${item.name} logo`}
                    className="w-auto h-full object-contain"
                  />
                ) : (
                  <div className="w-auto h-full flex items-center justify-center">
                    {item.logo}
                  </div>
                )}
              </div>
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