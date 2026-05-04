const YouSeeLogo = () => (
  <svg viewBox="-28.87662 -12.50155 250.26404 75.0093" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M45.3496 40.8252c-10.6892 0-15.531-7.0908-15.531-14.9754 0-7.911 4.8154-14.9225 15.531-14.9225 10.6892 0 15.531 7.038 15.531 14.9225 0 7.911-4.8154 14.9754-15.531 14.9754m0-22.0133c-4.1275 0-4.6567 3.9952-4.6567 7.0379 0 3.0162.5556 7.0908 4.6567 7.0908 4.1275 0 4.6567-4.0481 4.6567-7.0908.0264-3.0163-.5292-7.038-4.6567-7.038m46.3285 21.299H81.2006V36.486h-.1058c-2.0373 2.8575-4.9477 4.3392-9.2604 4.3392-5.1065 0-9.7631-3.122-9.7631-9.6573V11.6417h10.8743v14.9225c0 3.2808.3704 5.6091 3.5719 5.6091 1.8785 0 4.3392-.926 4.3392-5.4768V11.6417H91.731v28.4691zm13.2292-13.1762c0 .979.1587 1.852.4498 2.5664.8731 2.3548 3.519 2.8575 5.7679 2.8575 1.9844 0 5.0006-.6614 5.0006-3.5718 0-2.0373-1.6933-2.5665-8.4402-4.498-6.1912-1.7462-13.282-3.466-13.282-11.3506C94.4033 3.8894 102.1291 0 110.199 0c8.5195 0 16.0337 3.228 16.3512 12.7794h-11.4035c.2116-1.4817-.4498-2.4607-1.4288-3.1221-.979-.7144-2.3548-.979-3.5719-.979-1.6404 0-4.3391.4498-4.3391 2.6459.2116 2.8045 5.8208 3.413 11.3506 4.9477 5.5298 1.5346 11.0331 4.1275 11.0331 11.2977 0 10.2129-9.3927 13.4937-18.0975 13.4937-4.445 0-17.1185-1.5875-17.2244-14.1023h12.0386zm34.634 1.3758c.2645 3.228 2.143 5.5298 5.5562 5.5298 1.7463 0 3.6777-.6615 4.5508-2.0373h10.16c-2.196 6.1383-8.1756 8.9958-14.6579 8.9958-9.1016 0-15.9808-5.371-15.9808-14.8695 0-8.2815 6.0325-15.0284 15.0283-15.0284 11.2977 0 16.1925 6.3236 16.1925 17.4096zm10.4245-5.6356c0-2.6458-1.9843-4.7625-4.7625-4.7625-3.2279 0-5.1064 1.6933-5.6091 4.7625zm21.7223 5.6356c.2646 3.228 2.1431 5.5298 5.5298 5.5298 1.7463 0 3.6777-.6615 4.5508-2.0373h10.16c-2.196 6.1383-8.1756 8.9958-14.6579 8.9958-9.1016 0-15.9808-5.371-15.9808-14.8695 0-8.2815 6.0325-15.0284 15.0283-15.0284 11.2977 0 16.1925 6.3236 16.1925 17.4096zm10.4246-5.6356c0-2.6458-1.9844-4.7625-4.7625-4.7625-3.228 0-5.1065 1.6933-5.6092 4.7625zM9.181 50.0062c-2.0902 0-5.3975-.8202-5.3975-.8202v-7.4348s1.561.2117 2.3813.2117c1.5875 0 2.3812-.5292 2.9898-1.27.5556-.6614 1.1112-1.7727 1.1641-2.0108L0 11.6417h11.5358l4.2863 16.5364 5.1329-16.5364h11.1654s-9.9483 26.9345-11.139 30.136c-1.9579 5.1594-6.4822 8.2285-11.8004 8.2285"/>
  </svg>
);

const TDCLogo = () => (
  <span className="font-bold tracking-tight text-[15px] md:text-[17px] leading-none">TDC Erhverv</span>
);

const telcos = [
  {
    name: "TDC Erhverv",
    logo: <TDCLogo />,
    scale: 1,
  },
  {
    name: "YouSee",
    logo: <YouSeeLogo />,
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
              className="h-10 md:h-12 flex items-center justify-center rounded-lg bg-background/60 border border-border/40 overflow-hidden px-2"
            >
              {typeof item.logo === "string" ? (
                <img
                  src={item.logo}
                  alt={`${item.name} logo`}
                  className="max-h-5 md:max-h-6 max-w-full w-auto object-contain opacity-50 grayscale contrast-125 transition-all duration-300 hover:opacity-90"
                />
              ) : (
                <div className="max-h-5 md:max-h-6 max-w-full w-auto flex items-center justify-center opacity-50 grayscale contrast-125 transition-all duration-300 hover:opacity-90 [&>svg]:max-h-5 md:[&>svg]:max-h-6 [&>svg]:w-auto">
                  {item.logo}
                </div>
              )}
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