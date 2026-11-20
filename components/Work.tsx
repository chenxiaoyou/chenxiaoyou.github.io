"use client";

import { useSite } from "@/lib/i18n";

function ToolIcon({ id, name }: { id: string; name: string }) {
  return <img className="ic ic-28" src={`/assets/icons/${id}.svg`} alt="" width="28" height="28" loading="lazy" />;
}

export default function Work() {
  const { t } = useSite();

  return (
    <section className="section g2" id="work" aria-labelledby="work-h">
      <div className="wrap">
        <div className="group">
          <div className="section-head">
            <h2 id="work-h">{t("workH")}</h2>
            <p>{t("workLine")}</p>
          </div>
          <div className="grid">
            <article className="card card--row card--open span-6">
              <h3>{t("workApiTitle")}</h3>
              <p>{t("workApiLine")} {t("workApiBody")}</p>
              <div className="panel">
                <div className="work-stack">
                  <ToolIcon id="python" name="Python" />
                  <span className="t-label">{t("tagPytest")}</span>
                  <ToolIcon id="jenkins" name="Jenkins" />
                  <span className="t-label">{t("tagAllure")}</span>
                </div>
              </div>
              <div className="work-foot">
                <span className="t-label muted">{t("workApiStatus")}</span>
                <a className="link" href="https://github.com/chenxiaoyou/api_auto_test" target="_blank" rel="noopener noreferrer">{t("workApiLink")}</a>
              </div>
            </article>

            <article className="card card--row card--open span-6">
              <h3>{t("workMewcodeTitle")}</h3>
              <p>{t("workMewcodeLine")} {t("workMewcodeBody")}</p>
              <div className="panel">
                <div className="work-tags">
                  <span className="work-tag">{t("tagAgentLoop")}</span>
                  <span className="work-tag">{t("tagTools")}</span>
                  <span className="work-tag">{t("tagMemory")}</span>
                </div>
              </div>
              <div className="work-foot">
                <span className="t-label muted">{t("workMewcodeStatus")}</span>
              </div>
            </article>
          </div>
        </div>
        <div className="grid">
          <article className="card card--row card--open span-6">
            <h3>{t("workMewhelpTitle")}</h3>
            <p>{t("workMewhelpLine")} {t("workMewhelpBody")}</p>
            <div className="panel">
              <div className="work-stack">
                <ToolIcon id="langfuse" name="Langfuse" />
                <span className="t-label">{t("tagRag")}</span>
                <span className="t-label">{t("tagRetrieval")}</span>
              </div>
            </div>
            <div className="work-foot">
              <span className="t-label muted">{t("workMewhelpStatus")}</span>
            </div>
          </article>

          <article className="card card--row card--open span-6">
            <h3>{t("workEvalTitle")}</h3>
            <p>{t("workEvalLine")} {t("workEvalBody")}</p>
            <div className="panel">
              <div className="work-tags">
                <span className="work-tag">{t("tagEvalSet")}</span>
                <span className="work-tag">{t("tagMetrics")}</span>
                <span className="work-tag">{t("tagLlmJudge")}</span>
              </div>
            </div>
            <div className="work-foot">
              <span className="t-label muted">{t("workEvalStatus")}</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
