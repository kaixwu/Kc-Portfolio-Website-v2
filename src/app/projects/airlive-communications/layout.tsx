import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Airlive Communications | Enterprise Web Development',
  description: 'A robust, enterprise-grade web platform engineered for Airlive Communications to showcase their B2B services.',
  openGraph: {
    title: 'Airlive Communications Project',
    description: 'Enterprise B2B web platform development.',
    images: ['/assets/img/airlive-coms-hero-background.webp'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
