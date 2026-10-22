import React from "react";

interface FooterProps {
  onSelectDestination: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectDestination }) => {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-col brand-col">
          <div className="brand-logo">
            <div className="logo-icon">
              <i className="fa-solid fa-earth-americas"></i>
            </div>
            <div className="logo-text">
              <span className="brand-name">WANDERLUST</span>
              <span className="brand-tag">THE TRAVELER'S COMPASS</span>
            </div>
          </div>
          <p className="footer-tagline">
            An independent guide to exploring the most scenic landscapes across India and planet Earth. Built for explorers, budget backpackers, and roadtrippers.
          </p>
        </div>

        <div className="footer-col">
          <h4 className="f-col-title">India Destinations</h4>
          <ul className="f-links">
            <li>
              <a href="#destinations" onClick={() => onSelectDestination("spiti-valley")}>
                Spiti Valley, Himachal
              </a>
            </li>
            <li>
              <a href="#destinations" onClick={() => onSelectDestination("kashmir-valley")}>
                Kashmir Valley
              </a>
            </li>
            <li>
              <a href="#destinations" onClick={() => onSelectDestination("leh-ladakh")}>
                Leh Ladakh High Passes
              </a>
            </li>
            <li>
              <a href="#destinations" onClick={() => onSelectDestination("kerala-backwaters")}>
                Kerala Backwaters
              </a>
            </li>
            <li>
              <a href="#destinations" onClick={() => onSelectDestination("chandratal-lake")}>
                Chandratal Lake
              </a>
            </li>
            <li>
              <a href="#destinations" onClick={() => onSelectDestination("key-monastery")}>
                Key Monastery
              </a>
            </li>
            <li>
              <a href="#destinations" onClick={() => onSelectDestination("langza-stargazing")}>
                Langza Village
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="f-col-title">World Destinations</h4>
          <ul className="f-links">
            <li>
              <a href="#destinations" onClick={() => onSelectDestination("swiss-alps")}>
                Swiss Alps, Switzerland
              </a>
            </li>
            <li>
              <a href="#destinations" onClick={() => onSelectDestination("kyoto-japan")}>
                Kyoto, Japan
              </a>
            </li>
            <li>
              <a href="#destinations" onClick={() => onSelectDestination("iceland-aurora")}>
                Kirkjufell & Aurora, Iceland
              </a>
            </li>
            <li>
              <a href="#destinations" onClick={() => onSelectDestination("bali-indonesia")}>
                Bali & Nusa Penida, Indonesia
              </a>
            </li>
            <li>
              <a href="#destinations" onClick={() => onSelectDestination("amalfi-coast")}>
                Amalfi Coast, Italy
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="f-col-title">Travel Tools</h4>
          <ul className="f-links">
            <li>
              <a href="#budget-calculator">Trip Cost Estimator</a>
            </li>
            <li>
              <a href="#season-radar">Best Time to Visit Radar</a>
            </li>
            <li>
              <a href="#travel-hacks">Smart Traveler Hacks</a>
            </li>
            <li>
              <a href="#expert-guides">Field Guides & Experts</a>
            </li>
            <li>
              <a href="#destinations">All Destinations</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; 2026 Wanderlust. Curated travel guides and budget planner.</p>
          <div className="footer-legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
