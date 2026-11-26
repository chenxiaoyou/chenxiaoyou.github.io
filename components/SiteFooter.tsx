"use client";

import { useEffect, useRef, useState } from "react";
import { useSite } from "@/lib/i18n";

const EMAIL = "chenxiaoyou19@gmail.com";

export default function SiteFooter() {
  const { t } = useSite();
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <footer className="footer" id="contact" aria-labelledby="close-h">
      <div className="container">
        <div className="footer__close">
          <h2 id="close-h">{t("closeH")}</h2>
          <p>{t("closeLine")}</p>
        </div>
        <div className="footer__contact">
          <a className="footer__mail" href="mailto:chenxiaoyou19@gmail.com">{EMAIL}</a>
          <button
            className={`footer__copy${copied ? " is-copied" : ""}`}
            type="button"
            onClick={handleCopyEmail}
            aria-live="polite"
          >
            {copied ? (
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                <path d="m3 8.5 3.2 3.2L13 4.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10.5 5.5V3.8A1.3 1.3 0 0 0 9.2 2.5H3.8A1.3 1.3 0 0 0 2.5 3.8v5.4a1.3 1.3 0 0 0 1.3 1.3h1.7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
            <span>{copied ? t("copiedEmail") : t("copyEmail")}</span>
          </button>
        </div>
        <ul className="footer__links">
          <li>
            <a href="/assets/resume.pdf" download>{t("ctaResume")}</a>
          </li>
          <li>
            <a href="https://github.com/chenxiaoyou" target="_blank" rel="noopener noreferrer">GitHub</a>
          </li>
          <li>
            <a href="#top">{t("footerTop")}</a>
          </li>
        </ul>
        <div className="footer__legal">
          <span>&copy; 2026 {t("name")}</span>
          <span>{t("footerLegal")}</span>
          <div className="socials">
            <a href="https://github.com/chenxiaoyou" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg className="ic ic-20" viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
