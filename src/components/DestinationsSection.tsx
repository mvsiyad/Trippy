import React, { useMemo } from "react";
import CarouselStacked, { type Slide } from "@/components/ui/carousel-07";
import { type Destination } from "@/data/destinations";

interface DestinationsSectionProps {
  destinations: Destination[];
  category: string;
  setCategory: (c: string) => void;
  searchQuery: string;
  regionFilter: string;
  budgetFilter: string;
  vibeFilter: string;
  sortBy: string;
  setSortBy: (s: string) => void;
  bucketList: string[];
  onToggleBookmark: (id: string) => void;
  onSelectDestination: (id: string) => void;
  onResetFilters: () => void;
}

const featuredExpeditionSlides: Slide[] = [
  {
    image: "/assets/images/hero.jpg",
    title: "Spiti Valley & Kunzum",
    description: "Cold desert gorges, 1,000-year mud monasteries & turquoise rivers at 14,000 ft.",
    badge: "Adventure",
  },
  {
    image: "/assets/images/switzerland.jpg",
    title: "Lauterbrunnen & Alps",
    description: "The fairytale valley of 72 waterfalls beneath towering Jungfrau massifs.",
    badge: "Alpine",
  },
  {
    image: "/assets/images/kashmir.jpg",
    title: "Kashmir & Dal Lake",
    description: "Carved cedar houseboats, floating shikaras, and wildflower alpine meadows.",
    badge: "Serenity",
  },
  {
    image: "/assets/images/bali.jpg",
    title: "Bali & Nusa Penida",
    description: "Emerald rice terraces, clifftop sea temples, and manta ray lagoons.",
    badge: "Paradise",
  },
  {
    image: "/assets/images/kyoto.jpg",
    title: "Kyoto Temple Trails",
    description: "10,000 vermilion Torii gates, whispering bamboo groves, and ancient tea rituals.",
    badge: "Culture",
  },
  {
    image: "/assets/images/iceland.jpg",
    title: "Iceland South Coast",
    description: "Aurora Borealis dancing over glacial waterfalls and black volcanic sands.",
    badge: "Aurora",
  },
];

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  destinations,
  category,
  setCategory,
  searchQuery,
  regionFilter,
  budgetFilter,
  vibeFilter,
  sortBy,
  setSortBy,
  bucketList,
  onToggleBookmark,
  onSelectDestination,
  onResetFilters,
}) => {
  // Filter & sort logic
  const filteredDestinations = useMemo(() => {
    return destinations
      .filter((dest) => {
        // Category tab filter
        if (category !== "all") {
          if (category === "india" && dest.category !== "india") return false;
          if (category === "international" && dest.category !== "international") return false;
          if (category === "mountains" && dest.vibe !== "mountains") return false;
          if (category === "lakes" && dest.vibe !== "lakes") return false;
          if (category === "culture" && dest.vibe !== "culture") return false;
        }

        // Region dropdown filter
        if (regionFilter !== "all" && dest.category !== regionFilter) return false;

        // Budget dropdown filter
        if (budgetFilter !== "all" && dest.budgetTier !== budgetFilter) return false;

        // Vibe dropdown filter
        if (vibeFilter !== "all" && dest.vibe !== vibeFilter) return false;

        // Search query
        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase();
          const matchName = dest.name.toLowerCase().includes(q);
          const matchRegion = dest.region.toLowerCase().includes(q);
          const matchCountry = dest.country.toLowerCase().includes(q);
          const matchSnippet = dest.snippet.toLowerCase().includes(q);
          const matchTagline = dest.tagline.toLowerCase().includes(q);
          const matchHighlights = dest.highlights.some((h) => h.toLowerCase().includes(q));
          const matchFoods = dest.foods.some((f) => f.toLowerCase().includes(q));

          if (!matchName && !matchRegion && !matchCountry && !matchSnippet && !matchTagline && !matchHighlights && !matchFoods) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "budget-low") return a.avgDailyInr - b.avgDailyInr;
        if (sortBy === "budget-high") return b.avgDailyInr - a.avgDailyInr;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [destinations, category, searchQuery, regionFilter, budgetFilter, vibeFilter, sortBy]);

  const handleCarouselCardClick = (slide: Slide) => {
    // Map slide title to destination
    const found = destinations.find(
      (d) =>
        d.name.toLowerCase().includes(slide.title.toLowerCase().split(" ")[0]) ||
        slide.title.toLowerCase().includes(d.name.toLowerCase().split(" ")[0])
    );
    if (found) {
      onSelectDestination(found.id);
    }
  };

  return (
    <section className="section-spacing destinations-section" id="destinations">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-tag">
            <i className="fa-solid fa-compass"></i> FEATURED DESTINATIONS
          </div>
          <h2 className="section-title">Explore Iconic Travel Havens</h2>
          <p className="section-subtitle">
            Select any destination to view in-depth location facts, seasonal windows, and transparent cost breakdowns for backpackers and luxury travelers alike.
          </p>
        </div>

        {/* 3D Stacked Carousel Component in Destination Section */}
        <div className="carousel-destinations-wrapper">
          <div className="text-center mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent/15 text-primary border border-accent/20">
              <i className="fa-solid fa-layer-group text-xs"></i> 3D STACKED SHOWCASE &bull; DRAGGABLE DECK
            </span>
            <h3 className="text-xl sm:text-2xl font-bold mt-2 text-foreground">
              Curated Signature Expeditions
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-md mx-auto">
              Interactive 3D preview deck &mdash; swipe or drag to explore handpicked routes
            </p>
          </div>
          
          <CarouselStacked
            slides={featuredExpeditionSlides}
            onCardClick={handleCarouselCardClick}
          />
        </div>

        {/* Category Tabs */}
        <div className="destination-tabs-row" id="categoryTabs">
          <button
            className={`dest-tab ${category === "all" ? "active" : ""}`}
            onClick={() => setCategory("all")}
          >
            <i className="fa-solid fa-globe"></i> All Destinations
          </button>
          <button
            className={`dest-tab ${category === "india" ? "active" : ""}`}
            onClick={() => setCategory("india")}
          >
            <i className="fa-solid fa-map-pin"></i> Incredible India
          </button>
          <button
            className={`dest-tab ${category === "international" ? "active" : ""}`}
            onClick={() => setCategory("international")}
          >
            <i className="fa-solid fa-plane"></i> International Wonders
          </button>
          <button
            className={`dest-tab ${category === "mountains" ? "active" : ""}`}
            onClick={() => setCategory("mountains")}
          >
            <i className="fa-solid fa-mountain"></i> Mountain Passes
          </button>
          <button
            className={`dest-tab ${category === "lakes" ? "active" : ""}`}
            onClick={() => setCategory("lakes")}
          >
            <i className="fa-solid fa-water"></i> Lakes & Waters
          </button>
          <button
            className={`dest-tab ${category === "culture" ? "active" : ""}`}
            onClick={() => setCategory("culture")}
          >
            <i className="fa-solid fa-monument"></i> Cultural Havens
          </button>
        </div>

        {/* Results Counter & Sort */}
        <div className="destinations-meta-bar">
          <span id="resultsCount">
            Showing <strong>{filteredDestinations.length}</strong> verified destination guides
          </span>
          <div className="sort-by-wrap">
            <label htmlFor="sortDestinations">Sort by:</label>
            <select
              id="sortDestinations"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Most Popular</option>
              <option value="budget-low">Budget: Low to High</option>
              <option value="budget-high">Budget: High to Low</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Cards Grid or Empty State */}
        {filteredDestinations.length === 0 ? (
          <div className="empty-results-box glass-panel">
            <i className="fa-solid fa-compass"></i>
            <h3>No matching travel destinations found</h3>
            <p className="text-muted">
              Try clearing your search term or adjusting filters to discover more wonders.
            </p>
            <button
              className="btn btn-outline btn-sm mt-3"
              onClick={onResetFilters}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="destinations-grid" id="destinationsGrid">
            {filteredDestinations.map((dest) => {
              const isSaved = bucketList.includes(dest.id);
              return (
                <article
                  key={dest.id}
                  className="destination-card glass-panel cursor-pointer"
                  onClick={() => onSelectDestination(dest.id)}
                >
                  <div className="card-img-wrap">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="card-img"
                      loading="lazy"
                    />
                    <div className="card-top-badges">
                      <span className="badge-country">
                        <i className="fa-solid fa-location-dot text-accent"></i>{" "}
                        {dest.country}
                      </span>
                      <button
                        className={`btn-card-bookmark ${isSaved ? "saved" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(dest.id);
                        }}
                        title={isSaved ? "Remove from Bucket List" : "Save to Bucket List"}
                        aria-label="Save to bucket list"
                      >
                        <i className={`fa-${isSaved ? "solid text-danger" : "regular"} fa-heart`}></i>
                      </button>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="card-title-row">
                      <h3 className="card-title">{dest.name}</h3>
                    </div>
                    <div className="card-tagline">{dest.tagline}</div>
                    <p className="card-snippet">{dest.snippet}</p>

                    <div className="card-metrics-strip">
                      <div className="card-metric">
                        <span className="cm-label">
                          <i className="fa-regular fa-calendar-check text-accent"></i> Best Season
                        </span>
                        <span className="cm-val">
                          {dest.bestSeason.split("(")[0].trim()}
                        </span>
                      </div>
                      <div className="card-metric">
                        <span className="cm-label">
                          <i className="fa-solid fa-wallet text-accent"></i> Daily Budget
                        </span>
                        <span className="cm-val">{dest.dailyBudgetInr}</span>
                      </div>
                    </div>

                    <div className="card-highlights-row">
                      <span className="ch-tag">
                        <i className="fa-solid fa-clock"></i> {dest.idealDays}
                      </span>
                      <span className="ch-tag">
                        <i className="fa-solid fa-plane"></i>{" "}
                        {dest.nearestAirport.split("/")[0].trim()}
                      </span>
                      <span className="ch-tag">
                        <i className="fa-solid fa-mountain"></i> {dest.vibe.toUpperCase()}
                      </span>
                    </div>

                    <div className="card-footer-action">
                      <button
                        className="btn btn-outline btn-block view-guide-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectDestination(dest.id);
                        }}
                      >
                        <span>View Full Traveler Guide</span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
