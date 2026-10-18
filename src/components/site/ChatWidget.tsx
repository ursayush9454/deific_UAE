import { useState, useEffect, useRef } from "react";

// ============================================================
// CONFIG — set this in your .env file if your backend isn't
// served under the same domain at /ai.
// Vite:  VITE_AI_BACKEND_URL=https://www.deificdigital.com/ai
// If not set, defaults to "/ai" (same-domain via the Nginx route).
// ============================================================
const API_BASE: string =
  (import.meta as any)?.env?.VITE_AI_BACKEND_URL || "/ai";

type Role = "user" | "bot";
interface ChatMessage {
  role: Role;
  text: string;
}

// call = the live hands-free voice loop's current phase
type CallPhase = "connecting" | "speaking" | "listening" | "thinking" | "ended";
type PanelView = "closed" | "intro" | "live";

export default function ChatWidget() {
  const [view, setView] = useState<PanelView>("closed");
  const [phase, setPhase] = useState<CallPhase>("connecting");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [showTyping, setShowTyping] = useState<boolean>(false); // fallback text input toggle
  const [micSupported, setMicSupported] = useState<boolean>(true);

  const sessionIdRef = useRef<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const continuousRef = useRef<boolean>(false); // true while the hands-free loop should keep going
  const phaseRef = useRef<CallPhase>("connecting");

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Session id: persisted per browser tab session
  useEffect(() => {
    let id = sessionStorage.getItem("dg_session_id");
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem("dg_session_id", id);
    }
    sessionIdRef.current = id;
  }, []);

  // Preload speech synthesis voices
  useEffect(() => {
    const load = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
  }, []);

  // Setup speech recognition (mic)
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicSupported(false);
      return;
    }
    const rec = new SpeechRecognition();
    rec.lang = "en-IN";
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onstart = () => setPhase("listening");

    rec.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleUserTurn(transcript);
    };

    rec.onerror = () => {
      // mic error (e.g. silence timeout) — if still in the live call, just retry listening
      if (continuousRef.current) {
        try {
          rec.start();
        } catch {
          /* already starting */
        }
      }
    };

    rec.onend = () => {
      // Browser auto-stops after one utterance. If we're mid hands-free call
      // and not already about to speak/think, restart listening automatically.
      if (continuousRef.current && phaseRef.current === "listening") {
        try {
          rec.start();
        } catch {
          /* ignore */
        }
      }
    };

    recognitionRef.current = rec;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function detectSpeechLang(text: string) {
    return /[\u0900-\u097F]/.test(text) ? "hi-IN" : "en-IN";
  }

  function pickFemaleVoice(targetLang: string) {
    const voices = voicesRef.current;
    const femaleHints = [
      "neerja",
      "swara",
      "heera",
      "kalpana",
      "lekha",
      "veena",
      "priya",
      "female",
      "google हिन्दी",
      "zira",
      "samantha",
      "moira",
      "tessa",
    ];
    const langPrefix = targetLang.split("-")[0].toLowerCase(); // "en" or "hi"

    const exactLang = voices.filter(
      (v) => v.lang.toLowerCase() === targetLang.toLowerCase(),
    );
    // 🔧 FIX: same-language voices (any region), not just exact locale match
    const samePrefix = voices.filter((v) =>
      v.lang.toLowerCase().startsWith(langPrefix),
    );
    const indianLang = voices.filter((v) => /^(hi-in|en-in)$/i.test(v.lang));

    for (const pool of [exactLang, indianLang, samePrefix]) {
      if (!pool.length) continue;
      const match = pool.find((v) =>
        femaleHints.some((h) => v.name.toLowerCase().includes(h)),
      );
      if (match) return match;
    }

    // 🔧 FIX: final fallback must stay within the SAME language — never fall
    // back to an unrelated language voice (e.g. Assamese for English text)
    const fallbackPool = samePrefix.length
      ? samePrefix
      : exactLang.length
        ? exactLang
        : voices.filter((v) => v.lang.toLowerCase().startsWith("en"));

    return (
      fallbackPool.find((v) => !/male/i.test(v.name)) ||
      fallbackPool[0] ||
      voices.find((v) => v.lang.toLowerCase().startsWith("en")) ||
      voices[0] ||
      null
    );
  }

  // Speaks the text, then (if the hands-free loop is still active) automatically
  // starts listening again — this is what removes the "tap every time" problem.
  //
  // 🔧 ANDROID FIX: Chrome on Android has two known quirks with speechSynthesis:
  //   1) calling speak() immediately after cancel() can silently get dropped
  //      (a small delay avoids the race).
  //   2) long utterances (~15s+) can get auto-paused by the browser mid-speech
  //      and never resume on their own — a periodic pause()/resume() nudge
  //      ("watchdog") keeps it alive until it actually finishes.
  function speakThenListen(text: string) {
    setPhase("speaking");
    const targetLang = detectSpeechLang(text);
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1.0;
    utter.pitch = 1.05;
    utter.lang = targetLang;
    const voice = pickFemaleVoice(targetLang);
    if (voice) {
      utter.voice = voice;
      utter.lang = voice.lang;
    }

    let watchdog: any = null;

    utter.onstart = () => {
      watchdog = setInterval(() => {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 4000);
    };

    const cleanup = () => {
      if (watchdog) clearInterval(watchdog);
      watchdog = null;
    };

    utter.onend = () => {
      cleanup();
      if (continuousRef.current) startListening();
    };
    utter.onerror = () => {
      cleanup();
      if (continuousRef.current) startListening();
    };

    window.speechSynthesis.cancel();
    setTimeout(() => {
      window.speechSynthesis.speak(utter);
    }, 120);
  }

  function startListening() {
    if (!recognitionRef.current || !continuousRef.current) return;
    setPhase("listening");
    try {
      recognitionRef.current.start();
    } catch {
      /* recognition may already be running — ignore */
    }
  }

  // Called by the mic button on the intro screen. Starts the whole hands-free call.
  //
  // 🔧 ANDROID FIX: fire a near-silent "primer" utterance synchronously inside
  // this tap-gesture handler, before any await. This unlocks the speech engine
  // on Android Chrome so that the *real* reply (spoken later, after the fetch
  // resolves) is reliably allowed to play instead of being silently blocked.
  const startCall = async () => {
    continuousRef.current = true;
    setView("live");
    setPhase("connecting");
    setMessages([]);

    // try {
    //   const primer = new SpeechSynthesisUtterance(" ");
    //   primer.volume = 0;
    //   window.speechSynthesis.speak(primer);
    // } catch {
    //   /* ignore */
    // }

    try {
      const res = await fetch(`${API_BASE}/web/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionIdRef.current }),
      });
      const data = await res.json();
      setMessages([{ role: "bot", text: data.reply }]);
      speakThenListen(data.reply);
    } catch {
      const msg = "Connection error — please try again in a moment.";
      setMessages([{ role: "bot", text: msg }]);
      setPhase("ended");
      continuousRef.current = false;
    }
  };

  // Called with the transcript once the user has finished speaking (or typed text).
  const handleUserTurn = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      if (continuousRef.current) startListening();
      return;
    }
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setPhase("thinking");
    try {
      const res = await fetch(`${API_BASE}/web/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          message: trimmed,
        }),
      });
      const data = await res.json();
      const reply: string =
        data.reply || "Sorry, kuch gadbad hui. Dobara try karein.";
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
      speakThenListen(reply);
    } catch {
      const msg = "Connection error — please try again in a moment.";
      setMessages((prev) => [...prev, { role: "bot", text: msg }]);
      if (continuousRef.current) startListening();
    }
  };

  const endCall = () => {
    continuousRef.current = false;
    window.speechSynthesis.cancel();
    try {
      recognitionRef.current?.stop();
    } catch {
      /* ignore */
    }
    setPhase("ended");
  };

  const closePanel = () => {
    endCall();
    setView("closed");
  };

  const handleTypeSubmit = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    window.speechSynthesis.cancel();
    try {
      recognitionRef.current?.stop();
    } catch {
      /* ignore */
    }
    handleUserTurn(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleTypeSubmit();
  };

  const statusLabel: Record<CallPhase, string> = {
    connecting: "Connecting…",
    speaking: "SUPPORT is speaking…",
    listening: "Listening…",
    thinking: "Thinking…",
    ended: "Call ended",
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --dg-bg: #14161C;
          --dg-panel: #1C1F27;
          --dg-border: #2B2F3A;
          --dg-text: #E8E9ED;
          --dg-muted: #8A8F9C;
          --dg-accent: #FF5A36;
          --dg-user-bubble: #2A2E38;
          --dg-mono: 'IBM Plex Mono', 'Courier New', monospace;
          --dg-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        #dg-launcher {
          position: fixed; bottom: 24px; right: 24px; width: 58px; height: 58px;
          border-radius: 50%; background: var(--dg-accent); border: none;
          color: #14161C; display: flex; align-items: center; justify-content: center; cursor: pointer;
          box-shadow: 0 8px 24px rgba(255,90,54,0.4); z-index: 999998; transition: transform 0.15s ease;
        }
        #dg-launcher:hover { transform: scale(1.06); }
        #dg-launcher-ring {
          position: absolute; inset: 0; border-radius: 50%;
          border: 2px solid var(--dg-accent); animation: dg-pulse 2.2s ease-out infinite;
          pointer-events: none;
        }
        @keyframes dg-pulse { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.6); opacity: 0; } }
        #dg-launcher-badge {
          position: absolute; top: -2px; right: -2px; width: 14px; height: 14px;
          border-radius: 50%; background: #22C55E; border: 2px solid var(--dg-bg);
        }

        #dg-window {
          position: fixed; bottom: 96px; right: 24px; width: 360px; max-width: calc(100vw - 32px);
          height: 480px; max-height: calc(100vh - 140px); background: var(--dg-panel);
          border: 1px solid var(--dg-border); border-radius: 16px; display: flex; flex-direction: column;
          overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.5); z-index: 999999;
          font-family: var(--dg-sans); opacity: 0; transform: translateY(12px);
          transition: opacity 0.2s ease, transform 0.2s ease; pointer-events: none;
        }
        #dg-window.dg-open { opacity: 1; transform: translateY(0); pointer-events: auto; }
        #dg-header {
          background: var(--dg-bg); border-bottom: 1px solid var(--dg-border); padding: 14px 16px;
          display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;
        }
        #dg-header-title { font-family: var(--dg-mono); font-size: 13px; color: var(--dg-text); display: flex; align-items: center; gap: 8px; }
        .dg-cursor { color: var(--dg-accent); animation: dg-blink 1.1s steps(1) infinite; }
        @keyframes dg-blink { 50% { opacity: 0; } }
        #dg-close { background: none; border: none; color: var(--dg-muted); font-size: 18px; cursor: pointer; line-height: 1; padding: 4px; }
        #dg-close:hover { color: var(--dg-text); }

        /* ---- Intro screen: voice-first onboarding ---- */
        #dg-intro { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; padding: 24px; text-align: center; }
        #dg-intro-orb {
          width: 84px; height: 84px; border-radius: 50%; background: var(--dg-accent);
          display: flex; align-items: center; justify-content: center; color: #14161C;
          cursor: pointer; border: none; box-shadow: 0 8px 30px rgba(255,90,54,0.45); position: relative;
        }
        #dg-intro-orb::after {
          content: ""; position: absolute; inset: -8px; border-radius: 50%; border: 2px solid var(--dg-accent);
          animation: dg-pulse 2.2s ease-out infinite;
        }
        #dg-intro h3 { color: var(--dg-text); font-size: 15px; margin: 0; font-family: var(--dg-mono); }
        #dg-intro p { color: var(--dg-muted); font-size: 12.5px; line-height: 1.6; margin: 0; max-width: 240px; }

        /* ---- Live call view ---- */
        #dg-call-status { padding: 18px 16px 10px; display: flex; flex-direction: column; align-items: center; gap: 10px; flex-shrink: 0; }
        #dg-orb {
          width: 56px; height: 56px; border-radius: 50%; background: var(--dg-accent);
          display: flex; align-items: center; justify-content: center; color: #14161C; position: relative;
        }
        #dg-orb.dg-orb-listening { animation: dg-orb-pulse 1.1s ease-in-out infinite; }
        #dg-orb.dg-orb-thinking { opacity: 0.55; }
        #dg-orb.dg-orb-speaking { animation: dg-orb-speak 0.5s ease-in-out infinite alternate; }
        @keyframes dg-orb-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(255,90,54,0.5); } 50% { box-shadow: 0 0 0 12px rgba(255,90,54,0); } }
        @keyframes dg-orb-speak { from { transform: scale(1); } to { transform: scale(1.08); } }
        #dg-status-text { font-family: var(--dg-mono); font-size: 11.5px; color: var(--dg-muted); letter-spacing: 0.03em; }

        #dg-messages { flex: 1; overflow-y: auto; padding: 8px 16px 16px; display: flex; flex-direction: column; gap: 10px; }
        .dg-msg { max-width: 85%; font-size: 13.5px; line-height: 1.5; }
        .dg-msg-user { align-self: flex-end; background: var(--dg-user-bubble); color: var(--dg-text); padding: 8px 12px; border-radius: 10px 10px 2px 10px; }
        .dg-msg-user::before { content: "> "; color: var(--dg-accent); font-family: var(--dg-mono); }
        .dg-msg-bot { align-self: flex-start; color: var(--dg-text); padding: 8px 0; }
        .dg-label { display: block; font-family: var(--dg-mono); font-size: 10.5px; color: var(--dg-muted); margin-bottom: 3px; letter-spacing: 0.03em; }

        #dg-callbar { border-top: 1px solid var(--dg-border); padding: 10px; display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        #dg-end-btn {
          flex: 1; background: transparent; border: 1px solid var(--dg-border); color: var(--dg-muted);
          border-radius: 8px; padding: 9px; font-size: 12.5px; font-family: var(--dg-mono); cursor: pointer;
        }
        #dg-end-btn:hover { color: var(--dg-text); border-color: var(--dg-accent); }
        #dg-type-toggle {
          background: transparent; border: 1px solid var(--dg-border); color: var(--dg-muted);
          border-radius: 8px; width: 38px; height: 38px; cursor: pointer; font-size: 14px; flex-shrink: 0;
        }
        #dg-type-toggle:hover { color: var(--dg-text); }

        #dg-inputrow { border-top: 1px solid var(--dg-border); padding: 10px; display: flex; gap: 8px; flex-shrink: 0; }
        #dg-input {
          flex: 1; background: var(--dg-bg); border: 1px solid var(--dg-border); border-radius: 8px;
          color: var(--dg-text); padding: 10px 12px; font-size: 13.5px; font-family: var(--dg-sans); outline: none;
        }
        #dg-input:focus { border-color: var(--dg-accent); }
        #dg-send { background: var(--dg-accent); border: none; color: #14161C; font-weight: 600; font-size: 13px; border-radius: 8px; padding: 0 16px; cursor: pointer; }

        @media (prefers-reduced-motion: reduce) {
          #dg-window { transition: none; }
          #dg-launcher-ring, #dg-intro-orb::after, #dg-orb.dg-orb-listening, #dg-orb.dg-orb-speaking { animation: none; }
          .dg-cursor { animation: none; }
        }
      ` }} />

      {/* ---- Launcher: mic-style icon, signals "voice" at a glance ---- */}
      <button
        id="dg-launcher"
        aria-label="Talk to our AI receptionist"
        onClick={() => setView("intro")}
      >
        {view === "closed" && <span id="dg-launcher-ring" />}
        {view === "closed" && <span id="dg-launcher-badge" />}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor" />
          <path
            d="M5 11a7 7 0 0 0 14 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <line
            x1="12"
            y1="18"
            x2="12"
            y2="22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="8"
            y1="22"
            x2="16"
            y2="22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div
        id="dg-window"
        className={view !== "closed" ? "dg-open" : ""}
        role="dialog"
        aria-label="Voice support"
      >
        <div id="dg-header">
          <div id="dg-header-title">
            Support Deific Digital<span className="dg-cursor">_</span>
          </div>
          <button id="dg-close" aria-label="Close" onClick={closePanel}>
            &times;
          </button>
        </div>

        {/* ---- INTRO: shown before the call starts, explains the voice UX ---- */}
        {view === "intro" && (
          <div id="dg-intro">
            <button
              id="dg-intro-orb"
              aria-label="Start talking"
              onClick={startCall}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="2" width="6" height="12" rx="3" fill="#14161C" />
                <path
                  d="M5 11a7 7 0 0 0 14 0"
                  stroke="#14161C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </button>
            <h3>Tap to talk</h3>
            <p>
              This is a voice assistant — tap once and just speak naturally.
              It'll listen, reply out loud, and keep listening automatically. No
              need to tap again between turns.
            </p>
          </div>
        )}

        {/* ---- LIVE: the hands-free call, with a growing transcript ---- */}
        {view === "live" && (
          <>
            <div id="dg-call-status">
              <div
                id="dg-orb"
                className={
                  phase === "listening"
                    ? "dg-orb-listening"
                    : phase === "speaking"
                      ? "dg-orb-speaking"
                      : phase === "thinking"
                        ? "dg-orb-thinking"
                        : ""
                }
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="9"
                    y="2"
                    width="6"
                    height="12"
                    rx="3"
                    fill="#14161C"
                  />
                  <path
                    d="M5 11a7 7 0 0 0 14 0"
                    stroke="#14161C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>
              <span id="dg-status-text">{statusLabel[phase]}</span>
            </div>

            <div id="dg-messages">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`dg-msg ${m.role === "user" ? "dg-msg-user" : "dg-msg-bot"}`}
                >
                  {m.role === "bot" && (
                    <span className="dg-label">SUPPORT</span>
                  )}
                  <span>{m.text}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {!showTyping ? (
              <div id="dg-callbar">
                <button
                  id="dg-end-btn"
                  onClick={endCall}
                  disabled={phase === "ended"}
                >
                  {phase === "ended" ? "Call ended" : "End call"}
                </button>
                <button
                  id="dg-type-toggle"
                  aria-label="Type instead"
                  onClick={() => setShowTyping(true)}
                >
                  ⌨
                </button>
              </div>
            ) : (
              <div id="dg-inputrow">
                <input
                  id="dg-input"
                  ref={inputRef}
                  type="text"
                  placeholder="Type your message..."
                  autoComplete="off"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button id="dg-send" onClick={handleTypeSubmit}>
                  Send
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
