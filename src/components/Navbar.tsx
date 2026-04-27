import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <a href="#top" className="text-lg font-semibold tracking-tight">
          GetXM
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
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