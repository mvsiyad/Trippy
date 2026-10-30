import React, { useState, useMemo } from "react";
import { type Destination } from "@/data/destinations";

interface BudgetCalculatorProps {
  destinations: Destination[];
  onSelectDestination: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  selectedDestId?: string;
}

type Currency = "INR" | "USD" | "EUR" | "GBP";

const CURRENCY_CONFIG: Record<
  Currency,
  { symbol: string; rate: number; locale: string }
> = {
  INR: { symbol: "₹", rate: 1, locale: "en-IN" },
  USD: { symbol: "$", rate: 1 / 84, locale: "en-US" },
  EUR: { symbol: "€", rate: 1 / 91, locale: "de-DE" },
  GBP: { symbol: "£", rate: 1 / 107, locale: "en-GB" },
};

export const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({
  destinations,
  onSelectDestination,
  onToggleBookmark,
  selectedDestId,
}) => {
  const [destId, setDestId] = useState<string>(
    selectedDestId || (destinations[0]?.id ?? "spiti-valley")
  );
  const [days, setDays] = useState<number>(7);
  const [travelers, setTravelers] = useState<number>(2);
  const [tier, setTier] = useState<"backpacker" | "comfort" | "luxury">("comfort");
  const [currency, setCurrency] = useState<Currency>("INR");

  const activeDest = useMemo(
    () => destinations.find((d) => d.id === destId) || destinations[0],
    [destinations, destId]
  );

  const budget = useMemo(() => {
    if (!activeDest) return { totalInr: 0, stay: 0, transit: 0, food: 0, activity: 0 };

    let multiplier = 1.0;
    if (tier === "backpacker") multiplier = 0.55;
    if (tier === "luxury") multiplier = 2.4;

    const baseDaily = activeDest.avgDailyInr * multiplier;

    const stay = Math.round(
      baseDaily * 0.38 * days * (travelers > 1 ? Math.ceil(travelers / 2) * 1.3 : 1)
    );
    const transit = Math.round(
      baseDaily * 0.3 * days * (travelers > 1 ? 1 + (travelers - 1) * 0.35 : 1)
    );
    const food = Math.round(baseDaily * 0.2 * days * travelers);
    const activity = Math.round(baseDaily * 0.12 * days * travelers);

    const totalInr = stay + transit + food + activity;

    return { totalInr, stay, transit, food, activity };
  }, [activeDest, tier, days, travelers]);

  const currConf = CURRENCY_CONFIG[currency];
  const convertedTotal = Math.round(budget.totalInr * currConf.rate);
  const convertedPerPerson = Math.round(
    (budget.totalInr / Math.max(1, travelers)) * currConf.rate
  );

  const formatCost = (inrVal: number) => {
    const val = Math.round(inrVal * currConf.rate);
    return currConf.symbol + val.toLocaleString(currConf.locale);
  };

  const pStay = Math.round((budget.stay / Math.max(1, budget.totalInr)) * 100) || 38;
  const pTransit = Math.round((budget.transit / Math.max(1, budget.totalInr)) * 100) || 30;
  const pFood = Math.round((budget.food / Math.max(1, budget.totalInr)) * 100) || 20;
  const pAct = Math.max(0, 100 - (pStay + pTransit + pFood));

  return (
    <section className="section-spacing budget-calc-section" id="budget-calculator">
      <div className="container">
        <div className="section-header text-center">
          <div className="archival-badge mx-auto">
            <i className="fa-solid fa-calculator"></i>
            <span>FINANCIAL INTELLIGENCE &bull; 2026 RATES</span>
          </div>
          <h2 className="section-title">
            Interactive <span className="font-serif italic font-normal text-gradient">Travel Cost</span> Estimator
          </h2>
          <p className="section-subtitle">
            Choose your target destination, how many days you want to explore, and your travel comfort level to get an instant breakdown of transport, stays, food, and activities.
          </p>
        </div>

        <div className="calculator-grid">
          {/* Controls Card */}
          <div className="calc-controls-card glass-panel">
            <h3 className="calc-panel-title">
              <i className="fa-solid fa-sliders text-accent"></i> Configure Your Journey
            </h3>

            <div className="calc-form-group">
              <label htmlFor="calcDestinationSelect">
                <i className="fa-solid fa-map-pin text-accent"></i> Select Destination
              </label>
              <select
                id="calcDestinationSelect"
                value={destId}
                onChange={(e) => setDestId(e.target.value)}
              >
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.country})
                  </option>
                ))}
              </select>
            </div>

            <div className="calc-form-group">
              <label>
                <i className="fa-solid fa-clock text-accent"></i> Trip Duration (Days):{" "}
                <strong className="text-accent" id="calcDaysVal">
                  {days} Days
                </strong>
              </label>
              <input
                type="range"
                id="calcDaysRange"
                min="3"
                max="21"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value, 10))}
                className="slider-range"
              />
              <div className="range-labels">
                <span>3 Days</span>
                <span>7 Days</span>
                <span>14 Days</span>
                <span>21 Days</span>
              </div>
            </div>

            <div className="calc-form-group">
              <label>
                <i className="fa-solid fa-users text-accent"></i> Number of Travelers
              </label>
              <div className="stepper-input">
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => setTravelers((prev) => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <input type="number" readOnly value={travelers} />
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => setTravelers((prev) => Math.min(10, prev + 1))}
                >
                  +
                </button>
              </div>
            </div>

            <div className="calc-form-group">
              <label>
                <i className="fa-solid fa-bed text-accent"></i> Travel Comfort Tier
              </label>
              <div className="tier-radio-group">
                <label className="tier-radio-option">
                  <input
                    type="radio"
                    name="calcTier"
                    value="backpacker"
                    checked={tier === "backpacker"}
                    onChange={() => setTier("backpacker")}
                  />
                  <div className="radio-box">
                    <strong>Backpacker / Budget</strong>
                    <span>Hostels, homestays, public transit, local food</span>
                  </div>
                </label>
                <label className="tier-radio-option">
                  <input
                    type="radio"
                    name="calcTier"
                    value="comfort"
                    checked={tier === "comfort"}
                    onChange={() => setTier("comfort")}
                  />
                  <div className="radio-box">
                    <strong>Mid-Range Explorer</strong>
                    <span>Guest houses, shared or rental cab, cafe dining</span>
                  </div>
                </label>
                <label className="tier-radio-option">
                  <input
                    type="radio"
                    name="calcTier"
                    value="luxury"
                    checked={tier === "luxury"}
                    onChange={() => setTier("luxury")}
                  />
                  <div className="radio-box">
                    <strong>Premium / Luxury</strong>
                    <span>Boutique resorts, private chauffeurs, curated tours</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="calc-results-card glass-panel">
            <div className="results-header">
              <div className="results-meta-top">
                <span className="est-tag">
                  <i className="fa-solid fa-coins"></i> ESTIMATED TOTAL BUDGET
                </span>
                <div className="currency-toggle-group" id="currencyToggleGroup">
                  {(["INR", "USD", "EUR", "GBP"] as Currency[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`curr-pill ${currency === c ? "active" : ""}`}
                      onClick={() => setCurrency(c)}
                    >
                      {CURRENCY_CONFIG[c].symbol} {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="big-price-display">
                <span className="curr-symbol">{currConf.symbol}</span>
                <span className="total-number">
                  {convertedTotal.toLocaleString(currConf.locale)}
                </span>
                <span className="usd-alt">
                  {currency === "INR"
                    ? `(~$${Math.round(budget.totalInr / 84).toLocaleString("en-US")} USD)`
                    : `(~₹${budget.totalInr.toLocaleString("en-IN")})`}
                </span>
              </div>

              <p className="per-traveler-line">
                Approx. <strong>{currConf.symbol}{convertedPerPerson.toLocaleString(currConf.locale)}</strong> per traveler for {days} days
              </p>

              {/* Expense proportion bar */}
              <div
                className="expense-proportion-bar"
                title="Visual Expense Breakdown"
              >
                <div
                  className="ep-seg ep-stay"
                  style={{ width: `${pStay}%` }}
                  title={`Lodging (${pStay}%)`}
                ></div>
                <div
                  className="ep-seg ep-transit"
                  style={{ width: `${pTransit}%` }}
                  title={`Transit (${pTransit}%)`}
                ></div>
                <div
                  className="ep-seg ep-food"
                  style={{ width: `${pFood}%` }}
                  title={`Food (${pFood}%)`}
                ></div>
                <div
                  className="ep-seg ep-activity"
                  style={{ width: `${pAct}%` }}
                  title={`Activities (${pAct}%)`}
                ></div>
              </div>

              <div className="proportion-legend">
                <span>
                  <i className="dot dot-stay"></i> Stay
                </span>
                <span>
                  <i className="dot dot-transit"></i> Transit
                </span>
                <span>
                  <i className="dot dot-food"></i> Food
                </span>
                <span>
                  <i className="dot dot-activity"></i> Activities
                </span>
              </div>
            </div>

            <div className="expense-breakdown-list">
              <div className="expense-row">
                <div className="exp-icon">
                  <i className="fa-solid fa-bed"></i>
                </div>
                <div className="exp-details">
                  <strong>Stays & Lodging</strong>
                  <span>Cozy mountain homestay / boutique hotel</span>
                </div>
                <strong className="exp-cost">{formatCost(budget.stay)}</strong>
              </div>

              <div className="expense-row">
                <div className="exp-icon">
                  <i className="fa-solid fa-car"></i>
                </div>
                <div className="exp-details">
                  <strong>Transit & Getting Around</strong>
                  <span>Shared SUV / rental bike / local transit</span>
                </div>
                <strong className="exp-cost">{formatCost(budget.transit)}</strong>
              </div>

              <div className="expense-row">
                <div className="exp-icon">
                  <i className="fa-solid fa-utensils"></i>
                </div>
                <div className="exp-details">
                  <strong>Food, Cafes & Drinks</strong>
                  <span>3 hearty meals + scenic tea/coffee breaks</span>
                </div>
                <strong className="exp-cost">{formatCost(budget.food)}</strong>
              </div>

              <div className="expense-row">
                <div className="exp-icon">
                  <i className="fa-solid fa-ticket"></i>
                </div>
                <div className="exp-details">
                  <strong>Activities, Permits & Entry</strong>
                  <span>Monastery passes, boating, viewpoint fees</span>
                </div>
                <strong className="exp-cost">{formatCost(budget.activity)}</strong>
              </div>
            </div>

            {activeDest && (
              <div className="budget-save-tip">
                <i className="fa-solid fa-lightbulb text-accent"></i>
                <span>
                  <strong>Pro-Tip for {activeDest.name.split("&")[0].trim()}:</strong>{" "}
                  {activeDest.proTipCalc}
                </span>
              </div>
            )}

            <div className="calc-card-actions">
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => onSelectDestination(destId)}
              >
                <i className="fa-solid fa-compass"></i> View Full Route Guide
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => onToggleBookmark(destId)}
              >
                <i className="fa-solid fa-heart"></i> Save to Bucket List
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
