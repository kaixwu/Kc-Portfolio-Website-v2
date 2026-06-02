"use client";

import React, { useRef } from "react";
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

// 1 set is enough because we duplicate it explicitly for the marquee effect.
const TOTAL_SETS = 1;

export default function TechMarquee() {
  const sectionRef  = useRef<HTMLElement>(null);

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
          >
            <div className="tmq-marquee">
              {/* Group 1 (Original) */}
              <div className="tmq-marquee-content">
                {row.icons.map(({ Icon, name, color }, idx) => (
                  <div className="tmq-item tmq-item--icon" key={`g1-icon-${idx}`}>
                    <Icon style={{ color }} aria-label={name} />
                    <span className="tmq-icon-label">{name}</span>
                  </div>
                ))}
                <div className="tmq-item tmq-item--text" key="g1-label">
                  <h3 className="tmq-label">{row.label}</h3>
                </div>
              </div>

              {/* Group 2 (Duplicate for infinite loop) */}
              <div className="tmq-marquee-content" aria-hidden="true">
                {row.icons.map(({ Icon, name, color }, idx) => (
                  <div className="tmq-item tmq-item--icon" key={`g2-icon-${idx}`}>
                    <Icon style={{ color }} />
                    <span className="tmq-icon-label">{name}</span>
                  </div>
                ))}
                <div className="tmq-item tmq-item--text" key="g2-label">
                  <h3 className="tmq-label">{row.label}</h3>
                </div>
              </div>
              
              {/* Group 3 (Duplicate for extra wide screens) */}
              <div className="tmq-marquee-content" aria-hidden="true">
                {row.icons.map(({ Icon, name, color }, idx) => (
                  <div className="tmq-item tmq-item--icon" key={`g3-icon-${idx}`}>
                    <Icon style={{ color }} />
                    <span className="tmq-icon-label">{name}</span>
                  </div>
                ))}
                <div className="tmq-item tmq-item--text" key="g3-label">
                  <h3 className="tmq-label">{row.label}</h3>
                </div>
              </div>

              {/* Group 4 (Duplicate for extra wide screens) */}
              <div className="tmq-marquee-content" aria-hidden="true">
                {row.icons.map(({ Icon, name, color }, idx) => (
                  <div className="tmq-item tmq-item--icon" key={`g4-icon-${idx}`}>
                    <Icon style={{ color }} />
                    <span className="tmq-icon-label">{name}</span>
                  </div>
                ))}
                <div className="tmq-item tmq-item--text" key="g4-label">
                  <h3 className="tmq-label">{row.label}</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
