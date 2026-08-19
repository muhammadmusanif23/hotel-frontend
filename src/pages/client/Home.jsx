import SearchBar from '../../components/hotels/SearchBar';

export default function Home() {
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-forest">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-32">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">Independent hotels</p>
          <h1 className="mt-3 max-w-2xl font-serif text-5xl leading-tight text-cream md:text-6xl">
            Rooms with a calendar you can trust.
          </h1>
          <p className="mt-4 max-w-lg text-sand/90">
            Search by city and dates. We hold inventory in real time so two guests never take the same room.
          </p>
          <div className="mt-10 max-w-5xl">
            <SearchBar />
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-3">
        {[
          ['Honest availability', 'Overlapping stays are blocked before you pay. No mystery overbooking.'],
          ['Pay when you are sure', 'Review the stay, then pay with Stripe. Pending holds drop if you walk away.'],
          ['Change of plans', 'Cancel confirmed bookings until 48 hours before check-in for a refund.'],
        ].map(([title, body]) => (
          <div key={title} className="rounded-2xl bg-white p-6 ring-1 ring-mist">
            <h2 className="font-serif text-2xl text-forest">{title}</h2>
            <p className="mt-2 text-sm text-pine">{body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
