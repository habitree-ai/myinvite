'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatedReveal } from './animated-reveal';

interface AccountItem { label: string; bankName: string; accountNumber: string; holder: string; }
interface Props { config: { accountTitle: string; accounts: AccountItem[]; kakaoPayUrl: string; } }

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClosing(true);
      setTimeout(onClose, 300);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="inv-toast" data-closing={closing ? 'true' : undefined}>
      {'\u2713'} {message}
    </div>
  );
}

export function AccountSection({ config }: Props) {
  const [toast, setToast] = useState<string | null>(null);

  const handleCopy = useCallback(async (text: string, label: string) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        window.prompt('\uBCF5\uC0AC\uD574\uC8FC\uC138\uC694:', text);
        return;
      }
      setToast(`${label} \uBCF5\uC0AC\uB428`);
    } catch {
      window.prompt('\uBCF5\uC0AC\uD574\uC8FC\uC138\uC694:', text);
    }
  }, []);

  if (!config.accounts?.length && !config.kakaoPayUrl) return null;

  return (
    <AnimatedReveal>
      <section className="inv-section-decorated" style={{ padding: 'var(--inv-section-py) var(--inv-section-px)', background: 'var(--inv-bg-alt)' }}>
        <div className="text-center mb-6">
          <h2 className="inv-section-title">{config.accountTitle}</h2>
        </div>
        <div className="max-w-md mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {config.accounts.map((acc, i) => (
            <div key={i} className="inv-card-accent" style={{ padding: '1.25rem' }}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--inv-accent)', background: 'var(--inv-accent-glow)', padding: '0.25rem 0.75rem', borderRadius: '999px' }}>
                  {acc.label}
                </span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--inv-text-secondary)' }}>{acc.holder}</span>
              </div>
              <div className="flex items-center justify-between">
                <p style={{ color: 'var(--inv-text-primary)', fontWeight: 500 }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--inv-text-secondary)' }}>{acc.bankName}</span>{' '}
                  <span style={{ fontFamily: "'Pretendard Variable', monospace", letterSpacing: '0.03em' }}>{acc.accountNumber}</span>
                </p>
                <button
                  onClick={() => handleCopy(acc.accountNumber, acc.bankName)}
                  className="inv-btn inv-btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem', minHeight: '32px' }}
                >
                  {'\uBCF5\uC0AC'}
                </button>
              </div>
            </div>
          ))}
          {config.kakaoPayUrl && (
            <a href={config.kakaoPayUrl} target="_blank" rel="noopener noreferrer" className="inv-btn inv-btn-kakao" style={{ width: '100%', marginTop: '0.25rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#191919">
                <path d="M12 3C6.48 3 2 6.58 2 10.9c0 2.78 1.8 5.22 4.5 6.6-.2.73-.72 2.65-.82 3.06-.13.5.18.49.38.36.16-.11 2.5-1.7 3.51-2.39.47.07.95.1 1.43.1 5.52 0 10-3.58 10-7.73C22 6.58 17.52 3 12 3z"/>
              </svg>
              {'\uCE74\uCE74\uC624\uD398\uC774\uB85C \uC1A1\uAE08\uD558\uAE30'}
            </a>
          )}
        </div>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </section>
    </AnimatedReveal>
  );
}
