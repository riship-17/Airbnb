function HeroGallery({ images, onShowAll, onImageClick }) {
  const displayImages = images.slice(0, 5);

  return (
    <div
      className="relative w-full rounded-gallery overflow-hidden mb-8"
      style={{ height: '480px' }}
      role="region"
      aria-label="Property photos"
    >
      {/* Grid layout: 1 large left + 2x2 grid right */}
      <div className="grid h-full gap-2" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr' }}>
        {/* Large image (spans 2 rows) */}
        <button
          className="gallery-img-wrap relative row-span-2 cursor-pointer border-0 p-0 bg-transparent"
          onClick={() => onImageClick(0)}
          aria-label={`View photo 1: ${displayImages[0]?.alt}`}
          style={{ borderRadius: '12px 0 0 12px' }}
        >
          <img
            src={displayImages[0]?.url}
            alt={displayImages[0]?.alt}
            className="w-full h-full object-cover"
            style={{ borderRadius: '12px 0 0 12px' }}
          />
        </button>

        {/* 2×2 grid on the right */}
        {displayImages.slice(1, 5).map((img, i) => {
          const isTopRight = i === 1;
          const isBottomRight = i === 3;
          const borderRadius = isTopRight
            ? '0 12px 0 0'
            : isBottomRight
            ? '0 0 12px 0'
            : '0';

          return (
            <button
              key={img.id}
              className="gallery-img-wrap relative cursor-pointer border-0 p-0 bg-transparent"
              onClick={() => onImageClick(i + 1)}
              aria-label={`View photo ${i + 2}: ${img.alt}`}
              style={{ borderRadius }}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover"
                style={{ borderRadius }}
              />
            </button>
          );
        })}
      </div>

      {/* Show all photos button */}
      <button
        onClick={onShowAll}
        className="absolute bottom-4 right-4 flex items-center gap-2 bg-white border border-ink-primary text-ink-primary font-semibold text-sm px-4 py-2 rounded-lg hover:bg-surface-gray transition-colors duration-200 shadow-sm"
        aria-label="Show all photos"
      >
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <rect x="1" y="1" width="5" height="5" rx="0.5" />
          <rect x="10" y="1" width="5" height="5" rx="0.5" />
          <rect x="1" y="10" width="5" height="5" rx="0.5" />
          <rect x="10" y="10" width="5" height="5" rx="0.5" />
        </svg>
        Show all photos
      </button>
    </div>
  );
}

export default HeroGallery;
