import { useState, type ChangeEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateItem } from '../dataconnect/react';
import { useAppContext } from '../context/AppContext';
import type { ListingFormValues } from '../types/listing';

const initialValues: ListingFormValues = {
  title: '',
  description: '',
  price: 0,
  locationDetails: '',
  category: 'Tools',
  imageUrl: '',
};

export const ListItemPage = () => {
  const { currentUser, authLoading } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: createItem, isPending } = useCreateItem();

  const [values, setValues] = useState<ListingFormValues>(initialValues);
  const [imagePreview, setImagePreview] = useState('');
  const [submitError, setSubmitError] = useState('');

  if (authLoading) return null;
  if (!currentUser) return <Navigate to="/account" replace />;

  const handleChange = <K extends keyof ListingFormValues>(field: K, value: ListingFormValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      setImagePreview(result);
      handleChange('imageUrl', result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: { preventDefault(): void }) => {
    event.preventDefault();
    setSubmitError('');
    try {
      await createItem({
        title: values.title,
        description: values.description,
        price: values.price,
        imageUrl: values.imageUrl || imagePreview || null,
        locationDetails: values.locationDetails,
        category: values.category,
      });
      await queryClient.invalidateQueries();
      navigate('/');
    } catch (err) {
      console.error('createItem failed:', err);
      setSubmitError(err instanceof Error ? err.message : 'Failed to create listing. Check the console for details.');
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">List an item</h1>
        <p className="mt-2 text-sm text-slate-600">
          Add a title, description, price, photo, and your location.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Title
            <input
              required
              value={values.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
              placeholder="Cordless drill"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Description
            <textarea
              required
              rows={4}
              value={values.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
              placeholder="Lightweight drill with charger included"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Price per day
              <input
                required
                min={0}
                type="number"
                value={values.price}
                onChange={(e) => handleChange('price', Number(e.target.value))}
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Category
              <select
                value={values.category}
                onChange={(e) => handleChange('category', e.target.value)}
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
              value={values.locationDetails}
              onChange={(e) => handleChange('locationDetails', e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
              placeholder="Near Hyde Park"
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
              <img src={imagePreview} alt="Listing preview" className="h-56 w-full object-cover" />
            </div>
          ) : null}

          {submitError ? (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {isPending ? 'Creating…' : 'Create listing'}
          </button>
        </form>
      </section>
    </main>
  );
};
