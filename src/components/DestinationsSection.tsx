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
  // Filter & sort logic applied directly to the 3D showcase
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

  // Transform filtered destinations into rich 3D carousel slides
  const slides: Slide[] = useMemo(() => {
    return filteredDestinations.map((dest) => ({
      id: dest.id,
      image: dest.image,
      title: dest.name,
      description: dest.snippet,
      badge: dest.vibe.toUpperCase(),
      country: dest.country,
      region: dest.region,
      vibe: dest.vibe,
      dailyBudget: dest.dailyBudgetInr,
      idealDays: dest.idealDays,
      bestSeason: dest.bestSeason.split("(")[0].trim(),
      isSaved: bucketList.includes(dest.id),
    }));
  }, [filteredDestinations, bucketList]);

  const handleCarouselCardClick = (slide: Slide) => {
    if (slide.id) {
      onSelectDestination(slide.id);
    }
  };

  return (
    <section className="section-spacing destinations-section" id="destinations">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="archival-badge mx-auto">
            <i className="fa-solid fa-compass"></i>
            <span>32° 14′ N &bull; 78° 03′ E &bull; CURATED FIELD DOSSIER</span>
          </div>
          <h2 className="section-title">
            Explore <span className="font-serif italic font-normal text-gradient">Iconic</span> Travel Havens
          </h2>
          <p className="section-subtitle">
            Interactive 3D expedition showcase &mdash; filter by theme, swipe or drag through verified guides, and open in-depth daily budgets and seasonal roadmaps.
          </p>
        </div>

        {/* Category Filter Tabs */}
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

        {/* Results Counter & Sort Meta Bar */}
        <div className="destinations-meta-bar">
          <span id="resultsCount">
            Showing <strong>{filteredDestinations.length}</strong> verified destination guides
            {category !== "all" && (
              <span className="ml-1 text-xs opacity-80">
                &bull; filtered by{" "}
                <span className="capitalize font-semibold text-stone-900">
                  {category === "india"
                    ? "Incredible India"
                    : category === "international"
                    ? "International Wonders"
                    : category}
                </span>
              </span>
            )}
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

        {/* 3D Stacked Carousel as the Primary Destination Showcase */}
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
          <div className="carousel-destinations-wrapper">
            <CarouselStacked
              slides={slides}
              onCardClick={handleCarouselCardClick}
              onToggleBookmark={onToggleBookmark}
            />
          </div>
        )}
      </div>
    </section>
  );
};
