import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import { useAuth } from '../../context/AuthContext';

export default function Login({ admin = false }) {
  const { login, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (admin) {
      navigate(user.role === 'admin' ? '/admin' : '/', { replace: true });
    } else {
      navigate(location.state?.from || '/', { replace: true });
    }
  }, [user, admin, navigate, location.state]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const logged = await login(form);
      if (admin && logged.role !== 'admin') {
        logout();
        setError('This login is for staff only.');
        return;
      }
      navigate(admin ? '/admin' : location.state?.from || '/');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout
      title={admin ? 'Staff sign in' : 'Welcome back'}
      subtitle={admin ? 'Admin console for Grand Hotel PK.' : 'Continue to your bookings.'}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block text-sm font-medium">
          Email
          <input
            type="email"
            required
            className="mt-1 w-full rounded-xl border border-mist px-3 py-2"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>
        <label className="block text-sm font-medium">
          Password
          <input
            type="password"
            required
            className="mt-1 w-full rounded-xl border border-mist px-3 py-2"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>
        {error && <p className="text-sm text-rose-700">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-full bg-forest py-3 font-semibold text-cream"
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      {!admin && (
        <p className="mt-6 text-sm text-pine">
          New here?{' '}
          <Link to="/register" className="text-gold-dark underline">
            Create an account
          </Link>
        </p>
      )}
    </AuthLayout>
  );
}
