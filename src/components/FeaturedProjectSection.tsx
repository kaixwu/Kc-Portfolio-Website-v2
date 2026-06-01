import React from "react";

export default function FeaturedProjectSection() {
  return (
    <section className="featured-project" id="featured-project">
      <div className="featured-project__left" />
      <div className="featured-project__word">
        <span style={{ color: "var(--main-color, #ea580c)" }}>SunWise</span>
      </div>

      <p className="featured-project__desc">
        SunWise is an intelligent travel application that integrates advanced LLM APIs and real-time geographic data to deliver context-aware recommendations. It features dynamic itinerary generation, high-performance mapping controls, and a conversational AI to ensure a seamless and data-driven user experience.
      </p>
    </section>
  );
}
