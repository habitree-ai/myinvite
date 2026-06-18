'use client';

import { AnimatedReveal } from './animated-reveal';

interface ContactItem { name: string; phone: string; role?: string; }
interface Props { config: { contacts: ContactItem[]; } }

export function ContactSection({ config }: Props) {
  if (!config.contacts?.length) return null;

  return (
    <AnimatedReveal>
      <section className="inv-section-decorated" style={{ padding: 'var(--inv-section-py) var(--inv-section-px)' }}>
        <div className="text-center mb-6">
          <h2 className="inv-section-title">{'\uC5F0\uB77D\uCC98'}</h2>
        </div>
        <div className="max-w-md mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {config.contacts.map((c, i) => (
            <div key={i} className="inv-card-accent flex items-center justify-between" style={{ padding: '1rem 1.25rem' }}>
              <div className="flex items-center gap-2">
                {c.role && (
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.625rem', borderRadius: '999px', background: 'var(--inv-accent-glow)', color: 'var(--inv-accent)', border: '1px solid color-mix(in oklch, var(--inv-accent) 20%, transparent)' }}>
                    {c.role}
                  </span>
                )}
                <span style={{ fontWeight: 600, color: 'var(--inv-text-primary)' }}>{c.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <a href={`tel:${c.phone}`} className="inv-btn inv-btn-primary" style={{ padding: '0.5rem 1rem', minHeight: '40px', fontSize: '0.8125rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  {'\uC804\uD654'}
                </a>
                <a href={`sms:${c.phone}`} className="inv-btn inv-btn-secondary" style={{ padding: '0.5rem 1rem', minHeight: '40px', fontSize: '0.8125rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  {'\uBB38\uC790'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AnimatedReveal>
  );
}
