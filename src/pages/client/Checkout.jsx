import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BookingSummary from '../../components/booking/BookingSummary';
import { useBooking } from '../../context/BookingContext';
import { createBooking } from '../../services/hotelApi';

export default function Checkout() {
  const { draft } = useBooking();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (!draft.hotel || !draft.room) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-pine">Pick a room before reviewing a booking.</p>
        <Link to="/hotels" className="mt-4 inline-block text-gold-dark underline">
          Browse hotels
        </Link>
      </div>
    );
  }

  const confirm = async () => {
    setBusy(true);
    setError('');
    try {
      const { booking } = await createBooking({
        hotelId: draft.hotel._id,
        roomId: draft.room._id,
        checkInDate: draft.checkIn,
        checkOutDate: draft.checkOut,
        guests: draft.guests,
      });
      navigate(`/pay/${booking._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 lg:grid-cols-[1fr_320px]">
      <div>
        <h1 className="font-serif text-4xl text-forest">Review your stay</h1>
        <p className="mt-2 text-pine">
          We will hold this room as pending until you pay. Overlapping dates are already checked.
        </p>
        {error && <p className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-800">{error}</p>}
        <button
          type="button"
          onClick={confirm}
          disabled={busy}
          className="mt-8 rounded-full bg-forest px-6 py-3 font-semibold text-cream disabled:opacity-60"
        >
          {busy ? 'Holding room…' : 'Continue to payment'}
        </button>
      </div>
      <BookingSummary {...draft} />
    </div>
  );
}
