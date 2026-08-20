import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toggleWishlist, isInWishlist } from '../api/localStorage';
import UserMenuDropdown from '../components/common/UserMenuDropdown';

import globeImg from '../assets/ChatGPT Image Aug 20, 2026, 10_41_26 PM.png';
import houseImg from '../assets/ChatGPT Image Aug 20, 2026, 10_44_16 PM.png';
import balloonImg from '../assets/ChatGPT Image Aug 20, 2026, 10_45_01 PM.png';
import bellImg from '../assets/ChatGPT Image Aug 20, 2026, 10_46_57 PM.png';

// ─── Data ──────────────────────────────────────────────────────────────────

const NAV_TABS = [
  { id: 'all', label: 'All', imageSrc: globeImg, imageClass: 'icon-globe' },
  { id: 'homes', label: 'Homes', imageSrc: houseImg, imageClass: 'icon-house' },
  { id: 'experiences', label: 'Experiences', imageSrc: balloonImg, imageClass: 'icon-balloon' },
  { id: 'services', label: 'Services', imageSrc: bellImg, imageClass: 'icon-bell' },
];

const SUGGESTED_DESTINATIONS = [
  { icon: 'near_me', color: '#E8F4FD', label: 'Nearby', desc: "Find what's around you" },
  { icon: 'domain', color: '#FFF3E0', label: 'Udaipur, Rajasthan', desc: 'For its stunning architecture' },
  { icon: 'beach_access', color: '#E8F5E9', label: 'North Goa, Goa', desc: 'Popular beach destination' },
  { icon: 'location_city', color: '#FCE4EC', label: 'Mumbai, Maharashtra', desc: 'For sights like Gateway of India' },
  { icon: 'restaurant', color: '#F3E5F5', label: 'New Delhi, Delhi', desc: 'For its top-notch dining' },
  { icon: 'fort', color: '#FFF8E1', label: 'Jaipur, Rajasthan', desc: 'For its stunning architecture' },
  { icon: 'surfing', color: '#E0F7FA', label: 'South Goa, Goa', desc: 'Popular beach destination' },
];

const INSPIRATION_TABS = ['Popular', 'Arts & culture', 'Beach', 'Mountains', 'Outdoors', 'Things to do'];

const INSPIRATION_DATA = {
  'Popular': [
    { city: 'St. Petersburg', type: 'House rentals' },
    { city: 'Philadelphia', type: 'Apartment rentals' },
    { city: 'Tampa', type: 'Cottage rentals' },
    { city: 'Oahu', type: 'Monthly Rentals' },
    { city: 'Orange Beach', type: 'Cottage rentals' },
    { city: 'Pocono Mountains', type: 'Villa rentals' },
    { city: 'Kauai', type: 'Flat rentals' },
    { city: 'Montreal', type: 'House rentals' },
    { city: 'Jersey City', type: 'Monthly Rentals' },
    { city: 'Port Aransas', type: 'Apartment rentals' },
    { city: 'Dallas', type: 'Villa rentals' },
    { city: 'North Myrtle Beach', type: 'Cottage rentals' },
    { city: 'Chicago', type: 'Apartment rentals' },
    { city: 'Madrid', type: 'House rentals' },
    { city: 'Portland', type: 'Monthly Rentals' },
    { city: 'Traverse City', type: 'Apartment rentals' },
    { city: 'Barcelona', type: 'Villa rentals' },
    { city: 'Marbella', type: 'Flat rentals' },
  ],
  'Arts & culture': [
    { city: 'Paris', type: 'Apartment rentals' }, { city: 'Florence', type: 'Villa rentals' },
    { city: 'Vienna', type: 'House rentals' }, { city: 'Prague', type: 'Flat rentals' },
    { city: 'Kyoto', type: 'Cottage rentals' }, { city: 'Budapest', type: 'Monthly Rentals' },
    { city: 'Amsterdam', type: 'Apartment rentals' }, { city: 'Berlin', type: 'House rentals' },
    { city: 'Barcelona', type: 'Villa rentals' }, { city: 'Rome', type: 'Flat rentals' },
    { city: 'Athens', type: 'Apartment rentals' }, { city: 'Lisbon', type: 'Monthly Rentals' },
  ],
  'Beach': [
    { city: 'Goa', type: 'Beach rentals' }, { city: 'Maldives', type: 'Villa rentals' },
    { city: 'Bali', type: 'House rentals' }, { city: 'Phuket', type: 'Flat rentals' },
    { city: 'Santorini', type: 'Cottage rentals' }, { city: 'Cancun', type: 'Monthly Rentals' },
    { city: 'Miami', type: 'Apartment rentals' }, { city: 'Barcelona', type: 'Beach rentals' },
    { city: 'Mykonos', type: 'Villa rentals' }, { city: 'Ibiza', type: 'Flat rentals' },
  ],
  'Mountains': [
    { city: 'Manali', type: 'Cabin rentals' }, { city: 'Shimla', type: 'House rentals' },
    { city: 'Nainital', type: 'Cottage rentals' }, { city: 'Mussoorie', type: 'Villa rentals' },
    { city: 'Aspen', type: 'Chalet rentals' }, { city: 'Zermatt', type: 'Cabin rentals' },
    { city: 'Innsbruck', type: 'House rentals' }, { city: 'Queenstown', type: 'Flat rentals' },
  ],
  'Outdoors': [
    { city: 'Rishikesh', type: 'Adventure stays' }, { city: 'Coorg', type: 'Nature retreats' },
    { city: 'Jim Corbett', type: 'Jungle lodges' }, { city: 'Ranthambore', type: 'Safari camps' },
    { city: 'Kaziranga', type: 'Eco lodges' }, { city: 'Kodaikanal', type: 'Hill stays' },
  ],
  'Things to do': [
    { city: 'Dubai', type: 'Luxury stays' }, { city: 'Singapore', type: 'City apartments' },
    { city: 'Bangkok', type: 'Hotel rooms' }, { city: 'Kuala Lumpur', type: 'Serviced apartments' },
    { city: 'Hong Kong', type: 'City flats' }, { city: 'Tokyo', type: 'Guest houses' },
  ],
};

const PROPERTY_SECTIONS = [
  {
    id: 'udaipur',
    title: 'Popular homes in Udaipur',
    cards: [
      { id: 1, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaeFCB9PqZDD5AKraHFAlu5QKpOvNtXNsJ2YZ3dCyNRwO9UhBFngUlgGrQHjrFFQG9ly79a_fwB0qCsHyq3L9XwTHf7842oWRCxuwPX5a2aGbeIRqVpNN_mk240qKwXL-2gXXMm9S2FFSdjLKm5qLx7lJKJv7uX3sCBLUpwqNqlEAMnXRd8o8QCG3GuKmF-C-fLLJE8BY2ez9gLCcyKTIEIsglDLGJNwxQ_cMIKhdzD8Pirp7FgRIQMqL4N--zmIIzOaBHj4dJ_6Xa', alt: 'Lakeview Heritage Villa', name: 'Lakeview Heritage Villa', location: 'Udaipur, Rajasthan', dates: '4–9 Nov', price: '₹15,400', rating: '4.95', badge: 'Guest favourite' },
      { id: 2, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCv3YbwP1xiQpiRqs3dPP75_RT2P4NbnNtU_JGVW10aOPuG0odaL4A6Wjw4188qiuURZVn9DlKwXVZCbRNIQtks-iF3t4J063O8a0wdNtleAl9zpdt9_zaRNi-OuPEIQE4v3gkkNI1YOIzzfhN0CWteIv203YNK3Ib1eo7jqrrw3qrq2Gh0NqOymR-8gFbwl0VXUYqNfuE13busY5IUsQXqNNpYT2iEMOxIhbkw8EHqNE2OIGnXs9GrQJnAWxQ86-CfQfPtK12KqSjK', alt: 'Royal Retreat Boutique', name: 'Royal Retreat Boutique', location: 'Udaipur, Rajasthan', dates: '12–17 Nov', price: '₹8,200', rating: '4.82', badge: null },
      { id: 3, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD08jRpunmcVjZmbDYZalWK5YHecgqXENKJRI67ylRIFIa-6Di2au6nn9npC60_IoZlw6f34R0EBnF__d8dJ1wuYjbQmH_LtcPMI_frwHR7EzZw9impWU9sIrqEDjbVsECQ1N-g7A_K1QHTsNAYd3moq3pgrZCcz7H8_wFxLxWiFS1Gv01BLTY5mvfifz4YtJGjFfYGGPJ8ktv3mMHp0SDR75y9AAzWGGlJZktpRp7Pwp2345GqHQ0RHe6XVPHCjQNdgpB7m1Oe51Fn', alt: 'Pichola View Penthouse', name: 'Pichola View Penthouse', location: 'Udaipur, Rajasthan', dates: '1–5 Dec', price: '₹22,000', rating: '5.0', badge: 'Guest favourite' },
      { id: 4, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHoIyXOlN87hzhundmeDVo7IW6QxwyuvxcyZNMsObjISKIZ9kCZ4bCTT740KalvvieEHIgoOwNKGqYhe9aBlARPqHvgGIQGHXT78-C6VKYY93LhWvGIiWIyKOs8sQ4rSg-YDNkdrYgIzF3VAO-4FOEGUgAkfpYgIUvOjZwYsRNB7rh84TaPKn5ncVwV2IhDTE3FZAkxqX81KtXmmSNR9-hbbvrO97EfdDZROfdQVthmltUG4AsdjBIsOzVR5h6zkUdSgqDb5rb9u2a', alt: 'Artisan Haven Homestay', name: 'Artisan Haven Homestay', location: 'Udaipur, Rajasthan', dates: '8–12 Dec', price: '₹4,500', rating: '4.75', badge: null },
      { id: 5, image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=400&q=80', alt: 'Heritage Haveli Suite', name: 'Heritage Haveli Suite', location: 'Udaipur, Rajasthan', dates: '15–20 Dec', price: '₹11,800', rating: '4.88', badge: 'Guest favourite' },
      { id: 6, image: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=400&q=80', alt: 'Sunset Lake Bungalow', name: 'Sunset Lake Bungalow', location: 'Udaipur, Rajasthan', dates: '22–27 Dec', price: '₹6,300', rating: '4.91', badge: null },
      { id: 7, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', alt: 'City Palace View Flat', name: 'City Palace View Flat', location: 'Udaipur, Rajasthan', dates: '2–7 Jan', price: '₹3,900', rating: '4.70', badge: null },
    ],
  },
  {
    id: 'goa',
    title: 'Available next month in North Goa',
    cards: [
      { id: 8, image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80', alt: 'Villa in Assagao', name: 'Villa in Assagao', location: 'Assagao, North Goa', dates: 'Dec 10–15', price: '₹33,095', rating: '5.0', badge: null },
      { id: 9, image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=400&q=80', alt: 'Flat in Candolim', name: 'Flat in Candolim', location: 'Candolim, North Goa', dates: 'Dec 5–10', price: '₹9,503', rating: '4.95', badge: 'Guest favourite' },
      { id: 10, image: 'https://images.unsplash.com/photo-1529408632839-a54952c491e5?w=400&q=80', alt: 'Apartment in Candolim', name: 'Apartment in Candolim', location: 'Candolim, North Goa', dates: 'Dec 12–17', price: '₹18,405', rating: '4.88', badge: 'Guest favourite' },
      { id: 11, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80', alt: 'Flat in Calangute', name: 'Flat in Calangute', location: 'Calangute, North Goa', dates: 'Dec 1–6', price: '₹14,501', rating: '4.86', badge: null },
      { id: 12, image: 'https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?w=400&q=80', alt: 'Apartment in North Goa', name: 'Apartment in North Goa', location: 'North Goa', dates: 'Dec 8–13', price: '₹18,343', rating: '4.54', badge: null },
      { id: 13, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80', alt: 'Villa in Assagao', name: 'Villa in Assagao', location: 'Assagao, North Goa', dates: 'Dec 20–25', price: '₹33,095', rating: '5.0', badge: 'Guest favourite' },
      { id: 14, image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&q=80', alt: 'Home in Calangute', name: 'Home in Calangute', location: 'Calangute, North Goa', dates: 'Dec 15–20', price: '₹19,845', rating: '5.0', badge: 'Guest favourite' },
    ],
  },
  {
    id: 'mumbai',
    title: 'Stay in Mumbai',
    cards: [
      { id: 15, image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=400&q=80', alt: 'Flat in Versova', name: 'Flat in Versova', location: 'Versova, Mumbai', dates: 'Dec 10–15', price: '₹7,973', rating: '5.0', badge: null },
      { id: 16, image: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=400&q=80', alt: 'Flat in Santacruz East', name: 'Flat in Santacruz East', location: 'Santacruz East, Mumbai', dates: 'Dec 8–13', price: '₹3,991', rating: '4.89', badge: 'Guest favourite' },
      { id: 17, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', alt: 'Flat in Ville Parle West', name: 'Flat in Ville Parle West', location: 'Ville Parle West, Mumbai', dates: 'Dec 5–10', price: '₹14,267', rating: '4.82', badge: 'Guest favourite' },
      { id: 18, image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80', alt: 'Flat in Santacruz East', name: 'Flat in Santacruz East', location: 'Santacruz East, Mumbai', dates: 'Dec 12–17', price: '₹19,287', rating: '4.62', badge: null },
      { id: 19, image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=400&q=80', alt: 'Flat in Kurla West', name: 'Flat in Kurla West', location: 'Kurla West, Mumbai', dates: 'Dec 3–8', price: '₹22,700', rating: '5.0', badge: 'Guest favourite' },
      { id: 20, image: 'https://images.unsplash.com/photo-1529408632839-a54952c491e5?w=400&q=80', alt: 'Flat in Andheri West', name: 'Flat in Andheri West', location: 'Andheri West, Mumbai', dates: 'Dec 18–23', price: '₹12,600', rating: '4.85', badge: null },
      { id: 21, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80', alt: 'Flat in Bandra West', name: 'Flat in Bandra West', location: 'Bandra West, Mumbai', dates: 'Dec 25–30', price: '₹19,603', rating: '4.75', badge: 'Guest favourite' },
    ],
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────

function PropertyCard({ card }) {
  const { currentUser, showAuthModal } = useAuth();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isInWishlist(card.id));
  }, [card.id]);

  const handleSaveClick = (e) => {
    e.stopPropagation();
    if (!currentUser) {
      showAuthModal(() => {
        const isNowSaved = toggleWishlist(card.id);
        setSaved(isNowSaved);
      });
    } else {
      const isNowSaved = toggleWishlist(card.id);
      setSaved(isNowSaved);
    }
  };

  return (
    <div
      className="flex-none w-[220px] snap-start group cursor-pointer"
      onClick={() => navigate(`/listing/${card.id}`)}
      role="article"
    >
      <div className="relative aspect-square mb-3 rounded-xl overflow-hidden bg-gray-100">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={card.image}
          alt={card.alt}
          loading="lazy"
        />
        {card.badge && (
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md shadow-sm">
            <span className="text-[11px] font-bold text-gray-900">{card.badge}</span>
          </div>
        )}
          <button 
            onClick={handleSaveClick}
            className="absolute top-2 right-2 p-1.5 hover:bg-gray-100 rounded-full transition-colors text-white hover:text-[#FF385C]"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: saved ? "'FILL' 1" : "'FILL' 0", color: saved ? '#FF385C' : 'white', filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.5))' }}>favorite</span>
          </button>
        </div>
        <div className="mt-3 flex justify-between items-start">
          <div>
            <h3 className="text-[15px] font-semibold text-gray-900 truncate">{card.name}</h3>
            <p className="text-[14px] text-gray-500 truncate">{card.dates}</p>
            <p className="text-[15px] text-gray-900 font-semibold mt-1">{card.price} <span className="font-normal">night</span></p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span className="material-symbols-outlined text-[14px]">star</span>
            <span className="text-[14px]">{card.rating}</span>
          </div>
        </div>
    </div>
  );
}

function PropertySection({ section }) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[22px] font-bold text-gray-900">{section.title}</h2>
      </div>
      <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide">
        {section.cards.map(card => (
          <PropertyCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}

function WhereDropdown({ onSelect }) {
  return (
    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 z-50 p-6">
      <p className="text-[12px] font-bold text-gray-900 mb-4">Suggested</p>
      <div className="flex flex-col gap-2">
        {SUGGESTED_DESTINATIONS.map(dest => (
          <button key={dest.label} onClick={() => onSelect(dest.label)} className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-xl transition-colors">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-700" style={{ backgroundColor: dest.color }}>
              <span className="material-symbols-outlined">{dest.icon}</span>
            </div>
            <div className="text-left">
              <p className="text-[14px] font-medium text-gray-900">{dest.label}</p>
              <p className="text-[13px] text-gray-500">{dest.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function InspirationSection() {
  const [activeInspoTab, setActiveInspoTab] = useState(INSPIRATION_TABS[0]);
  return (
    <section className="mt-16">
      <h2 className="text-[22px] font-semibold text-gray-900 mb-6">Inspiration for future getaways</h2>
      <div className="flex gap-6 border-b border-gray-200 mb-6 overflow-x-auto scrollbar-hide">
        {INSPIRATION_TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveInspoTab(tab)}
            className={`pb-3 text-[14px] font-medium whitespace-nowrap transition-colors relative ${activeInspoTab === tab ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
          >
            {tab}
            {activeInspoTab === tab && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-900" />}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-6 gap-x-4">
        {INSPIRATION_DATA[activeInspoTab]?.map(item => (
          <div key={item.city} className="cursor-pointer group">
            <h4 className="text-[14px] font-medium text-gray-900 group-hover:underline">{item.city}</h4>
            <p className="text-[14px] text-gray-500">{item.type}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  const { currentUser, showAuthModal, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [activeSearch, setActiveSearch] = useState(null);
  const [showWhereDropdown, setShowWhereDropdown] = useState(false);
  const searchRef = useRef(null);
  
  const [whereValue, setWhereValue] = useState('');
  const [whenValue, setWhenValue] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDestSelect = (val) => {
    setWhereValue(val);
    setShowWhereDropdown(false);
    setActiveSearch('when');
    setSearchExpanded(true);
  };

  const handleWhenSelect = (val) => {
    setWhenValue(val);
    setActiveSearch('who');
  };

  const handleGuestChange = (type, delta) => {
    setGuests(prev => ({ ...prev, [type]: Math.max(0, prev[type] + delta) }));
  };

  const handleWhereClick = () => {
    setActiveSearch('where');
    setShowWhereDropdown(true);
    setSearchExpanded(true);
  };

  const handleSearchClick = () => {
    if (!searchExpanded) {
      setSearchExpanded(true);
      setActiveSearch('where');
      setShowWhereDropdown(true);
      return;
    }
    const searchParams = new URLSearchParams();
    if (whereValue) searchParams.set('location', whereValue);
    if (whenValue) searchParams.set('dates', whenValue);
    const totalGuests = guests.Adults + guests.Children;
    if (totalGuests > 0) searchParams.set('guests', totalGuests.toString());
    
    setActiveSearch(null); 
    setShowWhereDropdown(false); 
    setSearchExpanded(false);
    navigate(`/search?${searchParams.toString()}`);
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ── HEADER ─────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        {/* Top row */}
        <div className="max-w-[1280px] mx-auto px-6 md:px-20 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 text-[#FF385C] flex-shrink-0" aria-label="Airbnb">
            <img src="https://1000logos.net/wp-content/uploads/2017/08/Airbnb-Logo.png" alt="Airbnb" className="h-8 object-contain" />
            <span className="font-bold text-[20px] hidden lg:block tracking-tight">airbnb</span>
          </Link>

          {/* Center tabs or Compact Search Bar on Scroll */}
          {isScrolled ? (
            <div className="flex-1 flex justify-center animate-in fade-in duration-200">
              <button
                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setSearchExpanded(true); }}
                className="border border-gray-300 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-all flex items-center divide-x divide-gray-300 cursor-pointer"
              >
                <span className="px-3 text-[14px] font-semibold text-gray-900">Anywhere</span>
                <span className="px-3 text-[14px] font-semibold text-gray-900">Anytime</span>
                <span className="px-3 text-[14px] text-gray-500 flex items-center gap-2">
                  Add guests
                  <div className="bg-[#FF385C] rounded-full p-1.5 text-white ml-2 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] font-bold">search</span>
                  </div>
                </span>
              </button>
            </div>
          ) : (
            <nav className="hidden md:flex items-end gap-1 h-16" aria-label="Main navigation">
              {NAV_TABS.map((tab, i) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`nav-tab relative flex items-center gap-1.5 px-4 h-full text-[15px] font-semibold transition-all duration-200 group ${
                    activeTab === tab.id ? 'active text-gray-900' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <img
                    src={tab.imageSrc}
                    alt={tab.label}
                    className={`nav-tab-icon nav-icon-entrance ${tab.imageClass} h-[24px] object-contain opacity-90 group-hover:opacity-100 transition-opacity`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                  {tab.label}
                  {/* Active Tab Underline indicator */}
                  {activeTab === tab.id ? (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-900 tab-underline" />
                  ) : (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              ))}
            </nav>
          )}

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link to="/host/get-started" className="hidden md:block text-[14px] font-semibold text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full transition-colors">
              Become a host
            </Link>
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors" aria-label="Language">
              <span className="material-symbols-outlined text-gray-700">language</span>
            </button>
            <UserMenuDropdown />
          </div>
        </div>

        {/* Search bar row */}
        {!isScrolled && (
          <div className="flex justify-center pb-4 px-4 animate-in fade-in duration-200">
          <div ref={searchRef} className="relative w-full max-w-3xl">
            <div
              className={`flex items-center bg-white border rounded-full h-14 overflow-hidden divide-x divide-gray-200 transition-all duration-200 ${
                searchExpanded
                  ? 'shadow-xl border-gray-300'
                  : 'shadow-md border-gray-200 hover:shadow-lg'
              }`}
            >
              {/* Where */}
              <button
                onClick={handleWhereClick}
                className={`flex-1 px-5 py-2 h-full flex flex-col justify-center text-left transition-colors rounded-l-full ${
                  activeSearch === 'where' ? 'bg-white shadow-inner' : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-[11px] font-bold text-gray-900">Where</span>
                <span className="text-[13px] text-gray-400 truncate">{whereValue || 'Search destinations'}</span>
              </button>

              {/* When */}
              <button
                onClick={() => { setActiveSearch('when'); setShowWhereDropdown(false); setSearchExpanded(true); }}
                className={`flex-1 px-5 py-2 h-full flex flex-col justify-center text-left transition-colors ${
                  activeSearch === 'when' ? 'bg-white shadow-inner' : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-[11px] font-bold text-gray-900">When</span>
                <span className="text-[13px] text-gray-400 truncate">{whenValue || 'Add dates'}</span>
              </button>

              {/* Who */}
              <button
                onClick={() => { setActiveSearch('who'); setShowWhereDropdown(false); setSearchExpanded(true); }}
                className={`flex-1 pl-5 pr-2 py-2 h-full flex items-center justify-between transition-colors rounded-r-full ${
                  activeSearch === 'who' ? 'bg-white shadow-inner' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex flex-col justify-center text-left">
                  <span className="text-[11px] font-bold text-gray-900">Who</span>
                  <span className="text-[13px] text-gray-400 truncate">
                    {guests.Adults + guests.Children > 0 
                      ? `${guests.Adults + guests.Children} guests${guests.Infants > 0 ? `, ${guests.Infants} infants` : ''}` 
                      : 'Add guests'}
                  </span>
                </div>
                <button
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white flex-shrink-0 hover:opacity-90 active:scale-95 transition-all"
                  style={{ background: 'linear-gradient(135deg, #FF385C, #E31C5F)' }}
                  onClick={handleSearchClick}
                  aria-label="Search"
                >
                  {searchExpanded ? (
                    <span className="text-[13px] font-bold px-1">Search</span>
                  ) : (
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>search</span>
                  )}
                </button>
              </button>
            </div>

            {/* Where dropdown */}
            {showWhereDropdown && <WhereDropdown onSelect={handleDestSelect} />}

            {/* When panel */}
            {activeSearch === 'when' && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 p-6">
                <p className="text-[13px] font-bold text-gray-900 mb-4">When's your trip?</p>
                <div className="flex gap-3 flex-wrap">
                  {['Any week', 'Weekend', 'Next week', 'Next month', 'Flexible'].map(opt => (
                    <button
                      key={opt}
                      className="px-4 py-2 rounded-full border border-gray-300 text-[13px] font-medium hover:border-gray-900 transition-colors"
                      onClick={() => handleWhenSelect(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Who panel */}
            {activeSearch === 'who' && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 p-6">
                <p className="text-[13px] font-bold text-gray-900 mb-4">Who's coming?</p>
                {[{ label: 'Adults', sub: 'Ages 13 or above' }, { label: 'Children', sub: 'Ages 2–12' }, { label: 'Infants', sub: 'Under 2' }].map((g) => (
                  <div key={g.label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-[14px] font-medium text-gray-900">{g.label}</p>
                      <p className="text-[12px] text-gray-400">{g.sub}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleGuestChange(g.label, -1)}
                        disabled={guests[g.label] === 0}
                        className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-[18px] transition-colors ${guests[g.label] === 0 ? 'text-gray-200 border-gray-200 cursor-not-allowed' : 'text-gray-500 hover:border-gray-900 hover:text-gray-900'}`}
                      >−</button>
                      <span className="w-4 text-center text-[14px] text-gray-900">{guests[g.label]}</span>
                      <button 
                        onClick={() => handleGuestChange(g.label, 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-900 hover:text-gray-900 text-[18px] transition-colors"
                      >+</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        )}
      </header>

      {/* ── MAIN CONTENT ───────────────────────────────── */}
      <main className="max-w-[1280px] mx-auto px-6 md:px-20 py-8 pb-32">
          {PROPERTY_SECTIONS.map(section => (
            <PropertySection key={section.id} section={section} />
          ))}

        <InspirationSection />
      </main>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6 md:px-20 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-gray-200">
            <div>
              <h3 className="font-bold text-[14px] text-gray-900 mb-4">Support</h3>
              <ul className="flex flex-col gap-2.5 text-[13px] text-gray-600">
                {['Help Centre', 'Get help with a safety issue', 'AirCover', 'Anti-discrimination', 'Disability support', 'Cancellation options', 'Report neighbourhood concern'].map(l => (
                  <li key={l}><a href="#" className="hover:underline">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-[14px] text-gray-900 mb-4">Hosting</h3>
              <ul className="flex flex-col gap-2.5 text-[13px] text-gray-600">
                {['Airbnb your home', 'Airbnb your experience', 'Airbnb your service', 'AirCover for Hosts', 'Hosting resources', 'Community forum', 'Hosting responsibly', 'Join a free hosting class', 'Find a co-host', 'Refer a host'].map(l => (
                  <li key={l}><a href="#" className="hover:underline">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-[14px] text-gray-900 mb-4">Airbnb</h3>
              <ul className="flex flex-col gap-2.5 text-[13px] text-gray-600">
                {['2026 Summer Release', 'Newsroom', 'Careers', 'Investors', 'Airbnb.org emergency stays'].map(l => (
                  <li key={l}><a href="#" className="hover:underline">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-6 flex flex-col md:flex-row justify-between items-center text-[13px] text-gray-600 gap-4">
            <div className="flex gap-4 flex-wrap items-center">
              <span>© 2026 Airbnb, Inc.</span>
              {['Privacy', 'Terms', 'Sitemap', 'Company details'].map(l => (
                <a key={l} href="#" className="hover:underline">{l}</a>
              ))}
            </div>
            <div className="flex items-center gap-5">
              <button className="flex items-center gap-1 font-semibold text-gray-900 hover:underline">
                <span className="material-symbols-outlined text-[16px]">language</span> English (IN)
              </button>
              <button className="font-semibold text-gray-900 hover:underline">₹ INR</button>
              <div className="flex items-center gap-3">
                <a href="#" aria-label="Twitter/X" className="text-gray-700 hover:text-gray-900">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" aria-label="Instagram" className="text-gray-700 hover:text-gray-900">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

