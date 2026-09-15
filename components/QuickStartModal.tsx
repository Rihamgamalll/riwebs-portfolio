'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import type { Lang } from '@/data/projects';

const IG_DM = 'https://ig.me/m/riweb_s';

const prompts = [
  {
    en: 'I want to build a website for my brand. How do we start?',
    ar: 'عايز/ة أعمل Website لبراند، نبدأ إزاي؟',
  },
  {
    en: 'I have an idea, but I am not sure what format fits it best.',
    ar: 'عندي فكرة ومش عارف/ة أنسب شكل ليها إيه.',
  },
  {
    en: 'Can I know the expected budget and timeline?',
    ar: 'ممكن أعرف التكلفة المتوقعة ومدة التنفيذ؟',
  },
  {
    en: 'I want a landing page or a full brand website.',
    ar: 'عايز/ة Landing Page أو Website كامل للبراند.',
  },
  {
    en: 'I want a graduation, gift or invitation experience.',
    ar: 'عايز/ة تجربة تخرج أو هدية أو Invitation مختلفة.',
  },
  {
    en: 'I want to redesign my current website.',
    ar: 'عندي Website وعايز/ة أعمله Redesign كامل.',
  },
];

export default function QuickStartModal({
  open,
  onClose,
  lang,
}: {
  open: boolean;
  onClose: () => void;
  lang: Lang;
}) {
  const ar = lang === 'ar';
  const [copied, setCopied] = useState<number | null>(null);

  const choosePrompt = async (index: number) => {
    const text = ar ? prompts[index].ar : prompts[index].en;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(index);
    } catch {
      setCopied(index);
    }
    window.setTimeout(() => {
      window.open(IG_DM, '_blank', 'noopener,noreferrer');
      window.setTimeout(() => setCopied(null), 900);
    }, 180);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="dm-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="dm-panel dm-panel--quick"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.985 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="dm-close" type="button" onClick={onClose} aria-label="Close">
              <X size={17} />
            </button>

            <div className="dm-kicker"><span className="dm-dot" /> RIWEBS / QUICK START</div>
            <h3>{ar ? 'ابدأ بسؤال. والباقي علينا.' : 'Start with one line. We’ll take it from there.'}</h3>
            <p>
              {ar
                ? 'اختار/ي الجملة الأقرب لفكرتك. هننسخها تلقائيًا ونفتح شات RiWebs على Instagram — الصقها وابعتها فورًا.'
                : 'Pick the line closest to your idea. We’ll copy it automatically and open the RiWebs Instagram chat — paste it and send.'}
            </p>

            <div className="dm-prompts dm-prompts--quick">
              {prompts.map((prompt, index) => (
                <button
                  key={prompt.en}
                  type="button"
                  className={copied === index ? 'copied' : ''}
                  onClick={() => choosePrompt(index)}
                >
                  <span className="dm-prompt-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="dm-prompt-copy">{ar ? prompt.ar : prompt.en}</span>
                  <span className="dm-prompt-icon">
                    {copied === index ? <Check size={17} /> : <Copy size={16} />}
                  </span>
                </button>
              ))}
            </div>

            <div className="dm-actions dm-actions--quick">
              <span>{ar ? 'مش عارف/ة تختار؟ افتح الشات واكتب الفكرة زي ما هي.' : 'Not sure which one fits? Open the chat and send the idea as-is.'}</span>
              <a href={IG_DM} target="_blank" rel="noreferrer">
                <MessageCircle size={16} />
                {ar ? 'افتح الشات مباشرة' : 'Open chat directly'}
                <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
