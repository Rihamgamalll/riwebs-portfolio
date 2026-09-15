import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-riwebs.vercel.app'),

  title: 'RiWebs — Digital Experiences Built From Ideas',
  description: 'Websites, apps, links and interactive experiences.',

  openGraph: {
    title: 'RiWebs — Digital Experiences Built From Ideas',
    description: 'Websites, apps, links and interactive experiences.',
    url: 'https://portfolio-riwebs.vercel.app',
    siteName: 'RiWebs',
    images: [
      {
        url: '/og-home-light.png',
        width: 1200,
        height: 630,
        alt: 'RiWebs Portfolio',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'RiWebs — Digital Experiences Built From Ideas',
    description: 'Websites, apps, links and interactive experiences.',
    images: ['/og-home-light.png'],
  },

  icons: {
    icon: '/images/riwebs-logo.png',
    shortcut: '/images/riwebs-logo.png',
    apple: '/images/riwebs-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}