import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kc Portfolio Project | Next.js & GSAP Developer Showcase',
  description: 'A fully custom, high-performance portfolio built merging state-of-the-art WebGL graphics with cinematic GSAP scroll animations.',
  openGraph: {
    title: 'Kc Portfolio Project',
    description: 'A fully custom, high-performance portfolio.',
    images: ['/assets/img/kc-portfolio-hero-background.jpg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
