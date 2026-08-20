import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function HostDashboard() {
  const [activeTab, setActiveTab] = useState('listings');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5 text-[#FF385C]">
            <img src="https://1000logos.net/wp-content/uploads/2017/08/Airbnb-Logo.png" alt="Airbnb" className="h-8 object-contain" />
          </Link>
          <div className="flex gap-4">
             <button className="px-4 py-2 font-semibold hover:bg-gray-100 rounded-full transition-colors text-[14px]">Menu</button>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 max-w-[1440px] w-full mx-auto">
        {/* Sidebar Nav */}
        <aside className="w-64 border-r border-gray-200 py-8 px-4 hidden md:block">
           <nav className="flex flex-col gap-1">
              {[
                 { id: 'listings', label: 'Listings', icon: 'format_list_bulleted' },
                 { id: 'calendar', label: 'Calendar', icon: 'calendar_month' },
                 { id: 'reservations', label: 'Reservations', icon: 'book_online' },
                 { id: 'earnings', label: 'Earnings', icon: 'payments' },
              ].map(item => (
                 <button 
                   key={item.id}
                   onClick={() => setActiveTab(item.id)}
                   className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors font-medium text-[15px] ${activeTab === item.id ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                 >
                    <span className="material-symbols-outlined">{item.icon}</span>
                    {item.label}
                 </button>
              ))}
           </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-8 md:p-12">
           <div className="flex justify-between items-center mb-8">
              <h1 className="text-[32px] font-bold text-gray-900 capitalize">{activeTab}</h1>
              {activeTab === 'listings' && (
                 <button 
                   onClick={() => navigate('/host/get-started')}
                   className="px-5 py-2.5 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                 >
                    Create a listing
                 </button>
              )}
           </div>

           <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
              <span className="material-symbols-outlined text-[48px] text-gray-300 mb-4">home_work</span>
              <h2 className="text-[20px] font-bold text-gray-900 mb-2">No {activeTab} yet</h2>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">This is your host dashboard. When you have active {activeTab}, they will appear here to easily manage your hosting business.</p>
           </div>
        </main>
      </div>
    </div>
  );
}
