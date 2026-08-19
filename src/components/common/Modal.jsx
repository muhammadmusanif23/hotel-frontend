export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-cream p-6 shadow-xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="font-serif text-2xl text-forest">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-2 text-lg text-pine hover:bg-mist"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
