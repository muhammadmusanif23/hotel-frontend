import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../components/common/Spinner';
import StatusBadge from '../../components/common/StatusBadge';
import { fetchBooking } from '../../services/hotelApi';
import { formatDate, formatMoney } from '../../utils/format';

export default function Confirmation() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooking(id)
      .then((data) => setBooking(data.booking))
      .catch((err) => setError(err.message));
  }, [id]);

  if (!booking && !error) return <Spinner />;
  if (error) return <p className="px-4 py-16 text-center text-rose-700">{error}</p>;

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <p className="text-sm uppercase tracking-widest text-gold-dark">Reservation</p>
      <h1 className="mt-2 font-serif text-4xl text-forest">
        {booking.status === 'confirmed' ? 'You are booked' : 'Request received'}
      </h1>
      <div className="mt-8 rounded-2xl bg-white p-6 text-left ring-1 ring-mist">
        <div className="flex items-center justify-between">
          <p className="font-medium">{booking.hotelId?.name}</p>
          <StatusBadge status={booking.status} />
        </div>
        <p className="mt-1 text-sm text-pine">{booking.roomId?.roomType}</p>
        <p className="mt-4 text-sm">
          {formatDate(booking.checkInDate)} → {formatDate(booking.checkOutDate)}
        </p>
        <p className="mt-2 font-semibold">{formatMoney(booking.totalPrice)}</p>
        {booking.status === 'pending' && (
          <p className="mt-3 text-sm text-amber-800">
            If you paid with Stripe, confirmation can take a few seconds while the webhook arrives.
          </p>
        )}
      </div>
      <Link to="/my-bookings" className="mt-8 inline-block rounded-full bg-forest px-6 py-3 text-cream">
        View my bookings
      </Link>
    </div>
  );
}
