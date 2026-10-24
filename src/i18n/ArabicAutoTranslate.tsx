import { useEffect, useRef } from "react";
import { useSiteLanguage } from "./LanguageContext";

// The UAE homepage already has a native Arabic copy. This runtime translator
// covers the other existing pages and lazily rendered components as well.
// Text entered by visitors and the live chat transcript are deliberately excluded.
const GOOGLE_TRANSLATE_ENDPOINT = "https://translate.googleapis.com/translate_a/single";
const CACHE_KEY = "deific-ar-translation-cache-v1";
const ATTRIBUTES_TO_TRANSLATE = ["placeholder", "title", "aria-label", "alt"] as const;
const SKIP_TEXT_SELECTOR =
  'script,style,noscript,textarea,input,pre,code,[contenteditable="true"],[translate="no"],[data-no-translate],#dg-messages';
const SKIP_ATTRIBUTE_SELECTOR =
  'script,style,noscript,[contenteditable="true"],[translate="no"],[data-no-translate],#dg-messages';

const OFFLINE_TRANSLATIONS: Record<string, string> = {
  home: "الرئيسية",
  about: "من نحن",
  services: "الخدمات",
  portfolio: "أعمالنا",
  products: "المنتجات",
  contact: "اتصل بنا",
  india: "الهند",
  uae: "الإمارات",
  "uae english": "الإمارات - الإنجليزية",
  "uae (english)": "الإمارات (الإنجليزية)",
  "uae عربي": "الإمارات - العربية",
  "uae (العربية)": "الإمارات (العربية)",
  "free automation audit": "استشارة مجانية للأتمتة",
  "free audit": "استشارة مجانية",
  "all products": "جميع المنتجات",
  company: "الشركة",
  regions: "المناطق",
  industries: "القطاعات",
  "ai agents": "وكلاء الذكاء الاصطناعي",
  "whatsapp us": "تواصل معنا عبر واتساب",
  "terms & conditions": "الشروط والأحكام",
  "privacy policy": "سياسة الخصوصية",
  "all rights reserved": "جميع الحقوق محفوظة",
  "page not found": "الصفحة غير موجودة",
  "open menu": "فتح القائمة",
  "close menu": "إغلاق القائمة",
  close: "إغلاق",
  call: "اتصال",
  whatsapp: "واتساب",
  "type your message...": "اكتب رسالتك...",
  "talk to our ai receptionist": "تحدث إلى موظف الاستقبال الذكي",
  "voice support": "الدعم الصوتي",
  "type instead": "اكتب بدلاً من التحدث",
  "start talking": "ابدأ التحدث",
  "digital agency": "وكالة رقمية",
  "send message": "إرسال الرسالة",
  "learn more": "اعرف المزيد",
  "read more": "اقرأ المزيد",
  "get started": "ابدأ الآن",
  "submit": "إرسال",
  "name": "الاسم",
  email: "البريد الإلكتروني",
  phone: "رقم الهاتف",
  message: "الرسالة",
  "your name": "اسمك",
  "your email": "بريدك الإلكتروني",
  "your phone": "رقم هاتفك",
};

type CachedTranslation = Record<string, string>;
type AttributeRecord = { original: string; applied?: string };

function loadCache(): CachedTranslation {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as CachedTranslation) : {};
  } catch {
    return {};
  }
}

function saveCache(cache: CachedTranslation) {
  try {
    // Keep storage bounded so a long browsing session cannot grow it endlessly.
    const entries = Object.entries(cache);
    const bounded = Object.fromEntries(entries.slice(-2500));
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(bounded));
  } catch {
    // Translation remains functional if storage is blocked or full.
  }
}

function fallbackTranslation(source: string) {
  return OFFLINE_TRANSLATIONS[source.trim().toLocaleLowerCase()] ?? source;
}

function hasArabic(text: string) {
  return /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/u.test(text);
}

function shouldSkipString(value: string) {
  const text = value.trim();
  if (!text || text.length < 2 || hasArabic(text)) return true;
  if (/^(?:[\d\s.,:+()/#%–—-]+)$/u.test(text)) return true;
  if (/^(?:https?:\/\/|www\.)/iu.test(text)) return true;
  if (/^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/iu.test(text)) return true;
  return false;
}

function shouldSkipTextNode(node: Text) {
  const parent = node.parentElement;
  if (!parent || !parent.isConnected) return true;
  if (parent.closest(SKIP_TEXT_SELECTOR)) return true;
  // Keep the legal brand spelling intact.
  if (parent.closest(".font-brand,[data-brand-name]")) return true;
  return false;
}

function getTextNodes(root: Node): Text[] {
  const result: Text[] = [];
  if (root.nodeType === Node.TEXT_NODE) {
    result.push(root as Text);
    return result;
  }
  if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return result;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return shouldSkipTextNode(node as Text) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    },
  });
  let current: Node | null;
  while ((current = walker.nextNode())) result.push(current as Text);
  return result;
}

async function translateOne(text: string): Promise<string> {
  const clean = text.trim();
  if (shouldSkipString(clean)) return text;

  // The public translation endpoint accepts fairly long strings, but shorter
  // chunks avoid oversized request URLs on legal pages and long paragraphs.
  if (clean.length > 650) {
    const sentences = clean.match(/[^.!?؟۔]+[.!?؟۔]*/gu) ?? [clean];
    if (sentences.length > 1) {
      const translated: string[] = [];
      let chunk = "";
      const chunks: string[] = [];
      for (const sentence of sentences) {
        if ((chunk + sentence).length > 550 && chunk) {
          chunks.push(chunk);
          chunk = "";
        }
        chunk += sentence;
      }
      if (chunk) chunks.push(chunk);
      for (const part of chunks) translated.push(await translateOne(part));
      const leading = text.match(/^\s*/u)?.[0] ?? "";
      const trailing = text.match(/\s*$/u)?.[0] ?? "";
      return `${leading}${translated.join("")}${trailing}`;
    }
  }

  try {
    const url = new URL(GOOGLE_TRANSLATE_ENDPOINT);
    url.searchParams.set("client", "gtx");
    url.searchParams.set("sl", "en");
    url.searchParams.set("tl", "ar");
    url.searchParams.set("dt", "t");
    url.searchParams.set("q", clean);
    const response = await fetch(url.toString(), { method: "GET", mode: "cors", credentials: "omit" });
    if (!response.ok) throw new Error(`Translation request failed (${response.status})`);
    const payload = (await response.json()) as unknown[];
    const pieces = Array.isArray(payload?.[0]) ? (payload[0] as unknown[]) : [];
    const result = pieces
      .map((piece) => (Array.isArray(piece) && typeof piece[0] === "string" ? piece[0] : ""))
      .join("");
    if (!result.trim()) throw new Error("Empty translation response");
    return result;
  } catch {
    return fallbackTranslation(text);
  }
}

export default function ArabicAutoTranslate() {
  const { language } = useSiteLanguage();
  const sessionRef = useRef<{
    textOriginals: Map<Text, string>;
    textApplied: Map<Text, string>;
    attributeRecords: Map<Element, Map<string, AttributeRecord>>;
    cache: CachedTranslation;
    loaded: boolean;
  }>({
    textOriginals: new Map(),
    textApplied: new Map(),
    attributeRecords: new Map(),
    cache: {},
    loaded: false,
  });

  useEffect(() => {
    const body = document.body;
    const session = sessionRef.current;
    const { textOriginals, textApplied, attributeRecords } = session;
    if (!session.loaded) {
      session.cache = loadCache();
      session.loaded = true;
    }
    const cache = session.cache;
    const pendingText = new Set<Text>();
    const pendingAttributes = new Set<Element>();
    let observer: MutationObserver | null = null;
    let flushTimer: number | undefined;
    let cancelled = false;
    let generation = 0;

    const rememberAttribute = (element: Element, name: string, current: string) => {
      let records = attributeRecords.get(element);
      if (!records) {
        records = new Map();
        attributeRecords.set(element, records);
      }
      let record = records.get(name);
      if (!record) {
        record = { original: current };
        records.set(name, record);
      } else if (record.applied !== undefined && current !== record.applied) {
        // React changed this attribute to a new source value.
        record.original = current;
        delete record.applied;
      }
      return record;
    };

    const addText = (root: Node) => {
      if (root.nodeType === Node.TEXT_NODE) {
        const textNode = root as Text;
        if (!shouldSkipTextNode(textNode)) pendingText.add(textNode);
        return;
      }
      for (const textNode of getTextNodes(root)) pendingText.add(textNode);
      if (root.nodeType === Node.ELEMENT_NODE) {
        const elements = [root as Element, ...Array.from((root as Element).querySelectorAll("*"))];
        for (const element of elements) {
          if (element.closest(SKIP_ATTRIBUTE_SELECTOR)) continue;
          if (element.matches("[data-no-translate]")) continue;
          if (ATTRIBUTES_TO_TRANSLATE.some((name) => element.hasAttribute(name))) pendingAttributes.add(element);
        }
      }
    };


    const releaseDisconnectedNodes = (root: Node) => {
      const textNodes: Text[] = [];
      const elements: Element[] = [];
      if (root.nodeType === Node.TEXT_NODE) textNodes.push(root as Text);
      if (root.nodeType === Node.ELEMENT_NODE) {
        elements.push(root as Element, ...Array.from((root as Element).querySelectorAll("*")));
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        let textNode: Node | null;
        while ((textNode = walker.nextNode())) textNodes.push(textNode as Text);
      }
      for (const node of textNodes) {
        if (!node.isConnected) {
          textOriginals.delete(node);
          textApplied.delete(node);
        }
      }
      for (const element of elements) {
        if (!element.isConnected) attributeRecords.delete(element);
      }
    };

    const translateTextNode = async (node: Text, run: number) => {
      if (!node.isConnected || shouldSkipTextNode(node)) return;
      const current = node.nodeValue ?? "";
      const previousApplied = textApplied.get(node);
      if (previousApplied === current) return;
      if (previousApplied !== undefined && current !== previousApplied) {
        // React has written a fresh source string into a previously translated node.
        textOriginals.set(node, current);
        textApplied.delete(node);
      } else if (!textOriginals.has(node)) {
        textOriginals.set(node, current);
      }

      const original = textOriginals.get(node) ?? current;
      if (shouldSkipString(original)) return;
      const leading = original.match(/^\s*/u)?.[0] ?? "";
      const trailing = original.match(/\s*$/u)?.[0] ?? "";
      const core = original.trim();
      const translatedCore = cache[core] ?? fallbackTranslation(core);
      let output = translatedCore;
      if (translatedCore === core) output = await translateOne(core);
      if (cancelled || run !== generation || !node.isConnected) return;
      if (output !== core) {
        cache[core] = output;
        node.nodeValue = `${leading}${output}${trailing}`;
        textApplied.set(node, node.nodeValue ?? "");
      }
    };

    const translateAttributes = async (element: Element, run: number) => {
      if (!element.isConnected || element.closest(SKIP_ATTRIBUTE_SELECTOR)) return;
      for (const name of ATTRIBUTES_TO_TRANSLATE) {
        if (!element.hasAttribute(name)) continue;
        const current = element.getAttribute(name) ?? "";
        const record = rememberAttribute(element, name, current);
        if (record.applied === current) continue;
        if (shouldSkipString(record.original)) continue;
        const source = record.original.trim();
        let output = cache[source] ?? fallbackTranslation(source);
        if (output === source) output = await translateOne(source);
        if (cancelled || run !== generation || !element.isConnected) return;
        if (output !== source) {
          cache[source] = output;
          element.setAttribute(name, output);
          record.applied = output;
        }
      }
    };

    const flush = async () => {
      flushTimer = undefined;
      if (cancelled || language !== "ar") return;
      const run = generation;
      const texts = Array.from(pendingText);
      const elements = Array.from(pendingAttributes);
      pendingText.clear();
      pendingAttributes.clear();
      let cursor = 0;
      const workers = Array.from({ length: 6 }, async () => {
        while (cursor < texts.length && !cancelled && run === generation) {
          const node = texts[cursor++];
          try {
            await translateTextNode(node, run);
          } catch {
            // Never block the page if an individual translation fails.
          }
        }
      });
      await Promise.all(workers);
      for (const element of elements) {
        if (cancelled || run !== generation) break;
        try {
          await translateAttributes(element, run);
        } catch {
          // Keep the source attribute when a translation fails.
        }
      }
      saveCache(cache);
      // Nodes inserted while requests were in flight are handled in another pass.
      if ((pendingText.size || pendingAttributes.size) && !cancelled) scheduleFlush();
    };

    const scheduleFlush = () => {
      if (flushTimer !== undefined || cancelled) return;
      flushTimer = window.setTimeout(() => void flush(), 70);
    };

    if (language !== "ar") {
      // Restore the original React-authored strings when the visitor switches back.
      generation++;
      for (const [node, original] of textOriginals) {
        if (node.isConnected && textApplied.has(node) && node.nodeValue === textApplied.get(node)) {
          node.nodeValue = original;
        }
      }
      for (const [element, records] of attributeRecords) {
        if (!element.isConnected) continue;
        for (const [name, record] of records) {
          if (record.applied !== undefined && element.getAttribute(name) === record.applied) {
            element.setAttribute(name, record.original);
          }
        }
      }
      return () => {
        cancelled = true;
        if (flushTimer !== undefined) window.clearTimeout(flushTimer);
      };
    }

    observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === "characterData") {
          const node = record.target as Text;
          if (!shouldSkipTextNode(node)) pendingText.add(node);
        } else if (record.type === "childList") {
          record.removedNodes.forEach(releaseDisconnectedNodes);
          record.addedNodes.forEach(addText);
        } else if (record.type === "attributes" && record.target instanceof Element) {
          pendingAttributes.add(record.target);
        }
      }
      scheduleFlush();
    });
    const observerOptions: MutationObserverInit = {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: [...ATTRIBUTES_TO_TRANSLATE],
    };
    observer.observe(body, observerOptions);
    observer.observe(document.head, observerOptions);

    addText(document.head);
    addText(body);
    scheduleFlush();

    return () => {
      cancelled = true;
      generation++;
      observer?.disconnect();
      if (flushTimer !== undefined) window.clearTimeout(flushTimer);
    };
  }, [language]);

  return null;
}
