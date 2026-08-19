import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../components/common/Spinner';
import StatusBadge from '../../components/common/StatusBadge';
import { adminUser } from '../../services/hotelApi';
import { formatDate, formatMoney } from '../../utils/format';

export default function AdminUserDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    adminUser(id)
      .then(setData)
      .catch((err) => setError(err.message));
  }, [id]);

  if (!data && !error) return <Spinner />;
  if (error) return <p className="text-rose-700">{error}</p>;

  const { user, bookings } = data;

  return (
    <div>
      <Link to="/admin/users" className="text-sm text-pine underline">
        Clients
      </Link>
      <h1 className="mt-2 font-serif text-4xl text-forest">{user.name}</h1>
      <p className="text-pine">
        {user.email} {user.phone && `· ${user.phone}`}
      </p>
      <h2 className="mt-8 font-serif text-2xl text-forest">Booking history</h2>
      <div className="mt-4 space-y-3">
        {bookings.map((b) => (
          <div key={b._id} className="rounded-2xl bg-white p-4 ring-1 ring-mist">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium">
                {b.hotelId?.name} · {b.roomId?.roomType}
              </p>
              <StatusBadge status={b.status} />
            </div>
            <p className="mt-1 text-sm text-pine">
              {formatDate(b.checkInDate)} → {formatDate(b.checkOutDate)} · {formatMoney(b.totalPrice)}
            </p>
          </div>
        ))}
        {bookings.length === 0 && <p className="text-pine">No bookings yet.</p>}
      </div>
    </div>
  );
}
