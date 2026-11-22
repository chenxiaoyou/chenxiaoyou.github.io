"use client";

import { useSite } from "@/lib/i18n";

export default function Hero() {
  const { t } = useSite();

  const criteria = [
    { name: t("critRegression"), status: t("critOn") },
    { name: t("critGate"), status: t("critOn") },
    { name: t("critPatrol"), status: t("critOn") },
    { name: t("critEval"), status: t("critPlanned") },
  ];

  return (
    <section className="hero" id="hero" aria-labelledby="hero-h">
      <div className="container">
        <div className="report-meta">
          <span>{t("metaSubject")} <strong>{t("name")}</strong></span>
          <span>{t("metaStatus")} <strong>{t("metaStatusValue")}</strong></span>
          <span className="is-role">{t("role")}</span>
          <time dateTime="2026-11">{t("metaDate")}</time>
        </div>
        <div className="hero__body">
          <div className="hero__body-main">
            <h1 id="hero-h">{t("h1")}</h1>
            <p className="hero__lead">
              <span className="is-role">{t("leadRole")}</span>
              {t("leadLine")}
            </p>
          </div>
          {/* 肖像：public/assets/profile.png（600×600 源图，展示 200px 级别仍锐利；可换真实肖像） */}
          <img
            className="portrait"
            src="/assets/profile.png"
            alt={t("avatarAlt")}
            width="200"
            height="200"
            fetchPriority="high"
          />
        </div>
        <dl className="criteria">
          {criteria.map((item) => (
            <div key={item.name}>
              <dt>{item.name}</dt>
              <dd>{item.status}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
