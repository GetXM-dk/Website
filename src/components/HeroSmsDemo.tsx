import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import PhoneMockup from "@/components/PhoneMockup";
import { Send, RotateCcw, MessageCircle, AlertCircle } from "lucide-react";

type Msg = { from: "getxm" | "patient"; body: string };

export type HeroSmsDemoHandle = {
  focusInput: () => void;
};


const HeroSmsDemo = forwardRef<HeroSmsDemoHandle>((_props, ref) => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [hasReplied, setHasReplied] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      if (hasReplied || error) {
        reset();
      }
      setHighlight(true);
      window.setTimeout(() => inputRef.current?.focus(), 50);
      window.setTimeout(() => setHighlight(false), 2600);
    },
  }));

  // Initial welcome message
  useEffect(() => {
    setMessages([
      { 
        from: "getxm", 
        body: "Hej 👋 Vi kan desværre ikke besvare dit opkald lige nu. Skriv gerne her, så hjælper jeg dig videre. Hvad drejer din henvendelse sig om?" 
      }
    ]);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    
    setError(null);
    setSending(true);
    
    // Optimistically add user message
    const userMessage = { from: "patient" as const, body: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch(`${API_URL}/api/v1/website-demo/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.from === "patient" ? "user" : "assistant",
            content: m.body
          }))
        }),
      });

      if (!response.ok) {
        throw new Error("Kunne ikke forbinde til serveren");
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || "AI fejlede");
      }

      setMessages((m) => [...m, { from: "getxm", body: data.answer }]);
      setHasReplied(true);
    } catch (err: any) {
      console.error("Demo Chat Error:", err);
      setError("Forbindelsesfejl. Tjek om backenden kører.");
      setMessages((m) => [
        ...m, 
        { from: "getxm", body: "Beklager, jeg har lidt tekniske problemer lige nu. Prøv igen om et øjeblik." }
      ]);
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setMessages([
      { 
        from: "getxm", 
        body: "Hej 👋 Vi kan desværre ikke besvare dit opkald lige nu. Skriv gerne her, så hjælper jeg dig videre. Hvad drejer din henvendelse sig om?" 
      }
    ]);
    setHasReplied(false);
    setError(null);
    setInput("");
  };

  return (
    <div className="relative">
      <div aria-hidden className="absolute -inset-10 -z-10 rounded-[60px] bg-accent/20 blur-3xl" />
      <PhoneMockup>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background">
                <MessageCircle className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold">Tandklinikken Søndergade</p>
              </div>
            </div>
            {messages.length > 1 && (
              <button 
                onClick={reset}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Start forfra"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div ref={scrollRef} className="mt-3 flex flex-1 flex-col gap-2.5 overflow-y-auto pr-1">
            {messages.map((m, i) => {
              const isPatient = m.from === "patient";
              return (
                <div
                  key={i}
                  className={`max-w-[80%] rounded-[18px] px-4 py-2.5 text-[14px] leading-[1.3] shadow-sm text-left ${
                    isPatient
                      ? "self-end rounded-tr-[5px] bg-[#007AFF] text-white font-normal"
                      : "self-start rounded-tl-[5px] bg-[#E9E9EB] text-[#000000] font-normal"
                  }`}
                  style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
                  }}
                >
                  {m.body}
                </div>
              );
            })}
            {sending && (
              <div className="self-start rounded-[18px] rounded-tl-[5px] bg-[#E9E9EB] px-4 py-2.5 text-[#000000] shadow-sm">
                <span className="inline-flex gap-1.5 pt-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#8E8E93] [animation-delay:-0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#8E8E93] [animation-delay:-0.1s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#8E8E93]" />
                </span>
              </div>
            )}
            {error && (
              <div className="flex items-center gap-1.5 px-1 py-1 text-[10px] text-destructive">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className={`mt-3 flex items-center gap-2 rounded-full border border-accent/30 bg-card px-3 py-1.5 transition-all ${
              highlight ? "demo-input-active" : "demo-input-idle"
            } focus-within:outline-none`}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Skriv dit spørgsmål her"
              className="flex-1 bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none"
              disabled={sending}
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={!input.trim() || sending}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(211_100%_52%)] text-white transition-opacity disabled:opacity-40"
            >
              <Send className="h-3 w-3" />
            </button>
          </form>
          <p className="mt-2 text-center text-[8px] text-muted-foreground font-medium uppercase tracking-wider">
            GetXM demo
          </p>
        </div>
      </PhoneMockup>
    </div>
  );
});

HeroSmsDemo.displayName = "HeroSmsDemo";

export default HeroSmsDemo;
