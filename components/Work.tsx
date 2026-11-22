"use client";

import { useSite } from "@/lib/i18n";

function ToolIcon({ id }: { id: string }) {
  return <img className="ic ic-24" src={`/assets/icons/${id}.svg`} alt="" width="24" height="24" loading="lazy" />;
}

const PROJECTS = [
  {
    titleKey: "workApiTitle",
    statusKey: "workApiStatus",
    lineKey: "workApiLine",
    bodyKey: "workApiBody",
    chips: [
      { icon: "python", label: "Pytest" },
      { icon: "jenkins", label: "Jenkins" },
      { label: "Allure" },
    ],
    href: "https://github.com/chenxiaoyou/api_auto_test",
    link: true,
  },
  {
    titleKey: "workMewcodeTitle",
    statusKey: "workMewcodeStatus",
    lineKey: "workMewcodeLine",
    bodyKey: "workMewcodeBody",
    chips: [
      { label: "Agent Loop" },
      { label: "Tools" },
      { label: "Memory" },
    ],
    href: null,
    link: false,
  },
  {
    titleKey: "workMewhelpTitle",
    statusKey: "workMewhelpStatus",
    lineKey: "workMewhelpLine",
    bodyKey: "workMewhelpBody",
    chips: [
      { icon: "langfuse", label: "RAG" },
      { label: "检索" },
    ],
    href: null,
    link: false,
  },
  {
    titleKey: "workEvalTitle",
    statusKey: "workEvalStatus",
    lineKey: "workEvalLine",
    bodyKey: "workEvalBody",
    chips: [
      { label: "评测集" },
      { label: "指标体系" },
      { label: "LLM-as-judge" },
    ],
    href: null,
    link: false,
  },
] as const;

type Chip = { icon?: string; label: string };

export default function Work() {
  const { t } = useSite();

  return (
    <section className="section work" id="work" aria-labelledby="work-h">
      <div className="container">
        <div className="section-head">
          <h2 id="work-h">{t("workH")}</h2>
          <p>{t("workLine")}</p>
        </div>
        <ol className="work-index">
          {PROJECTS.map((project) => (
            <li className="work-item" key={project.titleKey}>
              <div className="work-main">
                <div className="work-head">
                  <h3>{t(project.titleKey)}</h3>
                  <div className="work-stack">
                    {(project.chips as readonly Chip[]).map((chip) => (
                      <span className="work-chip" key={chip.label}>
                        {chip.icon ? <ToolIcon id={chip.icon} /> : null}
                        {chip.label}
                      </span>
                    ))}
                  </div>
                </div>
                <p>{t(project.lineKey)} {t(project.bodyKey)}</p>
              </div>
              <div className="work-foot">
                <span className="work-status">{t(project.statusKey)}</span>
                {project.href && (
                  <a className="link" href={project.href} target="_blank" rel="noopener noreferrer">
                    {t("projectRepoLink")}
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
        <div className="about-exp">
          <h3 className="about-exp-h">{t("expLabel")}</h3>
          <ul className="rows">
            <li>
              <span className="rows__name">{t("expBdName")}<small>{t("expBdSub")}</small></span>
              <span className="rows__value">{t("expBdValue")}</span>
            </li>
            <li>
              <span className="rows__name">{t("expBuptName")}<small>{t("expBuptSub")}</small></span>
              <span className="rows__value">{t("expBuptValue")}</span>
            </li>
            <li>
              <span className="rows__name">{t("expNjuptName")}<small>{t("expNjuptSub")}</small></span>
              <span className="rows__value">{t("expNjuptValue")}</span>
            </li>
          </ul>
        </div>
        <p className="work-more">
          {t("workMore")}
        </p>
      </div>
    </section>
  );
}
