import { formatDate, formatMoney, nightsBetween } from '../../utils/format';

export default function BookingSummary({ hotel, room, checkIn, checkOut, guests }) {
  const nights = nightsBetween(checkIn, checkOut);
  const total = nights * (room?.pricePerNight || 0);

  return (
    <aside className="rounded-2xl bg-white p-5 ring-1 ring-mist">
      <h3 className="font-serif text-2xl text-forest">Stay summary</h3>
      {hotel && <p className="mt-2 font-medium">{hotel.name}</p>}
      {hotel?.location && (
        <p className="text-sm text-pine">
          {hotel.location.city}, {hotel.location.country}
        </p>
      )}
      {room && (
        <p className="mt-3 text-sm">
          {room.roomType} · {guests} guest{guests > 1 ? 's' : ''}
        </p>
      )}
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-pine">Check-in</dt>
          <dd>{formatDate(checkIn)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-pine">Check-out</dt>
          <dd>{formatDate(checkOut)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-pine">Nights</dt>
          <dd>{nights}</dd>
        </div>
        {room && (
          <div className="flex justify-between border-t border-mist pt-2 font-semibold">
            <dt>Total</dt>
            <dd>{formatMoney(total)}</dd>
          </div>
        )}
      </dl>
    </aside>
  );
}
