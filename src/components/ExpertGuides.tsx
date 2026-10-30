import React from "react";

interface ExpertGuidesProps {
  onSelectDestination: (id: string) => void;
  onOpenAdvisoryModal: () => void;
}

export const ExpertGuides: React.FC<ExpertGuidesProps> = ({
  onSelectDestination,
  onOpenAdvisoryModal,
}) => {
  return (
    <section className="section-space expert-guide-section" id="expert-guides">
      <div className="container">
        <div className="section-header text-center">
          <div className="archival-badge mx-auto">
            <i className="fa-solid fa-mountain-sun"></i>
            <span>ROUTE AUTHENTICITY &bull; ACCREDITED EXPLORERS</span>
          </div>
          <h2 className="section-headline">
            Curated by <span className="font-serif italic font-normal text-gradient">Himalayan & Global</span> Field Guides
          </h2>
          <p className="section-subheadline max-w-700">
            Wanderlust routes aren't scraped by bots. They are tested by veteran high-altitude mountaineers, local cultural stewards, and independent travelers who know every hairpin pass and family homestay.
          </p>
        </div>

        {/* Featured Lead Expedition Guide Card */}
        <div className="lead-guide-card glass-panel">
          <div className="guide-grid">
            <div className="guide-image-col">
              <div className="guide-image-wrapper">
                <img
                  src="/assets/images/lead_guide.jpg"
                  alt="Tenzing Norbu - Senior Himalayan Expedition Specialist"
                  className="guide-main-img"
                />
                <div className="guide-img-overlay"></div>

                <div className="guide-badge-top">
                  <i className="fa-solid fa-certificate"></i>
                  <span>IMF Certified Alpine Lead</span>
                </div>

                <div className="guide-badge-bottom">
                  <span className="pulse-indicator"></span>
                  <span>Active in Field: Spiti & Ladakh (2026 Season)</span>
                </div>
              </div>
            </div>

            <div className="guide-info-col">
              <div className="guide-meta-header">
                <span className="guide-tag">Lead Expedition Specialist</span>
                <span className="guide-years">
                  <i className="fa-solid fa-shield-halved"></i> 24+ Years High-Altitude Experience
                </span>
              </div>

              <h3 className="guide-name">Tenzing Norbu</h3>
              <p className="guide-title-sub">
                High-Altitude Expedition Director • Spiti, Ladakh & Zanskar Trans-Himalayan Circuits
              </p>

              <div className="guide-quote-box">
                <i className="fa-solid fa-quote-left quote-icon"></i>
                <p className="guide-quote">
                  "The mountains do not yield to hurried tourists. When you respect the 3-day altitude rhythm, stay in indigenous mud-brick homestays, and sip butter tea with village elders, the Himalayas welcome you as family."
                </p>
              </div>

              <div className="guide-metrics-strip">
                <div className="guide-metric-item">
                  <span className="gm-number">140+</span>
                  <span className="gm-label">High Passes Crossed</span>
                </div>
                <div className="guide-metric-item">
                  <span className="gm-number">18,380 ft</span>
                  <span className="gm-label">Max Guided Altitude</span>
                </div>
                <div className="guide-metric-item">
                  <span className="gm-number">100%</span>
                  <span className="gm-label">Safety Track Record</span>
                </div>
                <div className="guide-metric-item">
                  <span className="gm-number">Zero-Waste</span>
                  <span className="gm-label">Pack-Out Ethics</span>
                </div>
              </div>

              <div className="guide-rules-block">
                <h4 className="guide-rules-title">
                  <i className="fa-solid fa-compass-drafting text-cyan"></i> Tenzing's 3 Non-Negotiable Mountain Principles
                </h4>
                <div className="guide-rules-grid">
                  <div className="guide-rule-item">
                    <span className="rule-num">01</span>
                    <div className="rule-content">
                      <strong>The 48-Hour Acclimatization Buffer</strong>
                      <p>Never cross 10,000 ft (Rohtang or Kunzum) without resting two full nights in the lower valley.</p>
                    </div>
                  </div>
                  <div className="guide-rule-item">
                    <span className="rule-num">02</span>
                    <div className="rule-content">
                      <strong>Empower Village Homestays</strong>
                      <p>Stay with local families in Langza and Kibber so your travel funds directly support high-altitude schools.</p>
                    </div>
                  </div>
                  <div className="guide-rule-item">
                    <span className="rule-num">03</span>
                    <div className="rule-content">
                      <strong>Leave No Glacial Trace</strong>
                      <p>Carry refillable bottles and take back all non-biodegradable waste to base camp in Manali or Leh.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="guide-actions-row">
                <button
                  className="btn btn-primary btn-sm guide-route-btn"
                  onClick={() => onSelectDestination("spiti-valley")}
                >
                  <i className="fa-solid fa-map-location-dot"></i> View Spiti Valley Route
                </button>
                <button
                  className="btn btn-outline btn-sm guide-route-btn"
                  onClick={() => onSelectDestination("leh-ladakh")}
                >
                  <i className="fa-solid fa-mountain"></i> View Leh-Ladakh Route
                </button>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={onOpenAdvisoryModal}
                >
                  <i className="fa-solid fa-shield-heart"></i> Field Checklist & Advisory
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Specialists Collective */}
        <div className="collective-intro text-center">
          <h3 className="collective-title">Our Global & Regional Advisory Network</h3>
          <p className="collective-desc">
            Collaborating with verified local guides and independent explorers across diverse terrains.
          </p>
        </div>

        <div className="collective-grid">
          <div className="collective-card glass-panel">
            <div className="col-expert-badge">
              <i className="fa-solid fa-water"></i> Backwaters Specialist
            </div>
            <div className="col-expert-header">
              <div className="col-expert-avatar avatar-kerala">
                <i className="fa-solid fa-sailboat"></i>
              </div>
              <div>
                <h4 className="col-expert-name">Ananya Sharma</h4>
                <span className="col-expert-location">Kerala & Western Ghats, India</span>
              </div>
            </div>
            <p className="col-expert-bio">
              12 years documenting eco-tourism canals, monsoon navigation, and responsible spice-estate homestays in Alleppey and Munnar.
            </p>
            <div className="col-expert-footer">
              <span className="col-stat">
                <i className="fa-solid fa-check"></i> 80+ Routes Verified
              </span>
              <button
                className="btn btn-text btn-sm guide-route-btn"
                onClick={() => onSelectDestination("kerala-backwaters")}
              >
                Explore Kerala <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>

          <div className="collective-card glass-panel">
            <div className="col-expert-badge">
              <i className="fa-solid fa-mountain"></i> Alpine & Coastal Director
            </div>
            <div className="col-expert-header">
              <div className="col-expert-avatar avatar-alps">
                <i className="fa-solid fa-train-subway"></i>
              </div>
              <div>
                <h4 className="col-expert-name">Marco Moretti</h4>
                <span className="col-expert-location">Swiss Alps & Amalfi Coast</span>
              </div>
            </div>
            <p className="col-expert-bio">
              Alpine transit planner specializing in Swiss Panoramic train passes, cliffside hiking trails, and Mediterranean shoulder-season travel.
            </p>
            <div className="col-expert-footer">
              <span className="col-stat">
                <i className="fa-solid fa-check"></i> 15 Yrs European Logistics
              </span>
              <button
                className="btn btn-text btn-sm guide-route-btn"
                onClick={() => onSelectDestination("swiss-alps")}
              >
                Explore Alps <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>

          <div className="collective-card glass-panel">
            <div className="col-expert-badge">
              <i className="fa-solid fa-torii-gate"></i> Cultural Heritage Curator
            </div>
            <div className="col-expert-header">
              <div className="col-expert-avatar avatar-kyoto">
                <i className="fa-solid fa-tree"></i>
              </div>
              <div>
                <h4 className="col-expert-name">Kenji Takahashi</h4>
                <span className="col-expert-location">Kyoto & Historic Trails, Japan</span>
              </div>
            </div>
            <p className="col-expert-bio">
              Temple historian and walking trail archivist specializing in ryokan hospitality, early morning crowd-free routes, and Zen garden philosophy.
            </p>
            <div className="col-expert-footer">
              <span className="col-stat">
                <i className="fa-solid fa-check"></i> Certified Heritage Guide
              </span>
              <button
                className="btn btn-text btn-sm guide-route-btn"
                onClick={() => onSelectDestination("kyoto-japan")}
              >
                Explore Kyoto <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
