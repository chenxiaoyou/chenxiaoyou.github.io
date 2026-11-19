"use client";

import { useEffect } from "react";

// 滚动进入动画：尊重系统减少动态偏好；无 JS 环境下由 CSS 兜底显示
export default function Reveal() {
  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");
    if (items.length === 0) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const revealer = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    items.forEach((element) => revealer.observe(element));
    return () => revealer.disconnect();
  }, []);
  return null;
}
