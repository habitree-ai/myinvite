'use client';

import { AnimatedReveal } from './animated-reveal';

interface HostItem { name: string; nameEn?: string; role: string; roleEn?: string; phone?: string; avatarUrl?: string; }
interface Props { config: { hostsTitle: string; hostsTitleEn?: string; hosts: HostItem[]; } }

export function HostsSection({ config }: Props) {
  if (!config.hosts?.length) return null;

  return (
    <AnimatedReveal>
      <section className="inv-section-decorated" style={{ padding: 'var(--inv-section-py) var(--inv-section-px)' }}>
        <div className="text-center mb-8">
          <h2 className="inv-section-title">{config.hostsTitle}</h2>
        </div>
        <div className="grid gap-5 max-w-lg mx-auto" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
          {config.hosts.map((host, i) => (
            <div
              key={i}
              className="animate-fade-up flex flex-col items-center text-center inv-card"
              style={{ padding: '1.5rem 1rem', animationDelay: `${i * 0.1}s` }}
            >
              {host.avatarUrl ? (
                <img
                  src={host.avatarUrl}
                  alt={host.name}
                  className="rounded-full object-cover mb-3"
                  style={{ width: '72px', height: '72px', border: '3px solid var(--inv-card-bg)', boxShadow: '0 0 0 2px var(--inv-accent-glow)' }}
                />
              ) : (
                <div
                  className="rounded-full flex items-center justify-center mb-3"
                  style={{
                    width: '72px', height: '72px',
                    background: `linear-gradient(135deg, var(--inv-gradient-from), var(--inv-gradient-to))`,
                    color: '#fff', fontSize: '1.5rem', fontWeight: 700,
                    boxShadow: '0 4px 16px color-mix(in oklch, var(--inv-accent) 30%, transparent)',
                  }}
                >
                  {host.name.charAt(0)}
                </div>
              )}
              <p style={{ fontSize: '0.8125rem', color: 'var(--inv-text-secondary)', marginBottom: '2px' }}>{host.role}</p>
              <p style={{ fontWeight: 600, color: 'var(--inv-text-primary)', fontSize: '1rem' }}>{host.name}</p>
              {host.phone && (
                <a
                  href={`tel:${host.phone}`}
                  className="inv-btn inv-btn-secondary mt-3"
                  style={{ fontSize: '0.8125rem', padding: '0.5rem 1rem', minHeight: '40px' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  {host.phone}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </AnimatedReveal>
  );
}
