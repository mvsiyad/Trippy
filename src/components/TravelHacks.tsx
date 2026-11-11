import React from "react";

interface HackItem {
  id: string;
  protocol: string;
  icon: string;
  title: string;
  description: string;
  tag: string;
}

const HACKS_DATA: HackItem[] = [
  {
    id: "acclimatization",
    protocol: "Protocol 01",
    icon: "fa-heart-pulse",
    title: "High Altitude Acclimatization",
    description:
      "When visiting places above 10,000 ft (Spiti, Ladakh, Swiss summits), avoid flying directly to highest altitudes without 48 hrs gradual ascent. Drink 4L water daily, avoid alcohol for first 2 days, and carry Diamox.",
    tag: "Applies to: Spiti, Ladakh, Alps",
  },
  {
    id: "forex",
    protocol: "Protocol 02",
    icon: "fa-credit-card",
    title: "Zero Forex Markup Cards",
    description:
      "Never exchange money at airport counters (you lose 8–12% in margins). Use Indian zero-forex debit/credit cards (Niyo, Fi, Scapia) that give exact interbank exchange rates with zero transaction fees worldwide.",
    tag: "Applies to: International Travels",
  },
  {
    id: "mountain-bus",
    protocol: "Protocol 03",
    icon: "fa-bus-simple",
    title: "HRTC Mountain Bus Hack",
    description:
      "In Himachal, the state transport (HRTC) runs the legendary daily bus from Shimla to Kaza and Kaza to Manali for under ₹600. It covers the exact same awe-inspiring scenery that private taxis charge ₹25,000+ for!",
    tag: "Applies to: Himachal & Spiti",
  },
  {
    id: "connectivity",
    protocol: "Protocol 04",
    icon: "fa-sim-card",
    title: "Connectivity in Remote Areas",
    description:
      "In Spiti, Jio and Airtel work decently in major towns like Kaza and Kalpa, but BSNL is the only carrier with lifelines in ultra-remote border zones. Download offline Google Maps and maps.me before departing base camp.",
    tag: "Applies to: Himalayas & Islands",
  },
  {
    id: "shoulder-season",
    protocol: "Protocol 05",
    icon: "fa-passport",
    title: "Shoulder Season Magic",
    description:
      "Traveling during shoulder seasons (e.g. September for Spiti, late October for Kyoto, May for Switzerland) offers 50% cheaper stays, zero tourist crowds, and crystal clear photography lighting.",
    tag: "Applies to: Global & India",
  },
  {
    id: "responsible-tourism",
    protocol: "Protocol 06",
    icon: "fa-hand-holding-heart",
    title: "Responsible Mountain Tourism",
    description:
      "Carry a reusable insulated bottle instead of buying single-use plastic water bottles. Support family-run indigenous homestays so your travel money directly benefits rural local communities.",
    tag: "Universal Principle",
  },
];

export const TravelHacks: React.FC = () => {
  return (
    <section className="section-spacing travel-hacks-section" id="travel-hacks">
      <div className="container">
        <div className="section-header text-center">
          <div className="archival-badge mx-auto">
            <i className="fa-solid fa-sparkles"></i>
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
          {HACKS_DATA.map((hack) => (
            <article key={hack.id} className="hack-card glass-panel group">
              <div className="hack-card-top">
                <div className="hack-icon-badge">
                  <i className={`fa-solid ${hack.icon}`}></i>
                  <div className="hack-icon-sheen" />
                </div>
                <span className="hack-num-pill">{hack.protocol}</span>
              </div>

              <h3 className="hack-title">{hack.title}</h3>
              <p className="hack-desc">{hack.description}</p>

              <div className="hack-footer">
                <span className="hack-tag-pill">
                  <i className="fa-solid fa-compass text-[11px] opacity-75"></i>
                  <span>{hack.tag}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
