"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !bgRef.current) return;
    
    let ctx = gsap.context(() => {
      // Animate the background image itself for parallax
      gsap.fromTo(bgRef.current, 
        { yPercent: -15 }, 
        {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom", 
            end: "bottom top",   
            scrub: true,         
          }
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    // Map ID to form state key
    const stateKey = id.replace("contact-", "");
    setFormData((prev) => ({
      ...prev,
      [stateKey]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, phone, subject, message } = formData;
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
    
    const mailtoLink = `mailto:${encodeURIComponent("Kc Casipit")} <casipitkylechristian@gmail.com>?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  return (
    <section className="contact" id="contact" ref={sectionRef} style={{ position: "relative", overflow: "hidden" }}>
      <div className="parallax-bg" id="contact-parallax-bg" ref={bgRef}></div>
      <div className="video-overlay" style={{ background: "rgba(0, 0, 0, 0.55)", zIndex: 2 }}></div>

      <h2 className="heading" style={{ position: "relative", zIndex: 3 }}>
        Contact <span>Me</span>
      </h2>

      <form id="contact-form" onSubmit={handleSubmit} style={{ position: "relative", zIndex: 3 }}>
        <div className="input-group">
          <div className="input-box">
            <input
              type="text"
              id="contact-name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              id="contact-email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <input
              type="tel"
              id="contact-phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              id="contact-subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="input-group-2">
          <textarea
            id="contact-message"
            placeholder="Your Message"
            cols={30}
            rows={10}
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <input type="submit" value="Send Message" className="btn" />
        </div>
      </form>
    </section>
  );
}
