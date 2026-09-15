'use client';
import { Instagram, Facebook, Linkedin } from 'lucide-react';

export function TikTokIcon({size=20}:{size?:number}){
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M14.2 3c.45 2.38 1.8 3.78 4.15 4.15v3.05a9.01 9.01 0 0 1-4.15-1.21v5.56A5.55 5.55 0 1 1 9.4 9.06v3.13a2.5 2.5 0 1 0 1.75 2.39V3h3.05Z" fill="currentColor"/>
  </svg>
}

export function SocialIcon({name,size=20}:{name:'instagram'|'tiktok'|'facebook'|'linkedin';size?:number}){
  if(name==='instagram') return <Instagram size={size}/>;
  if(name==='facebook') return <Facebook size={size}/>;
  if(name==='linkedin') return <Linkedin size={size}/>;
  return <TikTokIcon size={size}/>;
}
