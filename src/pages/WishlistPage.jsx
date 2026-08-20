import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWishlist } from '../api/localStorage';
import propertiesData from '../data/properties.json';

const { properties } = propertiesData;

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    setWishlistIds(getWishlist());
  }, []);

  const savedProperties = properties.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex items-center h-20">
          <Link to="/" className="flex items-center gap-1.5 text-[#FF385C]" aria-label="Airbnb">
            <img src="https://1000logos.net/wp-content/uploads/2017/08/Airbnb-Logo.png" alt="Airbnb" className="h-8 object-contain" />
            <span className="font-bold text-[20px] hidden lg:block tracking-tight">airbnb</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-[1280px] mx-auto px-6 md:px-10 py-12">
        <h1 className="text-[32px] font-bold text-gray-900 mb-8">Wishlists</h1>
        
        {savedProperties.length === 0 ? (
           <div className="py-12 border-t border-gray-200">
              <h2 className="text-[22px] font-semibold text-gray-900 mb-2">Create your first wishlist</h2>
              <p className="text-[16px] text-gray-500 mb-6">As you search, click the heart icon to save your favorite places to stay or things to do.</p>
              <Link to="/" className="px-6 py-3 border border-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-colors">Start exploring</Link>
           </div>
        ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
             {savedProperties.map(card => (
               <Link to={`/listing/${card.id}`} key={card.id} className="group cursor-pointer">
                 <div className="relative aspect-square mb-3 rounded-xl overflow-hidden bg-gray-100">
                   <img
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     src={card.image}
                     alt={card.title}
                   />
                   <div className="absolute top-2 right-2 text-[#FF385C]">
                     <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                   </div>
                 </div>
                 <div className="min-w-0">
                     <h3 className="font-semibold text-[15px] text-gray-900 truncate">{card.location}</h3>
                     <p className="text-gray-500 text-[14px] truncate">{card.title}</p>
                 </div>
               </Link>
             ))}
           </div>
        )}
      </main>
    </div>
  );
}
