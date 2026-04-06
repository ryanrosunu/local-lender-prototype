import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { ListingCard } from '../components/ListingCard';
import { ReviewForm } from '../components/ReviewForm';
import { useAppContext } from '../context/AppContext';
import type { Listing } from '../types/listing';
import type { ListingFormValues } from '../types/listing';

export const AccountPage = () => {
  const { currentUser, currentUserName, signIn, signOut, listings, reviews, updateListing, updateListingAvailability, deleteListing } =
    useAppContext();

  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [editValues, setEditValues] = useState<ListingFormValues>({
    title: '',
    description: '',
    pricePerDay: 0,
    locationText: '',
    category: 'Tools',
    imageUrl: '',
  });
  const [imagePreview, setImagePreview] = useState('');

  const myListings = useMemo(() => {
    return listings.filter((listing) => listing.ownerName === currentUserName);
  }, [currentUserName, listings]);

  const myReviews = useMemo(() => {
    return reviews.filter((review) => review.revieweeName === currentUserName);
  }, [currentUserName, reviews]);

  const averageRating = useMemo(() => {
    if (myReviews.length === 0) {
      return null;
    }

    const total = myReviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / myReviews.length).toFixed(1);
  }, [myReviews]);

  const handleEditClick = (listing: Listing) => {
    setEditingListing(listing);
    setEditValues({
      title: listing.title,
      description: listing.description,
      pricePerDay: listing.pricePerDay,
      locationText: listing.locationText,
      category: listing.category,
      imageUrl: listing.imageUrl,
    });
    setImagePreview(listing.imageUrl);
  };

  const handleEditChange = <K extends keyof ListingFormValues>(
    field: K,
    value: ListingFormValues[K],
  ) => {
    setEditValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      setImagePreview(result);
      handleEditChange('imageUrl', result);
    };

    reader.readAsDataURL(file);
  };

  const handleEditSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editingListing) {
      updateListing(editingListing.id, {
        ...editValues,
        imageUrl: editValues.imageUrl || imagePreview,
      });
      setEditingListing(null);
    }
  };

  const handleEditCancel = () => {
    setEditingListing(null);
    setImagePreview('');
  };

  if (!currentUser) {
    return (
      <main className="mx-auto flex max-w-sm flex-col items-center gap-6 px-4 py-24">
        <h1 className="text-2xl font-bold text-slate-900">Sign in to LocalLender</h1>
        <p className="text-center text-sm text-slate-600">
          Sign in with your Google account to manage your listings and account.
        </p>
        <button
          type="button"
          onClick={signIn}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <svg className="h-5 w-5" viewBox="0 0 48 48">
            <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
            <path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16.2 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.7 7.4 6.3 14.7z"/>
            <path fill="#FBBC05" d="M24 46c5.9 0 10.9-2 14.5-5.4l-6.7-5.5C29.8 36.8 27 37.8 24 37.8c-6.1 0-11.3-4.1-13.2-9.7l-7 5.4C7.5 41.5 15.1 46 24 46z"/>
            <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-1 2.8-2.9 5.1-5.3 6.6l6.7 5.5C41.8 37.3 44.5 31.1 44.5 24c0-1.3-.2-2.7-.5-4z"/>
          </svg>
          Continue with Google
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-slate-900">Welcome back, {currentUserName}</h1>
            <button
              type="button"
              onClick={signOut}
              className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Sign out
            </button>
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Manage your listings and keep your trust profile strong.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Your listings</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{myListings.length}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Reviews received</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{myReviews.length}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Average rating</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{averageRating ?? '—'}</p>
            </div>
          </div>
        </div>

        <ReviewForm />
      </section>

      <section className="mt-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-slate-900">Your listings</h2>
          <span className="text-sm text-slate-500">Edit details, toggle availability, or delete any listing</span>
        </div>

        {myListings.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-600">
            You have not listed anything yet.
          </p>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {myListings.map((listing) => (
              <div key={listing.id} className="space-y-3">
                {editingListing?.id === listing.id ? (
                  <form onSubmit={handleEditSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900">Edit listing</h3>

                    <div className="mt-4 space-y-4">
                      <label className="block text-sm font-medium text-slate-700">
                        Title
                        <input
                          required
                          value={editValues.title}
                          onChange={(event) => {
                            handleEditChange('title', event.target.value);
                          }}
                          className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                        />
                      </label>

                      <label className="block text-sm font-medium text-slate-700">
                        Description
                        <textarea
                          required
                          rows={3}
                          value={editValues.description}
                          onChange={(event) => {
                            handleEditChange('description', event.target.value);
                          }}
                          className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                        />
                      </label>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block text-sm font-medium text-slate-700">
                          Price per day
                          <input
                            required
                            min={0}
                            type="number"
                            value={editValues.pricePerDay}
                            onChange={(event) => {
                              handleEditChange('pricePerDay', Number(event.target.value));
                            }}
                            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                          />
                        </label>

                        <label className="block text-sm font-medium text-slate-700">
                          Category
                          <select
                            value={editValues.category}
                            onChange={(event) => {
                              handleEditChange('category', event.target.value);
                            }}
                            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                          >
                            <option value="Tools">Tools</option>
                            <option value="Home">Home</option>
                            <option value="Outdoor">Outdoor</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Sports">Sports</option>
                            <option value="Other">Other</option>
                          </select>
                        </label>
                      </div>

                      <label className="block text-sm font-medium text-slate-700">
                        Location
                        <input
                          required
                          value={editValues.locationText}
                          onChange={(event) => {
                            handleEditChange('locationText', event.target.value);
                          }}
                          className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                        />
                      </label>

                      <label className="block text-sm font-medium text-slate-700">
                        Photo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="mt-2 block w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-700"
                        />
                      </label>

                      {imagePreview ? (
                        <div className="overflow-hidden rounded-3xl border border-slate-200">
                          <img src={imagePreview} alt="Preview" className="h-48 w-full object-cover" />
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <button
                        type="submit"
                        className="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
                      >
                        Save changes
                      </button>
                      <button
                        type="button"
                        onClick={handleEditCancel}
                        className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <ListingCard listing={listing} />
                    <div className="grid gap-3 sm:grid-cols-3">
                      <button
                        type="button"
                        onClick={() => handleEditClick(listing)}
                        className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Edit details
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          updateListingAvailability(listing.id, listing.isAvailable);
                        }}
                        className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Mark as {listing.isAvailable ? 'unavailable' : 'available'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          deleteListing(listing.id);
                        }}
                        className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 hover:bg-red-100"
                      >
                        Delete listing
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Recent reviews</h2>

        {myReviews.length === 0 ? (
          <p className="mt-4 text-sm text-slate-600">No reviews yet.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {myReviews.map((review) => (
              <article key={review.id} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium text-slate-900">{review.reviewerName}</p>
                  <p className="text-sm text-slate-600">{review.rating}/5</p>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  {review.comment || 'No written comment.'}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};
