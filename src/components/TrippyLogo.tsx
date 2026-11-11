import React, { useId } from "react";

export interface TrippyLogoProps {
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

export const TrippyLogo: React.FC<TrippyLogoProps> = ({
  size = 40,
  fillPercentage,
  variant,
  className = "",
  withGlow = false,
}) => {
  const uniqueId = useId().replace(/:/g, "_");
  const isDynamic = typeof fillPercentage === "number";
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
      aria-label="triPPy Brand Logo"
    >
      <defs>
        {/* ==============================================
            MILK / CHAMPAGNE PALETTE (For Dark Jewel Badges)
            ============================================== */}
        <linearGradient id={`milk-gold-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#FFF3E6" />
          <stop offset="100%" stopColor="#E8C7AA" />
        </linearGradient>

        <linearGradient id={`rose-gold-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5D0E8" />
          <stop offset="50%" stopColor="#E8A8D8" />
          <stop offset="100%" stopColor="#C473A8" />
        </linearGradient>

        {/* ==============================================
            PLUM / VELVET PALETTE (For Light Backgrounds & Filler)
            ============================================== */}
        <linearGradient id={`plum-velvet-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5E2254" />
          <stop offset="50%" stopColor="#43173C" />
          <stop offset="100%" stopColor="#2A0B25" />
        </linearGradient>

        <linearGradient id={`plum-accent-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9C335E" />
          <stop offset="100%" stopColor="#5E2254" />
        </linearGradient>

        {/* Specular Ambient Glow */}
        <filter id={`trippy-glow-${uniqueId}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Dynamic Vertical Clip for 0-100% filling animation in InitialLoader */}
        {isDynamic && (
          <clipPath id={`trippy-clip-${uniqueId}`}>
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

      {/* Optional ambient backdrop glow */}
      {withGlow && (
        <circle
          cx="50"
          cy="50"
          r="42"
          fill={`url(#plum-accent-${uniqueId})`}
          opacity="0.18"
          filter={`url(#trippy-glow-${uniqueId})`}
        />
      )}

      {/* ========================================================
          LAYER 1: MILK / CHAMPAGNE BASE (Visible on dark backgrounds)
          ======================================================== */}
      <g id={`base-layer-${uniqueId}`}>
        {/* Outer Minimalist Geometric Frame (Refined Squircle Hairline) */}
        <rect
          x="10"
          y="10"
          width="80"
          height="80"
          rx="24"
          stroke={`url(#milk-gold-${uniqueId})`}
          strokeWidth="1.6"
          strokeOpacity="0.4"
          fill="none"
        />

        {/* Delicate Corner Accent Brackets */}
        <path
          d="M 18,28 C 18,22 22,18 28,18"
          stroke={`url(#milk-gold-${uniqueId})`}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.8"
          fill="none"
        />
        <path
          d="M 82,72 C 82,78 78,82 72,82"
          stroke={`url(#milk-gold-${uniqueId})`}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.8"
          fill="none"
        />

        {/* Celestial Apex 4-Point Star (The triPPy Spark / North Zenith) */}
        <path
          d="M 50,15 L 51.8,20.8 L 57.5,22.5 L 51.8,24.2 L 50,30 L 48.2,24.2 L 42.5,22.5 L 48.2,20.8 Z"
          fill={`url(#rose-gold-${uniqueId})`}
          opacity="0.9"
        />
        <circle cx="50" cy="22.5" r="1" fill="#FFFFFF" />

        {/* The triPPy Architectural Monogram Emblem (Interlocking Horizon & Modern Mountain Portal) */}
        {/* Left Soaring Ridge ('t' stem & ascent) */}
        <path
          d="M 28,74 L 46,38 C 47.2,35.6 50.8,35.6 52,38 L 59,52"
          stroke={`url(#milk-gold-${uniqueId})`}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* The 'PP' Curvature / Celestial Orbit Horizon */}
        <path
          d="M 45,46 C 45,41 50,37 57,37 C 65,37 71,42.5 71,50.5 C 71,58.5 64,63.5 56,63.5 L 49,63.5"
          stroke={`url(#rose-gold-${uniqueId})`}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Secondary Ascending Horizon Wave (Dynamic Journey Flow) */}
        <path
          d="M 49,74 L 56,60"
          stroke={`url(#milk-gold-${uniqueId})`}
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Geometric Grounding Base Bar with Precision Coordinates */}
        <line
          x1="26"
          y1="74"
          x2="74"
          y2="74"
          stroke={`url(#milk-gold-${uniqueId})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.45"
        />

        {/* Precision Micro-Accents (Luxury Watch Dial Asthetic) */}
        <circle cx="34" cy="74" r="1.6" fill={`url(#rose-gold-${uniqueId})`} />
        <circle cx="66" cy="74" r="1.6" fill={`url(#rose-gold-${uniqueId})`} />
      </g>

      {/* ========================================================
          LAYER 2: PLUM / VELVET FILLER (For Dynamic Fill & Light Theme)
          ======================================================== */}
      {(isDynamic || variant === "plum") && (
        <g
          id={`plum-layer-${uniqueId}`}
          clipPath={isDynamic ? `url(#trippy-clip-${uniqueId})` : undefined}
        >
          {/* Outer Minimalist Geometric Frame in Plum */}
          <rect
            x="10"
            y="10"
            width="80"
            height="80"
            rx="24"
            stroke={`url(#plum-velvet-${uniqueId})`}
            strokeWidth="1.8"
            strokeOpacity="0.3"
            fill="none"
          />

          {/* Delicate Corner Accent Brackets */}
          <path
            d="M 18,28 C 18,22 22,18 28,18"
            stroke={`url(#plum-accent-${uniqueId})`}
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 82,72 C 82,78 78,82 72,82"
            stroke={`url(#plum-accent-${uniqueId})`}
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Celestial Apex 4-Point Star */}
          <path
            d="M 50,15 L 51.8,20.8 L 57.5,22.5 L 51.8,24.2 L 50,30 L 48.2,24.2 L 42.5,22.5 L 48.2,20.8 Z"
            fill={`url(#plum-accent-${uniqueId})`}
          />
          <circle cx="50" cy="22.5" r="1.2" fill="#FFF3E6" />

          {/* The triPPy Architectural Monogram Emblem in Rich Plum */}
          {/* Left Soaring Ridge ('t' stem & ascent) */}
          <path
            d="M 28,74 L 46,38 C 47.2,35.6 50.8,35.6 52,38 L 59,52"
            stroke={`url(#plum-velvet-${uniqueId})`}
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* The 'PP' Curvature / Celestial Orbit Horizon */}
          <path
            d="M 45,46 C 45,41 50,37 57,37 C 65,37 71,42.5 71,50.5 C 71,58.5 64,63.5 56,63.5 L 49,63.5"
            stroke={`url(#plum-accent-${uniqueId})`}
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Secondary Ascending Horizon Wave */}
          <path
            d="M 49,74 L 56,60"
            stroke={`url(#plum-velvet-${uniqueId})`}
            strokeWidth="3.4"
            strokeLinecap="round"
          />

          {/* Grounding Base Bar */}
          <line
            x1="26"
            y1="74"
            x2="74"
            y2="74"
            stroke={`url(#plum-velvet-${uniqueId})`}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />

          {/* Precision Micro-Accents */}
          <circle cx="34" cy="74" r="1.8" fill={`url(#plum-accent-${uniqueId})`} />
          <circle cx="66" cy="74" r="1.8" fill={`url(#plum-accent-${uniqueId})`} />
        </g>
      )}
    </svg>
  );
};

export default TrippyLogo;

