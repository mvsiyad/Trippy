import React, { useEffect, useState } from "react";
import { TravelCompassLogo } from "./TravelCompassLogo";

interface InitialLoaderProps {
  onComplete: () => void;
  /** Minimum duration in milliseconds (default: 2000ms) */
  minDuration?: number;
}

export const InitialLoader: React.FC<InitialLoaderProps> = ({
  onComplete,
  minDuration = 2200,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Allow visual inspection via query param, e.g. ?loader_preview=68
    const previewParam = new URLSearchParams(window.location.search).get("loader_preview");
    if (previewParam !== null) {
      const targetPercent = previewParam === "" ? 68 : parseInt(previewParam, 10) || 68;
      setProgress(targetPercent);
      return;
    }

    const startTime = performance.now();
    let animationFrameId: number;
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;
    let finishTimer: ReturnType<typeof setTimeout> | undefined;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const linearT = Math.min(1, elapsed / minDuration);

      // Realistic easing curve: easeInOutQuad for smooth acceleration and deceleration
      const easedT =
        linearT < 0.5
          ? 2 * linearT * linearT
          : 1 - Math.pow(-2 * linearT + 2, 2) / 2;

      const currentProgress = Math.min(100, Math.round(easedT * 100));
      setProgress(currentProgress);

      if (linearT < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        // Short pause at 100% to appreciate the complete filled logo
        fadeTimer = setTimeout(() => {
          setIsFadingOut(true);
          finishTimer = setTimeout(() => {
            onComplete();
          }, 650); // Matches CSS transition duration
        }, 320);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (fadeTimer) clearTimeout(fadeTimer);
      if (finishTimer) clearTimeout(finishTimer);
    };
  }, [minDuration, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#151311] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
        isFadingOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
      aria-label="Loading Wanderlust"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Subtle radial ambient backdrop glow */}
      <div
        className="absolute w-[440px] h-[440px] rounded-full pointer-events-none transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle, rgba(197, 160, 89, 0.12) 0%, rgba(21, 19, 17, 0) 70%)",
          opacity: 0.3 + (progress / 100) * 0.7,
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* The Bespoke Matching Logo Filling from 0 to 100% */}
        <div className="relative transition-transform duration-300 transform hover:scale-105">
          <TravelCompassLogo
            size={136}
            fillPercentage={progress}
            withGlow={progress > 15}
            className="filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
          />
        </div>

        {/* Plain Number Only Loading */}
        <div className="mt-7 flex items-baseline tracking-wider">
          <span
            className="font-mono text-2xl font-bold tabular-nums text-[#DFC07D] transition-colors duration-200"
            style={{ textShadow: "0 2px 14px rgba(197, 160, 89, 0.3)" }}
          >
            {progress}
          </span>
          <span className="font-mono text-sm font-semibold text-[#DFC07D]/70 ml-1">
            %
          </span>
        </div>
      </div>
    </div>
  );
};

export default InitialLoader;
