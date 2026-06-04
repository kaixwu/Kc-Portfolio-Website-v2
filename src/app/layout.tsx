import type { Metadata, Viewport } from "next";
import { Poppins, Unbounded } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const unbounded = Unbounded({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-unbounded',
  display: 'swap',
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://kc-portfolio-xi.vercel.app'),
  title: "Kc Casipit | Web Developer Portfolio",
  description: "Official portfolio website for Kc Casipit, a highly skilled web developer specializing in Next.js, WordPress, and scalable digital solutions.",
  keywords: ["Kc Casipit", "Kc Casipit portfolio", "Casipit portfolio", "Casipit developer", "Casipit IT", "Web Developer", "Frontend Developer", "Next.js Developer"],
  authors: [{ name: 'Kc Casipit' }],
  creator: 'Kc Casipit',
  openGraph: {
    title: 'Kc Casipit | Web Developer Portfolio',
    description: 'Explore the projects and expertise of Kc Casipit, a professional web developer.',
    url: 'https://kc-portfolio-xi.vercel.app',
    siteName: 'Kc Casipit Portfolio',
    images: [
      {
        url: '/assets/img/kc-casipit-logo.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kc Casipit | Web Developer Portfolio',
    description: 'Explore the projects and expertise of Kc Casipit, a professional web developer.',
    images: ['/assets/img/kc-casipit-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Kc Casipit',
    jobTitle: 'Web Developer',
    url: 'https://kc-portfolio-xi.vercel.app',
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" type="image/png" href="/assets/img/kc-casipit-logo.png" />
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${poppins.variable} ${unbounded.variable}`}>
        <ScrollToTop />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

