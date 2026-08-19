import { useEffect, useState } from 'react';
import Spinner from '../../components/common/Spinner';
import StatusBadge from '../../components/common/StatusBadge';
import { adminPayments, adminRefundPayment } from '../../services/hotelApi';
import { formatDate, formatMoney } from '../../utils/format';

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = (value = status) =>
    adminPayments(value ? { status: value } : {})
      .then((data) => setPayments(data.payments || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const refund = async (id) => {
    if (!window.confirm('Refund this payment and cancel the booking if still confirmed?')) return;
    try {
      await adminRefundPayment(id);
      await load();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-4xl text-forest">Payments</h1>
        <select
          className="rounded-xl border border-mist px-3 py-2 text-sm"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setLoading(true);
            load(e.target.value);
          }}
        >
          <option value="">All</option>
          <option value="pending">pending</option>
          <option value="paid">paid</option>
          <option value="refunded">refunded</option>
          <option value="failed">failed</option>
        </select>
      </div>
      {error && <p className="mt-4 text-rose-700">{error}</p>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl bg-white ring-1 ring-mist">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-sand text-pine">
              <tr>
                <th className="px-4 py-3">Guest</th>
                <th className="px-4 py-3">Hotel</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Paid</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id} className="border-t border-mist">
                  <td className="px-4 py-3">{p.bookingId?.userId?.name || '—'}</td>
                  <td className="px-4 py-3">{p.bookingId?.hotelId?.name || '—'}</td>
                  <td className="px-4 py-3">{formatMoney(p.amount)}</td>
                  <td className="px-4 py-3">{p.method}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-4 py-3">{p.paidAt ? formatDate(p.paidAt) : '—'}</td>
                  <td className="px-4 py-3 text-right">
                    {p.status === 'paid' && (
                      <button type="button" onClick={() => refund(p._id)} className="text-rose-700 underline">
                        Refund
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
