import { useSearchParams, Link } from 'react-router-dom';
import propertiesData from '../data/properties.json';

const { properties } = propertiesData;

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const location = searchParams.get('location') || 'Anywhere';
  const dates = searchParams.get('dates') || 'Any week';
  const guests = searchParams.get('guests') || 'Add guests';
  
  // Basic mock filtering based on location string match
  const filteredProperties = properties.filter(p => 
    location === 'Anywhere' || p.location.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-1.5 text-[#FF385C]" aria-label="Airbnb">
            <img src="https://1000logos.net/wp-content/uploads/2017/08/Airbnb-Logo.png" alt="Airbnb" className="h-8 object-contain" />
            <span className="font-bold text-[20px] hidden lg:block tracking-tight">airbnb</span>
          </Link>
          
          <div className="flex-1 flex justify-center">
             <div className="border border-gray-300 rounded-full py-2 px-4 shadow-sm flex items-center divide-x divide-gray-300">
                <span className="px-3 text-[14px] font-semibold text-gray-900">{location}</span>
                <span className="px-3 text-[14px] font-semibold text-gray-900">{dates}</span>
                <span className="px-3 text-[14px] text-gray-500 flex items-center gap-2">
                   {guests} guests
                   <div className="bg-[#FF385C] rounded-full p-1 text-white ml-2">
                      <span className="material-symbols-outlined text-[14px] font-bold">search</span>
                   </div>
                </span>
             </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1280px] mx-auto px-6 md:px-10 py-8">
        <h1 className="text-[26px] font-bold text-gray-900 mb-6">
          {filteredProperties.length} stays in {location}
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProperties.map(card => (
            <Link to={`/listing/${card.id}`} key={card.id} className="group cursor-pointer">
              <div className="relative aspect-square mb-3 rounded-xl overflow-hidden bg-gray-100">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={card.image}
                  alt={card.title}
                />
              </div>
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0">
                  <h3 className="font-semibold text-[15px] text-gray-900 truncate">{card.location}</h3>
                  <p className="text-gray-500 text-[14px] truncate">{card.title}</p>
                  <p className="text-gray-500 text-[14px]">{typeof card.host === 'object' ? `Hosted by ${card.host?.name}` : card.host}</p>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="font-semibold text-[15px] text-gray-900">{card.price}</span>
                    <span className="text-gray-500 text-[14px]">night</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="text-[14px] text-gray-900">{card.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
