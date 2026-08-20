import { Link } from 'react-router-dom';

export default function MessagesPage() {
  return (
    <div className="h-screen flex flex-col bg-white">
      <nav className="h-16 border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
         <Link to="/" className="text-[#FF385C]">
            <img src="https://1000logos.net/wp-content/uploads/2017/08/Airbnb-Logo.png" alt="Airbnb" className="h-8 object-contain" />
         </Link>
      </nav>
      
      <div className="flex flex-1 overflow-hidden">
         {/* Inbox List */}
         <div className="w-[350px] border-r border-gray-200 flex flex-col">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
               <h2 className="text-[20px] font-bold">Messages</h2>
               <button className="p-2 hover:bg-gray-100 rounded-full">
                  <span className="material-symbols-outlined text-[20px]">filter_list</span>
               </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center text-center">
               <span className="material-symbols-outlined text-[48px] text-gray-300 mb-4">forum</span>
               <h3 className="font-semibold text-gray-900 mb-1">You have no unread messages</h3>
               <p className="text-sm text-gray-500">When you contact a host or receive a message, it will show up here.</p>
            </div>
         </div>
         
         {/* Conversation Detail */}
         <div className="flex-1 bg-gray-50 flex items-center justify-center">
             <div className="text-center p-6">
                <p className="text-gray-500 font-medium">Select a conversation to start reading</p>
             </div>
         </div>
      </div>
    </div>
  );
}
