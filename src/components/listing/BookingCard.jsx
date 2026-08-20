import { useState } from 'react';

function BookingCard({ listing }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [showGuestPicker, setShowGuestPicker] = useState(false);

  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.round(
            (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const subtotal = listing.pricePerNight * (nights || 1);
  const total = subtotal + listing.cleaningFee + listing.serviceFee;

  return (
    <div
      className="bg-white border border-border-light rounded-card shadow-booking p-6 sticky top-24"
      role="complementary"
      aria-label="Booking card"
    >
      {/* Price */}
      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-2xl font-semibold text-ink-primary">
          {listing.currency}{listing.pricePerNight.toLocaleString('en-IN')}
        </span>
        <span className="text-ink-secondary text-base">night</span>
        <div className="ml-auto flex items-center gap-1 text-sm">
          <svg className="w-3.5 h-3.5 fill-ink-primary" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.483-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" />
          </svg>
          <span className="font-semibold text-ink-primary">{listing.rating}</span>
          <span className="text-ink-secondary">({listing.reviewCount})</span>
        </div>
      </div>

      {/* Date pickers */}
      <div className="border border-border-light rounded-lg overflow-hidden mb-3">
        <div className="grid grid-cols-2 divide-x divide-border-light">
          <div className="p-3 hover:bg-surface-gray transition-colors cursor-pointer">
            <label htmlFor="check-in" className="block text-xs font-bold text-ink-primary uppercase tracking-wide cursor-pointer">
              Check-in
            </label>
            <input
              id="check-in"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full text-sm text-ink-secondary mt-0.5 bg-transparent border-none outline-none cursor-pointer"
              placeholder="Add date"
            />
          </div>
          <div className="p-3 hover:bg-surface-gray transition-colors cursor-pointer">
            <label htmlFor="check-out" className="block text-xs font-bold text-ink-primary uppercase tracking-wide cursor-pointer">
              Check-out
            </label>
            <input
              id="check-out"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn}
              className="w-full text-sm text-ink-secondary mt-0.5 bg-transparent border-none outline-none cursor-pointer"
              placeholder="Add date"
            />
          </div>
        </div>

        {/* Guest picker */}
        <div
          className="border-t border-border-light p-3 hover:bg-surface-gray transition-colors cursor-pointer relative"
          onClick={() => setShowGuestPicker(!showGuestPicker)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setShowGuestPicker(!showGuestPicker)}
          aria-expanded={showGuestPicker}
          aria-label="Select number of guests"
        >
          <p className="text-xs font-bold text-ink-primary uppercase tracking-wide">Guests</p>
          <p className="text-sm text-ink-primary mt-0.5">
            {guests} guest{guests !== 1 ? 's' : ''}
          </p>

          {showGuestPicker && (
            <div
              className="absolute left-0 right-0 top-full bg-white border border-border-light rounded-b-lg shadow-card p-4 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-ink-primary text-sm">Adults</p>
                  <p className="text-ink-secondary text-xs">Ages 13 or above</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-8 h-8 rounded-full border border-border-light flex items-center justify-center text-ink-secondary hover:border-ink-secondary transition-colors disabled:opacity-30"
                    disabled={guests <= 1}
                    aria-label="Decrease guests"
                  >
                    −
                  </button>
                  <span className="w-4 text-center text-ink-primary font-medium">{guests}</span>
                  <button
                    onClick={() => setGuests(Math.min(listing.guests, guests + 1))}
                    className="w-8 h-8 rounded-full border border-border-light flex items-center justify-center text-ink-secondary hover:border-ink-secondary transition-colors disabled:opacity-30"
                    disabled={guests >= listing.guests}
                    aria-label="Increase guests"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowGuestPicker(false)}
                className="mt-4 text-sm font-semibold text-ink-primary underline"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Reserve button */}
      <button
        className="w-full py-3.5 rounded-lg font-semibold text-base text-white transition-colors duration-200"
        style={{
          background: 'linear-gradient(to right, #E61E4D 0%, #E31C5F 50%, #D70466 100%)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'linear-gradient(to right, #D70466 0%, #E31C5F 50%, #E61E4D 100%)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'linear-gradient(to right, #E61E4D 0%, #E31C5F 50%, #D70466 100%)')}
        aria-label="Reserve this property"
      >
        Reserve
      </button>

      <p className="text-center text-ink-secondary text-xs mt-3">You won't be charged yet</p>

      {/* Price breakdown */}
      {nights > 0 && (
        <div className="mt-5 flex flex-col gap-4">
          <div className="flex justify-between text-ink-primary text-sm">
            <span className="underline cursor-pointer">
              {listing.currency}{listing.pricePerNight.toLocaleString()} × {nights} night{nights !== 1 ? 's' : ''}
            </span>
            <span>{listing.currency}{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-ink-primary text-sm">
            <span className="underline cursor-pointer">Cleaning fee</span>
            <span>{listing.currency}{listing.cleaningFee.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-ink-primary text-sm">
            <span className="underline cursor-pointer">Airbnb service fee</span>
            <span>{listing.currency}{listing.serviceFee.toLocaleString('en-IN')}</span>
          </div>
          <hr className="border-border-light" />
          <div className="flex justify-between text-ink-primary font-semibold">
            <span>Total before taxes</span>
            <span>{listing.currency}{total.toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingCard;
