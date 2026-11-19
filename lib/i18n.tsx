"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Lang = "zh" | "en";
export type Theme = "dark" | "light";

export const translations = {
  zh: {
    skip: "跳到正文",
    name: "辰小右",
    dockResume: "简历",
    dockGithub: "GitHub",
    dockEmail: "发送邮件",
    languageToggle: "切换语言",
    currentLanguageLabel: "中",
    navAbout: "关于",
    navExperience: "经历",
    navProjects: "项目",
    navContact: "联系",
    heroTerminalOut: "辰小右 @ 质量工程",
    role: "测试开发 / 泛自动化 / 稳定性工程",
    intro: "我关注用工程化方式提升质量效率，长期投入自动化测试、CI 质量门禁、稳定性巡检和故障复盘。",
    brandTagline: "Quality Engineering / Automation / Reliability",
    signalCi: "CI 质量门禁",
    signalAuto: "自动化巡检",
    signalReliability: "稳定性治理",
    signalReview: "故障复盘",
    ctaProjects: "查看项目",
    ctaResume: "下载简历",
    ctaGithub: "GitHub",
    scrollHint: "向下滚动",
    aboutTitle: "关于我",
    aboutCopy:
      "五年多互联网测试开发经验，主攻泛自动化建设与稳定性建设：从自动化用例与框架、CI 质量门禁，到稳定性巡检与故障复盘，把质量工程沉淀为可复用的体系。当前正系统深入 AI Agent 与 AI 评测（mewcode / mewhelp），探索质量工程的下一站。",
    aboutPointOne: "五年+ 测试开发 · 字节跳动",
    aboutPointTwo: "泛自动化建设 × 稳定性工程",
    aboutPointThree: "AI Agent 与 AI 评测学习中",
    expTitle: "经历",
    badgeWork: "工作",
    badgeEdu: "教育",
    badgeCurrent: "当前",
    eduBuptName: "北京邮电大学",
    eduBuptDesc: "硕士 | 电子与通信工程",
    eduNjuptName: "南京邮电大学",
    eduNjuptDesc: "本科 | 信息安全",
    workBdName: "字节跳动",
    workBdRole: "测试开发",
    workBdDate: "北京 | 2021.06 - 至今",
    workBdHome: "打开字节跳动主页",
    workDetailToggle: "展开工作内容",
    workProblem: "业务迭代快，质量回归和稳定性风险需要更早暴露。",
    workAction: "建设自动化用例、CI 门禁、巡检脚本和问题复盘链路。",
    workResult: "自动化回归覆盖核心链路，版本回归耗时显著下降，线上风险通过巡检与复盘持续收敛。",
    eduBuptHome: "打开北京邮电大学主页",
    eduNjuptHome: "打开南京邮电大学主页",
    techTitle: "技术栈",
    techAutomationTitle: "测试自动化",
    techEngineeringTitle: "工程语言",
    techCiTitle: "CI / 工具链",
    techReliabilityTitle: "稳定性观测",
    skillPython: "脚本 / 平台 / 数据处理",
    skillPytest: "接口 / 回归 / 断言",
    skillPlaywright: "Web E2E / 录制回放",
    skillSelenium: "浏览器自动化",
    skillJava: "服务端测试工具",
    skillGo: "高并发工具 / CLI",
    skillTs: "前端工具链",
    skillSql: "数据校验 / 排障",
    skillJenkins: "流水线编排",
    skillGitlab: "质量门禁",
    skillDocker: "环境一致性",
    skillLinux: "日志 / 进程 / 网络",
    skillPrometheus: "指标采集",
    skillGrafana: "看板 / 趋势",
    skillLog: "问题定位",
    skillAlert: "风险前置",
    projectsTitle: "作品项目",
    projectApiTitle: "api_auto_test",
    projectApiStatus: "建设中",
    projectApiDesc: "自建接口自动化测试框架：pytest 分层与数据驱动设计，Allure 报告与 Jenkins 调度一体化。",
    projectMewcodeTitle: "mewcode 源码拆解",
    projectMewcodeStatus: "学习中",
    projectMewcodeDesc: "从源码拆解 Coding Agent 核心机制：agent loop、工具调用与权限、记忆与多智能体协作。",
    projectMewhelpTitle: "mewhelp 源码拆解",
    projectMewhelpStatus: "学习中",
    projectMewhelpDesc: "拆解 RAG 知识库助手全链路：知识库构建、检索增强生成与 Langfuse 可观测性。",
    projectEvalTitle: "AI 评测实践",
    projectEvalStatus: "规划中",
    projectEvalDesc: "用测试开发的方法评测 Agent：评测集建设、指标体系、LLM-as-judge 与效果回归。",
    projectRepoLink: "查看仓库 ›",
    footerCta: "有想法，聊聊看。",
    footerSub: "邮件通常当天回复，也可以在 GitHub 上找到我。",
    footerEmailCta: "发邮件给我",
    footerBuilt: " · 用 Next.js 构建",
    profileAlt: "辰小右头像",
    themeDark: "暗",
    themeLight: "亮",
  },
  en: {
    skip: "Skip to content",
    name: "Chen Xiaoyou",
    dockResume: "Resume",
    dockGithub: "GitHub",
    dockEmail: "Send email",
    languageToggle: "Switch language",
    currentLanguageLabel: "EN",
    navAbout: "About",
    navExperience: "Experience",
    navProjects: "Projects",
    navContact: "Contact",
    heroTerminalOut: "chenxiaoyou @ quality-engineering",
    role: "Test Development / Automation / Reliability",
    intro: "I focus on improving quality through engineering practices across automation, CI quality gates, reliability checks, and incident review.",
    brandTagline: "Quality Engineering / Automation / Reliability",
    signalCi: "CI Quality Gate",
    signalAuto: "Automation Checks",
    signalReliability: "Reliability Control",
    signalReview: "Incident Review",
    ctaProjects: "View projects",
    ctaResume: "Download resume",
    ctaGithub: "GitHub",
    scrollHint: "Scroll down",
    aboutTitle: "About",
    aboutCopy:
      "Five-plus years of internet test development experience, focused on automation infrastructure and stability engineering — from automated suites and frameworks and CI quality gates to reliability inspection and incident review. Currently going deep on AI agents and AI evaluation (mewcode / mewhelp), exploring what quality engineering looks like next.",
    aboutPointOne: "5+ years in test development · ByteDance",
    aboutPointTwo: "Automation infrastructure × stability engineering",
    aboutPointThree: "Currently learning AI agents & AI evaluation",
    expTitle: "Experience",
    badgeWork: "Work",
    badgeEdu: "Education",
    badgeCurrent: "Current",
    eduBuptName: "Beijing University of Posts and Telecommunications",
    eduBuptDesc: "M.S. | Electronic and Communication Engineering",
    eduNjuptName: "Nanjing University of Posts and Telecommunications",
    eduNjuptDesc: "B.S. | Information Security",
    workBdName: "ByteDance",
    workBdRole: "Test Development Engineer",
    workBdDate: "Beijing | 2021.06 - Present",
    workBdHome: "Open ByteDance homepage",
    workDetailToggle: "Expand work details",
    workProblem: "Fast product iteration needs earlier exposure of regression and reliability risk.",
    workAction: "Build automated tests, CI gates, inspection scripts, and review workflows.",
    workResult: "Automated regression now covers core paths, release regression time has dropped notably, and online risk keeps converging through checks and incident reviews.",
    eduBuptHome: "Open BUPT homepage",
    eduNjuptHome: "Open NJUPT homepage",
    techTitle: "Tech Stack",
    techAutomationTitle: "Test Automation",
    techEngineeringTitle: "Engineering Languages",
    techCiTitle: "CI / Tooling",
    techReliabilityTitle: "Reliability Observability",
    skillPython: "Scripts / platforms / data",
    skillPytest: "API / regression / asserts",
    skillPlaywright: "Web E2E / replay",
    skillSelenium: "Browser automation",
    skillJava: "Backend test tooling",
    skillGo: "Concurrent tools / CLI",
    skillTs: "Frontend tooling",
    skillSql: "Data checks / debugging",
    skillJenkins: "Pipeline orchestration",
    skillGitlab: "Quality gates",
    skillDocker: "Environment parity",
    skillLinux: "Logs / process / network",
    skillPrometheus: "Metric collection",
    skillGrafana: "Dashboards / trends",
    skillLog: "Issue diagnosis",
    skillAlert: "Risk shift-left",
    projectsTitle: "Projects",
    projectApiTitle: "api_auto_test",
    projectApiStatus: "In progress",
    projectApiDesc: "Self-built API test framework: layered, data-driven pytest with Allure reporting and Jenkins scheduling.",
    projectMewcodeTitle: "mewcode Internals",
    projectMewcodeStatus: "Learning",
    projectMewcodeDesc: "Source-level breakdown of a coding agent: agent loop, tool calls and permissions, memory, and multi-agent teams.",
    projectMewhelpTitle: "mewhelp Internals",
    projectMewhelpStatus: "Learning",
    projectMewhelpDesc: "End-to-end breakdown of a RAG knowledge assistant: KB building, retrieval-augmented generation, and Langfuse observability.",
    projectEvalTitle: "AI Evaluation",
    projectEvalStatus: "Planned",
    projectEvalDesc: "Evaluate agents the way testers do: eval datasets, metrics, LLM-as-judge, and quality regression.",
    projectRepoLink: "View repo ›",
    footerCta: "Have an idea? Let's talk.",
    footerSub: "Emails usually get a same-day reply — or find me on GitHub.",
    footerEmailCta: "Email me",
    footerBuilt: " · Built with Next.js",
    profileAlt: "Chen Xiaoyou profile photo",
    themeDark: "Dark",
    themeLight: "Light",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["zh"];

type SiteContextValue = {
  lang: Lang;
  theme: Theme;
  t: (key: TranslationKey) => string;
  toggleLang: () => void;
  toggleTheme: () => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("zh");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    try {
      const storedLang = localStorage.getItem("site-language");
      if (storedLang === "zh" || storedLang === "en") setLang(storedLang);
      const storedTheme = localStorage.getItem("site-theme");
      if (storedTheme === "dark" || storedTheme === "light") setTheme(storedTheme);
    } catch {}
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang === "zh" ? "zh-CN" : "en";
    root.dataset.lang = lang;
    try {
      localStorage.setItem("site-language", lang);
    } catch {}
  }, [lang]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("site-theme", theme);
    } catch {}
  }, [theme]);

  const toggleLang = useCallback(() => setLang((value) => (value === "zh" ? "en" : "zh")), []);
  const toggleTheme = useCallback(() => setTheme((value) => (value === "dark" ? "light" : "dark")), []);

  const t = useCallback((key: TranslationKey) => translations[lang][key], [lang]);

  return (
    <SiteContext.Provider value={{ lang, theme, t, toggleLang, toggleTheme }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite(): SiteContextValue {
  const context = useContext(SiteContext);
  if (!context) throw new Error("useSite must be used within SiteProvider");
  return context;
}
