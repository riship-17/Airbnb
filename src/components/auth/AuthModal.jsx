import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function AuthModal() {
  const { isModalOpen, closeAuthModal, loginWithGoogle, loginWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  if (!isModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required.');
      return;
    }
    
    if (step === 1) {
      setStep(2);
      setError('');
      return;
    }

    if (step === 2) {
      if (!password) {
        setError('Password is required.');
        return;
      }
      try {
        setLoading(true);
        setError('');
        await loginWithEmail(email, password);
      } catch (err) {
        setError(err.message || 'Failed to log in or sign up. Please try again.');
        setLoading(false);
      }
    }
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);
      setError('');
      await loginWithGoogle();
    } catch (err) {
      setError('Failed to log in with Google.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] h-screen w-screen overflow-hidden flex flex-col">
      <style>
        {`
          .bg-airbnb-red { background-color: #FF385C; }
          .text-airbnb-red { color: #FF385C; }
          .bg-image-grid {
            background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuB3sMU0YzNHoSUW4QB3x6owwFNSrp9_Wgf9xFWDIHepXqCFdtBOW4zraQ2FOOpDSKMNjhV-5AuMCq-UlgH1F3HZEzfQmt5-bCZ969OtdKLdxGcBvw6NtC3ba7pl-hv5QYfHJvGec9j1Tt0_yBSEpJPqpqi0np00LMenHzCjOEZ90X4QRCjYdzyldg37b77XsYb4yt2hBYteVxt9BJqXJ5OE3G06vyNcTWqttmLnOVUNomr50R37BTSP145bJlVlv4mc7A');
            background-size: cover;
            background-position: center;
            filter: brightness(0.9) blur(2px);
            position: absolute;
            inset: 0;
            z-index: 0;
          }
          .modal-shadow { box-shadow: 0 8px 28px rgba(0,0,0,0.28); }
        `}
      </style>

      {/* BEGIN: Background Image Grid */}
      <div aria-hidden="true" className="bg-image-grid"></div>
      {/* END: Background Image Grid */}

      {/* BEGIN: Top Navigation Bar */}
      <header className="relative w-full bg-white px-10 py-5 flex justify-between items-center z-10 border-b border-gray-200 shadow-sm flex-shrink-0">
        {/* Logo */}
        <button onClick={closeAuthModal} className="flex items-center text-airbnb-red hover:opacity-80 transition-opacity">
          <img src="https://1000logos.net/wp-content/uploads/2017/08/Airbnb-Logo.png" alt="Airbnb" className="h-8 object-contain" />
          <span className="font-bold text-xl ml-2 tracking-tighter hidden md:block">airbnb</span>
        </button>
        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <button onClick={closeAuthModal} className="hover:bg-gray-100 px-4 py-2 rounded-full transition-colors font-semibold text-sm">Cancel</button>
        </div>
      </header>
      {/* END: Top Navigation Bar */}

      {/* BEGIN: Main Login Area */}
      <main className="h-full flex items-center justify-center pt-20 px-4 relative z-10">
        {/* Login Modal */}
        <div className="bg-white rounded-3xl w-full max-w-[568px] p-8 pb-10 modal-shadow relative">
          {/* Logo Icon */}
          <div className="flex justify-center mb-6 text-airbnb-red relative">
            {step === 2 && (
              <button 
                type="button" 
                onClick={() => setStep(1)} 
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition-colors text-black"
              >
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: 3, overflow: 'visible' }}><g fill="none"><path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path></g></svg>
              </button>
            )}
            <img src="https://1000logos.net/wp-content/uploads/2017/08/Airbnb-Logo.png" alt="Airbnb" className="h-8 object-contain" />
          </div>
          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-[#222222] mb-8">{step === 1 ? 'Log in or sign up' : 'Enter your password'}</h1>
          
          {error && (
             <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
               {error}
             </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-5 relative">
              {step === 1 ? (
                <input 
                  className="w-full border border-gray-300 rounded-2xl px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder-gray-500" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Phone number or email" 
                  type="email"
                  autoFocus
                />
              ) : (
                <input 
                  className="w-full border border-gray-300 rounded-2xl px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder-gray-500" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password" 
                  type="password"
                  autoFocus
                />
              )}
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-airbnb-red text-white font-semibold text-lg py-4 rounded-xl hover:bg-pink-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Continue'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink-0 mx-4 text-xs text-gray-500 font-medium">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-center space-x-4">
            <button 
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="w-14 h-14 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
            >
              <svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"><path d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" fill="#4285F4"></path><path d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" fill="#34A853"></path><path d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" fill="#FBBC05"></path><path d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" fill="#EA4335"></path></g></svg>
            </button>
            <button 
              type="button"
              className="w-14 h-14 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-black"
            >
              <svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.62-1.496 3.609-2.998 1.16-1.703 1.636-3.338 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.701z"></path></svg>
            </button>
          </div>
        </div>
      </main>
      {/* END: Main Login Area */}
    </div>
  );
}
