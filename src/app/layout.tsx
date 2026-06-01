import type { Metadata, Viewport } from "next";
import { Poppins, Unbounded } from "next/font/google";
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
  title: "Kc Casipit | Web Developer Portfolio",
  description: "Official portfolio website for Kc Casipit, showcasing web development, graphic design, and WordPress projects.",
  keywords: ["Kc Casipit", "Web Developer", "Portfolio", "WordPress Developer", "Figma", "Frontend Developer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" type="image/png" href="/assets/img/kc-casipit-logo.png" />
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
      </head>
      <body className={`${poppins.variable} ${unbounded.variable}`}>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}

