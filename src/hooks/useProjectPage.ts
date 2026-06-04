import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Section {
  ref: { current: HTMLElement | null };
}

interface UseProjectPageOptions {
  /** One entry per observed section — order doesn't matter. */
  sections: Section[];
  /** The sidebar link that should be active on first render, e.g. "#project-hero-kc-best-sales" */
  defaultSidebarLink: string;
  /** The div that will be animated (parallax background). Optional — skip if the page has no parallax section. */
  parallaxRef?: { current: HTMLDivElement | null };
  /** The section that acts as the ScrollTrigger trigger for the parallax. Must be provided if parallaxRef is provided. */
  parallaxTriggerRef?: { current: HTMLElement | null };
}

interface UseProjectPageReturn {
  activeSidebarLink: string;
}

/**
 * Shared hook for all project detail pages.
 * Handles: GSAP parallax, fade-in observer, sidebar active-link observer,
 * resize refresh, scroll-to-top on mount, and back-navigation reload.
 */
export function useProjectPage({
  sections,
  defaultSidebarLink,
  parallaxRef,
  parallaxTriggerRef,
}: UseProjectPageOptions): UseProjectPageReturn {
  const [activeSidebarLink, setActiveSidebarLink] = useState(defaultSidebarLink);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Scoped GSAP context — only set up parallax when refs are provided
    const ctx = gsap.context(() => {
      if (parallaxRef?.current && parallaxTriggerRef?.current) {
        gsap.fromTo(
          parallaxRef.current,
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: parallaxTriggerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    });

    // Adds "is-visible" class when a section enters the viewport
    const fadeInObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    // Updates the active sidebar dot/link as the user scrolls
    const sidebarObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSidebarLink(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach((sec) => {
      if (sec.ref.current) {
        fadeInObserver.observe(sec.ref.current);
        sidebarObserver.observe(sec.ref.current);
      }
    });

    // Re-calculates ScrollTrigger positions when accordions open/close
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(document.body);

    // CRITICAL: Remove hash and scroll to top so GSAP calculates positions correctly.
    // We set scrollRestoration = "manual" FIRST to block Next.js from saving/restoring
    // any position for this route, then fire multiple scroll resets to win the race
    // against Next.js's own deferred scroll restoration which can fire after 50-100ms.
    window.history.scrollRestoration = "manual";
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    const forceTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    forceTop();
    const st1 = setTimeout(forceTop, 0);
    const st2 = setTimeout(forceTop, 50);
    const st3 = setTimeout(forceTop, 150);

    // Force full page reload on back/forward navigation to prevent GSAP/WebGL corruption
    const handlePageShow = (e: PageTransitionEvent): void => {
      if (e.persisted) window.location.reload();
    };
    const handlePopState = (): void => {
      window.location.reload();
    };
    window.addEventListener("pageshow", handlePageShow as EventListener);
    window.addEventListener("popstate", handlePopState);

    // Poll ScrollTrigger.refresh() for 3 s to account for async image loading
    const refreshInterval = setInterval(() => {
      ScrollTrigger.refresh();
    }, 500);
    const refreshTimeout = setTimeout(() => {
      clearInterval(refreshInterval);
    }, 3000);

    return () => {
      ctx.revert();
      resizeObserver.disconnect();
      clearTimeout(st1);
      clearTimeout(st2);
      clearTimeout(st3);
      clearInterval(refreshInterval);
      clearTimeout(refreshTimeout);
      window.removeEventListener("pageshow", handlePageShow as EventListener);
      window.removeEventListener("popstate", handlePopState);
      sections.forEach((sec) => {
        if (sec.ref.current) {
          fadeInObserver.unobserve(sec.ref.current);
          sidebarObserver.unobserve(sec.ref.current);
        }
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { activeSidebarLink };
}
