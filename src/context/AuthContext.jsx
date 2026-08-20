import { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      
      // If user successfully logs in and there was a pending action, execute it
      if (user && pendingAction) {
        pendingAction();
        setPendingAction(null);
      }
    });

    return unsubscribe;
  }, [pendingAction]);

  const showAuthModal = (onSuccess = null) => {
    setPendingAction(() => onSuccess);
    setIsModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsModalOpen(false);
    setPendingAction(null);
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      closeAuthModal();
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      closeAuthModal();
    } catch (error) {
      // If user doesn't exist or wrong credential, try to sign them up automatically
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
         try {
            await createUserWithEmailAndPassword(auth, email, password);
            closeAuthModal();
         } catch (signUpError) {
             if (signUpError.code === 'auth/email-already-in-use') {
                 throw new Error("Incorrect password. Please try again.");
             }
             console.error("Error signing up", signUpError);
             throw new Error("Failed to sign up. Please try again.");
         }
      } else {
        console.error("Error signing in", error);
        throw new Error("Failed to log in. Please try again.");
      }
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    loginWithGoogle,
    loginWithEmail,
    logout,
    isModalOpen,
    showAuthModal,
    closeAuthModal
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
