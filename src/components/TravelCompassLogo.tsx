import React, { useId } from "react";

export interface TravelCompassLogoProps {
  /** Size in pixels (width & height), defaults to 40 */
  size?: number | string;
  /** Fill percentage from 0 to 100 for dynamic loading. If undefined, rendered according to variant. */
  fillPercentage?: number;
  /** Color variant: 'milk' (for dark backgrounds), 'plum' (for light backgrounds), or default dynamic fill */
  variant?: "milk" | "plum" | "dynamic";
  /** Additional CSS class */
  className?: string;
  /** Whether to show ambient backdrop glow */
  withGlow?: boolean;
}

export const TravelCompassLogo: React.FC<TravelCompassLogoProps> = ({
  size = 40,
  fillPercentage,
  variant,
  className = "",
  withGlow = false,
}) => {
  const uniqueId = useId().replace(/:/g, "_");
  const isDynamic = typeof fillPercentage === "number";
  // If variant is explicitly 'milk', clampedFill is 0 (shows pure milk layer)
  // If variant is 'plum', clampedFill is 100 (shows pure plum layer)
  const defaultFill = variant === "milk" ? 0 : 100;
  const clampedFill = isDynamic ? Math.min(100, Math.max(0, fillPercentage)) : defaultFill;
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
        {/* ==============================================
            MILK (#FFF3E6) PALETTE DEFINITIONS (Base State)
            ============================================== */}
        <linearGradient id={`milk-surface-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#FFF3E6" />
          <stop offset="100%" stopColor="#F7E6D4" />
        </linearGradient>

        <linearGradient id={`milk-shaded-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5E3D2" />
          <stop offset="100%" stopColor="#E8D1BC" />
        </linearGradient>

        {/* Plum Hairline Contours on Milk Canvas */}
        <linearGradient id={`plum-contour-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#381932" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#381932" stopOpacity="0.25" />
        </linearGradient>

        {/* ==============================================
            PLUM (#381932) PALETTE DEFINITIONS (Filler State)
            ============================================== */}
        <linearGradient id={`plum-primary-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5E2754" />
          <stop offset="45%" stopColor="#461E3E" />
          <stop offset="100%" stopColor="#381932" />
        </linearGradient>

        <linearGradient id={`plum-light-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6C2E61" />
          <stop offset="50%" stopColor="#4F2247" />
          <stop offset="100%" stopColor="#381932" />
        </linearGradient>

        <linearGradient id={`plum-dark-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#381932" />
          <stop offset="60%" stopColor="#281124" />
          <stop offset="100%" stopColor="#1B0A18" />
        </linearGradient>

        {/* Soft Shadow / Glow Filter */}
        <filter id={`plum-glow-${uniqueId}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Dynamic Vertical Clip Path for 0-100% Plum Filling */}
        {isDynamic && (
          <clipPath id={`fill-clip-${uniqueId}`}>
            <rect
              x="0"
              y={clipY}
              width="100"
              height={clampedFill}
              style={{ transition: "y 0.08s linear, height 0.08s linear" }}
            />
          </clipPath>
        )}
      </defs>

      {/* Ambient background aura if requested */}
      {withGlow && (
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="url(#plum-primary-${uniqueId})"
          opacity="0.12"
          filter={`url(#plum-glow-${uniqueId})`}
        />
      )}

      {/* ========================================================
          LAYER 1: BASE STATE IN MILK (#FFF3E6)
          Visible on Milk Canvas with delicate Plum hairline contours
          ======================================================== */}
      <g stroke="rgba(56, 25, 50, 0.35)" strokeLinecap="round">
        {/* Outer Celestial Ring */}
        <circle
          cx="50"
          cy="50"
          r="46"
          strokeWidth="1.8"
          stroke="rgba(56, 25, 50, 0.4)"
        />

        {/* Dial Inner Track */}
        <circle
          cx="50"
          cy="50"
          r="40"
          strokeWidth="1"
          strokeDasharray="2 3.5"
          stroke="rgba(56, 25, 50, 0.28)"
        />

        {/* Cardinal Direction Ticks (N, S, E, W) */}
        <line x1="50" y1="1" x2="50" y2="8" strokeWidth="2.2" stroke="rgba(56, 25, 50, 0.5)" />
        <line x1="50" y1="92" x2="50" y2="99" strokeWidth="2.2" stroke="rgba(56, 25, 50, 0.5)" />
        <line x1="1" y1="50" x2="8" y2="50" strokeWidth="2.2" stroke="rgba(56, 25, 50, 0.5)" />
        <line x1="92" y1="50" x2="99" y2="50" strokeWidth="2.2" stroke="rgba(56, 25, 50, 0.5)" />

        {/* North Arrow Tip */}
        <polygon
          points="50,4 47.5,9.5 52.5,9.5"
          fill="#381932"
          opacity="0.5"
          stroke="none"
        />

        {/* Celestial Orbit Ring */}
        <ellipse
          cx="50"
          cy="50"
          rx="44"
          ry="15"
          transform="rotate(-22 50 50)"
          strokeWidth="1"
          strokeDasharray="3 4"
          stroke="rgba(56, 25, 50, 0.22)"
        />

        {/* ----------------------------------------------------
            FACETED COMPASS STAR IN MILK (#FFF3E6)
            ---------------------------------------------------- */}
        {/* NORTH NEEDLE */}
        <polygon points="50,8 50,50 43,43" fill={`url(#milk-surface-${uniqueId})`} strokeWidth="0.8" />
        <polygon points="50,8 50,50 57,43" fill={`url(#milk-shaded-${uniqueId})`} strokeWidth="0.8" />

        {/* SOUTH NEEDLE */}
        <polygon points="50,92 50,50 43,57" fill={`url(#milk-shaded-${uniqueId})`} strokeWidth="0.8" />
        <polygon points="50,92 50,50 57,57" fill={`url(#milk-surface-${uniqueId})`} strokeWidth="0.8" />

        {/* EAST NEEDLE */}
        <polygon points="92,50 50,50 57,43" fill={`url(#milk-surface-${uniqueId})`} strokeWidth="0.8" />
        <polygon points="92,50 50,50 57,57" fill={`url(#milk-shaded-${uniqueId})`} strokeWidth="0.8" />

        {/* WEST NEEDLE */}
        <polygon points="8,50 50,50 43,43" fill={`url(#milk-shaded-${uniqueId})`} strokeWidth="0.8" />
        <polygon points="8,50 50,50 43,57" fill={`url(#milk-surface-${uniqueId})`} strokeWidth="0.8" />

        {/* SECONDARY DIAGONAL POINTS */}
        <polygon points="74,26 50,50 57,43" fill={`url(#milk-surface-${uniqueId})`} strokeWidth="0.7" />
        <polygon points="74,26 50,50 54,49" fill={`url(#milk-shaded-${uniqueId})`} strokeWidth="0.7" />

        <polygon points="74,74 50,50 57,57" fill={`url(#milk-shaded-${uniqueId})`} strokeWidth="0.7" />
        <polygon points="74,74 50,50 54,51" fill={`url(#milk-surface-${uniqueId})`} strokeWidth="0.7" />

        <polygon points="26,74 50,50 43,57" fill={`url(#milk-surface-${uniqueId})`} strokeWidth="0.7" />
        <polygon points="26,74 50,50 46,51" fill={`url(#milk-shaded-${uniqueId})`} strokeWidth="0.7" />

        <polygon points="26,26 50,50 43,43" fill={`url(#milk-shaded-${uniqueId})`} strokeWidth="0.7" />
        <polygon points="26,26 50,50 46,49" fill={`url(#milk-surface-${uniqueId})`} strokeWidth="0.7" />

        {/* Center Peak Silhouette */}
        <polygon points="50,38 56,54 44,54" fill="#381932" opacity="0.25" stroke="none" />

        {/* Center Pivot */}
        <circle cx="50" cy="50" r="9.5" stroke="rgba(56, 25, 50, 0.45)" strokeWidth="1.2" fill="#FFF3E6" />
        <circle cx="50" cy="50" r="6" fill="#381932" opacity="0.3" stroke="none" />
        <circle cx="50" cy="50" r="2.8" fill="#FFF3E6" stroke="none" />
      </g>

      {/* ========================================================
          LAYER 2: SOLID PLUM (#381932) DIRECT FILL
          Directly fills over the Milk base from bottom to top!
          NO lines, NO meniscus bar — direct solid cover.
          ======================================================== */}
      <g clipPath={isDynamic ? `url(#fill-clip-${uniqueId})` : undefined}>
        {/* Outer Bezel Ring in Plum */}
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke={`url(#plum-light-${uniqueId})`}
          strokeWidth="2.2"
        />

        {/* Outer Dial Track */}
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke={`url(#plum-primary-${uniqueId})`}
          strokeWidth="1.2"
          strokeDasharray="2 3.5"
          opacity="0.95"
        />

        {/* Cardinal Direction Ticks */}
        <line x1="50" y1="1" x2="50" y2="8" stroke={`url(#plum-light-${uniqueId})`} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="50" y1="92" x2="50" y2="99" stroke={`url(#plum-primary-${uniqueId})`} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="1" y1="50" x2="8" y2="50" stroke={`url(#plum-primary-${uniqueId})`} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="92" y1="50" x2="99" y2="50" stroke={`url(#plum-light-${uniqueId})`} strokeWidth="2.5" strokeLinecap="round" />

        {/* North Fleur Tip */}
        <polygon
          points="50,4 47.5,9.5 52.5,9.5"
          fill={`url(#plum-light-${uniqueId})`}
        />

        {/* Celestial Orbit Ring */}
        <ellipse
          cx="50"
          cy="50"
          rx="44"
          ry="15"
          transform="rotate(-22 50 50)"
          stroke={`url(#plum-light-${uniqueId})`}
          strokeWidth="1.4"
          strokeDasharray="3 4"
          opacity="0.85"
        />

        {/* ----------------------------------------------------
            FACETED COMPASS STAR IN PLUM (#381932)
            ---------------------------------------------------- */}
        {/* NORTH NEEDLE */}
        <polygon points="50,8 50,50 43,43" fill={`url(#plum-light-${uniqueId})`} />
        <polygon points="50,8 50,50 57,43" fill={`url(#plum-dark-${uniqueId})`} />

        {/* SOUTH NEEDLE */}
        <polygon points="50,92 50,50 43,57" fill={`url(#plum-dark-${uniqueId})`} />
        <polygon points="50,92 50,50 57,57" fill={`url(#plum-light-${uniqueId})`} />

        {/* EAST NEEDLE */}
        <polygon points="92,50 50,50 57,43" fill={`url(#plum-light-${uniqueId})`} />
        <polygon points="92,50 50,50 57,57" fill={`url(#plum-dark-${uniqueId})`} />

        {/* WEST NEEDLE */}
        <polygon points="8,50 50,50 43,43" fill={`url(#plum-dark-${uniqueId})`} />
        <polygon points="8,50 50,50 43,57" fill={`url(#plum-light-${uniqueId})`} />

        {/* SECONDARY DIAGONAL POINTS */}
        <polygon points="74,26 50,50 57,43" fill={`url(#plum-light-${uniqueId})`} opacity="0.95" />
        <polygon points="74,26 50,50 54,49" fill={`url(#plum-dark-${uniqueId})`} opacity="0.95" />

        <polygon points="74,74 50,50 57,57" fill={`url(#plum-dark-${uniqueId})`} opacity="0.95" />
        <polygon points="74,74 50,50 54,51" fill={`url(#plum-light-${uniqueId})`} opacity="0.95" />

        <polygon points="26,74 50,50 43,57" fill={`url(#plum-light-${uniqueId})`} opacity="0.95" />
        <polygon points="26,74 50,50 46,51" fill={`url(#plum-dark-${uniqueId})`} opacity="0.95" />

        <polygon points="26,26 50,50 43,43" fill={`url(#plum-dark-${uniqueId})`} opacity="0.95" />
        <polygon points="26,26 50,50 46,49" fill={`url(#plum-light-${uniqueId})`} opacity="0.95" />

        {/* Center Peak Silhouette */}
        <polygon points="50,38 60,54 40,54" fill="#240D20" opacity="0.6" />
        <polygon points="50,38 56,54 44,54" fill={`url(#plum-primary-${uniqueId})`} opacity="0.95" />

        {/* Center Bezel Rings & Brass Pivot */}
        <circle
          cx="50"
          cy="50"
          r="9.5"
          stroke={`url(#plum-dark-${uniqueId})`}
          strokeWidth="1.5"
          fill="#381932"
        />
        <circle
          cx="50"
          cy="50"
          r="7"
          fill={`url(#plum-light-${uniqueId})`}
        />
        <circle
          cx="50"
          cy="50"
          r="3"
          fill="#FFF3E6"
        />
      </g>
    </svg>
  );
};

export default TravelCompassLogo;
