import { useParams, useNavigate, Link } from 'react-router-dom';

export default function ConfirmationPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white max-w-lg w-full p-10 border border-gray-200 rounded-3xl text-center shadow-lg">
         <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-[32px]">check</span>
         </div>
         <h1 className="text-[28px] font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
         <p className="text-gray-500 text-[15px] mb-8">You're all set. Your reservation ID is <strong>{bookingId}</strong>. We've sent a confirmation email with your trip details.</p>
         
         <div className="flex flex-col gap-3">
            <button 
              onClick={() => navigate('/trips')}
              className="w-full py-3.5 rounded-xl text-white font-bold text-[16px] transition-opacity hover:opacity-90" 
              style={{ background: 'linear-gradient(135deg, #FF385C, #E31C5F)' }}
            >
              View Trips
            </button>
            <Link 
              to="/"
              className="w-full py-3.5 rounded-xl text-gray-900 font-bold text-[16px] border border-gray-900 hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </Link>
         </div>
      </div>
    </div>
  );
}
