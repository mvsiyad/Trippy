import React, { useState } from "react";
import { MONTHS_DATA } from "@/data/months";
import { type Destination } from "@/data/destinations";

interface SeasonRadarProps {
  destinations: Destination[];
  onSelectDestination: (id: string) => void;
}

const MONTH_NAMES = [
  { num: 1, label: "Jan", icon: "❄️" },
  { num: 2, label: "Feb", icon: "❄️" },
  { num: 3, label: "Mar", icon: "🌸" },
  { num: 4, label: "Apr", icon: "🌸" },
  { num: 5, label: "May", icon: "☀️" },
  { num: 6, label: "Jun", icon: "☀️" },
  { num: 7, label: "Jul", icon: "☀️" },
  { num: 8, label: "Aug", icon: "☀️" },
  { num: 9, label: "Sep", icon: "🍂" },
  { num: 10, label: "Oct", icon: "🍂" },
  { num: 11, label: "Nov", icon: "🍁" },
  { num: 12, label: "Dec", icon: "❄️" },
];

export const SeasonRadar: React.FC<SeasonRadarProps> = ({
  destinations,
  onSelectDestination,
}) => {
  const [activeMonth, setActiveMonth] = useState<number>(6);

  const monthInfo = MONTHS_DATA[activeMonth] || MONTHS_DATA[6];

  return (
    <section className="section-spacing season-radar-section" id="season-radar">
      <div className="container">
        <div className="section-header text-center">
          <div className="archival-badge mx-auto">
            <i className="fa-solid fa-calendar-check"></i>
            <span>TEMPORAL CLIMATE INDEX &bull; ANNUAL HORIZON</span>
          </div>
          <h2 className="section-title">
            Best Time to Visit: <span className="font-serif italic font-normal text-gradient">Month-by-Month</span>
          </h2>
          <p className="section-subtitle">
            Every destination has a golden window. Pick your travel month below to see which destinations are at their peak weather.
          </p>
        </div>

        {/* Month Switcher Grid */}
        <div className="month-selector-bar" id="monthSelectorBar">
          {MONTH_NAMES.map((m) => (
            <button
              key={m.num}
              className={`month-btn ${activeMonth === m.num ? "active" : ""}`}
              onClick={() => setActiveMonth(m.num)}
            >
              <span className="m-icon">{m.icon}</span> {m.label}
            </button>
          ))}
        </div>

        {/* Month Spotlight Box */}
        <div className="month-spotlight-card glass-panel" id="monthSpotlightCard">
          <div className="spotlight-header">
            <div>
              <span className="spotlight-badge" id="spotlightSeasonTag">
                {monthInfo.tag}
              </span>
              <h3 className="spotlight-title" id="spotlightMonthTitle">
                Where to Travel in {monthInfo.name}
              </h3>
              <p className="spotlight-summary" id="spotlightSummary">
                {monthInfo.summary}
              </p>
            </div>
          </div>

          <div className="spotlight-places-grid" id="spotlightPlacesGrid">
            {monthInfo.places.map((destId) => {
              const dest = destinations.find((d) => d.id === destId);
              if (!dest) return null;
              return (
                <div
                  key={dest.id}
                  className="spotlight-place-card cursor-pointer"
                  onClick={() => onSelectDestination(dest.id)}
                >
                  <div className="sp-img-wrap">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="sp-thumb"
                      loading="lazy"
                    />
                    <span className="sp-country-badge">{dest.country}</span>
                  </div>
                  <div className="sp-content">
                    <h4 className="sp-title">{dest.name}</h4>
                    <p className="sp-why">{dest.tagline}</p>
                    <div className="sp-footer">
                      <span className="sp-cost">
                        <i className="fa-solid fa-coins text-accent"></i>{" "}
                        {dest.dailyBudgetInr} / day
                      </span>
                      <span className="sp-explore-link">
                        Explore <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
