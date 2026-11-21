"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Lang = "zh" | "en";

export const translations = {
  zh: {
    skip: "跳到正文",
    name: "辰小右",
    navWork: "作品与经历",
    navContact: "联系",
    menuLabel: "菜单",
    langOther: "EN",
    metaSubject: "受测对象",
    metaStatus: "状态",
    metaStatusValue: "在职",
    role: "测试开发工程师",
    metaDate: "2026-11",
    h1: "辰小右",
    leadRole: "测试开发工程师 · 北京",
    leadLine: "五年多，只做一件事：为业务团队搭自动化回归、CI 门禁和稳定性巡检。",
    ctaEmail: "发邮件给我",
    ctaResume: "下载简历",
    critRegression: "自动化回归",
    critGate: "CI 质量门禁",
    critPatrol: "稳定性巡检",
    critEval: "AI 评测",
    critOn: "在岗",
    critPlanned: "规划中",
    workH: "作品与经历",
    workLine: "四个方向，从回归做到评测；三段经历，都在质量工程这条线上。",
    workApiTitle: "api_auto_test",
    workApiStatus: "建设中",
    workApiLine: "自建接口自动化回归框架：pytest 分层与数据驱动设计。",
    workApiBody: "Allure 报告与 Jenkins 调度一体化。",
    workApiLink: "查看仓库",
    workMewcodeTitle: "mewcode 源码拆解",
    workMewcodeStatus: "学习中",
    workMewcodeLine: "从源码拆解 Coding Agent 核心机制。",
    workMewcodeBody: "agent loop、工具调用与权限、记忆与多智能体协作，逐个拆开看。",
    workMewhelpTitle: "mewhelp 源码拆解",
    workMewhelpStatus: "学习中",
    workMewhelpLine: "拆解 RAG 知识库助手全链路。",
    workMewhelpBody: "知识库构建、检索增强生成，用 Langfuse 看住每一次检索。",
    workEvalTitle: "AI 评测实践",
    workEvalStatus: "规划中",
    workEvalLine: "用测试开发的方法评测 Agent。",
    workEvalBody: "先建评测集和指标体系，再谈 LLM-as-judge 与效果回归。",
    workMore: "完整清单在简历里。",
    projectRepoLink: "查看仓库",
    expLabel: "经历",
    expBdName: "字节跳动",
    expBdSub: "测试开发工程师 · 北京",
    expBdValue: "2021.06 至今",
    expBuptName: "北京邮电大学",
    expBuptSub: "硕士 · 电子与通信工程",
    expBuptValue: "2018 - 2021",
    expNjuptName: "南京邮电大学",
    expNjuptSub: "本科 · 信息安全",
    expNjuptValue: "2012 - 2016",
    closeH: "聊质量工程，写邮件最快",
    closeLine: "邮件通常当天回复。",
    footerLegal: "页面中的产品名称与图标归其各自所有者所有。",
    footerTop: "回到顶部",
    avatarAlt: "辰小右的头像",
  },
  en: {
    skip: "Skip to content",
    name: "Chen Xiaoyou",
    navWork: "Work",
    navContact: "Contact",
    menuLabel: "Menu",
    langOther: "中",
    metaSubject: "Subject",
    metaStatus: "Status",
    metaStatusValue: "Employed",
    role: "Test Development Engineer",
    metaDate: "2026-11",
    h1: "Chen Xiaoyou",
    leadRole: "Test Development Engineer · Beijing",
    leadLine: "Five years, one job: building automated regression, CI gates and reliability checks for product teams.",
    ctaEmail: "Email me",
    ctaResume: "Download resume",
    critRegression: "Automated regression",
    critGate: "CI quality gate",
    critPatrol: "Reliability checks",
    critEval: "AI evaluation",
    critOn: "On duty",
    critPlanned: "Planned",
    workH: "Work and experience",
    workLine: "Four threads, from regression to evaluation; three roles, all on the quality line.",
    workApiTitle: "api_auto_test",
    workApiStatus: "In progress",
    workApiLine: "A self-built API regression framework: layered, data-driven pytest.",
    workApiBody: "Allure reporting and Jenkins scheduling in one pipeline.",
    workApiLink: "View repo",
    workMewcodeTitle: "mewcode internals",
    workMewcodeStatus: "Learning",
    workMewcodeLine: "Reading a Coding Agent at source level.",
    workMewcodeBody: "The agent loop, tool calls and permissions, memory and multi-agent teams, one piece at a time.",
    workMewhelpTitle: "mewhelp internals",
    workMewhelpStatus: "Learning",
    workMewhelpLine: "The full path of a RAG knowledge assistant.",
    workMewhelpBody: "Knowledge-base building and retrieval-augmented generation, watched over with Langfuse.",
    workEvalTitle: "AI evaluation practice",
    workEvalStatus: "Planned",
    workEvalLine: "Evaluating agents the way testers do.",
    workEvalBody: "Eval sets and metrics first, then LLM-as-judge and quality regression.",
    workMore: "The full list is in my resume.",
    projectRepoLink: "View repo",
    expLabel: "Experience",
    expBdName: "ByteDance",
    expBdSub: "Test Development Engineer · Beijing",
    expBdValue: "2021.06 - Present",
    expBuptName: "Beijing University of Posts and Telecommunications",
    expBuptSub: "M.S. · Electronic and Communication Engineering",
    expBuptValue: "2018 - 2021",
    expNjuptName: "Nanjing University of Posts and Telecommunications",
    expNjuptSub: "B.S. · Information Security",
    expNjuptValue: "2012 - 2016",
    closeH: "The fastest way in is email",
    closeLine: "I usually reply the same day.",
    footerLegal: "Product names and logos on this page belong to their owners.",
    footerTop: "Back to top",
    avatarAlt: "Chen Xiaoyou's avatar",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["zh"];

type SiteContextValue = {
  lang: Lang;
  t: (key: TranslationKey) => string;
  toggleLang: () => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("zh");

  useEffect(() => {
    try {
      const storedLang = localStorage.getItem("site-language");
      if (storedLang === "zh" || storedLang === "en") setLang(storedLang);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.documentElement.dataset.lang = lang;
    try {
      localStorage.setItem("site-language", lang);
    } catch {}
  }, [lang]);

  const toggleLang = useCallback(() => setLang((value) => (value === "zh" ? "en" : "zh")), []);
  const t = useCallback((key: TranslationKey) => translations[lang][key], [lang]);

  return (
    <SiteContext.Provider value={{ lang, t, toggleLang }}>{children}</SiteContext.Provider>
  );
}

export function useSite(): SiteContextValue {
  const context = useContext(SiteContext);
  if (!context) throw new Error("useSite must be used within SiteProvider");
  return context;
}
