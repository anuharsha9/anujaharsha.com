# 🧹 Comprehensive Dead Code Audit

> After the cinematic bento refactor, the old `CaseStudyLayout → SectionBlock` pipeline is fully replaced. This cascades into many orphaned components, data files, and UI utilities.

---

## TIER 1 — Entire Dead Directories (delete whole folder)

| Directory | Files | Total Size | Reason |
|---|---|---|---|
| `src/components/case-study-v2/` | 3 | ~93KB | Old v2 rendering shell — replaced by cinematic views |
| `src/app/experiment/` | 1 | ~1KB | Just redirects to `/work/*` — no longer needed |

---

## TIER 2 — Dead components in `src/components/case-study/`

### Old rendering pipeline (the core dead chain)
| File | Size | Reason |
|---|---|---|
| `CaseStudyLayout.tsx` | 66KB | Old full layout shell — replaced by `CinematicCaseStudy.tsx` |
| `SectionBlock.tsx` | 91KB | Old section renderer — replaced by bento `TextTile`/`ImageTile` |
| `CaseStudySection.tsx` | 6KB | Old section wrapper |
| `CaseStudyNav.tsx` | 2KB | Old nav — replaced by `ViewModeToggle` |
| `CaseStudyCard.tsx` | 1KB | Unused |
| `SectionNav.tsx` | 8KB | Old section nav |
| `HeroMeta.tsx` | 13KB | Old hero — replaced by `CinematicCaseStudy` hero |
| `ReadingProgress.tsx` | 1KB | Old progress bar — replaced by scroll dots |
| `PresentationFlow.tsx` | 15KB | Old presentation — replaced by `StoryDeck` |
| `PresentationSlide.tsx` | 20KB | Old presentation slides |
| `BonusSlides.tsx` | 4KB | Old bonus slides |
| `PasswordGate.tsx` | 7KB | Old password gate |
| `QuickOverview.tsx` | 4KB | Old quick overview |
| `LockedContent.tsx` | 0.4KB | Old locked section |
| `AhaMoment.tsx` | 2KB | Only imported by dead SectionBlock |
| `iq-plugin-data.tsx` | 6KB | Old IQ data format |
| `AutoSequenceDataViewer.tsx` | 10KB | Only imported by dead CaseStudyLayout |
| `CaseStudyReflection.tsx` | 5KB | Only imported by dead files |

### ML-specific (replaced by `MLFullContent.tsx` bento)
| File | Size |
|---|---|
| `MLChallengeBreakdown.tsx` | 7KB |
| `MLExplainabilityHighlight.tsx` | 9KB |
| `MLFunctionsTimeline.tsx` | 3KB |
| `MLImpactMetrics.tsx` | 5KB |
| `MLKnowledgeGapSystem.tsx` | 5KB |
| `MLPatternConnections.tsx` | 5KB |
| `MLPersonaCards.tsx` | 1KB |
| `MLUserAccessStrategy.tsx` | 6KB |
| `MLWorkflowMapping.tsx` | 6KB |

### IQ/DSML-specific (replaced by `DSMLFullContent.tsx` bento)
| File | Size |
|---|---|
| `IQArchitectureBlueprint.tsx` | 7KB |
| `IQBuildingSystem.tsx` | 5KB |
| `IQBusinessCase.tsx` | 3KB |
| `IQChallengesBreakdown.tsx` | 6KB |
| `IQEmptyStateShowcase.tsx` | 5KB |
| `IQEvolution.tsx` | 5KB |
| `IQIdeaLab.tsx` | 4KB |
| `IQIterationLog.tsx` | 14KB |
| `IQPatternConnections.tsx` | 5KB |
| `IQPersonaCards.tsx` | 2KB |
| `IQPluginArchitecture.tsx` | 8KB |
| `IQPluginTimeline.tsx` | 2KB |
| `IQValidationSources.tsx` | 6KB |
| `IQWorkflowComparison.tsx` | 4KB |
| `IQWorkflowsAndFoundation.tsx` | 14KB |

### RC-specific (replaced by `RCFullContent.tsx` bento)
| File | Size |
|---|---|
| `ReportCasterTimeline.tsx` | 4KB |
| `SystemArchaeology.tsx` | 7KB |
| `SystemConsolidationMap.tsx` | 17KB |
| `TribalKnowledgeNetwork.tsx` | 16KB |
| `ThreeCriticalPivots.tsx` | 9KB |
| `ScheduleWorkflowComparison.tsx` | 11KB |
| `NaturalLanguageInsight.tsx` | 10KB |
| `PlusMenuInsight.tsx` | 14KB |
| `TeamOnboardingProcess.tsx` | 7KB |
| `ScaleAndResponsibility.tsx` | 8KB |
| `VersionIteration.tsx` | 15KB |
| `NavigateForwardContent.tsx` | 8KB |
| `JobLogRedesignViz.tsx` | 40KB |

### Shared old components (only consumed by dead files)
| File | Size |
|---|---|
| `BeforeAfterComparison.tsx` | 16KB |
| `BeforeAfterVideo.tsx` | 11KB |
| `MultiBeforeAfterVideo.tsx` | 11KB |
| `CraftShowcase.tsx` | 2KB |
| `DesignIterationLog.tsx` | 17KB |
| `DesignSystemShowcase.tsx` | 11KB |
| `FoundationsTerminal.tsx` | 4KB |
| `FrameworkMatrix.tsx` | 4KB |
| `FourStepFlowBreakdown.tsx` | 5KB |
| `ImpactOutcomes.tsx` | 2KB |
| `LayeredDisclosureVisual.tsx` | 7KB |
| `MarketAnalysis.tsx` | 13KB |
| `OwnershipScope.tsx` | 3KB |
| `PersonaCards.tsx` | 4KB |
| `ProcessArtifactViewer.tsx` | 7KB |
| `PrototypeBlock.tsx` | 6KB |
| `ResearchApproach.tsx` | 6KB |
| `ResearchConstraints.tsx` | 12KB |
| `SystemMappingBreakdown.tsx` | 9KB |
| `SystemTopologyBlueprint.tsx` | 10KB |
| `TeamCollaboration.tsx` | 3KB |
| `TerminalInsight.tsx` | 3KB |
| `UnifiedTimeline.tsx` | 9KB |
| `UXPrinciples.tsx` | 2KB |
| `WorkflowPrototype.tsx` | 10KB |
| `ArchitectureBlueprint.tsx` | 12KB |

### Dead `PullQuote.tsx` (case-study version)
`BentoGrid.tsx` has its own `PullQuote` — the old one in `case-study/PullQuote.tsx` (1KB) is unused.

---

## TIER 3 — Dead UI Utilities in `src/components/ui/`

| File | Size | Reason |
|---|---|---|
| `SocialShareButtons.tsx` | (in `sharing/`) | Only imported by dead CaseStudyLayout |
| `ParallaxImage.tsx` | ~3KB | Only imported by dead SectionBlock |
| `ScrollRevealText.tsx` | ~3KB | Only imported by dead SectionBlock |
| `TextReveal.tsx` | ~3KB | Only imported by dead HeroMeta + HeroSection v2 |
| `MotionSection.tsx` | ~2KB | Only imported by dead PrototypeBlock |
| `ComponentHeading.tsx` | ~2KB | ALL importers are dead case-study/ files |
| `CustomVideoPlayer.tsx` (in `video/`) | ~5KB | Only imported by dead BeforeAfterVideo, MultiBeforeAfterVideo, PrototypeBlock |
| `ImageComparisonSlider.tsx` | ~4KB | Used by ImpactDiff (KEEP) + dead BeforeAfterComparison — **KEEP** |

---

## TIER 4 — Dead Data Files in `src/data/`

| File | Only Imported By | Status |
|---|---|---|
| `architecture-blueprint.ts` | CaseStudyPage v2 (DEAD) | **DELETE** |
| `craft-showcase.ts` | CaseStudyPage v2 (DEAD) | **DELETE** |
| `impact-outcomes.ts` | CaseStudyPage v2 (DEAD) | **DELETE** |
| `iq-artifacts.ts` | CaseStudyLayout (DEAD) | **DELETE** |
| `market-analysis.ts` | CaseStudyLayout (DEAD) | **DELETE** |
| `ml-artifacts.ts` | CaseStudyLayout (DEAD) | **DELETE** |
| `research-approach.ts` | CaseStudyLayout (DEAD) | **DELETE** |
| `research-constraints.ts` | CaseStudyPage v2 (DEAD) | **DELETE** |
| `team-collaboration.ts` | CaseStudyLayout + CaseStudyPage v2 (DEAD) | **DELETE** |

---

## TIER 5 — Dead Lib Files in `src/lib/`

| File | Reason |
|---|---|
| `movieBeatsToSlides.ts` | Zero importers |
| `content-utils.tsx` | Only imported by dead SectionBlock |
| `getCaseStudyData.ts` | Only imported by MobileMenu — **CHECK** if Menu still uses it |

---

## TIER 6 — Dead Landing Page / Other Components

| File | Size | Reason |
|---|---|---|
| `src/components/home/ImmersiveEraBlock.tsx` | ~15KB | Zero importers — not rendered anywhere |
| `src/components/home/MilestoneConnector.tsx` | ~5KB | Zero importers |
| `src/components/timeline/SecondaryCaseStudies.tsx` | ~8KB | Zero importers |

---

## TIER 7 — Brain SVG / Quiz / Gear System

These are **STILL LIVE**:

| File | Used By | Status |
|---|---|---|
| `ImmersiveBrainExperience.tsx` | `/quiz/page.tsx` + `MobileTimeline.tsx` | **KEEP** |
| `brain-gears-svg.ts` | `ImmersiveBrainExperience` | **KEEP** |
| `gear-inspector.ts` | `GearBottomSheet` + `ImmersiveBrainExperience` | **KEEP** |
| `GearBottomSheet.tsx` | Landing page | **KEEP** |
| `FlagshipTheater.tsx` | `MobileTimeline` | **KEEP** |
| `CinematicTimeline.tsx` | `ImmersiveBrainExperience` | **KEEP** |

---

## Component KEEP List (src/components/case-study/)

| File | Reason |
|---|---|
| `CaseStudyWireframes.tsx` | Landing page tiles + hero backgrounds |
| `ImpactDiff.tsx` | Used by RCFullContent, MLFullContent |
| `ImageLightbox.tsx` | Core lightbox renderer used by LightboxContext |
| `LetsTalkCTA.tsx` | Landing page CTA |
| `StoryDeck.tsx` | Presentation mode carousel |
| `SystemIndex.tsx` | Next case study navigation |
| `ViewModeToggle.tsx` | Case study nav bar |
| `storyboard/` (all 19 files) | Used by RC/ML/DSML presentation slides |

## Storyboard: KEEP all

All storyboard files (`Beat*.tsx`, `*MovieBeats.tsx`, `AutoPlayStory.tsx`, `PresenterBar.tsx`) are still imported by the cinematic case study views for presentation mode slides.

---

## Summary

| Category | Files | Est. Size |
|---|---|---|
| Dead case-study/ components | ~67 files | ~650KB |
| Dead case-study-v2/ | 3 files | ~93KB |
| Dead experiment/ route | 1 file | ~1KB |
| Dead UI utilities | 6 files | ~18KB |
| Dead data files | 9 files | ~40KB |
| Dead lib files | 2-3 files | ~15KB |
| Dead home/timeline components | 3 files | ~28KB |
| Dead sharing component | 1 file | ~3KB |
| **TOTAL** | **~92 files** | **~850KB** |
