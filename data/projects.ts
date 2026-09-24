export type Lang = 'en' | 'ar';

export type Project = {
  id: string;
  number: string;
  name: string;
  image: string;
  url: string;
  categories: string[];
  tone: string;
  type: Record<Lang, string>;
  description: Record<Lang, string>;
};

export const projects: Project[] = [
  {
    id: 'riwebs', number: '01', name: 'RiWebs', image: '/images/projects/riwebs.png', url: 'https://riwebs.vercel.app/',
    categories: ['Brand', 'Creative', 'Interactive'], tone: 'violet',
    type: { en: 'Official RiWebs Website / Brand Concept', ar: 'الموقع الرسمي لـ RiWebs / تجربة البراند' },
    description: {
      en: "RiWebs' main digital experience, built to showcase the brand and its approach to turning ideas into interactive digital experiences.",
      ar: 'الموقع الأساسي لـ RiWebs، معمول كواجهة للبراند وتجربة بتعرض فكرة تحويل الـ Concepts إلى Digital Experiences.'
    }
  },
  {
    id: 'noir', number: '02', name: 'NØIR BEAN', image: '/images/projects/noir-bean.png', url: 'https://noir-bean-three.vercel.app/',
    categories: ['Business', 'Restaurant', 'Creative'], tone: 'coffee',
    type: { en: 'Café Concept / Sensory Web Experience', ar: 'تجربة Café تفاعلية وحسية' },
    description: {
      en: 'A cinematic café concept built around motion, atmosphere and tactile details — coffee beans, milk, ice and crafted micro-interactions.',
      ar: 'تجربة كافيه سينمائية مبنية على الحركة والجو والتفاصيل البصرية؛ من حبوب القهوة والحليب والثلج لحد التفاعلات الصغيرة.'
    }
  },
  {
    id: 'luma', number: '03', name: 'LUMA', image: '/images/projects/luma.png', url: 'https://luma-scarves.vercel.app/',
    categories: ['Brand', 'Fashion', 'Creative'], tone: 'sand',
    type: { en: 'Scarf / Hijab Brand Website Concept', ar: 'تجربة براند طرح وحجاب' },
    description: {
      en: 'An editorial fashion experience where fabric, movement and visual identity work together to make the brand feel tactile on screen.',
      ar: 'تجربة Fashion بروح Editorial، فيها القماش والحركة والهوية البصرية بيشتغلوا مع بعض علشان البراند يتحس على الشاشة.'
    }
  },
  {
    id: 'restaurant', number: '04', name: 'RIWEBS RESTAURANT', image: '/images/projects/restaurant.png', url: 'https://riwebs-restaurant.vercel.app/',
    categories: ['Business', 'Restaurant', 'Interactive'], tone: 'ember',
    type: { en: 'Restaurant Website Concept', ar: 'تجربة موقع مطعم' },
    description: {
      en: 'A bold restaurant experience combining food presentation, web animation and brand storytelling in one highly visual journey.',
      ar: 'تجربة مطعم رقمية جريئة بتجمع بين عرض الأكل، Web Animation، وحضور البراند في رحلة بصرية واحدة.'
    }
  },
  {
    id: 'sanooa', number: '05', name: 'SANOOA GRADUATION', image: '/images/projects/sanooa.png', url: 'https://sanoaa.vercel.app/',
    categories: ['Personal', 'Celebration', 'Creative'], tone: 'blush',
    type: { en: 'Graduation / Personal Celebration Experience', ar: 'تجربة احتفال تخرج شخصية' },
    description: {
      en: 'A playful but polished digital celebration built for a graduation moment — personal, joyful and designed to be remembered.',
      ar: 'احتفال تخرج رقمي مرح وراقي، معمول مخصوص للحظة شخصية ومبهجة تستحق تتعاش وتتفتكر.'
    }
  },
  {
    id: 'mariam', number: '06', name: 'MARIAM HESHAM', image: '/images/projects/mariam.png', url: 'https://mariam-hesham.vercel.app/',
    categories: ['Personal', 'Surprise', 'Creative'], tone: 'rose',
    type: { en: 'Surprise Personal Website / Gift Link', ar: 'موقع شخصي مفاجأة / Gift Link' },
    description: {
      en: 'A personal message transformed into a digital gift — an example of how a moment, memory or note can become an interactive experience.',
      ar: 'رسالة شخصية اتحولت لهدية رقمية؛ مثال على إن مناسبة أو ذكرى أو كلمة ممكن تتحول لتجربة Digital كاملة.'
    }
  },
  {
    id: 'bloom',
    number: '07',
    name: 'BLOOM',
    image: '/images/projects/bloom.png',
    url: 'https://bloom-boutique-git-main-ri-webs.vercel.app/',
    categories: ['Business', 'Brand', 'Creative'],
    tone: 'blush',
    type: {
      en: 'Floral Boutique / Brand Website',
      ar: 'موقع براند زهور وبوكيهات'
    },
    description: {
      en: 'A soft editorial floral experience combining elegant storytelling, product presentation and a warm boutique atmosphere.',
      ar: 'تجربة Floral هادية وراقية بتجمع بين عرض البوكيهات، تفاصيل البراند، وإحساس Boutique دافي ومميز.'
    }
  }
  ];