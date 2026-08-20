import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/common/Spinner';
import {
  adminCreateRoom,
  adminRooms,
  adminUpdateRoom,
  adminUpload,
} from '../../services/hotelApi';
import { amenityList, imageUrl } from '../../utils/format';

const empty = {
  roomType: '',
  pricePerNight: 100,
  capacity: 2,
  totalUnits: 1,
  amenities: '',
  images: [],
  isActive: true,
};

export default function RoomForm() {
  const { hotelId, id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(isEdit);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    adminRooms(hotelId)
      .then((data) => {
        const room = data.rooms.find((r) => r._id === id);
        if (!room) throw new Error('Room not found');
        setForm({
          roomType: room.roomType,
          pricePerNight: room.pricePerNight,
          capacity: room.capacity,
          totalUnits: room.totalUnits,
          amenities: (room.amenities || []).join(', '),
          images: room.images || [],
          isActive: room.isActive,
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [hotelId, id, isEdit]);

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
      roomType: form.roomType,
      pricePerNight: Number(form.pricePerNight),
      capacity: Number(form.capacity),
      totalUnits: Number(form.totalUnits),
      amenities: amenityList(form.amenities),
      images: form.images,
      isActive: form.isActive,
    };
    try {
      if (isEdit) await adminUpdateRoom(hotelId, id, payload);
      else await adminCreateRoom(hotelId, payload);
      navigate(`/admin/hotels/${hotelId}/rooms`);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-4xl text-forest">{isEdit ? 'Edit room' : 'New room type'}</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl bg-white p-6 ring-1 ring-mist">
        <label className="block text-sm">
          Room type
          <input
            required
            className="mt-1 w-full rounded-xl border border-mist px-3 py-2"
            value={form.roomType}
            onChange={(e) => setForm({ ...form, roomType: e.target.value })}
          />
        </label>
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="text-sm">
            Price / night
            <input
              type="number"
              min="0"
              className="mt-1 w-full rounded-xl border border-mist px-3 py-2"
              value={form.pricePerNight}
              onChange={(e) => setForm({ ...form, pricePerNight: e.target.value })}
            />
          </label>
          <label className="text-sm">
            Capacity
            <input
              type="number"
              min="1"
              className="mt-1 w-full rounded-xl border border-mist px-3 py-2"
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: e.target.value })}
            />
          </label>
          <label className="text-sm">
            Total units
            <input
              type="number"
              min="1"
              className="mt-1 w-full rounded-xl border border-mist px-3 py-2"
              value={form.totalUnits}
              onChange={(e) => setForm({ ...form, totalUnits: e.target.value })}
            />
          </label>
        </div>
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
          Active
        </label>
        {error && <p className="text-sm text-rose-700">{error}</p>}
        <button type="submit" disabled={busy} className="rounded-full bg-forest px-5 py-2 font-semibold text-cream">
          {busy ? 'Saving…' : 'Save room'}
        </button>
      </form>
    </div>
  );
}
