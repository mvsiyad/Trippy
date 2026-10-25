"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface Slide {
  id?: string;
  image: string;
  title: string;
  description: string;
  badge: string;
  country?: string;
  region?: string;
  vibe?: string;
  dailyBudget?: string;
  idealDays?: string;
  bestSeason?: string;
  isSaved?: boolean;
}

const defaultSlides: Slide[] = [
  {
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    title: "Mountain Trek",
    description: "Scale new heights and embrace the hiker's journey.",
    badge: "Adventure",
  },
  {
    image: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=1200&q=80",
    title: "River Rafting",
    description: "Feel the adrenaline rush as you navigate the wild rapids.",
    badge: "Extreme",
  },
  {
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    title: "Forest Walk",
    description: "Deep dive into the silence of the ancient woods.",
    badge: "Nature",
  },
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    title: "Azure Beach",
    description: "Unwind on the crystal clear shores of a tropical paradise.",
    badge: "Paradise",
  },
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    title: "Spiritual Path",
    description: "Discover inner peace through ancient wisdom.",
    badge: "Serenity",
  },
];

interface CarouselConfig {
  distanceDivisor: number;
  velocityDivisor: number;
  sensitivity: number;
  xMultiplier: number;
  yMultiplier: number;
  rotationMultiplier: number;
  scaleReduction: number;
}

// Tuned spacing so cards never clip on left/right edges and arch gently
const getCarouselConfig = (width: number): CarouselConfig => {
  if (width < 640) {
    return {
      distanceDivisor: 120,
      velocityDivisor: 500,
      sensitivity: 170,
      xMultiplier: 85,
      yMultiplier: 10,
      rotationMultiplier: 5,
      scaleReduction: 0.06,
    };
  }
  if (width < 1024) {
    return {
      distanceDivisor: 150,
      velocityDivisor: 600,
      sensitivity: 200,
      xMultiplier: 125,
      yMultiplier: 14,
      rotationMultiplier: 6,
      scaleReduction: 0.07,
    };
  }
  // Desktop - tight, balanced fan that fits completely inside any screen width
  return {
    distanceDivisor: 190,
    velocityDivisor: 750,
    sensitivity: 230,
    xMultiplier: 150,
    yMultiplier: 16,
    rotationMultiplier: 6.5,
    scaleReduction: 0.08,
  };
};

export interface CarouselStackedProps {
  slides?: Slide[];
  className?: string;
  onCardClick?: (slide: Slide, index: number) => void;
  onToggleBookmark?: (id: string) => void;
}

const CarouselStacked = ({
  slides = defaultSlides,
  className,
  onCardClick,
  onToggleBookmark,
}: CarouselStackedProps) => {
  const scrollProgress = useMotionValue(0);
  const startProgress = React.useRef(0);
  const [windowWidth, setWindowWidth] = React.useState(0);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const total = slides.length;

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset to first slide whenever the filtered slides array changes
  React.useEffect(() => {
    scrollProgress.set(0);
    startProgress.current = 0;
    setActiveIndex(0);
  }, [slides, scrollProgress]);

  // Track active slide index
  React.useEffect(() => {
    const updateIndex = (v: number) => {
      if (total > 0) {
        const idx = ((Math.round(v) % total) + total) % total;
        setActiveIndex(idx);
      }
    };
    updateIndex(scrollProgress.get());
    const unsub = scrollProgress.on("change", updateIndex);
    return () => unsub();
  }, [scrollProgress, total]);

  const config = React.useMemo(
    () => getCarouselConfig(windowWidth),
    [windowWidth],
  );

  const handleDragStart = () => {
    startProgress.current = scrollProgress.get();
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const dragDistance = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(dragDistance) < 6 && Math.abs(velocity) < 30) {
      if (total > 0) {
        const activeIdx =
          ((Math.round(scrollProgress.get()) % total) + total) % total;
        onCardClick?.(slides[activeIdx], activeIdx);
      }
      return;
    }

    const distanceShift = -dragDistance / config.distanceDivisor;
    const velocityShift = -velocity / config.velocityDivisor;

    let totalShift = Math.round(distanceShift + velocityShift);
    totalShift = Math.max(-3, Math.min(3, totalShift));

    const target = Math.round(startProgress.current) + totalShift;

    animate(scrollProgress, target, {
      type: "spring",
      stiffness: 220,
      damping: 28,
      mass: 1,
    });
  };

  const handlePrev = React.useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (total <= 1) return;
      const cur = Math.round(scrollProgress.get());
      animate(scrollProgress, cur - 1, {
        type: "spring",
        stiffness: 230,
        damping: 28,
        mass: 1,
      });
    },
    [scrollProgress, total]
  );

  const handleNext = React.useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (total <= 1) return;
      const cur = Math.round(scrollProgress.get());
      animate(scrollProgress, cur + 1, {
        type: "spring",
        stiffness: 230,
        damping: 28,
        mass: 1,
      });
    },
    [scrollProgress, total]
  );

  // 2-Finger Laptop Touchpad / Trackpad horizontal swipe listener
  const accumulatedDeltaX = React.useRef(0);
  const lastWheelTime = React.useRef(0);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || total <= 1) return;

    const onWheel = (e: WheelEvent) => {
      // Determine if this is a horizontal gesture on laptop touchpad or Shift + wheel
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = isHorizontal ? e.deltaX : (e.shiftKey ? e.deltaY : 0);

      if (Math.abs(delta) > 10) {
        // Prevent browser horizontal back/forward navigation
        e.preventDefault();

        accumulatedDeltaX.current += delta;
        const now = performance.now();

        // Trigger slide transition when threshold is met with debounce
        if (Math.abs(accumulatedDeltaX.current) > 38 && now - lastWheelTime.current > 260) {
          lastWheelTime.current = now;
          if (accumulatedDeltaX.current > 0) {
            handleNext();
          } else {
            handlePrev();
          }
          accumulatedDeltaX.current = 0;
        }
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [total, handleNext, handlePrev]);

  if (total === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col items-center justify-center w-full py-2 lg:py-4 select-none relative",
        className
      )}
    >
      {/* 3D Stage Container with fully visible sides and clear bottom bounds */}
      <div className="relative w-full max-w-6xl h-[25rem] sm:h-[28rem] lg:h-[31rem] xl:h-[32.5rem] flex items-center justify-center">
        {/* Transparent Drag Surface */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={handleDragStart}
          onDrag={(_, info) => {
            const delta = -info.delta.x / config.sensitivity;
            scrollProgress.set(scrollProgress.get() + delta);
          }}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 z-30 cursor-grab active:cursor-grabbing"
        />

        {/* 3D Stacked Cards */}
        {slides.map((slide, i) => (
          <Card
            key={slide.id || i}
            slide={slide}
            index={i}
            total={total}
            progress={scrollProgress}
            config={config}
            onClick={() => onCardClick?.(slide, i)}
            onToggleBookmark={onToggleBookmark}
          />
        ))}
      </div>

      {/* Footer Info & Active Counter with generous top separation */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl mt-8 sm:mt-10 lg:mt-12 px-4 gap-2 text-xs sm:text-sm text-stone-600">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white border border-stone-200/90 font-semibold text-stone-800 shadow-xs">
            <i className="fa-solid fa-compass text-amber-600"></i>
            Guide {activeIndex + 1} of {total}
          </span>
          <span className="hidden sm:inline text-stone-400">&bull;</span>
          <span className="hidden sm:inline font-medium text-stone-700 truncate max-w-xs">
            {slides[activeIndex]?.title}
          </span>
        </div>
      </div>

      {/* Pagination Dots */}
      {total > 1 && total <= 16 && (
        <div className="flex items-center justify-center gap-1.5 mt-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                const cur = scrollProgress.get();
                const curIndex = ((Math.round(cur) % total) + total) % total;
                let diff = i - curIndex;
                if (diff > total / 2) diff -= total;
                if (diff < -total / 2) diff += total;
                animate(scrollProgress, Math.round(cur) + diff, {
                  type: "spring",
                  stiffness: 230,
                  damping: 28,
                });
              }}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${i === activeIndex
                  ? "w-7 bg-stone-900"
                  : "w-1.5 bg-stone-300 hover:bg-stone-400"
                }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface CardProps {
  slide: Slide;
  index: number;
  total: number;
  progress: MotionValue<number>;
  config: CarouselConfig;
  onClick?: () => void;
  onToggleBookmark?: (id: string) => void;
}

const Card = ({
  slide,
  index,
  total,
  progress,
  config,
  onClick,
  onToggleBookmark,
}: CardProps) => {
  const offset = useTransform(progress, (p) => {
    if (total <= 1) return 0;
    let diff = (index - p) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  });

  const x = useTransform(offset, (o) => o * config.xMultiplier);
  const rotate = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return o * config.rotationMultiplier;
  });
  const y = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return absO * config.yMultiplier;
  });
  const scale = useTransform(
    offset,
    (o) => 1 - Math.abs(o) * config.scaleReduction,
  );

  // Limit visible stack to 5 cards (2 left, 1 center, 2 right)
  // Cards further away fade out cleanly to prevent side clipping
  const opacity = useTransform(offset, (o) => {
    if (total <= 1) return 1;
    const absO = Math.abs(o);
    if (absO >= 2.25) return 0;
    if (absO >= 1.75) return (2.25 - absO) / 0.5;
    return 1;
  });

  const zIndex = useTransform(offset, (o) =>
    Math.round(100 - Math.abs(o) * 10),
  );

  // Smoothly reveal full snippet, badges, and CTA button ONLY on the active center card
  const detailsOpacity = useTransform(offset, [-0.4, 0, 0.4], [0, 1, 0]);

  return (
    <motion.div
      style={{
        x,
        rotate,
        y,
        scale,
        opacity,
        zIndex,
      }}
      className={cn(
        "absolute rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-900 group shadow-2xl transition-shadow",
        // Reduced size by ~4% for a sleeker profile and zero edge-cutting
        "w-56 h-[22.5rem] sm:w-[18rem] sm:h-[25.5rem] lg:w-[20.5rem] lg:h-[28.5rem] xl:w-[21.5rem] xl:h-[29.5rem]",
        "border border-white/20 cursor-pointer pointer-events-none"
      )}
    >
      {/* Background Image */}
      <img
        src={slide.image}
        alt={slide.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
      />

      {/* Deep gradient overlay for vibrant text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/25 pointer-events-none" />

      {/* Top Bar: Country Badge & Bookmark / Vibe */}
      <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between z-40">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-white border border-white/25 shadow-md">
          <i className="fa-solid fa-location-dot text-amber-400 text-[10px]"></i>
          {slide.country || "Explore"}
        </span>

        <div className="flex items-center gap-1.5">
          {slide.badge && (
            <Badge className="px-2 sm:px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-black shadow-md border-0">
              {slide.badge}
            </Badge>
          )}

          {slide.id && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark?.(slide.id!);
              }}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl pointer-events-auto cursor-pointer ${slide.isSaved
                  ? "bg-white text-rose-600 scale-105"
                  : "bg-white/85 hover:bg-white text-stone-700 hover:text-rose-600 hover:scale-110 active:scale-95"
                }`}
              title={slide.isSaved ? "Remove from Bucket List" : "Save to Bucket List"}
              aria-label="Save to bucket list"
            >
              <i className={`fa-${slide.isSaved ? "solid text-rose-500" : "regular"} fa-heart text-xs`}></i>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Content Area */}
      <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-5 sm:left-5 sm:right-5 text-white text-left z-40">
        {/* Title - Pure bright white with drop shadow */}
        <h3
          style={{ color: "#ffffff" }}
          className="text-base sm:text-xl lg:text-2xl font-bold leading-snug mb-1 drop-shadow-md tracking-tight font-display !text-white text-white"
        >
          {slide.title}
        </h3>

        {/* Detailed Info (Snippet, Budget Badges, CTA Button) - Visible on Center Card */}
        <motion.div
          style={{ opacity: detailsOpacity }}
          className="flex flex-col"
        >
          <p className="text-xs sm:text-sm text-stone-200 line-clamp-2 italic font-serif mb-2 drop-shadow">
            {slide.description}
          </p>

          {/* Quick Metrics Strip */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
            {slide.dailyBudget && (
              <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-amber-300 font-semibold text-[10px] sm:text-[11px] border border-white/15 flex items-center gap-1 shadow-xs">
                <i className="fa-solid fa-wallet text-amber-400 text-[10px]"></i>
                {slide.dailyBudget}
              </span>
            )}

            {slide.idealDays && (
              <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-stone-200 font-medium text-[10px] sm:text-[11px] border border-white/15 flex items-center gap-1 shadow-xs">
                <i className="fa-solid fa-clock text-amber-400 text-[10px]"></i>
                {slide.idealDays}
              </span>
            )}

            {slide.bestSeason && (
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-emerald-300 font-medium text-[10px] sm:text-[11px] border border-white/15 items-center gap-1 shadow-xs">
                <i className="fa-regular fa-calendar-check text-emerald-400 text-[10px]"></i>
                {slide.bestSeason}
              </span>
            )}
          </div>

          {/* Explore Full Guide Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
            className="w-full py-2 sm:py-2.5 px-3.5 rounded-xl bg-white hover:bg-stone-100 text-stone-950 font-bold text-xs sm:text-sm tracking-wide shadow-2xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-98 cursor-pointer pointer-events-auto"
          >
            <span>Explore Traveler Guide</span>
            <i className="fa-solid fa-arrow-right text-xs"></i>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CarouselStacked;
