# 🎬 SIMPEL AI Studio - Content Generator Guide

## 📋 Apa Itu Generator?

Generator adalah **"mesin otomatis"** yang menghasilkan konten (prompt, caption, narasi) satu per satu tanpa perlu menunggu semuanya selesai dulu.

Seperti **assembly line** di pabrik: produk keluar satu-satu, bukan sekaligus! 🏭

---

## 🚀 Generator yang Tersedia

### 1️⃣ **generateContentVariations()** - Konten Foto Produk
**Menghasilkan:** 4 variasi per kategori (B-Roll, UGC, Komersial)

```typescript
const config = {
  product: { name: 'Botol Minum', visualAnchor: 'Warna pink, bentuk bulat' },
  concept: 'Casual lifestyle photography',
  language: 'Indonesia',
  ratio: '9:16'
};

for (const content of generateContentVariations(config)) {
  console.log('📸', content.prompt);   // Prompt AI image generator
  console.log('💬', content.caption);  // Caption siap post
}
```

### 2️⃣ **generatePOVVariations()** - Konten POV (First Person)
**Menghasilkan:** 4 variasi sudut pandang orang pertama

```typescript
for (const content of generatePOVVariations(product, concept, 'Indonesia')) {
  console.log(content.prompt, content.caption);
}
```

### 3️⃣ **generateInstantVariations()** - Konten Cepat
**Menghasilkan:** 3 variasi instan (tanpa analisis panjang)

```typescript
for (const content of generateInstantVariations('Kopi pagi di kantor', 'Kopi Arabika')) {
  console.log(content.prompt);
}
```

### 4️⃣ **generateNarrationWithEmotions()** - Narasi Video + Emosi
**Menghasilkan:** Script narasi dengan emotion tags untuk voice-over

```typescript
const narrationConfig = {
  type: 'IKLAN PENDEK (Max 15s)',
  voiceActor: 'Zephyr (Laki-laki - Ceria)',
  voiceVibe: '🔥 Antusias / Hype (Energetik)'
};

for (const narration of generateNarrationWithEmotions(product, concept, narrationConfig)) {
  console.log(`[${narration.section}]`, narration.content);
  console.log('Emotions:', narration.emotionTags);
}
```

### 5️⃣ **generatePlatformCaptions()** - Caption Per Platform
**Menghasilkan:** Caption optimized untuk Instagram, TikTok, WhatsApp, Marketplace

```typescript
for (const { platform, caption } of generatePlatformCaptions(
  product, 
  concept, 
  ['instagram', 'tiktok', 'whatsapp', 'marketplace']
)) {
  console.log(`📱 ${platform}: ${caption}`);
}
```

### 6️⃣ **generateLiveHostScript()** - Script Live Selling
**Menghasilkan:** Script live host dengan timing (pembukaan, poin, CTA, penutup)

```typescript
for (const { section, content, duration } of generateLiveHostScript(
  product,
  concept,
  'energik',      // santai | energik | formal
  'sedang',       // singkat | sedang | panjang
  ['Gratis ongkir', 'Stok terbatas']
)) {
  console.log(`[${section}] (${duration}s): ${content}`);
}
```

---

## 💡 Keuntungan Menggunakan Generator

✅ **Memory Efficient** - Hasil satu per satu, tidak membebani RAM
✅ **Progress Real-time** - Bisa tampilkan loading progress ke user
✅ **Flexible** - Mudah di-customize sesuai kebutuhan
✅ **Type-Safe** - Full TypeScript support untuk developer
✅ **Modular** - Setiap generator independen

---

## 📊 Contoh Real-World: Setup di React Component

```typescript
import { generateContentVariations, ContentGeneratorConfig } from './simpel_ai_studio_generator';

function ResultsPanel() {
  const [results, setResults] = useState<GeneratedContent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (config: ContentGeneratorConfig) => {
    setIsLoading(true);
    setResults([]); // Reset results
    
    // Gunakan generator untuk yield results satu per satu
    for (const content of generateContentVariations(config)) {
      setResults(prev => [...prev, content]); // Update UI secara real-time
      await new Promise(resolve => setTimeout(resolve, 300)); // Delay visual effect
    }
    
    setIsLoading(false);
  };

  return (
    <div>
      <button onClick={() => handleGenerate(/* config */)}>Generate</button>
      {isLoading && <p>Generating content...</p>}
      <div>
        {results.map((r, i) => (
          <div key={i}>
            <p>📸 {r.prompt}</p>
            <p>💬 {r.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🎯 Best Practices

1. **Gunakan `for...of` loop** untuk generator
   ```typescript
   for (const item of generator()) { /* process item */ }
   ```

2. **Jangan convert ke array** (akan memuat semua di RAM)
   ```typescript
   // ❌ JANGAN
   const allResults = [...generateContentVariations(config)];
   
   // ✅ BENAR
   for (const result of generateContentVariations(config)) {
     // process one by one
   }
   ```

3. **Add delay antara yields** untuk UX yang lebih baik
   ```typescript
   for (const content of generateContentVariations(config)) {
     updateUI(content);
     await delay(300); // Delay 300ms untuk visual effect
   }
   ```

4. **Combine multiple generators** jika perlu
   ```typescript
   for (const content of generateContentVariations(config)) {
     for (const { platform, caption } of generatePlatformCaptions(product, concept, ['instagram'])) {
       console.log(`${content.category}: ${platform} - ${caption}`);
     }
   }
   ```

---

## 🔧 Customization

Semua generator dapat di-customize dengan mengubah helper functions:

- `generateSingleVariation()` - Ubah template prompt/caption
- `generateDirectorNotes()` - Ubah style voice acting
- `generateCaptionForPlatform()` - Ubah format caption per platform
- dll...

---

## 📞 Support

Jika ada pertanyaan, cek file `EXAMPLES.md` untuk contoh lengkap! 🎉