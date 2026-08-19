import { useEffect, useState } from 'react';
import Spinner from '../../components/common/Spinner';
import { adminDashboard } from '../../services/hotelApi';
import { formatMoney } from '../../utils/format';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    adminDashboard()
      .then((data) => setStats(data.stats))
      .catch((err) => setError(err.message));
  }, []);

  if (!stats && !error) return <Spinner />;

  const cards = stats
    ? [
        ['Total bookings', stats.totalBookings],
        ['Revenue (paid)', formatMoney(stats.revenue)],
        ['Occupancy (30 days)', `${stats.occupancyRate}%`],
        ['Check-ins today', stats.upcomingCheckIns],
        ['Check-outs today', stats.upcomingCheckOuts],
      ]
    : [];

  return (
    <div>
      <h1 className="font-serif text-4xl text-forest">Dashboard</h1>
      <p className="mt-1 text-pine">Live counts from bookings, payments, and inventory.</p>
      {error && <p className="mt-4 text-rose-700">{error}</p>}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-white p-5 ring-1 ring-mist">
            <p className="text-xs uppercase tracking-wide text-pine">{label}</p>
            <p className="mt-2 font-serif text-3xl text-forest">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
