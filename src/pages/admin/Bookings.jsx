import { useEffect, useState } from 'react';
import Spinner from '../../components/common/Spinner';
import StatusBadge from '../../components/common/StatusBadge';
import { adminBookings, adminHotels, adminUpdateBookingStatus } from '../../services/hotelApi';
import { formatDate, formatMoney } from '../../utils/format';

const statuses = ['pending', 'confirmed', 'checked-in', 'checked-out', 'cancelled'];

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [filters, setFilters] = useState({ from: '', to: '', hotelId: '', status: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = (params = filters) =>
    adminBookings(params)
      .then((data) => setBookings(data.bookings || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

  useEffect(() => {
    adminHotels().then((data) => setHotels(data.hotels || []));
    load();
  }, []);

  const apply = (e) => {
    e.preventDefault();
    setLoading(true);
    load(filters);
  };

  const changeStatus = async (id, status) => {
    try {
      await adminUpdateBookingStatus(id, status);
      await load();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1 className="font-serif text-4xl text-forest">Bookings</h1>
      <form onSubmit={apply} className="mt-6 grid gap-3 rounded-2xl bg-white p-4 ring-1 ring-mist md:grid-cols-5">
        <input
          type="date"
          className="rounded-xl border border-mist px-3 py-2 text-sm"
          value={filters.from}
          onChange={(e) => setFilters({ ...filters, from: e.target.value })}
        />
        <input
          type="date"
          className="rounded-xl border border-mist px-3 py-2 text-sm"
          value={filters.to}
          onChange={(e) => setFilters({ ...filters, to: e.target.value })}
        />
        <select
          className="rounded-xl border border-mist px-3 py-2 text-sm"
          value={filters.hotelId}
          onChange={(e) => setFilters({ ...filters, hotelId: e.target.value })}
        >
          <option value="">All hotels</option>
          {hotels.map((h) => (
            <option key={h._id} value={h._id}>
              {h.name}
            </option>
          ))}
        </select>
        <select
          className="rounded-xl border border-mist px-3 py-2 text-sm"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button type="submit" className="rounded-xl bg-forest text-sm font-semibold text-cream">
          Filter
        </button>
      </form>
      {error && <p className="mt-4 text-rose-700">{error}</p>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl bg-white ring-1 ring-mist">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-sand text-pine">
              <tr>
                <th className="px-4 py-3">Guest</th>
                <th className="px-4 py-3">Hotel / room</th>
                <th className="px-4 py-3">Dates</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-t border-mist">
                  <td className="px-4 py-3">
                    {b.userId?.name}
                    <div className="text-xs text-pine">{b.userId?.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    {b.hotelId?.name}
                    <div className="text-xs text-pine">{b.roomId?.roomType}</div>
                  </td>
                  <td className="px-4 py-3">
                    {formatDate(b.checkInDate)} → {formatDate(b.checkOutDate)}
                  </td>
                  <td className="px-4 py-3">{formatMoney(b.totalPrice)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={b.status} />
                    <select
                      className="mt-2 block rounded-lg border border-mist px-2 py-1 text-xs"
                      value={b.status}
                      onChange={(e) => changeStatus(b._id, e.target.value)}
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
