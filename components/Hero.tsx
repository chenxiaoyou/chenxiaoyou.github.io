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
                {t("ctaEmail")}
              </a>
              <a className="btn btn--ghost" href="/assets/resume.pdf" download>
                {t("ctaResume")}
              </a>
              <a className="btn btn--ghost" href="https://github.com/chenxiaoyou" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}