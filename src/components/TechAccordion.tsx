"use client";

import React, { useRef, useState } from "react";

/** Shared type used by all project pages for their tech stack data. */
export interface TechItem {
  id: number;
  title: string;
  iconClass: string;
  description: string;
}

interface TechAccordionProps {
  items: TechItem[];
}

/**
 * Self-contained accordion component for displaying a project's tech stack.
 * Manages its own open/close state internally.
 */
export default function TechAccordion({ items }: TechAccordionProps): React.JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const contentRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const toggle = (index: number): void => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      {items.map((tech, idx) => {
        const isOpen = openIndex === idx;
        const currentHeight = isOpen
          ? (contentRefs.current[idx]?.scrollHeight ?? 0) + "px"
          : "0px";

        return (
          <div
            className={`tech-accordion ${isOpen ? "active" : ""}`}
            key={tech.id}
          >
            <div className="tech-header" onClick={() => toggle(idx)}>
              <span className="tech-title">{tech.title}</span>
              <button className="tech-toggle" aria-expanded={isOpen}>
                <i className="bx bxs-chevron-down"></i>
                <i className="bx bx-x"></i>
              </button>
            </div>
            <div
              className="tech-content"
              style={{ maxHeight: currentHeight }}
            >
              <div
                className="tech-content-inner"
                ref={(el) => {
                  contentRefs.current[idx] = el;
                }}
              >
                <p>{tech.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
