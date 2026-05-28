import type { Metadata, Viewport } from "next";
import "./globals.css";

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
      </head>
      <body>{children}</body>
    </html>
  );
}

