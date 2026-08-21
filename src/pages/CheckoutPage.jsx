import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import propertiesData from '../data/properties.json';
import { addTrip } from '../api/localStorage';

const { properties } = propertiesData;

export default function CheckoutPage() {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const property = properties.find(p => p.id === parseInt(listingId)) || properties[0];

  const [paying, setPaying] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const nights = property.nights || 2;
  const pricePerNight = property.pricePerNight || 5000;
  const subtotal = pricePerNight * nights;
  const discount = Math.round(subtotal * 0.044); // last-minute ~4.4% discount
  const taxes = Math.round((subtotal - discount) * 0.044);
  const total = subtotal - discount + taxes;

  const fmt = (n) => `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

  const handlePay = async () => {
    if (!agreed) return;
    setPaying(true);
    await new Promise(r => setTimeout(r, 1800));
    const bookingId = Math.random().toString(36).substring(2, 9).toUpperCase();
    addTrip({ id: bookingId, property, dates: `${property.checkIn} – ${property.checkOut}` });
    navigate(`/booking-confirmation/${bookingId}`);
  };

  const hostImg = typeof property.host === 'object' ? property.host.avatar : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80';

  return (
    <div className="min-h-screen bg-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-[1100px] mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Back"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 13L5 8l5-5" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-[20px] font-bold text-gray-900">Confirm and pay</h1>
        </div>
      </nav>

      <main className="max-w-[1100px] mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-12 items-start">

        {/* ── Left: Payment ── */}
        <div>
          {/* Proceed section */}
          <div className="mb-8">
            <h2 className="text-[22px] font-bold text-gray-900 mb-1">Proceed to payment</h2>
            <p className="text-[14px] text-gray-500">You'll be directed to Razorpay to complete payment.</p>
          </div>

          {/* Razorpay info box */}
          <div className="border border-gray-200 rounded-2xl p-5 mb-8 flex items-center gap-4 bg-gray-50">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src="https://razorpay.com/favicon.png"
                alt="Razorpay"
                className="w-full h-full object-contain"
                onError={(e) => { e.target.style.display='none'; }}
              />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-gray-900">Secure payment via Razorpay</p>
              <p className="text-[13px] text-gray-500">Cards, UPI, Net Banking, Wallets accepted</p>
            </div>
            <div className="ml-auto flex gap-2">
              {['visa', 'mastercard', 'upi', 'gpay'].map(m => (
                <div key={m} className="bg-white border border-gray-200 rounded px-2 py-1 text-[10px] font-bold text-gray-600 uppercase">{m}</div>
              ))}
            </div>
          </div>

          {/* Agreement */}
          <div className="mb-8">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded accent-[#FF385C] cursor-pointer flex-shrink-0"
              />
              <span className="text-[13px] text-gray-500 leading-relaxed">
                By selecting the button, I agree to the{' '}
                <button className="underline text-gray-900 font-medium">booking terms</button>,{' '}
                <button className="underline text-gray-900 font-medium">ground rules</button>, and{' '}
                Airbnb's{' '}
                <button className="underline text-gray-900 font-medium">Terms of Service</button>.
              </span>
            </label>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePay}
            disabled={!agreed || paying}
            className={`w-full py-4 rounded-xl text-white text-[16px] font-bold transition-all duration-200 ${
              agreed && !paying
                ? 'bg-gradient-to-r from-[#FF385C] to-[#E31C5F] hover:opacity-90 active:scale-[0.99]'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {paying ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Processing payment…
              </span>
            ) : 'Confirm and pay'}
          </button>

          <p className="text-[12px] text-gray-400 text-center mt-4">
            Your payment is protected by Razorpay's secure encryption.
          </p>
        </div>

        {/* ── Right: Property card ── */}
        <div className="sticky top-24">
          {/* Rare find banner */}
          <div className="bg-rose-50 border border-rose-100 rounded-2xl px-4 py-3 flex items-center gap-3 mb-5">
            <span className="text-[18px]">💎</span>
            <p className="text-[13px] text-gray-700 font-medium">Rare find! This place is usually booked.</p>
          </div>

          {/* Card */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Property summary */}
            <div className="p-5 flex gap-4 border-b border-gray-100">
              <img
                src={property.images?.[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&q=80'}
                alt={property.title}
                className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-[12px] text-gray-500 truncate">{property.type || 'Entire apartment'}</p>
                <p className="text-[14px] font-semibold text-gray-900 leading-tight mt-0.5 line-clamp-2">{property.title}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1", color: '#222' }}>star</span>
                    <span className="text-[13px] font-semibold">{property.rating}</span>
                    <span className="text-[13px] text-gray-400">({property.reviewCount})</span>
                  </div>
                  {property.badge && (
                    <>
                      <span className="text-gray-300">·</span>
                      <div className="flex items-center gap-1">
                        <img
                          src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/059619e1-1751-42dd-84e4-50881483571a.png?im_w=120"
                          alt="Guest favourite"
                          className="h-4 w-auto object-contain"
                        />
                        <span className="text-[12px] font-medium text-gray-700">Guest favourite</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="p-5 space-y-5">
              {/* Free cancellation */}
              <div>
                <p className="text-[15px] font-semibold text-gray-900 mb-1">Free cancellation</p>
                <p className="text-[13px] text-gray-500">
                  Cancel before {property.freeCancellationDate} for a full refund.{' '}
                  <button className="underline font-medium text-gray-900">Full policy</button>
                </p>
              </div>

              <hr className="border-gray-100" />

              {/* Dates */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-semibold text-gray-900">Dates</p>
                  <p className="text-[13px] text-gray-500 mt-0.5">
                    {property.checkIn} – {property.checkOut}
                  </p>
                </div>
                <button className="text-[13px] font-semibold text-gray-900 underline hover:no-underline">Change</button>
              </div>

              {/* Guests */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-semibold text-gray-900">Guests</p>
                  <p className="text-[13px] text-gray-500 mt-0.5">1 adult</p>
                </div>
                <button className="text-[13px] font-semibold text-gray-900 underline hover:no-underline">Change</button>
              </div>

              <hr className="border-gray-100" />

              {/* Price details */}
              <div>
                <p className="text-[16px] font-bold text-gray-900 mb-4">Price details</p>
                <div className="space-y-2.5">
                  <div className="flex justify-between text-[14px] text-gray-700">
                    <span>{nights} nights × {fmt(pricePerNight)}</span>
                    <span>{fmt(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[14px]">
                    <span className="text-gray-700">Last-minute discount</span>
                    <span className="text-[#008a05] font-medium">-{fmt(discount)}</span>
                  </div>
                  <div className="flex justify-between text-[14px] text-gray-700">
                    <span>Taxes</span>
                    <span>{fmt(taxes)}</span>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Total */}
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[15px] font-bold text-gray-900">Total</span>
                  <span className="text-[13px] text-gray-500 ml-1">INR</span>
                </div>
                <span className="text-[15px] font-bold text-gray-900">{fmt(total)}</span>
              </div>

              <button className="text-[13px] font-semibold text-gray-900 underline hover:no-underline">
                Price breakdown
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
