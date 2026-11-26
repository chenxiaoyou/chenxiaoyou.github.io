"use client";

import { useSite } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n";

const TAG_KEYS = ["tagRegression", "tagGate", "tagReliability"] as const satisfies readonly TranslationKey[];

export default function Hero() {
  const { t } = useSite();

  return (
    <section className="hero" id="hero" aria-labelledby="hero-h">
      <div className="container">
        <div className="hero__body">
          <img
            className="portrait"
            src="/assets/profile.png"
            alt={t("avatarAlt")}
            width="200"
            height="200"
            fetchPriority="high"
          />
          <div className="hero__body-main">
            <p className="hero__eyebrow">{t("heroEyebrow")}</p>
            <h1 id="hero-h">{t("h1")}</h1>
            <p className="hero__headline">{t("heroHeadline")}</p>
            <p className="hero__lead">{t("leadLine")}</p>
            <ul className="hero__tags" aria-label={t("heroTagsLabel")}>
              {TAG_KEYS.map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
            <blockquote className="hero__motto">
              <p>{t("motto")}</p>
            </blockquote>
            <div className="hero__actions">
              <a className="btn btn--primary" href="mailto:chenxiaoyou19@gmail.com">
                <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <path d="m3.5 7.5 8.5 5.5 8.5-5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t("ctaEmail")}
              </a>
              <a className="btn btn--ghost" href="/assets/resume.pdf" download>
                <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3v11m0 0 4.5-4.5M12 14l-4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4.5 20h15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                {t("ctaResume")}
              </a>
              <a className="btn btn--ghost" href="https://github.com/chenxiaoyou" target="_blank" rel="noopener noreferrer">
                GitHub
                <svg className="btn__arrow" width="13" height="13" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
