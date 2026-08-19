import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/common/Spinner';
import { fetchBooking } from '../../services/hotelApi';
import Pay from './Pay';

export default function PayPage() {
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
  if (booking.status !== 'pending') {
    return <p className="px-4 py-16 text-center text-pine">This booking is not awaiting payment.</p>;
  }
  return <Pay booking={booking} />;
}
