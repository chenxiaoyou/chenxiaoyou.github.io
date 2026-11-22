"use client";

import { useSite } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n";

function ToolIcon({ id }: { id: string }) {
  return <img src={`/assets/icons/${id}.svg`} alt="" width="24" height="24" loading="lazy" />;
}

type Chip = { icon?: string; label: string };

type LedgerEntry = {
  titleKey: TranslationKey;
  statusKey: TranslationKey;
  lineKey: TranslationKey;
  bodyKey: TranslationKey;
  chips: readonly Chip[];
  href: string | null;
};

type Row = { nameKey: TranslationKey; subKey?: TranslationKey; valueKey: TranslationKey };

const PROJECTS: readonly LedgerEntry[] = [
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
  },
];

const WORKS: readonly LedgerEntry[] = [
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
  },
];

const EDU_ROWS: readonly Row[] = [
  { nameKey: "expBuptName", subKey: "expBuptSub", valueKey: "expBuptValue" },
  { nameKey: "expNjuptName", subKey: "expNjuptSub", valueKey: "expNjuptValue" },
];

const SKILL_ROWS: readonly Row[] = [
  { nameKey: "skillRegression", valueKey: "skillsTbd" },
  { nameKey: "skillGate", valueKey: "skillsTbd" },
  { nameKey: "skillReliability", valueKey: "skillsTbd" },
];

const EXP_ROWS: readonly Row[] = [
  { nameKey: "expBdName", subKey: "expBdSub", valueKey: "expBdValue" },
];

function SectionHead({ h, hKey, lineKey }: { h: string; hKey: TranslationKey; lineKey?: TranslationKey }) {
  const { t } = useSite();
  return (
    <div className="section-head">
      <h2 id={h}>{t(hKey)}</h2>
      {lineKey ? <p>{t(lineKey)}</p> : null}
    </div>
  );
}

function Rows({ rows }: { rows: readonly Row[] }) {
  const { t } = useSite();
  return (
    <ul className="rows">
      {rows.map((row) => (
        <li key={row.nameKey}>
          <span className="rows__name">
            {t(row.nameKey)}
            {row.subKey ? <small>{t(row.subKey)}</small> : null}
          </span>
          <span className="rows__value">{t(row.valueKey)}</span>
        </li>
      ))}
    </ul>
  );
}

function Ledger({ entries }: { entries: readonly LedgerEntry[] }) {
  const { t } = useSite();
  return (
    <ol className="work-index">
      {entries.map((entry) => (
        <li className="work-item" key={entry.titleKey}>
          <div className="work-main">
            <div className="work-head">
              <h3>{t(entry.titleKey)}</h3>
              <div className="work-stack">
                {entry.chips.map((chip) => (
                  <span className="work-chip" key={chip.label}>
                    {chip.icon ? <ToolIcon id={chip.icon} /> : null}
                    {chip.label}
                  </span>
                ))}
              </div>
            </div>
            <p>{t(entry.lineKey)} {t(entry.bodyKey)}</p>
          </div>
          <div className="work-foot">
            <span className="work-status">{t(entry.statusKey)}</span>
            {entry.href && (
              <a className="link" href={entry.href} target="_blank" rel="noopener noreferrer">
                {t("projectRepoLink")}
              </a>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function Resume() {
  const { t } = useSite();

  return (
    <>
      <section className="section" id="education" aria-labelledby="edu-h">
        <div className="container">
          <SectionHead h="edu-h" hKey="eduH" lineKey="eduLine" />
          <Rows rows={EDU_ROWS} />
        </div>
      </section>

      <section className="section" id="skills" aria-labelledby="skills-h">
        <div className="container">
          <SectionHead h="skills-h" hKey="skillsH" lineKey="skillsLine" />
          <Rows rows={SKILL_ROWS} />
        </div>
      </section>

      <section className="section" id="experience" aria-labelledby="exp-h">
        <div className="container">
          <SectionHead h="exp-h" hKey="expH" lineKey="expLine" />
          <Rows rows={EXP_ROWS} />
        </div>
      </section>

      <section className="section" id="projects" aria-labelledby="projects-h">
        <div className="container">
          <SectionHead h="projects-h" hKey="projectsH" lineKey="projectsLine" />
          <Ledger entries={PROJECTS} />
        </div>
      </section>

      <section className="section" id="works" aria-labelledby="works-h">
        <div className="container">
          <SectionHead h="works-h" hKey="worksH" lineKey="worksLine" />
          <Ledger entries={WORKS} />
        </div>
      </section>

      <section className="section" id="evaluation" aria-labelledby="eval-h">
        <div className="container">
          <SectionHead h="eval-h" hKey="evalH" />
          <p className="eval-body">{t("evalBody")}</p>
        </div>
      </section>
    </>
  );
}
