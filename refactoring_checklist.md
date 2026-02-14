# Animation Refactoring & Flicker Remediation Checklist

## Completed Refactoring
- [x] **IQWorkflowsAndFoundation.tsx**: Implemented variant orchestration.
- [x] **IQArchitectureBlueprint.tsx**: Implemented variant orchestration.
- [x] **IQIterationLog.tsx**: Synchronized animations in tabs and layout.
- [x] **DesignIterationLog.tsx**: Synchronized animations.
- [x] **ImpactVisual.tsx**: Comprehensive variant system implemented.
- [x] **LayeredDisclosureVisual.tsx**: Variant system implemented for layers/cards.
- [x] **IQValidationSources.tsx**: Variant system implemented.
- [x] **BeforeAfterVideo.tsx**: Refactored to use variants.
- [x] **MultiBeforeAfterVideo.tsx**: Refactored to use variants.
- [x] **ProcessArtifactViewer.tsx**: Refactored gallery animations.
- [x] **SystemMappingBreakdown.tsx**: Unified variant system.
- [x] **RCDesignEvolution.tsx**: Parent-child inheritance implemented.
- [x] **SystemTopologyBlueprint.tsx**: Parent-child inheritance implemented.
- [x] **SystemIndex.tsx**: Entry animations added and synchronized.
- [x] **TerminalInsight.tsx**: Properly triggers its own animation.
- [x] **PrototypeBlock.tsx**: Prevented double-fading by removing redundant parent wrapper.

## Pending Verification
- [ ] Verify `PrototypeBlock` animations (video fallback vs comparison components).
- [ ] Confirm no regression in `SectionBlock` layout.
- [ ] Test across different case studies (ReportCaster, ML Functions, IQ Plugin).

## Notes
The refactoring strategy focused on replacing independent `initial`/`whileInView` props with a coordinated `variants` system, using `staggerChildren` where appropriate. This minimizes the number of scroll listeners and ensures smoother, synchronized entry animations, directly addressing the flickering issue.
