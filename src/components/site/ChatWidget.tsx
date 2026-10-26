// import { useState, useEffect, useRef } from "react";

// // ============================================================
// // CONFIG — set this in your .env file if your backend isn't
// // served under the same domain at /ai.
// // Vite:  VITE_AI_BACKEND_URL=https://www.deificdigital.com/ai
// // If not set, defaults to "/ai" (same-domain via the Nginx route).
// // ============================================================
// const API_BASE: string =
//   (import.meta as any)?.env?.VITE_AI_BACKEND_URL || "/ai";

// type Role = "user" | "bot";
// interface ChatMessage {
//   role: Role;
//   text: string;
// }

// // call = the live hands-free voice loop's current phase
// type CallPhase = "connecting" | "speaking" | "listening" | "thinking" | "ended";
// type PanelView = "closed" | "intro" | "live";

// export default function ChatWidget() {
//   const [view, setView] = useState<PanelView>("closed");
//   const [phase, setPhase] = useState<CallPhase>("connecting");
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [input, setInput] = useState<string>("");
//   const [showTyping, setShowTyping] = useState<boolean>(false); // fallback text input toggle
//   const [micSupported, setMicSupported] = useState<boolean>(true);

//   const sessionIdRef = useRef<string>("");
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const recognitionRef = useRef<any>(null);
//   const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
//   const continuousRef = useRef<boolean>(false); // true while the hands-free loop should keep going
//   const phaseRef = useRef<CallPhase>("connecting");

//   useEffect(() => {
//     phaseRef.current = phase;
//   }, [phase]);

//   // Session id: persisted per browser tab session
//   useEffect(() => {
//     let id = sessionStorage.getItem("dg_session_id");
//     if (!id) {
//       id = crypto.randomUUID();
//       sessionStorage.setItem("dg_session_id", id);
//     }
//     sessionIdRef.current = id;
//   }, []);

//   // Preload speech synthesis voices
//   useEffect(() => {
//     const load = () => {
//       voicesRef.current = window.speechSynthesis.getVoices();
//     };
//     load();
//     window.speechSynthesis.onvoiceschanged = load;
//   }, []);

//   // Setup speech recognition (mic)
//   useEffect(() => {
//     const SpeechRecognition =
//       (window as any).SpeechRecognition ||
//       (window as any).webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       setMicSupported(false);
//       return;
//     }
//     const rec = new SpeechRecognition();
//     rec.lang = "en-IN";
//     rec.interimResults = false;
//     rec.maxAlternatives = 1;

//     rec.onstart = () => setPhase("listening");

//     rec.onresult = (event: any) => {
//       const transcript = event.results[0][0].transcript;
//       handleUserTurn(transcript);
//     };

//     rec.onerror = () => {
//       // mic error (e.g. silence timeout) — if still in the live call, just retry listening
//       if (continuousRef.current) {
//         try {
//           rec.start();
//         } catch {
//           /* already starting */
//         }
//       }
//     };

//     rec.onend = () => {
//       // Browser auto-stops after one utterance. If we're mid hands-free call
//       // and not already about to speak/think, restart listening automatically.
//       if (continuousRef.current && phaseRef.current === "listening") {
//         try {
//           rec.start();
//         } catch {
//           /* ignore */
//         }
//       }
//     };

//     recognitionRef.current = rec;
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   function detectSpeechLang(text: string) {
//     return /[\u0900-\u097F]/.test(text) ? "hi-IN" : "en-IN";
//   }

//   function pickFemaleVoice(targetLang: string) {
//     const voices = voicesRef.current;
//     const femaleHints = [
//       "neerja",
//       "swara",
//       "heera",
//       "kalpana",
//       "lekha",
//       "veena",
//       "priya",
//       "female",
//       "google हिन्दी",
//       "zira",
//       "samantha",
//       "moira",
//       "tessa",
//     ];
//     const langPrefix = targetLang.split("-")[0].toLowerCase(); // "en" or "hi"

//     const exactLang = voices.filter(
//       (v) => v.lang.toLowerCase() === targetLang.toLowerCase(),
//     );
//     // 🔧 FIX: same-language voices (any region), not just exact locale match
//     const samePrefix = voices.filter((v) =>
//       v.lang.toLowerCase().startsWith(langPrefix),
//     );
//     const indianLang = voices.filter((v) => /^(hi-in|en-in)$/i.test(v.lang));

//     for (const pool of [exactLang, indianLang, samePrefix]) {
//       if (!pool.length) continue;
//       const match = pool.find((v) =>
//         femaleHints.some((h) => v.name.toLowerCase().includes(h)),
//       );
//       if (match) return match;
//     }

//     // 🔧 FIX: final fallback must stay within the SAME language — never fall
//     // back to an unrelated language voice (e.g. Assamese for English text)
//     const fallbackPool = samePrefix.length
//       ? samePrefix
//       : exactLang.length
//         ? exactLang
//         : voices.filter((v) => v.lang.toLowerCase().startsWith("en"));

//     return (
//       fallbackPool.find((v) => !/male/i.test(v.name)) ||
//       fallbackPool[0] ||
//       voices.find((v) => v.lang.toLowerCase().startsWith("en")) ||
//       voices[0] ||
//       null
//     );
//   }

//   // Speaks the text, then (if the hands-free loop is still active) automatically
//   // starts listening again — this is what removes the "tap every time" problem.
//   //
//   // 🔧 ANDROID FIX: Chrome on Android has two known quirks with speechSynthesis:
//   //   1) calling speak() immediately after cancel() can silently get dropped
//   //      (a small delay avoids the race).
//   //   2) long utterances (~15s+) can get auto-paused by the browser mid-speech
//   //      and never resume on their own — a periodic pause()/resume() nudge
//   //      ("watchdog") keeps it alive until it actually finishes.
//   function speakThenListen(text: string) {
//     setPhase("speaking");
//     const targetLang = detectSpeechLang(text);
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.rate = 1.0;
//     utter.pitch = 1.05;
//     utter.lang = targetLang;
//     const voice = pickFemaleVoice(targetLang);
//     if (voice) {
//       utter.voice = voice;
//       utter.lang = voice.lang;
//     }

//     let watchdog: any = null;

//     utter.onstart = () => {
//       watchdog = setInterval(() => {
//         if (window.speechSynthesis.speaking) {
//           window.speechSynthesis.pause();
//           window.speechSynthesis.resume();
//         }
//       }, 4000);
//     };

//     const cleanup = () => {
//       if (watchdog) clearInterval(watchdog);
//       watchdog = null;
//     };

//     utter.onend = () => {
//       cleanup();
//       if (continuousRef.current) startListening();
//     };
//     utter.onerror = () => {
//       cleanup();
//       if (continuousRef.current) startListening();
//     };

//     window.speechSynthesis.cancel();
//     setTimeout(() => {
//       window.speechSynthesis.speak(utter);
//     }, 120);
//   }

//   function startListening() {
//     if (!recognitionRef.current || !continuousRef.current) return;
//     setPhase("listening");
//     try {
//       recognitionRef.current.start();
//     } catch {
//       /* recognition may already be running — ignore */
//     }
//   }

//   // Called by the mic button on the intro screen. Starts the whole hands-free call.
//   //
//   // 🔧 ANDROID FIX: fire a near-silent "primer" utterance synchronously inside
//   // this tap-gesture handler, before any await. This unlocks the speech engine
//   // on Android Chrome so that the *real* reply (spoken later, after the fetch
//   // resolves) is reliably allowed to play instead of being silently blocked.
//   const startCall = async () => {
//     continuousRef.current = true;
//     setView("live");
//     setPhase("connecting");
//     setMessages([]);

//     // try {
//     //   const primer = new SpeechSynthesisUtterance(" ");
//     //   primer.volume = 0;
//     //   window.speechSynthesis.speak(primer);
//     // } catch {
//     //   /* ignore */
//     // }

//     try {
//       const res = await fetch(`${API_BASE}/web/start`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ sessionId: sessionIdRef.current }),
//       });
//       const data = await res.json();
//       setMessages([{ role: "bot", text: data.reply }]);
//       speakThenListen(data.reply);
//     } catch {
//       const msg = "Connection error — please try again in a moment.";
//       setMessages([{ role: "bot", text: msg }]);
//       setPhase("ended");
//       continuousRef.current = false;
//     }
//   };

//   // Called with the transcript once the user has finished speaking (or typed text).
//   const handleUserTurn = async (text: string) => {
//     const trimmed = text.trim();
//     if (!trimmed) {
//       if (continuousRef.current) startListening();
//       return;
//     }
//     setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
//     setPhase("thinking");
//     try {
//       const res = await fetch(`${API_BASE}/web/chat`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           sessionId: sessionIdRef.current,
//           message: trimmed,
//         }),
//       });
//       const data = await res.json();
//       const reply: string =
//         data.reply || "Sorry, kuch gadbad hui. Dobara try karein.";
//       setMessages((prev) => [...prev, { role: "bot", text: reply }]);
//       speakThenListen(reply);
//     } catch {
//       const msg = "Connection error — please try again in a moment.";
//       setMessages((prev) => [...prev, { role: "bot", text: msg }]);
//       if (continuousRef.current) startListening();
//     }
//   };

//   const endCall = () => {
//     continuousRef.current = false;
//     window.speechSynthesis.cancel();
//     try {
//       recognitionRef.current?.stop();
//     } catch {
//       /* ignore */
//     }
//     setPhase("ended");
//   };

//   const closePanel = () => {
//     endCall();
//     setView("closed");
//   };

//   const handleTypeSubmit = () => {
//     const text = input.trim();
//     if (!text) return;
//     setInput("");
//     window.speechSynthesis.cancel();
//     try {
//       recognitionRef.current?.stop();
//     } catch {
//       /* ignore */
//     }
//     handleUserTurn(text);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") handleTypeSubmit();
//   };

//   const statusLabel: Record<CallPhase, string> = {
//     connecting: "Connecting…",
//     speaking: "SUPPORT is speaking…",
//     listening: "Listening…",
//     thinking: "Thinking…",
//     ended: "Call ended",
//   };

//   return (
//     <>
//       <style dangerouslySetInnerHTML={{ __html: `
//         :root {
//           --dg-bg: #14161C;
//           --dg-panel: #1C1F27;
//           --dg-border: #2B2F3A;
//           --dg-text: #E8E9ED;
//           --dg-muted: #8A8F9C;
//           --dg-accent: #FF5A36;
//           --dg-user-bubble: #2A2E38;
//           --dg-mono: 'IBM Plex Mono', 'Courier New', monospace;
//           --dg-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
//         }
//         #dg-launcher {
//           position: fixed; bottom: 24px; right: 24px; width: 58px; height: 58px;
//           border-radius: 50%; background: var(--dg-accent); border: none;
//           color: #14161C; display: flex; align-items: center; justify-content: center; cursor: pointer;
//           box-shadow: 0 8px 24px rgba(255,90,54,0.4); z-index: 999998; transition: transform 0.15s ease;
//         }
//         #dg-launcher:hover { transform: scale(1.06); }
//         #dg-launcher-ring {
//           position: absolute; inset: 0; border-radius: 50%;
//           border: 2px solid var(--dg-accent); animation: dg-pulse 2.2s ease-out infinite;
//           pointer-events: none;
//         }
//         @keyframes dg-pulse { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.6); opacity: 0; } }
//         #dg-launcher-badge {
//           position: absolute; top: -2px; right: -2px; width: 14px; height: 14px;
//           border-radius: 50%; background: #22C55E; border: 2px solid var(--dg-bg);
//         }

//         #dg-window {
//           position: fixed; bottom: 96px; right: 24px; width: 360px; max-width: calc(100vw - 32px);
//           height: 480px; max-height: calc(100vh - 140px); background: var(--dg-panel);
//           border: 1px solid var(--dg-border); border-radius: 16px; display: flex; flex-direction: column;
//           overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.5); z-index: 999999;
//           font-family: var(--dg-sans); opacity: 0; transform: translateY(12px);
//           transition: opacity 0.2s ease, transform 0.2s ease; pointer-events: none;
//         }
//         #dg-window.dg-open { opacity: 1; transform: translateY(0); pointer-events: auto; }
//         #dg-header {
//           background: var(--dg-bg); border-bottom: 1px solid var(--dg-border); padding: 14px 16px;
//           display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;
//         }
//         #dg-header-title { font-family: var(--dg-mono); font-size: 13px; color: var(--dg-text); display: flex; align-items: center; gap: 8px; }
//         .dg-cursor { color: var(--dg-accent); animation: dg-blink 1.1s steps(1) infinite; }
//         @keyframes dg-blink { 50% { opacity: 0; } }
//         #dg-close { background: none; border: none; color: var(--dg-muted); font-size: 18px; cursor: pointer; line-height: 1; padding: 4px; }
//         #dg-close:hover { color: var(--dg-text); }

//         /* ---- Intro screen: voice-first onboarding ---- */
//         #dg-intro { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; padding: 24px; text-align: center; }
//         #dg-intro-orb {
//           width: 84px; height: 84px; border-radius: 50%; background: var(--dg-accent);
//           display: flex; align-items: center; justify-content: center; color: #14161C;
//           cursor: pointer; border: none; box-shadow: 0 8px 30px rgba(255,90,54,0.45); position: relative;
//         }
//         #dg-intro-orb::after {
//           content: ""; position: absolute; inset: -8px; border-radius: 50%; border: 2px solid var(--dg-accent);
//           animation: dg-pulse 2.2s ease-out infinite;
//         }
//         #dg-intro h3 { color: var(--dg-text); font-size: 15px; margin: 0; font-family: var(--dg-mono); }
//         #dg-intro p { color: var(--dg-muted); font-size: 12.5px; line-height: 1.6; margin: 0; max-width: 240px; }

//         /* ---- Live call view ---- */
//         #dg-call-status { padding: 18px 16px 10px; display: flex; flex-direction: column; align-items: center; gap: 10px; flex-shrink: 0; }
//         #dg-orb {
//           width: 56px; height: 56px; border-radius: 50%; background: var(--dg-accent);
//           display: flex; align-items: center; justify-content: center; color: #14161C; position: relative;
//         }
//         #dg-orb.dg-orb-listening { animation: dg-orb-pulse 1.1s ease-in-out infinite; }
//         #dg-orb.dg-orb-thinking { opacity: 0.55; }
//         #dg-orb.dg-orb-speaking { animation: dg-orb-speak 0.5s ease-in-out infinite alternate; }
//         @keyframes dg-orb-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(255,90,54,0.5); } 50% { box-shadow: 0 0 0 12px rgba(255,90,54,0); } }
//         @keyframes dg-orb-speak { from { transform: scale(1); } to { transform: scale(1.08); } }
//         #dg-status-text { font-family: var(--dg-mono); font-size: 11.5px; color: var(--dg-muted); letter-spacing: 0.03em; }

//         #dg-messages { flex: 1; overflow-y: auto; padding: 8px 16px 16px; display: flex; flex-direction: column; gap: 10px; }
//         .dg-msg { max-width: 85%; font-size: 13.5px; line-height: 1.5; }
//         .dg-msg-user { align-self: flex-end; background: var(--dg-user-bubble); color: var(--dg-text); padding: 8px 12px; border-radius: 10px 10px 2px 10px; }
//         .dg-msg-user::before { content: "> "; color: var(--dg-accent); font-family: var(--dg-mono); }
//         .dg-msg-bot { align-self: flex-start; color: var(--dg-text); padding: 8px 0; }
//         .dg-label { display: block; font-family: var(--dg-mono); font-size: 10.5px; color: var(--dg-muted); margin-bottom: 3px; letter-spacing: 0.03em; }

//         #dg-callbar { border-top: 1px solid var(--dg-border); padding: 10px; display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
//         #dg-end-btn {
//           flex: 1; background: transparent; border: 1px solid var(--dg-border); color: var(--dg-muted);
//           border-radius: 8px; padding: 9px; font-size: 12.5px; font-family: var(--dg-mono); cursor: pointer;
//         }
//         #dg-end-btn:hover { color: var(--dg-text); border-color: var(--dg-accent); }
//         #dg-type-toggle {
//           background: transparent; border: 1px solid var(--dg-border); color: var(--dg-muted);
//           border-radius: 8px; width: 38px; height: 38px; cursor: pointer; font-size: 14px; flex-shrink: 0;
//         }
//         #dg-type-toggle:hover { color: var(--dg-text); }

//         #dg-inputrow { border-top: 1px solid var(--dg-border); padding: 10px; display: flex; gap: 8px; flex-shrink: 0; }
//         #dg-input {
//           flex: 1; background: var(--dg-bg); border: 1px solid var(--dg-border); border-radius: 8px;
//           color: var(--dg-text); padding: 10px 12px; font-size: 13.5px; font-family: var(--dg-sans); outline: none;
//         }
//         #dg-input:focus { border-color: var(--dg-accent); }
//         #dg-send { background: var(--dg-accent); border: none; color: #14161C; font-weight: 600; font-size: 13px; border-radius: 8px; padding: 0 16px; cursor: pointer; }

//         @media (prefers-reduced-motion: reduce) {
//           #dg-window { transition: none; }
//           #dg-launcher-ring, #dg-intro-orb::after, #dg-orb.dg-orb-listening, #dg-orb.dg-orb-speaking { animation: none; }
//           .dg-cursor { animation: none; }
//         }
//       ` }} />

//       {/* ---- Launcher: mic-style icon, signals "voice" at a glance ---- */}
//       <button
//         id="dg-launcher"
//         aria-label="Talk to our AI receptionist"
//         onClick={() => setView("intro")}
//       >
//         {view === "closed" && <span id="dg-launcher-ring" />}
//         {view === "closed" && <span id="dg-launcher-badge" />}
//         <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//           <rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor" />
//           <path
//             d="M5 11a7 7 0 0 0 14 0"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             fill="none"
//           />
//           <line
//             x1="12"
//             y1="18"
//             x2="12"
//             y2="22"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//           />
//           <line
//             x1="8"
//             y1="22"
//             x2="16"
//             y2="22"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//           />
//         </svg>
//       </button>

//       <div
//         id="dg-window"
//         className={view !== "closed" ? "dg-open" : ""}
//         role="dialog"
//         aria-label="Voice support"
//       >
//         <div id="dg-header">
//           <div id="dg-header-title">
//             Support Deific Digital<span className="dg-cursor">_</span>
//           </div>
//           <button id="dg-close" aria-label="Close" onClick={closePanel}>
//             &times;
//           </button>
//         </div>

//         {/* ---- INTRO: shown before the call starts, explains the voice UX ---- */}
//         {view === "intro" && (
//           <div id="dg-intro">
//             <button
//               id="dg-intro-orb"
//               aria-label="Start talking"
//               onClick={startCall}
//             >
//               <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
//                 <rect x="9" y="2" width="6" height="12" rx="3" fill="#14161C" />
//                 <path
//                   d="M5 11a7 7 0 0 0 14 0"
//                   stroke="#14161C"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   fill="none"
//                 />
//               </svg>
//             </button>
//             <h3>Tap to talk</h3>
//             <p>
//               This is a voice assistant — tap once and just speak naturally.
//               It'll listen, reply out loud, and keep listening automatically. No
//               need to tap again between turns.
//             </p>
//           </div>
//         )}

//         {/* ---- LIVE: the hands-free call, with a growing transcript ---- */}
//         {view === "live" && (
//           <>
//             <div id="dg-call-status">
//               <div
//                 id="dg-orb"
//                 className={
//                   phase === "listening"
//                     ? "dg-orb-listening"
//                     : phase === "speaking"
//                       ? "dg-orb-speaking"
//                       : phase === "thinking"
//                         ? "dg-orb-thinking"
//                         : ""
//                 }
//               >
//                 <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//                   <rect
//                     x="9"
//                     y="2"
//                     width="6"
//                     height="12"
//                     rx="3"
//                     fill="#14161C"
//                   />
//                   <path
//                     d="M5 11a7 7 0 0 0 14 0"
//                     stroke="#14161C"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     fill="none"
//                   />
//                 </svg>
//               </div>
//               <span id="dg-status-text">{statusLabel[phase]}</span>
//             </div>

//             <div id="dg-messages">
//               {messages.map((m, i) => (
//                 <div
//                   key={i}
//                   className={`dg-msg ${m.role === "user" ? "dg-msg-user" : "dg-msg-bot"}`}
//                 >
//                   {m.role === "bot" && (
//                     <span className="dg-label">SUPPORT</span>
//                   )}
//                   <span>{m.text}</span>
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>

//             {!showTyping ? (
//               <div id="dg-callbar">
//                 <button
//                   id="dg-end-btn"
//                   onClick={endCall}
//                   disabled={phase === "ended"}
//                 >
//                   {phase === "ended" ? "Call ended" : "End call"}
//                 </button>
//                 <button
//                   id="dg-type-toggle"
//                   aria-label="Type instead"
//                   onClick={() => setShowTyping(true)}
//                 >
//                   ⌨
//                 </button>
//               </div>
//             ) : (
//               <div id="dg-inputrow">
//                 <input
//                   id="dg-input"
//                   ref={inputRef}
//                   type="text"
//                   placeholder="Type your message..."
//                   autoComplete="off"
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   onKeyDown={handleKeyDown}
//                 />
//                 <button id="dg-send" onClick={handleTypeSubmit}>
//                   Send
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </>
//   );
// }
import { useState, useEffect, useRef } from "react";

// ============================================================
// CONFIG — Backend API URL
// ============================================================
const API_BASE: string =
  (import.meta as any)?.env?.VITE_AI_BACKEND_URL || "https://chatbot-qpnn.onrender.com";

type CallPhase = "connecting" | "speaking" | "listening" | "thinking" | "ended";
type PanelView = "closed" | "live";

export default function ChatWidget() {
  const [view, setView] = useState<PanelView>("closed");
  const [phase, setPhase] = useState<CallPhase>("connecting");
  const [micVolume, setMicVolume] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const micVolumeRef = useRef<number>(0);
  const phaseRef = useRef<CallPhase>("connecting");
  const isMutedRef = useRef<boolean>(false);

  const sessionIdRef = useRef<string>("");
  const recognitionRef = useRef<any>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const continuousRef = useRef<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Persistent MediaStream & Web Audio VAD
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const vadIntervalRef = useRef<any>(null);
  const silenceTimerRef = useRef<any>(null);
  const speechSilenceTimerRef = useRef<any>(null);
  const latestSpeechTextRef = useRef<string>("");
  const speechDetectedRef = useRef<boolean>(false);
  const isProcessingTurnRef = useRef<boolean>(false);
  const isRecordingRef = useRef<boolean>(false);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    micVolumeRef.current = micVolume;
  }, [micVolume]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

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

  // ============================================================
  // EXACT SMARTDUKAAN SINE WAVE CANVAS VISUALIZER
  // ============================================================
  useEffect(() => {
    if (view === "closed") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const waves = [
      {
        freq: 0.014,
        amp: 24,
        phase: 0,
        speed: 0.075,
        color: {
          connecting: "rgba(251, 191, 36, 0.18)",
          listening: "rgba(52, 211, 153, 0.22)",
          speaking: "rgba(244, 63, 94, 0.22)",
          thinking: "rgba(192, 132, 252, 0.22)",
          idle: "rgba(168, 85, 247, 0.18)",
        },
        stroke: {
          connecting: "#fbbf24",
          listening: "#34d399",
          speaking: "#f43f5e",
          thinking: "#c084fc",
          idle: "#a855f7",
        },
        lineWidth: 2,
      },
      {
        freq: 0.022,
        amp: 18,
        phase: 1.5,
        speed: -0.06,
        color: {
          connecting: "rgba(245, 158, 11, 0.15)",
          listening: "rgba(45, 212, 191, 0.18)",
          speaking: "rgba(236, 72, 153, 0.18)",
          thinking: "rgba(139, 92, 246, 0.18)",
          idle: "rgba(59, 130, 246, 0.15)",
        },
        stroke: {
          connecting: "#f59e0b",
          listening: "#2dd4bf",
          speaking: "#ec4899",
          thinking: "#8b5cf6",
          idle: "#3b82f6",
        },
        lineWidth: 1.8,
      },
      {
        freq: 0.009,
        amp: 28,
        phase: 3.0,
        speed: 0.045,
        color: {
          connecting: "rgba(217, 119, 6, 0.18)",
          listening: "rgba(16, 185, 129, 0.20)",
          speaking: "rgba(225, 29, 72, 0.22)",
          thinking: "rgba(168, 85, 247, 0.20)",
          idle: "rgba(236, 72, 153, 0.18)",
        },
        stroke: {
          connecting: "#d97706",
          listening: "#10b981",
          speaking: "#e11d48",
          thinking: "#a855f7",
          idle: "#ec4899",
        },
        lineWidth: 2.2,
      },
      {
        freq: 0.028,
        amp: 12,
        phase: 4.5,
        speed: -0.085,
        color: {
          connecting: "rgba(255, 255, 255, 0.22)",
          listening: "rgba(255, 255, 255, 0.25)",
          speaking: "rgba(255, 255, 255, 0.25)",
          thinking: "rgba(255, 255, 255, 0.25)",
          idle: "rgba(255, 255, 255, 0.20)",
        },
        stroke: {
          connecting: "#ffffff",
          listening: "#ffffff",
          speaking: "#ffffff",
          thinking: "#ffffff",
          idle: "#ffffff",
        },
        lineWidth: 1.5,
      },
    ];

    const glowColors: Record<string, string> = {
      connecting: "rgba(251, 191, 36, 0.20)",
      listening: "rgba(52, 211, 153, 0.24)",
      speaking: "rgba(244, 63, 94, 0.25)",
      thinking: "rgba(192, 132, 252, 0.24)",
      idle: "rgba(168, 85, 247, 0.20)",
    };

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      if (width <= 0 || height <= 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "screen";

      let state: "connecting" | "listening" | "speaking" | "thinking" | "idle" = "idle";
      const curPhase = phaseRef.current;
      const muted = isMutedRef.current;

      if (muted || curPhase === "ended") {
        state = "idle";
      } else if (curPhase === "listening") {
        state = "listening";
      } else if (curPhase === "speaking") {
        state = "speaking";
      } else if (curPhase === "thinking") {
        state = "thinking";
      } else if (curPhase === "connecting") {
        state = "connecting";
      }

      const vol = micVolumeRef.current;
      const ampScale =
        1 + (curPhase === "listening" ? vol * 3.2 : curPhase === "speaking" ? 1.0 : 0.15);
      const yc = height / 2;

      waves.forEach((w) => {
        w.phase += w.speed;

        ctx.beginPath();
        ctx.moveTo(0, yc);

        for (let x = 0; x <= width; x += 2) {
          const t = x / width;
          // Exact SmartDukaan quadratic envelope curve
          const env = Math.pow(Math.sin(t * Math.PI), 2);
          const y = yc + w.amp * ampScale * env * Math.sin(x * w.freq + w.phase);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, yc);
        ctx.closePath();

        ctx.fillStyle = w.color[state] || w.color.idle;
        ctx.fill();

        ctx.strokeStyle = w.stroke[state] || w.stroke.idle;
        ctx.lineWidth = w.lineWidth;
        ctx.stroke();
      });

      // Radiant central glow matching SmartDukaan
      const grad = ctx.createRadialGradient(width / 2, yc, 10, width / 2, yc, width / 2.5);
      grad.addColorStop(0, glowColors[state] || glowColors.idle);
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animId);
    };
  }, [view]);

  // ============================================================
  // WEB SPEECH RECOGNITION (PARALLEL ULTRA-FAST STT)
  // ============================================================
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      const rec = new SpeechRecognition();
      rec.lang = "en-US";
      rec.interimResults = true;
      rec.continuous = true;
      rec.maxAlternatives = 1;

      rec.onresult = (event: any) => {
        let final = "";
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const item = event.results[i];
          if (item.isFinal) {
            final += item[0].transcript;
          } else {
            interim += item[0].transcript;
          }
        }

        const heard = (final || interim).trim();
        if (heard) {
          latestSpeechTextRef.current = heard;
          speechDetectedRef.current = true;
        }

        // Fast immediate trigger on isFinal if Chrome emits it early
        if (
          final.trim() &&
          phaseRef.current === "listening" &&
          !isProcessingTurnRef.current &&
          !isMutedRef.current
        ) {
          clearTimeout(speechSilenceTimerRef.current);
          isProcessingTurnRef.current = true;
          const text = final.trim();
          latestSpeechTextRef.current = "";
          stopListeningSession();
          handleUserTurn(text);
          return;
        }

        // Fast 380ms silence debounce for interim speech:
        // Eliminates Chrome's 2.5s delay! The second the user stops talking,
        // it triggers the turn after only 380ms of silence!
        if (heard && phaseRef.current === "listening" && !isMutedRef.current) {
          clearTimeout(speechSilenceTimerRef.current);
          speechSilenceTimerRef.current = setTimeout(() => {
            const currentText = latestSpeechTextRef.current.trim();
            if (
              currentText &&
              phaseRef.current === "listening" &&
              !isProcessingTurnRef.current &&
              !isMutedRef.current
            ) {
              isProcessingTurnRef.current = true;
              latestSpeechTextRef.current = "";
              stopListeningSession();
              handleUserTurn(currentText);
            }
          }, 380);
        }
      };

      rec.onerror = (e: any) => {
        console.log("[speech-rec] notice:", e?.error);
      };

      rec.onend = () => {
        if (
          continuousRef.current &&
          phaseRef.current === "listening" &&
          !isProcessingTurnRef.current &&
          !isMutedRef.current
        ) {
          try { rec.start(); } catch { }
        }
      };

      recognitionRef.current = rec;
    } catch (e) {
      console.warn("[speech-rec] init skipped:", e);
    }

    return () => {
      try {
        recognitionRef.current?.stop();
      } catch { }
    };
  }, []);

  function pickFemaleVoice(targetLang: string) {
    const voices = voicesRef.current;
    const femaleHints = [
      "neerja", "swara", "heera", "kalpana", "lekha",
      "veena", "priya", "female", "zira", "samantha", "moira", "tessa",
    ];
    const langPrefix = targetLang.split("-")[0].toLowerCase();

    const exactLang = voices.filter(
      (v) => v.lang.toLowerCase() === targetLang.toLowerCase(),
    );
    const samePrefix = voices.filter((v) =>
      v.lang.toLowerCase().startsWith(langPrefix),
    );
    const indianLang = voices.filter((v) => /^(en-in|hi-in)$/i.test(v.lang));

    for (const pool of [exactLang, indianLang, samePrefix]) {
      if (!pool.length) continue;
      const match = pool.find((v) =>
        femaleHints.some((h) => v.name.toLowerCase().includes(h)),
      );
      if (match) return match;
    }

    const fallbackPool = samePrefix.length ? samePrefix : voices;
    return (
      fallbackPool.find((v) => !/male/i.test(v.name)) ||
      fallbackPool[0] ||
      null
    );
  }

  function fallbackSpeech(text: string, onFinish: () => void) {
    if (!("speechSynthesis" in window)) {
      onFinish();
      return;
    }
    const spoken = text.replace(/\bDeific\b/gi, "Deeific");
    const utter = new SpeechSynthesisUtterance(spoken);
    utter.rate = 1.0;
    utter.pitch = 1.05;
    utter.lang = "en-IN";
    const voice = pickFemaleVoice("en-IN");
    if (voice) {
      utter.voice = voice;
    }

    utter.onend = () => onFinish();
    utter.onerror = () => onFinish();

    try {
      window.speechSynthesis.cancel();
      setTimeout(() => {
        window.speechSynthesis.speak(utter);
      }, 50);
    } catch {
      onFinish();
    }
  }

  function playAudioBase64(base64: string, fallbackText: string) {
    if (isMutedRef.current) return;
    setPhase("speaking");
    let finished = false;
    const watchdog = setTimeout(() => {
      if (!finished && continuousRef.current) {
        finished = true;
        startListeningSession();
      }
    }, Math.min(Math.max(fallbackText.length * 85, 4500), 12000));

    const onFinish = () => {
      if (finished) return;
      finished = true;
      clearTimeout(watchdog);
      if (continuousRef.current && !isMutedRef.current) {
        startListeningSession();
      }
    };

    try {
      const audio = audioRef.current || new Audio();
      audioRef.current = audio;
      audio.src = `data:audio/mpeg;base64,${base64}`;
      audio.onended = () => onFinish();
      audio.onerror = () => {
        fallbackSpeech(fallbackText, onFinish);
      };
      const p = audio.play();
      if (p && p.catch) {
        p.catch(() => {
          fallbackSpeech(fallbackText, onFinish);
        });
      }
    } catch {
      fallbackSpeech(fallbackText, onFinish);
    }
  }

  // Sends recorded voice audio to backend unified /web/turn endpoint (Whisper -> Groq LLM -> ElevenLabs)
  async function processRecordedAudio(blob: Blob) {
    if (isMutedRef.current) return;
    if (!blob || blob.size < 1200) {
      if (continuousRef.current && phaseRef.current === "listening" && !isMutedRef.current) {
        setTimeout(() => startListeningSession(), 120);
      }
      return;
    }

    isProcessingTurnRef.current = true;
    setPhase("thinking");

    // 1. Unified low-latency turn endpoint
    try {
      const res = await fetch(`${API_BASE}/web/turn`, {
        method: "POST",
        headers: {
          "Content-Type": blob.type || "audio/webm",
          "X-Session-Id": sessionIdRef.current,
        },
        body: blob,
      });

      if (res.ok) {
        const data = await res.json();
        const reply = (data.reply || "").trim();

        if (data.audioBase64) {
          playAudioBase64(data.audioBase64, reply);
          return;
        } else if (reply) {
          speakThenListen(reply);
          return;
        }
      }
    } catch (err) {
      console.warn("[turn] endpoint notice:", err);
    }

    // 2. Fallback to /stt + /chat if unified turn was unavailable
    try {
      const res = await fetch(`${API_BASE}/web/stt`, {
        method: "POST",
        headers: {
          "Content-Type": blob.type || "audio/webm",
        },
        body: blob,
      });

      if (res.ok) {
        const data = await res.json();
        const transcribedText = (data.text || "").trim();
        if (transcribedText.length > 0) {
          await handleUserTurn(transcribedText);
          return;
        }
      }
    } catch (err) {
      console.warn("[stt] error:", err);
    }

    if (continuousRef.current && !isMutedRef.current) {
      isProcessingTurnRef.current = false;
      startListeningSession();
    }
  }

  function stopListeningSession() {
    clearInterval(vadIntervalRef.current);
    clearTimeout(silenceTimerRef.current);
    silenceTimerRef.current = null;
    clearTimeout(speechSilenceTimerRef.current);
    speechSilenceTimerRef.current = null;
    setMicVolume(0);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      try {
        mediaRecorderRef.current.stop();
      } catch { }
    }
    isRecordingRef.current = false;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch { }
    }
  }

  function startListeningSession() {
    if (!continuousRef.current) return;
    if (isRecordingRef.current) return;
    if (isMutedRef.current) return;

    const stream = streamRef.current;
    if (!stream || !stream.active) {
      startCall();
      return;
    }

    setPhase("listening");
    speechDetectedRef.current = false;
    isProcessingTurnRef.current = false;
    audioChunksRef.current = [];

    let mimeType = "audio/webm;codecs=opus";
    if (typeof MediaRecorder !== "undefined") {
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        if (MediaRecorder.isTypeSupported("audio/webm")) {
          mimeType = "audio/webm";
        } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
          mimeType = "audio/mp4";
        } else {
          mimeType = "";
        }
      }
    }

    try {
      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        isRecordingRef.current = false;
        clearInterval(vadIntervalRef.current);
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
        setMicVolume(0);

        if (!isProcessingTurnRef.current && !isMutedRef.current) {
          const chunks = audioChunksRef.current;
          if (chunks.length > 0 && speechDetectedRef.current) {
            const blob = new Blob(chunks, { type: recorder.mimeType || "audio/webm" });
            await processRecordedAudio(blob);
          } else {
            if (continuousRef.current && phaseRef.current === "listening" && !isMutedRef.current) {
              setTimeout(() => startListeningSession(), 120);
            }
          }
        }
      };

      recorder.start(100);
      isRecordingRef.current = true;
      mediaRecorderRef.current = recorder;
    } catch (err) {
      console.warn("[mediaRecorder] error:", err);
    }

    // Web Audio VAD: fast 40ms audio poll + ~320ms silence turnaround
    const analyser = analyserRef.current;
    if (analyser) {
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      clearInterval(vadIntervalRef.current);
      vadIntervalRef.current = setInterval(() => {
        if (phaseRef.current !== "listening" || !isRecordingRef.current || isMutedRef.current) {
          return;
        }
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        const normalized = avg / 110;
        setMicVolume(Math.min(1, normalized));

        // Detect user speech above background threshold
        if (avg > 13) {
          speechDetectedRef.current = true;
          clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = null;
        } else if (speechDetectedRef.current && !silenceTimerRef.current) {
          silenceTimerRef.current = setTimeout(() => {
            if (isRecordingRef.current && mediaRecorderRef.current?.state === "recording") {
              try {
                mediaRecorderRef.current.stop();
              } catch { }
            }
          }, 320);
        }
      }, 40);
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch { }
    }
  }

  // Speaks AI reply using ElevenLabs via backend, falling back to browser neural voice
  async function speakThenListen(text: string) {
    if (isMutedRef.current) return;
    stopListeningSession();
    setPhase("speaking");

    let finished = false;
    const watchdog = setTimeout(() => {
      if (!finished && continuousRef.current) {
        finished = true;
        startListeningSession();
      }
    }, Math.min(Math.max(text.length * 85, 4500), 12000));

    const onFinish = () => {
      if (finished) return;
      finished = true;
      clearTimeout(watchdog);
      if (continuousRef.current && !isMutedRef.current) {
        startListeningSession();
      }
    };

    // 1. Try ElevenLabs TTS audio from backend
    try {
      const controller = new AbortController();
      const fetchTimer = setTimeout(() => controller.abort(), 6500);

      const res = await fetch(`${API_BASE}/web/tts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
        signal: controller.signal,
      });
      clearTimeout(fetchTimer);

      if (res.ok) {
        const blob = await res.blob();
        const audioUrl = URL.createObjectURL(blob);
        const audio = audioRef.current || new Audio();
        audioRef.current = audio;
        audio.src = audioUrl;

        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          onFinish();
        };
        audio.onerror = () => {
          URL.revokeObjectURL(audioUrl);
          onFinish();
        };

        const playPromise = audio.play();
        if (playPromise && playPromise.catch) {
          playPromise.catch(() => {
            URL.revokeObjectURL(audioUrl);
            fallbackSpeech(text, onFinish);
          });
        }
        return;
      }
    } catch {
      // Fallback
    }

    // 2. Fallback to browser neural voice
    fallbackSpeech(text, onFinish);
  }

  // Called to start hands-free call on launcher click
  const startCall = async () => {
    continuousRef.current = true;
    setIsMuted(false);
    setView("live");
    setPhase("connecting");

    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    try {
      audioRef.current.src =
        "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
      const p = audioRef.current.play();
      if (p && p.catch) p.catch(() => { });
    } catch { }

    // Request & persist microphone stream
    let stream = streamRef.current;
    if (!stream || !stream.active) {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
        streamRef.current = stream;
      } catch (e) {
        console.warn("[mic] permission denied:", e);
        setPhase("ended");
        return;
      }
    }

    // Initialize Web Audio context for VAD
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx && !audioContextRef.current) {
        const ctx = new AudioCtx();
        if (ctx.state === "suspended") {
          await ctx.resume();
        }
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        audioContextRef.current = ctx;
        analyserRef.current = analyser;
      }
    } catch (e) {
      console.warn("[audio-ctx] error:", e);
    }

    // Immediate greeting without waiting for extra network roundtrip
    const greeting =
      "Hello! Welcome to Deific Digital. I am your AI assistant. How can I assist you today?";
    speakThenListen(greeting);

    // Register session on backend asynchronously (saves to DB in background)
    fetch(`${API_BASE}/web/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: sessionIdRef.current }),
    }).catch(() => { });
  };

  // Called with user speech text -> sends to /web/chat (saves to DB in background)
  const handleUserTurn = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      if (continuousRef.current && !isMutedRef.current) startListeningSession();
      return;
    }
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
        data.reply ||
        "I am here to help you with Deific Digital's services. What would you like to know?";

      if (data.audioBase64) {
        playAudioBase64(data.audioBase64, reply);
      } else {
        speakThenListen(reply);
      }
    } catch {
      const msg = "Sorry, connection error. Please try again.";
      speakThenListen(msg);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      // Resume / unmute
      setIsMuted(false);
      isMutedRef.current = false;
      if (continuousRef.current) {
        startListeningSession();
      }
    } else {
      // Mute / pause
      setIsMuted(true);
      isMutedRef.current = true;
      stopListeningSession();
      if (audioRef.current) {
        try { audioRef.current.pause(); } catch { }
      }
      window.speechSynthesis.cancel();
      setPhase("listening");
    }
  };

  const endCall = () => {
    continuousRef.current = false;
    stopListeningSession();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch { }
      audioContextRef.current = null;
    }
    if (audioRef.current) {
      try {
        audioRef.current.pause();
      } catch { }
      audioRef.current = null;
    }
    window.speechSynthesis.cancel();
    setPhase("ended");
    setMicVolume(0);
    setIsMuted(false);
  };

  const closePanel = () => {
    endCall();
    setView("closed");
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        /* ── SmartDukaan Exact Liquid-Blob Launcher ── */
        #sd-chat-fab {
          position: fixed; right: 28px; bottom: 28px; width: 58px; height: 58px;
          border-radius: 50%; color: #fff; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center; z-index: 99998;
          transition: transform .2s ease, box-shadow .2s ease;
          background: linear-gradient(135deg, #ff8a5b, #e2253b 55%, #b3122a);
          animation: sd-blob 6s ease-in-out infinite, sd-blobGlow 3s ease-in-out infinite;
        }
        #sd-chat-fab:hover { transform: scale(1.08); }
        @keyframes sd-blob {
          0%, 100% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
          50% { border-radius: 70% 30% 45% 55% / 55% 60% 40% 45%; }
        }
        @keyframes sd-blobGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(226,37,59,.45), 0 4px 16px rgba(226,37,59,.4); }
          50% { box-shadow: 0 0 0 8px rgba(226,37,59,0), 0 6px 22px rgba(226,37,59,.55); }
        }
        #sd-chat-fab .sd-mic {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 5;
        }
        #sd-chat-fab .sd-mic svg { width: 25px; height: 25px; fill: #fff; display: block; }
        #sd-chat-badge {
          position: absolute; top: -2px; right: -2px; width: 14px; height: 14px;
          border-radius: 50%; background: #10B981; border: 2.5px solid #fff; z-index: 6;
        }

        /* ── SmartDukaan Exact Cosmic Dark Glassmorphic Container ── */
        #sd-chat-container {
          position: fixed; right: 20px; bottom: 88px; width: 380px; max-width: calc(100vw - 32px);
          height: 560px; max-height: calc(100vh - 110px);
          background:
            radial-gradient(ellipse 80% 60% at 10% 20%, rgba(211,47,47,.20), transparent 60%),
            radial-gradient(ellipse 70% 60% at 90% 10%, rgba(59,130,246,.20), transparent 65%),
            radial-gradient(ellipse 80% 70% at 50% 90%, rgba(139,92,246,.25), transparent 60%),
            #0b0b14 !important;
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          backdrop-filter: blur(28px) saturate(180%);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.08);
          display: flex; flex-direction: column; overflow: hidden;
          z-index: 99999; font-family: 'Poppins', system-ui, -apple-system, sans-serif;
          animation: sd-modalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes sd-modalIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── SmartDukaan Glowing Aurora Outer Ring ── */
        .sd-aurora {
          position: absolute; inset: -2px; border-radius: 26px; pointer-events: none;
          background: conic-gradient(from 0deg, #ff4d6d, #7928ca, #0070f3, #00dfd8, #ff4d6d);
          opacity: 0.32; filter: blur(12px); -webkit-filter: blur(12px);
          z-index: 1; animation: sd-auroraSpin 14s linear infinite;
        }
        @keyframes sd-auroraSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* ── Top Status Pill ── */
        .sd-voice-status {
          position: absolute; top: 18px; left: 50%; transform: translateX(-50%);
          font-size: 12px; letter-spacing: .4px; font-weight: 500;
          color: rgba(255, 255, 255, 0.85);
          background: rgba(255, 255, 255, 0.12);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          backdrop-filter: blur(20px) saturate(180%);
          padding: 6px 16px; border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 6px 20px rgba(0,0,0,.25);
          z-index: 10; pointer-events: none;
          white-space: nowrap; max-width: calc(100% - 70px); text-align: center;
          transition: all 0.3s ease;
        }
        .sd-voice-status.listening { color: #34d399; border-color: rgba(52, 211, 153, 0.35); }
        .sd-voice-status.speaking { color: #f43f5e; border-color: rgba(244, 63, 94, 0.35); }
        .sd-voice-status.thinking { color: #c084fc; border-color: rgba(192, 132, 252, 0.35); }
        .sd-voice-status.muted { color: #fbbf24; border-color: rgba(251, 191, 36, 0.35); }

        /* ── Top-Right Close Button (✕) ── */
        .sd-voice-x {
          position: absolute; top: 16px; right: 16px; z-index: 10;
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(255, 255, 255, 0.14); border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center;
          font-size: 16px; font-weight: 600; transition: transform .15s ease, background .15s ease;
        }
        .sd-voice-x:hover { transform: scale(1.08); background: rgba(255, 255, 255, 0.28); }

        /* ── Center Stage Visualizer ── */
        .sd-wave-container {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
          width: 100%; padding: 0 20px; z-index: 5; gap: 12px;
        }

        /* ── SmartDukaan Center Mic Circle Outline with State Glow ── */
        .sd-mic-circle-outline {
          width: 78px; height: 78px; border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.18);
          background: radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 80%);
          display: flex; align-items: center; justify-content: center;
          color: #a855f7; box-shadow: 0 0 22px rgba(168, 85, 247, 0.2);
          transition: border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer; pointer-events: auto;
        }
        .sd-mic-circle-outline:hover { transform: scale(1.04); }
        .sd-mic-circle-outline.listening {
          color: #34d399; border-color: rgba(52, 211, 153, 0.6); box-shadow: 0 0 28px rgba(52, 211, 153, 0.45);
        }
        .sd-mic-circle-outline.speaking {
          color: #f43f5e; border-color: rgba(244, 63, 94, 0.6); box-shadow: 0 0 28px rgba(244, 63, 94, 0.45);
        }
        .sd-mic-circle-outline.thinking {
          color: #c084fc; border-color: rgba(192, 132, 252, 0.6); box-shadow: 0 0 28px rgba(192, 132, 252, 0.45);
        }
        .sd-mic-circle-outline.muted {
          color: #f43f5e !important; border-color: rgba(244, 63, 94, 0.7) !important;
          box-shadow: 0 0 28px rgba(244, 63, 94, 0.45) !important;
          background: radial-gradient(circle, rgba(244, 63, 94, 0.16) 0%, transparent 80%) !important;
        }
        .sd-mic-circle-outline svg {
          width: 32px; height: 32px; stroke-linecap: round; stroke-linejoin: round; fill: none;
        }

        .sd-voice-assistant-title {
          font-size: 16px; font-weight: 300; letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.85); text-transform: lowercase; margin-bottom: 2px;
        }
        .sd-voice-assistant-sub {
          font-size: 13px; font-weight: 300; letter-spacing: 2.5px;
          color: rgba(255, 255, 255, 0.5); text-transform: lowercase; margin-top: 6px;
        }

        #sd-wave-canvas {
          width: 100%; height: 120px; display: block;
        }
      `}} />

      {/* ── Liquid-Blob Animated Launcher Button ── */}
      <button
        id="sd-chat-fab"
        className="sd-voice-launcher"
        onClick={() => {
          if (view === "live") {
            closePanel();
          } else {
            startCall();
          }
        }}
        aria-label="Deific Voice Assistant"
      >
        <span className="sd-mic">
          {view === "live" ? (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M6 6l12 12M18 6l-12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          )}
        </span>
        <span id="sd-chat-badge" />
      </button>

      {/* ── Exact SmartDukaan Cosmic Dark AI Voice Assistant Modal ── */}
      <div
        id="sd-chat-container"
        style={{ display: view === "live" ? "flex" : "none" }}
      >
        {/* Animated Aurora Edge */}
        <div className="sd-aurora" />

        {/* Top Status Pill */}
        <div
          className={`sd-voice-status ${isMuted || phase === "ended"
              ? "muted"
              : phase === "listening"
                ? "listening"
                : phase === "speaking"
                  ? "speaking"
                  : phase === "thinking"
                    ? "thinking"
                    : "connecting"
            }`}
        >
          {isMuted || phase === "ended"
            ? "Muted — tap mic to resume"
            : phase === "listening"
              ? micVolume > 0.12
                ? "Hearing voice…"
                : "Speak naturally"
              : phase === "speaking"
                ? "Speaking…"
                : phase === "thinking"
                  ? "Thinking…"
                  : "Connecting…"}
        </div>

        {/* Top-Right Glass Close Button (✕) */}
        <button className="sd-voice-x" aria-label="Close" onClick={closePanel}>
          ✕
        </button>

        {/* Center Stage Visualizer */}
        <div className="sd-wave-container">
          {/* SmartDukaan Mic Circle Outline Toggle */}
          <div
            className={`sd-mic-circle-outline ${isMuted || phase === "ended"
                ? "muted"
                : phase === "listening"
                  ? "listening"
                  : phase === "speaking"
                    ? "speaking"
                    : phase === "thinking"
                      ? "thinking"
                      : ""
              }`}
            onClick={toggleMute}
            title={isMuted ? "Tap to resume" : "Tap to mute"}
          >
            {isMuted ? (
              // SmartDukaan Muted Mic SVG
              <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="3" x2="21" y2="21" />
                <path d="M9 9v2a3 3 0 0 0 5.1 2.1M15 9.3V5a3 3 0 0 0-5.9-.6" />
                <path d="M18.9 13A7 7 0 0 1 5 11v-1" />
                <line x1="12" y1="19" x2="12" y2="22" />
              </svg>
            ) : (
              // SmartDukaan Active Mic SVG
              <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
                <line x1="12" y1="18" x2="12" y2="22" />
              </svg>
            )}
          </div>

          <div className="sd-voice-assistant-title">
            {isMuted ? "tap to resume" : "tap to mute"}
          </div>

          {/* Exact SmartDukaan Wave Canvas */}
          <canvas ref={canvasRef} id="sd-wave-canvas" />

          <div className="sd-voice-assistant-sub">
            voice assistant
          </div>
        </div>
      </div>
    </>
  );
}