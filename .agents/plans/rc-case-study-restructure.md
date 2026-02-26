# ReportCaster Case Study Restructure — Implementation Plan

## Guiding Principles

| Rule | How It's Honored |
|---|---|
| Don't delete content | Every sentence stays. Reshuffling, not rewriting. |
| Delete repeated things | STAR overview, Framework Matrix, UX Principles tags — redundant summaries. |
| Don't hallucinate | Zero new copy. Rearranging existing words and components. |
| Keep React components | Every existing component stays. Changing order, not gutting internals. |
| Show what YOU can do | Every section reframes around capability, not the product. |

---

## Phase 1: Content Restructure (6 Acts)

### ACT 0: HERO (unchanged)
- **Component:** `HeroSection` — no changes

### ACT I: THE HOOK
- Section 01 body text ("I'll do it" story)  
- `SystemArchaeology` component

### ACT II: THE INVESTIGATION  
- Section 02 body text (research constraints, proxy network)
- `TribalKnowledgeNetwork`
- Section 03 body text (first paragraph — "detective story")
- `ProcessArtifactViewer` (raw sketchbook)

### ACT III: THE ARCHITECTURE
- `SystemConsolidationMap` (5→1 flow)
- `SystemMappingBreakdown` (what was mapped)
- `VersionIteration` (V1/V2/V3 + rejections)
- `PlusMenuInsight` (the breakthrough)
- `ReportCasterTimeline`

### ACT IV: THE CRAFT
- `ScheduleWorkflowComparison` (click reduction)
- `NaturalLanguageInsight` (recurrence detail)
- `PrototypeBlock` (before/after video)
- `ImpactDiff` (side-by-side static)
- `DesignSystemShowcase`

### ACT V: THE TEAM
- Section 05 body text (onboarding, knowledge transfer)
- `OwnershipScope`
- `TeamCollaboration`

### ACT VI: THE OUTCOME
- Section 06 body text (customer validation)
- `ScaleAndResponsibility` (big metrics — now with context)
- Quick Overview metric cards only (merged)
- `NavigateForwardContent` (testimonials + retrospective)

### FOOTER (unchanged)
- `SystemIndex`, `LetsTalkCTA`, `ScrollGear`

### Removed (redundant only)
- QuickOverviewSection STAR text
- FrameworkMatrix standalone section
- UXPrinciples tag cloud
- "Looking Forward" card (folded into retrospective)

---

## Phase 2: Visual Polish

1. Fix quote formatting: `""She impressed..."` → `"She impressed..."`
2. Fix markdown rendering: `**Aha moment:**` showing literal asterisks
3. Fix smart quotes consistency in V3 body text
4. Clean up "Looking Forward" → merge into retrospective

---

## Files to Touch

| File | Change |
|---|---|
| `src/components/case-study-v2/CaseStudyPage.tsx` | Major restructure — reorder into 6 acts |
| `src/data/reportcaster.ts` | Update section metadata for act structure |
| `src/components/case-study/CaseStudySection.tsx` | Add `act` variant for act-level headings |
| `src/components/case-study/SectionNav.tsx` | Act-based nav labels |
| `src/types/caseStudy.ts` | Add optional `act` field if needed |

---

## Execution Order

1. ✅ Save this plan
2. Update `reportcaster.ts` — restructure sections into 6 acts
3. Update `CaseStudyPage.tsx` — reorder component rendering  
4. Update `SectionNav` — new act-based labels
5. Fix visual polish items
6. Build & verify
7. Visual audit — full scroll-through
