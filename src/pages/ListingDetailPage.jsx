import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import propertiesData from '../data/properties.json';
import { toggleWishlist, isInWishlist } from '../api/localStorage';
import UserMenuDropdown from '../components/common/UserMenuDropdown';

const { properties } = propertiesData;

// ─── Helper ────────────────────────────────────────────────────────────────
function StarRating({ rating, size = 14 }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="material-symbols-outlined" style={{ fontSize: size, fontVariationSettings: `'FILL' ${i < full ? 1 : 0}`, color: '#222' }}>
          star
        </span>
      ))}
    </span>
  );
}

// ─── Hero Gallery ──────────────────────────────────────────────────────────
function HeroGallery({ images, title, onShowAll, onSave, saved }) {
  return (
    <div className="mb-6">
      {/* Title + actions */}
      <div className="flex items-start justify-between mb-4">
        <h1 className="text-[26px] font-bold text-gray-900 leading-tight max-w-[70%]">{title}</h1>
        <div className="flex items-center gap-4 mt-1">
          <button className="flex items-center gap-2 text-[14px] font-semibold text-gray-900 hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-[18px]">ios_share</span> Share
          </button>
          <button onClick={onSave} className="flex items-center gap-2 text-[14px] font-semibold text-gray-900 hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: saved ? "'FILL' 1" : "'FILL' 0", color: saved ? '#FF385C' : 'inherit' }}>favorite</span> 
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px] rounded-2xl overflow-hidden relative group">
        <div className="col-span-2 row-span-2">
          <img src={images[0]} alt="Hero" className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity" onClick={onShowAll} />
        </div>
        <div className="col-span-1 row-span-1"><img src={images[1] || images[0]} alt="Img 1" className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity" onClick={onShowAll} /></div>
        <div className="col-span-1 row-span-1"><img src={images[2] || images[0]} alt="Img 2" className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity" onClick={onShowAll} /></div>
        <div className="col-span-1 row-span-1"><img src={images[3] || images[0]} alt="Img 3" className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity" onClick={onShowAll} /></div>
        <div className="col-span-1 row-span-1"><img src={images[4] || images[0]} alt="Img 4" className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity" onClick={onShowAll} /></div>
        <button onClick={onShowAll} className="absolute bottom-4 right-4 bg-white border border-gray-900 px-4 py-1.5 rounded-lg text-[13px] font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
          <span className="material-symbols-outlined text-[16px]">apps</span> Show all photos
        </button>
      </div>
    </div>
  );
}

function SubNavbar({ property, onReserve }) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isSticky) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 animate-in slide-in-from-top-4">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <div className="flex gap-6 text-[14px] font-semibold">
          <a href="#photos" className="text-gray-900 border-b-2 border-gray-900 py-7">Photos</a>
          <a href="#amenities" className="text-gray-500 hover:text-gray-900 py-7 transition-colors">Amenities</a>
          <a href="#reviews" className="text-gray-500 hover:text-gray-900 py-7 transition-colors">Reviews</a>
          <a href="#location" className="text-gray-500 hover:text-gray-900 py-7 transition-colors">Location</a>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <p className="font-bold text-[15px] text-gray-900">{property.price} <span className="font-normal text-[13px]">night</span></p>
            <div className="flex items-center gap-1 text-[11px] text-gray-900">
              <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-bold">{property.rating}</span>
              <span className="text-gray-500">· <a href="#reviews" className="underline">{property.reviewCount} reviews</a></span>
            </div>
          </div>
          <button onClick={onReserve} className="bg-gradient-to-r from-[#E61E4D] to-[#D70466] text-white px-6 py-3 rounded-lg font-bold text-[15px] hover:opacity-95 transition-opacity">
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}

function BookingCard({ property }) {
  return (
    <div className="sticky top-28 bg-white border border-gray-200 rounded-xl p-6 shadow-xl" id="booking-card">
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-[22px] font-bold text-gray-900">{property.price}</span>
          <span className="text-[16px] text-gray-500"> night</span>
        </div>
      </div>
      <div className="border border-gray-400 rounded-lg mb-4 flex flex-col">
        <div className="flex border-b border-gray-400">
          <div className="flex-1 p-3 border-r border-gray-400">
            <p className="text-[10px] font-bold text-gray-900 uppercase">Check-in</p>
            <p className="text-[14px] text-gray-500 mt-1">Add date</p>
          </div>
          <div className="flex-1 p-3">
            <p className="text-[10px] font-bold text-gray-900 uppercase">Checkout</p>
            <p className="text-[14px] text-gray-500 mt-1">Add date</p>
          </div>
        </div>
        <div className="p-3">
          <p className="text-[10px] font-bold text-gray-900 uppercase">Guests</p>
          <p className="text-[14px] text-gray-900 mt-1">1 guest</p>
        </div>
      </div>
      <button className="w-full bg-gradient-to-r from-[#E61E4D] to-[#D70466] text-white py-3.5 rounded-lg font-bold text-[16px] hover:opacity-95 transition-opacity mb-4">
        Reserve
      </button>
      <p className="text-center text-[14px] text-gray-500 mb-6">You won't be charged yet</p>
      
      <div className="flex flex-col gap-4 text-[15px] text-gray-600 mb-6 border-b border-gray-200 pb-6">
        <div className="flex justify-between"><span>{property.price} x 5 nights</span><span>{property.price}</span></div>
        <div className="flex justify-between"><span>Cleaning fee</span><span>₹1,200</span></div>
        <div className="flex justify-between"><span>Airbnb service fee</span><span>₹3,400</span></div>
      </div>
      <div className="flex justify-between font-bold text-[16px] text-gray-900">
        <span>Total before taxes</span>
        <span>₹42,000</span>
      </div>
    </div>
  );
}

function PhotoTourOverlay({ images, title, onClose }) {
  return (
    <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
      <div className="sticky top-0 bg-white px-6 py-4 flex items-center justify-between border-b border-gray-200 z-10">
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center">
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
        <div className="flex gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><span className="material-symbols-outlined text-[20px]">ios_share</span></button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><span className="material-symbols-outlined text-[20px]">favorite</span></button>
        </div>
      </div>
      <div className="max-w-[760px] mx-auto py-12 px-6 flex flex-col gap-4">
        {images.map((img, i) => (
          <img key={i} src={img} alt={`Tour ${i}`} className="w-full rounded-lg" loading="lazy" />
        ))}
      </div>
    </div>
  );
}

export default function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, showAuthModal, logout } = useAuth();
  
  const [property, setProperty] = useState(null);
  const [photoTourOpen, setPhotoTourOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const found = properties.find(p => p.id === parseInt(id));
    if (found) {
      setProperty(found);
      setSaved(isInWishlist(found.id));
      window.scrollTo(0, 0);
    } else {
      navigate('/search');
    }
  }, [id, navigate]);

  const handleSaveClick = () => {
    if (!currentUser) {
      showAuthModal(() => {
        const isNowSaved = toggleWishlist(property.id);
        setSaved(isNowSaved);
      });
    } else {
      const isNowSaved = toggleWishlist(property.id);
      setSaved(isNowSaved);
    }
  };

  if (!property) return null;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* ── HEADER ─── */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-1.5 text-[#FF385C]" aria-label="Airbnb">
            <img src="https://1000logos.net/wp-content/uploads/2017/08/Airbnb-Logo.png" alt="Airbnb" className="h-8 object-contain" />
            <span className="font-bold text-[20px] hidden lg:block tracking-tight">airbnb</span>
          </Link>
          <div className="flex-1 flex justify-center">
            <div className="border border-gray-300 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-shadow flex items-center divide-x divide-gray-300 cursor-pointer" onClick={() => navigate('/search')}>
              <span className="px-3 text-[14px] font-semibold text-gray-900">Anywhere</span>
              <span className="px-3 text-[14px] font-semibold text-gray-900">Any week</span>
              <span className="px-3 text-[14px] text-gray-500 flex items-center gap-2">
                Add guests
                <div className="bg-[#FF385C] rounded-full p-1.5 text-white ml-2 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[14px] font-bold">search</span>
                </div>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/host/get-started" className="hidden md:block text-[14px] font-semibold text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full transition-colors">
              Airbnb your home
            </Link>
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors" aria-label="Language">
              <span className="material-symbols-outlined text-gray-700">language</span>
            </button>
            <UserMenuDropdown />
          </div>
        </div>
      </nav>

      {/* ── STICKY SUB-NAV ─── */}
      <SubNavbar property={property} onReserve={() => document.getElementById('booking-card')?.scrollIntoView({ behavior: 'smooth' })} />

      {/* ── MAIN CONTENT ─── */}
      <main className="max-w-[1280px] mx-auto px-6 lg:px-10 py-6" id="photos">
        {/* Gallery */}
        <HeroGallery images={property.images} title={property.title} onShowAll={() => setPhotoTourOpen(true)} onSave={handleSaveClick} saved={saved} />

        {/* Two-column layout */}
        <div className="grid gap-12" style={{ gridTemplateColumns: '1fr 380px', alignItems: 'start' }}>
          {/* ── LEFT ── */}
          <div className="min-w-0">
            {/* Property subtitle */}
            <p className="text-[18px] font-semibold text-gray-900 mb-1">{property.subtitle}</p>
            <p className="text-[15px] text-gray-500 mb-6">
              {property.guests} guests · {property.bedrooms} bedrooms · {property.beds} beds · {property.bathrooms} bathrooms
            </p>

            {/* Guest favourite + rating */}
            <div className="flex items-center gap-4 border border-gray-200 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-[24px]">🏅</span>
                <div>
                  <p className="text-[12px] font-bold text-gray-900">Guest</p>
                  <p className="text-[12px] font-bold text-gray-900">favourite</p>
                </div>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <p className="text-[13px] text-gray-600 flex-1">One of the most loved homes on Airbnb, according to guests</p>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <p className="text-[22px] font-bold text-gray-900">{property.rating}</p>
                <StarRating rating={property.rating} />
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <p className="text-[22px] font-bold text-gray-900">{property.reviewCount}</p>
                <p className="text-[12px] text-gray-500">Reviews</p>
              </div>
            </div>

            <hr className="border-gray-200 mb-6" />

            {/* Host */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <img src={property.host.avatar} alt={property.host.name} className="w-14 h-14 rounded-full object-cover" />
                {property.host.superhost && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  </div>
                )}
              </div>
              <div>
                <p className="text-[16px] font-bold text-gray-900">Hosted by {property.host.name}</p>
                <p className="text-[13px] text-gray-500">{property.host.yearsHosting} years hosting</p>
              </div>
            </div>

            <hr className="border-gray-200 mb-6" />

            {/* Highlights */}
            <div className="flex flex-col gap-5 mb-6">
              {property.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-[24px] text-gray-700 mt-0.5">{h.icon}</span>
                  <div>
                    <p className="text-[15px] font-semibold text-gray-900">{h.title}</p>
                    <p className="text-[13px] text-gray-500">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-gray-200 mb-6" />

            {/* Description */}
            <div className="mb-6">
              <p className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-line">{property.description}</p>
              <button className="mt-3 flex items-center gap-1 text-[14px] font-bold text-gray-900 underline">
                Show more <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>

            <hr className="border-gray-200" />

            {/* Sleeping rooms */}
            <SleepingRooms rooms={property.sleepingRooms} />

            <hr className="border-gray-200" />

            {/* Amenities */}
            <AmenitiesSection amenities={property.amenities} total={property.totalAmenities} />

            <hr className="border-gray-200" />

            {/* Calendar */}
            <DatePicker property={property} />

            <hr className="border-gray-200" />

            {/* Reviews */}
            <ReviewsSection property={property} />

            <hr className="border-gray-200" />

            {/* Map */}
            <MapSection property={property} />

            <hr className="border-gray-200" />

            {/* Meet your host */}
            <div className="py-8">
              <h2 className="text-[22px] font-bold text-gray-900 mb-6">Meet your host</h2>
              <div className="border border-gray-200 rounded-2xl p-6 flex gap-6">
                <div className="flex flex-col items-center gap-2">
                  <img src={property.host.avatar} alt={property.host.name} className="w-20 h-20 rounded-full object-cover" />
                  <p className="text-[16px] font-bold text-gray-900 text-center">{property.host.name}</p>
                  {property.host.superhost && <span className="text-[12px] font-semibold text-gray-500">Superhost</span>}
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div><p className="font-bold text-[16px] text-gray-900">{property.reviewCount}</p><p className="text-[12px] text-gray-500">Reviews</p></div>
                    <div><p className="font-bold text-[16px] text-gray-900">{property.rating}</p><p className="text-[12px] text-gray-500">Rating</p></div>
                    <div><p className="font-bold text-[16px] text-gray-900">{property.host.yearsHosting}</p><p className="text-[12px] text-gray-500">Years hosting</p></div>
                  </div>
                  <p className="text-[14px] text-gray-600 leading-relaxed mb-4">{property.host.about}</p>
                  <div className="flex gap-4 text-[13px] text-gray-600">
                    <span><span className="font-semibold text-gray-900">Response rate:</span> {property.host.responseRate}</span>
                    <span><span className="font-semibold text-gray-900">Responds:</span> {property.host.responseTime}</span>
                  </div>
                  <button className="mt-4 px-5 py-3 border border-gray-900 rounded-xl text-[14px] font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                    Message Host
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Booking Card ── */}
          <div>
            <BookingCard property={property} />
          </div>
        </div>
      </main>

      {/* Photo Tour */}
      {photoTourOpen && (
        <PhotoTourOverlay images={property.images} title={property.title} onClose={() => setPhotoTourOpen(false)} />
      )}
    </div>
  );
}

