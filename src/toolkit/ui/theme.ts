export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "shokax-color-scheme";

function getStoredTheme(win: Window): ThemeMode | null {
  try {
    const stored = win.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch (err) {
    console.warn("[ShokaX] Unable to read theme from storage", err);
  }

  return null;
}

function getPreferredTheme(win: Window): ThemeMode {
  return win.matchMedia && win.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function applyTheme(doc: Document, theme: ThemeMode) {
  doc.documentElement.setAttribute("data-theme", theme);
}

export function initTheme(doc: Document, win: Window): ThemeMode {
  const theme = getStoredTheme(win) ?? getPreferredTheme(win);
  applyTheme(doc, theme);
  return theme;
}

function supportsViewTransitions(doc: Document): boolean {
  return "startViewTransition" in doc;
}

function prefersReducedMotion(win: Window): boolean {
  return win.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function toggleThemeWithTransition(
  doc: Document,
  win: Window,
  current: ThemeMode,
): ThemeMode {
  const next: ThemeMode = current === "dark" ? "light" : "dark";

  if (!supportsViewTransitions(doc) || prefersReducedMotion(win)) {
    applyTheme(doc, next);
    try {
      win.localStorage.setItem(STORAGE_KEY, next);
    } catch (err) {
      console.warn("[ShokaX] Unable to persist theme", err);
    }

    return next;
  }

  const transition = doc.startViewTransition(() => {
    applyTheme(doc, next);
  });

  transition.finished
    .then(() => {
      try {
        win.localStorage.setItem(STORAGE_KEY, next);
      } catch (err) {
        console.warn("[ShokaX] Unable to persist theme", err);
      }
    })
    .catch((err) => {
      console.warn("[ShokaX] Theme transition failed", err);
      try {
        win.localStorage.setItem(STORAGE_KEY, next);
      } catch (storageErr) {
        console.warn("[ShokaX] Unable to persist theme", storageErr);
      }
    });

  return next;
}

export function toggleTheme(doc: Document, win: Window, current: ThemeMode): ThemeMode {
  const next: ThemeMode = current === "dark" ? "light" : "dark";
  applyTheme(doc, next);

  try {
    win.localStorage.setItem(STORAGE_KEY, next);
  } catch (err) {
    console.warn("[ShokaX] Unable to persist theme", err);
  }

  return next;
}
