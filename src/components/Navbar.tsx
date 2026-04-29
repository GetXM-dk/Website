import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="sticky top-3 z-40 w-full px-3 md:top-4 md:px-6">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-full border border-border/40 bg-background/70 pl-5 pr-2 shadow-soft backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 md:h-16 md:pl-7 md:pr-3">
        <a href="#top" className="text-lg font-semibold tracking-tight">
          GetXM
        </a>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-foreground md:flex">
          <a href="#how" className="transition-colors hover:text-foreground">Sådan virker det</a>
          <a href="#demo" className="transition-colors hover:text-foreground">Demo</a>
          <a href="#pricing" className="transition-colors hover:text-foreground">Pris</a>
          <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
        </nav>
        <Button asChild className="rounded-full">
          <a href="#pricing">Kom i gang</a>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;