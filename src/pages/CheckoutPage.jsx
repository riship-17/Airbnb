import { useParams, useNavigate } from 'react-router-dom';
import propertiesData from '../data/properties.json';
import { addTrip } from '../api/localStorage';

const { properties } = propertiesData;

export default function CheckoutPage() {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const property = properties.find(p => p.id === parseInt(listingId)) || properties[0];

  const handlePayment = () => {
    // Generate a random booking ID
    const bookingId = Math.random().toString(36).substring(2, 9).toUpperCase();
    addTrip({
      id: bookingId,
      property: property,
      dates: 'Dec 12 - 17'
    });
    navigate(`/booking-confirmation/${bookingId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-[800px] mx-auto px-6 py-4 flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full mr-4">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-[20px] font-bold">Confirm and pay</h1>
        </div>
      </nav>

      <main className="max-w-[800px] mx-auto px-6 py-12">
         <div className="bg-white p-8 border border-gray-200 rounded-2xl">
            <h2 className="text-[22px] font-bold mb-6">Pay with</h2>
            
            <div className="border border-gray-300 rounded-lg mb-6 overflow-hidden">
               <div className="p-4 border-b border-gray-300 flex items-center justify-between cursor-pointer bg-gray-50">
                  <div className="flex items-center gap-3">
                     <span className="material-symbols-outlined">credit_card</span>
                     <span className="font-semibold text-gray-900">Credit or debit card</span>
                  </div>
                  <input type="radio" checked readOnly />
               </div>
            </div>

            <div className="space-y-4 mb-8">
               <div className="relative border border-gray-400 rounded-lg">
                  <label className="absolute top-2 left-3 text-[12px] text-gray-500 font-medium">Card number</label>
                  <input type="text" className="w-full pt-6 pb-2 px-3 text-[16px] text-gray-900 outline-none focus:bg-gray-50" placeholder="0000 0000 0000 0000" />
               </div>
               <div className="flex gap-4">
                  <div className="relative border border-gray-400 rounded-lg flex-1">
                     <label className="absolute top-2 left-3 text-[12px] text-gray-500 font-medium">Expiration</label>
                     <input type="text" className="w-full pt-6 pb-2 px-3 text-[16px] text-gray-900 outline-none focus:bg-gray-50" placeholder="MM / YY" />
                  </div>
                  <div className="relative border border-gray-400 rounded-lg flex-1">
                     <label className="absolute top-2 left-3 text-[12px] text-gray-500 font-medium">CVV</label>
                     <input type="text" className="w-full pt-6 pb-2 px-3 text-[16px] text-gray-900 outline-none focus:bg-gray-50" placeholder="123" />
                  </div>
               </div>
            </div>
            
            <hr className="my-8" />
            
            <div className="flex justify-between items-center mb-6">
               <span className="font-semibold text-gray-900">Total amount to pay</span>
               <span className="font-bold text-[20px]">₹{(parseInt(property.price.replace(/[^\d]/g, '')) * 5) + 2500}</span>
            </div>

            <button 
             onClick={handlePayment}
             className="w-full py-4 rounded-xl text-white font-bold text-[16px] transition-opacity hover:opacity-90 active:scale-98" 
             style={{ background: 'linear-gradient(135deg, #FF385C, #E31C5F)' }}
           >
             Confirm Booking
           </button>
         </div>
      </main>
    </div>
  );
}
