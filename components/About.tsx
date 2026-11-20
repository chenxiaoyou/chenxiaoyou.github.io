"use client";

import { useEffect, useRef } from "react";
import { useSite } from "@/lib/i18n";

export default function About() {
  const { t, lang } = useSite();
  const hostRef = useRef<HTMLElement>(null);

  // word-highlight 时刻由本组件接管挂载（window.__momentsManual）：
  // 首次渲染后挂载一次；语言切换让 React 重写语句文本，卸载后重挂
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const specUrl = "/assets/moments/moments.js";
        const mod = (await import(/* webpackIgnore: true */ /* turbopackIgnore: true */ specUrl)) as {
          unmountAll: (root: ParentNode) => void;
          mount: (el: Element) => Promise<unknown>;
        };
        if (cancelled || !hostRef.current) return;
        mod.unmountAll(hostRef.current);
        await mod.mount(hostRef.current);
      } catch {
        /* 时刻加载失败时由 mo-safe 兜底显示完整语句 */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  return (
    <section className="section statement" id="about" data-moment="word-highlight" ref={hostRef} aria-labelledby="about-h">
      <div className="wrap">
        <h2 id="about-h">{t("aboutH")}</h2>
        <p className="mo-wh__text">
          {t("aboutStatementPre")}
          <strong>{t("aboutStatementStrong")}</strong>
          {t("aboutStatementPost")}
        </p>
        <div className="about-exp">
          <p className="t-label">{t("aboutLabel")}</p>
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
      </div>
    </section>
  );
}
