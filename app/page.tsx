'use client';
import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowDownRight, ArrowUpRight, Check, Copy, MessageCircle, Quote, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import ProjectShowcase from '@/components/ProjectShowcase';
import type { Lang } from '@/data/projects';
import { SocialIcon } from '@/components/SocialIcon';

const IG_DM='https://ig.me/m/riweb_s';

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
  const [dmOpen,setDmOpen]=useState(false);
  const [copiedPrompt,setCopiedPrompt]=useState<number|null>(null);
  const [activeTestimonial,setActiveTestimonial]=useState(0);
  const root=useRef<HTMLElement>(null);
  const ar=lang==='ar';
  const setLanguage=(l:Lang)=>{if(l===lang)return;setLangFlash(true);setTimeout(()=>setLang(l),170);setTimeout(()=>setLangFlash(false),520)};

  const dmPrompts=ar?[
    'عايز/ة أعمل Website لبراند، إيه المعلومات اللي محتاجينها مني؟',
    'ممكن أعرف متوسط التكلفة والمدة المتوقعة للموقع؟',
    'عندي فكرة ومش عارف/ة الأنسب ليها Website ولا App ولا Link.',
    'محتاج/ة Landing Page لخدمة أو منتج، نبدأ إزاي؟',
    'عايز/ة Invitation أو Gift Link بفكرة مختلفة.',
    'عندي Website حالي وعايز/ة Redesign كامل.'
  ]:[
    'I want a website for my brand. What do you need from me to start?',
    'What is the typical budget range and timeline for a website?',
    'I have an idea but I am not sure if it should be a website, app or link.',
    'I need a landing page for a product or service. How do we start?',
    'I want a creative invitation or digital gift link.',
    'I already have a website and want a complete redesign.'
  ];
  const startInstagram=()=>setDmOpen(true);
  const choosePrompt=async(text:string,index:number)=>{try{await navigator.clipboard.writeText(text)}catch{}setCopiedPrompt(index)};

  useEffect(()=>{const t=setTimeout(()=>setLoading(false),520);return()=>clearTimeout(t)},[]);
  useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=ar?'rtl':'ltr';document.documentElement.dataset.theme=theme},[lang,ar,theme]);
  useEffect(()=>{
    gsap.registerPlugin(ScrollTrigger);
    const lenis=new Lenis({duration:1.0,smoothWheel:true});let id=0;const raf=(t:number)=>{lenis.raf(t);id=requestAnimationFrame(raf)};id=requestAnimationFrame(raf);
    const ctx=gsap.context(()=>{
      gsap.utils.toArray<HTMLElement>('[data-rise]').forEach(el=>gsap.fromTo(el,{y:34,opacity:0},{y:0,opacity:1,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}}));
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
        <div className="hero-x__title" data-rise>
          <span className="hero-x__index">01 / START HERE</span>
          <h1>{ar?<>مش مجرد موقع.<br/><em>تجربة ليها حضور.</em></>:<>Not just a website.<br/><em>An experience with presence.</em></>}</h1>
        </div>
        <div className="hero-x__aside" data-rise>
          <p>{ar?'RiWebs بتحوّل الأفكار لمواقع، تطبيقات، لينكات وتجارب رقمية متصممة من الصفر — مش من قالب جاهز.':'RiWebs turns ideas into websites, apps, links and digital experiences designed from scratch — never from a ready-made template.'}</p>
          <div className="hero-x__actions"><button type="button" onClick={startInstagram} className="btn-primary"><MessageCircle size={17}/>{ar?'ابني موقعك':'Build your website'}<ArrowUpRight size={16}/></button><a href="#work" className="btn-ghost">{ar?'شوف المشاريع':'Explore work'}<ArrowDownRight size={16}/></a></div>
        </div>
      </div>
      <div className="hero-x__rail" aria-label="RiWebs capabilities"><span>WEB</span><i/> <span>APPS</span><i/> <span>LINKS</span><i/> <span>INVITATIONS</span><i/> <span>INTERACTIVE</span></div>
      <div className="hero-x__line" data-line/>
    </section>

    <section className="belief-x">
      <div className="section-tag"><span>02</span><p>{ar?'الفكرة قبل الشكل':'CONCEPT BEFORE DECORATION'}</p></div>
      <div className="belief-x__grid">
        <h2 data-rise>{ar?'الشكل الحلو لوحده مش كفاية. كل قرار لازم يخدم الفكرة.':'Pretty is not the brief. Every decision should serve the idea.'}</h2>
        <div data-rise><p>{ar?'بنبدأ من السؤال الصح: مين هيستخدم التجربة؟ عايزينه يحس بإيه؟ وإيه أهم حاجة يعملها؟ من هنا بنختار الشكل، الحركة وطريقة التفاعل.':'We start with the right questions: who is this for, how should it feel, and what should people do next? That decides the visual language, motion and interaction.'}</p><div className="belief-x__notes"><span>01 — CLARITY</span><span>02 — CHARACTER</span><span>03 — INTERACTION</span></div></div>
      </div>
    </section>

    <section className="build-x capability-atlas" id="capabilities">
      <div className="section-tag"><span>03</span><p>{ar?'بنقدر نبني إيه':'WHAT WE CAN BUILD'}</p></div>
      <div className="capability-atlas__intro">
        <h2 data-rise>{ar?'اختاري اللي عايزة تعمليه. وإحنا ندي الفكرة شكلها الصح.':'Choose what you want to make. We’ll shape the right experience around it.'}</h2>
        <p>{ar?'مش باكدجات محفوظة. دي نقطة بداية تخلّي العميل يفهم بسرعة إيه اللي ممكن نعمله، وبعدها كل مشروع بياخد اتجاهه الخاص.':'Not fixed packages. Just a clear starting point — every project gets its own visual language, interaction and build.'}</p>
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
        <h2 data-rise>{ar?'الجزء اللي مبيتعملش له موكاب: رد الفعل الحقيقي.':'The part you cannot mock up: the reaction after launch.'}</h2>
        <p>{ar?'بدل حائط تقييمات تقليدي، خلّينا الرسائل نفسها هي العنصر الأساسي. اختاري الاسم وشوفي الرسالة زي ما وصلت.':'Instead of a testimonial wall, the message itself becomes the experience. Pick a name and let the reaction take the screen.'}</p>
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
      <div className="cap-x__headline"><h2>{ar?'أقل خطوات. قرارات أذكى.':'Less ceremony. Better decisions.'}</h2><p>{ar?'كل مرحلة لها هدف واضح، عشان نتحرك بسرعة من غير ما النتيجة تبان مستعجلة.':'Every phase has one job, so we move quickly without making the work feel rushed.'}</p></div>
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
      <div className="contact-x__grid"><h2>{ar?'عندك فكرة؟ ابعتها زي ما هي.':'Have an idea? Send it exactly as it is.'}</h2><div><p>{ar?'مش محتاج Proposal ولا Brief جاهز. اختار سؤال بداية، افتح إنستجرام، ونكمّل من هناك.':'No polished brief needed. Pick a starting question, open Instagram, and we will take it from there.'}</p><div className="contact-x__actions"><a href="/contact">{ar?'افتح صفحة التواصل':'Open contact page'}<ArrowUpRight/></a><button type="button" onClick={startInstagram}>{ar?'ابدأ على إنستجرام':'Start on Instagram'}<MessageCircle size={18}/></button></div></div></div>
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

    <AnimatePresence>{dmOpen&&<motion.div className="dm-layer" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={(e)=>{if(e.target===e.currentTarget)setDmOpen(false)}}><motion.div className="dm-panel" initial={{y:24,opacity:0,scale:.985}} animate={{y:0,opacity:1,scale:1}} exit={{y:16,opacity:0,scale:.985}} transition={{duration:.25,ease:[.22,1,.36,1]}}><button className="dm-close" onClick={()=>setDmOpen(false)} aria-label="Close"><X size={20}/></button><div className="dm-kicker"><span className="dm-dot"/> {ar?'ابدأ من هنا':'START HERE'}</div><h3>{ar?'اختار سؤال بداية.':'Pick the question closest to what you need.'}</h3><p>{ar?'هننسخه تلقائيًا، وبعدها افتح إنستجرام والصقه في الشات.':'We will copy it for you. Then open Instagram and paste it into the chat.'}</p><div className="dm-prompts">{dmPrompts.map((prompt,i)=><button key={prompt} onClick={()=>choosePrompt(prompt,i)} className={copiedPrompt===i?'copied':''}><span>{prompt}</span>{copiedPrompt===i?<Check size={18}/>:<Copy size={18}/>}</button>)}</div><div className="dm-actions"><span>{copiedPrompt===null?(ar?'اختار سؤال الأول':'Choose a question first'):(ar?'اتنسخ ✓':'Copied ✓')}</span><a href={IG_DM} target="_blank" rel="noreferrer" className={copiedPrompt===null?'disabled':''}>{ar?'افتح إنستجرام':'Open Instagram'}<ArrowUpRight size={17}/></a></div></motion.div></motion.div>}</AnimatePresence>
  </main>
}
