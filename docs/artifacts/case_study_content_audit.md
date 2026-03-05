# Case Study Content Audit: Feb 10 vs Current

> Comparing commit `54d9944` (Feb polished version) against the current `CaseStudyPage.tsx` new layout.

## REPORTCASTER

### Feb 10 Layout (per section)
| Section | Components |
|---------|-----------|
| **section-01** | SectionBlock + SystemArchaeology |
| **section-02** | SectionBlock + ResearchApproach (RC) + EmpathizeStrategyGrid + MarketAnalysis (RC) + PersonaCards |
| **section-03** | SectionBlock + ProcessArtifactViewer (RC) + SystemMappingBreakdown |
| **section-04** | SectionBlock + ScheduleWorkflowComparison + VersionIteration + **RCDesignEvolution** + ImpactVisual |
| **section-05** | SectionBlock + TeamCollaboration (RC) |
| **section-06** | SectionBlock + NavigateForwardContent |
| **Cross-section** | QuickOverview, VitalSigns, ReportCasterTimeline, DesignSystemShowcase |

### Current CaseStudyPage.tsx (RC 6-Act)
| Act | Components |
|-----|-----------|
| **Act I** | SectionBlock (01) + SystemArchaeology |
| **Act II** | SectionBlock (02) + TribalKnowledgeNetwork + SectionBlock (03) + ProcessArtifactViewer (RC) |
| **Act III** | SystemConsolidationMap + VersionIteration + ✅ **RCDesignEvolution** (just restored) + PlusMenuInsight |
| **Act IV** | ScheduleWorkflowComparison + NaturalLanguageInsight + PrototypeBlock + ImpactDiff + DesignSystemShowcase |
| **Act V** | SectionBlock (05) + TeamCollaboration (RC) |
| **Act VI** | SectionBlock (06) + ScaleAndResponsibility + QuickOverviewSection + NavigateForwardContent |

### RC GAPS (Missing from new layout)
| Component | Status | Notes |
|-----------|--------|-------|
| ❌ **ResearchApproach** (RC data) | Missing | Was in section-02. TribalKnowledgeNetwork replaces some of it but is different. |
| ❌ **EmpathizeStrategyGrid** | Missing | Was in section-02 — stakeholder empathy mapping. |
| ❌ **MarketAnalysis** (RC) | Missing | Was in section-02 — competitive landscape. |
| ❌ **PersonaCards** | Missing | Was in section-02 — user persona cards. |
| ❌ **ImpactVisual** | Missing | Was in section-04 — impact visualization. |
| ❌ **SystemMappingBreakdown** | Missing | Was in section-03 — system mapping. |
| ✅ RCDesignEvolution | **Just restored** | Tabbed subsystem screens. |

---

## ML FUNCTIONS

### Feb 10 Layout (per section)
| Section | Components |
|---------|-----------|
| **section-01** | SectionBlock + MLKnowledgeGapSystem + MLChallengeBreakdown |
| **section-02** | SectionBlock + ResearchApproach (ML) + MLUserAccessStrategy + MLPersonaCards + MarketAnalysis (ML) |
| **section-03** | SectionBlock + ProcessArtifactViewer (ML) + SystemTopologyBlueprint + MLWorkflowMapping + ThreeCriticalPivots |
| **section-04** | SectionBlock + LayeredDisclosureVisual + DesignIterationLog |
| **section-05** | SectionBlock + MLExplainabilityHighlight + TeamCollaboration (ML) |
| **section-06** | SectionBlock + MLImpactMetrics + NavigateForwardContent/MLReflection + MLPatternConnections |
| **Cross-section** | QuickOverview, VitalSigns, MLFunctionsTimeline, DesignSystemShowcase |

### Current CaseStudyPage.tsx (ML 6-Act)
| Act | Components |
|-----|-----------|
| **Act I** | SectionBlock (01) + MLKnowledgeGapSystem + MLChallengeBreakdown |
| **Act II** | SectionBlock (02) + MLUserAccessStrategy + MLPersonaCards |
| **Act III** | SectionBlock (03) + ProcessArtifactViewer (ML) + SystemTopologyBlueprint + MLWorkflowMapping |
| **Act IV** | SectionBlock (04) + AutoSequenceDataViewer (shipped screens) + PrototypeBlock + ImpactDiff ×2 + DesignSystemShowcase |
| **Act V** | SectionBlock (05) + MLExplainabilityHighlight + TeamCollaboration (ML) |
| **Act VI** | SectionBlock (06) + MLImpactMetrics + CaseStudyReflection + MLPatternConnections |

### ML GAPS (Missing from new layout)
| Component | Status | Notes |
|-----------|--------|-------|
| ❌ **ResearchApproach** (ML data) | Removed intentionally | Content overlapped with MLKnowledgeGapSystem. |
| ❌ **MarketAnalysis** (ML) | Missing | Competitive landscape for ML. |
| ❌ **ThreeCriticalPivots** | Missing | Was in section-03 — 3 architectural pivots. |
| ❌ **LayeredDisclosureVisual** | Missing | Was in section-04 — progressive disclosure strategy. |
| ❌ **DesignIterationLog** | Missing | Was in section-04 — IDE-style artifact explorer with iteration history. |
| ✅ MLFunctionsTimeline | Removed intentionally | User requested removal. |
| ✅ QuickOverviewSection | Removed intentionally | Duplicated MLImpactMetrics in Act VI. |

---

## IQ PLUGIN
> Note: IQ Plugin uses the fallback layout (non-6-Act), not audited here in detail.

### Feb 10 Layout (per section)
| Section | Components |
|---------|-----------|
| **section-01** (Discovery) | SectionBlock + (IQ-specific discovery sub-components) |
| **section-02** (Research) | SectionBlock |
| **section-03** (Architecture) | SectionBlock |
| **section-04** (Iterate) | SectionBlock + IQEvolution + IQEmptyStateShowcase + DesignIterationLog (IQ tabs) |
| **section-05** (Grow) | SectionBlock + TeamCollaboration (IQ) + IQChallengesBreakdown |
| **section-06** (Outcome) | SectionBlock |

### IQ GAPS — Need to verify against current fallback layout

---

## PRIORITY ACTION ITEMS

### ✅ Restored
1. **ThreeCriticalPivots** → ML Act III (after MLWorkflowMapping) — 3 visual before/after pivot cards
2. **LayeredDisclosureVisual** → ML Act IV — progressive disclosure strategy diagram
3. **DesignIterationLog** → ML Act IV — IDE-style artifact explorer
4. **RCDesignEvolution** → RC Act III (after VersionIteration) — 6-tab shipped screen viewer

All 4 components converted from light-mode hardcoded slate/white to design system tokens.

### Consider Restoring (valuable but may overlap)
5. **MarketAnalysis** (both RC and ML) — competitive landscape
6. **PersonaCards** (RC) and **EmpathizeStrategyGrid** (RC) — research depth
7. **SystemMappingBreakdown** (RC) — replaced by SystemConsolidationMap?
8. **ImpactVisual** (RC) — impact data visualization

### Intentionally Removed (confirmed by user)
- MLFunctionsTimeline ✅
- QuickOverviewSection from ML Act VI ✅  
- ResearchApproach from ML (duplicated MLKnowledgeGapSystem) ✅
