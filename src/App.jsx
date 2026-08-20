import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthModal from './components/auth/AuthModal';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import ListingDetailPage from './pages/ListingDetailPage';
import SearchPage from './pages/SearchPage';
import BookingPage from './pages/BookingPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage';
import TripsPage from './pages/TripsPage';
import WishlistPage from './pages/WishlistPage';
import AccountPage from './pages/AccountPage';
import MessagesPage from './pages/MessagesPage';
import NotificationsPage from './pages/NotificationsPage';
import HostDashboard from './pages/HostDashboard';
import HostOnboardingFlow from './pages/HostOnboardingFlow';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/listing/:listingId" element={<ListingDetailPage />} />

          {/* Protected Guest Routes */}
          <Route path="/booking/:listingId" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
          <Route path="/checkout/:listingId" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="/booking-confirmation/:bookingId" element={<ProtectedRoute><ConfirmationPage /></ProtectedRoute>} />
          <Route path="/trips/*" element={<ProtectedRoute><TripsPage /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
          <Route path="/account/*" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
          <Route path="/messages/*" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />

          {/* Protected Host Routes */}
          <Route path="/host/get-started" element={<ProtectedRoute><HostOnboardingFlow /></ProtectedRoute>} />
          <Route path="/host/*" element={<ProtectedRoute><HostDashboard /></ProtectedRoute>} />
        </Routes>
        <AuthModal />
      </Router>
    </AuthProvider>
  );
}

export default App;
