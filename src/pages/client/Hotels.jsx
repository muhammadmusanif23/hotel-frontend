import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/hotels/SearchBar';
import HotelCard from '../../components/hotels/HotelCard';
import Spinner from '../../components/common/Spinner';
import { fetchHotels } from '../../services/hotelApi';

export default function Hotels() {
  const [params] = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const query = useMemo(
    () => ({
      city: params.get('city') || '',
      checkIn: params.get('checkIn') || '',
      checkOut: params.get('checkOut') || '',
      guests: params.get('guests') || '',
    }),
    [params]
  );

  useEffect(() => {
    setLoading(true);
    setError('');
    fetchHotels(query)
      .then((data) => setHotels(data.hotels || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [query]);

  const searchString = params.toString();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-serif text-4xl text-forest">Find a stay</h1>
      <p className="mt-1 text-pine">Filter by city, dates, and guest count. Sold-out hotels stay off the list.</p>
      <div className="mt-6">
        <SearchBar initial={query} compact />
      </div>
      {loading && <Spinner label="Looking for rooms" />}
      {error && <p className="mt-8 text-rose-700">{error}</p>}
      {!loading && !error && hotels.length === 0 && (
        <p className="mt-10 rounded-2xl bg-white p-8 text-center text-pine ring-1 ring-mist">
          No hotels match those dates. Try another city or a wider stay.
        </p>
      )}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hotels.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} searchParams={searchString} />
        ))}
      </div>
    </div>
  );
}
