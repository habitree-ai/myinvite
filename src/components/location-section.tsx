'use client';

import { AnimatedReveal } from './animated-reveal';

interface Props { config: { venueName: string; venueAddress: string; kakaoMapUrl: string; naverMapUrl: string; parkingInfo: string; transitInfo: string; } }

export function LocationSection({ config }: Props) {
  if (!config.venueName && !config.venueAddress) return null;

  return (
    <AnimatedReveal>
      <section className="inv-section-decorated" style={{ padding: 'var(--inv-section-py) var(--inv-section-px)' }}>
        <div className="text-center mb-6">
          <h2 className="inv-section-title">{'\uC7A5\uC18C \uC548\uB0B4'}</h2>
        </div>
        <div className="max-w-md mx-auto inv-card" style={{ padding: '1.5rem' }}>
          {/* Venue info */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 flex items-center justify-center rounded-full" style={{ width: '44px', height: '44px', background: 'var(--inv-accent-glow)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--inv-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              {config.venueName && <p style={{ fontWeight: 600, fontSize: '1.0625rem', color: 'var(--inv-text-primary)' }}>{config.venueName}</p>}
              {config.venueAddress && <p style={{ fontSize: '0.875rem', color: 'var(--inv-text-secondary)', marginTop: '2px' }}>{config.venueAddress}</p>}
            </div>
          </div>

          {/* Map buttons */}
          <div className="flex gap-3 mt-5">
            {config.kakaoMapUrl && (
              <a href={config.kakaoMapUrl} target="_blank" rel="noopener noreferrer" className="flex-1 inv-btn inv-btn-kakao" style={{ fontSize: '0.875rem' }}>
                {'\uCE74\uCE74\uC624\uB9F5'}
              </a>
            )}
            {config.naverMapUrl && (
              <a href={config.naverMapUrl} target="_blank" rel="noopener noreferrer" className="flex-1 inv-btn inv-btn-naver" style={{ fontSize: '0.875rem' }}>
                {'\uB124\uC774\uBC84\uB9F5'}
              </a>
            )}
          </div>

          {/* Parking / Transit info */}
          {(config.parkingInfo || config.transitInfo) && (
            <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--inv-card-border)', paddingLeft: '0.75rem', borderLeft: '3px solid var(--inv-accent-glow)' }}>
              {config.parkingInfo && (
                <p className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: 'var(--inv-text-secondary)', marginBottom: '0.375rem' }}>
                  <span className="flex-shrink-0 flex items-center justify-center rounded-full" style={{ width: '24px', height: '24px', background: 'var(--inv-accent-glow)', fontSize: '0.75rem' }}>{'\u{1F17F}\u{FE0F}'}</span>
                  {config.parkingInfo}
                </p>
              )}
              {config.transitInfo && (
                <p className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: 'var(--inv-text-secondary)' }}>
                  <span className="flex-shrink-0 flex items-center justify-center rounded-full" style={{ width: '24px', height: '24px', background: 'var(--inv-accent-glow)', fontSize: '0.75rem' }}>{'\u{1F68C}'}</span>
                  {config.transitInfo}
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </AnimatedReveal>
  );
}
