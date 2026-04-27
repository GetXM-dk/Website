import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import PhoneMockup from "@/components/PhoneMockup";
import { simulateFollowUp, type DemoScenario, type DemoStep } from "@/lib/getxm-demo";
import { Phone, PhoneMissed, MessageCircle, Inbox, RotateCcw, Play } from "lucide-react";

type Stage = "idle" | "playing" | "done";

const STEP_DURATION = 1900;

const PhoneDemo = () => {
  const [scenario, setScenario] = useState<DemoScenario | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [stage, setStage] = useState<Stage>("idle");
  const timerRef = useRef<number | null>(null);

  const start = async () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    const s = await simulateFollowUp();
    setScenario(s);
    setVisibleCount(1);
    setStage("playing");
  };

  useEffect(() => {
    if (stage !== "playing" || !scenario) return;
    timerRef.current = window.setInterval(() => {
      setVisibleCount((c) => {
        if (c >= scenario.steps.length) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          setStage("done");
          return c;
        }
        return c + 1;
      });
    }, STEP_DURATION);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [stage, scenario]);

  const reset = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    setVisibleCount(0);
    setStage("idle");
  };

  const steps = scenario?.steps.slice(0, visibleCount) ?? [];
  const currentKind = steps[steps.length - 1]?.kind;

  return (
    <section id="demo" className="bg-secondary/40 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            Interaktiv demo
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Prøv selv et opfølgnings-flow
          </h2>
          <p className="mt-3 text-muted-foreground">
            Klik start. Se hvad der sker, fra opkaldet bliver ubesvaret, til klinikken får en klar besked.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-12 md:grid-cols-2">
          <div className="flex flex-col items-center">
            <PhoneMockup topLabel={currentKind === "ringing" ? "Indgående" : "Beskeder"}>
              {stage === "idle" && <IdleScreen />}
              {stage !== "idle" && scenario && (
                <ScreenForSteps steps={steps} clinicName={scenario.clinicName} />
              )}
            </PhoneMockup>

            <div className="mt-6 flex gap-3">
              {stage === "idle" && (
                <Button onClick={start} size="lg" className="rounded-full px-7">
                  <Play className="mr-1.5 h-4 w-4" />
                  Start demo
                </Button>
              )}
              {stage !== "idle" && (
                <Button onClick={reset} variant="outline" size="lg" className="rounded-full px-7">
                  <RotateCcw className="mr-1.5 h-4 w-4" />
                  Nulstil
                </Button>
              )}
            </div>
          </div>

          <Timeline steps={steps} total={scenario?.steps.length ?? 6} />
        </div>
      </div>
    </section>
  );
};

const IdleScreen = () => (
  <div className="flex h-full flex-col items-center justify-center text-center">
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
      <Phone className="h-6 w-6 text-foreground" />
    </div>
    <p className="mt-4 text-sm font-medium text-foreground">Klar til demo</p>
    <p className="mt-1 px-4 text-xs text-muted-foreground">
      Tryk Start for at se et komplet opfølgnings-flow.
    </p>
  </div>
);

const ScreenForSteps = ({
  steps,
  clinicName,
}: {
  steps: DemoStep[];
  clinicName: string;
}) => {
  const last = steps[steps.length - 1];

  if (!last) return null;

  if (last.kind === "ringing") {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Indgående opkald</p>
        <p className="mt-3 text-lg font-semibold text-foreground">Ukendt nummer</p>
        <div className="mt-6 flex h-20 w-20 animate-pulse items-center justify-center rounded-full bg-accent/15">
          <Phone className="h-9 w-9 text-accent" />
        </div>
        <p className="mt-6 text-xs text-muted-foreground">Ringer hos klinikken…</p>
      </div>
    );
  }

  if (last.kind === "missed") {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <PhoneMissed className="h-7 w-7 text-destructive" />
        </div>
        <p className="mt-4 text-sm font-semibold text-foreground">Ubesvaret opkald</p>
        <p className="mt-1 text-xs text-muted-foreground">Lige nu</p>
      </div>
    );
  }

  if (last.kind === "clinicMessage") {
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <Inbox className="h-4 w-4 text-foreground" />
          <span className="text-xs font-semibold">Klinikkens indbakke</span>
        </div>
        <div className="mt-4 rounded-2xl border border-border bg-card p-3 shadow-soft">
          <p className="text-[11px] font-medium uppercase tracking-wide text-accent">
            Opfølgning kræves
          </p>
          <p className="mt-1 text-xs font-semibold text-foreground">{last.clinic}</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{last.summary}</p>
        </div>
      </div>
    );
  }

  // SMS conversation view — collect message-type steps
  const messages = steps.filter(
    (s) => s.kind === "smsSent" || s.kind === "patientReply" || s.kind === "getxmReply",
  ) as Extract<DemoStep, { kind: "smsSent" | "patientReply" | "getxmReply" }>[];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <MessageCircle className="h-4 w-4 text-foreground" />
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold">{clinicName}</p>
          <p className="text-[10px] text-muted-foreground">via GetXM</p>
        </div>
      </div>
      <div className="mt-3 flex flex-1 flex-col gap-2 overflow-y-auto pr-1">
        {messages.map((m, i) => {
          const isPatient = m.kind === "patientReply";
          return (
            <div
              key={i}
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed shadow-soft ${
                isPatient
                  ? "self-end rounded-br-md bg-foreground text-background"
                  : "self-start rounded-bl-md bg-secondary text-foreground"
              }`}
            >
              {m.body}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Timeline = ({ steps, total }: { steps: DemoStep[]; total: number }) => {
  const labels = [
    "Opkald kommer ind",
    "Opkald markeres ubesvaret",
    "GetXM sender SMS til patienten",
    "Patienten svarer",
    "GetXM svarer roligt og samler info",
    "Klinikken får en klar besked",
  ];
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
      <h3 className="text-sm font-semibold text-foreground">Hvad sker der bag kulisserne</h3>
      <ol className="mt-5 space-y-4">
        {labels.map((label, i) => {
          const active = steps.length > i;
          const current = steps.length === i + 1;
          return (
            <li key={label} className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors ${
                  active
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-muted-foreground"
                } ${current ? "ring-4 ring-accent/15" : ""}`}
              >
                {i + 1}
              </span>
              <span
                className={`text-sm transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-6 text-xs text-muted-foreground">
        Demoen er en simulation. Ingen rigtige beskeder bliver sendt. {total} trin i alt.
      </p>
    </div>
  );
};

export default PhoneDemo;