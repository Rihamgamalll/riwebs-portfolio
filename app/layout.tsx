import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://riwebs.vercel.app'),
  title: 'RiWebs — Digital Experiences Built From Ideas',
  description: 'RiWebs turns ideas into websites, apps, interactive links, invitations and distinctive digital experiences.',
  openGraph: {
    title: 'RiWebs — Digital Experiences Built From Ideas',
    description: 'Websites, apps, links and interactive experiences — designed from the idea, not from a template.',
    type: 'website',
    images: [{url:'/og-home-light.png',width:1200,height:630,alt:'RiWebs light-mode home preview'}],
  },
  twitter: {card:'summary_large_image',title:'RiWebs — Digital Experiences Built From Ideas',description:'Websites, apps, links and interactive experiences.',images:['/og-home-light.png']},
  icons: { icon: '/images/riwebs-logo.png' },
};

export default function RootLayout({children}:{children:ReactNode}){
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
