"use client";

import type { CSSProperties } from "react";
import { useSite } from "@/lib/i18n";

const GITHUB_ICON = (
  <svg className="btn-github-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12 .6a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.4 5.9.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A12 12 0 0 0 12 .6Z" />
  </svg>
);

const SIGNALS = ["signalCi", "signalAuto", "signalReliability", "signalReview"] as const;

export default function Hero() {
  const { t } = useSite();

  return (
    <section className="hero section" id="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-grid"></span>
        <span className="hero-glow hero-glow-a"></span>
        <span className="hero-glow hero-glow-b"></span>
      </div>
      <div className="container hero-inner">
        <div className="hero-copy" data-reveal>
          <p className="terminal-chip" aria-hidden="true">
            <span className="terminal-prompt">$</span>
            <span>whoami</span>
            <span className="terminal-arrow">→</span>
            <span className="terminal-out">{t("heroTerminalOut")}</span>
          </p>
          <h1 id="hero-title" className="hero-name">{t("name")}</h1>
          <p className="hero-role">{t("role")}</p>
          <p className="hero-summary">{t("intro")}</p>
          <div className="hero-signal-grid" aria-label="关键方向">
            {SIGNALS.map((key) => (
              <span className="signal-chip" key={key}>{t(key)}</span>
            ))}
          </div>
          <div className="hero-cta-row">
            <a className="btn btn-primary" href="#projects">{t("ctaProjects")}</a>
            <a className="btn btn-ghost" href="/assets/resume.pdf" download>{t("ctaResume")}</a>
            <a
              className="btn btn-ghost btn-icon-only"
              href="https://github.com/chenxiaoyou"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("ctaGithub")}
            >
              {GITHUB_ICON}
            </a>
          </div>
        </div>
        <div className="hero-photo-shell" data-reveal style={{ "--reveal-delay": ".15s" } as CSSProperties}>
          <div className="hero-photo-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="profile-photo" src="/assets/profile.png" alt={t("profileAlt")} />
          </div>
          <p className="hero-tagline">{t("brandTagline")}</p>
        </div>
      </div>
      <a className="hero-scroll-cue" href="#about" aria-label={t("scrollHint")}>
        <span className="scroll-cue-track" aria-hidden="true"><span className="scroll-cue-dot"></span></span>
      </a>
    </section>
  );
}
