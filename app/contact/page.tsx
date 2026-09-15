'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Mail, MessageCircle, Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { SocialIcon } from '@/components/SocialIcon';
import QuickStartModal from '@/components/QuickStartModal';

const IG='https://ig.me/m/riweb_s';
export default function ContactPage(){
  const [lang,setLang]=useState<'en'|'ar'>('en');
  const [theme,setTheme]=useState<'light'|'dark'>('light');
  const [quickStartOpen,setQuickStartOpen]=useState(false);
  const ar=lang==='ar';
  useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=ar?'rtl':'ltr';document.documentElement.dataset.theme=theme},[lang,ar,theme]);
  return <main className="contact-page">
    <header className="contact-nav">
      <Link href="/" className="contact-nav__brand"><Image src="/images/riwebs-logo.png" alt="RiWebs" width={48} height={48}/><span>RiWebs</span></Link>
      <div className="contact-nav__actions"><button onClick={()=>setLang(ar?'en':'ar')} className="contact-lang"><span className={!ar?'active':''}>EN</span><i/><span className={ar?'active':''}>ع</span></button><button onClick={()=>setTheme(theme==='light'?'dark':'light')} className="contact-theme" aria-label="Toggle theme">{theme==='light'?<Moon size={17}/>:<Sun size={17}/>}</button></div>
    </header>

    <section className="contact-hero">
      <Link href="/" className="contact-back"><ArrowLeft size={15}/>{ar?'رجوع للموقع':'Back to the work'}</Link>
      <div className="contact-hero__grid">
        <div><span className="contact-kicker">RIWEBS / START A CONVERSATION</span><h1>{ar?<>مش لازم تكون مجهز كل حاجة.<br/><em>ابدأ بالفكرة بس.</em></>:<>You do not need a perfect brief.<br/><em>Start with the idea.</em></>}</h1></div>
        <div className="contact-hero__note"><p>{ar?'اختار/ي سؤال البداية الأقرب لفكرتك من عندنا. هننسخه تلقائيًا ونفتحلك شات RiWebs على Instagram عشان تبعته فورًا.':'Choose the starting question closest to your idea here. We’ll copy it automatically and open the RiWebs Instagram chat so you can send it right away.'}</p><div className="contact-availability"><span/><b>{ar?'متاح لمشاريع جديدة':'Open for new projects'}</b></div></div>
      </div>
    </section>

    <section className="contact-choices contact-chat-launch">
      <div className="contact-choices__label"><span>01</span><p>{ar?'ابدأ من الشات':'START IN THE CHAT'}</p></div>
      <div className="contact-chat-launch__grid">
        <div className="contact-chat-launch__copy">
          <h2>{ar?'اختار الرسالة اللي شبه فكرتك.':'Pick the message that fits your idea.'}</h2>
          <p>{ar?'لما تختار/ي رسالة، هننسخها تلقائيًا ونفتح شات RiWebs مباشرة. كل اللي عليك تلزقها وتبعتها.':'Choose a message and we’ll copy it automatically, then open the RiWebs Instagram chat. Just paste and send.'}</p>
          <button type="button" onClick={()=>setQuickStartOpen(true)} className="contact-chat-launch__button"><MessageCircle size={20}/>{ar?'اختار رسالة وابدأ':'Pick a message & start'}<ArrowUpRight size={17}/></button>
        </div>
        <div className="contact-chat-launch__questions" aria-label={ar?'أمثلة للأسئلة الجاهزة':'Quick question examples'}>
          {[
            ar?'عايز/ة أعمل Website لبراند.':'I want a website for my brand.',
            ar?'ممكن أعرف التكلفة والمدة؟':'Can I know the budget and timeline?',
            ar?'عندي فكرة ومش عارف/ة أنسب شكل ليها.':'I have an idea and need help choosing the right format.',
            ar?'عايز/ة Invitation أو Gift Link.':'I want an invitation or digital gift link.'
          ].map((q,i)=><div key={q}><span>0{i+1}</span><p>{q}</p></div>)}
        </div>
      </div>
    </section>

    <section className="contact-direct">
      <div className="contact-direct__big"><span>02 / DIRECT</span><h2>{ar?'تحب تبدأ من غير أسئلة؟':'Prefer to just say hi?'}</h2></div>
      <div className="contact-direct__links"><button type="button" onClick={()=>setQuickStartOpen(true)}><MessageCircle/><span><b>Instagram</b><small>@riweb_s</small></span><ArrowUpRight/></button><a href="mailto:hello@riwebs.com"><Mail/><span><b>Email</b><small>hello@riwebs.com</small></span><ArrowUpRight/></a></div>
    </section>

    <footer className="contact-footer"><div><Image src="/images/riwebs-logo.png" alt="RiWebs" width={54} height={54}/><span>RIWEBS — DIGITAL EXPERIENCE STUDIO</span></div><div className="contact-socials"><a href="https://www.instagram.com/riweb_s" target="_blank" rel="noreferrer"><SocialIcon name="instagram"/></a><a href="https://tiktok.com/@riwebs?_r=1&_t=ZS-98JlqhtmWA5" target="_blank" rel="noreferrer"><SocialIcon name="tiktok"/></a><a href="https://facebook.com/share/1FPBCjVdJf?mibextid=wwXIfr" target="_blank" rel="noreferrer"><SocialIcon name="facebook"/></a><a href="https://www.linkedin.com/in/riham-gamal-1b4ab5312" target="_blank" rel="noreferrer"><SocialIcon name="linkedin"/></a></div><span>© 2026</span></footer>
    <QuickStartModal open={quickStartOpen} onClose={()=>setQuickStartOpen(false)} lang={lang}/>
</main>
}
