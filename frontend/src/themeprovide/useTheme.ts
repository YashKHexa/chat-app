import { useState, useEffect } from "react";
import {
  readStoredThemePreference,
  SYSTEM_THEME_QUERY,
  THEME_CHANGE_EVENT,
  applyThemePreference,
  type ThemePreference,
} from "./theme";

export function useTheme() {
  const [theme, setThemeState] = useState<ThemePreference>(readStoredThemePreference);
  const [isDark, setIsDark] = useState<boolean>(() => {
    const pref = readStoredThemePreference();
    if (pref === "dark") return true;
    if (pref === "light") return false;
    return typeof window !== "undefined" && window.matchMedia(SYSTEM_THEME_QUERY).matches;
  });

  useEffect(() => {
    const update = () => {
      const pref = readStoredThemePreference();
      setThemeState(pref);
      const dark =
        pref === "dark" ||
        (pref === "system" && window.matchMedia(SYSTEM_THEME_QUERY).matches);
      setIsDark(dark);
      applyThemePreference(pref);
    };

    update();

    window.addEventListener(THEME_CHANGE_EVENT, update);
    window.addEventListener("storage", update);
    const media = window.matchMedia(SYSTEM_THEME_QUERY);
    media.addEventListener("change", update);

    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, update);
      window.removeEventListener("storage", update);
      media.removeEventListener("change", update);
    };
  }, []);

  return { theme, isDark };
}

