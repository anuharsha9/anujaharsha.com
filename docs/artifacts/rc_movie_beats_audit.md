# RC Movie Beats — Audit (growth.design Lens)

> **Rating each beat** on the growth.design standard: **one idea, one viewport, minimal text, visual does the heavy lifting.**

---

## Beat 1: "The Business Problem" (`MovieBeatAssignment`)
**Rating: ⭐⭐⭐⭐ Strong**

| Aspect | Status |
|--------|--------|
| One idea? | ✅ "Old system losing customers" |
| Fits viewport? | ✅ Compact — label + headline + stats |
| Text density? | ⚠️ The subtitle paragraph is borderline heavy |
| Visual doing work? | ❌ Stats are text-only, no visual metaphor |

**Suggestion:** The 3 stats (50+ Years, 20M+ Jobs, 0 Documentation) ARE the visual. Drop the subtitle paragraph — the stats say it all. The headline + stats alone is a punch.

---

## Beat 2: "Discovery Arc" (`MovieBeatDiscovery`)
**Rating: ⭐⭐⭐ OK**

| Aspect | Status |
|--------|--------|
| One idea? | ⚠️ Trying to land 3 sub-points + a closing quote |
| Fits viewport? | ⚠️ 3 cards + line + closing = tall on mobile |
| Text density? | ❌ 3 paragraphs of meta text inside cards + closing line |
| Visual doing work? | ⚠️ Cards are styled text, not a visual |

**Suggestion:** Condense to ONE moment: "Week 1 volunteer → 4 months of research nobody expected." The 3 cards could be a single visual timeline instead of separate text boxes. Kill the "connecting line" and closing paragraph.

---

## Beat 3: "The Chaos" (`MovieBeatChaos`)
**Rating: ⭐⭐⭐⭐⭐ Best Beat**

| Aspect | Status |
|--------|--------|
| One idea? | ✅ "The system was fragmented chaos" |
| Fits viewport? | ✅ Ring visual + 2 stats underneath |
| Text density? | ✅ Minimal text — visual tells the story |
| Visual doing work? | ✅ The ring of nodes + chaos lines is genuinely visual |

**Suggestion:** Near-perfect. Only tweak: the closing text line is redundant — the visual already conveys it. Consider removing  "50 years of accumulated debt..." entirely.

---

## Beat 4: "Three Pivots" (`MovieBeatPivots`)
**Rating: ⭐⭐⭐⭐ Strong**

| Aspect | Status |
|--------|--------|
| One idea? | ✅ "3 versions, only one won" |
| Fits viewport? | ✅ Horizontal layout keeps it compact |
| Text density? | ✅ Very lean labels |
| Visual doing work? | ✅ V1→V2→V3 cards with color-coded verdicts |

**Suggestion:** Almost perfect. The `10px` text on REJECTED/WINNER should be 11px. Otherwise, this is a growth.design-grade frame.

---

## Beat 5: "The Breakthrough" (`MovieBeatBreakthrough`)
**Rating: ⭐⭐⭐ OK**

| Aspect | Status |
|--------|--------|
| One idea? | ⚠️ Doing TWO things: Before vs After + stats |
| Fits viewport? | ⚠️ The After state has a nested grid + sparkles + 2 stats |
| Text density? | ❌ Before: 3 boxes + explanatory text. After: nested grid + label + stats |
| Visual doing work? | ⚠️ Boxes are styled text, not a visual transformation |

**Suggestion:** The Before→After swap via `AnimatePresence mode="wait"` is great storytelling. But the After state is overloaded. Pick ONE thing: either the hub architecture visual OR the stats. Not both. The sparkles + "Zero context switching" label is clutter.

---

## Beat 6: "Execution: Recurrence" (`MovieBeatExecution`)
**Rating: ⭐⭐ Weakest**

| Aspect | Status |
|--------|--------|
| One idea? | ❌ Trying to do: intro + before codes + after codes (3 ideas) |
| Fits viewport? | ❌ Intro text + 2 card blocks with expandable content = very tall |
| Text density? | ❌ Most text-heavy beat. Full sentences + code blocks |
| Visual doing work? | ❌ No visual — it's all text and code |

> [!WARNING]
> **This beat also has factual issues** — the user clarified that users didn't "memorize codes." The old UI was just a bad, confusing interface. The redesign used natural language after selecting settings.

**Suggestion:** This needs the most work. Kill the intro paragraph, kill the code strings. Instead, visualize: confusing UI → clean natural language sentence. Think: a single before/after morph. One frame, one moment.

---

## Beat 7: "250 Screens" (`MovieBeatScale`)
**Rating: ⭐⭐⭐⭐ Strong**

| Aspect | Status |
|--------|--------|
| One idea? | ✅ "I designed 250+ screens" |
| Fits viewport? | ✅ Screen cascade + counter — clean |
| Text density? | ⚠️ Closing paragraph is a full sentence |
| Visual doing work? | ✅ The screen cascade grid is satisfying |

**Suggestion:** Drop the closing paragraph. "250+" counter + cascade IS the moment. Let it breathe.

---

## Beat 8: "Shipped + Impact" (`MovieBeatShipped`)
**Rating: ⭐⭐⭐ OK**

| Aspect | Status |
|--------|--------|
| One idea? | ❌ Trying to land 4 things: SHIPPED + metrics + quote + Asked vs Delivered |
| Fits viewport? | ❌ Most vertically overloaded beat |
| Text density? | ❌ Headline + 3 metric cards + blockquote + comparison = dense |
| Visual doing work? | ⚠️ The big "SHIPPED." text IS visual, but then it drowns in stats |

**Suggestion:** Split into 2 beats or cut ruthlessly. Option A: Just "SHIPPED." + the quote. Option B: Just "SHIPPED." + Asked vs Delivered. The metrics can live in the full case study.

---

## Summary Scorecard

| Beat | Score | Key Issue |
|------|-------|-----------|
| 1. Business Problem | ⭐⭐⭐⭐ | Drop subtitle paragraph |
| 2. Discovery | ⭐⭐⭐ | Condense 3 cards to 1 moment |
| 3. Chaos | ⭐⭐⭐⭐⭐ | Near-perfect. Kill closing text. |
| 4. Three Pivots | ⭐⭐⭐⭐ | Fix 10px text → 11px |
| 5. Breakthrough | ⭐⭐⭐ | After state overloaded |
| 6. Execution | ⭐⭐ | Needs full rethink + factual fix |
| 7. 250 Screens | ⭐⭐⭐⭐ | Drop closing paragraph |
| 8. Shipped | ⭐⭐⭐ | Too many sections in one beat |

### Top 3 Actions:
1. **Fix Beat 6** — factually wrong + most text-heavy. Needs visual redesign.
2. **Slim Beat 8** — split or cut. One idea max.
3. **Remove closing text** from Beats 1, 3, 7 — let the visuals breathe.
