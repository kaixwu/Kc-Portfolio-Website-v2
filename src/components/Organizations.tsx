import React from "react";

export default function Organizations() {
  return (
    <section className="kc-organizations" id="organization">
      <h2 className="heading-medium" id="org-heading">
        <span>Kc</span> in Organizations
      </h2>
      <div className="kc-org-container">
        <div className="kc-org-row kc-org-row-1">
          <div className="kc-org-col">
            <div className="kc-org-col-box">
              <img src="/assets/img/kc-org-img1.jpg" alt="Kc Casipit at organization event 1" loading="lazy" />
            </div>
          </div>

          <div className="kc-org-col kc-org-col-2">
            <div className="kc-org-col-box">
              <img src="/assets/img/kc-org-img4.jpg" alt="Kc Casipit at organization event 4" loading="lazy" />
            </div>
          </div>
        </div>

        <div className="kc-org-row kc-org-row-2">
          <div className="kc-org-box">
            <img src="/assets/img/kc-org-img3.jpg" alt="Kc Casipit at organization event 3" loading="lazy" />
          </div>
          <div className="kc-org-box">
            <img src="/assets/img/kc-org-img5.jpg" alt="Kc Casipit at organization event 5" loading="lazy" />
          </div>
          <div className="kc-org-box">
            <img src="/assets/img/kc-org-img7.jpg" alt="Kc Casipit at organization event 7" loading="lazy" />
          </div>
        </div>

        <div className="kc-org-row kc-org-row-3">
          <div className="kc-org-box">
            <img src="/assets/img/kc-org-img2.jpg" alt="Kc Casipit at organization event 2" loading="lazy" />
          </div>
          <div className="kc-org-box">
            <img src="/assets/img/kc-org-img6.jpg" alt="Kc Casipit at organization event 6" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
