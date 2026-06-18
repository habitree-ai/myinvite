'use client';

import { useEffect, useState } from 'react';

interface Props { config: { title: string; titleEn?: string; subtitle: string; subtitleEn?: string; heroImageUrl: string; gradientFrom: string; gradientTo: string; eventType: string; } }

const EVENT_EMOJI: Record<string, string> = {
  gathering: '\u{1F389}',
  birthday: '\u{1F382}',
  wedding: '\u{1F48D}',
  baby: '\u{1F476}',
  celebration: '\u{1F389}',
  corporate: '\u{1F3E2}',
  custom: '\u{2728}',
};

export function HeroSection({ config }: Props) {
  const emoji = EVENT_EMOJI[config.eventType] || EVENT_EMOJI.custom;
  const [scrollFade, setScrollFade] = useState({ opacity: 1, translateY: 0 });

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const maxScroll = window.innerHeight * 0.6;
        const progress = Math.min(y / maxScroll, 1);
        setScrollFade({ opacity: 1 - progress * 0.8, translateY: y * 0.3 });
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bgStyle = config.heroImageUrl
    ? { backgroundImage: `url(${config.heroImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: `linear-gradient(160deg, ${config.gradientFrom}, ${config.gradientTo})` };

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 overflow-hidden" style={{ ...bgStyle, minHeight: '100svh' }}>
      {/* Layered overlays for depth */}
      {config.heroImageUrl && <div className="absolute inset-0 bg-black/30" />}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.3) 100%)' }} />

      {/* Floating orbs for visual richness */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: 'absolute', top: '15%', left: '10%', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)', animation: 'float-slow 10s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '5%', width: '160px', height: '160px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)', animation: 'float-slow 14s ease-in-out infinite reverse' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 60%)', transform: 'translate(-50%, -50%)', animation: 'rotate-slow 30s linear infinite' }} />
      </div>

      {/* Decorative corner lines */}
      <div className="absolute top-6 left-6 pointer-events-none" style={{ width: '40px', height: '40px', borderTop: '1px solid rgba(255,255,255,0.2)', borderLeft: '1px solid rgba(255,255,255,0.2)' }} />
      <div className="absolute top-6 right-6 pointer-events-none" style={{ width: '40px', height: '40px', borderTop: '1px solid rgba(255,255,255,0.2)', borderRight: '1px solid rgba(255,255,255,0.2)' }} />
      <div className="absolute bottom-20 left-6 pointer-events-none" style={{ width: '40px', height: '40px', borderBottom: '1px solid rgba(255,255,255,0.15)', borderLeft: '1px solid rgba(255,255,255,0.15)' }} />
      <div className="absolute bottom-20 right-6 pointer-events-none" style={{ width: '40px', height: '40px', borderBottom: '1px solid rgba(255,255,255,0.15)', borderRight: '1px solid rgba(255,255,255,0.15)' }} />

      <div
        className="relative z-10 max-w-md mx-auto"
        style={{ opacity: scrollFade.opacity, transform: `translateY(${scrollFade.translateY}px)`, willChange: 'transform, opacity' }}
      >
        {/* Emoji with glow ring */}
        <div className="animate-fade-up flex items-center justify-center mx-auto mb-8" style={{ animationDuration: '1.2s' }}>
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-full animate-pulse-ring" style={{ width: '110px', height: '110px', top: '-7px', left: '-7px' }} />
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: '96px', height: '96px', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.25)', boxShadow: '0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)' }}
            >
              <span style={{ fontSize: '3rem', lineHeight: 1 }}>{emoji}</span>
            </div>
          </div>
        </div>

        <h1
          className="animate-fade-up-d1 font-bold text-white leading-snug whitespace-pre-line"
          style={{ fontSize: 'var(--inv-text-hero)', textShadow: '0 2px 16px rgba(0,0,0,0.3), 0 0 60px rgba(255,255,255,0.1)', letterSpacing: '-0.01em' }}
        >
          {config.title}
        </h1>

        {config.subtitle && (
          <p className="animate-fade-up-d2 mt-5 text-base md:text-lg text-white/80 leading-relaxed" style={{ letterSpacing: '0.04em' }}>
            {config.subtitle}
          </p>
        )}

        {/* Shimmer ornament divider */}
        <div className="animate-fade-up-d3 mt-8 flex items-center justify-center gap-3">
          <div style={{ width: '2rem', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4))' }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }} />
          <div className="animate-shimmer" style={{ width: '3rem', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)', backgroundSize: '200% auto' }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }} />
          <div style={{ width: '2rem', height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.4), transparent)' }} />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float" style={{ opacity: scrollFade.opacity }}>
        <div
          className="flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-full"
          style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
          <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: 'Pretendard Variable, sans-serif' }}>scroll</span>
        </div>
      </div>
    </section>
  );
}
