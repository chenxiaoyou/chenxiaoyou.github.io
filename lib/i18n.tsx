"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Lang = "zh" | "en";

export const translations = {
  zh: {
    skip: "跳到正文",
    name: "辰小右",
    navWork: "作品",
    navAbout: "经历",
    navPipeline: "链路",
    navContact: "联系",
    menuLabel: "菜单",
    langOther: "EN",
    h1: "辰小右 · 测试开发工程师",
    lead: "我为业务团队搭自动化回归、CI 质量门禁和稳定性巡检，把质量风险拦在发布前。",
    ctaEmail: "发邮件给我",
    ctaResume: "下载简历",
    floatLive: "在职",
    floatSince: "2021.06 至今",
    floatTitle: "字节跳动 · 测试开发工程师",
    avatarAlt: "辰小右的头像",
    workH: "作品与在建",
    workLine: "四个方向，从接口回归做到 Agent 评测。",
    workApiTitle: "api_auto_test",
    workApiLine: "自建接口自动化回归框架，pytest 分层与数据驱动设计。",
    workApiBody: "Allure 报告与 Jenkins 调度一体化。",
    workApiStatus: "建设中",
    workApiLink: "查看仓库",
    workMewcodeTitle: "mewcode 源码拆解",
    workMewcodeLine: "从源码拆解 Coding Agent 的核心机制。",
    workMewcodeBody: "agent loop、工具调用与权限、记忆与多智能体协作，逐个拆开看。",
    workMewcodeStatus: "学习中",
    workMewhelpTitle: "mewhelp 源码拆解",
    workMewhelpLine: "拆解 RAG 知识库助手的全链路。",
    workMewhelpBody: "知识库构建、检索增强生成，用 Langfuse 看住每一次检索。",
    workMewhelpStatus: "学习中",
    workEvalTitle: "AI 评测实践",
    workEvalLine: "用测试开发的方法评测 Agent。",
    workEvalBody: "先建评测集和指标体系，再谈 LLM-as-judge 与效果回归。",
    workEvalStatus: "规划中",
    workMore: "完整清单在简历里。",
    tagAgentLoop: "Agent Loop",
    tagTools: "Tools",
    tagMemory: "Memory",
    tagRag: "RAG",
    tagRetrieval: "检索",
    tagEvalSet: "评测集",
    tagMetrics: "指标体系",
    tagLlmJudge: "LLM-as-judge",
    tagPytest: "Pytest",
    tagAllure: "Allure",
    aboutLabel: "经历",
    aboutH: "质量工程这件事",
    aboutCopy:
      "五年多互联网测试开发经验，主攻泛自动化建设与稳定性建设：从自动化用例与框架、CI 质量门禁，到稳定性巡检与故障复盘，把质量工程沉淀为可复用的体系。当前正系统深入 AI Agent 与 AI 评测（mewcode / mewhelp），探索质量工程的下一站。",
    aboutStatementPre: "回归、门禁、巡检、复盘，是 ",
    aboutStatementStrong: "一条链路",
    aboutStatementPost: " 上的四道工序。 少任何一道， 风险 都会 在发布当天 集中爆发。",
    expBdName: "字节跳动",
    expBdSub: "测试开发工程师 · 北京",
    expBdValue: "2021.06 至今",
    expBuptName: "北京邮电大学",
    expBuptSub: "硕士 · 电子与通信工程",
    expBuptValue: "2018 - 2021",
    expNjuptName: "南京邮电大学",
    expNjuptSub: "本科 · 信息安全",
    expNjuptValue: "2012 - 2016",
    pipelineH: "一条质量链路。",
    pipelineMuted: "从变更到复盘，环环相扣。",
    dgAlt: "一条质量链路：变更提交、自动化回归、CI 门禁、线上巡检、故障复盘。",
    dgStepCommit: "变更提交",
    dgStepCommitSub: "每次合并",
    dgStepRegression: "自动化回归",
    dgStepRegressionSub: "Pytest · Playwright",
    dgStepGate: "CI 门禁",
    dgStepGateSub: "合并前拦截",
    dgStepPatrol: "线上巡检",
    dgStepPatrolSub: "指标与日志",
    dgStepReview: "故障复盘",
    dgStepReviewSub: "归档与改进",
    closeH: "聊质量工程，写邮件最快",
    closeLine: "邮件通常当天回复。",
    footerLede: "测试开发 / 泛自动化 / 稳定性工程",
    footerColWork: "作品",
    footerColMethod: "方法",
    footerColReach: "联系",
    footerColNav: "页内",
    footerTop: "回到顶部",
    footerGithub: "GitHub",
    footerLegal: "页面中的产品名称与图标归其各自所有者所有。",
    actionbarLabel: "快捷操作",
  },
  en: {
    skip: "Skip to content",
    name: "Chen Xiaoyou",
    navWork: "Work",
    navAbout: "Experience",
    navPipeline: "Pipeline",
    navContact: "Contact",
    menuLabel: "Menu",
    langOther: "中",
    h1: "Chen Xiaoyou, test development engineer",
    lead: "I build automated regression, CI quality gates and reliability checks for product teams, so risks surface before release.",
    ctaEmail: "Email me",
    ctaResume: "Download resume",
    floatLive: "Current",
    floatSince: "2021.06 - Present",
    floatTitle: "ByteDance · Test Development Engineer",
    avatarAlt: "Chen Xiaoyou's avatar",
    workH: "Built and in progress",
    workLine: "Four threads, from API regression to agent evaluation.",
    workApiTitle: "api_auto_test",
    workApiLine: "A self-built API regression framework, layered and data-driven on pytest.",
    workApiBody: "Allure reporting and Jenkins scheduling in one pipeline.",
    workApiStatus: "In progress",
    workApiLink: "View repo",
    workMewcodeTitle: "mewcode internals",
    workMewcodeLine: "Reading a Coding Agent at source level.",
    workMewcodeBody: "The agent loop, tool calls and permissions, memory and multi-agent teams, one piece at a time.",
    workMewcodeStatus: "Learning",
    workMewhelpTitle: "mewhelp internals",
    workMewhelpLine: "The full path of a RAG knowledge assistant.",
    workMewhelpBody: "Knowledge-base building and retrieval-augmented generation, watched over with Langfuse.",
    workMewhelpStatus: "Learning",
    workEvalTitle: "AI evaluation practice",
    workEvalLine: "Evaluating agents the way testers do.",
    workEvalBody: "Eval sets and metrics first, then LLM-as-judge and quality regression.",
    workEvalStatus: "Planned",
    workMore: "The full list is in my resume.",
    tagAgentLoop: "Agent Loop",
    tagTools: "Tools",
    tagMemory: "Memory",
    tagRag: "RAG",
    tagRetrieval: "Retrieval",
    tagEvalSet: "Eval sets",
    tagMetrics: "Metrics",
    tagLlmJudge: "LLM-as-judge",
    tagPytest: "Pytest",
    tagAllure: "Allure",
    aboutLabel: "Experience",
    aboutH: "What the job is",
    aboutCopy:
      "Five-plus years of internet test development, focused on automation infrastructure and stability engineering: automated suites, CI quality gates, reliability checks and incident reviews, distilled into a reusable system. Currently going deep on AI agents and AI evaluation (mewcode / mewhelp), exploring what quality engineering looks like next.",
    aboutStatementPre: "Regression, gates, checks and reviews are ",
    aboutStatementStrong: "one pipeline",
    aboutStatementPost: " of four steps.  Drop any one of them,  and every risk surfaces on release day.",
    expBdName: "ByteDance",
    expBdSub: "Test Development Engineer · Beijing",
    expBdValue: "2021.06 - Present",
    expBuptName: "Beijing University of Posts and Telecommunications",
    expBuptSub: "M.S. · Electronic and Communication Engineering",
    expBuptValue: "2018 - 2021",
    expNjuptName: "Nanjing University of Posts and Telecommunications",
    expNjuptSub: "B.S. · Information Security",
    expNjuptValue: "2012 - 2016",
    pipelineH: "One quality pipeline.",
    pipelineMuted: "From commit to review, in sequence.",
    dgAlt: "One quality pipeline: commit, automated regression, CI gate, production checks, incident review.",
    dgStepCommit: "Commit",
    dgStepCommitSub: "Every merge",
    dgStepRegression: "Automated regression",
    dgStepRegressionSub: "Pytest · Playwright",
    dgStepGate: "CI gate",
    dgStepGateSub: "Blocked before merge",
    dgStepPatrol: "Production checks",
    dgStepPatrolSub: "Metrics and logs",
    dgStepReview: "Incident review",
    dgStepReviewSub: "Filed and improved",
    closeH: "The fastest way in is email",
    closeLine: "I usually reply the same day.",
    footerLede: "Test development / Automation / Reliability",
    footerColWork: "Work",
    footerColMethod: "Method",
    footerColReach: "Reach",
    footerColNav: "On this page",
    footerTop: "Back to top",
    footerGithub: "GitHub",
    footerLegal: "Product names and logos on this page belong to their owners.",
    actionbarLabel: "Quick actions",
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
