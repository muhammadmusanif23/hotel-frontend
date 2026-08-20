import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/common/Spinner';
import {
  adminCreateHotel,
  adminHotels,
  adminUpdateHotel,
  adminUpload,
} from '../../services/hotelApi';
import { amenityList, imageUrl } from '../../utils/format';

const empty = {
  name: '',
  city: '',
  country: '',
  address: '',
  description: '',
  amenities: '',
  images: [],
  isActive: true,
};

export default function HotelForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(isEdit);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    adminHotels()
      .then((data) => {
        const hotel = data.hotels.find((h) => h._id === id);
        if (!hotel) throw new Error('Hotel not found');
        setForm({
          name: hotel.name,
          city: hotel.location?.city || '',
          country: hotel.location?.country || '',
          address: hotel.location?.address || '',
          description: hotel.description || '',
          amenities: (hotel.amenities || []).join(', '),
          images: hotel.images || [],
          isActive: hotel.isActive,
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const onFiles = async (e) => {
    const files = e.target.files;
    if (!files?.length) return;
    try {
      const data = await adminUpload(files);
      setForm((prev) => ({ ...prev, images: [...prev.images, ...data.images] }));
    } catch (err) {
      alert(err.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const payload = {
      name: form.name,
      location: { city: form.city, country: form.country, address: form.address },
      description: form.description,
      amenities: amenityList(form.amenities),
      images: form.images,
      isActive: form.isActive,
    };
    try {
      if (isEdit) await adminUpdateHotel(id, payload);
      else await adminCreateHotel(payload);
      navigate('/admin/hotels');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-4xl text-forest">{isEdit ? 'Edit hotel' : 'New hotel'}</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl bg-white p-6 ring-1 ring-mist">
        {['name', 'city', 'country', 'address'].map((field) => (
          <label key={field} className="block text-sm capitalize">
            {field}
            <input
              required={field !== 'address'}
              className="mt-1 w-full rounded-xl border border-mist px-3 py-2"
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          </label>
        ))}
        <label className="block text-sm">
          Description
          <textarea
            rows="4"
            className="mt-1 w-full rounded-xl border border-mist px-3 py-2"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </label>
        <label className="block text-sm">
          Amenities (comma separated)
          <input
            className="mt-1 w-full rounded-xl border border-mist px-3 py-2"
            value={form.amenities}
            onChange={(e) => setForm({ ...form, amenities: e.target.value })}
          />
        </label>
        <label className="block text-sm">
          Photos
          <input type="file" accept="image/*" multiple className="mt-1 block" onChange={onFiles} />
        </label>
        <div className="flex flex-wrap gap-2">
          {form.images.map((src) => (
            <img key={src} src={imageUrl(src)} alt="" className="h-16 w-20 rounded-lg object-cover" />
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
          />
          Active / visible to guests
        </label>
        {error && <p className="text-sm text-rose-700">{error}</p>}
        <button type="submit" disabled={busy} className="rounded-full bg-forest px-5 py-2 font-semibold text-cream">
          {busy ? 'Saving…' : 'Save hotel'}
        </button>
      </form>
    </div>
  );
}
