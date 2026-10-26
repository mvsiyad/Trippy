import React, { useState } from "react";
import { TravelCompassLogo } from "./TravelCompassLogo";

interface HeaderProps {
  bucketCount: number;
  onOpenBucketList: () => void;
  onReplayLoader?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  bucketCount,
  onOpenBucketList,
  onReplayLoader,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar" id="announcementBar">
        <div className="container announcement-content">
          <span className="badge-pulse">
            <i className="fa-solid fa-compass"></i> CURATED ROUTES
          </span>
          <span>
            Curated guides to <strong>12+ Iconic Indian & International Wonders</strong> &bull; Location Intel, Prime Seasons & Realistic Cost Breakdowns
          </span>
          <a href="#destinations" className="announcement-link">
            Explore Destinations <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>

      {/* Header */}
      <header className="site-header" id="siteHeader">
        <div className="container nav-container">
          <a
            href="#"
            className="brand-logo"
            id="brandLogo"
            title="Replay brand intro"
            onClick={(e) => {
              if (onReplayLoader) {
                e.preventDefault();
                onReplayLoader();
              }
            }}
          >
            <div className="logo-icon flex items-center justify-center">
              <TravelCompassLogo size={28} />
            </div>
            <div className="logo-text">
              <span className="brand-name">WANDERLUST</span>
              <span className="brand-tag">THE TRAVELER'S COMPASS</span>
            </div>
          </a>

          <nav className="desktop-nav" id="desktopNav">
            <a href="#destinations" className="nav-link active">Destinations</a>
            <a href="#season-radar" className="nav-link">When to Go</a>
            <a href="#budget-calculator" className="nav-link">Budget Estimator</a>
            <a href="#travel-hacks" className="nav-link">Traveler Hacks</a>
            <a href="#expert-guides" className="nav-link">Field Experts</a>
          </nav>

          <div className="nav-actions">
            <button
              className="btn btn-outline btn-sm btn-bucket"
              onClick={onOpenBucketList}
              aria-label="Open Bucket List"
            >
              <i className="fa-solid fa-heart text-danger"></i>
              <span className="btn-text">My Bucket List</span>
              <span className="bucket-counter">{bucketCount}</span>
            </button>
            <a
              href="#budget-calculator"
              className="btn btn-primary btn-sm pulse-glow header-calc-btn"
            >
              <i className="fa-solid fa-calculator"></i>
              <span>Trip Cost Estimator</span>
            </a>
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div className={`mobile-drawer ${mobileMenuOpen ? "open" : ""}`} id="mobileDrawer">
          <div className="mobile-drawer-header">
            <span className="brand-name">WANDERLUST</span>
            <button
              className="drawer-close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="mobile-drawer-links">
            <a
              href="#destinations"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <i className="fa-solid fa-map-location-dot"></i> Explore Destinations
            </a>
            <a
              href="#season-radar"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <i className="fa-solid fa-calendar-check"></i> Best Time to Visit
            </a>
            <a
              href="#budget-calculator"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <i className="fa-solid fa-wallet"></i> Trip Budget Estimator
            </a>
            <a
              href="#travel-hacks"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <i className="fa-solid fa-lightbulb"></i> Smart Travel Hacks
            </a>
            <a
              href="#expert-guides"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <i className="fa-solid fa-person-hiking"></i> Field Experts & Guides
            </a>
          </div>
        </div>
      </header>
    </>
  );
};
