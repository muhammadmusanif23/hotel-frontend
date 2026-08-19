import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Spinner from '../../components/common/Spinner';
import { createPaymentIntent, mockConfirmPayment } from '../../services/hotelApi';
import { formatMoney } from '../../utils/format';

const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : null;

function StripeForm({ bookingId, onDone }) {
  const stripe = useStripe();
  const elements = useElements();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setBusy(true);
    setError('');
    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/confirmation/${bookingId}`,
      },
    });
    if (stripeError) {
      setError(stripeError.message);
      setBusy(false);
    } else {
      onDone();
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <PaymentElement />
      {error && <p className="text-sm text-rose-700">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || busy}
        className="w-full rounded-full bg-forest py-3 font-semibold text-cream disabled:opacity-60"
      >
        {busy ? 'Processing…' : 'Pay now'}
      </button>
    </form>
  );
}

export default function Pay({ booking }) {
  const navigate = useNavigate();
  const [intent, setIntent] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    createPaymentIntent(booking._id)
      .then(setIntent)
      .catch((err) => setError(err.message));
  }, [booking._id]);

  const mockPay = async () => {
    setBusy(true);
    try {
      await mockConfirmPayment(booking._id);
      navigate(`/confirmation/${booking._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  if (error && !intent) {
    return <p className="text-rose-700">{error}</p>;
  }
  if (!intent) return <Spinner label="Preparing payment" />;

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <h1 className="font-serif text-4xl text-forest">Pay for your stay</h1>
      <p className="mt-2 text-pine">
        {booking.hotelId?.name} · {formatMoney(booking.totalPrice)}
      </p>
      {error && <p className="mt-4 text-sm text-rose-700">{error}</p>}
      <div className="mt-8 rounded-2xl bg-white p-6 ring-1 ring-mist">
        {intent.mock || !stripePromise ? (
          <div>
            <p className="text-sm text-pine">
              Stripe keys are not configured. Use demo checkout to confirm this booking locally.
            </p>
            <button
              type="button"
              onClick={mockPay}
              disabled={busy}
              className="mt-6 w-full rounded-full bg-forest py-3 font-semibold text-cream"
            >
              {busy ? 'Confirming…' : `Pay ${formatMoney(booking.totalPrice)} (demo)`}
            </button>
          </div>
        ) : (
          <Elements stripe={stripePromise} options={{ clientSecret: intent.clientSecret }}>
            <StripeForm bookingId={booking._id} onDone={() => navigate(`/confirmation/${booking._id}`)} />
          </Elements>
        )}
      </div>
      <Link to="/my-bookings" className="mt-6 inline-block text-sm text-pine underline">
        Pay later from My bookings
      </Link>
    </div>
  );
}
