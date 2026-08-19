import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ImageGallery from '../../components/hotels/ImageGallery';
import RoomCard from '../../components/hotels/RoomCard';
import Spinner from '../../components/common/Spinner';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import { fetchHotel } from '../../services/hotelApi';
import { addDaysInput, todayInput } from '../../utils/format';

export default function HotelDetail() {
  const { id } = useParams();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { updateDraft } = useBooking();

  const [checkIn, setCheckIn] = useState(params.get('checkIn') || todayInput());
  const [checkOut, setCheckOut] = useState(params.get('checkOut') || addDaysInput(2));
  const [guests, setGuests] = useState(Number(params.get('guests') || 2));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchHotel(id, { checkIn, checkOut, guests })
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, checkIn, checkOut, guests]);

  const applyDates = (e) => {
    e.preventDefault();
    setParams({ checkIn, checkOut, guests: String(guests) });
  };

  const selectRoom = (room) => {
    if (!user) {
      navigate('/login', { state: { from: `/hotels/${id}` } });
      return;
    }
    updateDraft({ hotel: data.hotel, room, checkIn, checkOut, guests });
    navigate('/checkout');
  };

  if (loading && !data) return <Spinner />;
  if (error) return <p className="mx-auto max-w-4xl px-4 py-16 text-rose-700">{error}</p>;
  if (!data) return null;

  const { hotel, rooms } = data;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-xs uppercase tracking-widest text-gold-dark">
        {hotel.location.city}, {hotel.location.country}
      </p>
      <h1 className="mt-1 font-serif text-5xl text-forest">{hotel.name}</h1>
      <p className="mt-2 text-sm text-pine">{hotel.location.address}</p>
      <div className="mt-6">
        <ImageGallery images={hotel.images} alt={hotel.name} />
      </div>
      <p className="mt-6 max-w-3xl leading-relaxed text-pine">{hotel.description}</p>
      {hotel.amenities?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {hotel.amenities.map((a) => (
            <span key={a} className="rounded-full bg-white px-3 py-1 text-sm text-forest ring-1 ring-mist">
              {a}
            </span>
          ))}
        </div>
      )}

      <form
        onSubmit={applyDates}
        className="mt-10 grid gap-3 rounded-2xl bg-white p-4 ring-1 ring-mist md:grid-cols-4"
      >
        <label className="text-xs font-semibold uppercase text-pine">
          Check-in
          <input
            type="date"
            min={todayInput()}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="mt-1 w-full rounded-xl border border-mist px-3 py-2 text-sm"
          />
        </label>
        <label className="text-xs font-semibold uppercase text-pine">
          Check-out
          <input
            type="date"
            min={checkIn}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="mt-1 w-full rounded-xl border border-mist px-3 py-2 text-sm"
          />
        </label>
        <label className="text-xs font-semibold uppercase text-pine">
          Guests
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="mt-1 w-full rounded-xl border border-mist px-3 py-2 text-sm"
          />
        </label>
        <button type="submit" className="self-end rounded-xl bg-forest py-2.5 text-sm font-semibold text-cream">
          Update availability
        </button>
      </form>

      <h2 className="mt-10 font-serif text-3xl text-forest">Rooms</h2>
      <div className="mt-4 space-y-4">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} onSelect={selectRoom} />
        ))}
        {rooms.length === 0 && <p className="text-pine">No rooms fit this guest count.</p>}
      </div>
    </div>
  );
}
