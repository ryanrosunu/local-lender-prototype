import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateReview } from '../dataconnect/react';
import { findUserByDisplayName } from '../dataconnect';
import { useAppContext } from '../context/AppContext';

export const ReviewForm = () => {
  const { currentUser } = useAppContext();
  const queryClient = useQueryClient();
  const { mutateAsync: createReview, isPending } = useCreateReview();

  const [reviewedUserName, setReviewedUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: { preventDefault(): void }) => {
    event.preventDefault();
    setError('');

    const { data } = await findUserByDisplayName({ displayName: reviewedUserName });
    const match = data?.users?.[0];

    if (!match) {
      setError(`No user found with the name "${reviewedUserName}". They must have signed in at least once.`);
      return;
    }

    await createReview({ reviewedUserUid: match.uid, rating, comment });
    await queryClient.invalidateQueries();
    setReviewedUserName('');
    setComment('');
    setRating(5);
    setStatus('Review submitted.');
  };

  if (!currentUser) return null;

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Leave a review</h2>
      <p className="mt-1 text-xs text-slate-500">Reviewing as {currentUser.displayName}</p>

      <label className="mt-4 block text-sm font-medium text-slate-700">
        Who are you reviewing?
        <input
          required
          value={reviewedUserName}
          onChange={(e) => { setReviewedUserName(e.target.value); setError(''); }}
          placeholder="Their display name"
          className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
        />
      </label>

      <label className="mt-4 block text-sm font-medium text-slate-700">
        Rating
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
        >
          {[5, 4, 3, 2, 1].map((v) => (
            <option key={v} value={v}>{v} stars</option>
          ))}
        </select>
      </label>

      <label className="mt-4 block text-sm font-medium text-slate-700">
        Comment
        <textarea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share how the interaction went"
          className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
        />
      </label>

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={isPending}
        className="mt-4 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
      >
        {isPending ? 'Submitting…' : 'Submit review'}
      </button>

      {status ? <p className="mt-3 text-sm text-slate-600">{status}</p> : null}
    </form>
  );
};
