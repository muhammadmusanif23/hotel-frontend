import { Link } from 'react-router-dom';
import { formatMoney, imageUrl } from '../../utils/format';

export default function HotelCard({ hotel, searchParams }) {
  const image = imageUrl(hotel.images?.[0]);
  const query = searchParams ? `?${searchParams}` : '';

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-mist transition hover:-translate-y-0.5 hover:shadow-md">
      <Link to={`/hotels/${hotel._id}${query}`} className="block">
        <div className="h-48 overflow-hidden bg-mist">
          {image ? (
            <img src={image} alt={hotel.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-pine">No photo</div>
          )}
        </div>
        <div className="p-4">
          <p className="text-xs uppercase tracking-widest text-gold-dark">
            {hotel.location?.city}, {hotel.location?.country}
          </p>
          <h3 className="mt-1 font-serif text-2xl text-forest">{hotel.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-pine">{hotel.description}</p>
          {hotel.startingPrice != null && (
            <p className="mt-3 text-sm font-semibold text-ink">
              From {formatMoney(hotel.startingPrice)} / night
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
