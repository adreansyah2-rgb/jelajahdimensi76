/**
 * SIMPEL AI Studio - Content Generator
 * Mengubah komponen React menjadi generator yang dapat menghasilkan konten secara bertahap
 */

interface ProductData {
  name: string;
  visualAnchor: string;
  preview?: string;
  supportSlots?: Array<{ preview: string; note: string }>;
}

interface ContentGeneratorConfig {
  product: ProductData;
  concept: string;
  language?: 'Indonesia' | 'English' | 'Bahasa Jawa';
  outputFormat?: 'image' | 'text';
  outputType?: 'auto' | 'broll' | 'ugc' | 'komersial';
  ratio?: '9:16' | '4:5' | '1:1' | '5:4' | '16:9';
  modelMode?: 'upload' | 'ai' | 'mannequin';
  bgMode?: 'auto' | 'manual';
  useAccent?: boolean;
  accentDesc?: string;
}

interface GeneratedContent {
  category: 'broll' | 'ugc' | 'komersial' | 'pov' | 'instant';
  prompt: string;
  caption: string;
  imageUrl?: string;
}

interface NarrationConfig {
  type: 'IKLAN PENDEK (Max 15s)' | 'IKLAN PANJANG (Max 30s)' | 'STORYTELLING (Max 60s)' | 'REVIEW PRODUK (Max 45s)';
  voiceActor: string;
  voiceVibe: string;
}

/**
 * Generator utama untuk menghasilkan konten foto produk
 * Menggunakan yield untuk mengembalikan hasil secara bertahap
 */
export function* generateContentVariations(config: ContentGeneratorConfig): Generator<GeneratedContent> {
  const { product, concept, language = 'Indonesia', outputType = 'auto', ratio = '1:1' } = config;

  const categories = outputType === 'auto' 
    ? ['broll', 'ugc', 'komersial'] 
    : [outputType];

  for (const category of categories) {
    for (let i = 0; i < 4; i++) {
      const content = generateSingleVariation(category as any, product, concept, language, ratio, i);
      yield content;
    }
  }
}

/**
 * Generator untuk POV content
 */
export function* generatePOVVariations(
  product: ProductData,
  concept: string,
  language: string = 'Indonesia',
  ratio: string = '1:1'
): Generator<GeneratedContent> {
  for (let i = 0; i < 4; i++) {
    const content = generateSingleVariation('pov', product, concept, language, ratio, i);
    yield content;
  }
}

/**
 * Generator untuk Instant content (3 variasi cepat)
 */
export function* generateInstantVariations(
  idea: string,
  productName: string,
  language: string = 'Indonesia',
  ratio: string = '1:1'
): Generator<GeneratedContent> {
  for (let i = 0; i < 3; i++) {
    const prompt = generateInstantPrompt(idea, productName, i);
    const caption = generateInstantCaption(idea, language, i);
    
    yield {
      category: 'instant',
      prompt,
      caption
    };
  }
}

/**
 * Generator untuk narasi (voice-over) dengan emosi dan penyutradaraan
 */
export function* generateNarrationWithEmotions(
  product: ProductData,
  concept: string,
  config: NarrationConfig,
  language: string = 'Indonesia'
): Generator<{ section: string; content: string; emotionTags: string[] }> {
  const { type, voiceVibe } = config;
  
  yield {
    section: 'DIRECTOR\'S NOTES',
    content: generateDirectorNotes(voiceVibe, type),
    emotionTags: extractEmotionTags(voiceVibe)
  };
  
  yield {
    section: 'OPENING',
    content: generateNarrationOpening(product, voiceVibe, language),
    emotionTags: ['excited', 'welcoming']
  };
  
  const points = generateProductPoints(product, concept, language);
  for (let i = 0; i < points.length; i++) {
    yield {
      section: `POINT_${i + 1}`,
      content: points[i],
      emotionTags: generateEmotionTags(voiceVibe, i)
    };
  }
  
  yield {
    section: 'CALL_TO_ACTION',
    content: generateCTA(voiceVibe, language),
    emotionTags: ['urgent', 'persuasive']
  };
  
  yield {
    section: 'CLOSING',
    content: generateClosing(voiceVibe, language),
    emotionTags: ['confident', 'friendly']
  };
}

/**
 * Generator untuk caption setiap platform
 */
export function* generatePlatformCaptions(
  product: ProductData,
  concept: string,
  platforms: string[],
  language: string = 'Indonesia'
): Generator<{ platform: string; caption: string }> {
  for (const platform of platforms) {
    const caption = generateCaptionForPlatform(platform, product, concept, language);
    yield { platform, caption };
  }
}

/**
 * Generator untuk live host script sections
 */
export function* generateLiveHostScript(
  product: ProductData,
  concept: string,
  style: 'santai' | 'energik' | 'formal',
  duration: 'singkat' | 'sedang' | 'panjang',
  promoPoints: string[],
  language: string = 'Indonesia'
): Generator<{ section: string; content: string; duration: number }> {
  const targetDurationSecs = duration === 'singkat' ? 30 : duration === 'sedang' ? 60 : 120;
  
  yield {
    section: 'OPENING',
    content: generateLiveHostOpening(product, style, language),
    duration: 10
  };
  
  const basePoints = [
    product.visualAnchor,
    concept,
    ...promoPoints
  ].filter(p => p && p.trim());
  
  for (let i = 0; i < basePoints.length; i++) {
    yield {
      section: `POINT_${i + 1}`,
      content: generateLiveHostPoint(basePoints[i], style, language),
      duration: 12
    };
  }
  
  yield {
    section: 'CTA',
    content: generateLiveHostCTA(style, language),
    duration: 8
  };
  
  yield {
    section: 'CLOSING',
    content: generateLiveHostClosing(style, language),
    duration: 5
  };
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function generateSingleVariation(
  category: 'broll' | 'ugc' | 'komersial' | 'pov' | 'instant',
  product: ProductData,
  concept: string,
  language: string,
  ratio: string,
  index: number
): GeneratedContent {
  
  const categoryDescriptions = {
    broll: 'B-Roll (Detail Shot): Kamera SANGAT DEKAT (Macro/Extreme Close-Up)',
    ugc: 'UGC (User Generated Content): Foto lifestyle kasual & organik',
    komersial: 'Komersial (Commercial Ads): Fotografi periklanan kelas atas yang elegan',
    pov: 'POV (Point-of-View): Sudut pandang orang pertama'
  };
  
  const prompts = [
    `${categoryDescriptions[category]}. Produk: ${product.name}. ${product.visualAnchor}. Rasio: ${ratio}. Variasi ${index + 1}: Detail ekstrim, pencahayaan dramatis, bokeh tajam.`,
    `${categoryDescriptions[category]}. ${concept}. Produk utama: ${product.name}. Variasi ${index + 1}: Sudut berbeda, lighting alami, komposisi dinamis.`,
    `${categoryDescriptions[category]}. Fokus pada ${product.visualAnchor}. Konsep: ${concept}. Variasi ${index + 1}: Macro shot, tekstur terlihat, warna punchy.`,
    `${categoryDescriptions[category]}. ${product.name} sebagai bintang. ${concept}. Variasi ${index + 1}: Full frame, studio setup, presisi tinggi.`
  ];
  
  const captions = [
    language === 'Indonesia' ? `Produk berkualitas tinggi dengan detail menawan. Rasakan perbedaannya! ✨` : `High-quality product with amazing details. Feel the difference! ✨`,
    language === 'Indonesia' ? `Sempurna untuk ${concept.split(' ')[0]}. Jangan lewatkan! 🎯` : `Perfect for ${concept.split(' ')[0]}. Don't miss out! 🎯`,
    language === 'Indonesia' ? `${product.name}: pilihan terbaik untuk Anda. 💯` : `${product.name}: the best choice for you. 💯`,
    language === 'Indonesia' ? `Kualitas premium, harga terjangkau. Pesan sekarang! 🛒` : `Premium quality, affordable price. Order now! 🛒`
  ];
  
  return {
    category,
    prompt: prompts[index % prompts.length],
    caption: captions[index % captions.length]
  };
}

function generateInstantPrompt(idea: string, productName: string, index: number): string {
  const styles = [
    'cinematic photography with warm lighting',
    'bright and airy lifestyle shot',
    'moody and dramatic studio setup'
  ];
  
  return `${idea}. Produk: ${productName}. Gaya: ${styles[index]}. Komposisi menarik, high quality, 4K.`;
}

function generateInstantCaption(idea: string, language: string, index: number): string {
  const templates = [
    language === 'Indonesia' ? '💡 Ide terbaik hari ini! Cek sekarang juga.' : '💡 Best idea today! Check it out now.',
    language === 'Indonesia' ? '✨ Baru dan eksklusif! Stok terbatas.' : '✨ New and exclusive! Limited stock.',
    language === 'Indonesia' ? '🔥 Trending sekarang! Jangan ketinggalan.' : '🔥 Trending now! Don\'t miss out.'
  ];
  
  return templates[index % templates.length];
}

function generateDirectorNotes(voiceVibe: string, type: string): string {
  return `Voice Style for ${type}: Professional and engaging delivery`;
}

function extractEmotionTags(voiceVibe: string): string[] {
  return ['neutral', 'professional'];
}

function generateNarrationOpening(product: ProductData, voiceVibe: string, language: string): string {
  return language === 'Indonesia' 
    ? `[warm] Hai! Aku punya sesuatu yang menarik untuk kamu hari ini. ${product.name} terbaru yang super keren!`
    : `[warm] Hey! I've got something exciting for you today. The latest ${product.name} that's super cool!`;
}

function generateProductPoints(product: ProductData, concept: string, language: string): string[] {
  return [
    language === 'Indonesia'
      ? `[pause] Lihat ${product.visualAnchor}. Desainnya sempurna untuk kebutuhan sehari-hari.`
      : `[pause] Look at ${product.visualAnchor}. The design is perfect for everyday needs.`,
    language === 'Indonesia'
      ? `[slow] Kualitas material yang kami gunakan adalah yang terbaik di kelasnya.`
      : `[slow] The quality of materials we use is the best in its class.`,
    language === 'Indonesia'
      ? `[enthusiastic] Dan yang terbaik? ${concept}. Ini adalah investasi terbaik Anda!`
      : `[enthusiastic] And the best part? ${concept}. This is your best investment!`
  ];
}

function generateEmotionTags(voiceVibe: string, pointIndex: number): string[] {
  const emotionProgression = [
    ['engaging', 'descriptive'],
    ['persuasive', 'confident'],
    ['compelling', 'urgent']
  ];
  
  return emotionProgression[pointIndex % emotionProgression.length];
}

function generateCTA(voiceVibe: string, language: string): string {
  return language === 'Indonesia'
    ? `[urgent] Buruan pesan sekarang sebelum kehabisan stok! Tap keranjang kuning di bawah!`
    : `[urgent] Order now before it's out of stock! Tap the yellow cart below!`;
}

function generateClosing(voiceVibe: string, language: string): string {
  return language === 'Indonesia'
    ? `[warm] Terima kasih sudah nonton! Semoga puas dengan pilihan Anda! 😊`
    : `[warm] Thanks for watching! Hope you're happy with your choice! 😊`;
}

function generateCaptionForPlatform(
  platform: string,
  product: ProductData,
  concept: string,
  language: string
): string {
  const templates: Record<string, Record<string, string>> = {
    instagram: {
      Indonesia: `✨ ${product.name}: ${concept}\n\n${product.visualAnchor}\n\n🔗 Link di bio\n#produktbaru #lifestyle #${product.name.replace(/\s+/g, '')}`,
      English: `✨ ${product.name}: ${concept}\n\n${product.visualAnchor}\n\n🔗 Link in bio\n#newproduct #lifestyle #${product.name.replace(/\s+/g, '')}`
    },
    tiktok: {
      Indonesia: `${product.name} × ${concept} 🚀 Stok terbatas! Link di bio ⬇️`,
      English: `${product.name} × ${concept} 🚀 Limited stock! Link in bio ⬇️`
    },
    whatsapp: {
      Indonesia: `Halo! 👋 Aku punya ${product.name} yang bagus. ${concept}. Minat? Klik link untuk info lebih lanjut 😊`,
      English: `Hi! 👋 I have a nice ${product.name}. ${concept}. Interested? Click the link for more info 😊`
    },
    marketplace: {
      Indonesia: `${product.name} Premium | ${concept}\n\n✅ Kualitas terjamin\n✅ Garansi resmi\n✅ Gratis ongkir (promo)\n\n${product.visualAnchor}`,
      English: `${product.name} Premium | ${concept}\n\n✅ Quality guaranteed\n✅ Official warranty\n✅ Free shipping (promo)\n\n${product.visualAnchor}`
    }
  };
  
  const lang = language === 'Indonesia' ? 'Indonesia' : 'English';
  return templates[platform]?.[lang] || `Check out ${product.name}!`;
}

function generateLiveHostOpening(product: ProductData, style: string, language: string): string {
  return style === 'santai'
    ? language === 'Indonesia'
      ? `Yooo teman-teman! Apa kabar? Hari ini kita mau bahas ${product.name} yang super oke.`
      : `Yo everyone! What's up? Today we're talking about ${product.name} which is super cool.`
    : language === 'Indonesia'
    ? `Halo semua! Selamat datang di live kami. Produk hari ini: ${product.name}!`
    : `Hello everyone! Welcome to our live. Today's product: ${product.name}!`;
}

function generateLiveHostPoint(point: string, style: string, language: string): string {
  return style === 'santai'
    ? language === 'Indonesia'
      ? `Jadi, yang bikin ini special adalah: ${point}`
      : `So, what makes this special is: ${point}`
    : language === 'Indonesia'
    ? `Perhatian! Ini yang paling keren: ${point}`
    : `Attention! Here's the coolest part: ${point}`;
}

function generateLiveHostCTA(style: string, language: string): string {
  return style === 'santai'
    ? language === 'Indonesia'
      ? `Nah, yang mau, langsung aja klik tombol beli yuk. Harga spesial cuma hari ini!`
      : `So, whoever wants it, just click the buy button. Special price only today!`
    : language === 'Indonesia'
    ? `JANGAN TUNGGU! Stok terbatas! Klik sekarang atau menyesal! 🔥`
    : `DON'T WAIT! Limited stock! Click now or regret it! 🔥`;
}

function generateLiveHostClosing(style: string, language: string): string {
  return style === 'santai'
    ? language === 'Indonesia'
      ? `Makasih sudah stay bareng kami! Next live nanti ya. Ciao!`
      : `Thanks for staying with us! See you at the next live. Bye!`
    : language === 'Indonesia'
    ? `TERIMAKASIH SEMUANYA! Follow kami untuk live berikutnya!`
    : `THANK YOU ALL! Follow us for the next live!`;
}

export type {
  ProductData,
  ContentGeneratorConfig,
  GeneratedContent,
  NarrationConfig
};