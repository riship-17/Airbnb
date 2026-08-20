import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HostOnboardingFlow() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Simulate saving a new listing and return to dashboard
      navigate('/host');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/host');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 h-20 border-b border-gray-200">
         <span className="text-[24px] font-bold">airbnb <span className="font-medium text-gray-400">setup</span></span>
         <button onClick={() => navigate('/host')} className="px-4 py-2 border border-gray-300 rounded-full font-semibold hover:border-gray-900 transition-colors text-[14px]">Save and exit</button>
      </nav>

      {/* Main Content (Wizard) */}
      <main className="flex-1 flex items-center justify-center py-12 px-6">
         <div className="w-full max-w-2xl">
            {step === 1 && (
               <div className="animate-fade-in-up">
                  <h1 className="text-[40px] font-semibold text-gray-900 mb-4 leading-tight">Tell us about your place</h1>
                  <p className="text-[18px] text-gray-600 mb-8">In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room.</p>
                  
                  <div className="space-y-4">
                     <button className="w-full text-left p-6 border border-gray-300 rounded-2xl font-bold text-[18px] hover:border-black transition-colors bg-gray-50 flex justify-between items-center">
                        Entire place
                        <span className="material-symbols-outlined">home</span>
                     </button>
                     <button className="w-full text-left p-6 border border-gray-300 rounded-2xl font-bold text-[18px] hover:border-black transition-colors flex justify-between items-center">
                        A private room
                        <span className="material-symbols-outlined">meeting_room</span>
                     </button>
                     <button className="w-full text-left p-6 border border-gray-300 rounded-2xl font-bold text-[18px] hover:border-black transition-colors flex justify-between items-center">
                        A shared room
                        <span className="material-symbols-outlined">bedroom_parent</span>
                     </button>
                  </div>
               </div>
            )}
            
            {step === 2 && (
               <div className="animate-fade-in-up">
                  <h1 className="text-[40px] font-semibold text-gray-900 mb-4 leading-tight">Make it stand out</h1>
                  <p className="text-[18px] text-gray-600 mb-8">In this step, you'll add some of the amenities your place offers, plus 5 or more photos. Then, you'll create a title and description.</p>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-16 flex flex-col items-center justify-center text-center cursor-pointer hover:border-black transition-colors bg-gray-50">
                     <span className="material-symbols-outlined text-[48px] text-gray-400 mb-4">add_photo_alternate</span>
                     <h3 className="text-[18px] font-semibold">Drag your photos here</h3>
                     <p className="text-[14px] text-gray-500 underline mt-2">or browse from your device</p>
                  </div>
               </div>
            )}
            
            {step === 3 && (
               <div className="animate-fade-in-up">
                  <h1 className="text-[40px] font-semibold text-gray-900 mb-4 leading-tight">Finish up and publish</h1>
                  <p className="text-[18px] text-gray-600 mb-8">Finally, you'll choose if you'd like to start with an experienced guest, set a starting price, and publish your listing.</p>
                  
                  <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 flex flex-col items-center justify-center text-center">
                     <p className="text-[20px] font-bold mb-2">Now, set your price</p>
                     <p className="text-gray-500 mb-8">You can change it anytime.</p>
                     <div className="flex items-center text-[60px] font-bold">
                        <span>₹</span>
                        <input type="text" className="w-48 bg-transparent outline-none text-center border-b border-gray-300" defaultValue="4500" />
                     </div>
                  </div>
               </div>
            )}
         </div>
      </main>

      {/* Footer (Progress bar + Navigation) */}
      <footer className="h-24 border-t border-gray-200 px-10 flex flex-col justify-center sticky bottom-0 bg-white">
         <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
            <div className="h-full bg-black transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }}></div>
         </div>
         <div className="flex justify-between items-center w-full">
            <button onClick={handleBack} className="font-semibold underline text-[16px] px-2 py-1 rounded hover:bg-gray-50">Back</button>
            <button 
              onClick={handleNext}
              className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
            >
               {step === 3 ? 'Publish' : 'Next'}
            </button>
         </div>
      </footer>
    </div>
  );
}
