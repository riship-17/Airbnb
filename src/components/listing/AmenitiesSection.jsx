import { useState } from 'react';

function AmenitiesSection({ amenities }) {
  const [showAll, setShowAll] = useState(false);
  const visibleAmenities = showAll ? amenities : amenities.slice(0, 6);

  return (
    <div className="py-8">
      <h2 className="text-xl font-semibold text-ink-primary mb-6">What this place offers</h2>
      <div className="grid grid-cols-2 gap-x-8 gap-y-1">
        {visibleAmenities.map((amenity) => (
          <div key={amenity.id} className="amenity-item">
            <span className="material-symbols-outlined text-ink-primary text-2xl" aria-hidden="true">
              {amenity.icon}
            </span>
            <span className="text-ink-primary text-base">{amenity.label}</span>
          </div>
        ))}
      </div>

      {amenities.length > 6 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-6 px-5 py-3 border border-ink-primary rounded-lg text-sm font-semibold text-ink-primary hover:bg-surface-gray transition-colors duration-200"
          aria-expanded={showAll}
        >
          {showAll ? 'Show less' : `Show all ${amenities.length} amenities`}
        </button>
      )}
    </div>
  );
}

export default AmenitiesSection;
