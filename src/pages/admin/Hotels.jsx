import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/common/Spinner';
import { adminDeleteHotel, adminHotels } from '../../services/hotelApi';

export default function AdminHotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () =>
    adminHotels()
      .then((data) => setHotels(data.hotels || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    if (!window.confirm('Deactivate this hotel and its rooms?')) return;
    try {
      await adminDeleteHotel(id);
      await load();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-4xl text-forest">Hotels</h1>
        <Link to="/admin/hotels/new" className="rounded-full bg-forest px-4 py-2 text-sm font-semibold text-cream">
          Add hotel
        </Link>
      </div>
      {error && <p className="mt-4 text-rose-700">{error}</p>}
      <div className="mt-6 overflow-x-auto rounded-2xl bg-white ring-1 ring-mist">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-sand text-pine">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {hotels.map((h) => (
              <tr key={h._id} className="border-t border-mist">
                <td className="px-4 py-3 font-medium">{h.name}</td>
                <td className="px-4 py-3">
                  {h.location?.city}, {h.location?.country}
                </td>
                <td className="px-4 py-3">{h.isActive ? 'Active' : 'Hidden'}</td>
                <td className="px-4 py-3 text-right space-x-3">
                  <Link to={`/admin/hotels/${h._id}/rooms`} className="text-pine underline">
                    Rooms
                  </Link>
                  <Link to={`/admin/hotels/${h._id}/edit`} className="text-gold-dark underline">
                    Edit
                  </Link>
                  <button type="button" onClick={() => remove(h._id)} className="text-rose-700 underline">
                    Hide
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
