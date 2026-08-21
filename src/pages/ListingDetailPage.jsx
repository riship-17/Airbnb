import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import propertiesData from '../data/properties.json';
import { toggleWishlist, isInWishlist } from '../api/localStorage';
import UserMenuDropdown from '../components/common/UserMenuDropdown';
import DatePickerModal from '../components/common/DatePickerModal';

const { properties } = propertiesData;

const LAUREL_LEFT = 'https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/059619e1-1751-42dd-84e4-50881483571a.png?im_w=120';
const LAUREL_RIGHT = 'https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/33b80859-e87e-4c86-841c-645c786ba4c1.png?im_w=120';

const DEFAULT_HIGHLIGHTS = [
  { icon: 'star', title: 'Highly rated by guests from India', desc: 'The majority of guests from India rated this home 5 stars in the past year.' },
  { icon: 'key', title: 'Self check-in', desc: 'You can check in with the building staff.' },
  { icon: 'door_front', title: 'Room in a apartment', desc: 'Your own room in a home, plus access to shared spaces.' },
];

const DEFAULT_AMENITIES = [
  { icon: 'lock', label: 'Lock on bedroom door' },
  { icon: 'kitchen', label: 'Kitchen' },
  { icon: 'wifi', label: 'Wifi' },
  { icon: 'local_parking', label: 'Free parking on premises' },
  { icon: 'tv', label: 'TV with standard cable/satellite' },
  { icon: 'elevator', label: 'Lift' },
  { icon: 'ac_unit', label: 'Air conditioning' },
  { icon: 'balcony', label: 'Patio or balcony' },
  { icon: 'smoke_free', label: 'Unavailable: Carbon monoxide alarm', unavailable: true },
  { icon: 'smoke_free', label: 'Unavailable: Smoke alarm', unavailable: true },
];

const DEFAULT_REVIEWS = [
  { author: 'Pauline', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80', date: '5 days ago', text: 'Well maintained Place, helpful in all ways, the living room is stunning The bedroom has no window to open and feels a bit stuffy…', rating: 5 },
  { author: '貴洋', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80', date: '6 days ago', text: 'Even though I only speak Japanese, Ms. Seema spoke to me slowly through a translation and gave me recommendations for food and transportation. In the morning, they provide coffee, chai, and cookies. It was a good trip in a safe place.', rating: 5 },
  { author: 'Sanjay', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80', date: '2 weeks ago', text: 'Seema’s place is exactly as per the pics & is so well located in south delhi. The market and eateries are just around the corner. The room was comfy and pawan (caretaker) was helpful. All in all a great stay, I will be back !', rating: 5 },
  { author: 'Kelechi', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80', date: '1 week ago', text: 'A great escape perfectly located in South Delhi with restaurants in walkable distance.', rating: 5 },
  { author: 'Kavita', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80', date: '4 weeks ago', text: 'Wonderful place to stay…very warm and welcoming', rating: 5 },
  { author: 'Manish', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80', date: 'July 2026', text: 'caretaker was good. problem was room doesn\'t have jio network and also internet provided by them was very weak could connect to only 1 device. utube was also slow. room was good, no disturbance, good caretaker, balcony was good too', rating: 4 },
];

function StarFilled({ size = 12 }) {
  return (
    <span className="material-symbols-outlined" style={{ fontSize: size, fontVariationSettings: "'FILL' 1", color: '#222' }}>star</span>
  );
}

function HeroGallery({ images, title, onShowAll, onSave, saved }) {
  const base = 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=85';
  const imgs = (images && images.length >= 5) ? images : [...(images || [base]), ...Array(5).fill(base)].slice(0, 5);
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between mb-4">
        <h1 className="text-[26px] font-bold text-gray-900 leading-tight max-w-[70%]">{title}</h1>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 text-[14px] font-semibold text-gray-900 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-[18px]">ios_share</span> Share
          </button>
          <button onClick={onSave} className="flex items-center gap-2 text-[14px] font-semibold text-gray-900 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: saved ? "'FILL' 1" : "'FILL' 0", color: saved ? '#FF385C' : 'inherit' }}>favorite</span>
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[420px] rounded-2xl overflow-hidden relative cursor-pointer" onClick={onShowAll}>
        <div className="col-span-2 row-span-2 overflow-hidden">
          <img src={imgs[0]} alt="Main" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </div>
        {[imgs[1], imgs[2], imgs[3], imgs[4]].map((img, i) => (
          <div key={i} className="overflow-hidden">
            <img src={img} alt={'Photo ' + (i + 2)} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        ))}
        <button
          onClick={(e) => { e.stopPropagation(); onShowAll(); }}
          className="absolute bottom-4 right-4 bg-white border border-gray-900 px-4 py-1.5 rounded-lg text-[13px] font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-[16px]">apps</span> Show all photos
        </button>
      </div>
    </div>
  );
}

function SubNavbar({ property, onReserve }) {
  const [isSticky, setIsSticky] = useState(false);
  const [active, setActive] = useState('photos');
  useEffect(() => {
    const fn = () => setIsSticky(window.scrollY > 480);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const items = [
    { id: 'photos', label: 'Photos' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'location', label: 'Location' },
  ];
  return (
    <div
      className="bg-white border-b border-gray-200 z-40"
      style={{
        position: 'sticky', top: 0,
        transform: isSticky ? 'translateY(0)' : 'translateY(-100%)',
        opacity: isSticky ? 1 : 0,
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease',
        pointerEvents: isSticky ? 'auto' : 'none',
        marginBottom: isSticky ? 0 : -73,
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
        <div className="flex gap-6 h-full">
          {items.map(item => (
            <a key={item.id} href={'#' + item.id} onClick={() => setActive(item.id)}
              className={'flex items-center text-[14px] font-semibold border-b-2 transition-colors ' + (active === item.id ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900')}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-5">
          <div className="flex flex-col items-end">
            <div className="flex items-baseline gap-1">
              <span className="text-[14px] font-bold text-gray-500 line-through">₹7,691</span>
              <span className="text-[16px] font-bold text-gray-900">₹6,612</span>
            </div>
            <div className="flex items-center gap-1 text-[12px] font-semibold text-gray-900">
              <StarFilled size={10} />
              <span>4.80</span>
              <span className="text-gray-500 font-normal">· <a href="#reviews" className="underline">137 reviews</a></span>
            </div>
          </div>
          <button onClick={onReserve} className="bg-[#E61E4D] text-white px-5 py-2.5 rounded-lg text-[14px] font-semibold hover:bg-[#D70466] transition-colors">
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}

function BookingCard({ property, listingId }) {
  const navigate = useNavigate();
  const { currentUser, showAuthModal } = useAuth();
  
  const [checkIn, setCheckIn] = useState(property.checkIn ? new Date(property.checkIn) : new Date(2026, 8, 4));
  const [checkOut, setCheckOut] = useState(property.checkOut ? new Date(property.checkOut) : new Date(2026, 8, 6));
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  
  // Basic derived values based on dates
  const msInDay = 1000 * 60 * 60 * 24;
  const computedNights = checkIn && checkOut ? Math.round((checkOut - checkIn) / msInDay) : (property.nights || 2);
  const nights = computedNights > 0 ? computedNights : 0;
  
  const pn = property.pricePerNight || 5000;
  const sub = pn * nights;
  const clean = Math.round(pn * 0.15);
  const svc = Math.round(sub * 0.12);
  const total = sub + clean + svc;
  const fmt = n => '₹' + n.toLocaleString('en-IN');
  
  const handleReserve = () => {
    if (!currentUser) showAuthModal(() => navigate('/checkout/' + listingId));
    else navigate('/checkout/' + listingId);
  };
  
  const formatDateStr = (d) => {
    if (!d) return 'Add date';
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  };

  return (
    <div className="sticky top-28 bg-white border border-gray-200 rounded-2xl shadow-xl flex flex-col relative" id="booking-card">
      <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-sm flex items-center gap-2 whitespace-nowrap z-10">
        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1", color: '#E61E4D' }}>diamond</span>
        <span className="text-[14px] font-semibold text-gray-900">Rare find! This place is usually booked</span>
      </div>
      
      <div className="p-6 pb-4">
        <div className="flex items-baseline mb-5">
          <span className="text-[22px] font-bold text-gray-900 line-through text-gray-500 mr-2">₹7,691</span>
          <span className="text-[22px] font-bold text-gray-900 mr-1">₹6,612</span>
          <span className="text-[15px] text-gray-500"> night</span>
        </div>
        
        <div className="border border-gray-400 rounded-xl mb-4 overflow-hidden">
          <div className="flex border-b border-gray-400">
            <div 
              className={`flex-1 p-3 cursor-pointer transition-colors ${isDatePickerOpen ? 'bg-gray-100 shadow-[inset_0_0_0_2px_#222] rounded-l-xl z-10' : 'hover:bg-gray-50'}`}
              onClick={() => setIsDatePickerOpen(true)}
            >
              <p className="text-[10px] font-bold text-gray-900 uppercase tracking-wide">Check-in</p>
              <p className="text-[14px] text-gray-700 mt-0.5">{formatDateStr(checkIn)}</p>
            </div>
            <div className="w-px bg-gray-400" />
            <div 
              className={`flex-1 p-3 cursor-pointer transition-colors ${isDatePickerOpen ? 'bg-gray-100 shadow-[inset_0_0_0_2px_#222] rounded-r-xl z-10' : 'hover:bg-gray-50'}`}
              onClick={() => setIsDatePickerOpen(true)}
            >
              <p className="text-[10px] font-bold text-gray-900 uppercase tracking-wide">Checkout</p>
              <p className="text-[14px] text-gray-700 mt-0.5">{formatDateStr(checkOut)}</p>
            </div>
          </div>
          <div className="p-3 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-gray-900 uppercase tracking-wide">Guests</p>
              <p className="text-[14px] text-gray-700 mt-0.5">1 guest</p>
            </div>
            <span className="material-symbols-outlined text-gray-500 text-[20px]">expand_more</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-[10px] font-bold text-gray-900 uppercase tracking-wide mb-3">Rates</p>
          <div className="border border-gray-400 rounded-xl overflow-hidden divide-y divide-gray-300">
            <label className="flex items-start gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="mt-0.5 text-gray-900 flex-shrink-0">
                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>radio_button_checked</span>
              </div>
              <div>
                <p className="text-[15px] text-gray-900 font-semibold mb-1">Non-refundable · ₹6,611.40 total</p>
                <p className="text-[14px] text-gray-500 leading-snug">Free cancellation for 24 hours. After that, the reservation is non-refundable.</p>
              </div>
            </label>
            <label className="flex items-start gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="mt-0.5 text-gray-400 flex-shrink-0">
                <span className="material-symbols-outlined text-[24px]">radio_button_unchecked</span>
              </div>
              <div>
                <p className="text-[15px] text-gray-900 mb-1">Refundable · ₹7,346.00 total</p>
                <p className="text-[14px] text-gray-500 leading-snug">Free cancellation before 3 September. Cancel before check-in on 4 September for a partial refund.</p>
              </div>
            </label>
          </div>
        </div>

        <button
          onClick={handleReserve}
          className="w-full bg-[#E61E4D] text-white py-3.5 rounded-lg text-[16px] font-semibold hover:bg-[#D70466] transition-colors mb-3"
        >
          Reserve
        </button>
        <p className="text-center text-[14px] text-gray-500">You won't be charged yet</p>
      </div>

      {isDatePickerOpen && (
        <DatePickerModal 
          checkIn={checkIn}
          checkOut={checkOut}
          onChange={(inDate, outDate) => {
            setCheckIn(inDate);
            setCheckOut(outDate);
          }}
          onClose={() => setIsDatePickerOpen(false)}
        />
      )}
    </div>
  );
}

function PhotoTourOverlay({ images, title, onClose }) {
  return (
    <div className="fixed inset-0 bg-white z-[200] overflow-y-auto">
      <div className="sticky top-0 bg-white px-6 py-4 flex items-center justify-between border-b border-gray-200 z-10">
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span className="text-[14px] font-semibold">{title}</span>
        </button>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full"><span className="material-symbols-outlined text-[20px]">ios_share</span></button>
          <button className="p-2 hover:bg-gray-100 rounded-full"><span className="material-symbols-outlined text-[20px]">favorite_border</span></button>
        </div>
      </div>
      <div className="max-w-[760px] mx-auto py-12 px-6 flex flex-col gap-4">
        {images.map((img, i) => (
          <img key={i} src={img} alt={'Photo ' + (i + 1)} className="w-full rounded-xl shadow-sm" loading="lazy" />
        ))}
      </div>
    </div>
  );
}

function AmenitiesSection({ amenities }) {
  const [showAll, setShowAll] = useState(false);
  const items = (amenities && amenities.length) ? amenities : DEFAULT_AMENITIES;
  const visible = showAll ? items : items.slice(0, 10);
  return (
    <div className="py-8" id="amenities">
      <h2 className="text-[22px] font-bold text-gray-900 mb-6">What this place offers</h2>
      <div className="grid grid-cols-2 gap-y-4">
        {visible.map((a, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="material-symbols-outlined text-[22px] text-gray-700">{a.icon}</span>
            <span className={`text-[15px] ${a.unavailable ? 'text-gray-500 line-through' : 'text-gray-700'}`}>{a.label}</span>
          </div>
        ))}
      </div>
      {items.length > 10 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-6 px-5 py-3 border border-gray-900 rounded-xl text-[14px] font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
        >
          {showAll ? 'Show less' : ('Show all ' + items.length + ' amenities')}
        </button>
      )}
    </div>
  );
}

function ReviewsSection({ property }) {
  const reviews = (property.reviews && property.reviews.length) ? property.reviews : DEFAULT_REVIEWS;
  const rating = property.rating || 4.9;
  const reviewCount = property.reviewCount || reviews.length;
  const cats = [
    { label: 'Cleanliness', score: 4.9 },
    { label: 'Accuracy', score: 4.8 },
    { label: 'Check-in', score: 5.0 },
    { label: 'Communication', score: 5.0 },
    { label: 'Location', score: 4.8 },
    { label: 'Value', score: 4.7 },
  ];
  return (
    <div className="py-8" id="reviews">
      <div className="flex items-center gap-2 mb-6">
        <StarFilled size={18} />
        <span className="text-[22px] font-bold text-gray-900">{rating}</span>
        <span className="text-[22px] text-gray-400">·</span>
        <span className="text-[22px] font-bold text-gray-900">{reviewCount} reviews</span>
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-8">
        {cats.map(cat => (
          <div key={cat.label} className="flex items-center justify-between">
            <span className="text-[14px] text-gray-700">{cat.label}</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gray-900 rounded-full" style={{ width: ((cat.score / 5) * 100) + '%' }} />
              </div>
              <span className="text-[13px] font-semibold text-gray-900 w-6 text-right">{cat.score}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        {reviews.slice(0, 6).map((r, i) => {
          const av = typeof r.avatar === 'string' ? r.avatar : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80';
          return (
            <div key={i} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <img src={av} alt={r.author} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-[14px] font-semibold text-gray-900">{r.author}</p>
                  <p className="text-[12px] text-gray-500">{r.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {[...Array(r.rating || 5)].map((_, j) => <StarFilled key={j} size={11} />)}
              </div>
              <p className="text-[14px] text-gray-700 leading-relaxed line-clamp-4">{r.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MapSection({ property }) {
  return (
    <div className="py-8" id="location">
      <h2 className="text-[22px] font-bold text-gray-900 mb-2">Where you'll be</h2>
      <p className="text-[15px] text-gray-700 mb-4">{property.location}</p>
      <div className="w-full h-[320px] rounded-2xl overflow-hidden bg-gray-100">
        <iframe
          title="Map" width="100%" height="100%" loading="lazy"
          style={{ border: 0 }} referrerPolicy="no-referrer-when-downgrade"
          src={'https://maps.google.com/maps?q=' + encodeURIComponent(property.location || property.city || 'India') + '&t=m&z=13&output=embed&iwloc=near'}
        />
      </div>
      <button className="mt-3 text-[14px] font-semibold text-gray-900 underline hover:no-underline">
        Show more about the neighbourhood
      </button>
    </div>
  );
}

export default function ListingDetailPage() {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const { currentUser, showAuthModal } = useAuth();
  const [property, setProperty] = useState(null);
  const [photoTourOpen, setPhotoTourOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showMoreDesc, setShowMoreDesc] = useState(false);
  const bookingRef = useRef(null);

  useEffect(() => {
    const found = properties.find(p => p.id === parseInt(listingId));
    const target = found || properties[0];
    if (target) {
      setProperty(target);
      setSaved(isInWishlist(target.id));
    }
    window.scrollTo(0, 0);
  }, [listingId]);

  const handleSaveClick = () => {
    if (!property) return;
    if (!currentUser) {
      showAuthModal(() => { const s = toggleWishlist(property.id); setSaved(s); });
    } else {
      const s = toggleWishlist(property.id);
      setSaved(s);
    }
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FF385C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const host = {
    name: 'Seema',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    yearsHosting: 7,
    responseRate: '100%',
    responseTime: 'within an hour',
    superhost: true,
    about: 'Working in the garment business currently, lived in Delhi all my life. I like traveling and meeting people. Would love to host people from all around the world.',
  };
  const highlights = DEFAULT_HIGHLIGHTS;
  const description = `My home is a peaceful sanctuary in an otherwise noisy city. It’s spacious, easily accessible & well located. The ensuite private room is well appointed with tasteful interiors - complete with a sitting area & writing desk. Common areas include gorgeous living & dining areas, a fully functional kitchen & huge balcony with potted plants.

Entertainment and recreation in this melting pot South Ex features an eclectic offering of cultural & culinary delights. A perfect base for your time in Delhi!

The space
A charming boutique home located in an elite residential neighbourhood in South Extension II. Accented with contemporary Indian art, stunning artefacts, plush furnishings and antique furniture, the eclectic space is an elegant embodiment of a resplendent Indian abode. It has three bedrooms with ensuite bathrooms, vast living and dining spaces, fully functional kitchen and balcony.`;
  const amenities = DEFAULT_AMENITIES;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex items-center justify-between h-[72px]">
          <Link to="/" className="flex items-center gap-1.5 text-[#FF385C]" aria-label="Airbnb">
            <img src="https://1000logos.net/wp-content/uploads/2017/08/Airbnb-Logo.png" alt="Airbnb" className="h-8 object-contain" />
            <span className="font-bold text-[20px] hidden lg:block tracking-tight">airbnb</span>
          </Link>
          <div
            className="border border-gray-300 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-shadow flex items-center divide-x divide-gray-300 cursor-pointer"
            onClick={() => navigate('/search')}
          >
            <span className="px-3 text-[14px] font-semibold text-gray-900">Anywhere</span>
            <span className="px-3 text-[14px] font-semibold text-gray-900">Any week</span>
            <span className="px-3 text-[14px] text-gray-500 flex items-center gap-2">
              Add guests
              <div className="bg-[#FF385C] rounded-full p-1.5 text-white flex items-center justify-center">
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>search</span>
              </div>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/host/get-started" className="hidden md:block text-[14px] font-semibold text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full transition-colors">
              Airbnb your home
            </Link>
            <UserMenuDropdown />
          </div>
        </div>
      </nav>

      <SubNavbar property={property} onReserve={() => bookingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })} />

      <main className="max-w-[1280px] mx-auto px-6 lg:px-10 py-6" id="photos">
        <HeroGallery
          images={property.images}
          title={property.title}
          onShowAll={() => setPhotoTourOpen(true)}
          onSave={handleSaveClick}
          saved={saved}
        />

        <div className="grid gap-16" style={{ gridTemplateColumns: '1fr 380px', alignItems: 'start' }}>
          <div className="min-w-0">
            <p className="text-[20px] font-semibold text-gray-900 mb-1">Room in New Delhi, India</p>
            <p className="text-[15px] text-gray-500 mb-6">
              1 double bed · Dedicated bathroom
            </p>

            {property.badge === 'Guest favourite' && (
              <div className="flex items-center border border-gray-200 rounded-2xl p-5 mb-8 gap-3 flex-wrap">
                <img src={LAUREL_LEFT} alt="" className="h-14 w-auto object-contain" />
                <div className="flex-1 text-center min-w-[60px]">
                  <p className="text-[18px] font-extrabold text-gray-900">Guest</p>
                  <p className="text-[18px] font-extrabold text-gray-900">favourite</p>
                </div>
                <img src={LAUREL_RIGHT} alt="" className="h-14 w-auto object-contain" />
                <div className="hidden sm:block w-px h-12 bg-gray-200 mx-1" />
                <p className="hidden sm:block text-[13px] text-gray-600 max-w-[130px] leading-snug">
                  One of the most loved homes on Airbnb, according to guests
                </p>
                <div className="hidden sm:block w-px h-12 bg-gray-200 mx-1" />
                <div className="hidden sm:block text-center">
                  <p className="text-[24px] font-extrabold text-gray-900">4.8</p>
                  <StarFilled size={13} />
                </div>
                <div className="hidden sm:block w-px h-12 bg-gray-200 mx-1" />
                <div className="hidden sm:block text-center">
                  <p className="text-[24px] font-extrabold text-gray-900">137</p>
                  <p className="text-[12px] text-gray-500 font-semibold underline">Reviews</p>
                </div>
              </div>
            )}

            <hr className="border-gray-200 mb-6" />

            {/* Host */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-shrink-0">
                <img src={host.avatar} alt={host.name} className="w-12 h-12 rounded-full object-cover" />
                {host.superhost && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-white" style={{ fontSize: 11, fontVariationSettings: "'FILL' 1" }}>star</span>
                  </div>
                )}
              </div>
              <div>
                <p className="text-[16px] font-bold text-gray-900">Hosted by {host.name}</p>
                <p className="text-[13px] text-gray-500">
                  {host.yearsHosting} years hosting
                  {host.superhost && <span className="ml-2 text-[12px] font-semibold bg-gray-100 px-2 py-0.5 rounded-full">Superhost</span>}
                </p>
              </div>
            </div>

            <hr className="border-gray-200 mb-6" />

            {/* Highlights */}
            <div className="flex flex-col gap-5 mb-6">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-[24px] text-gray-700 mt-0.5">{h.icon}</span>
                  <div>
                    <p className="text-[15px] font-semibold text-gray-900">{h.title}</p>
                    <p className="text-[13px] text-gray-500 mt-0.5">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-gray-200 mb-6" />

            {/* Description */}
            <div className="mb-6">
              <p className={'text-[15px] text-gray-700 leading-relaxed whitespace-pre-line ' + (showMoreDesc ? '' : 'line-clamp-[8]')}>
                {description}
              </p>
              <button
                onClick={() => setShowMoreDesc(!showMoreDesc)}
                className="mt-3 flex items-center gap-1 text-[14px] font-bold text-gray-900 underline hover:no-underline"
              >
                {showMoreDesc ? 'Show less' : 'Show more'}
                <span className="material-symbols-outlined text-[16px]">{showMoreDesc ? 'expand_less' : 'chevron_right'}</span>
              </button>
            </div>

            <hr className="border-gray-200" />

            {/* Sleeping rooms */}
            {property.sleepingRooms && property.sleepingRooms.length > 0 && (
              <div className="py-8">
                <h2 className="text-[22px] font-bold text-gray-900 mb-6">Where you'll sleep</h2>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {property.sleepingRooms.map((room, i) => (
                    <div key={i} className="flex-none w-48 border border-gray-200 rounded-xl p-4">
                      <span className="material-symbols-outlined text-[28px] text-gray-700 mb-2">bed</span>
                      <p className="text-[14px] font-semibold text-gray-900">{room.name}</p>
                      <p className="text-[13px] text-gray-500">{room.desc}</p>
                    </div>
                  ))}
                </div>
                <hr className="border-gray-200 mt-8" />
              </div>
            )}

            <AmenitiesSection amenities={amenities} />
            <hr className="border-gray-200" />

            {/* Calendar placeholder */}
            <div className="py-8">
              <h2 className="text-[22px] font-bold text-gray-900 mb-2">{property.nights || 2} nights in {property.city}</h2>
              <p className="text-[14px] text-gray-500 mb-6">{property.checkIn} – {property.checkOut}</p>
              <div className="w-full h-[220px] rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <span className="material-symbols-outlined text-[48px] text-gray-300">calendar_month</span>
                  <p className="text-[14px] text-gray-400 mt-2">Select dates to see pricing</p>
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />
            <ReviewsSection property={property} />
            <hr className="border-gray-200" />
            <MapSection property={property} />
            <hr className="border-gray-200" />

            {/* Meet your host */}
            <div className="py-8">
              <h2 className="text-[22px] font-bold text-gray-900 mb-6">Meet your host</h2>
              <div className="border border-gray-200 rounded-2xl p-6 flex gap-6">
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <img src={host.avatar} alt={host.name} className="w-20 h-20 rounded-full object-cover" />
                  <p className="text-[16px] font-bold text-gray-900 text-center">{host.name}</p>
                  {host.superhost && <span className="text-[12px] font-semibold text-gray-500">Superhost</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div><p className="font-bold text-[16px] text-gray-900">{property.reviewCount}</p><p className="text-[12px] text-gray-500">Reviews</p></div>
                    <div><p className="font-bold text-[16px] text-gray-900">{property.rating}</p><p className="text-[12px] text-gray-500">Rating</p></div>
                    <div><p className="font-bold text-[16px] text-gray-900">{host.yearsHosting}</p><p className="text-[12px] text-gray-500">Years hosting</p></div>
                  </div>
                  <p className="text-[14px] text-gray-600 leading-relaxed mb-4">{host.about}</p>
                  <div className="flex flex-wrap gap-4 text-[13px] text-gray-600 mb-4">
                    <span><span className="font-semibold text-gray-900">Response rate:</span> {host.responseRate}</span>
                    <span><span className="font-semibold text-gray-900">Responds:</span> {host.responseTime}</span>
                  </div>
                  <button className="px-5 py-3 border border-gray-900 rounded-xl text-[14px] font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                    Message Host
                  </button>
                  <p className="text-[12px] text-gray-400 mt-3">
                    To protect your payment, never transfer money or communicate outside of the Airbnb website or app.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div ref={bookingRef}>
            <BookingCard property={property} listingId={listingId} />
          </div>
        </div>
      </main>

      {photoTourOpen && (
        <PhotoTourOverlay images={property.images || []} title={property.title} onClose={() => setPhotoTourOpen(false)} />
      )}
    </div>
  );
}
