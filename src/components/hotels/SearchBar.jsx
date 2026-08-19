import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDaysInput, todayInput } from '../../utils/format';

export default function SearchBar({ initial = {}, compact = false }) {
  const navigate = useNavigate();
  const [city, setCity] = useState(initial.city || '');
  const [checkIn, setCheckIn] = useState(initial.checkIn || todayInput());
  const [checkOut, setCheckOut] = useState(initial.checkOut || addDaysInput(2));
  const [guests, setGuests] = useState(initial.guests || 2);

  const onSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({
      city,
      checkIn,
      checkOut,
      guests: String(guests),
    });
    navigate(`/hotels?${params.toString()}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`grid gap-3 rounded-2xl bg-cream p-4 shadow-lg shadow-ink/10 ${
        compact ? 'md:grid-cols-5' : 'md:grid-cols-5 md:p-5'
      }`}
    >
      <label className="text-xs font-semibold uppercase tracking-wide text-pine">
        City
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Karachi, Lahore…"
          className="mt-1 w-full rounded-xl border border-mist bg-white px-3 py-2 text-sm text-ink"
        />
      </label>
      <label className="text-xs font-semibold uppercase tracking-wide text-pine">
        Check-in
        <input
          type="date"
          min={todayInput()}
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="mt-1 w-full rounded-xl border border-mist bg-white px-3 py-2 text-sm text-ink"
          required
        />
      </label>
      <label className="text-xs font-semibold uppercase tracking-wide text-pine">
        Check-out
        <input
          type="date"
          min={checkIn || todayInput()}
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="mt-1 w-full rounded-xl border border-mist bg-white px-3 py-2 text-sm text-ink"
          required
        />
      </label>
      <label className="text-xs font-semibold uppercase tracking-wide text-pine">
        Guests
        <input
          type="number"
          min="1"
          max="12"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="mt-1 w-full rounded-xl border border-mist bg-white px-3 py-2 text-sm text-ink"
        />
      </label>
      <button
        type="submit"
        className="self-end rounded-xl bg-forest px-4 py-2.5 text-sm font-semibold text-cream hover:bg-pine"
      >
        Search stays
      </button>
    </form>
  );
}
