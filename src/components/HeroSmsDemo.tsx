import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import PhoneMockup from "@/components/PhoneMockup";
import { Send, RotateCcw, MessageCircle, AlertCircle, X } from "lucide-react";
import { getPublicApiBaseUrl } from "@/lib/public-api";

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
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isMobileFullscreenOpen, setIsMobileFullscreenOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const requestAbortRef = useRef<AbortController | null>(null);
  const sessionVersionRef = useRef(0);

  const apiBaseUrl = getPublicApiBaseUrl();
  const chatEndpoint = apiBaseUrl
    ? `${apiBaseUrl}/api/v1/website-demo/chat`
    : "/api/v1/website-demo/chat";

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      if (isMobileViewport) {
        setIsMobileFullscreenOpen(true);
      }
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

  useEffect(() => {
    return () => {
      requestAbortRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const syncViewport = (matches: boolean) => {
      setIsMobileViewport(matches);
      if (!matches) {
        setIsMobileFullscreenOpen(false);
      }
    };

    syncViewport(mediaQuery.matches);
    const handleChange = (event: MediaQueryListEvent) => syncViewport(event.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    
    setError(null);
    setSending(true);
    const currentSessionVersion = sessionVersionRef.current;
    
    // Optimistically add user message
    const userMessage = { from: "patient" as const, body: text };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    requestAbortRef.current?.abort();
    const controller = new AbortController();
    requestAbortRef.current = controller;

    try {
      const response = await fetch(chatEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          messages: nextMessages.map(m => ({
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

      if (currentSessionVersion !== sessionVersionRef.current || controller.signal.aborted) {
        return;
      }

      setMessages((m) => [...m, { from: "getxm", body: data.answer }]);
      setHasReplied(true);
    } catch (err: unknown) {
      if (controller.signal.aborted) {
        return;
      }
      console.error("Demo Chat Error:", err);
      setError("Forbindelsesfejl. Tjek om backenden kører.");
      setMessages((m) => [
        ...m, 
        { from: "getxm", body: "Beklager, jeg har lidt tekniske problemer lige nu. Prøv igen om et øjeblik." }
      ]);
    } finally {
      if (requestAbortRef.current === controller) {
        requestAbortRef.current = null;
      }
      if (currentSessionVersion === sessionVersionRef.current) {
        setSending(false);
      }
    }
  };

  const reset = () => {
    requestAbortRef.current?.abort();
    requestAbortRef.current = null;
    sessionVersionRef.current += 1;
    setMessages([
      { 
        from: "getxm", 
        body: "Hej 👋 Vi kan desværre ikke besvare dit opkald lige nu. Skriv gerne her, så hjælper jeg dig videre. Hvad drejer din henvendelse sig om?" 
      }
    ]);
    setHasReplied(false);
    setError(null);
    setInput("");
    setSending(false);
  };

  const closeMobileFullscreen = () => {
    setIsMobileFullscreenOpen(false);
    setHighlight(false);
  };

  const renderChatSurface = (isFullscreenMobile: boolean) => (
    <div className={`flex h-full flex-col ${isFullscreenMobile ? "bg-white px-4 pb-5 pt-4" : ""}`}>
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background">
            <MessageCircle className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold">Tandklinikken Søndergade</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 1 && (
            <button
              onClick={reset}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Start forfra"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}
          {isFullscreenMobile && (
            <button
              onClick={closeMobileFullscreen}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.04] text-foreground transition-colors hover:bg-black/[0.08]"
              aria-label="Luk demo"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
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
        className={`demo-input-glow mt-3 flex items-center gap-2 rounded-full border border-white/80 bg-card px-3 py-1.5 transition-all ${
          highlight ? "demo-input-active" : "demo-input-idle"
        } focus-within:outline-none`}
      >
        <input
          ref={inputRef}
          value={input}
          onFocus={() => {
            if (isMobileViewport) {
              setIsMobileFullscreenOpen(true);
            }
          }}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Skriv dit spørgsmål her"
          className="relative z-10 flex-1 bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none"
          disabled={sending}
        />
        <button
          type="submit"
          aria-label="Send"
          disabled={!input.trim() || sending}
          className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(211_100%_52%)] text-white transition-opacity disabled:opacity-40"
        >
          <Send className="h-3 w-3" />
        </button>
      </form>
    </div>
  );

  return (
    <div className="relative overflow-x-clip">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl md:h-[28rem] md:w-[28rem]"
      />
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => {
            setIsMobileFullscreenOpen(true);
            window.setTimeout(() => inputRef.current?.focus(), 80);
          }}
          className="mx-auto flex w-full max-w-[22rem] items-center justify-between rounded-[28px] border border-black/10 bg-white px-5 py-4 text-left shadow-soft"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Prøv SMS-demoen
            </p>
            <p className="mt-1 text-sm text-foreground">Åbn samtalen og skriv som en patient</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#007AFF] text-white shadow-sm">
            <MessageCircle className="h-4 w-4" />
          </div>
        </button>
      </div>

      <div className="hidden md:block">
        <PhoneMockup>
          {renderChatSurface(false)}
        </PhoneMockup>
      </div>

      {isMobileViewport && isMobileFullscreenOpen && (
        <div className="fixed inset-0 z-50 overflow-x-hidden bg-white">
          <div className="mx-auto flex h-full w-full max-w-md min-w-0 flex-col">
            {renderChatSurface(true)}
          </div>
        </div>
      )}
    </div>
  );
});

HeroSmsDemo.displayName = "HeroSmsDemo";

export default HeroSmsDemo;
