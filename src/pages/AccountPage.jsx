import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AccountPage() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-[1040px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5 text-[#FF385C]">
            <img src="https://1000logos.net/wp-content/uploads/2017/08/Airbnb-Logo.png" alt="Airbnb" className="h-8 object-contain" />
          </Link>
          <div className="flex items-center gap-4">
             {currentUser.photoURL ? (
                <img src={currentUser.photoURL} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
             ) : (
                <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg">
                   {currentUser.email ? currentUser.email[0].toUpperCase() : 'U'}
                </div>
             )}
          </div>
        </div>
      </nav>

      <main className="max-w-[1040px] mx-auto px-6 py-12">
        <h1 className="text-[32px] font-bold text-gray-900 mb-2">Account</h1>
        <p className="text-[18px] text-gray-700 mb-10">
           <span className="font-semibold">{currentUser.displayName || 'User'}</span>, {currentUser.email} • <Link to="/host/get-started" className="underline font-semibold">Go to profile</Link>
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {[
             { title: 'Personal info', desc: 'Provide personal details and how we can reach you', icon: 'person' },
             { title: 'Login & security', desc: 'Update your password and secure your account', icon: 'security' },
             { title: 'Payments & payouts', desc: 'Review payments, payouts, coupons, and gift cards', icon: 'payments' },
             { title: 'Taxes', desc: 'Manage taxpayer information and tax documents', icon: 'description' },
             { title: 'Notifications', desc: 'Choose notification preferences and how you want to be contacted', icon: 'notifications' },
             { title: 'Privacy & sharing', desc: 'Manage your personal data, connected services, and data sharing settings', icon: 'visibility' }
           ].map(item => (
              <div key={item.title} className="p-4 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col gap-6">
                 <span className="material-symbols-outlined text-[32px] text-gray-700">{item.icon}</span>
                 <div>
                    <h3 className="font-semibold text-[16px] text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-[14px] leading-snug">{item.desc}</p>
                 </div>
              </div>
           ))}
        </div>
        
        <div className="mt-12 text-center">
           <button onClick={handleLogout} className="px-6 py-3 border border-gray-900 rounded-lg font-semibold hover:bg-gray-50">Log out</button>
        </div>
      </main>
    </div>
  );
}
