"use client";

import { useSite } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n";

function ToolIcon({ id }: { id: string }) {
  return <img src={`/assets/icons/${id}.svg`} alt="" width="16" height="16" loading="lazy" />;
}

type Chip =
  | { icon?: string; label: string; labelKey?: undefined }
  | { icon?: string; label?: undefined; labelKey: TranslationKey };

type LedgerEntry = {
  titleKey: TranslationKey;
  statusKey: TranslationKey;
  lineKey: TranslationKey;
  bodyKey: TranslationKey;
  chips: readonly Chip[];
  href: string | null;
  kind: "work" | "side";
  tone: "active" | "planned" | "learning";
};

type Row = {
  nameKey: TranslationKey;
  subKey?: TranslationKey;
  valueKey: TranslationKey;
  logo: string;
  current?: boolean;
};

const CARDS: readonly LedgerEntry[] = [
  {
    kind: "work",
    tone: "active",
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
    tone: "planned",
    titleKey: "workEvalTitle",
    statusKey: "workEvalStatus",
    lineKey: "workEvalLine",
    bodyKey: "workEvalBody",
    chips: [
      { labelKey: "chipEvalSet" },
      { labelKey: "chipMetrics" },
      { label: "LLM-as-judge" },
    ],
    href: null,
  },
  {
    kind: "side",
    tone: "learning",
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
    tone: "learning",
    titleKey: "workMewhelpTitle",
    statusKey: "workMewhelpStatus",
    lineKey: "workMewhelpLine",
    bodyKey: "workMewhelpBody",
    chips: [
      { icon: "langfuse", label: "RAG" },
      { labelKey: "chipRetrieval" },
    ],
    href: null,
  },
];

const BACKGROUND_ROWS: readonly Row[] = [
  {
    nameKey: "expBdName",
    subKey: "expBdSub",
    valueKey: "expBdValue",
    logo: "/assets/logo-bytedance.svg",
    current: true,
  },
  {
    nameKey: "expBuptName",
    subKey: "expBuptSub",
    valueKey: "expBuptValue",
    logo: "/assets/logo-bupt.png",
  },
  {
    nameKey: "expNjuptName",
    subKey: "expNjuptSub",
    valueKey: "expNjuptValue",
    logo: "/assets/logo-njupt.png",
  },
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
        <li key={row.nameKey} data-current={row.current ? "true" : undefined}>
          <div className="rows__main">
            <span className="rows__logo" aria-hidden="true">
              <img src={row.logo} alt="" width="24" height="24" loading="lazy" />
            </span>
            <span className="rows__name">
              {t(row.nameKey)}
              {row.subKey ? <small>{t(row.subKey)}</small> : null}
            </span>
          </div>
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
        <li className="work-card" key={entry.titleKey} data-kind={entry.kind} data-tone={entry.tone}>
          <div className="work-card__head">
            <span className="work-card__kind">{t(entry.kind === "work" ? "cardKindWork" : "cardKindSide")}</span>
            <span className="work-card__status">{t(entry.statusKey)}</span>
          </div>
          <h3>{t(entry.titleKey)}</h3>
          <div className="work-stack">
            {entry.chips.map((chip) => {
              const text = chip.labelKey ? t(chip.labelKey) : chip.label;
              const key = chip.labelKey ?? chip.label;
              return (
                <span className="work-chip" key={key}>
                  {chip.icon ? <ToolIcon id={chip.icon} /> : null}
                  {text}
                </span>
              );
            })}
          </div>
          <p>
            {t(entry.lineKey)} {t(entry.bodyKey)}
          </p>
          {entry.href ? (
            <a className="link work-card__link" href={entry.href} target="_blank" rel="noopener noreferrer">
              {t("projectRepoLink")}
              <svg className="link__arrow" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
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
