"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FaqItem {
  id: number;
  question: string;
  answer: React.ReactNode;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 1,
    question: "Your resume lists a lot of leadership and writing experience. How does that make you a better developer?",
    answer: (
      <>
        My leadership and writing roles have been essential to my development work. As a News Writer before in an academic organization, Vox Nova,
        I had to research complex topics and communicate them clearly and accurately — which is exactly what's
        needed when translating a client's idea into a technical
        specification or explaining progress.
        <br /><br />
        My experience in leadership, like being Class President and on the Secretariat for the Sipnayan Club,
        taught me time management, documentation, and team coordination. Balancing academics with these roles has
        made me very organized, which is how I've successfully managed freelance deadlines alongside my college studies.
      </>
    ),
  },
  {
    id: 2,
    question: "Working as an ESL teacher for a short period influenced you in what way?",
    answer: (
      <>
        I took that role to build my communication skills in a different environment. While I value the experience, I
        learned very quickly that my real passion and long-term career path is in tech.
        <br /><br />
        Around that same time, my freelance development work was starting to grow. I made the decision to dedicate my full focus to my studies and
        to building my skills as a web developer, which is where I've been focused ever since.
      </>
    ),
  },
  {
    id: 3,
    question: "Your overview mentions a 'logical approach' from your Science and Math background. How do you apply that to web development?",
    answer: (
      <>
        I'm very systematic. I treat a bug like a puzzle. I don't just start guessing. I will use the dev tools,
        inspect the element, and check the console. That's where I find the first clue. From there,
        it's a process of elimination. I'll test one idea, like, 'Did I misspell my CSS class name?' or
        'Is there a typo in my HTML tag?' If that's not it, I'll check my JavaScript to see if I'm even selecting the right element.
        <br /><br />
        This methodical way of thinking comes from my background in science and math, and it helps me find the actual
        problem fast instead of wasting time.
      </>
    ),
  },
  {
    id: 4,
    question: "How do you stay up-to-date with new web technologies while you're focused on school and freelance work?",
    answer: (
      <>
        I'm a big believer in continuous learning. On top of following tech blogs and YouTube channels,
        I'm actively working through structured curricula on freeCodeCamp and The Odin Project to build a deep, solid foundation.
        <br /><br />
        But for me, the most important step is applying it. If I learn about a new tool or CSS feature,
        I'll immediately try to build a small personal project with it. That hands-on approach is
        how I make sure I actually understand a new technology, not just know what it is.
      </>
    ),
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item active by default
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // References for height computation
  const contentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !bgRef.current) return;
    
    // MatchMedia to only enable parallax on larger screens if desired, but GSAP handles it well
    let ctx = gsap.context(() => {
      // Animate the background image itself instead of backgroundPositionY for much better performance
      // We animate yPercent to create the parallax effect
      gsap.fromTo(bgRef.current, 
        { yPercent: -15 }, 
        {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom", // Start when the top of the section hits the bottom of the viewport
            end: "bottom top",   // End when the bottom of the section hits the top of the viewport
            scrub: true,         // Smooth scrubbing
          }
        }
      );
    });

    return () => {
      ctx.revert(); // Clean up GSAP animations on unmount
    };
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-interview" id="faq" ref={sectionRef} style={{ position: "relative", overflow: "hidden" }}>
      <div className="parallax-bg" id="faq-parallax-bg" ref={bgRef}></div>

      <h2 className="heading-medium">
        <span>Frequently</span> Asked Questions
      </h2>
      <div className="faq-container">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          const currentHeight = isOpen
            ? contentRefs.current[idx]?.scrollHeight + "px"
            : "0px";

          return (
            <div
              className={`faq-accordion ${isOpen ? "active" : ""}`}
              key={item.id}
            >
              <div className="faq-header" onClick={() => toggleAccordion(idx)}>
                <h3 className="faq-title">{item.question}</h3>
                <button className="faq-toggle" aria-expanded={isOpen}>
                  <i className="bx bxs-chevron-down"></i>
                  <i className="bx bx-x"></i>
                </button>
              </div>
              <div
                className="faq-content"
                style={{ maxHeight: currentHeight }}
              >
                <div
                  className="faq-content-inner"
                  ref={(el) => {
                    contentRefs.current[idx] = el;
                  }}
                >
                  <p className="faq-text">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
