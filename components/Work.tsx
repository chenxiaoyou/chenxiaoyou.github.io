"use client";

import { useSite } from "@/lib/i18n";

function ToolIcon({ id }: { id: string }) {
  return <img className="ic ic-24" src={`/assets/icons/${id}.svg`} alt="" width="24" height="24" loading="lazy" />;
}

export default function Work() {
  const { t } = useSite();

  return (
    <section className="section" id="work" aria-labelledby="work-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="work-h">{t("workH")}</h2>
          <p>{t("workLine")}</p>
        </div>
        <div className="grid">
          <article className="card card--row card--open span-6">
            <h3>{t("workApiTitle")}</h3>
            <p>{t("workApiLine")} {t("workApiBody")}</p>
            <div className="work-stack">
              <span className="work-chip"><ToolIcon id="python" />{t("tagPytest")}</span>
              <span className="work-chip"><ToolIcon id="jenkins" />{t("tagAllure")}</span>
            </div>
            <div className="work-foot">
              <span className="t-label muted">{t("workApiStatus")}</span>
              <a className="link" href="https://github.com/chenxiaoyou/api_auto_test" target="_blank" rel="noopener noreferrer">{t("workApiLink")}</a>
            </div>
          </article>

          <article className="card card--row card--open span-6">
            <h3>{t("workMewcodeTitle")}</h3>
            <p>{t("workMewcodeLine")} {t("workMewcodeBody")}</p>
            <div className="work-stack">
              <span className="work-chip">{t("tagAgentLoop")}</span>
              <span className="work-chip">{t("tagTools")}</span>
              <span className="work-chip">{t("tagMemory")}</span>
            </div>
            <div className="work-foot">
              <span className="t-label muted">{t("workMewcodeStatus")}</span>
            </div>
          </article>

          <article className="card card--row card--open span-6">
            <h3>{t("workMewhelpTitle")}</h3>
            <p>{t("workMewhelpLine")} {t("workMewhelpBody")}</p>
            <div className="work-stack">
              <span className="work-chip"><ToolIcon id="langfuse" />{t("tagRetrieval")}</span>
              <span className="work-chip">{t("tagRag")}</span>
            </div>
            <div className="work-foot">
              <span className="t-label muted">{t("workMewhelpStatus")}</span>
            </div>
          </article>

          <article className="card card--row card--open span-6">
            <h3>{t("workEvalTitle")}</h3>
            <p>{t("workEvalLine")} {t("workEvalBody")}</p>
            <div className="work-stack">
              <span className="work-chip">{t("tagEvalSet")}</span>
              <span className="work-chip">{t("tagMetrics")}</span>
              <span className="work-chip">{t("tagLlmJudge")}</span>
            </div>
            <div className="work-foot">
              <span className="t-label muted">{t("workEvalStatus")}</span>
            </div>
          </article>
        </div>
        <p className="work-more">
          {t("workMore")}{" "}
          <a className="link" href="/assets/resume.pdf" download>{t("ctaResume")}</a>
        </p>
      </div>
    </section>
  );
}
