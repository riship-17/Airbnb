import { useEffect, useRef } from 'react';

function PhotoTourOverlay({ images, listing, onClose, onImageClick }) {
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Esc key to close
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Focus trap
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const focusable = overlay.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trapFocus = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    overlay.addEventListener('keydown', trapFocus);
    return () => overlay.removeEventListener('keydown', trapFocus);
  }, []);

  return (
    <div
      ref={overlayRef}
      className="photo-tour-overlay fixed inset-0 bg-white z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo tour of ${listing.title}`}
    >
      {/* Sticky header */}
      <div className="sticky top-0 bg-white border-b border-border-light z-10 px-20 py-4 flex items-center">
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="flex items-center gap-2 text-sm font-semibold text-ink-primary hover:bg-surface-gray rounded-lg px-3 py-2 transition-colors duration-200"
          aria-label="Close photo tour"
        >
          <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
            <line x1="7" y1="7" x2="25" y2="25" />
            <line x1="7" y1="25" x2="25" y2="7" />
          </svg>
          <span>Close</span>
        </button>
        <div className="ml-6">
          <p className="text-sm font-semibold text-ink-primary">{listing.title}</p>
          <p className="text-xs text-ink-secondary">{images.length} photos</p>
        </div>
      </div>

      {/* Photo grid */}
      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-4">
        {images.map((image, index) => (
          <button
            key={image.id}
            className="w-full cursor-pointer rounded-gallery overflow-hidden border-0 p-0 bg-transparent group focus-visible:ring-2 focus-visible:ring-ink-primary"
            onClick={() => onImageClick(index)}
            aria-label={`View photo ${index + 1}: ${image.alt}`}
          >
            <div className="relative w-full overflow-hidden rounded-gallery" style={{ aspectRatio: '4/3' }}>
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                loading={index < 3 ? 'eager' : 'lazy'}
              />
              {/* Photo number overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-end justify-start p-4">
                <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 px-2 py-0.5 rounded">
                  {index + 1} / {images.length}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default PhotoTourOverlay;
