import React, { useState, useEffect } from "react";
import { DESTINATIONS, type Destination } from "@/data/destinations";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { DestinationsSection } from "@/components/DestinationsSection";
import { SeasonRadar } from "@/components/SeasonRadar";
import { BudgetCalculator } from "@/components/BudgetCalculator";
import { TravelHacks } from "@/components/TravelHacks";
import { ExpertGuides } from "@/components/ExpertGuides";
import { Footer } from "@/components/Footer";
import { DestinationModal } from "@/components/DestinationModal";
import { BucketListModal } from "@/components/BucketListModal";
import { GuideAdvisoryModal } from "@/components/GuideAdvisoryModal";
import { Toast } from "@/components/Toast";

export const App: React.FC = () => {
  // Global filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [budgetFilter, setBudgetFilter] = useState("all");
  const [vibeFilter, setVibeFilter] = useState("all");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  // Bucket list state with localStorage
  const [bucketList, setBucketList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("wanderlust_bucket");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("wanderlust_bucket", JSON.stringify(bucketList));
    } catch (e) {
      console.error(e);
    }
  }, [bucketList]);

  // Modal states
  const [selectedDestId, setSelectedDestId] = useState<string | null>(null);
  const [isBucketModalOpen, setIsBucketModalOpen] = useState(false);
  const [isAdvisoryModalOpen, setIsAdvisoryModalOpen] = useState(false);
  const [calcSelectedDestId, setCalcSelectedDestId] = useState<string | undefined>(undefined);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleToggleBookmark = (id: string) => {
    const dest = DESTINATIONS.find((d) => d.id === id);
    const destName = dest ? dest.name.split("&")[0].trim() : "Destination";

    setBucketList((prev) => {
      if (prev.includes(id)) {
        showToast(`Removed "${destName}" from Bucket List`);
        return prev.filter((item) => item !== id);
      } else {
        showToast(`Saved "${destName}" to your Bucket List!`);
        return [...prev, id];
      }
    });
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    const el = document.getElementById("destinations");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setRegionFilter("all");
    setBudgetFilter("all");
    setVibeFilter("all");
    setCategory("all");
    setSortBy("popular");
  };

  const handleEstimateTrip = (destId: string) => {
    setSelectedDestId(null);
    setCalcSelectedDestId(destId);
    const el = document.getElementById("budget-calculator");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const selectedDestination: Destination | null =
    selectedDestId ? DESTINATIONS.find((d) => d.id === selectedDestId) || null : null;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header
        bucketCount={bucketList.length}
        onOpenBucketList={() => setIsBucketModalOpen(true)}
      />

      <main className="flex-1">
        <Hero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          regionFilter={regionFilter}
          setRegionFilter={setRegionFilter}
          budgetFilter={budgetFilter}
          setBudgetFilter={setBudgetFilter}
          vibeFilter={vibeFilter}
          setVibeFilter={setVibeFilter}
          onTagClick={handleTagClick}
        />

        {/* DESTINATIONS SECTION WITH INTEGRATED 3D STACKED CAROUSEL */}
        <DestinationsSection
          destinations={DESTINATIONS}
          category={category}
          setCategory={setCategory}
          searchQuery={searchQuery}
          regionFilter={regionFilter}
          budgetFilter={budgetFilter}
          vibeFilter={vibeFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          bucketList={bucketList}
          onToggleBookmark={handleToggleBookmark}
          onSelectDestination={(id) => setSelectedDestId(id)}
          onResetFilters={handleResetFilters}
        />

        <SeasonRadar
          destinations={DESTINATIONS}
          onSelectDestination={(id) => setSelectedDestId(id)}
        />

        <BudgetCalculator
          destinations={DESTINATIONS}
          selectedDestId={calcSelectedDestId}
          onSelectDestination={(id) => setSelectedDestId(id)}
          onToggleBookmark={handleToggleBookmark}
        />

        <TravelHacks />

        <ExpertGuides
          onSelectDestination={(id) => setSelectedDestId(id)}
          onOpenAdvisoryModal={() => setIsAdvisoryModalOpen(true)}
        />
      </main>

      <Footer onSelectDestination={(id) => setSelectedDestId(id)} />

      {/* Modals */}
      <DestinationModal
        destination={selectedDestination}
        isOpen={Boolean(selectedDestId)}
        onClose={() => setSelectedDestId(null)}
        isSaved={Boolean(selectedDestId && bucketList.includes(selectedDestId))}
        onToggleBookmark={handleToggleBookmark}
        onEstimateTrip={handleEstimateTrip}
      />

      <BucketListModal
        isOpen={isBucketModalOpen}
        onClose={() => setIsBucketModalOpen(false)}
        bucketListIds={bucketList}
        destinations={DESTINATIONS}
        onRemoveItem={(id) => handleToggleBookmark(id)}
        onSelectDestination={(id) => setSelectedDestId(id)}
      />

      <GuideAdvisoryModal
        isOpen={isAdvisoryModalOpen}
        onClose={() => setIsAdvisoryModalOpen(false)}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  );
};

export default App;
