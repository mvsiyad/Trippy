import React from "react";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  regionFilter: string;
  setRegionFilter: (r: string) => void;
  budgetFilter: string;
  setBudgetFilter: (b: string) => void;
  vibeFilter: string;
  setVibeFilter: (v: string) => void;
  onTagClick: (tag: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  regionFilter,
  setRegionFilter,
  budgetFilter,
  setBudgetFilter,
  vibeFilter,
  setVibeFilter,
  onTagClick,
}) => {
  return (
    <section className="hero-section" id="heroSection">
      <div className="hero-backdrop">
        <img
          src="/assets/images/hero.jpg"
          alt="Spectacular Himalayan Travel Landscape"
          className="hero-bg-img"
          id="heroBgImage"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="container hero-content-wrapper text-center hero-portal-layout">
        <div className="hero-meta-badges justify-center">
          <span className="meta-pill pill-neutral">
            <i className="fa-solid fa-globe"></i> India & Worldwide Guide
          </span>
          <span className="meta-pill pill-rating">
            <i className="fa-solid fa-shield-halved"></i> Verified Field Insights
          </span>
          <span className="meta-pill pill-alert">
            <i className="fa-solid fa-coins"></i> 2026 Budget Estimates
          </span>
        </div>

        <h1 className="hero-headline">
          Where Will Your Wanderlust Take You? <br />
          <span className="text-gradient">Explore India & The World</span>
        </h1>

        <p className="hero-subheadline max-w-750">
          From the trans-Himalayan valleys of <strong>Himachal & Spiti</strong> to the tranquil houseboats of <strong>Kashmir</strong>, the alpine passes of <strong>Switzerland</strong>, and the ancient temples of <strong>Kyoto</strong>. Curated guides with real budgets, optimal seasons, and transit advice.
        </p>

        {/* Search & Filter Bar */}
        <div className="hero-search-container glass-panel">
          <div className="search-input-wrap">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input
              type="text"
              id="destinationSearch"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by destination, country, vibe (e.g. Spiti, Switzerland, Snow, Budget, Lake)..."
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn active"
                onClick={() => setSearchQuery("")}
                title="Clear search"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          <div className="quick-filter-dropdowns">
            <div className="filter-dropdown-group">
              <label htmlFor="filterRegion">
                <i className="fa-solid fa-location-dot text-accent"></i> Region
              </label>
              <select
                id="filterRegion"
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
              >
                <option value="all">All Regions</option>
                <option value="india">Incredible India</option>
                <option value="international">International Wonders</option>
              </select>
            </div>

            <div className="filter-dropdown-group">
              <label htmlFor="filterBudget">
                <i className="fa-solid fa-wallet text-accent"></i> Budget Tier
              </label>
              <select
                id="filterBudget"
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value)}
              >
                <option value="all">Any Budget</option>
                <option value="budget">Budget Backpacker (&lt; ₹2,500/day)</option>
                <option value="mid">Mid-Range Comfort (₹2,500 - ₹8,000/day)</option>
                <option value="luxury">Luxury / Global Escape (&gt; ₹8,000/day)</option>
              </select>
            </div>

            <div className="filter-dropdown-group">
              <label htmlFor="filterVibe">
                <i className="fa-solid fa-mountain text-accent"></i> Landscape Vibe
              </label>
              <select
                id="filterVibe"
                value={vibeFilter}
                onChange={(e) => setVibeFilter(e.target.value)}
              >
                <option value="all">All Landscapes</option>
                <option value="mountains">High Mountains & Passes</option>
                <option value="lakes">Lakes & Waterways</option>
                <option value="culture">Ancient Culture & Towns</option>
                <option value="aurora">Winter & Aurora</option>
              </select>
            </div>
          </div>

          <div className="hero-quick-tags">
            <span className="quick-tags-label">
              <i className="fa-solid fa-fire-flame-curved text-accent"></i> Popular Routes:
            </span>
            <button
              type="button"
              className="quick-tag-chip"
              onClick={() => onTagClick("Spiti")}
            >
              #SpitiValley
            </button>
            <button
              type="button"
              className="quick-tag-chip"
              onClick={() => onTagClick("Switzerland")}
            >
              #SwissAlps
            </button>
            <button
              type="button"
              className="quick-tag-chip"
              onClick={() => onTagClick("Kerala")}
            >
              #KeralaBackwaters
            </button>
            <button
              type="button"
              className="quick-tag-chip"
              onClick={() => onTagClick("Kyoto")}
            >
              #KyotoJapan
            </button>
            <button
              type="button"
              className="quick-tag-chip"
              onClick={() => onTagClick("Ladakh")}
            >
              #LehLadakh
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="portal-quick-stats">
          <div className="p-stat">
            <strong>12+</strong>
            <span>Curated Destinations</span>
          </div>
          <div className="p-stat-sep"></div>
          <div className="p-stat">
            <strong>₹1,200 - ₹35,000</strong>
            <span>Budget Spectrum (Per Day)</span>
          </div>
          <div className="p-stat-sep"></div>
          <div className="p-stat">
            <strong>365 Days</strong>
            <span>Seasonal Route Intel</span>
          </div>
        </div>
      </div>
    </section>
  );
};
