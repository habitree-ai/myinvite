'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatedReveal } from './animated-reveal';

interface Props { config: { galleryImages: string[]; galleryColumns: number; } }

export function GallerySection({ config }: Props) {
  if (!config.galleryImages?.length) return null;

  const useCarousel = config.galleryImages.length <= 4;

  return (
    <AnimatedReveal>
      <section className="inv-section-decorated" style={{ padding: 'var(--inv-section-py) var(--inv-section-px)' }}>
        <div className="text-center mb-6">
          <h2 className="inv-section-title">{'\uAC24\uB7EC\uB9AC'}</h2>
        </div>
        {useCarousel ? <Carousel images={config.galleryImages} /> : <BentoGrid images={config.galleryImages} columns={config.galleryColumns} />}
      </section>
    </AnimatedReveal>
  );
}

function Carousel({ images }: { images: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = children.indexOf(entry.target as HTMLElement);
            if (idx >= 0) setActiveIdx(idx);
          }
        }
      },
      { root: el, threshold: 0.6 },
    );
    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [images.length]);

  return (
    <div className="max-w-lg mx-auto">
      <div ref={scrollRef} className="overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-3 pb-2" style={{ scrollPaddingInline: '1.5rem' }}>
        {images.map((url, i) => (
          <div key={i} className="snap-center flex-shrink-0 overflow-hidden rounded-xl" style={{ width: 'min(75vw, 320px)', aspectRatio: '3/4' }}>
            <img src={url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" style={{ transition: 'transform 0.5s ease' }} loading="lazy"
              onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = 'scale(1.06)'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = 'scale(1)'; }}
            />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <div className="inv-dots">
          {images.map((_, i) => (<div key={i} className={`inv-dot ${i === activeIdx ? 'inv-dot-active' : ''}`} />))}
        </div>
      )}
    </div>
  );
}

function BentoGrid({ images, columns }: { images: string[]; columns: number }) {
  return (
    <div className="max-w-lg mx-auto grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(columns, 3)}, 1fr)` }}>
      {images.map((url, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl group"
          style={{ aspectRatio: i === 0 && images.length >= 5 ? '1' : '1', gridRow: i === 0 && images.length >= 5 ? 'span 2' : undefined, gridColumn: i === 0 && images.length >= 5 ? 'span 2' : undefined }}
        >
          <div className="relative w-full h-full overflow-hidden">
            <img src={url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" style={{ transition: 'transform 0.6s ease' }} loading="lazy"
              onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = 'scale(1.08)'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = 'scale(1)'; }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
