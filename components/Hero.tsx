"use client";

import { useSite } from "@/lib/i18n";

export default function Hero() {
  const { t } = useSite();

  return (
    <section className="hero hero--split" data-enter aria-labelledby="hero-h">
      <div className="wrap">
        <div className="hero-text grid hero__grid">
          <div className="hero__text span-5">
            <h1 id="hero-h">{t("h1")}</h1>
            <p className="hero__lead">{t("lead")}</p>
            <div className="btn-row">
              <a className="btn btn--primary" href="mailto:chenxiaoyou19@gmail.com">{t("ctaEmail")}</a>
              <a className="btn btn--secondary" href="/assets/resume.pdf" download>{t("ctaResume")}</a>
            </div>
          </div>
          <div className="hero__media span-6 start-7">
            {/* CLIENT FILE 头像：public/assets/profile.png（客户提供，示意头像） */}
            <img
              src="/assets/profile.png"
              alt={t("avatarAlt")}
              style={{ "--ly-pos": "50% 40%" } as React.CSSProperties}
              fetchPriority="high"
            />
            <div className="ly-float">
              <div className="ly-float__row"><span className="ly-live">{t("floatLive")}</span><span>{t("floatSince")}</span></div>
              <div className="ly-float__title">{t("floatTitle")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
