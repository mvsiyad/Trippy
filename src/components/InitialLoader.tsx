import React, { useEffect, useState } from "react";
import { TravelCompassLogo } from "./TravelCompassLogo";

interface InitialLoaderProps {
  onComplete: () => void;
  /** Duration in milliseconds (default: 2200ms) */
  minDuration?: number;
}

export const InitialLoader: React.FC<InitialLoaderProps> = ({
  onComplete,
  minDuration = 2200,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Support visual inspection via query param, e.g. ?loader_preview=65 or ?loader_preview=0
    const previewParam = new URLSearchParams(window.location.search).get("loader_preview");
    if (previewParam !== null) {
      const parsed = parseInt(previewParam, 10);
      const targetPercent = isNaN(parsed) ? 65 : parsed;
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

      // Smooth easeInOut curve
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
        // Short pause at 100% to appreciate the completed Plum emblem
        fadeTimer = setTimeout(() => {
          setIsFadingOut(true);
          finishTimer = setTimeout(() => {
            onComplete();
          }, 650);
        }, 360);
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
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#FFF3E6] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
        isFadingOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
      aria-label="Loading Wanderlust"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Subtle warm depth vignette */}
      <div
        className="absolute w-[460px] h-[460px] rounded-full pointer-events-none transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle, rgba(56, 25, 50, 0.05) 0%, rgba(255, 243, 230, 0) 70%)",
          opacity: 0.8,
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Initial Milk (#FFF3E6) Logo directly being filled by Plum (#381932) */}
        <div className="relative transition-transform duration-300">
          <TravelCompassLogo
            size={140}
            fillPercentage={progress}
            withGlow={false}
            className="filter drop-shadow-[0_8px_20px_rgba(56,25,50,0.12)]"
          />
        </div>

        {/* Plain Number Only Loading in Plum (#381932) */}
        <div className="mt-7 flex items-baseline tracking-wider">
          <span
            className="font-mono text-2xl font-bold tabular-nums text-[#381932] transition-colors duration-200"
            style={{ textShadow: "0 1px 8px rgba(56, 25, 50, 0.15)" }}
          >
            {progress}
          </span>
          <span className="font-mono text-sm font-semibold text-[#381932]/70 ml-1">
            %
          </span>
        </div>
      </div>
    </div>
  );
};

export default InitialLoader;
