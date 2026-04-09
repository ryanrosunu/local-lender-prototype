import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateLendingRequest } from '../dataconnect/react';
import { useAppContext } from '../context/AppContext';
import type { Listing } from '../types/listing';
import type { LendingRequestFormValues } from '../types/lendingRequest';
import { formatCurrency } from '../utilities/formatCurrency';

interface ListingModalProps {
  listing: Listing | null;
  ownerRating?: number;
  onClose: () => void;
  onRequestSent: (listing: Listing) => void;
  onDirectMessage: (listing: Listing) => void;
}

export const ListingModal = ({ listing, ownerRating, onClose, onRequestSent, onDirectMessage }: ListingModalProps) => {
  const { currentUser } = useAppContext();
  const queryClient = useQueryClient();
  const { mutateAsync: createLendingRequest, isPending } = useCreateLendingRequest();

  const [showRequestForm, setShowRequestForm] = useState(false);
  const [values, setValues] = useState<LendingRequestFormValues>({
    borrowerNotes: '',
    startDate: '',
    endDate: '',
  });

  if (!listing) return null;

  const isAvailable = listing.status === 'available';

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

  const ratingLabel = typeof ownerRating === 'number' ? `${ownerRating.toFixed(1)} ★` : "No Rating Yet";

  const handleRequestSubmit = async (event: { preventDefault(): void }) => {
    event.preventDefault();
    await createLendingRequest({
      itemId: listing.id,
      lenderUid: listing.lenderId,
      borrowerNotes: values.borrowerNotes,
      startDate: values.startDate || null,
      endDate: values.endDate || null,
    });
    await queryClient.invalidateQueries();
    setShowRequestForm(false);
    setValues({ borrowerNotes: '', startDate: '', endDate: '' });
    onRequestSent(listing);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={() => { setShowRequestForm(false); onClose(); }}
          aria-label="Close listing modal"
          className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-slate-700 shadow"
        >
          Close
        </button>

        <div className="aspect-video w-full bg-slate-100">
          {listing.imageUrl ? (
            <img src={listing.imageUrl} alt={listing.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-500">No photo</div>
          )}
        </div>

        <div className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{listing.category}</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">{listing.title}</h2>
              <p className="mt-2 text-sm text-slate-500">
                Owner: <b>{listing.lenderName}</b>
                {ratingLabel ? ` (${ratingLabel})` : ''}
              </p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[listing.status]}`}>
              {statusLabel[listing.status]}
            </span>
          </div>

          <p className="mt-4 text-sm leading-7 text-slate-600">{listing.description}</p>

          <div className="mt-5 grid gap-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Location</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{listing.locationDetails}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Price</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{formatCurrency(listing.price)}/day</p>
            </div>
          </div>

          {showRequestForm ? (
            <form onSubmit={handleRequestSubmit} className="mt-6 space-y-4 rounded-2xl border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-900">Send a borrow request</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Start date
                  <input
                    type="date"
                    value={values.startDate}
                    onChange={(e) => setValues((v) => ({ ...v, startDate: e.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  End date
                  <input
                    type="date"
                    value={values.endDate}
                    onChange={(e) => setValues((v) => ({ ...v, endDate: e.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                  />
                </label>
              </div>

              <label className="block text-sm font-medium text-slate-700">
                Notes for the lender
                <textarea
                  required
                  rows={3}
                  value={values.borrowerNotes}
                  onChange={(e) => setValues((v) => ({ ...v, borrowerNotes: e.target.value }))}
                  placeholder="When you need it, how you'll use it, etc."
                  className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
                />
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                >
                  {isPending ? 'Sending…' : 'Send request'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowRequestForm(false)}
                  className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => onDirectMessage(listing)}
                className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Direct message owner
              </button>
              <button
                type="button"
                disabled={!isAvailable}
                onClick={() => {
                  if (!currentUser) { onDirectMessage(listing); return; }
                  setShowRequestForm(true);
                }}
                className="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {currentUser ? 'Request to borrow' : 'Sign in to request'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
