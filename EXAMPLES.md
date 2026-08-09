# 📚 SIMPEL AI Studio - Generator Examples

## Example 1: Basic Content Generation

```typescript
import { generateContentVariations } from './simpel_ai_studio_generator';

const product = {
  name: 'Botol Minum Tumbler',
  visualAnchor: 'Warna pink pastel, bentuk bulat, insulated double-wall stainless steel'
};

const config = {
  product,
  concept: 'Casual lifestyle photography di kafe outdoor sore hari',
  language: 'Indonesia' as const,
  outputType: 'auto' as const,
  ratio: '9:16' as const
};

// Generate semua konten
for (const content of generateContentVariations(config)) {
  console.log(`\n=== ${content.category.toUpperCase()} ===`);
  console.log('Prompt:', content.prompt);
  console.log('Caption:', content.caption);
}
```

**Output:**
```
=== BROLL ===
Prompt: B-Roll (Detail Shot): Kamera SANGAT DEKAT...
Caption: Produk berkualitas tinggi dengan detail menawan...

=== UGC ===
Prompt: UGC (User Generated Content): Foto lifestyle...
Caption: Sempurna untuk casual. Jangan lewatkan!...

=== KOMERSIAL ===
Prompt: Komersial (Commercial Ads): Fotografi periklanan...
Caption: Botol Minum Tumbler: pilihan terbaik untuk Anda...
```

---

## Example 2: Generate POV Content Only

```typescript
import { generatePOVVariations } from './simpel_ai_studio_generator';

const product = {
  name: 'Smartphone Flagship',
  visualAnchor: 'Warna midnight black, layar AMOLED 6.7", kamera 108MP'
};

for (const content of generatePOVVariations(
  product,
  'Unboxing smartphone di kamar dengan pencahayaan alam',
  'Indonesia',
  '9:16'
)) {
  console.log(`POV Variation:`);
  console.log('Prompt:', content.prompt);
  console.log('Caption:', content.caption);
  console.log('---');
}
```

---

## Example 3: Narasi dengan Emosi Progression

```typescript
import { generateNarrationWithEmotions } from './simpel_ai_studio_generator';

const product = {
  name: 'Kopi Arabika Premium',
  visualAnchor: 'Kemasan matte black, biji kopi terlihat jelas, aroma kental'
};

const narrationConfig = {
  type: 'IKLAN PENDEK (Max 15s)' as const,
  voiceActor: 'Zephyr (Laki-laki - Ceria)',
  voiceVibe: '🔥 Antusias / Hype (Energetik)' as const
};

for (const narration of generateNarrationWithEmotions(
  product,
  'Kopi pagi sebelum bekerja, suasana santai di rumah',
  narrationConfig,
  'Indonesia'
)) {
  console.log(`\n[${narration.section}]`);
  console.log('Content:', narration.content);
  console.log('Emotions:', narration.emotionTags.join(', '));
}
```

**Output:**
```
[DIRECTOR'S NOTES]
Content: Voice Style for IKLAN PENDEK (Max 15s): Professional and engaging delivery
Emotions: neutral, professional

[OPENING]
Content: [warm] Hai! Aku punya sesuatu yang menarik untuk kamu hari ini. Kopi Arabika Premium terbaru yang super keren!
Emotions: excited, welcoming

[POINT_1]
Content: [pause] Lihat Kemasan matte black, biji kopi terlihat jelas, aroma kental. Desainnya sempurna untuk kebutuhan sehari-hari.
Emotions: engaging, descriptive

[POINT_2]
Content: [slow] Kualitas material yang kami gunakan adalah yang terbaik di kelasnya.
Emotions: persuasive, confident

[POINT_3]
Content: [enthusiastic] Dan yang terbaik? Kopi pagi sebelum bekerja, suasana santai di rumah. Ini adalah investasi terbaik Anda!
Emotions: compelling, urgent

[CALL_TO_ACTION]
Content: [urgent] Buruan pesan sekarang sebelum kehabisan stok! Tap keranjang kuning di bawah!
Emotions: urgent, persuasive

[CLOSING]
Content: [warm] Terima kasih sudah nonton! Semoga puas dengan pilihan Anda! 😊
Emotions: confident, friendly
```

---

## Example 4: Caption Per Platform

```typescript
import { generatePlatformCaptions } from './simpel_ai_studio_generator';

const product = {
  name: 'Sepatu Lari Pro',
  visualAnchor: 'Warna neon yellow, design futuristik, material breathable mesh'
};

for (const { platform, caption } of generatePlatformCaptions(
  product,
  'Performance running gear untuk atlet profesional',
  ['instagram', 'tiktok', 'whatsapp', 'marketplace'],
  'Indonesia'
)) {
  console.log(`\n📱 ${platform.toUpperCase()}`);
  console.log(caption);
  console.log('---');
}
```

**Output:**
```
📱 INSTAGRAM
✨ Sepatu Lari Pro: Performance running gear untuk atlet profesional

Warna neon yellow, design futuristik, material breathable mesh

🔗 Link di bio
#produktbaru #lifestyle #SepatuLariPro

📱 TIKTOK
Sepatu Lari Pro × Performance running gear untuk atlet profesional 🚀 Stok terbatas! Link di bio ⬇️

📱 WHATSAPP
Halo! 👋 Aku punya Sepatu Lari Pro yang bagus. Performance running gear untuk atlet profesional. Minat? Klik link untuk info lebih lanjut 😊

📱 MARKETPLACE
Sepatu Lari Pro Premium | Performance running gear untuk atlet profesional

✅ Kualitas terjamin
✅ Garansi resmi
✅ Gratis ongkir (promo)

Warna neon yellow, design futuristik, material breathable mesh
```

---

## Example 5: Live Host Script dengan Timing

```typescript
import { generateLiveHostScript } from './simpel_ai_studio_generator';

const product = {
  name: 'Skincare Set Premium',
  visualAnchor: 'Packaging gold, botol kaca transparan, serum dengan warna pearl'
};

let totalDuration = 0;

for (const { section, content, duration } of generateLiveHostScript(
  product,
  'Skincare routine yang efektif untuk kulit sensitive',
  'energik',
  'sedang',
  ['Gratis konsultasi kecantikan', 'Bonus sample serum', 'Cicilan 0%']
)) {
  totalDuration += duration;
  console.log(`[${section}] (${duration}s) [Total: ${totalDuration}s]`);
  console.log(content);
  console.log('---');
}

console.log(`\n✅ Total script duration: ${totalDuration} seconds`);
```

**Output:**
```
[OPENING] (10s) [Total: 10s]
Halo semua! Selamat datang di live kami. Produk hari ini: Skincare Set Premium!
---

[POINT_1] (12s) [Total: 22s]
Perhatian! Ini yang paling keren: Packaging gold, botol kaca transparan, serum dengan warna pearl
---

[POINT_2] (12s) [Total: 34s]
Perhatian! Ini yang paling keren: Skincare routine yang efektif untuk kulit sensitive
---

[POINT_3] (12s) [Total: 46s]
Perhatian! Ini yang paling keren: Gratis konsultasi kecantikan
---

[POINT_4] (12s) [Total: 58s]
Perhatian! Ini yang paling keren: Bonus sample serum
---

[POINT_5] (12s) [Total: 70s]
Perhatian! Ini yang paling keren: Cicilan 0%
---

[CTA] (8s) [Total: 78s]
JANGAN TUNGGU! Stok terbatas! Klik sekarang atau menyesal! 🔥
---

[CLOSING] (5s) [Total: 83s]
TERIMAAKASIH SEMUANYA! Follow kami untuk live berikutnya!
---

✅ Total script duration: 83 seconds (~1.4 minutes)
```

---

## Example 6: Instant Content (Cepat)

```typescript
import { generateInstantVariations } from './simpel_ai_studio_generator';

const idea = 'Kopi latte di pagi hari sambil membaca buku';
const productName = 'Kopi Instant Premium';

for (const content of generateInstantVariations(idea, productName, 'Indonesia')) {
  console.log(`Prompt: ${content.prompt}`);
  console.log(`Caption: ${content.caption}`);
  console.log('---');
}
```

---

## Example 7: Combining Multiple Generators

```typescript
import {
  generateContentVariations,
  generatePlatformCaptions,
  ContentGeneratorConfig
} from './simpel_ai_studio_generator';

const config: ContentGeneratorConfig = {
  product: {
    name: 'Jam Tangan Smart',
    visualAnchor: 'Layar AMOLED round, material titanium, water resistant 5ATM'
  },
  concept: 'Produk teknologi yang stylish dan fungsional',
  language: 'Indonesia'
};

// Generate konten untuk setiap kategori, lalu generate caption untuk Instagram & TikTok
for (const content of generateContentVariations(config)) {
  if (content.category === 'ugc') { // Filter hanya UGC
    console.log(`\n=== ${content.category.toUpperCase()} ===`);
    console.log(`Prompt: ${content.prompt}`);
    
    // Generate platform-specific captions
    for (const { platform, caption } of generatePlatformCaptions(
      config.product,
      config.concept,
      ['instagram', 'tiktok']
    )) {
      console.log(`  ${platform}: ${caption.substring(0, 50)}...`);
    }
  }
}
```

---

## 🎯 Tips & Tricks

### Tip 1: Progress Bar dengan Generator

```typescript
const total = 12; // 3 kategori × 4 variasi
let current = 0;

for (const content of generateContentVariations(config)) {
  current++;
  const percent = Math.round((current / total) * 100);
  console.log(`[${"=".repeat(percent/5)}${" ".repeat(20-(percent/5))}] ${percent}%`);
}
```

### Tip 2: Filter Generator Results

```typescript
for (const content of generateContentVariations(config)) {
  // Hanya ambil UGC dan Komersial
  if (['ugc', 'komersial'].includes(content.category)) {
    console.log(content);
  }
}
```

### Tip 3: Async Processing

```typescript
async function processContentWithDelay() {
  for (const content of generateContentVariations(config)) {
    // Proses dengan delay untuk UX yang lebih smooth
    updateUI(content);
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}
```

---

**Selamat menggunakan Generator! 🎉**