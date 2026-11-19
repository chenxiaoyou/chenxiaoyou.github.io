"use client";

import type { CSSProperties } from "react";
import { useSite } from "@/lib/i18n";

export default function SiteFooter() {
  const { t } = useSite();

  return (
    <footer className="site-footer" id="contact" aria-labelledby="contact-title">
      <div className="container footer-inner">
        <p className="section-tag footer-tag" data-reveal>
          <span className="section-num">04</span><span>{t("navContact")}</span>
        </p>
        <h2 id="contact-title" className="footer-title" data-reveal style={{ "--reveal-delay": ".05s" } as CSSProperties}>
          {t("footerCta")}
        </h2>
        <p className="footer-sub" data-reveal style={{ "--reveal-delay": ".1s" } as CSSProperties}>
          {t("footerSub")}
        </p>
        <div className="footer-actions" data-reveal style={{ "--reveal-delay": ".15s" } as CSSProperties}>
          <a className="btn btn-primary" href="mailto:chenxiaoyou19@gmail.com">{t("footerEmailCta")}</a>
          <a
            className="btn btn-ghost"
            href="https://github.com/chenxiaoyou"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("ctaGithub")}
          >
            <svg className="btn-github-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M12 .6a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.4 5.9.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A12 12 0 0 0 12 .6Z" />
            </svg>
            <span>{t("ctaGithub")}</span>
          </a>
        </div>
        <ul className="footer-meta" data-reveal style={{ "--reveal-delay": ".2s" } as CSSProperties}>
          <li>
            <a href="https://github.com/chenxiaoyou" target="_blank" rel="noopener noreferrer">{t("dockGithub")}</a>
          </li>
          <li>
            <a href="mailto:chenxiaoyou19@gmail.com">{t("dockEmail")}</a>
          </li>
          <li>
            <a href="/assets/resume.pdf" download>{t("dockResume")}</a>
          </li>
        </ul>
        <p className="footer-copy">
          © 2026 {t("name")}
          <span>{t("footerBuilt")}</span>
        </p>
      </div>
    </footer>
  );
}
