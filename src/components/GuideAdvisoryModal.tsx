import React from "react";

interface GuideAdvisoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideAdvisoryModal: React.FC<GuideAdvisoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop active" id="guideAdvisoryModal">
      <div className="modal-dialog glass-panel modal-lg">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="advisory-modal-content">
          <div className="advisory-modal-header">
            <div className="advisory-icon-circle">
              <i className="fa-solid fa-shield-heart"></i>
            </div>
            <div>
              <span className="advisory-kicker">Official Expedition Advisory • 2026 Edition</span>
              <h3 className="advisory-title">High-Altitude Field Briefing by Tenzing Norbu</h3>
              <p className="advisory-subtitle">
                Essential medical, gear, and cultural guidelines for expeditions into Spiti, Ladakh, and alpine zones above 10,000 ft.
              </p>
            </div>
          </div>

          <div className="advisory-sections-grid">
            <div className="advisory-card">
              <h4>
                <i className="fa-solid fa-heart-pulse text-rose"></i> 1. Altitude Sickness (AMS) Protocol
              </h4>
              <ul>
                <li>
                  <strong>Ascend Slowly:</strong> Ascend no more than 1,000–1,500 ft sleeping elevation per 24 hours above 9,000 ft.
                </li>
                <li>
                  <strong>Hydration Ratio:</strong> Drink 3.5 to 4 liters of warm water, garlic soup, or herbal tea daily. Strictly avoid alcohol and sedatives.
                </li>
                <li>
                  <strong>Medication:</strong> Consult your physician regarding Acetazolamide (Diamox). Carry it as prophylaxis, not as a substitute for gradual ascent.
                </li>
                <li>
                  <strong>The Golden Rule:</strong> If severe headache, nausea, or ataxia occurs: <em>never ascend further; descend immediately</em>.
                </li>
              </ul>
            </div>

            <div className="advisory-card">
              <h4>
                <i className="fa-solid fa-person-hiking text-cyan"></i> 2. Critical High-Altitude Gear Checklist
              </h4>
              <ul>
                <li>
                  <strong>UV400 Polarized Eyewear:</strong> Himalayan snow & high-pass UV index is 40% stronger than sea level. Snow blindness is real.
                </li>
                <li>
                  <strong>Layering System:</strong> Moisture-wicking base layer + fleece mid-layer + down jacket (rated to -10°C) + windproof shell.
                </li>
                <li>
                  <strong>Power Resilience:</strong> Sub-zero temps drain lithium batteries in minutes. Carry powerbanks inside your inner jacket pockets.
                </li>
                <li>
                  <strong>Footwear:</strong> Broken-in waterproof trekking boots with ankle support; do not test brand-new boots in remote passes.
                </li>
              </ul>
            </div>

            <div className="advisory-card">
              <h4>
                <i className="fa-solid fa-hands-praying text-amber"></i> 3. Himalayan Homestay & Cultural Etiquette
              </h4>
              <ul>
                <li>
                  <strong>Monastery Respect:</strong> Always circumambulate stupas and chortens clockwise (keep them on your right).
                </li>
                <li>
                  <strong>Greeting Elders:</strong> Say <em>"Julley"</em> with folded hands and a gentle bow. It means Hello, Thank You, and Safe Travels.
                </li>
                <li>
                  <strong>Photography Dignity:</strong> Always ask permission before photographing elderly monks or village residents.
                </li>
                <li>
                  <strong>Water Conservation:</strong> High desert villages rely on scarce glacial run-off. Use hot bucket water sparingly.
                </li>
              </ul>
            </div>

            <div className="advisory-card">
              <h4>
                <i className="fa-solid fa-phone-volume text-emerald"></i> 4. Remote Communications & Lifelines
              </h4>
              <ul>
                <li>
                  <strong>BSNL Network:</strong> Postpaid BSNL SIM cards provide the only active signal in remote Spiti (Kaza, Mudh) and border Ladakh.
                </li>
                <li>
                  <strong>Offline Navigation:</strong> Pre-download entire Himachal & Ladakh offline map packs on Google Maps and Maps.me before leaving Manali/Shimla.
                </li>
                <li>
                  <strong>Emergency Outposts:</strong> Medical centers with hyperbaric chambers and oxygen cylinders are located in Kaza, Keylong, and Leh Military Hospital.
                </li>
              </ul>
            </div>
          </div>

          <div className="advisory-modal-footer">
            <div className="advisory-guide-signoff">
              <img
                src="/assets/images/lead_guide.jpg"
                alt="Tenzing Norbu"
                className="signoff-avatar"
              />
              <div>
                <strong>Tenzing Norbu</strong>
                <span>Lead Alpine Guide • Trippy Himalayan Expeditions</span>
              </div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={onClose}>
              <i className="fa-solid fa-check"></i> Understood & Verified
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
