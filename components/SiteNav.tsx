"use client";

import { useSite } from "@/lib/i18n";

const NAV_ITEMS = [
  { id: "work", key: "navWork" },
  { id: "about", key: "navAbout" },
  { id: "pipeline", key: "navPipeline" },
  { id: "contact", key: "navContact" },
] as const;

export default function SiteNav() {
  const { t, toggleLang } = useSite();

  return (
    <header className="nav nav--centre">
      <div className="wrap nav__bar">
        <a className="skip-link" href="#top">{t("skip")}</a>
        <a className="nav__logo" href="#top">{t("name")}</a>
        <nav className="nav__links" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <div className="nav__item" key={item.id}>
              <a className="nav__link" href={`#${item.id}`}>{t(item.key)}</a>
            </div>
          ))}
        </nav>
        <div className="nav__actions">
          <button className="nav__lang" type="button" onClick={toggleLang} aria-label="Switch language / 切换语言">
            {t("langOther")}
          </button>
          <a className="btn btn--primary" href="mailto:chenxiaoyou19@gmail.com">{t("ctaEmail")}</a>
        </div>
        <button className="nav__toggle" type="button" aria-expanded="false" aria-label={t("menuLabel")}>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </button>
      </div>
    </header>
  );
}
