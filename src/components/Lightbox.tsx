import { useEffect } from 'react';

interface LightboxProps {
  src: string | null;
  alt?: string;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ src, alt, onClose }) => {
  useEffect(() => {
    if (!src) return;

    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div className="lb-backdrop" onClick={onClose}>
      <div className="lb-container" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt || 'image'} />
        <button className="lb-close" onClick={onClose} aria-label="Close">×</button>
      </div>
    </div>
  );
};

export default Lightbox;
