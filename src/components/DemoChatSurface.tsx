import type { RefObject } from "react";
import { AlertCircle, RotateCcw, Send, X } from "lucide-react";

import type { DemoChatMessage } from "@/components/demo-chat-types";

type DemoChatSurfaceProps = {
  error: string | null;
  highlight: boolean;
  input: string;
  inputRef: RefObject<HTMLInputElement>;
  isFullscreenMobile: boolean;
  isMobileViewport: boolean;
  messages: DemoChatMessage[];
  onCloseMobile: () => void;
  onInputChange: (value: string) => void;
  onInputFocus: () => void;
  onReset: () => void;
  onSubmit: () => void;
  scrollRef: RefObject<HTMLDivElement>;
  sending: boolean;
};

const DemoChatSurface = ({
  error,
  highlight,
  input,
  inputRef,
  isFullscreenMobile,
  isMobileViewport,
  messages,
  onCloseMobile,
  onInputChange,
  onInputFocus,
  onReset,
  onSubmit,
  scrollRef,
  sending,
}: DemoChatSurfaceProps) => {
  return (
    <div className={`flex h-full min-h-0 w-full max-w-full flex-col overflow-hidden ${isFullscreenMobile ? "bg-white" : ""}`}>
      <div className={`shrink-0 border-b ${isFullscreenMobile ? "px-5 py-4" : "px-1 pb-3"}`}>
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 flex-1 items-center pr-2">
            <div className="min-w-0 flex-1">
              {isFullscreenMobile && (
                <p className="text-sm text-black/50">Prøv GetXM</p>
              )}
              <p className={`${isFullscreenMobile ? "text-base" : "text-xs"} truncate font-semibold`}>
                Tandklinikken Søndergade
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {messages.length > 1 && (
              <button
                type="button"
                onClick={onReset}
                className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Start forfra"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            )}
            {isFullscreenMobile && (
              <button
                type="button"
                onClick={onCloseMobile}
                className="rounded-full p-2 hover:bg-black/5"
                aria-label="Luk demo"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className={`min-h-0 flex-1 overflow-y-auto ${isFullscreenMobile ? "overscroll-contain px-4 py-4" : "mt-3 pr-1"}`}
      >
        <div className="flex min-h-full flex-col gap-2.5">
          {messages.map((message) => {
            const isPatient = message.from === "patient";
            return (
              <div
                key={message.id}
                className={`font-sms max-w-[82%] rounded-[18px] px-4 py-2.5 text-[14px] leading-[1.3] shadow-sm text-left ${
                  isPatient
                    ? "self-end rounded-tr-[5px] bg-[#007AFF] text-white font-normal"
                    : "self-start rounded-tl-[5px] bg-[#E9E9EB] text-[#000000] font-normal"
                }`}
              >
                {message.body}
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
      </div>

      <div
        className={
          isFullscreenMobile
            ? "shrink-0 border-t bg-white px-4 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-3"
            : ""
        }
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!input.trim() || sending) return;
            onSubmit();
          }}
          className={`max-w-full rounded-full transition-all ${
            isFullscreenMobile
              ? "w-full"
              : `demo-input-shell mx-1 mb-1 mt-3 ${highlight ? "demo-input-active" : "demo-input-idle"}`
          }`}
        >
          <div
            className={`relative z-10 flex w-full max-w-full items-center gap-2 rounded-full bg-white ${
              isFullscreenMobile ? "border border-black/10 px-4 py-3 shadow-sm" : "px-3 py-1.5"
            }`}
          >
            <input
              ref={inputRef}
              type="text"
              autoComplete="off"
              autoCorrect="on"
              enterKeyHint="send"
              value={input}
              onFocus={() => {
                if (isMobileViewport) {
                  onInputFocus();
                }
              }}
              onChange={(event) => onInputChange(event.target.value)}
              placeholder="Skriv dit spørgsmål her"
              className={`min-w-0 flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none ${
                isFullscreenMobile ? "text-base" : "text-sm"
              }`}
              disabled={sending}
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={!input.trim() || sending}
              className={`shrink-0 rounded-full transition-opacity disabled:opacity-40 ${
                isFullscreenMobile
                  ? "bg-black px-4 py-2 text-sm text-white"
                  : "flex h-7 w-7 items-center justify-center bg-[hsl(211_100%_52%)] text-white"
              }`}
            >
              {isFullscreenMobile ? "Send" : <Send className="h-3 w-3" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DemoChatSurface;
