import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";

export type SiteLanguage = "en" | "ar";
export type SiteRegion = "IN" | "AE" | "US";

type LanguageContextValue = {
  language: SiteLanguage;
  region: SiteRegion;
  setLanguage: (language: SiteLanguage) => void;
  setRegion: (region: SiteRegion) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const LANGUAGE_KEY = "deific-site-language";
const REGION_KEY = "deific-site-region";

function storedValue<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value && allowed.includes(value as T) ? (value as T) : fallback;
  } catch {
    return fallback;
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/, "") || "/";

  const [language, setLanguageState] = useState<SiteLanguage>(() =>
    path === "/uae/ar"
      ? "ar"
      : path === "/uae"
        ? "en"
        : storedValue(LANGUAGE_KEY, ["en", "ar"] as const, "en"),
  );
  const [region, setRegionState] = useState<SiteRegion>(() =>
    path === "/uae" || path.startsWith("/uae/")
      ? "AE"
      : path === "/usa"
        ? "US"
        : storedValue(REGION_KEY, ["IN", "AE", "US"] as const, "IN"),
  );

  const setLanguage = useCallback((next: SiteLanguage) => {
    setLanguageState(next);
    try {
      window.localStorage.setItem(LANGUAGE_KEY, next);
    } catch {
      // The language switch still works when browser storage is unavailable.
    }
  }, []);

  const setRegion = useCallback((next: SiteRegion) => {
    setRegionState(next);
    try {
      window.localStorage.setItem(REGION_KEY, next);
    } catch {
      // The region switch still works when browser storage is unavailable.
    }
  }, []);

  // Region landing routes are explicit entry points; regular content routes keep
  // the visitor's selected region/language instead of resetting it to English.
  useEffect(() => {
    if (path === "/uae/ar") {
      setRegion("AE");
      setLanguage("ar");
    } else if (path === "/uae") {
      setRegion("AE");
      setLanguage("en");
    } else if (path === "/") {
      setRegion("IN");
      setLanguage("en");
    } else if (path === "/usa") {
      setRegion("US");
      setLanguage("en");
    }
  }, [path, setLanguage, setRegion]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language === "ar" ? "ar-AE" : region === "AE" ? "en-AE" : region === "US" ? "en-US" : "en-IN";
    root.dir = language === "ar" ? "rtl" : "ltr";
    root.dataset.siteLanguage = language;
    root.dataset.siteRegion = region.toLowerCase();
  }, [language, region, path]);

  const value = useMemo(() => ({ language, region, setLanguage, setRegion }), [language, region, setLanguage, setRegion]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useSiteLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useSiteLanguage must be used inside LanguageProvider");
  return value;
}
