import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3 md:top-4 md:px-6">
      {/* Jeg har ændret max-w-5xl til max-w-3xl for en smallere bar */}
      <div className="mx-auto flex h-12 max-w-3xl items-center gap-4 rounded-full border border-border/40 bg-background/70 pl-5 pr-2 shadow-soft backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 md:h-14 md:pl-6 md:pr-2.5">
        <a href="#top" className="shrink-0 text-lg font-semibold tracking-tight">
          GetXM
        </a>

        {/* Jeg har ændret justify-start til justify-end herunder */}
        <nav className="hidden flex-1 items-center justify-end gap-7 text-sm font-bold text-foreground md:flex">
          <a href="#how" className="transition-colors hover:text-foreground">
            Sådan virker det
          </a>
          <a href="#demo" className="transition-colors hover:text-foreground">
            Demo
          </a>
          <a href="#pricing" className="transition-colors hover:text-foreground">
            Pris
          </a>
          <a href="#faq" className="transition-colors hover:text-foreground">
            FAQ
          </a>
        </nav>

        <Button asChild className="h-10 shrink-0 rounded-full px-5">
          <a href="#pricing">Kom i gang</a>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
