import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth, db, signInWithGoogle, signOutUser } from '../firebase';
import type { Listing, ListingFormValues } from '../types/listing';
import type { Review, ReviewFormValues } from '../types/review';

interface AppContextValue {
  currentUser: User | null;
  currentUserName: string;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  listings: Listing[];
  reviews: Review[];
  addListing: (values: ListingFormValues) => void;
  updateListing: (listingId: string, values: ListingFormValues) => void;
  updateListingAvailability: (listingId: string, current: boolean) => void;
  deleteListing: (listingId: string) => void;
  addReview: (values: ReviewFormValues) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setCurrentUser);
  }, []);

  useEffect(() => {
    return onSnapshot(collection(db, 'listings'), (snapshot) => {
      setListings(
        snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Listing))
      );
    });
  }, []);

  useEffect(() => {
    return onSnapshot(collection(db, 'reviews'), (snapshot) => {
      setReviews(
        snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Review))
      );
    });
  }, []);

  const currentUserName = currentUser?.displayName ?? '';

  const signIn = async () => { await signInWithGoogle(); };
  const signOut = async () => { await signOutUser(); };

  const addListing = (values: ListingFormValues) => {
    addDoc(collection(db, 'listings'), {
      ownerName: currentUserName,
      ...values,
      isAvailable: true,
    });
  };

  const updateListing = (listingId: string, values: ListingFormValues) => {
    updateDoc(doc(db, 'listings', listingId), { ...values });
  };

  const updateListingAvailability = (listingId: string, current: boolean) => {
    updateDoc(doc(db, 'listings', listingId), { isAvailable: !current });
  };

  const deleteListing = (listingId: string) => {
    deleteDoc(doc(db, 'listings', listingId));
  };

  const addReview = (values: ReviewFormValues) => {
    addDoc(collection(db, 'reviews'), { ...values });
  };

  const value = useMemo(
    () => ({
      currentUser,
      currentUserName,
      signIn,
      signOut,
      listings,
      reviews,
      addListing,
      updateListing,
      updateListingAvailability,
      deleteListing,
      addReview,
    }),
    [currentUser, listings, reviews],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }

  return context;
};
