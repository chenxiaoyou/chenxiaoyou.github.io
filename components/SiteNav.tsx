"use client";

import { useState } from "react";
import { useSite } from "@/lib/i18n";

const NAV_ITEMS = [
  { id: "work", key: "navWork" },
  { id: "contact", key: "navContact" },
] as const;

export default function SiteNav() {
  const { t, toggleLang } = useSite();
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="container nav__bar">
        <a className="skip-link" href="#top">{t("skip")}</a>
        <a className="wordmark" href="#top" aria-label={`${t("name")}，回到页首`}>{t("name")}</a>
        <nav className="nav__links" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <a className="nav__link" key={item.id} href={`#${item.id}`}>{t(item.key)}</a>
          ))}
        </nav>
        <div className="nav__actions">
          <button
            className="nav__lang"
            type="button"
            onClick={toggleLang}
            aria-label="切换语言 Switch language"
          >
            {t("langOther")}
          </button>
          <button
            className="nav__toggle"
            type="button"
            aria-expanded={open}
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
        <nav className="nav__sheet" aria-label="Mobile">
          {NAV_ITEMS.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)}>{t(item.key)}</a>
          ))}
        </nav>
      )}
    </header>
  );
}
