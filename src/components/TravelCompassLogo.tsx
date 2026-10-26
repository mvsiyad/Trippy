import React, { useId } from "react";

export interface TravelCompassLogoProps {
  /** Size in pixels (width & height), defaults to 40 */
  size?: number | string;
  /** Fill percentage from 0 to 100 for dynamic loading. If undefined, rendered fully solid. */
  fillPercentage?: number;
  /** Additional CSS class */
  className?: string;
  /** Whether to show outer glow effect */
  withGlow?: boolean;
}

export const TravelCompassLogo: React.FC<TravelCompassLogoProps> = ({
  size = 40,
  fillPercentage,
  className = "",
  withGlow = false,
}) => {
  const uniqueId = useId().replace(/:/g, "_");
  const isDynamic = typeof fillPercentage === "number";
  const clampedFill = isDynamic ? Math.min(100, Math.max(0, fillPercentage)) : 100;
  const clipY = 100 - clampedFill;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block overflow-visible select-none ${className}`}
      aria-label="Wanderlust Compass Logo"
    >
      <defs>
        {/* Rich Gold Linear Gradients */}
        <linearGradient id={`gold-primary-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2D6" />
          <stop offset="35%" stopColor="#DFC07D" />
          <stop offset="70%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#8C6B28" />
        </linearGradient>

        <linearGradient id={`gold-light-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="50%" stopColor="#F2DFB3" />
          <stop offset="100%" stopColor="#DFC07D" />
        </linearGradient>

        <linearGradient id={`gold-dark-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B38B3E" />
          <stop offset="50%" stopColor="#876420" />
          <stop offset="100%" stopColor="#5E4311" />
        </linearGradient>

        {/* Wireframe Gold Stroke */}
        <linearGradient id={`wireframe-stroke-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DFC07D" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#C5A059" stopOpacity="0.2" />
        </linearGradient>

        {/* Liquid Surface Meniscus Beam */}
        <linearGradient id={`meniscus-beam-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#DFC07D" stopOpacity="0" />
          <stop offset="20%" stopColor="#FFF6DF" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="80%" stopColor="#FFF6DF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#DFC07D" stopOpacity="0" />
        </linearGradient>

        {/* Radial Glow Filter */}
        <filter id={`gold-glow-${uniqueId}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Dynamic Vertical Clip Path for 0-100% Filling */}
        {isDynamic && (
          <clipPath id={`fill-clip-${uniqueId}`}>
            <rect
              x="0"
              y={clipY}
              width="100"
              height={clampedFill}
              style={{ transition: "y 0.1s linear, height 0.1s linear" }}
            />
          </clipPath>
        )}
      </defs>

      {/* Ambient background glow if requested */}
      {withGlow && (
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="url(#gold-primary-${uniqueId})"
          opacity="0.16"
          filter={`url(#gold-glow-${uniqueId})`}
        />
      )}

      {/* ========================================================
          LAYER 1: WIREFRAME / OUTLINE BASE (Visible at low/zero fill)
          ======================================================== */}
      <g stroke={`url(#wireframe-stroke-${uniqueId})`} strokeWidth="1.2" strokeLinecap="round">
        {/* Outer Celestial Ring */}
        <circle cx="50" cy="50" r="46" strokeWidth="1.4" opacity="0.6" />
        {/* Dial Inner Track */}
        <circle cx="50" cy="50" r="40" strokeWidth="0.8" strokeDasharray="1.5 3.5" opacity="0.75" />

        {/* Cardinal Ticks (N, S, E, W) */}
        <line x1="50" y1="2" x2="50" y2="7" strokeWidth="1.6" />
        <line x1="50" y1="93" x2="50" y2="98" strokeWidth="1.6" />
        <line x1="2" y1="50" x2="7" y2="50" strokeWidth="1.6" />
        <line x1="93" y1="50" x2="98" y2="50" strokeWidth="1.6" />

        {/* Diagonal Ordinal Ticks */}
        <line x1="16" y1="16" x2="20" y2="20" strokeWidth="1" opacity="0.6" />
        <line x1="84" y1="16" x2="80" y2="20" strokeWidth="1" opacity="0.6" />
        <line x1="16" y1="84" x2="20" y2="80" strokeWidth="1" opacity="0.6" />
        <line x1="84" y1="84" x2="80" y2="80" strokeWidth="1" opacity="0.6" />

        {/* Orbit Ellipse (Latitude Ring) */}
        <ellipse
          cx="50"
          cy="50"
          rx="44"
          ry="15"
          transform="rotate(-22 50 50)"
          strokeWidth="0.9"
          strokeDasharray="2 3"
          opacity="0.45"
        />

        {/* Star Wireframe Outlines */}
        {/* North */}
        <polygon points="50,10 50,50 43,43" fill="none" opacity="0.35" />
        <polygon points="50,10 50,50 57,43" fill="none" opacity="0.35" />
        {/* South */}
        <polygon points="50,90 50,50 43,57" fill="none" opacity="0.35" />
        <polygon points="50,90 50,50 57,57" fill="none" opacity="0.35" />
        {/* East */}
        <polygon points="90,50 50,50 57,43" fill="none" opacity="0.35" />
        <polygon points="90,50 50,50 57,57" fill="none" opacity="0.35" />
        {/* West */}
        <polygon points="10,50 50,50 43,43" fill="none" opacity="0.35" />
        <polygon points="10,50 50,50 43,57" fill="none" opacity="0.35" />

        {/* Diagonal Points (NE, SE, SW, NW) */}
        <polygon points="73,27 50,50 57,43" fill="none" opacity="0.25" />
        <polygon points="73,73 50,50 57,57" fill="none" opacity="0.25" />
        <polygon points="27,73 50,50 43,57" fill="none" opacity="0.25" />
        <polygon points="27,27 50,50 43,43" fill="none" opacity="0.25" />

        {/* Central Bezel & Pivot */}
        <circle cx="50" cy="50" r="8" strokeWidth="1" opacity="0.5" />
        <circle cx="50" cy="50" r="3.5" strokeWidth="1" opacity="0.6" />
      </g>

      {/* ========================================================
          LAYER 2: RICH FILLED LUXURY EMBLEM
          (Clipped dynamically when fillPercentage is provided)
          ======================================================== */}
      <g clipPath={isDynamic ? `url(#fill-clip-${uniqueId})` : undefined}>
        {/* Outer Radiant Bezel Ring */}
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke={`url(#gold-primary-${uniqueId})`}
          strokeWidth="2.2"
        />

        {/* Outer Dial Track */}
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke={`url(#gold-light-${uniqueId})`}
          strokeWidth="1.2"
          strokeDasharray="2 3.5"
          opacity="0.9"
        />

        {/* Cardinal Direction Ticks */}
        <line x1="50" y1="1" x2="50" y2="8" stroke={`url(#gold-light-${uniqueId})`} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="50" y1="92" x2="50" y2="99" stroke={`url(#gold-primary-${uniqueId})`} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="1" y1="50" x2="8" y2="50" stroke={`url(#gold-primary-${uniqueId})`} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="92" y1="50" x2="99" y2="50" stroke={`url(#gold-light-${uniqueId})`} strokeWidth="2.5" strokeLinecap="round" />

        {/* North Fleur / Expedition Arrow Tip */}
        <polygon
          points="50,4 47.5,9.5 52.5,9.5"
          fill={`url(#gold-light-${uniqueId})`}
        />

        {/* Celestial Orbit Ring */}
        <ellipse
          cx="50"
          cy="50"
          rx="44"
          ry="15"
          transform="rotate(-22 50 50)"
          stroke={`url(#gold-light-${uniqueId})`}
          strokeWidth="1.4"
          strokeDasharray="3 4"
          opacity="0.75"
        />

        {/* ----------------------------------------------------
            FACETED COMPASS STAR (Light & Dark alternating facets)
            ---------------------------------------------------- */}
        {/* NORTH NEEDLE */}
        {/* Left facet (Light gold highlight) */}
        <polygon
          points="50,8 50,50 43,43"
          fill={`url(#gold-light-${uniqueId})`}
        />
        {/* Right facet (Deep burnished gold) */}
        <polygon
          points="50,8 50,50 57,43"
          fill={`url(#gold-dark-${uniqueId})`}
        />

        {/* SOUTH NEEDLE */}
        {/* Left facet */}
        <polygon
          points="50,92 50,50 43,57"
          fill={`url(#gold-dark-${uniqueId})`}
        />
        {/* Right facet */}
        <polygon
          points="50,92 50,50 57,57"
          fill={`url(#gold-light-${uniqueId})`}
        />

        {/* EAST NEEDLE */}
        {/* Top facet */}
        <polygon
          points="92,50 50,50 57,43"
          fill={`url(#gold-light-${uniqueId})`}
        />
        {/* Bottom facet */}
        <polygon
          points="92,50 50,50 57,57"
          fill={`url(#gold-dark-${uniqueId})`}
        />

        {/* WEST NEEDLE */}
        {/* Top facet */}
        <polygon
          points="8,50 50,50 43,43"
          fill={`url(#gold-dark-${uniqueId})`}
        />
        {/* Bottom facet */}
        <polygon
          points="8,50 50,50 43,57"
          fill={`url(#gold-light-${uniqueId})`}
        />

        {/* SECONDARY DIAGONAL POINTS */}
        {/* NE Point */}
        <polygon
          points="74,26 50,50 57,43"
          fill={`url(#gold-light-${uniqueId})`}
          opacity="0.9"
        />
        <polygon
          points="74,26 50,50 54,49"
          fill={`url(#gold-dark-${uniqueId})`}
          opacity="0.9"
        />

        {/* SE Point */}
        <polygon
          points="74,74 50,50 57,57"
          fill={`url(#gold-dark-${uniqueId})`}
          opacity="0.9"
        />
        <polygon
          points="74,74 50,50 54,51"
          fill={`url(#gold-light-${uniqueId})`}
          opacity="0.9"
        />

        {/* SW Point */}
        <polygon
          points="26,74 50,50 43,57"
          fill={`url(#gold-light-${uniqueId})`}
          opacity="0.9"
        />
        <polygon
          points="26,74 50,50 46,51"
          fill={`url(#gold-dark-${uniqueId})`}
          opacity="0.9"
        />

        {/* NW Point */}
        <polygon
          points="26,26 50,50 43,43"
          fill={`url(#gold-dark-${uniqueId})`}
          opacity="0.9"
        />
        <polygon
          points="26,26 50,50 46,49"
          fill={`url(#gold-light-${uniqueId})`}
          opacity="0.9"
        />

        {/* Mountain Silhouette Peak Accent at Center Core */}
        <polygon
          points="50,38 60,54 40,54"
          fill="#151311"
          opacity="0.5"
        />
        <polygon
          points="50,38 56,54 44,54"
          fill={`url(#gold-primary-${uniqueId})`}
          opacity="0.8"
        />

        {/* Center Bezel Rings & Brass Pivot */}
        <circle
          cx="50"
          cy="50"
          r="9.5"
          stroke={`url(#gold-dark-${uniqueId})`}
          strokeWidth="1.5"
          fill="#151311"
        />
        <circle
          cx="50"
          cy="50"
          r="7"
          fill={`url(#gold-primary-${uniqueId})`}
        />
        <circle
          cx="50"
          cy="50"
          r="3"
          fill="#FFFDF7"
        />
      </g>

      {/* ========================================================
          LIQUID MENISCUS GLOW BEAM (Visible during filling 1-99%)
          ======================================================== */}
      {isDynamic && clampedFill > 1 && clampedFill < 99.5 && (
        <g style={{ transition: "transform 0.1s linear" }}>
          {/* Glowing horizontal meniscus waterline */}
          <line
            x1="12"
            y1={clipY}
            x2="88"
            y2={clipY}
            stroke={`url(#meniscus-beam-${uniqueId})`}
            strokeWidth="3"
            filter={`url(#gold-glow-${uniqueId})`}
          />
          <line
            x1="18"
            y1={clipY}
            x2="82"
            y2={clipY}
            stroke="#FFFFFF"
            strokeWidth="1.2"
            opacity="0.9"
          />
        </g>
      )}
    </svg>
  );
};

export default TravelCompassLogo;
