'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { AnimatedReveal } from './animated-reveal';

interface Props { config: { eventDate: string; eventTime: string; eventDateLabel: string; eventDateLabelEn?: string; showCountdown: boolean; countdownStyle: 'flip' | 'simple'; } }

function getTimeLeft(targetDate: Date) {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

function FlipCard({ value, label }: { value: number; label: string }) {
  const [display, setDisplay] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const prevRef = useRef(value);

  useEffect(() => {
    if (value !== prevRef.current) {
      setFlipping(true);
      const timer = setTimeout(() => {
        setDisplay(value);
        setFlipping(false);
        prevRef.current = value;
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative overflow-hidden inv-card" style={{ width: '64px', height: '80px', perspective: '600px' }}>
        <div
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: flipping ? 'rotateX(-15deg)' : 'rotateX(0deg)',
          }}
        >
          <span className="tabular-nums" style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--inv-accent)' }}>
            {String(display).padStart(2, '0')}
          </span>
        </div>
      </div>
      <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, color: 'var(--inv-text-secondary)' }}>{label}</span>
    </div>
  );
}

function SimpleCounter({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center px-2">
      <div className="tabular-nums" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--inv-accent)', lineHeight: 1.2 }}>
        {String(value).padStart(2, '0')}
      </div>
      <div style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, color: 'var(--inv-text-secondary)', marginTop: '0.375rem' }}>{label}</div>
    </div>
  );
}

function ColonSep() {
  return (
    <div className="flex items-center" style={{ fontSize: '1.25rem', fontWeight: 300, color: 'var(--inv-text-secondary)', paddingBottom: '1.5rem' }}>:</div>
  );
}

export function CountdownSection({ config }: Props) {
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  const targetMs = useMemo(
    () => new Date(`${config.eventDate}T${config.eventTime || '00:00'}:00`).getTime(),
    [config.eventDate, config.eventTime],
  );

  useEffect(() => {
    const target = new Date(targetMs);
    setTimeLeft(getTimeLeft(target));
    const timer = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(timer);
  }, [targetMs]);

  const CounterCard = config.countdownStyle === 'simple' ? SimpleCounter : FlipCard;

  return (
    <AnimatedReveal>
      <section className="inv-section-decorated" style={{ padding: 'var(--inv-section-py) var(--inv-section-px)', background: 'var(--inv-bg-alt)', textAlign: 'center' }}>
        {config.showCountdown && timeLeft && !timeLeft.expired && (
          <div className="animate-fade-up flex justify-center gap-3 md:gap-5 mb-8">
            <CounterCard value={timeLeft.days} label="DAYS" />
            <ColonSep />
            <CounterCard value={timeLeft.hours} label="HOURS" />
            <ColonSep />
            <CounterCard value={timeLeft.minutes} label="MIN" />
            <ColonSep />
            <CounterCard value={timeLeft.seconds} label="SEC" />
          </div>
        )}
        {timeLeft?.expired && (
          <div className="animate-fade-up mb-6" style={{ animation: 'celebrate-bounce 2s ease-in-out infinite' }}>
            <div className="mx-auto inv-card" style={{ maxWidth: '280px', padding: '1.5rem', borderTop: '3px solid var(--inv-accent)' }}>
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>{'\u{1F389}'}</span>
              <p style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--inv-accent)' }}>
                {'\u{2728}'} {'\uD589\uC0AC\uAC00 \uC2DC\uC791\uB418\uC5C8\uC2B5\uB2C8\uB2E4!'} {'\u{2728}'}
              </p>
            </div>
          </div>
        )}
        <p style={{ fontSize: 'var(--inv-text-body)', fontWeight: 500, color: 'var(--inv-text-primary)' }}>
          {config.eventDateLabel}
        </p>
      </section>
    </AnimatedReveal>
  );
}
