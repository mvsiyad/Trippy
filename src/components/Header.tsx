import React, { useState, useEffect } from "react";
import { TravelCompassLogo } from "./TravelCompassLogo";

interface HeaderProps {
  bucketCount: number;
  onOpenBucketList: () => void;
  onReplayLoader?: () => void;
}

const NAV_ITEMS = [
  { id: "destinations", label: "Destinations", icon: "fa-compass" },
  { id: "season-radar", label: "When to Go", icon: "fa-calendar-days" },
  { id: "budget-calculator", label: "Budget Estimator", icon: "fa-wallet" },
  { id: "travel-hacks", label: "Traveler Hacks", icon: "fa-lightbulb" },
  { id: "expert-guides", label: "Field Experts", icon: "fa-user-tie" },
];

export const Header: React.FC<HeaderProps> = ({
  bucketCount,
  onOpenBucketList,
  onReplayLoader,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<string>("destinations");

  // Track scroll progress & header elevation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 24);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }

      // Active section spy
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const currentScroll = scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const top = section.offsetTop;
          if (currentScroll >= top) {
            setActiveSection(NAV_ITEMS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div className={`site-header-wrapper ${isScrolled ? "is-scrolled" : ""}`} id="headerWrapper">
        {/* Sleek Editorial Glass Announcement Bar */}
        {announcementVisible && (
          <div className="announcement-bar-glass" id="announcementBar">
            <div className="announcement-glass-container">
              <div className="announcement-left-badge">
                <span className="badge-compass-pulse">
                  <i className="fa-solid fa-compass"></i>
                  <span>Curated Routes</span>
                </span>
                <span className="announcement-text">
                  Curated field guides to <strong className="text-white font-semibold">12+ Iconic Wonders</strong> &bull; India & Worldwide Intel & Realistic Budgets
                </span>
              </div>
              <div className="announcement-right-actions">
                <a
                  href="#destinations"
                  className="announcement-glass-link"
                  onClick={(e) => scrollToSection(e, "destinations")}
                >
                  Explore Destinations <i className="fa-solid fa-arrow-right"></i>
                </a>
                <button
                  type="button"
                  className="announcement-dismiss-btn"
                  onClick={() => setAnnouncementVisible(false)}
                  title="Dismiss notification"
                  aria-label="Dismiss notification"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Glassmorphism Navigation Island */}
        <header className="site-header-glass" id="siteHeader">
          <div className="glass-nav-island">
            {/* Brand Logo with Glass Jewel Compass */}
            <a
              href="#"
              className="brand-logo-glass group"
              id="brandLogo"
              title="Wanderlust — Replay brand intro"
              onClick={(e) => {
                if (onReplayLoader) {
                  e.preventDefault();
                  onReplayLoader();
                }
              }}
            >
              <div className="logo-jewel-badge">
                <TravelCompassLogo
                  size={22}
                  variant="milk"
                  className="compass-spin-effect"
                />
                <div className="jewel-specular-sheen" />
              </div>
              <div className="logo-typography">
                <span className="brand-title">WANDERLUST</span>
                <span className="brand-subtitle">THE TRAVELER'S COMPASS</span>
              </div>
            </a>

            {/* Desktop Navigation Track (Glass Capsule Cluster) */}
            <nav className="desktop-nav-glass" id="desktopNav" aria-label="Main Navigation">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className={`nav-pill-item ${isActive ? "active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <i className={`fa-solid ${item.icon} nav-pill-icon`}></i>
                    <span>{item.label}</span>
                    {isActive && <span className="active-glow-indicator" />}
                  </a>
                );
              })}
            </nav>

            {/* Action Buttons: Glass Bucket List & Velvet CTA */}
            <div className="nav-actions-glass">
              {/* My Bucket List Glass Pill */}
              <button
                className="btn-glass-bucket group"
                onClick={onOpenBucketList}
                aria-label={`Open Bucket List with ${bucketCount} saved items`}
              >
                <div className="heart-icon-wrapper">
                  <i className="fa-solid fa-heart heart-glyph"></i>
                </div>
                <span className="bucket-btn-label">Bucket List</span>
                <span className="bucket-badge-pill" aria-hidden="true">
                  {bucketCount}
                </span>
              </button>

              {/* Trip Cost Estimator Primary CTA */}
              <a
                href="#budget-calculator"
                onClick={(e) => scrollToSection(e, "budget-calculator")}
                className="btn-glass-primary group"
              >
                <i className="fa-solid fa-calculator cta-calc-icon"></i>
                <span>Trip Estimator</span>
                <i className="fa-solid fa-arrow-right cta-arrow-icon"></i>
                <div className="cta-light-sweep" />
              </a>

              {/* Mobile Drawer Trigger */}
              <button
                className="mobile-glass-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <i className={`fa-solid ${mobileMenuOpen ? "fa-xmark" : "fa-bars-staggered"}`}></i>
              </button>
            </div>

            {/* Reading / Expedition Progress Glowing Filament */}
            <div className="reading-filament-track" aria-hidden="true">
              <div
                className="reading-filament-bar"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>
        </header>
      </div>

      {/* Luxury Frosted Mobile Drawer Overlay & Panel */}
      <div
        className={`mobile-glass-overlay ${mobileMenuOpen ? "open" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`mobile-glass-drawer ${mobileMenuOpen ? "open" : ""}`}
        id="mobileDrawer"
        aria-label="Mobile Navigation"
      >
        <div className="mobile-drawer-top">
          <div className="drawer-brand">
            <div className="drawer-logo-badge">
              <TravelCompassLogo size={20} variant="milk" />
            </div>
            <div className="drawer-brand-text">
              <span className="drawer-title">WANDERLUST</span>
              <span className="drawer-subtitle">FIELD COMPASS & ARCHIVE</span>
            </div>
          </div>
          <button
            className="drawer-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <nav className="mobile-drawer-nav">
          <span className="drawer-section-label">CURATED DIRECTORY</span>
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`mobile-glass-link ${isActive ? "active" : ""}`}
                onClick={(e) => scrollToSection(e, item.id)}
              >
                <div className="link-icon-box">
                  <i className={`fa-solid ${item.icon}`}></i>
                </div>
                <span className="link-text">{item.label}</span>
                {isActive ? (
                  <span className="link-active-pill">Viewing</span>
                ) : (
                  <i className="fa-solid fa-chevron-right link-arrow"></i>
                )}
              </a>
            );
          })}
        </nav>

        <div className="mobile-drawer-bottom">
          <div className="drawer-action-cards">
            <button
              className="drawer-bucket-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBucketList();
              }}
            >
              <div className="flex items-center gap-2.5">
                <i className="fa-solid fa-heart text-[#C22F6A]"></i>
                <span className="font-semibold text-sm text-[#381932]">My Saved Bucket List</span>
              </div>
              <span className="drawer-bucket-counter">{bucketCount}</span>
            </button>

            <a
              href="#budget-calculator"
              className="drawer-calc-btn"
              onClick={(e) => scrollToSection(e, "budget-calculator")}
            >
              <i className="fa-solid fa-calculator"></i>
              <span>Open Trip Cost Estimator</span>
            </a>
          </div>

          <div className="drawer-editorial-footer">
            <span>2026 EDITION &bull; HAUTE TRAVEL COMPASS</span>
          </div>
        </div>
      </aside>
    </>
  );
};
