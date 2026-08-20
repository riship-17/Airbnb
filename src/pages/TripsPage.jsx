import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTrips } from '../api/localStorage';

export default function TripsPage() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    setTrips(getTrips());
  }, []);

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
        <h1 className="text-[32px] font-bold text-gray-900 mb-8">Trips</h1>
        
        {trips.length === 0 ? (
           <div className="py-12 border-t border-gray-200">
              <h2 className="text-[22px] font-semibold text-gray-900 mb-2">No trips booked... yet!</h2>
              <p className="text-[16px] text-gray-500 mb-6">Time to dust off your bags and start planning your next adventure.</p>
              <Link to="/" className="px-6 py-3 border border-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-colors">Start searching</Link>
           </div>
        ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {trips.map(trip => (
               <div key={trip.id} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
                 <div className="aspect-[4/3] bg-gray-100">
                    <img src={trip.property.image} alt={trip.property.title} className="w-full h-full object-cover" />
                 </div>
                 <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                       <h3 className="font-bold text-[18px] text-gray-900">{trip.property.location}</h3>
                       <p className="text-gray-500 text-[14px]">Reservation: {trip.id}</p>
                       <p className="text-gray-500 text-[14px] mt-2 font-medium">Dec 12 – 17</p>
                    </div>
                    <Link to={`/listing/${trip.property.id}`} className="mt-4 text-center w-full block py-2 border border-gray-900 rounded-lg font-semibold hover:bg-gray-50">
                       View listing
                    </Link>
                 </div>
               </div>
             ))}
           </div>
        )}
      </main>
    </div>
  );
}
