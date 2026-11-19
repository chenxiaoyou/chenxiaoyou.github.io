"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { useSite } from "@/lib/i18n";

const TECH_CARDS = [
  {
    titleKey: "techAutomationTitle",
    skills: [
      { icon: "PY", label: "Python", skillKey: "skillPython" },
      { icon: "PT", label: "Pytest", skillKey: "skillPytest" },
      { icon: "PW", label: "Playwright", skillKey: "skillPlaywright" },
      { icon: "SE", label: "Selenium", skillKey: "skillSelenium" },
    ],
  },
  {
    titleKey: "techEngineeringTitle",
    skills: [
      { icon: "JV", label: "Java", skillKey: "skillJava" },
      { icon: "GO", label: "Go", skillKey: "skillGo" },
      { icon: "TS", label: "TypeScript", skillKey: "skillTs" },
      { icon: "DB", label: "SQL", skillKey: "skillSql" },
    ],
  },
  {
    titleKey: "techCiTitle",
    skills: [
      { icon: "JN", label: "Jenkins", skillKey: "skillJenkins" },
      { icon: "CI", label: "GitLab CI", skillKey: "skillGitlab" },
      { icon: "DK", label: "Docker", skillKey: "skillDocker" },
      { icon: "LX", label: "Linux", skillKey: "skillLinux" },
    ],
  },
  {
    titleKey: "techReliabilityTitle",
    skills: [
      { icon: "PM", label: "Prometheus", skillKey: "skillPrometheus" },
      { icon: "GF", label: "Grafana", skillKey: "skillGrafana" },
      { icon: "LG", label: "日志分析", skillKey: "skillLog" },
      { icon: "AL", label: "告警巡检", skillKey: "skillAlert" },
    ],
  },
] as const;

export default function Experience() {
  const { t } = useSite();
  const [workExpanded, setWorkExpanded] = useState(false);

  return (
    <section className="section background-section" id="experience" aria-labelledby="experience-title">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="section-tag"><span className="section-num">02</span><span>{t("navExperience")}</span></p>
          <h2 id="experience-title" className="section-title">{t("expTitle")}</h2>
        </header>

        <div className="timeline" aria-label="工作与教育时间线">
          <article className="timeline-item" data-reveal>
            <div className="timeline-marker"><span className="marker-dot"></span></div>
            <div className="timeline-card">
              <div className="timeline-top">
                <div className="timeline-id">
                  <span className="badge badge-work">{t("badgeWork")}</span>
                  <span className="badge badge-current">{t("badgeCurrent")}</span>
                  <h3 className="timeline-org">
                    <span>{t("workBdName")}</span>
                    <a
                      className="org-arrow"
                      href="https://www.bytedance.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("workBdHome")}
                    >↗</a>
                  </h3>
                  <p className="timeline-role">{t("workBdRole")}</p>
                </div>
                <div className="timeline-meta">
                  <span className="timeline-date">{t("workBdDate")}</span>
                  <button
                    className={`detail-toggle${workExpanded ? " is-expanded" : ""}`}
                    type="button"
                    aria-controls="work-detail"
                    aria-expanded={workExpanded}
                    aria-label={t("workDetailToggle")}
                    onClick={() => setWorkExpanded((value) => !value)}
                  >›</button>
                </div>
              </div>
              <div className="timeline-detail terminal-detail" id="work-detail" hidden={!workExpanded}>
                <div className="terminal-line">
                  <span className="terminal-key terminal-key-problem">Problem</span>
                  <span>{t("workProblem")}</span>
                </div>
                <div className="terminal-line">
                  <span className="terminal-key terminal-key-action">Action</span>
                  <span>{t("workAction")}</span>
                </div>
                <div className="terminal-line">
                  <span className="terminal-key terminal-key-result">Result</span>
                  <span>{t("workResult")}</span>
                </div>
              </div>
            </div>
          </article>

          <article className="timeline-item" data-reveal style={{ "--reveal-delay": ".08s" } as CSSProperties}>
            <div className="timeline-marker"><span className="marker-dot"></span></div>
            <div className="timeline-card">
              <div className="timeline-top">
                <div className="timeline-id">
                  <span className="badge badge-edu">{t("badgeEdu")}</span>
                  <h3 className="timeline-org">
                    <span>{t("eduBuptName")}</span>
                    <a
                      className="org-arrow"
                      href="https://www.bupt.edu.cn/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("eduBuptHome")}
                    >↗</a>
                  </h3>
                  <p className="timeline-role">{t("eduBuptDesc")}</p>
                </div>
                <div className="timeline-meta">
                  <time className="timeline-date" dateTime="2018/2021">2018 - 2021</time>
                </div>
              </div>
            </div>
          </article>

          <article className="timeline-item" data-reveal style={{ "--reveal-delay": ".16s" } as CSSProperties}>
            <div className="timeline-marker"><span className="marker-dot"></span></div>
            <div className="timeline-card">
              <div className="timeline-top">
                <div className="timeline-id">
                  <span className="badge badge-edu">{t("badgeEdu")}</span>
                  <h3 className="timeline-org">
                    <span>{t("eduNjuptName")}</span>
                    <a
                      className="org-arrow"
                      href="https://www.njupt.edu.cn/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("eduNjuptHome")}
                    >↗</a>
                  </h3>
                  <p className="timeline-role">{t("eduNjuptDesc")}</p>
                </div>
                <div className="timeline-meta">
                  <time className="timeline-date" dateTime="2012/2016">2012 - 2016</time>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className="tech-stack">
          <h3 className="tech-heading">{t("techTitle")}</h3>
          <div className="tech-grid" aria-label="技术栈">
            {TECH_CARDS.map((card, index) => (
              <article
                className="tech-card"
                key={card.titleKey}
                data-reveal
                style={{ "--reveal-delay": `${index * 0.06}s` } as CSSProperties}
              >
                <h4>{t(card.titleKey)}</h4>
                <div className="tech-chip-list">
                  {card.skills.map((skill) => (
                    <span
                      className="tech-chip"
                      key={skill.label}
                      tabIndex={0}
                      data-icon={skill.icon}
                      data-skill={t(skill.skillKey)}
                    >
                      {skill.label}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
