"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Lang = "zh" | "en";

export const translations = {
  zh: {
    skip: "跳到正文",
    name: "辰小右",
    navExperience: "背景",
    navWorks: "代表作",
    navContact: "联系",
    menuLabel: "菜单",
    langOther: "EN",
    h1: "辰小右",
    heroEyebrow: "字节跳动 · 2021 年至今",
    heroHeadline: "测试开发 · 自动化回归、CI 门禁与稳定性巡检",
    heroTagsLabel: "专注方向",
    tagRegression: "自动化回归",
    tagGate: "CI 质量门禁",
    tagReliability: "稳定性巡检",
    leadLine: "五年多，只做一件事：为业务团队把质量风险拦在发布之前——框架可维护、门禁可执行、异常可追踪。",
    motto: "事缓则圆 人缓则安｜Talk is cheap. Show me the code",
    backgroundH: "背景",
    backgroundLine: "一段工作经历，两段通信与信息相关学历。",
    selectedWorkH: "做过什么",
    selectedWorkLine: "工作内的框架与评测实践，业余的源码拆解与学习笔记。",
    cardKindWork: "工作",
    cardKindSide: "业余",
    ctaEmail: "发邮件给我",
    ctaResume: "下载简历",
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
    projectRepoLink: "查看仓库",
    expBdName: "字节跳动",
    expBdSub: "测试开发工程师",
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
    navExperience: "Background",
    navWorks: "Work",
    navContact: "Contact",
    menuLabel: "Menu",
    langOther: "中",
    h1: "Chen Xiaoyou",
    heroEyebrow: "ByteDance · since 2021",
    heroHeadline: "Test development · regression, CI gates and reliability",
    heroTagsLabel: "Focus",
    tagRegression: "Automated regression",
    tagGate: "CI quality gates",
    tagReliability: "Reliability checks",
    leadLine: "Five years, one job: keeping quality risk out of release—maintainable frameworks, enforceable gates, traceable incidents.",
    motto: "事缓则圆 人缓则安｜Talk is cheap. Show me the code",
    backgroundH: "Background",
    backgroundLine: "One full-time role and two degrees on the communication and information line.",
    selectedWorkH: "Selected work",
    selectedWorkLine: "Day-job frameworks and evaluation practice, plus source-code notes on the side.",
    cardKindWork: "Day job",
    cardKindSide: "Side",
    ctaEmail: "Email me",
    ctaResume: "Download resume",
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
    projectRepoLink: "View repo",
    expBdName: "ByteDance",
    expBdSub: "Test Development Engineer",
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
