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
          {/* CLIENT FILE 头像：public/assets/profile.png（客户提供，可换真实肖像） */}
          <img className="specimen" src="/assets/profile.png" alt={t("avatarAlt")} width="48" height="48" fetchPriority="high" />
        </div>
        <h1 id="hero-h">{t("h1")}</h1>
        <p className="hero__lead">
          <span className="is-role">{t("leadRole")}</span>
          {t("leadLine")}
        </p>
        <div className="btn-row">
          <a className="btn btn--primary" href="mailto:chenxiaoyou19@gmail.com">{t("ctaEmail")}</a>
          <a className="btn btn--secondary" href="/assets/resume.pdf" download>{t("ctaResume")}</a>
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
