const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold text-foreground">GetXM</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Opfølgning på ubesvarede opkald — bygget til klinikker.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:gap-6">
          <a href="#how" className="hover:text-foreground">Sådan virker det</a>
          <a href="#demo" className="hover:text-foreground">Demo</a>
          <a href="#pricing" className="hover:text-foreground">Pris</a>
          <a href="mailto:hej@getxm.dk" className="hover:text-foreground">hej@getxm.dk</a>
        </div>
      </div>
      <div className="border-t border-border py-4">
        <p className="container text-xs text-muted-foreground">
          © {new Date().getFullYear()} GetXM. Alle rettigheder forbeholdes.
        </p>
      </div>
    </footer>
  );
};

export default Footer;