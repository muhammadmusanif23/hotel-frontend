import { useState } from 'react';
import { imageUrl } from '../../utils/format';

export default function ImageGallery({ images = [], alt }) {
  const pics = images.filter(Boolean);
  const [active, setActive] = useState(0);
  if (!pics.length) {
    return <div className="flex h-72 items-center justify-center rounded-2xl bg-mist text-pine">No photos yet</div>;
  }
  return (
    <div>
      <div className="h-72 overflow-hidden rounded-2xl bg-mist md:h-96">
        <img src={imageUrl(pics[active])} alt={alt} className="h-full w-full object-cover" />
      </div>
      {pics.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {pics.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg ring-2 ${
                i === active ? 'ring-gold' : 'ring-transparent'
              }`}
            >
              <img src={imageUrl(src)} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
