"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

// ── Images that cycle through fullscreen ──────────────────────
const CYCLING_SRCS = [
  "/assets/img/kc-org-img1.jpg",
  "/assets/img/kc-org-img2.jpg",
  "/assets/img/kc-org-img3.jpg",
  "/assets/img/kc-org-img4.jpg",
  "/assets/img/kc-org-img5.jpg",
  "/assets/img/kc-org-img6.jpg",
];

// ── The final image that morphs into the Hero profile photo ───
const FINAL_SRC = "/assets/img/kc-img-2.jpg";

export default function LandingHero() {
  const overlayRef   = useRef<HTMLDivElement>(null);
  const r1Ref        = useRef<HTMLDivElement>(null);
  const r2Ref        = useRef<HTMLDivElement>(null);
  const cycRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const finalDivRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay  = overlayRef.current;
    const r1       = r1Ref.current;
    const r2       = r2Ref.current;
    const finalDiv = finalDivRef.current;
    if (!overlay || !r1 || !r2 || !finalDiv) return;

    // ── Always start at the very top of the page ──────────────
    window.scrollTo(0, 0);

    // ── Bulletproof scroll lock (works on all devices) ────────
    // overflow:hidden alone doesn't block mouse-wheel or iOS touch.
    // Non-passive preventDefault on wheel + touchmove is the only
    // reliable cross-browser, cross-device solution.
    const SCROLL_KEYS = new Set([
      "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " ",
    ]);
    const stopWheel     = (e: WheelEvent)       => e.preventDefault();
    const stopTouch     = (e: TouchEvent)       => e.preventDefault();
    const stopKeys      = (e: KeyboardEvent)    => {
      if (SCROLL_KEYS.has(e.key)) e.preventDefault();
    };

    // ── Check if we already saw the preloader in this session ─
    if (sessionStorage.getItem("hasSeenPreloader") === "true") {
      gsap.set(overlay, { display: "none" });
      const heroImg = document.querySelector<HTMLElement>(".home-img img");
      if (heroImg) {
        gsap.set(heroImg, { opacity: 1 });
      }
      return;
    }

    sessionStorage.setItem("hasSeenPreloader", "true");

    const lockScroll = () => {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow            = "hidden";
      window.addEventListener("wheel",     stopWheel, { passive: false });
      window.addEventListener("touchmove", stopTouch, { passive: false });
      window.addEventListener("keydown",   stopKeys,  { passive: false });
    };

    const unlockScroll = () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow            = "";
      window.removeEventListener("wheel",     stopWheel);
      window.removeEventListener("touchmove", stopTouch);
      window.removeEventListener("keydown",   stopKeys);
    };

    lockScroll();

    // ── Custom ease ───────────────────────────────────────────
    CustomEase.create("reveal", "M0,0 C0.16,1 0.3,1 1,1");

    // ── Suppress the hero profile image until we hand off ─────
    const heroImg = document.querySelector<HTMLElement>(".home-img img");
    if (heroImg) {
      heroImg.style.opacity = "0";
      heroImg.style.transition = "none";
    }

    // ── Set pixel values on finalDiv so GSAP can animate them ─
    gsap.set(finalDiv, {
      position: "fixed",
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      borderRadius: "0%",
      opacity: 0,
      overflow: "hidden",
      zIndex: 6,
    });

    // ── Hide all cycling images ────────────────────────────────
    gsap.set(cycRefs.current.filter(Boolean), { opacity: 0 });

    // ── Master timeline ────────────────────────────────────────
    const tl = gsap.timeline();

    // Phase 1 — split curtain opens (top slides up, bottom slides down)
    tl.to(r1, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1.1,
      ease: "reveal",
    }, 0)
    .to(r2, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      duration: 1.1,
      ease: "reveal",
    }, 0.12);

    // Phase 2 — rapid image cycling
    const cycleStart = 0.75;
    const cycleStep  = 0.42; // seconds per image

    cycRefs.current.forEach((el, i) => {
      if (!el) return;
      const t = cycleStart + i * cycleStep;
      tl.to(el, { opacity: 1, duration: 0.18, ease: "none" }, t);
      tl.to(el, { opacity: 0, duration: 0.18, ease: "none" }, t + 0.28);
    });

    const afterCycle = cycleStart + CYCLING_SRCS.length * cycleStep;

    // Phase 3 — show final image (profile photo) fullscreen
    tl.to(finalDiv, { opacity: 1, duration: 0.28, ease: "none" }, afterCycle);

    // Phase 4 — morph final image into hero profile circle
    tl.call(() => {
      const target = document.querySelector<HTMLElement>(".home-img img");
      if (!target) {
        // Fallback: no target found — still unlock scroll and fade out cleanly
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.5,
          delay: 0.3,
          onComplete: () => {
            unlockScroll();          // ← was missing here — scroll would stay locked!
            overlay.style.display = "none";
          },
        });
        return;
      }

      const rect = target.getBoundingClientRect();

      gsap.to(finalDiv, {
        top:          rect.top,
        left:         rect.left,
        width:        rect.width,
        height:       rect.height,
        borderRadius: "50%",
        duration:     1.25,
        ease:         "power3.inOut",
        onComplete: () => {
          // Hand off — reveal real hero image with a tiny cross-fade
          if (target) {
            gsap.to(target, { opacity: 1, duration: 0.35, ease: "none" });
          }
          // Fade the overlay out
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.45,
            delay: 0.15,
            onComplete: () => {
              // Unlock scroll — animation is fully done
              unlockScroll();
              overlay.style.display = "none";
              // Restore hero image CSS transition so hover glow works again
              if (target) target.style.transition = "";
            },
          });
        },
      });
    }, [], afterCycle + 0.55);

    return () => {
      tl.kill();
      // Safety: always restore scroll + hero image on cleanup / fast-refresh
      unlockScroll();
      if (heroImg) {
        heroImg.style.opacity    = "1";
        heroImg.style.transition = "";
      }
      if (overlay) overlay.style.display = "none";
    };
  }, []);

  return (
    <div className="lh-overlay" ref={overlayRef}>
      {/* ── Split curtain ────────────────────────────────────── */}
      <div className="lh-revealers">
        <div className="lh-revealer lh-r1" ref={r1Ref} />
        <div className="lh-revealer lh-r2" ref={r2Ref} />
      </div>

      {/* ── Cycling images ───────────────────────────────────── */}
      {CYCLING_SRCS.map((src, i) => (
        <div
          key={i}
          className="lh-cycling-img"
          ref={el => { cycRefs.current[i] = el; }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={`Portfolio snapshot ${i + 1}`} />
        </div>
      ))}

      {/* ── Final image (profile) — morphs into Hero circle ──── */}
      <div className="lh-final-img" ref={finalDivRef}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={FINAL_SRC} alt="Kc Casipit" />
      </div>
    </div>
  );
}
