import { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

function ListingHeader({ listing }) {
  const [isSaved, setIsSaved] = useLocalStorage(`saved-${listing.id}`, false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: listing.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h1
          className="text-2xl font-semibold text-ink-primary leading-tight"
          style={{ fontSize: '26px' }}
        >
          {listing.title}
        </h1>
        <div className="flex items-center gap-3 mt-2 text-sm flex-wrap">
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 fill-ink-primary" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.483-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" />
            </svg>
            <span className="font-semibold text-ink-primary">{listing.rating}</span>
          </div>
          <span className="text-ink-primary underline cursor-pointer hover:text-ink-primary/80 transition-colors">
            {listing.reviewCount} reviews
          </span>
          {listing.superhost && (
            <>
              <span className="text-ink-secondary">·</span>
              <span className="flex items-center gap-1 text-ink-primary font-medium">
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 0L9.79 5.52H15.6L10.9 8.98L12.7 14.5L8 11.04L3.3 14.5L5.1 8.98L0.4 5.52H6.21L8 0Z" fill="currentColor"/>
                </svg>
                Superhost
              </span>
            </>
          )}
          <span className="text-ink-secondary">·</span>
          <span className="text-ink-primary underline cursor-pointer hover:text-ink-primary/80 transition-colors">
            {listing.location.city}, {listing.location.state}, {listing.location.country}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-gray transition-colors text-sm font-medium text-ink-primary underline"
          aria-label="Share listing"
        >
          <svg className="w-4 h-4" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9M22 11l-6-6-6 6M16 5v16" />
          </svg>
          Share
        </button>
        <button
          onClick={() => setIsSaved(!isSaved)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-gray transition-colors text-sm font-medium text-ink-primary underline"
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-pressed={isSaved}
        >
          <svg
            className="w-4 h-4 transition-colors duration-200"
            viewBox="0 0 32 32"
            fill={isSaved ? '#FF385C' : 'none'}
            stroke={isSaved ? '#FF385C' : 'currentColor'}
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M16 28c7-4.73 14-10 14-17a6 6 0 0 0-12 0 6 6 0 0 0-12 0c0 7 7 12.27 10 17z" />
          </svg>
          Save
        </button>
      </div>
    </div>
  );
}

export default ListingHeader;
