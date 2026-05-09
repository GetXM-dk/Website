## Mål

Når brugeren klikker "Prøv selv" i hero, skal input-feltet i telefonen tydeligt fange øjet — uden at virke larmende. Den nuværende effekt ændrer kun box-shadow med ~5% opacity, hvilket er næsten usynligt på hvid baggrund.

## Hvad ændres

Kun CSS i `src/index.css` (klasserne `.demo-input-shell`, `.demo-input-active`, `.demo-input-idle`). Ingen ændringer i komponenter eller logik. Highlight udløses fortsat 2,6s via `highlight`-state i `HeroSmsDemo.tsx`.

## Ny effekt

1. **Farvet glow-ring** i brand-accent (brand-pink) i stedet for grå skygge — to lag:
   - Indre ring: `0 0 0 3px hsl(var(--accent) / 0.25)`
   - Ydre blød glow: `0 8px 32px hsl(var(--accent) / 0.35)`
2. **Border** skifter til `hsl(var(--accent) / 0.5)` så kanten matcher glowen.
3. **Subtil pulse-animation** (1,3s, 2 iterationer) der ånder ringen mellem 0.2 og 0.4 opacity — fanger blikket uden at distrahere.
4. **Let scale-up** (1.0 → 1.02) ved aktivering med smooth cubic-bezier transition for et "pop"-feel.
5. **Idle/focus-within** beholdes neutralt som nu, så feltet ikke konstant glower når brugeren skriver.

## Visuel reference

```text
Idle:     [ ───── input ───── ]   (tynd grå kant)

Active:   ((( [ ───── input ───── ] )))   ← pink glow + pulse
```

## Teknisk

- Tilføj `@keyframes demoInputPulse` i `src/index.css`.
- Opdater `.demo-input-active` med ny box-shadow, border-color, transform og animation.
- Behold `transition` på `.demo-input-shell` så afslutningen af highlighten også er glat.
- Bruger eksisterende `--accent` HSL token — ingen nye tokens.
