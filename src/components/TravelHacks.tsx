import React from "react";

export const TravelHacks: React.FC = () => {
  return (
    <section className="section-spacing travel-hacks-section" id="travel-hacks">
      <div className="container">
        <div className="section-header text-center">
          <div className="archival-badge mx-auto">
            <i className="fa-solid fa-lightbulb"></i>
            <span>EXPEDITION PROTOCOLS &bull; FIELD VETTED</span>
          </div>
          <h2 className="section-title">
            Essential <span className="font-serif italic font-normal text-gradient">Smart Traveler</span> Hacks
          </h2>
          <p className="section-subtitle">
            Whether you are heading into high-altitude Indian mountain deserts or boarding international flights, these tried-and-tested principles will save you money and headaches.
          </p>
        </div>

        <div className="hacks-grid">
          <div className="hack-card glass-panel">
            <div className="hack-icon">
              <i className="fa-solid fa-heart-pulse"></i>
            </div>
            <h3 className="hack-title">High Altitude Acclimatization</h3>
            <p className="hack-desc">
              When visiting places above 10,000 ft (Spiti, Ladakh, Swiss summits), avoid flying directly to highest altitudes without 48 hrs gradual ascent. Drink 4L water daily, avoid alcohol for first 2 days, and carry Diamox.
            </p>
            <span className="hack-tag">Applies to: Spiti, Ladakh, Alps</span>
          </div>

          <div className="hack-card glass-panel">
            <div className="hack-icon">
              <i className="fa-solid fa-credit-card"></i>
            </div>
            <h3 className="hack-title">Zero Forex Markup Cards</h3>
            <p className="hack-desc">
              Never exchange money at airport counters (you lose 8–12% in margins). Use Indian zero-forex debit/credit cards (Niyo, Fi, Scapia) that give exact interbank exchange rates with zero transaction fees worldwide.
            </p>
            <span className="hack-tag">Applies to: International Travels</span>
          </div>

          <div className="hack-card glass-panel">
            <div className="hack-icon">
              <i className="fa-solid fa-bus-simple"></i>
            </div>
            <h3 className="hack-title">HRTC Mountain Bus Hack</h3>
            <p className="hack-desc">
              In Himachal, the state transport (HRTC) runs the legendary daily bus from Shimla to Kaza and Kaza to Manali for under ₹600. It covers the exact same awe-inspiring scenery that private taxis charge ₹25,000+ for!
            </p>
            <span className="hack-tag">Applies to: Himachal & Spiti</span>
          </div>

          <div className="hack-card glass-panel">
            <div className="hack-icon">
              <i className="fa-solid fa-sim-card"></i>
            </div>
            <h3 className="hack-title">Connectivity in Remote Areas</h3>
            <p className="hack-desc">
              In Spiti, Jio and Airtel work decently in major towns like Kaza and Kalpa, but BSNL is the only carrier with lifelines in ultra-remote border zones. Download offline Google Maps and maps.me before departing base camp.
            </p>
            <span className="hack-tag">Applies to: Himalayas & Islands</span>
          </div>

          <div className="hack-card glass-panel">
            <div className="hack-icon">
              <i className="fa-solid fa-passport"></i>
            </div>
            <h3 className="hack-title">Shoulder Season Magic</h3>
            <p className="hack-desc">
              Traveling during shoulder seasons (e.g. September for Spiti, late October for Kyoto, May for Switzerland) offers 50% cheaper stays, zero tourist crowds, and crystal clear photography lighting.
            </p>
            <span className="hack-tag">Applies to: Global & India</span>
          </div>

          <div className="hack-card glass-panel">
            <div className="hack-icon">
              <i className="fa-solid fa-hand-holding-heart"></i>
            </div>
            <h3 className="hack-title">Responsible Mountain Tourism</h3>
            <p className="hack-desc">
              Carry a reusable insulated bottle instead of buying single-use plastic water bottles. Support family-run indigenous homestays so your travel money directly benefits rural local communities.
            </p>
            <span className="hack-tag">Universal Principle</span>
          </div>
        </div>
      </div>
    </section>
  );
};
