# Mobile Responsiveness Audit — Current State

> [!NOTE]
> Continuing from the **Mobile Responsiveness Audit** conversation. The last session completed: hero-to-CSG transition fixes, CSG tile border/background fixes, dotted pattern restoration, Vibe Coding tile fixes (College OS graduation cap, WordU container), and a full-page screenshot sweep. The **final step — identifying and fixing mobile issues — was not completed**.

## Fresh Audit Results (390×844 viewport)

### ✅ Sections That Look Good
| Section | Scroll Position | Status |
|---------|----------------|--------|
| Hero intro ("When you look at a chair...") | 0–400px | Clean, centered, well-scaled |
| Hero bio ("Hi, I'm Anuja") transition | 800–1200px | Smooth crossfade, no dead zones |
| CSG case study tiles (ReportCaster, ML Functions, IQ Plugin) | 2000–2800px | Tiles stack nicely, borders/bg visible |
| Social Proof testimonials | 3000–4200px | Cards read well, good padding |
| Vibe Coding tiles (Portfolio, WordU, College OS) | 5400–6200px | Stack beautifully, SVGs render correctly |
| Timeline ("Meanwhile, in life...") | 4400–5000px + 6600–7800px | Two-column grid works at mobile |
| Footer / Contact | 8400+ | Buttons have good sizing |

### 🔴 Issues to Fix

#### 1. **"FEATURED" badge overlaps quote text** (~3000–3600px)
The small `FEATURED` label sits directly on top of the last line of testimonial quotes, overlapping with words like "design" and "is never".

````carousel
![FEATURED badge overlaps "design" in Vijay Raman's quote](/Users/anu/.gemini/antigravity/brain/9e249e04-8d34-4061-9613-270be8bc7321/mobile_audit_3000px_1772176350005.png)
<!-- slide -->
![FEATURED badge overlaps "is never" in Dave Pfeiffer's quote](/Users/anu/.gemini/antigravity/brain/9e249e04-8d34-4061-9613-270be8bc7321/mobile_audit_3600px_1772176351344.png)
````

#### 2. **Large background date typography overlaps section titles** (~1800px, ~4800px, ~6600px)
The decorative background dates (e.g., "2022 — 2025", "NOV / 2025", "2012 — 2022") are oversized for mobile and visually clash with the foreground section titles.

````carousel
![2022-2025 background date overlap](/Users/anu/.gemini/antigravity/brain/9e249e04-8d34-4061-9613-270be8bc7321/mobile_audit_1800px_1772176340321.png)
<!-- slide -->
![NOV/2025 background date overlap](/Users/anu/.gemini/antigravity/brain/9e249e04-8d34-4061-9613-270be8bc7321/mobile_audit_4800px_1772176361737.png)
<!-- slide -->
![2012-2022 background date overlap](/Users/anu/.gemini/antigravity/brain/9e249e04-8d34-4061-9613-270be8bc7321/mobile_audit_6600px_1772176375061.png)
````

#### 3. **ML Functions tile — only 2 of 3 circles visible** (~2400px)
The ML Functions tile's "DATA PREP / TRAIN / EVALUATE" circles are cut off — only 2 of 3 are visible on mobile.

![ML Functions tile cut off](/Users/anu/.gemini/antigravity/brain/9e249e04-8d34-4061-9613-270be8bc7321/mobile_audit_2400px_1772176341647.png)

---

## Recommended Fix Priority
1. **FEATURED badge** — Quick CSS fix (reposition or hide on mobile)
2. **Background date typography** — Scale down `font-size` on mobile breakpoint
3. **ML Functions circles** — Scale down or adjust layout for narrow viewports
