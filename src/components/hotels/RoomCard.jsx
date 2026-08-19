import { formatMoney, imageUrl } from '../../utils/format';

export default function RoomCard({ room, onSelect, disabled }) {
  const image = imageUrl(room.images?.[0]);
  const soldOut = room.remainingUnits === 0;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-mist sm:flex-row">
      <div className="h-40 w-full shrink-0 bg-mist sm:h-auto sm:w-56">
        {image ? (
          <img src={image} alt={room.roomType} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-pine">No photo</div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-serif text-2xl text-forest">{room.roomType}</h3>
            <p className="text-right text-sm font-semibold text-ink">
              {formatMoney(room.pricePerNight)}
              <span className="block text-xs font-normal text-pine">per night</span>
            </p>
          </div>
          <p className="mt-1 text-sm text-pine">
            Sleeps {room.capacity} · {room.totalUnits} units
            {room.remainingUnits != null && ` · ${room.remainingUnits} left for these dates`}
          </p>
          {room.amenities?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {room.amenities.map((a) => (
                <span key={a} className="rounded-full bg-sand px-2 py-0.5 text-xs text-pine">
                  {a}
                </span>
              ))}
            </div>
          )}
        </div>
        <button
          type="button"
          disabled={disabled || soldOut}
          onClick={() => onSelect(room)}
          className="mt-4 self-start rounded-full bg-forest px-4 py-2 text-sm font-semibold text-cream disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {soldOut ? 'Sold out' : 'Select room'}
        </button>
      </div>
    </article>
  );
}
