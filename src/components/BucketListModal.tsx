import React from "react";
import { type Destination } from "@/data/destinations";

interface BucketListModalProps {
  isOpen: boolean;
  onClose: () => void;
  bucketListIds: string[];
  destinations: Destination[];
  onRemoveItem: (id: string) => void;
  onSelectDestination: (id: string) => void;
}

export const BucketListModal: React.FC<BucketListModalProps> = ({
  isOpen,
  onClose,
  bucketListIds,
  destinations,
  onRemoveItem,
  onSelectDestination,
}) => {
  if (!isOpen) return null;

  const savedDestinations = bucketListIds
    .map((id) => destinations.find((d) => d.id === id))
    .filter((d): d is Destination => Boolean(d));

  return (
    <div className="modal-backdrop active" id="bucketListModal">
      <div className="modal-dialog glass-panel">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="modal-header">
          <span className="modal-tag">
            <i className="fa-solid fa-heart text-danger"></i> SAVED DESTINATIONS
          </span>
          <h3 className="modal-title">My Travel Bucket List</h3>
          <p className="modal-desc">
            Keep track of the destinations in India and worldwide you wish to explore.
          </p>
        </div>

        <div className="bucket-list-content" id="bucketListContainer">
          {savedDestinations.length === 0 ? (
            <div className="empty-bucket-box">
              <i className="fa-regular fa-heart-crack empty-icon"></i>
              <h4>Your bucket list is currently empty</h4>
              <p className="text-muted">
                Explore destinations above and click the heart icon to save your dream expeditions!
              </p>
            </div>
          ) : (
            <div className="bucket-items-list space-y-3">
              {savedDestinations.map((dest) => (
                <div
                  key={dest.id}
                  className="bucket-item glass-panel flex items-center justify-between p-3 rounded-xl gap-3"
                >
                  <div
                    className="flex items-center gap-3 cursor-pointer flex-1"
                    onClick={() => {
                      onClose();
                      onSelectDestination(dest.id);
                    }}
                  >
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-foreground">{dest.name}</h4>
                      <span className="text-xs text-muted-foreground">
                        {dest.country} &bull; {dest.dailyBudgetInr}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="btn btn-outline btn-sm px-2 py-1 text-xs"
                      onClick={() => {
                        onClose();
                        onSelectDestination(dest.id);
                      }}
                    >
                      View
                    </button>
                    <button
                      className="text-red-400 hover:text-red-500 p-1.5 transition-colors"
                      onClick={() => onRemoveItem(dest.id)}
                      title="Remove from bucket list"
                    >
                      <i className="fa-solid fa-trash-can text-sm"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
