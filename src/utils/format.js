import { format, differenceInCalendarDays, parseISO } from 'date-fns';

export const formatMoney = (value) =>
  new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(value || 0);

export const formatDate = (value) => {
  if (!value) return '—';
  const date = typeof value === 'string' ? parseISO(value) : new Date(value);
  return format(date, 'MMM d, yyyy');
};

export const nightsBetween = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  return Math.max(0, differenceInCalendarDays(new Date(checkOut), new Date(checkIn)));
};

export const toInputDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10);
};

export const todayInput = () => toInputDate(new Date());

export const addDaysInput = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return toInputDate(d);
};

export const imageUrl = (src) => {
  if (!src) return '';
  if (/^https?:\/\//i.test(src)) return src;
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const origin = apiUrl.replace(/\/api\/?$/, '');
  return src.startsWith('/') ? `${origin}${src}` : src;
};

export const amenityList = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
};

export const STATUS_STYLES = {
  pending: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-emerald-100 text-emerald-800',
  'checked-in': 'bg-sky-100 text-sky-800',
  'checked-out': 'bg-slate-200 text-slate-700',
  cancelled: 'bg-rose-100 text-rose-800',
  paid: 'bg-emerald-100 text-emerald-800',
  refunded: 'bg-slate-200 text-slate-700',
  failed: 'bg-rose-100 text-rose-800',
};
