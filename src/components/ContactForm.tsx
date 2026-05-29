"use client";

import React, { useState } from "react";
import FluidGradient from "./FluidGradient";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

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
      <FluidGradient 
        color1="#ea580c" 
        color2="#c2410c" 
        color3="#7c2d12" 
        color4="#fed7aa" 
        colorIntensity={0.8} 
        opacity={0.65} 
      />
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
