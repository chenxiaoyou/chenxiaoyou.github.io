"use client";

import type { CSSProperties } from "react";
import { useSite } from "@/lib/i18n";

const POINTS = ["aboutPointOne", "aboutPointTwo", "aboutPointThree"] as const;

export default function About() {
  const { t } = useSite();

  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="section-tag"><span className="section-num">01</span><span>{t("navAbout")}</span></p>
          <h2 id="about-title" className="section-title">{t("aboutTitle")}</h2>
        </header>
        <div className="about-grid">
          <p className="about-copy" data-reveal>{t("aboutCopy")}</p>
          <div className="about-points" aria-label="关于我要点">
            {POINTS.map((key, index) => (
              <article
                className="about-point-card"
                key={key}
                data-reveal
                style={{ "--reveal-delay": `${0.05 + index * 0.07}s` } as CSSProperties}
              >
                <span className="point-index" aria-hidden="true">{`0${index + 1}`}</span>
                <p>{t(key)}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
