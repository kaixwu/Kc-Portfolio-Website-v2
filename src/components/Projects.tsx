"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    id: "card-1",
    category: "Online Catalog",
    title: "Kc Best Sales, Inc.",
    description:
      "This project involved building a professional online catalog for KC Best Sales, Inc., a major distributor of truck and off-the-road (OTR) tires. The client needed a clear, credible way to present their products and technical data. I built a responsive website that highlights their core brands and allows customers to easily browse, compare tire models, and access detailed specification tables.",
    href: "/projects/kc-best-sales",
    img: "/assets/img/kc-best-sales-hero-background.webp",
    imgAlt: "Kc Best Sales Project Thumbnail",
    bg: "#1a1207",
    accent: "#c45200",
  },
  {
    id: "card-2",
    category: "Corporate Website",
    title: "AirLive Communications",
    description:
      "I developed the corporate website for AirLive Communications, a top-tier provider of dedicated business internet in the Philippines. The site serves as their primary digital storefront, built to attract and inform enterprise and SME clients. My role was to translate their established brand and complex services into a clean, professional, and easy-to-navigate website that drives inquiries and builds trust.",
    href: "/projects/airlive-communications",
    img: "/assets/img/airlive-coms-hero-background.webp",
    imgAlt: "AirLive Communications Project Thumbnail",
    bg: "#071218",
    accent: "#0072aa",
  },
  {
    id: "card-3",
    category: "Online Catalog",
    title: "Kc Best Sales, Inc.",
    description:
      "This project involved building a professional online catalog for KC Best Sales, Inc., a major distributor of truck and off-the-road (OTR) tires. The client needed a clear, credible way to present their products and technical data. I built a responsive website that highlights their core brands and allows customers to easily browse, compare tire models, and access detailed specification tables.",
    href: "/projects/kc-best-sales",
    img: "/assets/img/kc-best-sales-hero-background.webp",
    imgAlt: "Kc Best Sales Project Thumbnail",
    bg: "#160e1a",
    accent: "#7a3fa0",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Lenis: only init if not already running site-wide.
    // We scope it to Projects scroll for safety without breaking other sections.
    let lenis: { raf: (t: number) => void; on: (e: string, cb: unknown) => void; destroy: () => void } | null = null;

    const initLenis = async () => {
      try {
        const LenisModule = await import("lenis");
        const Lenis = LenisModule.default ?? LenisModule;
        lenis = new (Lenis as new (opts?: object) => typeof lenis & { raf: (t: number) => void; on: (e: string, cb: unknown) => void; destroy: () => void })();
        lenis!.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time: number) => {
          lenis!.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      } catch (_) {
        // lenis failed to load; animation still works via native scroll
      }
    };

    initLenis();

    const cards = cardsRef.current;
    const totalCards = cards.length;
    const segmentSize = 1 / totalCards;
    const cardOffset = 40;
    const cardScaleStep = 0.065;

    // Set initial stacked state
    cards.forEach((card, i) => {
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50,
        y: i * cardOffset,
        scale: 1 - i * cardScaleStep,
        rotationX: 0,
      });
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * (totalCards + 1)}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const activeIndex = Math.min(
            Math.floor(progress / segmentSize),
            totalCards - 1
          );
          const segmentProgress =
            (progress - activeIndex * segmentSize) / segmentSize;

          cards.forEach((card, i) => {
            if (i < activeIndex) {
              gsap.set(card, { yPercent: -250, rotationX: 35, scale: 1 });
            } else if (i === activeIndex) {
              gsap.set(card, {
                yPercent: gsap.utils.interpolate(-50, -250, segmentProgress),
                rotationX: gsap.utils.interpolate(0, 35, segmentProgress),
                scale: 1,
              });
            } else {
              const behindIndex = i - activeIndex;
              const currentYOffset =
                behindIndex * cardOffset - segmentProgress * cardOffset;
              const currentScale =
                1 -
                behindIndex * cardScaleStep +
                segmentProgress * cardScaleStep;
              gsap.set(card, {
                yPercent: -50,
                y: currentYOffset,
                scale: currentScale,
                rotationX: 0,
              });
            }
          });
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="projects-sticky-section"
      id="projects"
    >
      {/* Section label */}
      <div className="projects-sticky-label">
        <h2 className="heading">Projects</h2>
      </div>

      {/* Cards */}
      {CARDS.map((card, i) => (
        <div
          key={card.id}
          id={card.id}
          ref={(el) => { if (el) cardsRef.current[i] = el; }}
          className="projects-sticky-card"
          style={{
            backgroundColor: card.bg,
            zIndex: CARDS.length - i,
          }}
        >
          {/* Left col: text */}
          <div className="projects-sticky-col projects-sticky-col--text">
            <p className="projects-sticky-category">{card.category}</p>
            <h3 className="projects-sticky-title">{card.title}</h3>
            <p className="projects-sticky-desc">{card.description}</p>
            <Link
              href={card.href}
              className="btn projects-sticky-btn"
              style={{ borderColor: card.accent, color: card.accent }}
            >
              View Project
            </Link>
          </div>

          {/* Right col: image */}
          <div className="projects-sticky-col projects-sticky-col--img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.img}
              alt={card.imgAlt}
              className="projects-sticky-img"
            />
          </div>
        </div>
      ))}
    </section>
  );
}
