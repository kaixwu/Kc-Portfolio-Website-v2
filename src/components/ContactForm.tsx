"use client";

import React, { useState, useEffect, useRef } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Force autoplay on mobile browsers which sometimes ignore the autoPlay attribute
    if (videoRef.current) {
      // iOS Safari requires explicit muted properties
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch((error) => {
        console.warn("Video autoplay blocked by browser:", error);
      });
    }
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
    <section className="contact" id="contact" style={{ position: "relative", overflow: "hidden" }}>
      <div className="video-background-container" style={{ backgroundColor: "#000" }}>
        <video
          ref={videoRef}
          id="contact-video-bg"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/assets/vids/contactme-abstract-vid-background.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay" style={{ background: "rgba(0, 0, 0, 0.6)" }}></div>
      </div>
      <h2 className="heading" style={{ position: "relative", zIndex: 1 }}>
        Contact <span>Me</span>
      </h2>

      <form id="contact-form" onSubmit={handleSubmit} style={{ position: "relative", zIndex: 1 }}>
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
