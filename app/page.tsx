'use client';
import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowDownRight, ArrowUpRight, MessageCircle, Quote } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import ProjectShowcase from '@/components/ProjectShowcase';
import type { Lang } from '@/data/projects';
import { SocialIcon } from '@/components/SocialIcon';
import QuickStartModal from '@/components/QuickStartModal';


const testimonials=[
  {nameEn:'Mariam',nameAr:'مريم',projectEn:'Personal gift experience',projectAr:'تجربة هدية شخصية',time:'11:42 PM',quoteEn:'I am sooo happy with it 😭 Thank you so much Riham You genuinely surprised me this is the best thing to open and find How are you this good at this',quoteAr:'أنا مبسوطة بيه أوي أوي 😭 شكرا بجد يا ريهام فاجئتيني دي أحلى حاجة الواحد يفتح عليها إيه الشطاره دي كلها؟'},
  {nameEn:'Sanaa',nameAr:'سناء',projectEn:'Graduation experience',projectAr:'تجربة تخرج',time:'8:17 PM',quoteEn:'This is honestly the best graduation gift I got Bravo Riri 🤍 Definitely not the last time we work together',quoteAr:'دي أحلى هديه تخرج وصلت ليا بجد 🤍 برافو عليكي بجد يا ريري مش اخر مره نتعامل سوا.'},
];


const builds=[
  {en:'Brand websites',ar:'مواقع البراندات',subEn:'A digital home that feels unmistakably yours.',subAr:'بيت رقمي للبراند، واضح ومميز وشبهك.',featuresEn:['Visual direction','Responsive build','Conversion flow'],featuresAr:['اتجاه بصري','Responsive كامل','رحلة عميل واضحة']},
  {en:'Interactive websites',ar:'مواقع تفاعلية',subEn:'Motion that guides, explains and makes people stay.',subAr:'حركة بتوجّه وتشرح وتخلي الناس تكمل.',featuresEn:['Scroll storytelling','Micro-interactions','Motion systems'],featuresAr:['حكي بالسكرول','Micro-interactions','نظام حركة متكامل']},
  {en:'Apps & web products',ar:'تطبيقات ومنتجات رقمية',subEn:'Useful products with a polished visual language.',subAr:'منتجات عملية بهوية بصرية متقفلة بعناية.',featuresEn:['Product UX','Dashboards','Full-stack build'],featuresAr:['Product UX','Dashboards','Full-stack']},
  {en:'Invitations & links',ar:'دعوات ولينكات',subEn:'Personal moments turned into something people can enter.',subAr:'مناسبة أو رسالة شخصية تتحول لتجربة الناس تدخلها.',featuresEn:['Personal storytelling','Interactive reveals','Shareable links'],featuresAr:['حكي شخصي','مفاجآت تفاعلية','لينكات سهلة المشاركة']},
  {en:'Ideas without a label',ar:'أفكار ملهاش تصنيف',subEn:'If it does not fit a category, that is usually the fun part.',subAr:'لو الفكرة ملهاش تصنيف، غالبًا هنا بيبدأ الجزء الممتع.',featuresEn:['Concept design','Prototype first','Custom interaction'],featuresAr:['تصميم الفكرة','Prototype سريع','تفاعل مخصوص']},
];

export default function Home(){
  const [lang,setLang]=useState<Lang>('en');
  const [theme,setTheme]=useState<'light'|'dark'>('light');
  const [loading,setLoading]=useState(true);
  const [activeBuild,setActiveBuild]=useState(0);
  const [langFlash,setLangFlash]=useState(false);
  const [activeTestimonial,setActiveTestimonial]=useState(0);
  const [quickStartOpen,setQuickStartOpen]=useState(false);
  const root=useRef<HTMLElement>(null);
  const ar=lang==='ar';
  const setLanguage=(l:Lang)=>{if(l===lang)return;setLangFlash(true);setTimeout(()=>setLang(l),170);setTimeout(()=>setLangFlash(false),520)};

  const startInstagram=()=>setQuickStartOpen(true);


  useEffect(()=>{const t=setTimeout(()=>setLoading(false),520);return()=>clearTimeout(t)},[]);
  useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=ar?'rtl':'ltr';document.documentElement.dataset.theme=theme},[lang,ar,theme]);
  useEffect(()=>{
    gsap.registerPlugin(ScrollTrigger);
    const lenis=new Lenis({duration:1.0,smoothWheel:true});let id=0;const raf=(t:number)=>{lenis.raf(t);id=requestAnimationFrame(raf)};id=requestAnimationFrame(raf);
    const ctx=gsap.context(()=>{
      gsap.utils.toArray<HTMLElement>('[data-rise]').forEach(el=>gsap.fromTo(el,{y:26,opacity:0},{y:0,opacity:1,duration:.78,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}}));
      gsap.utils.toArray<HTMLElement>('[data-text]').forEach(el=>gsap.fromTo(el,{y:58,opacity:0,clipPath:'inset(0 0 100% 0)',filter:'blur(7px)'},{y:0,opacity:1,clipPath:'inset(0 0 0% 0)',filter:'blur(0px)',duration:1.05,ease:'power4.out',scrollTrigger:{trigger:el,start:'top 87%',once:true}}));
      gsap.utils.toArray<HTMLElement>('[data-copy]').forEach(el=>gsap.fromTo(el,{y:20,opacity:0},{y:0,opacity:1,duration:.72,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 91%',once:true}}));
      gsap.utils.toArray<HTMLElement>('[data-line]').forEach(el=>gsap.fromTo(el,{scaleX:.08},{scaleX:1,ease:'none',scrollTrigger:{trigger:el,start:'top 92%',end:'top 48%',scrub:true}}));
    },root);
    return()=>{cancelAnimationFrame(id);lenis.destroy();ctx.revert();ScrollTrigger.getAll().forEach(t=>t.kill())};
  },[]);

  return <main ref={root}>
    <AnimatePresence>{loading&&<motion.div className="loader-x" exit={{opacity:0}} transition={{duration:.25}}><motion.div initial={{opacity:0,scale:.93}} animate={{opacity:1,scale:1}}><Image src="/images/riwebs-logo.png" alt="RiWebs" width={112} height={112}/><span>FROM IDEA TO EXPERIENCE</span></motion.div></motion.div>}</AnimatePresence>
    <AnimatePresence>{langFlash&&<motion.div className="lang-flash" initial={{clipPath:'inset(100% 0 0 0)'}} animate={{clipPath:'inset(0% 0 0 0)'}} exit={{clipPath:'inset(0 0 100% 0)'}} transition={{duration:.3,ease:[.76,0,.24,1]}}><motion.span initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}>{lang==='en'?'أهلًا':'HELLO'}</motion.span></motion.div>}</AnimatePresence>
    <Navbar lang={lang} setLang={setLanguage} theme={theme} setTheme={setTheme} onStartProject={startInstagram}/>

    <section className="hero-x" id="top">
      <picture className="hero-x__media" aria-hidden="true">
        <source media="(max-width: 640px)" srcSet={theme==='light'?'/images/hero-light-mobile.jpeg':'/images/hero-dark-mobile.jpeg'} />
        <img src={theme==='light'?'/images/hero-light-desktop.png':'/images/hero-dark-desktop.png'} alt="" />
      </picture>
      <div className="hero-x__shade" aria-hidden="true" />
      <div className="hero-x__meta"><span>RIWEBS® / DIGITAL EXPERIENCE STUDIO</span><span>{ar?'من الفكرة لحد اللينك':'FROM THE FIRST THOUGHT TO THE LIVE LINK'}</span></div>
      <div className="hero-x__main">
        <div className="hero-x__title">
          <span className="hero-x__index">01 / START HERE</span>
          <h1 data-text>{ar?<>مش مجرد موقع.<br/><em>تجربة ليها حضور.</em></>:<>Not just a website.<br/><em>An experience with presence.</em></>}</h1>
        </div>
        <div className="hero-x__aside" data-copy>
          <p>{ar?'مواقع وتجارب رقمية معمولة للفكرة نفسها — مش من قالب جاهز.':'Websites and digital experiences shaped around the idea — never a template.'}</p>
          <div className="hero-x__actions"><button type="button" onClick={startInstagram} className="btn-primary"><MessageCircle size={17}/>{ar?'ابني موقعك':'Build your website'}<ArrowUpRight size={16}/></button><a href="#work" className="btn-ghost">{ar?'شوف المشاريع':'Explore work'}<ArrowDownRight size={16}/></a></div>
        </div>
      </div>
      <div className="hero-x__rail" aria-label="RiWebs capabilities"><span>WEB</span><i/> <span>APPS</span><i/> <span>LINKS</span><i/> <span>INVITATIONS</span><i/> <span>INTERACTIVE</span></div>
      <div className="hero-x__line" data-line/>
    </section>

    <section className="belief-x">
      <div className="section-tag"><span>02</span><p>{ar?'الفكرة أولًا':'IDEA FIRST'}</p></div>
      <div className="belief-x__grid">
        <h2 data-text>{ar?'كل قرار يخدم الفكرة.':'Every decision serves the idea.'}</h2>
        <div data-copy><p>{ar?'نفهم الهدف والإحساس المطلوب، وبعدها الشكل والحركة ييجوا في مكانهم الصح.':'We find the goal and the feeling first. Visuals and motion follow naturally.'}</p><div className="belief-x__notes"><span>01 — CLARITY</span><span>02 — CHARACTER</span><span>03 — INTERACTION</span></div></div>
      </div>
    </section>

    <section className="build-x capability-atlas" id="capabilities">
      <div className="section-tag"><span>03</span><p>{ar?'بنقدر نبني إيه':'WHAT WE CAN BUILD'}</p></div>
      <div className="capability-atlas__intro">
        <h2 data-text>{ar?'اختاري الفكرة. وإحنا نشكّل التجربة.':'Choose the idea. We’ll shape the experience.'}</h2>
        <p data-copy>{ar?'كل مشروع بياخد اتجاهه الخاص.':'Every project gets its own direction.'}</p>
      </div>

      <div className="capability-atlas__shell">
        <div className="capability-atlas__nav" role="tablist" aria-label="RiWebs capabilities">
          {builds.map((b,i)=>{const active=activeBuild===i;return <button
            key={b.en}
            type="button"
            role="tab"
            aria-selected={active}
            className={active?'active':''}
            onMouseEnter={()=>setActiveBuild(i)}
            onFocus={()=>setActiveBuild(i)}
            onClick={()=>setActiveBuild(i)}
          >
            <span className="capability-atlas__num">{String(i+1).padStart(2,'0')}</span>
            <span className="capability-atlas__name">{ar?b.ar:b.en}</span>
            <span className="capability-atlas__arrow"><ArrowUpRight size={18}/></span>
          </button>})}
        </div>

        <div className="capability-atlas__detail" role="tabpanel">
          <div className="capability-atlas__orbit" aria-hidden="true"><i/><i/><i/></div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeBuild}-${lang}`}
              className="capability-atlas__content"
              initial={{opacity:0,y:18}}
              animate={{opacity:1,y:0}}
              exit={{opacity:0,y:-14}}
              transition={{duration:.3,ease:[.22,1,.36,1]}}
            >
              <div className="capability-atlas__top">
                <span>{ar?'الاتجاه الحالي':'CURRENT DIRECTION'}</span>
                <span>{String(activeBuild+1).padStart(2,'0')} / {String(builds.length).padStart(2,'0')}</span>
              </div>
              <strong>{ar?builds[activeBuild].ar:builds[activeBuild].en}</strong>
              <p>{ar?builds[activeBuild].subAr:builds[activeBuild].subEn}</p>
              <div className="capability-atlas__features">
                {(ar?builds[activeBuild].featuresAr:builds[activeBuild].featuresEn).map((f,n)=><span key={f}><i>{String(n+1).padStart(2,'0')}</i><b>{f}</b></span>)}
              </div>
              <div className="capability-atlas__bottom">
                <span>{ar?'من الفكرة → للتصميم → للتنفيذ':'IDEA → DESIGN → BUILD'}</span>
                <button type="button" onClick={startInstagram}>{ar?'ابدأي فكرتك':'Start this idea'}<ArrowUpRight size={16}/></button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="capability-atlas__principles" aria-label="RiWebs build principles">
        <span>{ar?'من الصفر':'FROM SCRATCH'}</span><i/>
        <span>{ar?'موبايل أولًا':'MOBILE FIRST'}</span><i/>
        <span>{ar?'عربي + إنجليزي':'ARABIC + ENGLISH'}</span><i/>
        <span>{ar?'حركة لها معنى':'MOTION WITH PURPOSE'}</span><i/>
        <span>{ar?'تجربة مخصوصة':'CUSTOM EXPERIENCE'}</span>
      </div>
    </section>

    <ProjectShowcase lang={lang}/>


    <section className="voices-x signal-x" id="testimonials">
      <div className="section-tag"><span>05</span><p>{ar?'بعد التسليم':'AFTER LAUNCH'}</p></div>
      <div className="signal-x__head">
        <h2 data-text>{ar?'بعد التسليم، بييجي أحلى جزء.':'The best part comes after launch.'}</h2>
      </div>
      <div className="signal-x__stage">
        <div className="signal-x__selector" role="tablist" aria-label="Client reactions">
          {testimonials.map((t,i)=><button key={t.nameEn} onClick={()=>setActiveTestimonial(i)} className={activeTestimonial===i?'active':''}>
            <span>{String(i+1).padStart(2,'0')}</span>
            <b>{ar?t.nameAr:t.nameEn}</b>
            <small>{ar?t.projectAr:t.projectEn}</small>
          </button>)}
        </div>
        <div className="signal-x__canvas">
          <div className="signal-x__topline"><span><i/> {ar?'رسالة بعد التسليم':'POST-LAUNCH MESSAGE'}</span><span>{testimonials[activeTestimonial].time}</span></div>
          <AnimatePresence mode="wait">
            <motion.div className="signal-x__message" key={`${activeTestimonial}-${lang}`} initial={{opacity:0,y:22,filter:'blur(5px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} exit={{opacity:0,y:-16,filter:'blur(5px)'}} transition={{duration:.34,ease:[.22,1,.36,1]}}>
              <Quote size={22}/>
              <blockquote>{ar?testimonials[activeTestimonial].quoteAr:testimonials[activeTestimonial].quoteEn}</blockquote>
              <div className="signal-x__signature"><span className="signal-x__avatar">{(ar?testimonials[activeTestimonial].nameAr:testimonials[activeTestimonial].nameEn).slice(0,1)}</span><div><b>{ar?testimonials[activeTestimonial].nameAr:testimonials[activeTestimonial].nameEn}</b><small>{ar?testimonials[activeTestimonial].projectAr:testimonials[activeTestimonial].projectEn}</small></div></div>
            </motion.div>
          </AnimatePresence>
          <div className="signal-x__wave" aria-hidden="true">{Array.from({length:24}).map((_,i)=><i key={i} style={{'--h':`${18+((i*13)%48)}%` } as CSSProperties}/>)}</div>
          <button className="signal-x__cta" onClick={startInstagram}>{ar?'خلي رسالتك الجاية هنا':'Make yours the next message'}<ArrowUpRight size={17}/></button>
        </div>
      </div>
    </section>

    <section className="cap-x">

      <div className="section-tag light"><span>06</span><p>{ar?'الطريقة':'HOW IT MOVES'}</p></div>
      <div className="cap-x__headline"><h2 data-text>{ar?'خطوات أقل. نتيجة أذكى.':'Fewer steps. Better work.'}</h2><p data-copy>{ar?'من الفكرة للنشر، من غير لف كتير.':'From idea to live, without the noise.'}</p></div>
      <div className="cap-x__flow">{[
        [ar?'نتكلم':'Talk',ar?'الفكرة والهدف':'idea + goal'],
        [ar?'نشكّل':'Shape',ar?'اتجاه وهوية':'direction + identity'],
        [ar?'نصمم':'Design',ar?'واجهة وحركة':'interface + motion'],
        [ar?'نبني':'Build',ar?'كود وتجربة':'code + interaction'],
        [ar?'نطلق':'Launch',ar?'اختبار ونشر':'test + live']
      ].map((s,i)=><div className="cap-step" key={s[0]}><small>0{i+1}</small><div><h3>{s[0]}</h3><p>{s[1]}</p></div>{i<4&&<span>→</span>}</div>)}</div>
    </section>

    <section className="contact-x" id="contact">
      <div className="section-tag"><span>07</span><p>{ar?'ابدأ من سطر':'START WITH ONE LINE'}</p></div>
      <div className="contact-x__grid"><h2 data-text>{ar?'عندك فكرة؟ ابعتها زي ما هي.':'Have an idea? Send it as it is.'}</h2><div data-copy><p>{ar?'سطر واحد كفاية عشان نبدأ.':'One line is enough to start.'}</p><div className="contact-x__actions"><a href="/contact">{ar?'افتح صفحة التواصل':'Open contact page'}<ArrowUpRight/></a><button type="button" onClick={startInstagram}>{ar?'ابدأ على إنستجرام':'Start on Instagram'}<MessageCircle size={18}/></button></div></div></div>
    </section>

    <footer className="footer-x">
      <div className="footer-x__top"><div className="footer-x__brand"><Image src="/images/riwebs-logo.png" alt="RiWebs" width={64} height={64}/><div><strong>RiWebs</strong><span>{ar?'Digital Experience Studio — من الفكرة للتجربة':'Digital Experience Studio — idea to experience'}</span></div></div><button type="button" className="footer-x__cta" onClick={startInstagram}>{ar?'ابدأ مشروع':'Start a project'}<ArrowUpRight size={18}/></button></div>
      <div className="footer-x__socials">
        <a href="https://www.instagram.com/riweb_s" target="_blank" rel="noreferrer"><span className="social-mark"><SocialIcon name="instagram"/></span><span><b>Instagram</b><small>@riweb_s</small></span><ArrowUpRight size={14}/></a>
        <a href="https://tiktok.com/@riwebs?_r=1&_t=ZS-98JlqhtmWA5" target="_blank" rel="noreferrer"><span className="social-mark"><SocialIcon name="tiktok"/></span><span><b>TikTok</b><small>@riwebs</small></span><ArrowUpRight size={14}/></a>
        <a href="https://facebook.com/share/1FPBCjVdJf?mibextid=wwXIfr" target="_blank" rel="noreferrer"><span className="social-mark"><SocialIcon name="facebook"/></span><span><b>Facebook</b><small>RiWebs</small></span><ArrowUpRight size={14}/></a>
        <a href="https://www.linkedin.com/in/riham-gamal-1b4ab5312" target="_blank" rel="noreferrer"><span className="social-mark"><SocialIcon name="linkedin"/></span><span><b>LinkedIn</b><small>Riham Gamal</small></span><ArrowUpRight size={14}/></a>
      </div>
      <div className="footer-x__end"><span>© 2026 RIWEBS</span><span>{ar?'DESIGN • DEVELOPMENT • INTERACTION':'DESIGN • DEVELOPMENT • INTERACTION'}</span><span>{ar?'Built with intention.':'Built with intention.'}</span></div>
    </footer>

  <QuickStartModal open={quickStartOpen} onClose={()=>setQuickStartOpen(false)} lang={lang}/>
  </main>
}
