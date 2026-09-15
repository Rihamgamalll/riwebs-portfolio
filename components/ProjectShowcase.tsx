'use client';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { categories, projects, type Lang } from '@/data/projects';
import { useMemo, useState, type CSSProperties } from 'react';

const projectPalette: Record<string,{accent:string;soft:string}> = {
  riwebs: { accent:'#70576f', soft:'#e9dfe8' },
  noir: { accent:'#765036', soft:'#eadfd4' },
  luma: { accent:'#a58e7c', soft:'#eee6dc' },
  restaurant: { accent:'#9a5d39', soft:'#efe0d4' },
  sanooa: { accent:'#8d8c67', soft:'#ebe9dc' },
  mariam: { accent:'#b27e8d', soft:'#f0e1e5' },
};

export default function ProjectShowcase({lang}:{lang:Lang}){
  const [filter,setFilter]=useState('All');
  const ar=lang==='ar';
  const visible=useMemo(()=>filter==='All'?projects:projects.filter(p=>p.categories.includes(filter)),[filter]);
  return <section className="work-x" id="work">
    <div className="section-tag"><span>04</span><p>{ar?'شغل مختار':'SELECTED WORK'}</p></div>
    <div className="work-x__intro"><h2>{ar?'بعض المشاريع. كل واحد له عالمه.':'Some projects. Each one its own world.'}</h2><p>{ar?'اختار النوع أو اسكرول. هنا بس بتظهر صور المشاريع، وكل شاشة تقدر تدخل منها الموقع الحقيقي.':'Filter by type or simply scroll. Project imagery lives here only, and every screen opens the real website.'}</p></div>
    <div className="work-x__filters" role="tablist" aria-label="Project filters">{categories.map((c,i)=><button key={c} onClick={()=>setFilter(c)} className={filter===c?'active':''}><span>{c}</span><small>{String(i+1).padStart(2,'0')}</small></button>)}</div>
    <div className="work-deck">
      {visible.map((p,i)=>{const palette=projectPalette[p.id]||{accent:'#8d6f7a',soft:'#eee7e4'};return <article className="work-card" key={p.id} style={{'--card-index':i,'--project-accent':palette.accent,'--project-soft':palette.soft} as CSSProperties}>
        <a href={p.url} target="_blank" rel="noreferrer" className="work-card__visual" aria-label={`Open ${p.name}`}><Image src={p.image} alt={`${p.name} website`} fill sizes="(max-width: 900px) 94vw, 86vw" priority={i<2}/><span className="work-card__open">{ar?'افتح الموقع':'OPEN LIVE'}<ArrowUpRight size={14}/></span></a>
        <div className="work-card__caption"><div><span>{p.number}</span><small>{p.type[lang]}</small></div><h3>{p.name}</h3><p>{p.description[lang]}</p><a href={p.url} target="_blank" rel="noreferrer">{ar?'ادخل التجربة':'Enter experience'}<ArrowUpRight size={16}/></a></div>
      </article>})}
    </div>
  </section>
}
