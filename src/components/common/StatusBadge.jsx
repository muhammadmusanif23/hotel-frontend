export default function StatusBadge({ status }) {
  const styles = {
    pending: 'bg-amber-100 text-amber-800',
    confirmed: 'bg-emerald-100 text-emerald-800',
    'checked-in': 'bg-sky-100 text-sky-800',
    'checked-out': 'bg-slate-200 text-slate-700',
    cancelled: 'bg-rose-100 text-rose-800',
    paid: 'bg-emerald-100 text-emerald-800',
    refunded: 'bg-slate-200 text-slate-700',
    failed: 'bg-rose-100 text-rose-800',
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${styles[status] || 'bg-mist text-forest'}`}
    >
      {status}
    </span>
  );
}
