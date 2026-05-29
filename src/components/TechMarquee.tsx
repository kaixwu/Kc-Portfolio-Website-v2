"use client";

import React, { useLayoutEffect, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiVite,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiFlask,
  SiSharp,
  SiPostgresql,
  SiMysql,
  SiSqlite,
  SiSupabase,
  SiTomtom,
  SiGooglemaps,
  SiGooglegemini,
  SiUnsplash,
  SiWordpress,
  SiSquarespace,
  SiWix,
  SiElementor,
  SiOxygen,
} from "react-icons/si";
import { FaWeebly } from "react-icons/fa";
import type { IconType } from "react-icons";
import FluidGradient from "./FluidGradient";

gsap.registerPlugin(ScrollTrigger);

// SSR-safe layout effect
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface TechIcon {
  Icon: IconType;
  name: string;
  color: string; // brand color → applied as CSS currentColor on the SVG
}

interface MarqueeRow {
  label: string;
  icons: TechIcon[];
}

// ── Tech stack data with official brand colors ─────────────────
const ROWS: MarqueeRow[] = [
  {
    label: "CRAFT",
    icons: [
      { Icon: SiReact,      name: "React",      color: "#61DAFB" },
      { Icon: SiNextdotjs,  name: "Next.js",    color: "#E2E2E2" },
      { Icon: SiVuedotjs,   name: "Vue",        color: "#4FC08D" },
      { Icon: SiVite,       name: "Vite",       color: "#646CFF" },
    ],
  },
  {
    label: "STACK",
    icons: [
      { Icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
      { Icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
      { Icon: SiHtml5,      name: "HTML5",      color: "#E34F26" },
      { Icon: SiTailwindcss,name: "Tailwind",   color: "#06B6D4" },
    ],
  },
  {
    label: "BUILD",
    icons: [
      { Icon: SiNodedotjs,  name: "Node.js",    color: "#339933" },
      { Icon: SiPython,     name: "Python",     color: "#3776AB" },
      { Icon: SiFlask,      name: "Flask",      color: "#CCCCCC" },
      { Icon: SiSharp,      name: "C#",         color: "#68217A" },
    ],
  },
  {
    label: "DATA",
    icons: [
      { Icon: SiPostgresql, name: "PostgreSQL", color: "#336791" },
      { Icon: SiMysql,      name: "MySQL",      color: "#4479A1" },
      { Icon: SiSqlite,     name: "SQLite",     color: "#0F80CC" },
      { Icon: SiSupabase,   name: "Supabase",   color: "#3ECF8E" },
    ],
  },
  {
    label: "APIS",
    icons: [
      { Icon: SiTomtom,       name: "TomTom",   color: "#DF1B12" },
      { Icon: SiGooglemaps,   name: "Places",   color: "#4285F4" },
      { Icon: SiGooglegemini, name: "Gemini",   color: "#8E75B2" },
      { Icon: SiUnsplash,     name: "Unsplash", color: "#D0D0D0" },
    ],
  },
  {
    label: "CMS",
    icons: [
      { Icon: SiWordpress,    name: "WordPress",   color: "#21759B" },
      { Icon: SiSquarespace,  name: "Squarespace", color: "#FFFFFF" },
      { Icon: FaWeebly,       name: "Weebly",      color: "#3092FA" },
      { Icon: SiWix,          name: "Wix",         color: "#FFFFFF" },
      { Icon: SiElementor,    name: "Elementor",   color: "#D53F8C" },
      { Icon: SiOxygen,       name: "Oxygen",      color: "#FFFFFF" },
    ],
  },
];

// 6 total sets per row ensures content fills the 130% container at
// any screen width up to 4 K (each set ≈ 900 px; 6 × 900 = 5 400 px
// which exceeds 130% of 3 840 px = 4 992 px).
const TOTAL_SETS = 6;

export default function TechMarquee() {
  const sectionRef  = useRef<HTMLElement>(null);
  const rowRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const marqueeRefs = useRef<(HTMLDivElement | null)[]>([]);
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    if (!section)  return;
    const ctx = gsap.context(() => {
      // ── Horizontal marquee drift ────────────────────────────
      marqueeRefs.current.forEach((marquee, idx) => {
        if (!marquee) return;
        const container = rowRefs.current[idx];
        if (!container) return;

        const goLeft = idx % 2 === 0;

        gsap.fromTo(
          marquee,
          { x: "0%" },
          {
            x: goLeft ? "-12%" : "12%",
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end:   "bottom top",
              scrub: 1.2,
            },
          }
        );
      });

    }, section);

    return () => {
      // Kill scoped triggers before ctx.revert() to avoid removeChild crash
      ScrollTrigger.getAll().forEach((st) => {
        if (section && st.trigger && section.contains(st.trigger as Node)) {
          st.kill(true);
        }
      });
      ctx.revert();
    };
  }, []);

  return (
    <section className="tmq-section" ref={sectionRef} id="tech-stack">
      {/* Heavy WebGL FluidGradient removed for performance on mobile */}
      
      {/* Heading */}
      <div className="tmq-heading">
        <h2 className="heading">
          Tech <span>Stack</span>
        </h2>
        <p className="tmq-subheading">Tools &amp; technologies I work with</p>
      </div>

      {/* Rows */}
      <div className="tmq-rows">
        {ROWS.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className={`tmq-row-container ${rowIdx % 2 === 0 ? "tmq-odd" : "tmq-even"}`}
            ref={(el) => { rowRefs.current[rowIdx] = el; }}
          >
            <div
              className="tmq-marquee"
              ref={(el) => { marqueeRefs.current[rowIdx] = el; }}
            >
              {Array.from({ length: TOTAL_SETS }).map((_, setIdx) => (
                <React.Fragment key={setIdx}>
                  {/* Icon tiles */}
                  {row.icons.map(({ Icon, name, color }) => (
                    <div
                      className="tmq-item tmq-item--icon"
                      key={`${setIdx}-${name}`}
                      aria-hidden={setIdx > 0 ? true : undefined}
                    >
                      {/*
                        color is set as inline style so react-icons renders
                        the SVG using currentColor → brand colour is preserved.
                        fill/stroke overrides in CSS are intentionally absent.
                      */}
                      <Icon
                        style={{ color }}
                        aria-label={setIdx === 0 ? name : undefined}
                      />
                      <span className="tmq-icon-label">{name}</span>
                    </div>
                  ))}

                  {/* Text label tile — only the first set has a real ref */}
                  <div
                    className="tmq-item tmq-item--text"
                    key={`${setIdx}-label`}
                    aria-hidden={setIdx > 0 ? true : undefined}
                  >
                    <h3 className="tmq-label">
                      {row.label}
                    </h3>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
