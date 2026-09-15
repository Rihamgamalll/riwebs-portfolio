'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Check, Copy, Mail, MessageCircle, Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { SocialIcon } from '@/components/SocialIcon';

const IG='https://ig.me/m/riweb_s';
const prompts={
  en:[
    'I want a website for my brand. What do you need from me to start?',
    'I have an idea but I am not sure if it should be a website, app or interactive link.',
    'I need a landing page for a product or service.',
    'I want a creative invitation or digital gift link.',
    'I already have a website and want a complete redesign.'
  ],
  ar:[
    'عايز/ة أعمل Website لبراند، إيه المعلومات اللي محتاجينها مني؟',
    'عندي فكرة ومش عارف/ة الأنسب ليها Website ولا App ولا Interactive Link.',
    'محتاج/ة Landing Page لخدمة أو منتج.',
    'عايز/ة Invitation أو Gift Link بفكرة مختلفة.',
    'عندي Website حالي وعايز/ة Redesign كامل.'
  ]
};

export default function ContactPage(){
  const [lang,setLang]=useState<'en'|'ar'>('en');
  const [theme,setTheme]=useState<'light'|'dark'>('light');
  const [copied,setCopied]=useState<number|null>(null);
  const ar=lang==='ar';
  useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=ar?'rtl':'ltr';document.documentElement.dataset.theme=theme},[lang,ar,theme]);
  const copy=async(text:string,i:number)=>{try{await navigator.clipboard.writeText(text)}catch{}setCopied(i)};
  return <main className="contact-page">
    <header className="contact-nav">
      <Link href="/" className="contact-nav__brand"><Image src="/images/riwebs-logo.png" alt="RiWebs" width={48} height={48}/><span>RiWebs</span></Link>
      <div className="contact-nav__actions"><button onClick={()=>setLang(ar?'en':'ar')} className="contact-lang"><span className={!ar?'active':''}>EN</span><i/><span className={ar?'active':''}>ع</span></button><button onClick={()=>setTheme(theme==='light'?'dark':'light')} className="contact-theme" aria-label="Toggle theme">{theme==='light'?<Moon size={17}/>:<Sun size={17}/>}</button></div>
    </header>

    <section className="contact-hero">
      <Link href="/" className="contact-back"><ArrowLeft size={15}/>{ar?'رجوع للموقع':'Back to the work'}</Link>
      <div className="contact-hero__grid">
        <div><span className="contact-kicker">RIWEBS / START A CONVERSATION</span><h1>{ar?<>مش لازم تكون مجهز كل حاجة.<br/><em>ابدأ بالفكرة بس.</em></>:<>You do not need a perfect brief.<br/><em>Start with the idea.</em></>}</h1></div>
        <div className="contact-hero__note"><p>{ar?'اختار أقرب رسالة للي في دماغك. هتتنسخ تلقائيًا، وبعدها افتح إنستجرام وابعتها. ولو فكرتك مختلفة تمامًا، ابعتها بطريقتك.':'Choose the message closest to what you need. We will copy it for you, then open Instagram and send it. If your idea is completely different, send it exactly as it is.'}</p><div className="contact-availability"><span/><b>{ar?'متاح لمشاريع جديدة':'Open for new projects'}</b></div></div>
      </div>
    </section>

    <section className="contact-choices">
      <div className="contact-choices__label"><span>01</span><p>{ar?'ابدأ من هنا':'PICK A STARTING POINT'}</p></div>
      <div className="contact-prompt-list">
        {(ar?prompts.ar:prompts.en).map((p,i)=><motion.button whileHover={{x:ar?-5:5}} key={p} onClick={()=>copy(p,i)} className={copied===i?'copied':''}><span>0{i+1}</span><p>{p}</p><b>{copied===i?<Check size={18}/>:<Copy size={18}/>}</b></motion.button>)}
      </div>
      <div className="contact-open-row"><div><small>{ar?'بعد ما تختار الرسالة':'AFTER YOU COPY A MESSAGE'}</small><p>{copied===null?(ar?'اختار واحدة من فوق الأول.':'Pick one of the messages above first.'):(ar?'اتنسخت. افتح إنستجرام والصقها في الشات.':'Copied. Open Instagram and paste it into the chat.')}</p></div><a href={IG} target="_blank" rel="noreferrer" className={copied===null?'soft-disabled':''}><MessageCircle size={18}/>{ar?'افتح إنستجرام':'Open Instagram'}<ArrowUpRight size={16}/></a></div>
    </section>

    <section className="contact-direct">
      <div className="contact-direct__big"><span>02 / DIRECT</span><h2>{ar?'تحب تبدأ من غير أسئلة؟':'Prefer to just say hi?'}</h2></div>
      <div className="contact-direct__links"><a href={IG} target="_blank" rel="noreferrer"><MessageCircle/><span><b>Instagram</b><small>@riweb_s</small></span><ArrowUpRight/></a><a href="mailto:hello@riwebs.com"><Mail/><span><b>Email</b><small>hello@riwebs.com</small></span><ArrowUpRight/></a></div>
    </section>

    <footer className="contact-footer"><div><Image src="/images/riwebs-logo.png" alt="RiWebs" width={54} height={54}/><span>RIWEBS — DIGITAL EXPERIENCE STUDIO</span></div><div className="contact-socials"><a href="https://www.instagram.com/riweb_s" target="_blank" rel="noreferrer"><SocialIcon name="instagram"/></a><a href="https://tiktok.com/@riwebs?_r=1&_t=ZS-98JlqhtmWA5" target="_blank" rel="noreferrer"><SocialIcon name="tiktok"/></a><a href="https://facebook.com/share/1FPBCjVdJf?mibextid=wwXIfr" target="_blank" rel="noreferrer"><SocialIcon name="facebook"/></a><a href="https://www.linkedin.com/in/riham-gamal-1b4ab5312" target="_blank" rel="noreferrer"><SocialIcon name="linkedin"/></a></div><span>© 2026</span></footer>
  </main>
}
