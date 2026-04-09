import { useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useListItems, useListReviews } from '../dataconnect/react';
import { ListingCard } from '../components/ListingCard';
import { ListingModal } from '../components/ListingModal';
import { SearchBar } from '../components/SearchBar';
import type { Listing } from '../types/listing';
import type { ListItemsData } from '../dataconnect';

function mapItem(item: ListItemsData['items'][0]): Listing {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    createdAt: item.createdAt,
    status: (item.status as Listing['status']) || 'available',
    price: item.price ?? 0,
    imageUrl: item.imageUrl ?? '',
    locationDetails: item.locationDetails ?? '',
    category: item.category ?? '',
    lenderId: item.lender?.uid ?? '',
    lenderName: item.lender?.displayName ?? '',
  };
}

export const ExplorePage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useListItems();
  const { data: reviewsData } = useListReviews();
  const listings = useMemo(() => (data?.items ?? []).map(mapItem), [data]);
  const reviews = useMemo(() => reviewsData?.reviews ?? [], [reviewsData]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const ownerRatings = useMemo(() => {
    const ratingMap = new Map<string, { total: number; count: number }>();

    reviews.forEach((review) => {
      const revieweeName = review.reviewedUser?.displayName;
      if (!revieweeName) return;
      const existing = ratingMap.get(revieweeName);
      if (existing) {
        ratingMap.set(revieweeName, {
          total: existing.total + review.rating,
          count: existing.count + 1,
        });
      } else {
        ratingMap.set(revieweeName, { total: review.rating, count: 1 });
      }
    });

    return new Map(
      Array.from(ratingMap.entries()).map(([name, data]) => [name, data.total / data.count]),
    );
  }, [reviews]);

  const filteredListings = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return listings;
    return listings.filter((l) =>
      `${l.title} ${l.description} ${l.locationDetails} ${l.category}`.toLowerCase().includes(q),
    );
  }, [listings, searchTerm]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <section className="rounded-3xl bg-linear-to-br from-emerald-100 via-white to-sky-100 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          High-trust community lending
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Borrow useful things from people nearby.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          LocalLender makes it easy to explore useful items, message owners, send requests,
          and build trust through simple reviews.
        </p>
        <div className="mt-6 max-w-2xl">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
      </section>

      {statusMessage ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {statusMessage}
        </div>
      ) : null}

      <section className="mt-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-slate-900">Popular nearby listings</h2>
          <span className="text-sm text-slate-500">{filteredListings.length} shown</span>
        </div>

        {isLoading ? (
          <p className="mt-4 text-sm text-slate-500">Loading…</p>
        ) : filteredListings.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-600">
            No listings match your search yet.
          </p>
        ) : null}

        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredListings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              ownerRating={ownerRatings.get(listing.lenderName)}
              onClick={setSelectedListing}
            />
          ))}
        </div>
      </section>

      <ListingModal
        listing={selectedListing}
        ownerRating={selectedListing ? ownerRatings.get(selectedListing.lenderName) : undefined}
        onClose={() => setSelectedListing(null)}
        onDirectMessage={(listing) => {
          setStatusMessage(`Message started with ${listing.lenderName} about "${listing.title}".`);
          setSelectedListing(null);
        }}
        onRequestSent={(listing) => {
          queryClient.invalidateQueries();
          setStatusMessage(`Request sent for "${listing.title}". ${listing.lenderName} will be notified.`);
          setSelectedListing(null);
        }}
      />
    </main>
  );
};
