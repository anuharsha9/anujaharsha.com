# Implementation Plan: Standardize Image Comparison & Fix Visibility

## Phase 1: Create Reusable Component
- [x] Create `src/components/ui/ImageComparisonSlider.tsx`
  - Implement standardized styling (teal handle, browser bar)
  - Add motion interactions (scan on hover)
  - Ensure responsive behavior

## Phase 2: Refactor ImpactDiff
- [x] Update `src/components/case-study/ImpactDiff.tsx`
  - Replace internal implementation with `ImageComparisonSlider` wrapper
  - Maintain backward compatibility for props
  - Add `beforeTitle`, `afterTitle`, `beforeAlt`, `afterAlt` props

## Phase 3: Update Case Studies & Fix Visibility
- [x] Update ML Functions Section 06 in `CaseStudyLayout.tsx`
  - Add explicit `beforeTitle` and `afterTitle` props
  - Ensure proper image paths (handle spaces with encoding)
  - Fix visibility issue by using corrected props
- [x] Update ReportCaster Section 06 in `CaseStudyLayout.tsx`
  - Ensure consistency with ML Functions implementation
- [x] Update `IQWorkflowComparison.tsx`
  - Ensure props passed to `ImpactDiff` are type-safe

## Phase 4: Standardize BeforeAfterComparison
- [x] Refactor `src/components/case-study/BeforeAfterComparison.tsx`
  - Replace custom slider implementation with `ImageComparisonSlider`
  - Retain "side-by-side" and "locked" functionality
  - Ensure visual consistency across components

## Phase 5: Fix Flicker & Performance
- [x] Fix "double animation" flicker in `ImageComparisonSlider.tsx`
  - Add `variants={{}}` to prevent inheritance from parent `MotionSection`
- [x] Stabilize rendering in `CaseStudyLayout.tsx`
  - Convert ALL dynamic imports (including `ImpactDiff`, `IQWorkflowComparison`, `PatternConnections`, etc.) to static imports to eliminate layout shifts and mounting flicker

