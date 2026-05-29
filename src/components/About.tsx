import React from "react";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-img">
        <img src="/assets/img/kc-img-1.JPG" alt="Kc Casipit posing with sea of clouds" />
      </div>

      <div className="about-content">
        <h2>About <span>Me</span></h2>
        <p>
          Beyond the code, I'm driven by a deep sense of curiosity.
          This curiosity fuels both my work as a developer and my personal passion for traveling.
          I recently visited Davao and was captivated by the cool weather and the incredible views from the highlands.
          Waking up to a majestic sea of clouds at Sonnen Berg was an unforgettable experience that only intensified my desire to explore.
          I've built this section to share more of my story.
          <br /><br />
          Feel free to explore my involvement in different Organizations, see my travel bucket list under Destination, or
          get to know my professional side in the FAQ.
        </p>
        <div className="btn-group-about">
          <a href="#destination" className="btn">Destination</a>
          <a href="#organization" className="btn">Organization</a>
          <a href="#faq" className="btn">FAQ</a>
        </div>
      </div>
    </section>
  );
}
