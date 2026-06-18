import { siteConfig } from '@/lib/config';
import { HeroSection } from '@/components/hero-section';
import { CountdownSection } from '@/components/countdown-section';
import { HostsSection } from '@/components/hosts-section';
import { LocationSection } from '@/components/location-section';
import { GallerySection } from '@/components/gallery-section';
import { AccountSection } from '@/components/account-section';
import { ContactSection } from '@/components/contact-section';

export default function Home() {
  return (
    <>
      <main className="min-h-screen" style={{ background: 'var(--inv-bg)' }}>
        <HeroSection config={siteConfig} />
        <CountdownSection config={siteConfig} />
        <HostsSection config={siteConfig} />
        <LocationSection config={siteConfig} />
        <GallerySection config={siteConfig} />
        <AccountSection config={siteConfig} />
        <ContactSection config={siteConfig} />
      </main>
      <footer className="relative overflow-hidden py-8 text-center text-xs" style={{ color: 'var(--inv-text-secondary)', background: 'linear-gradient(180deg, var(--inv-bg-alt) 0%, var(--inv-bg) 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, var(--inv-accent-soft) 0%, transparent 60%)' }} />
        <div className="relative">
          <div style={{ width: '24px', height: '1px', margin: '0 auto 1rem', background: 'linear-gradient(90deg, transparent, var(--inv-card-border), transparent)' }} />
          <a href="https://linkmap.pages.dev" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity">
            Powered by Linkmap
          </a>
        </div>
      </footer>
    </>
  );
}
