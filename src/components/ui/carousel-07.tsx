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

const getCarouselConfig = (width: number): CarouselConfig => {
  if (width < 640) {
    return {
      distanceDivisor: 120,
      velocityDivisor: 500,
      sensitivity: 180,
      xMultiplier: 105,
      yMultiplier: 20,
      rotationMultiplier: 8,
      scaleReduction: 0.06,
    };
  }
  if (width < 1024) {
    return {
      distanceDivisor: 160,
      velocityDivisor: 650,
      sensitivity: 220,
      xMultiplier: 155,
      yMultiplier: 32,
      rotationMultiplier: 9,
      scaleReduction: 0.08,
    };
  }
  return {
    distanceDivisor: 210,
    velocityDivisor: 820,
    sensitivity: 260,
    xMultiplier: 210,
    yMultiplier: 42,
    rotationMultiplier: 11,
    scaleReduction: 0.1,
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
      stiffness: 200,
      damping: 30,
      mass: 1,
    });
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (total <= 1) return;
    const cur = Math.round(scrollProgress.get());
    animate(scrollProgress, cur - 1, {
      type: "spring",
      stiffness: 220,
      damping: 28,
      mass: 1,
    });
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (total <= 1) return;
    const cur = Math.round(scrollProgress.get());
    animate(scrollProgress, cur + 1, {
      type: "spring",
      stiffness: 220,
      damping: 28,
      mass: 1,
    });
  };

  if (total === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full py-4 lg:py-8 overflow-hidden select-none relative",
        className
      )}
    >
      <div className="relative w-full max-w-7xl h-[28rem] sm:h-[32rem] lg:h-[35rem] xl:h-[37rem] flex items-center justify-center">
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

        {/* Previous Button */}
        {total > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 lg:left-12 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 hover:bg-white text-stone-800 shadow-xl border border-stone-200/80 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto"
            aria-label="Previous destination"
            title="Previous destination"
          >
            <i className="fa-solid fa-chevron-left text-sm sm:text-base"></i>
          </button>
        )}

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

        {/* Next Button */}
        {total > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 sm:right-6 lg:right-12 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 hover:bg-white text-stone-800 shadow-xl border border-stone-200/80 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer pointer-events-auto"
            aria-label="Next destination"
            title="Next destination"
          >
            <i className="fa-solid fa-chevron-right text-sm sm:text-base"></i>
          </button>
        )}
      </div>

      {/* Footer Info & Active Counter */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl mt-3 px-4 gap-2 text-xs sm:text-sm text-stone-600">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-200/90 font-semibold text-stone-800 shadow-xs">
            <i className="fa-solid fa-compass text-amber-600"></i>
            Guide {activeIndex + 1} of {total}
          </span>
          <span className="hidden sm:inline text-stone-400">&bull;</span>
          <span className="hidden sm:inline font-medium text-stone-600 truncate max-w-xs">
            {slides[activeIndex]?.title}
          </span>
        </div>

        <div className="flex items-center gap-2 text-stone-500 font-medium text-xs">
          <span className="inline-block animate-pulse">←</span>
          <span>Swipe, drag or click arrows to browse</span>
          <span className="inline-block animate-pulse">→</span>
        </div>
      </div>

      {/* Pagination Dots */}
      {total > 1 && total <= 16 && (
        <div className="flex items-center justify-center gap-1.5 mt-3">
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
                  stiffness: 220,
                  damping: 28,
                });
              }}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                i === activeIndex
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
  
  // Safe opacity calculation for any total
  const opacity = useTransform(offset, (o) => {
    if (total <= 1) return 1;
    const absO = Math.abs(o);
    const maxOffset = total / 2;
    if (absO >= maxOffset) return 0;
    if (absO >= maxOffset - 0.5) return (maxOffset - absO) / 0.5;
    return 1;
  });

  const zIndex = useTransform(offset, (o) =>
    Math.round(100 - Math.abs(o) * 10),
  );

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
        "w-64 h-[24rem] sm:w-[20rem] sm:h-[27.5rem] lg:w-[23.5rem] lg:h-[31.5rem] xl:w-[25rem] xl:h-[33rem]",
        "border border-white/15 cursor-pointer pointer-events-none"
      )}
    >
      <img
        src={slide.image}
        alt={slide.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/25 pointer-events-none" />

      {/* Top Bar: Country Badge & Bookmark / Vibe */}
      <div className="absolute top-3.5 left-3.5 right-3.5 sm:top-5 sm:left-5 sm:right-5 flex items-center justify-between z-40">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/65 backdrop-blur-md text-white border border-white/20 shadow-md">
          <i className="fa-solid fa-location-dot text-amber-400 text-xs"></i>
          {slide.country || "Explore"}
        </span>

        <div className="flex items-center gap-2">
          {slide.badge && (
            <Badge className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-wider text-black shadow-md border-0">
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
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl pointer-events-auto cursor-pointer ${
                slide.isSaved
                  ? "bg-white text-rose-600 scale-105"
                  : "bg-white/85 hover:bg-white text-stone-700 hover:text-rose-600 hover:scale-110 active:scale-95"
              }`}
              title={slide.isSaved ? "Remove from Bucket List" : "Save to Bucket List"}
              aria-label="Save to bucket list"
            >
              <i className={`fa-${slide.isSaved ? "solid text-rose-500" : "regular"} fa-heart text-xs sm:text-sm`}></i>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Content: Title, Tagline, Metrics & Action */}
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white text-left z-40">
        <h3 className="text-lg sm:text-2xl font-bold leading-tight mb-1 drop-shadow-md tracking-tight font-display">
          {slide.title}
        </h3>

        <p className="text-xs sm:text-sm text-stone-200/90 line-clamp-2 italic font-serif mb-2.5 drop-shadow">
          {slide.description}
        </p>

        {/* Quick Metrics Strip */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3">
          {slide.dailyBudget && (
            <span className="px-2.5 py-1 rounded-md bg-black/65 backdrop-blur-md text-amber-300 font-semibold text-[11px] sm:text-xs border border-white/10 flex items-center gap-1.5 shadow-xs">
              <i className="fa-solid fa-wallet text-amber-400"></i>
              {slide.dailyBudget}
            </span>
          )}

          {slide.idealDays && (
            <span className="px-2.5 py-1 rounded-md bg-black/65 backdrop-blur-md text-stone-200 font-medium text-[11px] sm:text-xs border border-white/10 flex items-center gap-1.5 shadow-xs">
              <i className="fa-solid fa-clock text-amber-400"></i>
              {slide.idealDays}
            </span>
          )}

          {slide.bestSeason && (
            <span className="hidden sm:inline-flex px-2.5 py-1 rounded-md bg-black/65 backdrop-blur-md text-emerald-300 font-medium text-[11px] sm:text-xs border border-white/10 items-center gap-1.5 shadow-xs">
              <i className="fa-regular fa-calendar-check text-emerald-400"></i>
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
          className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-white hover:bg-stone-100 text-stone-950 font-bold text-xs sm:text-sm tracking-wide shadow-2xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-98 cursor-pointer pointer-events-auto"
        >
          <span>Explore Traveler Guide</span>
          <i className="fa-solid fa-arrow-right text-xs"></i>
        </button>
      </div>
    </motion.div>
  );
};

export default CarouselStacked;
