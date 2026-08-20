import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const { currentUser, showAuthModal } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) {
      showAuthModal();
    }
  }, [currentUser, showAuthModal]);

  if (!currentUser) {
    // Redirect to home if they cancel auth, or they can stay and modal handles it.
    // For now, redirecting to home to keep routes clean if unauthorized.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
