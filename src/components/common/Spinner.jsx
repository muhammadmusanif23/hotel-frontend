export default function Spinner({ label = 'Loading' }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-forest">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-mist border-t-gold" />
      <p className="text-sm tracking-wide text-pine">{label}</p>
    </div>
  );
}
