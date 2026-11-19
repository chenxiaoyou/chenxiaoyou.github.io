"use client";

import { useEffect } from "react";
import { useSite } from "@/lib/i18n";

const NAV_ITEMS = [
  { id: "about", key: "navAbout" },
  { id: "experience", key: "navExperience" },
  { id: "projects", key: "navProjects" },
  { id: "contact", key: "navContact" },
] as const;

export default function SiteNav() {
  const { t, lang, theme, toggleLang, toggleTheme } = useSite();

  // 导航 scrollspy：当前章节对应的锚点高亮
  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav]"));
    const targets = links
      .map((link) => document.getElementById(link.dataset.nav ?? ""))
      .filter((element): element is HTMLElement => element !== null);
    if (!("IntersectionObserver" in window) || targets.length === 0) return;
    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          links.forEach((link) => {
            link.classList.toggle("is-active", link.dataset.nav === entry.target.id);
          });
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    targets.forEach((target) => spy.observe(target));
    return () => spy.disconnect();
  }, []);

  const themeLabel = theme === "dark" ? t("themeLight") : t("themeDark");

  return (
    <header className="site-nav" aria-label="页面导航">
      <nav className="site-nav-inner" aria-label="主导航">
        <a className="brand" href="#hero">
          <span className="brand-mark" aria-hidden="true">辰</span>
          <span className="brand-name">{t("name")}</span>
        </a>
        <ul className="nav-links" aria-label="页面章节">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a className="nav-link" href={`#${item.id}`} data-nav={item.id}>
                {t(item.key)}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <a
            className="dock-button dock-icon resume-link"
            href="/assets/resume.pdf"
            download
            aria-label={t("dockResume")}
            title={t("dockResume")}
          >
            <span className="resume-icon" aria-hidden="true"></span>
          </a>
          <button
            className="dock-button dock-icon control-button theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
          >
            <span className="theme-icon" aria-hidden="true"></span>
          </button>
          <button
            className={`dock-button control-button lang-toggle${lang === "en" ? " is-active" : ""}`}
            type="button"
            onClick={toggleLang}
            aria-label={t("languageToggle")}
            title={t("languageToggle")}
          >
            {t("currentLanguageLabel")}
          </button>
        </div>
      </nav>
    </header>
  );
}
