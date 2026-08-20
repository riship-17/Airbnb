import { useParams, useNavigate, Link } from 'react-router-dom';
import propertiesData from '../data/properties.json';

const { properties } = propertiesData;

export default function BookingPage() {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const property = properties.find(p => p.id === parseInt(listingId)) || properties[0];

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex items-center h-20">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full mr-4">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-[20px] font-bold">Request to book</h1>
        </div>
      </nav>

      <main className="max-w-[1120px] mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row gap-12">
        {/* Left Col: Trip Details */}
        <div className="flex-1">
           <h2 className="text-[22px] font-bold mb-6">Your trip</h2>
           <div className="mb-6 flex justify-between">
              <div>
                 <h3 className="font-semibold text-[16px]">Dates</h3>
                 <p className="text-gray-500">Dec 12 - 17</p>
              </div>
              <button className="font-semibold underline">Edit</button>
           </div>
           <div className="mb-8 flex justify-between">
              <div>
                 <h3 className="font-semibold text-[16px]">Guests</h3>
                 <p className="text-gray-500">2 guests</p>
              </div>
              <button className="font-semibold underline">Edit</button>
           </div>
           
           <hr className="my-8" />
           
           <h2 className="text-[22px] font-bold mb-6">Guest Information</h2>
           <div className="mb-4">
              <label className="block text-[14px] font-semibold text-gray-900 mb-2">Message the host (optional)</label>
              <textarea className="w-full border border-gray-400 rounded-lg p-3 outline-none focus:border-black" rows="3" placeholder="I'd love to stay!"></textarea>
           </div>

           <hr className="my-8" />
           
           <button 
             onClick={() => navigate(`/checkout/${property.id}`)}
             className="px-8 py-3.5 rounded-lg text-white font-bold text-[16px] transition-opacity hover:opacity-90 active:scale-98" 
             style={{ background: 'linear-gradient(135deg, #FF385C, #E31C5F)' }}
           >
             Continue to Payment
           </button>
        </div>

        {/* Right Col: Summary Card */}
        <div className="w-full md:w-[400px]">
           <div className="border border-gray-200 p-6 rounded-2xl sticky top-28">
              <div className="flex gap-4 mb-6">
                 <img src={property.image} alt={property.title} className="w-24 h-24 rounded-xl object-cover" />
                 <div>
                    <p className="text-[12px] text-gray-500 font-semibold uppercase">{property.location}</p>
                    <p className="text-[14px] font-medium text-gray-900">{property.title}</p>
                    <div className="flex items-center gap-1 mt-1 text-[12px]">
                       <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                       <span className="font-semibold">{property.rating}</span>
                       <span className="text-gray-500">({property.reviews} reviews)</span>
                    </div>
                 </div>
              </div>
              
              <hr className="my-6 border-gray-200" />
              
              <h3 className="font-bold text-[18px] mb-4">Price details</h3>
              <div className="flex justify-between text-[15px] mb-3">
                 <span className="underline">{property.price} x 5 nights</span>
                 <span>₹{parseInt(property.price.replace(/[^\d]/g, '')) * 5}</span>
              </div>
              <div className="flex justify-between text-[15px] mb-3">
                 <span className="underline">Airbnb service fee</span>
                 <span>₹2,500</span>
              </div>
              
              <hr className="my-4 border-gray-200" />
              
              <div className="flex justify-between font-bold text-[16px]">
                 <span>Total (INR)</span>
                 <span>₹{(parseInt(property.price.replace(/[^\d]/g, '')) * 5) + 2500}</span>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
