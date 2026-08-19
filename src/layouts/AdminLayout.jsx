import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/hotels', label: 'Hotels' },
  { to: '/admin/bookings', label: 'Bookings' },
  { to: '/admin/payments', label: 'Payments' },
  { to: '/admin/users', label: 'Clients' },
];

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-sand">
      <aside className="hidden w-60 flex-col bg-ink px-4 py-6 text-sand md:flex">
        <p className="font-serif text-2xl">
          Grand Hotel <span className="text-gold">PK Admin</span>
        </p>
        <nav className="mt-8 flex flex-col gap-1 text-sm">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 ${isActive ? 'bg-forest text-cream' : 'text-sand/80 hover:bg-forest/60'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto space-y-2 text-sm">
          <p className="text-sand/60">{user?.name}</p>
          <button
            type="button"
            className="text-gold hover:underline"
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
          >
            Sign out
          </button>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-mist bg-cream px-4 py-3 md:hidden">
          <p className="font-serif text-xl text-forest">Admin</p>
          <select
            className="rounded-lg border border-mist bg-white px-2 py-1 text-sm"
            onChange={(e) => navigate(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Go to
            </option>
            {links.map((link) => (
              <option key={link.to} value={link.to}>
                {link.label}
              </option>
            ))}
          </select>
        </header>
        <div className="flex-1 p-4 md:p-8">{children}</div>
      </div>
    </div>
  );
}
