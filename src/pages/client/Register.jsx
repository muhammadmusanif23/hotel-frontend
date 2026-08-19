import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout title="Join Grand Hotel PK" subtitle="Guests book rooms. Staff accounts are seeded separately.">
      <form onSubmit={onSubmit} className="space-y-4">
        {['name', 'email', 'phone', 'password'].map((field) => (
          <label key={field} className="block text-sm font-medium capitalize">
            {field}
            <input
              type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
              required={field !== 'phone'}
              className="mt-1 w-full rounded-xl border border-mist px-3 py-2"
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          </label>
        ))}
        {error && <p className="text-sm text-rose-700">{error}</p>}
        <button type="submit" disabled={busy} className="w-full rounded-full bg-forest py-3 font-semibold text-cream">
          {busy ? 'Creating…' : 'Create account'}
        </button>
      </form>
      <p className="mt-6 text-sm text-pine">
        Already have an account?{' '}
        <Link to="/login" className="text-gold-dark underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
