import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

export const seedFirestore = async () => {
  const listings = [
    {
      ownerName: 'Jordan',
      title: 'Cordless Drill',
      description: 'Compact drill with charger and two batteries.',
      pricePerDay: 8,
      locationText: 'Near Hyde Park',
      category: 'Tools',
      isAvailable: true,
      imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=80',
    },
    {
      ownerName: 'Priya',
      title: 'Basketball',
      description: 'Indoor-outdoor basketball in great condition.',
      pricePerDay: 4,
      locationText: 'Near South Loop',
      category: 'Sports',
      isAvailable: true,
      imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=80',
    },
    {
      ownerName: 'Alex',
      title: 'Projector',
      description: 'Portable projector with HDMI cable included.',
      pricePerDay: 15,
      locationText: 'Near Pilsen',
      category: 'Electronics',
      isAvailable: false,
      imageUrl: 'https://images.unsplash.com/photo-1528395874238-34ebe249b3f2?auto=format&fit=crop&w=900&q=80',
    },
  ];

  const reviews = [
    {
      reviewerName: 'Maya',
      revieweeName: 'Jordan',
      rating: 5,
      comment: 'Easy pickup and return. The drill worked perfectly.',
    },
  ];

  for (const listing of listings) {
    await addDoc(collection(db, 'listings'), listing);
  }
  for (const review of reviews) {
    await addDoc(collection(db, 'reviews'), review);
  }

  console.log('Seeded Firestore with initial listings and reviews.');
};
