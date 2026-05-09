## Mål
Fjern den pulserende glow-ring på demo-inputfeltet, der virker svag og bliver beskåret af telefon-skærmens kant. Erstat den med en tydeligere "Accent outline"-stil: ren pink kant + let accent-tonet baggrund, så feltet ser klart highlightet ud uden at gå udenfor sine egne kanter.

## Ændringer

### `src/index.css` — `.demo-input-active` og keyframes
- Fjern `animation: demoInputPulse` og hele `@keyframes demoInputPulse`-blokken (ingen glow-ring længere).
- Opdater `.demo-input-active` til:
  - `border-color: hsl(var(--accent))` (fuld styrke, ikke 0.55) — 1.5px tyk via `border-width: 1.5px`.
  - `background: hsl(var(--accent) / 0.06)` — meget let pink baggrundstone, så feltet skiller sig ud uden støj.
  - Behold den eksisterende `box-shadow` (drop-shadow) — ingen ekstra ring udenpå.
- Tilføj en kort, blid intro-animation (`demoInputAppear` 320ms) som fader baggrund + kantfarve ind én gang, i stedet for vedvarende pulse.
- `.demo-input-shell:focus-within` matcher samme outline-stil for konsistens når brugeren klikker.

### Resultat
- Tydelig pink kontur der signalerer "skriv her", uden glow der bliver clippet.
- Let accent-baggrund giver visuel vægt uden at virke larmende.
- Ingen pulserende bevægelse — mere premium og rolig.
- Ingen layout-ændringer i `DemoChatSurface.tsx` nødvendige; den eksisterende `mx-1 mb-1 mt-3` bevares som sikkerhedsmargin.
