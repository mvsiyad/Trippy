import React from "react";
import { type Destination } from "@/data/destinations";

interface DestinationModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleBookmark: (id: string) => void;
  onEstimateTrip: (id: string) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  isOpen,
  onClose,
  isSaved,
  onToggleBookmark,
  onEstimateTrip,
}) => {
  if (!isOpen || !destination) return null;

  return (
    <div className="modal-backdrop active" id="destinationModal">
      <div className="modal-dialog glass-panel modal-lg">
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="modal-banner-wrap">
          <img
            src={destination.image}
            alt={destination.name}
            className="modal-banner-img"
          />
          <div className="modal-banner-overlay"></div>
          <div className="modal-banner-content">
            <span className="modal-country-badge">
              {destination.country} • {destination.region}
            </span>
            <h2 className="modal-dest-title">{destination.name}</h2>
            <span className="modal-tagline">{destination.tagline}</span>
          </div>
        </div>

        <div className="modal-body-scroll">
          {/* Meta Strip */}
          <div className="modal-quick-meta-bar">
            <div className="mq-item">
              <span className="mq-label">
                <i className="fa-solid fa-calendar-days text-accent"></i> Best Season
              </span>
              <strong>{destination.bestSeason}</strong>
            </div>
            <div className="mq-item">
              <span className="mq-label">
                <i className="fa-solid fa-wallet text-accent"></i> Daily Budget
              </span>
              <strong>{destination.dailyBudgetInr}</strong>
            </div>
            <div className="mq-item">
              <span className="mq-label">
                <i className="fa-solid fa-clock text-accent"></i> Ideal Duration
              </span>
              <strong>{destination.idealDays}</strong>
            </div>
            <div className="mq-item">
              <span className="mq-label">
                <i className="fa-solid fa-plane text-accent"></i> Nearest Airport
              </span>
              <strong>{destination.nearestAirport}</strong>
            </div>
          </div>

          {/* Overview */}
          <div className="modal-section-block">
            <h3 className="ms-title">
              <i className="fa-solid fa-book-open text-accent"></i> Overview
            </h3>
            <p className="ms-paragraph">{destination.snippet}</p>
          </div>

          {/* Budget Breakdown */}
          <div className="modal-section-block">
            <h3 className="ms-title">
              <i className="fa-solid fa-coins text-accent"></i> Estimated Daily Budget
            </h3>
            <div className="modal-budget-tier-grid">
              <div className="m-budget-card">
                <span className="mb-name">Backpacker</span>
                <div className="mb-rate">{destination.budgetBreakdown.backpacker.rate}</div>
                <p className="mb-details">{destination.budgetBreakdown.backpacker.desc}</p>
              </div>
              <div className="m-budget-card">
                <span className="mb-name">Mid-Range</span>
                <div className="mb-rate">{destination.budgetBreakdown.midRange.rate}</div>
                <p className="mb-details">{destination.budgetBreakdown.midRange.desc}</p>
              </div>
              <div className="m-budget-card">
                <span className="mb-name">Luxury</span>
                <div className="mb-rate">{destination.budgetBreakdown.luxury.rate}</div>
                <p className="mb-details">{destination.budgetBreakdown.luxury.desc}</p>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="modal-section-block">
            <h3 className="ms-title">
              <i className="fa-solid fa-star text-accent"></i> Top Highlights
            </h3>
            <ul className="modal-highlights-list">
              {destination.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>

          {/* Local Food */}
          <div className="modal-section-block">
            <h3 className="ms-title">
              <i className="fa-solid fa-bowl-food text-accent"></i> Local Food to Savor
            </h3>
            <div className="modal-food-tags">
              {destination.foods.map((food, i) => (
                <span key={i} className="food-tag">
                  {food}
                </span>
              ))}
            </div>
          </div>

          {/* Transit Guide */}
          <div className="modal-section-block">
            <h3 className="ms-title">
              <i className="fa-solid fa-route text-accent"></i> How to Reach & Getting Around
            </h3>
            <p className="ms-paragraph">{destination.transitGuide}</p>
          </div>

          {/* Insider Tips */}
          <div className="modal-section-block modal-tip-box">
            <i className="fa-solid fa-lightbulb text-accent"></i>
            <div>
              <strong>Insider Secret:</strong>
              <p>{destination.insiderTip}</p>
            </div>
          </div>
        </div>

        <div className="modal-footer-actions">
          <button
            className="btn btn-outline"
            onClick={() => onToggleBookmark(destination.id)}
          >
            <i className={`fa-${isSaved ? "solid text-danger" : "regular"} fa-heart`}></i>{" "}
            <span>{isSaved ? "Saved in Bucket List" : "Add to Bucket List"}</span>
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onEstimateTrip(destination.id)}
          >
            <i className="fa-solid fa-calculator"></i>{" "}
            <span>Estimate Trip Cost for This Place</span>
          </button>
        </div>
      </div>
    </div>
  );
};
