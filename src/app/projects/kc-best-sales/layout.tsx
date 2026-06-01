import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kc Best Sales | Custom eCommerce Solutions',
  description: 'A scalable, modern eCommerce platform designed for high conversion rates and seamless user experiences.',
  openGraph: {
    title: 'Kc Best Sales Project',
    description: 'Custom eCommerce web development.',
    images: ['/assets/img/kc-best-sales-hero-background.webp'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
