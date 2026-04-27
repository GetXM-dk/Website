import { useEffect, useRef, useState } from "react";
import PhoneMockup from "@/components/PhoneMockup";
import { simulateFollowUp, type DemoScenario } from "@/lib/getxm-demo";
import { Send, RotateCcw, MessageCircle } from "lucide-react";

type Msg = { from: "getxm" | "patient"; body: string };

const HeroSmsDemo = () => {
  const [scenario, setScenario] = useState<DemoScenario | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [hasReplied, setHasReplied] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Boot: load scenario + show GetXM's opening SMS
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const s = await simulateFollowUp();
      if (cancelled) return;
      setScenario(s);
      const opener = s.steps.find((st) => st.kind === "smsSent");
      if (opener && opener.kind === "smsSent") {
        setMessages([{ from: "getxm", body: opener.body }]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending || !scenario) return;
    setSending(true);
    setMessages((m) => [...m, { from: "patient", body: text }]);
    setInput("");

    // Simulate GetXM follow-up reply (mocked — API-ready: swap with real fetch)
    await new Promise((r) => setTimeout(r, 1100));

    const reply = scenario.steps.find((st) => st.kind === "getxmReply");
    const body =
      reply && reply.kind === "getxmReply"
        ? reply.body
        : "Tak for din besked. Klinikken kontakter dig snarest.";
    setMessages((m) => [...m, { from: "getxm", body }]);
    setHasReplied(true);
    setSending(false);
  };

  const reset = () => {
    if (!scenario) return;
    const opener = scenario.steps.find((st) => st.kind === "smsSent");
    setMessages(opener && opener.kind === "smsSent" ? [{ from: "getxm", body: opener.body }] : []);
    setHasReplied(false);
    setInput("");
  };

  return (
    <div className="relative">
      {/* Soft halo behind phone */}
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-[60px] bg-accent/10 blur-3xl"
      />
      <PhoneMockup topLabel="Beskeder">
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background">
              <MessageCircle className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold">
                {scenario?.clinicName ?? "Klinikken"}
              </p>
              <p className="text-[10px] text-muted-foreground">via GetXM</p>
            </div>
          </div>

          <div ref={scrollRef} className="mt-3 flex flex-1 flex-col gap-2 overflow-y-auto pr-1">
            {messages.map((m, i) => {
              const isPatient = m.from === "patient";
              return (
                <div
                  key={i}
                  className={`max-w-[82%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed shadow-soft ${
                    isPatient
                      ? "self-end rounded-br-md bg-foreground text-background"
                      : "self-start rounded-bl-md bg-secondary text-foreground"
                  }`}
                >
                  {m.body}
                </div>
              );
            })}
            {sending && (
              <div className="self-start rounded-2xl rounded-bl-md bg-secondary px-3 py-2 text-foreground shadow-soft">
                <span className="inline-flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.1s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
                </span>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (hasReplied) reset();
              else send();
            }}
            className="mt-3 flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 shadow-soft"
          >
            {hasReplied ? (
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-1.5 text-[11px] font-medium text-foreground"
              >
                <RotateCcw className="h-3 w-3" />
                Prøv igen
              </button>
            ) : (
              <>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Skriv et svar…"
                  className="flex-1 bg-transparent text-[11px] text-foreground placeholder:text-muted-foreground focus:outline-none"
                  disabled={sending}
                />
                <button
                  type="submit"
                  aria-label="Send"
                  disabled={!input.trim() || sending}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background transition-opacity disabled:opacity-40"
                >
                  <Send className="h-3 w-3" />
                </button>
              </>
            )}
          </form>
          <p className="mt-2 text-center text-[9px] text-muted-foreground">
            Demo — ingen rigtige beskeder sendes
          </p>
        </div>
      </PhoneMockup>
    </div>
  );
};

export default HeroSmsDemo;