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
  kind: "work" | "side";
};

type Row = { nameKey: TranslationKey; subKey?: TranslationKey; valueKey: TranslationKey };

const CARDS: readonly LedgerEntry[] = [
  {
    kind: "work",
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
    kind: "work",
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
  {
    kind: "side",
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
    kind: "side",
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

const BACKGROUND_ROWS: readonly Row[] = [
  { nameKey: "expBdName", subKey: "expBdSub", valueKey: "expBdValue" },
  { nameKey: "expBuptName", subKey: "expBuptSub", valueKey: "expBuptValue" },
  { nameKey: "expNjuptName", subKey: "expNjuptSub", valueKey: "expNjuptValue" },
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

function WorkCards({ entries }: { entries: readonly LedgerEntry[] }) {
  const { t } = useSite();
  return (
    <ul className="work-cards">
      {entries.map((entry) => (
        <li className="work-card" key={entry.titleKey} data-kind={entry.kind}>
          <div className="work-card__head">
            <span className="work-card__kind">{t(entry.kind === "work" ? "cardKindWork" : "cardKindSide")}</span>
            <span className="work-card__status">{t(entry.statusKey)}</span>
          </div>
          <h3>{t(entry.titleKey)}</h3>
          <div className="work-stack">
            {entry.chips.map((chip) => (
              <span className="work-chip" key={chip.label}>
                {chip.icon ? <ToolIcon id={chip.icon} /> : null}
                {chip.label}
              </span>
            ))}
          </div>
          <p>
            {t(entry.lineKey)} {t(entry.bodyKey)}
          </p>
          {entry.href ? (
            <a className="link work-card__link" href={entry.href} target="_blank" rel="noopener noreferrer">
              {t("projectRepoLink")}
            </a>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export default function Resume() {
  return (
    <>
      <section className="section" id="experience" aria-labelledby="exp-h">
        <div className="container">
          <SectionHead h="exp-h" hKey="backgroundH" lineKey="backgroundLine" />
          <Rows rows={BACKGROUND_ROWS} />
        </div>
      </section>

      <section className="section" id="works" aria-labelledby="works-h">
        <div className="container">
          <SectionHead h="works-h" hKey="selectedWorkH" lineKey="selectedWorkLine" />
          <WorkCards entries={CARDS} />
        </div>
      </section>
    </>
  );
}