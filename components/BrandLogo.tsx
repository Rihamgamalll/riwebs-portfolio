'use client';
import Image from 'next/image';
export default function BrandLogo({ compact = false }: { compact?: boolean }) {
  return <div className={`brand-logo ${compact ? 'compact' : ''}`}><Image src="/images/riwebs-logo.png" alt="RiWebs" width={730} height={593} priority={!compact} /></div>;
}
