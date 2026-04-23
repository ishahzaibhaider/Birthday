# A Year of Loving You

A handcrafted, single-page keepsake website for our first engagement anniversary.
Designed as a scroll-through storybook — warm paper, italic serif typography,
Ghibli-style image placeholders, and a personal letter section.

```
index.html   ← the whole site (edit names, dates, letter text here)
styles.css   ← all styling
script.js    ← gentle scroll reveals
images/      ← drop your 9 generated images here
```

---

## 1. What to personalize (before deploying)

Open `index.html` and replace these placeholders:

| Placeholder          | Where it appears                                  |
| -------------------- | ------------------------------------------------- |
| `[YOUR NAME]`        | hero, letter close (3×)                           |
| `[HER NAME]`         | hero, letter salutation (2×)                      |
| `[ENGAGEMENT DATE]`  | Chapter One caption                               |
| `[CITY]`             | Chapter One caption                               |
| `[A]` and `[H]`      | footer monogram — use your initials               |
| Date in hero         | line with "Twenty-Third of April…" — update       |
| Letter paragraphs    | search for `[Write ...]` in Chapter One and Three |

Also edit the `<title>` tag at the top.

---

## 2. Image slots — Nano Banana prompts

You have **9 image slots**. For each one below:
1. Pick your real photo (one that matches the moment).
2. Open Google AI Studio → Gemini 2.5 Flash Image (aka **Nano Banana**).
3. Upload the photo.
4. Paste the matching prompt.
5. Save the output as the listed filename in `images/`.
6. In `index.html`, find the line with `data-slot="01-hero"` (etc.) and change
   `src="images/placeholder.svg"` to `src="images/01-hero.jpg"` (or `.png`).

> **Base style — reused across every prompt:**
> *Studio Ghibli style, hand-painted watercolor and gouache, Hayao Miyazaki
> aesthetic, soft warm pastel palette (cream, rose, terracotta, sage, antique
> gold), gentle golden-hour lighting, painterly brushstrokes, subtle grain,
> dreamy and nostalgic mood, preserve the subjects' faces and likeness
> faithfully.*

Copy this block into each prompt where it says `{BASE STYLE}`.

---

### Slot 01 — `01-hero.jpg` (wide hero · top of page)
> Transform this photograph into `{BASE STYLE}`. Cinematic wide composition,
> both subjects centered with soft atmospheric depth behind them, late
> afternoon sun catching their hair, slight breeze in the air, shallow
> painterly bokeh, feel of "the quiet moment before everything begins."
> 16:10 aspect ratio.

---

### Slot 02 — `02-proposal.jpg` (portrait · the engagement moment)
> Transform this photograph into `{BASE STYLE}`. Intimate vertical
> composition, her reaction caught mid-emotion — eyes bright, a small
> surprised smile, hands lifted near her face. Warm amber glow, soft petals
> drifting in the air, delicate depth of field. The frame should feel like
> a single still pulled from a Ghibli film. 4:5 aspect ratio.

---

### Slot 03 — `03-morning.jpg` (gallery · tall portrait)
> Transform this photograph into `{BASE STYLE}`. Soft morning light through
> a window, steam rising from a teacup, calm and domestic mood, pale cream
> and sage palette, dust motes in the sunbeam. Feels like the first five
> minutes of a Miyazaki morning scene. 4:5.8 aspect ratio.

---

### Slot 04 — `04-laughter.jpg` (gallery · portrait)
> Transform this photograph into `{BASE STYLE}`. Caught mid-laugh, joyful
> and unguarded, eyes crinkled, head slightly tilted back. Warm coral and
> rose tones, slight lens flare, loose confetti-like strokes suggesting
> lightness. 4:5 aspect ratio.

---

### Slot 05 — `05-walk.jpg` (gallery · portrait)
> Transform this photograph into `{BASE STYLE}`. Two figures walking away
> from the camera, shoulders almost touching, tree-lined path dappled with
> leaf-light, autumnal palette with sage and amber, a soft wind moving
> through the leaves. Painterly background, focus on the feeling of "we
> walk the same direction now." 4:5 aspect ratio.

---

### Slot 06 — `06-rain.jpg` (gallery · wide)
> Transform this photograph into `{BASE STYLE}`. Rainy afternoon, window
> beaded with raindrops, warm interior with a single lamp, two silhouettes
> sharing tea, muted blues balanced against warm cream, a Miyazaki-style
> sense of deep cozy stillness. 16:8 aspect ratio.

---

### Slot 07 — `07-celebration.jpg` (gallery · portrait)
> Transform this photograph into `{BASE STYLE}`. A small celebration — a
> cake with candles, soft golden glow on both their faces, gentle smiles,
> painterly warmth. Delicate florals in the periphery, dreamy depth.
> 4:5 aspect ratio.

---

### Slot 08 — `08-stillness.jpg` (gallery · portrait)
> Transform this photograph into `{BASE STYLE}`. One tender, quiet frame —
> a forehead against a forehead, or a hand held. Desaturated palette with
> just one accent color (rose or wine), very soft brushwork, feels like
> the pause between two heartbeats. 4:5 aspect ratio.

---

### Slot 09 — `09-future.jpg` (wide · forever section)
> Transform this photograph into `{BASE STYLE}`. Two small silhouettes at
> the edge of a sweeping landscape — a ridge, a shoreline, or a field of
> tall grass at sunset. Vast painterly sky in pinks, ambers, and soft
> violets, the figures tiny but unmistakably together. Feels like the
> closing shot of a Ghibli film. 16:9 aspect ratio.

---

### Tips for better Nano Banana results

- Always **upload the real photo** — Nano Banana (Gemini 2.5 Flash Image) is
  an *editor*, not just a generator. Face likeness depends on the reference.
- If the first output feels too "cartoonish," add: *"less stylized, more
  painterly, preserve adult proportions and real facial structure."*
- If you want less Miyazaki and more watercolor-book feel, swap the first
  line for: *"Transform this into a soft hand-painted watercolor
  illustration, children's storybook style, loose ink lines and wet
  washes."*
- To keep a consistent look across all 9 images, **run them in the same
  session** — Nano Banana holds visual context between turns.

---

## 3. Running it locally

```bash
cd /Users/ideofuzion/Birthday
python3 -m http.server 8000
# open http://localhost:8000
```

(Or just double-click `index.html` — it works with no server.)

---

## 4. Deploying to Vercel

Two easy paths:

### A. Drag-and-drop (fastest, no git needed)
1. Go to **vercel.com/new**
2. Click **"Import Third-Party Git Repository"** → or scroll down to the
   **"Deploy a Template / Upload"** option
3. Drag the entire `Birthday` folder in
4. Click **Deploy**
5. You'll get a URL like `your-project.vercel.app` — share it with her.

### B. Via Vercel CLI
```bash
npm i -g vercel
cd /Users/ideofuzion/Birthday
vercel         # first run sets up the project
vercel --prod  # push to production
```

No build config needed — Vercel auto-detects this as a static site.

### Custom domain (optional)
If you own a domain like `alizain-and-her.com` or similar:
- In the Vercel dashboard → your project → **Settings → Domains** → add it.
- Vercel gives you DNS records to paste into your registrar.

---

## 5. Small wishes

- The date at the top of the hero is set to *23 April 2026.* Change it if
  your anniversary is different.
- The Quranic opening (Ar-Rūm 30:21) is included as a blessing — remove it
  if you'd rather start differently.
- The letter is a scaffold, not a script. The most moving part will be what
  you write in place of the italicized `[Write...]` blocks. Take your time
  with it.

May this year be only the first of many, Insha’Allah.
