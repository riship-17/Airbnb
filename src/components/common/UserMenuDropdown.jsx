import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function UserMenuDropdown() {
  const { currentUser, showAuthModal, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => currentUser ? setIsOpen(!isOpen) : showAuthModal()}
        className="flex items-center gap-2 border border-gray-300 rounded-full py-2 pl-3 pr-1.5 hover:shadow-md transition-shadow relative"
        aria-label="User menu"
      >
        <span className="material-symbols-outlined text-gray-700 text-[18px]">menu</span>
        {currentUser ? (
          <>
            {currentUser.photoURL ? (
              <img src={currentUser.photoURL} alt="Profile" className="w-[30px] h-[30px] rounded-full object-cover ml-1" />
            ) : (
              <div className="w-[30px] h-[30px] rounded-full bg-gray-900 text-white flex items-center justify-center text-[12px] font-bold ml-1">
                {currentUser.email ? currentUser.email[0].toUpperCase() : 'U'}
              </div>
            )}
            {/* Notification dot */}
            <div className="absolute top-1.5 right-1 w-2.5 h-2.5 bg-[#FF385C] rounded-full border-2 border-white"></div>
          </>
        ) : (
          <span className="material-symbols-outlined text-gray-500 text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
        )}
      </button>

      {isOpen && currentUser && (
        <div className="absolute right-0 top-14 w-[240px] bg-white rounded-xl shadow-[0_2px_16px_rgba(0,0,0,0.12)] py-2 z-50 text-[14px]">
          <Link to="/wishlists" className="block px-4 py-3 hover:bg-gray-100 font-semibold text-gray-800" onClick={() => setIsOpen(false)}>Wishlists</Link>
          <Link to="/trips" className="block px-4 py-3 hover:bg-gray-100 font-semibold text-gray-800" onClick={() => setIsOpen(false)}>Trips</Link>
          <Link to="/messages" className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 font-semibold text-gray-800" onClick={() => setIsOpen(false)}>
            Messages
            <span className="bg-[#FF385C] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">1</span>
          </Link>
          <Link to="/account" className="block px-4 py-3 hover:bg-gray-100 font-semibold text-gray-800 border-b border-gray-200" onClick={() => setIsOpen(false)}>Profile</Link>
          
          <Link to="/notifications" className="block px-4 py-3 hover:bg-gray-100 text-gray-800" onClick={() => setIsOpen(false)}>Notifications</Link>
          <Link to="/account" className="block px-4 py-3 hover:bg-gray-100 text-gray-800" onClick={() => setIsOpen(false)}>Account settings</Link>
          <div className="block px-4 py-3 hover:bg-gray-100 text-gray-800 cursor-pointer">Languages & currency</div>
          <div className="block px-4 py-3 hover:bg-gray-100 text-gray-800 border-b border-gray-200 cursor-pointer">Help Centre</div>
          
          <Link to="/host/get-started" className="block px-4 py-3 hover:bg-gray-100 text-gray-800" onClick={() => setIsOpen(false)}>Become a host</Link>
          <div className="block px-4 py-3 hover:bg-gray-100 text-gray-800 cursor-pointer">Refer a host</div>
          <div className="block px-4 py-3 hover:bg-gray-100 text-gray-800 border-b border-gray-200 cursor-pointer">Find a co-host</div>
          
          <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-800">Log out</button>
        </div>
      )}
    </div>
  );
}
