import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth, signInWithGoogle, signOutUser } from '../firebase';
import { upsertUser } from '../dataconnect';

interface AppContextValue {
  currentUser: User | null;
  authLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
      if (user) {
        // Upsert user profile into Data Connect on every sign-in
        await upsertUser({
          displayName: user.displayName ?? '',
          email: user.email ?? '',
          photoUrl: user.photoURL,
        }).catch(() => {
          // Non-fatal: profile sync failure shouldn't block the app
        });
      }
    });
  }, []);

  const signIn = async () => { await signInWithGoogle(); };
  const signOut = async () => { await signOutUser(); };

  return (
    <AppContext.Provider value={{ currentUser, authLoading, signIn, signOut }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
