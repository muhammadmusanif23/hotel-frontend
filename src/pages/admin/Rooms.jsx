import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../components/common/Spinner';
import { adminDeleteRoom, adminHotels, adminRooms } from '../../services/hotelApi';
import { formatMoney } from '../../utils/format';

export default function AdminRooms() {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const [hotelsData, roomsData] = await Promise.all([adminHotels(), adminRooms(hotelId)]);
      setHotel(hotelsData.hotels.find((h) => h._id === hotelId) || null);
      setRooms(roomsData.rooms || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [hotelId]);

  const remove = async (id) => {
    if (!window.confirm('Deactivate this room type?')) return;
    try {
      await adminDeleteRoom(hotelId, id);
      await load();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <p className="text-sm text-pine">
        <Link to="/admin/hotels" className="underline">
          Hotels
        </Link>
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-4xl text-forest">{hotel?.name || 'Rooms'}</h1>
        <Link
          to={`/admin/hotels/${hotelId}/rooms/new`}
          className="rounded-full bg-forest px-4 py-2 text-sm font-semibold text-cream"
        >
          Add room type
        </Link>
      </div>
      {error && <p className="mt-4 text-rose-700">{error}</p>}
      <div className="mt-6 overflow-x-auto rounded-2xl bg-white ring-1 ring-mist">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-sand text-pine">
            <tr>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Capacity</th>
              <th className="px-4 py-3">Units</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rooms.map((r) => (
              <tr key={r._id} className="border-t border-mist">
                <td className="px-4 py-3 font-medium">{r.roomType}</td>
                <td className="px-4 py-3">{formatMoney(r.pricePerNight)}</td>
                <td className="px-4 py-3">{r.capacity}</td>
                <td className="px-4 py-3">{r.totalUnits}</td>
                <td className="px-4 py-3">{r.isActive ? 'Active' : 'Hidden'}</td>
                <td className="px-4 py-3 text-right space-x-3">
                  <Link
                    to={`/admin/hotels/${hotelId}/rooms/${r._id}/edit`}
                    className="text-gold-dark underline"
                  >
                    Edit
                  </Link>
                  <button type="button" onClick={() => remove(r._id)} className="text-rose-700 underline">
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
