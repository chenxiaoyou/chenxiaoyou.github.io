"use client";

import { useEffect, useRef, useState } from "react";
import { useSite } from "@/lib/i18n";

const NAV_ITEMS = [
  { id: "experience", key: "navExperience" },
  { id: "works", key: "navWorks" },
  { id: "contact", key: "navContact" },
] as const;

export default function SiteNav() {
  const { t, toggleLang } = useSite();
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const headerRef = useRef<HTMLElement | null>(null);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("site-theme", next);
    } catch {}
  };

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const mediaQuery = window.matchMedia("(min-width: 60.0625rem)");
    const onViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    mediaQuery.addEventListener("change", onViewportChange);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      mediaQuery.removeEventListener("change", onViewportChange);
    };
  }, [open]);

  useEffect(() => {
    const updateActive = () => {
      if (window.scrollY < 140) {
        setActiveId("");
        return;
      }
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 48;
      if (nearBottom) {
        setActiveId("contact");
        return;
      }
      const triggerLine = window.innerHeight * 0.32;
      let current = "";
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= triggerLine) {
          current = item.id;
        }
      }
      setActiveId(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  return (
    <header className="nav" ref={headerRef}>
      <div className="container nav__bar">
        <a className="skip-link" href="#top">{t("skip")}</a>
        <a
          className="wordmark"
          href="#top"
          aria-label={t("wordmarkAria")}
          onClick={() => setOpen(false)}
        >
          {t("name")}
        </a>
        <nav className="nav__links" aria-label={t("navMainAria")}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                className={`nav__link${isActive ? " is-active" : ""}`}
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
              >
                {t(item.key)}
              </a>
            );
          })}
        </nav>
        <div className="nav__actions">
          <a className="nav__cta nav__cta--ghost" href="/assets/resume.pdf" download aria-label={t("ctaResume")} title={t("ctaResume")}>
            <svg className="nav__cta-icon" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3v11m0 0 4.5-4.5M12 14l-4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4.5 20h15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </a>
          <a className="nav__cta nav__cta--fill" href="mailto:chenxiaoyou19@gmail.com" aria-label={t("ctaEmail")} title={t("ctaEmail")}>
            <svg className="nav__cta-icon" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="m3.5 7.5 8.5 5.5 8.5-5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <button
            className="nav__theme"
            type="button"
            onClick={toggleTheme}
            aria-label={t("themeToggleAria")}
            title={t("themeToggleAria")}
          >
            <svg className="icon-moon" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg className="icon-sun" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <button
            className="nav__lang"
            type="button"
            onClick={toggleLang}
            aria-label={t("langToggleAria")}
            title={t("langToggleAria")}
          >
            {t("langOther")}
          </button>
          <button
            className="nav__toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav-sheet"
            aria-label={t("menuLabel")}
            onClick={() => setOpen((value) => !value)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              {open
                ? <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                : <path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="nav__sheet" id="mobile-nav-sheet" aria-label={t("navMobileAria")}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                className={isActive ? "is-active" : undefined}
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setOpen(false)}
              >
                {t(item.key)}
              </a>
            );
          })}
        </nav>
      )}
    </header>
  );
}
