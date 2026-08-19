import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ClientLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <header className="sticky top-0 z-40 border-b border-mist/80 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="font-serif text-2xl tracking-wide text-forest">
            Grand Hotel <span className="text-gold-dark">PK</span>
          </Link>
          <nav className="flex items-center gap-5 text-sm font-medium text-pine">
            <NavLink to="/hotels" className={({ isActive }) => (isActive ? 'text-gold-dark' : 'hover:text-forest')}>
              Hotels
            </NavLink>
            {user ? (
              <>
                <NavLink
                  to="/my-bookings"
                  className={({ isActive }) => (isActive ? 'text-gold-dark' : 'hover:text-forest')}
                >
                  My bookings
                </NavLink>
                {user.role === 'admin' && (
                  <NavLink to="/admin" className="hover:text-forest">
                    Admin
                  </NavLink>
                )}
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="rounded-full border border-pine/20 px-3 py-1 hover:border-gold"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="hover:text-forest">
                  Sign in
                </NavLink>
                <NavLink
                  to="/register"
                  className="rounded-full bg-forest px-4 py-1.5 text-cream hover:bg-pine"
                >
                  Join
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-mist bg-forest text-sand">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-lg">Grand Hotel PK</p>
          <p className="text-sand/80">Independent rooms. Honest calendars. No double-booking.</p>
        </div>
      </footer>
    </div>
  );
}
