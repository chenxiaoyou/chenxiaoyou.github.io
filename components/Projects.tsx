"use client";

import type { CSSProperties } from "react";
import { useSite } from "@/lib/i18n";

const PROJECTS = [
  {
    titleKey: "projectApiTitle",
    statusKey: "projectApiStatus",
    descKey: "projectApiDesc",
    tags: [
      { icon: "PY", label: "Python" },
      { icon: "PT", label: "Pytest" },
      { icon: "AL", label: "Allure" },
      { icon: "JN", label: "Jenkins" },
    ],
    href: "https://github.com/chenxiaoyou/api_auto_test",
    planned: false,
  },
  {
    titleKey: "projectMewcodeTitle",
    statusKey: "projectMewcodeStatus",
    descKey: "projectMewcodeDesc",
    tags: [
      { icon: "AG", label: "Agent Loop" },
      { icon: "TL", label: "Tools" },
      { icon: "ME", label: "Memory" },
      { icon: "TM", label: "Teams" },
    ],
    href: null,
    planned: false,
  },
  {
    titleKey: "projectMewhelpTitle",
    statusKey: "projectMewhelpStatus",
    descKey: "projectMewhelpDesc",
    tags: [
      { icon: "RG", label: "RAG" },
      { icon: "RT", label: "检索" },
      { icon: "LF", label: "Langfuse" },
    ],
    href: null,
    planned: false,
  },
  {
    titleKey: "projectEvalTitle",
    statusKey: "projectEvalStatus",
    descKey: "projectEvalDesc",
    tags: [
      { icon: "EV", label: "Eval" },
      { icon: "LJ", label: "LLM-as-Judge" },
      { icon: "RG", label: "回归" },
    ],
    href: null,
    planned: true,
  },
] as const;

export default function Projects() {
  const { t } = useSite();

  return (
    <section className="section projects-section" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="section-tag"><span className="section-num">03</span><span>{t("navProjects")}</span></p>
          <h2 id="projects-title" className="section-title">{t("projectsTitle")}</h2>
        </header>
        <div className="projects-grid">
          {PROJECTS.map((project, index) => (
            <article
              className="project-card"
              key={project.titleKey}
              data-reveal
              style={{ "--reveal-delay": `${0.05 + index * 0.07}s` } as CSSProperties}
            >
              <div className="project-head">
                <h4>{t(project.titleKey)}</h4>
                <span className={`project-status${project.planned ? " is-planned" : ""}`}>
                  {t(project.statusKey)}
                </span>
              </div>
              <p className="project-desc">{t(project.descKey)}</p>
              <div className="tech-chip-list" aria-label="技术标签">
                {project.tags.map((tag) => (
                  <span className="tech-chip" key={tag.label} data-icon={tag.icon}>{tag.label}</span>
                ))}
              </div>
              {project.href && (
                <a
                  className="project-link"
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("projectRepoLink")}
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
