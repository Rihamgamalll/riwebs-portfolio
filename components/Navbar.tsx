'use client';
import Image from 'next/image';
import { Moon, Sun, ArrowUpRight } from 'lucide-react';
import type { Lang } from '@/data/projects';

export default function Navbar({lang,setLang,theme,setTheme,onStartProject}:{lang:Lang;setLang:(l:Lang)=>void;theme:'light'|'dark';setTheme:(t:'light'|'dark')=>void;onStartProject:()=>void}){
  const ar=lang==='ar';
  return <header className="nav-x">
    <a className="nav-x__brand" href="#top" aria-label="RiWebs home"><Image src="/images/riwebs-logo.png" alt="RiWebs" width={64} height={64}/><span>RiWebs</span></a>
    <nav className="nav-x__links" aria-label="Primary navigation">
      <a href="#work">{ar?'الشغل':'Work'}</a><a href="#capabilities">{ar?'بنقدر نعمل إيه':'Capabilities'}</a><a href="/contact">{ar?'تواصل':'Contact'}</a>
    </nav>
    <div className="nav-x__actions">
      <button type="button" onClick={onStartProject} className="nav-x__start">{ar?'ابدأ مشروع':'Start a project'}<ArrowUpRight size={14}/></button>
      <button className="lang-switch" onClick={()=>setLang(ar?'en':'ar')} aria-label="Toggle language"><span className={!ar?'active':''}>EN</span><i/><span className={ar?'active':''}>ع</span></button>
      <button className="theme-switch" onClick={()=>setTheme(theme==='light'?'dark':'light')} aria-label="Toggle theme">{theme==='light'?<Moon size={17}/>:<Sun size={17}/>}</button>
    </div>
  </header>
}
