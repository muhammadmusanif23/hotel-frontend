import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/common/Spinner';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';
import { cancelBooking, fetchMyBookings, updateBooking } from '../../services/hotelApi';
import { formatDate, formatMoney, toInputDate } from '../../utils/format';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ checkInDate: '', checkOutDate: '', guests: 1 });
  const [busy, setBusy] = useState(false);

  const load = () =>
    fetchMyBookings()
      .then((data) => setBookings(data.bookings || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const onCancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      await cancelBooking(id);
      await load();
    } catch (err) {
      alert(err.message);
    }
  };

  const openEdit = (booking) => {
    setEditing(booking);
    setForm({
      checkInDate: toInputDate(booking.checkInDate),
      checkOutDate: toInputDate(booking.checkOutDate),
      guests: booking.guests,
    });
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await updateBooking(editing._id, form);
      setEditing(null);
      await load();
    } catch (err) {
      alert(err.message);
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-serif text-4xl text-forest">My bookings</h1>
      {error && <p className="mt-4 text-rose-700">{error}</p>}
      {bookings.length === 0 && !error && (
        <p className="mt-8 text-pine">
          No stays yet. <Link to="/hotels" className="text-gold-dark underline">Find a hotel</Link>
        </p>
      )}
      <div className="mt-8 space-y-4">
        {bookings.map((b) => (
          <article key={b._id} className="rounded-2xl bg-white p-5 ring-1 ring-mist">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-serif text-2xl text-forest">{b.hotelId?.name}</p>
                <p className="text-sm text-pine">{b.roomId?.roomType}</p>
                <p className="mt-2 text-sm">
                  {formatDate(b.checkInDate)} → {formatDate(b.checkOutDate)} · {b.guests} guests
                </p>
              </div>
              <div className="text-right">
                <StatusBadge status={b.status} />
                <p className="mt-2 font-semibold">{formatMoney(b.totalPrice)}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              {b.status === 'pending' && (
                <>
                  <Link to={`/pay/${b._id}`} className="rounded-full bg-forest px-4 py-1.5 text-cream">
                    Pay now
                  </Link>
                  <button type="button" onClick={() => openEdit(b)} className="underline text-pine">
                    Modify dates
                  </button>
                </>
              )}
              {['pending', 'confirmed'].includes(b.status) && (
                <button type="button" onClick={() => onCancel(b._id)} className="text-rose-700 underline">
                  Cancel
                </button>
              )}
            </div>
          </article>
        ))}
      </div>

      {editing && (
        <Modal title="Modify booking" onClose={() => setEditing(null)}>
          <form onSubmit={saveEdit} className="space-y-3">
            <label className="block text-sm">
              Check-in
              <input
                type="date"
                className="mt-1 w-full rounded-xl border border-mist px-3 py-2"
                value={form.checkInDate}
                onChange={(e) => setForm({ ...form, checkInDate: e.target.value })}
              />
            </label>
            <label className="block text-sm">
              Check-out
              <input
                type="date"
                className="mt-1 w-full rounded-xl border border-mist px-3 py-2"
                value={form.checkOutDate}
                onChange={(e) => setForm({ ...form, checkOutDate: e.target.value })}
              />
            </label>
            <label className="block text-sm">
              Guests
              <input
                type="number"
                min="1"
                className="mt-1 w-full rounded-xl border border-mist px-3 py-2"
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
              />
            </label>
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-full bg-forest py-2 font-semibold text-cream"
            >
              Save changes
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
