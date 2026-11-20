"use client";

import type { CSSProperties } from "react";
import { useSite } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n";

const TILES: Array<{ key: TranslationKey; icon?: string }> = [
  { key: "toolPython", icon: "python" },
  { key: "toolPytest" },
  { key: "toolPlaywright", icon: "playwright" },
  { key: "toolSelenium", icon: "selenium" },
  { key: "toolJava", icon: "java" },
  { key: "toolGo" },
  { key: "toolTypescript", icon: "typescript" },
  { key: "toolSql" },
  { key: "toolJenkins", icon: "jenkins" },
  { key: "toolGitlab", icon: "gitlab" },
  { key: "toolDocker", icon: "docker" },
  { key: "toolLinux", icon: "linux-tux" },
  { key: "toolPrometheus", icon: "prometheus" },
  { key: "toolGrafana", icon: "grafana" },
  { key: "toolLangfuse", icon: "langfuse" },
  { key: "toolGithub", icon: "github" },
];

export default function Stack() {
  const { t } = useSite();

  return (
    <section className="section" id="stack" aria-labelledby="stack-h" style={{ "--hm": 2 } as CSSProperties}>
      <div className="wrap">
        <div className="section-head">
          <h2 id="stack-h">{t("stackH")}</h2>
          <p className="muted">{t("stackLine")}</p>
        </div>
        <div className="frame span-12">
          <div className="tools">
            {TILES.map((tile) => (
              <div className="tool" key={tile.key}>
                {tile.icon ? (
                  <img className={`ic ic-40${tile.icon === "github" ? " ic-ink" : ""}`} src={`/assets/icons/${tile.icon}.svg`} alt="" width="40" height="40" loading="lazy" />
                ) : (
                  <span className="tool__name" aria-hidden="true">{t(tile.key)}</span>
                )}
                <span className="t-label">{t(tile.key)}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="stack-more">
          {t("stackMore")}{" "}
          <a className="link" href="/assets/resume.pdf" download>{t("ctaResume")}</a>
        </p>
      </div>
    </section>
  );
}
