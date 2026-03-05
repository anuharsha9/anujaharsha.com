# Case Study Clutter Audit

## High-Impact Cleanup Opportunities

### 1. `IQBusinessCase` — Problem/Solution + Business Drivers ⭐ HIGH
**Current**: 2 large text panels (Problem vs Solution) with 4 bullets each + 3 Business Driver cards + Strategic Outcome banner. That's **4 separate sections** of text.
**Fix**: Collapse to a single clean 2-column card (title + 1-line summary only, no bullets). Remove Business Drivers cards entirely (they repeat the same message). Remove Strategic Outcome banner.

### 2. `OwnershipScope` — 4 cards × 3 bullets each ⭐ HIGH
**Current**: 4 colored cards (Product Strategy, Design Execution, Engineering Partnership, Research & Validation) each with 3 bullet points (= 12 bullets total) + 4 stat badges at the bottom.
**Fix**: Same approach as TeamCollaboration — icon + title + single summary line. Remove stat badges (they repeat content from elsewhere).

### 3. `ImpactOutcomes` — 4 cards with tag + headline + body ⭐ MEDIUM
**Current**: Each card has a `// TAG` label, an icon, a headline, AND a body paragraph. Three text layers per card.
**Fix**: Remove the `// TAG` mono labels. Keep just icon + headline + body (or even just icon + headline if body is redundant).

### 4. `ResearchConstraints` — Heavy text layout (215 lines!) ⭐ MEDIUM  
**Current**: Constraint box + strategy box + connector + source cards with detailed insight bullets.
**Fix**: Simplify to constraint label → strategy label (one-liner each), and collapse source cards to icon + name only.

### 5. `CaseStudyReflection` — Retrospective section ⭐ LOW-MEDIUM
**Current**: "Voice of the Team" heading + quotes + "Honest Reflection" heading + two titled paragraphs with colored mono labels.
**Fix**: Remove `// RETROSPECTIVE` and `// TESTIMONIALS` internal headings (already handled by removing tags). Clean up the mono labels on "What I'd Push Harder For" / "Where I'd Take It Next".

### 6. `IQWorkflowComparison` description text ⭐ LOW
**Current**: Has a description line "Three features, three different entry points → One unified hub. Drag the slider to compare."
**Fix**: Remove the description — the sliders are self-explanatory.

### 7. `ComponentHeading` description props throughout ⭐ LOW
**Current**: Many ComponentHeading usages pass a `description` prop that repeats what the title already says.
**Fix**: Audit and remove redundant description strings.

---

## Recommended Priority Order
1. **IQBusinessCase** — biggest visual clutter offender
2. **OwnershipScope** — 12 bullets feels like a resume dump
3. **ImpactOutcomes** — remove tags, tighten
4. **IQWorkflowComparison** — remove description text
5. **ResearchConstraints** — simplify
6. **CaseStudyReflection** — minor cleanup
7. **ComponentHeading descriptions** — surgical pass
