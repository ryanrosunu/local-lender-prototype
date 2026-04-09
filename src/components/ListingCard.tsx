import type { Listing } from '../types/listing';
import { formatCurrency } from '../utilities/formatCurrency';

interface ListingCardProps {
  listing: Listing;
  ownerRating?: number;
  onClick?: (listing: Listing) => void;
}

export const ListingCard = ({ listing, ownerRating, onClick }: ListingCardProps) => {
  const ratingLabel = typeof ownerRating === 'number' ? `${ownerRating.toFixed(1)} ★` : "No Rating Yet";
  const statusLabel: Record<typeof listing.status, string> = {
    available: 'Available',
    lent: 'Lent out',
    unavailable: 'Unavailable',
  };

  const statusStyle: Record<typeof listing.status, string> = {
    available: 'bg-emerald-100 text-emerald-700',
    lent: 'bg-sky-100 text-sky-700',
    unavailable: 'bg-amber-100 text-amber-700',
  };

  return (
    <button
      type="button"
      onClick={() => {
        onClick?.(listing);
      }}
      className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="aspect-[4/3] w-full bg-slate-100">
        {listing.imageUrl ? (
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            No photo
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              {listing.category}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">{listing.title}</h3>
            <p className="mt-1 text-sm text-slate-500">
              Owner: <b>{listing.lenderName}</b>
              {ratingLabel ? ` (${ratingLabel})` : ''}
            </p>
          </div>

          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[listing.status]}`}>
            {statusLabel[listing.status]}
          </span>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">{listing.description}</p>

        <div className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-600">
          <span>{listing.locationDetails}</span>
          <span className="font-semibold text-slate-900">
            {formatCurrency(listing.price)}/day
          </span>
        </div>
      </div>
    </button>
  );
};
