"use client";

import type { CSSProperties } from "react";
import { useSite } from "@/lib/i18n";

export default function Hero() {
  const { t } = useSite();

  const criteria = [
    { name: t("critRegression"), status: t("critOn"), live: true },
    { name: t("critGate"), status: t("critOn"), live: true },
    { name: t("critPatrol"), status: t("critOn"), live: true },
    { name: t("critEval"), status: t("critPlanned"), live: false },
  ];

  return (
    <section className="hero" id="hero" aria-labelledby="hero-h">
      <div className="container">
        <div className="report-meta" style={{ "--i": 0 } as CSSProperties}>
          <span>{t("metaSubject")} <strong>{t("name")}</strong></span>
          <span>{t("metaStatus")} <strong>{t("metaStatusValue")}</strong></span>
          <span className="is-role">{t("role")}</span>
          <time className="is-date" dateTime="2026-11">{t("metaDate")}</time>
          {/* CLIENT FILE 头像：public/assets/profile.png（客户提供） */}
          <img className="specimen" src="/assets/profile.png" alt={t("avatarAlt")} width="48" height="48" fetchPriority="high" />
        </div>
        <div className="hero__grid">
          <h1 id="hero-h" style={{ "--i": 1 } as CSSProperties}>{t("h1")}</h1>
          <p className="hero__lead" style={{ "--i": 2 } as CSSProperties}>
            {t("leadPrefix")}<strong>{t("leadStrong")}</strong>
          </p>
          <div className="btn-row" style={{ "--i": 3 } as CSSProperties}>
            <a className="btn btn--primary" href="mailto:chenxiaoyou19@gmail.com">{t("ctaEmail")}</a>
            <a className="btn btn--secondary" href="/assets/resume.pdf" download>{t("ctaResume")}</a>
          </div>
        </div>
        <dl className="criteria" style={{ "--i": 4 } as CSSProperties}>
          {criteria.map((item) => (
            <div key={item.name}>
              <dt>{item.name}</dt>
              <dd className={item.live ? "is-live" : undefined}>{item.status}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
