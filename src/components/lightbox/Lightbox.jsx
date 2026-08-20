import { useEffect, useRef, useCallback } from 'react';
import useLightboxKeyboard from '../../hooks/useLightboxKeyboard';
import useLocalStorage from '../../hooks/useLocalStorage';

function Lightbox({ images, currentIndex, onClose, onNavigate }) {
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);
  const total = images.length;

  const [, setLastViewedIndex] = useLocalStorage('lightbox-last-index', 0);

  // Persist last viewed index
  useEffect(() => {
    setLastViewedIndex(currentIndex);
  }, [currentIndex, setLastViewedIndex]);

  // Clamp navigation (no looping — match reference behavior)
  const handlePrev = useCallback(() => {
    if (currentIndex > 0) onNavigate(currentIndex - 1);
  }, [currentIndex, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < total - 1) onNavigate(currentIndex + 1);
  }, [currentIndex, total, onNavigate]);

  useLightboxKeyboard({ isOpen: true, onPrev: handlePrev, onNext: handleNext, onClose });

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Focus trap
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const focusable = overlay.querySelectorAll(
      'button, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trap = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      }
    };

    overlay.addEventListener('keydown', trap);
    return () => overlay.removeEventListener('keydown', trap);
  }, []);

  const currentImage = images[currentIndex];

  return (
    <div
      ref={overlayRef}
      className="lightbox-overlay fixed inset-0 z-[60] flex flex-col"
      style={{ background: 'rgba(0,0,0,0.97)' }}
      role="dialog"
      aria-modal="true"
      aria-label={`Lightbox: photo ${currentIndex + 1} of ${total}`}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 flex-shrink-0">
        {/* Counter */}
        <span className="text-white/70 text-sm font-medium" aria-live="polite" aria-atomic="true">
          {currentIndex + 1} / {total}
        </span>

        {/* Close */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 text-white"
          aria-label="Close lightbox (return to photo tour)"
        >
          <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
            <line x1="7" y1="7" x2="25" y2="25" />
            <line x1="7" y1="25" x2="25" y2="7" />
          </svg>
        </button>
      </div>

      {/* Main image area */}
      <div className="flex-1 flex items-center justify-center relative min-h-0 px-20">
        {/* Prev button */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute left-6 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 transition-colors duration-200 text-white disabled:opacity-25 disabled:cursor-not-allowed z-10"
          aria-label="Previous photo"
          aria-disabled={currentIndex === 0}
        >
          <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
            <path d="M20 8L12 16L20 24" />
          </svg>
        </button>

        {/* Image */}
        <div className="max-w-4xl w-full h-full flex items-center justify-center">
          <img
            key={currentIndex}
            src={currentImage?.url}
            alt={currentImage?.alt}
            className="max-w-full max-h-full object-contain rounded-lg"
            style={{ animation: 'fadeIn 200ms ease-out' }}
          />
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={currentIndex === total - 1}
          className="absolute right-6 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 transition-colors duration-200 text-white disabled:opacity-25 disabled:cursor-not-allowed z-10"
          aria-label="Next photo"
          aria-disabled={currentIndex === total - 1}
        >
          <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
            <path d="M12 8L20 16L12 24" />
          </svg>
        </button>
      </div>

      {/* Caption */}
      <div className="px-6 py-4 flex-shrink-0 text-center">
        <p className="text-white/60 text-sm">{currentImage?.alt}</p>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 justify-center px-6 pb-6 overflow-x-auto flex-shrink-0">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => onNavigate(i)}
            className={`flex-shrink-0 w-14 h-10 rounded overflow-hidden border-2 transition-all duration-200 ${
              i === currentIndex ? 'border-white opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
            }`}
            aria-label={`Go to photo ${i + 1}: ${img.alt}`}
            aria-current={i === currentIndex ? 'true' : undefined}
          >
            <img src={img.url} alt="" className="w-full h-full object-cover" aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default Lightbox;
