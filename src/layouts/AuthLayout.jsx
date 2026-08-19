import { Link } from 'react-router-dom';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden bg-forest lg:block">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="relative flex h-full flex-col justify-end p-12 text-cream">
          <Link to="/" className="font-serif text-4xl">
            Grand Hotel PK
          </Link>
          <p className="mt-3 max-w-sm text-sand/90">
            Book a room with a real calendar. Your dates stay yours until you check out.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center bg-cream px-6 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 block font-serif text-3xl text-forest lg:hidden">
            Grand Hotel PK
          </Link>
          <h1 className="font-serif text-4xl text-forest">{title}</h1>
          {subtitle && <p className="mt-2 text-pine">{subtitle}</p>}
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
