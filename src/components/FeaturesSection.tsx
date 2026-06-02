"use client";

import React, { useLayoutEffect, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// ── Content adapted for Kc's portfolio ──────────────────────
const FEATURES = [
  {
    img: "/assets/vids/sunwise-ai-discovery.mp4",
    poster: "/assets/img/sunwise-ai-discovery-poster.webp",
    alt: "AI Discovery",
    text: "A context-aware recommendation engine leveraging the Gemini API to analyze hyper-local GPS coordinates and real-time meteorological data. It dynamically curates optimal destinations - such as suggesting indoor cafes during heavy rainfall - to ensure a seamless travel experience.",
  },
  {
    img: "/assets/vids/sunwise-chatbot.mp4",
    poster: "/assets/img/sunwise-chatbot-poster.webp",
    alt: "Conversational AI",
    text: "An intelligent, context-aware chatbot integrated seamlessly into the application. It leverages advanced LLM APIs to provide users with real-time, interactive travel advice, meteorological interpretations, and on-the-fly itinerary troubleshooting.",
  },
  {
    img: "/assets/vids/sunwise-routing.mp4",
    poster: "/assets/img/sunwise-routing-poster.webp",
    alt: "Smart Itineraries",
    text: "An intelligent day-to-day itinerary scheduler deeply integrated with TomTom Traffic APIs. It calculates precise point-to-point travel times and live traffic delays, dynamically rendering optimized geometric route polylines directly onto the user's map.",
  },
  {
    img: "/assets/vids/sunwise-weather.mp4",
    poster: "/assets/img/sunwise-weather-poster.webp",
    alt: "Interactive Weather Maps",
    text: "High-performance, multi-layered Leaflet mapping integrated with OpenWeatherMap APIs. Features custom-built, hardware-accelerated toggle controls to instantly render precipitation radars, temperature heatmaps, and wind velocity overlays with zero latency.",
  },
  {
    img: "/assets/vids/sunwise-works-globally.mp4",
    poster: "/assets/img/sunwise-works-globally-poster.webp",
    alt: "Works Globally",
    text: "Engineered for true borderless functionality. The application aggregates data from a network of global APIs to instantly parse spatial coordinates, fetch real-time meteorological telemetry, and curate dynamic itineraries for absolutely any city on Earth.",
  },
];

const SUBHEADINGS = [
  "ai discovery",
  "conversational ai",
  "smart itineraries",
  "weather maps",
  "works globally",
];

export interface FeatureData {
  img: string;
  poster?: string;
  alt: string;
  text: string;
}

export interface FeaturesSectionProps {
  features?: FeatureData[];
  subheadings?: string[];
}

export default function FeaturesSection({ 
  features = FEATURES, 
  subheadings = SUBHEADINGS 
}: FeaturesSectionProps = {}) {
  // ── Arc animation constants ─────────────────────────────────
  const TOTAL_CARDS = features.length + 2; 
  const ARC_ANGLE = Math.PI * 0.4;
  const START_ANGLE = Math.PI / 2 - ARC_ANGLE / 2;

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const featureVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const countContainerRef = useRef<HTMLDivElement>(null);
  const subheadingRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Play/pause video based on viewport visibility to save GPU/Battery
  useIsomorphicLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0 });

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useIsomorphicLayoutEffect(() => {
    // Sticky scroll height - optimized to prevent empty black scroll space at the end
    const stickyHeight = window.innerHeight * 2.0;

    // Responsive radius - standardizing breakpoint to 1024px for iPad Pro support
    const getRadius = () =>
      window.innerWidth <= 1024
        ? window.innerWidth * 7.5
        : window.innerWidth * 2.5;

    // Counter element height changes at breakpoints to match CSS
    const getCounterH = () => {
      const w = window.innerWidth;
      if (w < 480) return 30; // Mobile
      if (w < 850) return 35; // iPad Air / Standard Tablet
      if (w <= 1024) return 40; // iPad Pro / Large Tablet
      return 50; // Desktop
    };

    // ── Reconstructed positionCards ──────────────────────────────────
    function positionCards(progress: number) {
      const radius = getRadius();
      const h = getCounterH();

      // Position each card along the arc
      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        // Progress for this specific card along the arc (starts with first card centered)
        const p = 0.5 + progress * (4 / TOTAL_CARDS) - i / TOTAL_CARDS;
        const angle = START_ANGLE + ARC_ANGLE * p;

        // Convert polar → Cartesian (screen coords: y grows downward)
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        // Rotation keeps card perpendicular to the arc tangent
        const rotation = -(angle - Math.PI / 2) * (180 / Math.PI);

        gsap.set(card, {
          x,
          // -(y - radius) means: at angle=PI/2 (top) → y_screen=0 (center),
          // approaching from below (+y) and exiting above (-y)
          y: -(y - radius),
          rotation,
        });
      });

      // ── Counter: find the last real card that has passed the arc midpoint ──
      // When a card's p >= 0.5, it has reached or passed the front-center position
      let activeStep = -1; // -1 = no card at front yet → counter hidden
      for (let i = 0; i < features.length; i++) {
        const p = 0.5 + progress * (4 / TOTAL_CARDS) - i / TOTAL_CARDS;
        if (p >= 0.5) activeStep = i;
      }

      if (countContainerRef.current) {
        // activeStep === -1 → push counter below clip (hidden)
        // activeStep  >=  0 → snap to the matching number
        gsap.set(countContainerRef.current, {
          y: activeStep === -1 ? h : -h * activeStep,
        });
      }

      // Play the active video and pause others
      featureVideoRefs.current.forEach((video, idx) => {
        if (!video) return;
        if (idx === activeStep) {
          if (video.paused) video.play().catch(() => {});
        } else {
          if (!video.paused) video.pause();
        }
      });

      // Highlight the active subheading
      subheadingRefs.current.forEach((el, idx) => {
        if (!el) return;
        if (idx === activeStep) {
          el.classList.add("active-subheading");
        } else {
          el.classList.remove("active-subheading");
        }
      });
    }

    // Initialise card positions before any scroll
    positionCards(0);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${stickyHeight}px`,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => positionCards(self.progress),
      });
    }, sectionRef);

    return () => {
      // Explicitly kill every ScrollTrigger whose trigger element is inside
      // this section BEFORE calling ctx.revert(). GSAP's pin:true injects a
      // pin-spacer <div> into the real DOM; if we let React unmount first,
      // the spacer is already orphaned and ScrollTrigger.revert() throws
      // "removeChild: not a child of this node". Killing first removes spacers cleanly.
      const section = sectionRef.current;
      ScrollTrigger.getAll().forEach((st) => {
        if (section && st.trigger && section.contains(st.trigger as Node)) {
          st.kill(true);
        }
      });
      ctx.revert();
    };
  }, []);

  return (
    <>
      {/* ── Features Section ─────────────────────────────────── */}
      <section className="features-sect" ref={sectionRef} id="features">
        
        {/* Background Video */}
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          className="features-bg-video"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            opacity: 0.35 // Make it subtle to not overpower the content
          }}
        >
          <source src="/assets/vids/features-bg.mp4" type="video/mp4" />
        </video>

        {/* Video Attribution (Hidden from UI to prevent distraction, kept in DOM for licensing) */}
        <div style={{ display: "none" }}>
          Video by <a href="https://pixabay.com/users/olenchic-16658974/?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=202587" target="_blank" rel="noopener noreferrer">Olena</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=202587" target="_blank" rel="noopener noreferrer">Pixabay</a>
        </div>

        {/* Feature Counter */}
        <div className="features-counter" style={{ zIndex: 1 }}>
          <div className="features-counter-title">
            <span className="features-counter-h">Features</span>
          </div>
          <div className="features-count">
            <div className="features-count-container" ref={countContainerRef}>
              {subheadings.map((text, idx) => (
                <span 
                  className="features-count-h" 
                  key={idx}
                  ref={(el) => { subheadingRefs.current[idx] = el; }}
                >
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Arc Cards */}
        <div className="features-cards" style={{ zIndex: 1 }}>
          {features.map((feature, i) => (
            <div
              className="features-card"
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
            >
              <div className="features-card-img">
                {feature.img.endsWith('.mp4') ? (
                  <video 
                    ref={(el) => { featureVideoRefs.current[i] = el; }}
                    src={feature.img} 
                    poster={feature.poster}
                    preload="none"
                    loop 
                    muted 
                    playsInline 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={feature.img} alt={feature.alt} loading="lazy" />
                )}
              </div>
              <div className="features-card-content">
                <p>{feature.text}</p>
              </div>
            </div>
          ))}

          {/* Two empty spacer cards - required for arc end-padding */}
          {[features.length, features.length + 1].map((idx) => (
            <div
              className="features-card features-empty"
              key={`empty-${idx}`}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
}
