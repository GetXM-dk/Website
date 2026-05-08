import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

import DemoChatSurface from "@/components/DemoChatSurface";
import { MobileDemoSheet } from "@/components/MobileDemoSheet";
import PhoneMockup from "@/components/PhoneMockup";
import { MessageCircle } from "lucide-react";
import type { DemoChatMessage } from "@/components/demo-chat-types";
import { getPublicApiBaseUrl } from "@/lib/public-api";

export type HeroSmsDemoHandle = {
  focusInput: () => void;
};

const createMessageId = () => {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  return `demo-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const createDemoMessage = (from: DemoChatMessage["from"], body: string): DemoChatMessage => ({
  id: createMessageId(),
  from,
  body,
});

const getInitialDemoMessages = (): DemoChatMessage[] => [
  createDemoMessage(
    "getxm",
    "Hej 👋 Vi kan desværre ikke besvare dit opkald lige nu. Skriv gerne her, så hjælper jeg dig videre. Hvad drejer din henvendelse sig om?"
  ),
];

const HeroSmsDemo = forwardRef<HeroSmsDemoHandle>((_props, ref) => {
  const [messages, setMessages] = useState<DemoChatMessage[]>([]);
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
    setMessages(getInitialDemoMessages());
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
    const userMessage = createDemoMessage("patient", text);
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

      setMessages((m) => [...m, createDemoMessage("getxm", data.answer)]);
      setHasReplied(true);
    } catch (err: unknown) {
      if (controller.signal.aborted) {
        return;
      }
      console.error("Demo Chat Error:", err);
      setError("Forbindelsesfejl. Tjek om backenden kører.");
      setMessages((m) => [
        ...m, 
        createDemoMessage("getxm", "Beklager, jeg har lidt tekniske problemer lige nu. Prøv igen om et øjeblik.")
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
    setMessages(getInitialDemoMessages());
    setHasReplied(false);
    setError(null);
    setInput("");
    setSending(false);
  };

  const closeMobileFullscreen = () => {
    setIsMobileFullscreenOpen(false);
    setHighlight(false);
  };

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
          className="mx-auto flex w-full max-w-[22rem] items-center gap-4 rounded-[28px] border border-black/10 bg-white px-5 py-4 text-left shadow-soft"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#007AFF] text-white shadow-sm">
            <MessageCircle className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Se SMS-flowet
            </p>
            <p className="mt-1 text-sm text-foreground">Prøv som patient</p>
          </div>
        </button>
      </div>

      <div className="hidden md:block">
        <PhoneMockup>
          <DemoChatSurface
            error={error}
            highlight={highlight}
            input={input}
            inputRef={inputRef}
            isFullscreenMobile={false}
            isMobileViewport={isMobileViewport}
            messages={messages}
            onCloseMobile={closeMobileFullscreen}
            onInputChange={setInput}
            onInputFocus={() => setIsMobileFullscreenOpen(true)}
            onReset={reset}
            onSubmit={send}
            scrollRef={scrollRef}
            sending={sending}
          />
        </PhoneMockup>
      </div>

      <MobileDemoSheet
        open={isMobileViewport && isMobileFullscreenOpen}
        onClose={closeMobileFullscreen}
      >
        <DemoChatSurface
          error={error}
          highlight={highlight}
          input={input}
          inputRef={inputRef}
          isFullscreenMobile
          isMobileViewport={isMobileViewport}
          messages={messages}
          onCloseMobile={closeMobileFullscreen}
          onInputChange={setInput}
          onInputFocus={() => setIsMobileFullscreenOpen(true)}
          onReset={reset}
          onSubmit={send}
          scrollRef={scrollRef}
          sending={sending}
        />
      </MobileDemoSheet>
    </div>
  );
});

HeroSmsDemo.displayName = "HeroSmsDemo";

export default HeroSmsDemo;
