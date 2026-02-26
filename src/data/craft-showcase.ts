import type { CraftShowcaseData } from '@/types/craftShowcase'

// ═══════════════════════════════════════════════════
// ReportCaster — "The Final System: Modal-Based Workflows"
// ═══════════════════════════════════════════════════

export const rcCraftShowcase: CraftShowcaseData = {
    sectionTag: 'SHIPPED SYSTEM',
    sectionTitle: 'The Final System: Modal-Based Workflows',
    sectionDescription: '400+ screens across six subsystems unified into platform-native modals. I designed 250+; onboarded 2 designers who completed 150+. Shipped in WebFOCUS 9.3.',
    tabs: [
        {
            id: '01_SCHEDULE_DIALOG',
            index: '01',
            label: 'Schedule Dialog',
            iconName: 'Calendar',
            title: 'The Unified Schedule Dialog',
            description: 'The heart of ReportCaster modernization. All scheduling functionality consolidated into a single, modal-based workflow accessible via + menu. From 9 clicks across 5 interfaces to 4 clicks in one unified experience.',
            images: [
                { src: '/images/case-study/ReportCaster/Schedule Dialog - Properties.png', alt: 'Schedule Dialog - Properties', caption: 'Core scheduling configuration', figNumber: 'FIG_01' },
                { src: '/images/case-study/ReportCaster/Schedule dialog - tasks.png', alt: 'Schedule Dialog - Tasks', caption: 'What gets scheduled', figNumber: 'FIG_02' },
                { src: '/images/case-study/ReportCaster/Task Dialog.png', alt: 'Task Dialog', caption: 'Individual task settings', figNumber: 'FIG_03' },
                { src: '/images/case-study/ReportCaster/Schedule Dialog - Job Log.png', alt: 'Schedule Dialog - Job Log', caption: 'Execution history and status', figNumber: 'FIG_04' },
                { src: '/images/case-study/ReportCaster/Job log dialog.png', alt: 'Job Log Dialog', caption: 'Detailed execution history', figNumber: 'FIG_05' },
            ],
        },
        {
            id: '02_RECURRENCE',
            index: '02',
            label: 'Recurrence Redesign',
            iconName: 'Clock',
            isKey: true,
            title: 'From Cryptic Settings to Natural Language',
            description: 'The legacy recurrence UI was a 30-year-old relic — confusing checkbox mazes and obscure terminology. I redesigned it with a natural language summary that tells users exactly what they\'ve scheduled in plain English.',
            highlight: {
                label: 'DESIGN DECISION',
                text: 'Every recurrence configuration now generates a human-readable sentence: "Runs Monday to Friday at 6:00 PM, recurring every week." With complex scheduling, users need confirmation of what they\'ve actually set.',
            },
            images: [
                { src: '/images/case-study/ReportCaster/Schedule Dialog - Recurrences.png', alt: 'Schedule Dialog - Recurrences', caption: 'Natural language summary at the top', figNumber: 'FIG_05' },
                { src: '/images/case-study/ReportCaster/New SD - Recurrence - Weekly.png', alt: 'Recurrence - Weekly', caption: 'Clear day selection with summary', figNumber: 'FIG_06' },
                { src: '/images/case-study/ReportCaster/New SD - Recurrence - Monthly - Days of the week.png', alt: 'Recurrence - Monthly', caption: '"Every second Monday of the month"', figNumber: 'FIG_07' },
                { src: '/images/case-study/ReportCaster/New SD - Recurrence - Monthly - Dates.png', alt: 'Recurrence - Monthly Dates', caption: 'Specific day selection', figNumber: 'FIG_08' },
                { src: '/images/case-study/ReportCaster/New SD - Recurrence - Yearly.png', alt: 'Recurrence - Yearly', caption: 'Annual scheduling made clear', figNumber: 'FIG_09' },
                { src: '/images/case-study/ReportCaster/New SD - Recurrence - Days.png', alt: 'Recurrence - Days', caption: 'Every N days', figNumber: 'FIG_10' },
                { src: '/images/case-study/ReportCaster/New SD - Recurrence - Hours.png', alt: 'Recurrence - Hours', caption: 'Intraday scheduling', figNumber: 'FIG_11' },
                { src: '/images/case-study/ReportCaster/New SD - Recurrence - Validation Error.png', alt: 'Recurrence - Validation', caption: 'Clear error states prevent mistakes', figNumber: 'FIG_12' },
            ],
        },
        {
            id: '03_DISTRIBUTION',
            index: '03',
            label: 'Distribution List',
            iconName: 'Mail',
            title: 'Streamlined Report Distribution',
            description: 'Distribution lists define who receives scheduled reports. Modernized from a separate standalone tool to an integrated panel within the schedule workflow.',
            images: [
                { src: '/images/case-study/ReportCaster/Distribution List starting point.png', alt: 'Distribution List - Starting Point', caption: 'Empty distribution panel', figNumber: 'FIG_13' },
                { src: '/images/case-study/ReportCaster/Distribution List - Populated List view.png', alt: 'Distribution List - Populated', caption: 'Active recipients with status', figNumber: 'FIG_14' },
                { src: '/images/case-study/ReportCaster/Distribution List - Add existing members.png', alt: 'Distribution List - Add Members', caption: 'Search and select from directory', figNumber: 'FIG_15' },
                { src: '/images/case-study/ReportCaster/Distribution List - Add new members.png', alt: 'Distribution List - New Member', caption: 'Create recipient inline', figNumber: 'FIG_16' },
                { src: '/images/case-study/ReportCaster/Distribution List - Edit Current List+Search built in.png', alt: 'Distribution List - Edit', caption: 'Built-in search for large lists', figNumber: 'FIG_17' },
            ],
        },
        {
            id: '04_ACCESS_LIST',
            index: '04',
            label: 'Access List',
            iconName: 'Users',
            title: 'Permission Management Made Clear',
            description: 'Access lists control who can view and manage schedules. Previously buried in a separate application, now integrated into the workflow.',
            images: [
                { src: '/images/case-study/ReportCaster/Access List starting point.png', alt: 'Access List - Starting Point', caption: 'Empty access panel', figNumber: 'FIG_18' },
                { src: '/images/case-study/ReportCaster/Access List - Current List+context menu options.png', alt: 'Access List - Current List', caption: 'Members with context actions', figNumber: 'FIG_19' },
                { src: '/images/case-study/ReportCaster/Access List - Add existing members - empty state.png', alt: 'Access List - Add Empty', caption: 'Empty state with search', figNumber: 'FIG_20' },
                { src: '/images/case-study/ReportCaster/Access List - Add existing members - populated.png', alt: 'Access List - Add Populated', caption: 'Available members to add', figNumber: 'FIG_21' },
                { src: '/images/case-study/ReportCaster/Access List - Add existing members - selected members.png', alt: 'Access List - Selected', caption: 'Members ready to add', figNumber: 'FIG_22' },
                { src: '/images/case-study/ReportCaster/Access List - Add new members.png', alt: 'Access List - New Member', caption: 'Create user inline', figNumber: 'FIG_23' },
            ],
        },
        {
            id: '05_RC_EXPLORER',
            index: '05',
            label: 'RC Explorer',
            iconName: 'FolderTree',
            title: 'Schedule Asset Management',
            description: 'The explorer view for browsing, filtering, and managing all ReportCaster assets. Integrated into the platform hub with consistent filtering patterns.',
            images: [
                { src: '/images/case-study/ReportCaster/ReportCaster Explorer.png', alt: 'ReportCaster Explorer', caption: 'Unified asset browser', figNumber: 'FIG_24' },
                { src: '/images/case-study/ReportCaster/RC Explorer - filter view for different types of RC assets.png', alt: 'RC Explorer - Filter', caption: 'Asset type filtering', figNumber: 'FIG_25' },
                { src: '/images/case-study/ReportCaster/RC Explorer__Grid View_Flat View 1.png', alt: 'RC Explorer - Grid', caption: 'Visual asset browsing', figNumber: 'FIG_26' },
            ],
        },
        {
            id: '06_RC_ADMIN',
            index: '06',
            label: 'RC Admin',
            iconName: 'Settings',
            title: 'Status & Administration',
            description: 'The admin view showing job status, execution history, and system health. Critical for IT admins managing 20M+ weekly schedules.',
            images: [
                { src: '/images/case-study/ReportCaster/ReportCaster Status (Admin).png', alt: 'ReportCaster Status Admin', caption: 'System health overview', figNumber: 'FIG_27' },
            ],
        },
    ],
    comparison: {
        before: {
            tag: 'LEGACY PAIN',
            title: '30 Years of Checkbox Chaos',
            description: 'The original recurrence UI was a maze of checkboxes, dropdowns, and obscure terminology. Users couldn\'t verify what they\'d actually scheduled without running a test.',
        },
        after: {
            tag: 'NATURAL LANGUAGE',
            title: 'Human-Readable Summaries',
            description: 'Every configuration now generates a plain English summary.',
            highlight: '"Runs Monday to Friday at 6:00 PM, recurring every week."',
        },
    },
    footer: {
        label: 'V3 OUTCOME',
        text: '400+ screens across 6 subsystems — unified into platform-native modals. Significantly reduced entry steps, zero new tabs, and natural language recurrence summaries. Shipped in WebFOCUS 9.3.',
    },
}


// ═══════════════════════════════════════════════════
// ML Functions — "System Inspection: The Design Artifacts"
// ═══════════════════════════════════════════════════

export const mlCraftShowcase: CraftShowcaseData = {
    sectionTag: 'ARTIFACT GALLERY',
    sectionTitle: 'System Inspection: The Design Artifacts',
    sectionDescription: 'Navigate through the key design deliverables that emerged from 6–8 months of cross-functional iteration.',
    tabs: [
        {
            id: '01_ENTRY_POINTS',
            index: '01',
            label: 'Entry Points',
            iconName: 'MousePointer',
            title: 'Multiple Entry Points from the Hub',
            description: 'Right-click context menus from the Hub, driven by the Techy Analyst persona. Users access Predict Data via right-click on dataset, folder, or +Data menu.',
            images: [
                { src: '/images/case-study/ml-functions/1. Predict Data - Train Models - Empty State.png', alt: 'Predict Data - Empty State', caption: 'Initial landing when no models exist', figNumber: 'FIG_04' },
                { src: '/images/case-study/ml-functions/Launch ML from the HUB - right click dataset.png', alt: 'Launch ML - right click dataset', caption: 'Right-click on dataset: Direct access', figNumber: 'FIG_05' },
                { src: '/images/case-study/ml-functions/Launch ML from the HUB - right click folder.png', alt: 'Launch ML - right click folder', caption: 'Right-click on folder: Context menu', figNumber: 'FIG_06' },
                { src: '/images/case-study/ml-functions/Launch ML from the HUB - right click +Data button.png', alt: 'Launch ML - +Data button', caption: '+Data menu: First-class feature exposure', figNumber: 'FIG_07' },
            ],
        },
        {
            id: '03_CORE_WORKFLOW',
            index: '03',
            label: 'Core Workflow',
            iconName: 'Workflow',
            title: 'The 4-Step Guided Wizard',
            description: 'Structured guided flow: problem type → target → predictors → hyperparameters. Making ML feel like a guided tour, not a black box.',
            images: [
                { src: '/images/case-study/ml-functions/4. Train Model Workflow - Step 1 - Select Problem Type.png', alt: 'Step 1 - Select Problem Type', caption: 'Select Problem Type (classification/regression)', figNumber: 'FIG_08' },
                { src: '/images/case-study/ml-functions/5. Train Model Workflow - Step 2 - Specify Problem.png', alt: 'Step 2 - Specify Problem', caption: 'Specify Problem details and target', figNumber: 'FIG_09' },
                { src: '/images/case-study/ml-functions/6. Train Model Workflow - Step 3 - Select Predictors.png', alt: 'Step 3 - Select Predictors', caption: 'Select Predictors and features', figNumber: 'FIG_10' },
                { src: '/images/case-study/ml-functions/7. Train Model Workflow - Step 4 - Configure Hyperparameters.png', alt: 'Step 4 - Configure Hyperparameters', caption: 'Configure Hyperparameters (optional for experts)', figNumber: 'FIG_11' },
            ],
        },
        {
            id: '04_DESIGN_SYSTEM',
            index: '04',
            label: 'Design System',
            iconName: 'Layout',
            title: 'ML-Specific Component Architecture',
            description: 'A comprehensive design system built for ML workflows: responsive grids, table styling specifications, and component-level precision for model cards.',
            images: [
                { src: '/images/case-study/ml-functions/1. ML UI Structure.png', alt: 'ML UI Structure', caption: 'Overall layout structure', figNumber: 'FIG_12' },
                { src: '/images/case-study/ml-functions/12 Column Grid for the Step Workflow.png', alt: '12 Column Grid', caption: 'Responsive 12-column system', figNumber: 'FIG_13' },
                { src: '/images/case-study/ml-functions/Important Styling and Structure Decisions w/12 Column Grid in Train Model UI.png', alt: 'Grid in Train Model', caption: 'Applied grid in context', figNumber: 'FIG_14' },
                { src: '/images/case-study/ml-functions/Important Styling and Structure Decisions w/Table Styling Guide.png', alt: 'Table Styling Guide', caption: 'Color specs for predictors & columns', figNumber: 'FIG_15' },
                { src: '/images/case-study/ml-functions/Important Styling and Structure Decisions w/Model Tile UI Guide.png', alt: 'Model Tile UI Guide', caption: 'Component-level specs for model cards', figNumber: 'FIG_16' },
            ],
        },
        {
            id: '05_ADVANCED_METRICS',
            index: '05',
            label: 'Advanced Metrics',
            iconName: 'BarChart3',
            title: 'Balancing DS Needs with Readability',
            description: 'Advanced metrics screens that balance data scientist needs with user needs. The tension between depth and clarity produced the best outcomes.',
            images: [
                { src: '/images/case-study/ml-functions/10. Binary Classfication - ROC Precision.png', alt: 'ROC Precision', caption: 'Comprehensive yet scannable metrics', figNumber: 'FIG_17' },
                { src: '/images/case-study/ml-functions/17. Optimize Model Popup.png', alt: 'Optimize Model Popup', caption: 'Expert controls with clear affordances', figNumber: 'FIG_18' },
            ],
        },
        {
            id: '06_KEY_INTERACTIONS',
            index: '06',
            label: 'Key Interactions',
            iconName: 'Sparkles',
            isKey: true,
            title: 'The Confusion Matrix & Explainability',
            description: 'The confusion matrix went through 10+ iterations with our domain expert. Balanced DS priorities (metrics, accuracy) with UX priorities (clarity, scan-ability).',
            quote: {
                text: "This is the best screen in the entire UX revamp — I couldn't have designed it better.",
                attribution: 'Principal Data Scientist',
            },
            images: [
                { src: '/images/case-study/ml-functions/11. Train Model Workflow - Confusion Matrix.png', alt: 'Confusion Matrix', caption: '10+ iterations to perfect', figNumber: 'FIG_19' },
                { src: '/images/case-study/ml-functions/8. Train Model Workflow - Compare Models.png', alt: 'Compare Models', caption: 'Cards replace legacy tables', figNumber: 'FIG_20' },
                { src: '/images/case-study/ml-functions/6. Run Model - Explainability Popup.png', alt: 'Explainability Popup', caption: 'Making ML trustworthy', figNumber: 'FIG_21' },
            ],
        },
    ],
    footer: {
        label: 'IDENTIFIED PATTERN',
        text: 'The tension between data scientist depth and user clarity produced the best results. 21 key artifacts documenting 6–8 months of cross-functional iteration.',
    },
}


// ═══════════════════════════════════════════════════
// IQ Plugin — "From Concept to Production"
// ═══════════════════════════════════════════════════

export const iqCraftShowcase: CraftShowcaseData = {
    sectionTag: 'DESIGN EVOLUTION',
    sectionTitle: 'From Concept to Production',
    sectionDescription: '4 iterations to the final Hub architecture.',
    tabs: [
        {
            id: '01_V1',
            index: '01',
            label: 'V1',
            iconName: 'Pencil',
            title: 'Early Concept',
            description: 'Initial exploration of unified DSML entry point.',
            images: [
                { src: '/images/case-study/iq-plugin/Early concept - 1.png', alt: 'Early Concept', caption: 'First exploration of the concept', figNumber: 'FIG_01' },
            ],
        },
        {
            id: '02_V2',
            index: '02',
            label: 'V2',
            iconName: 'Layers',
            title: 'Mid-Iteration',
            description: 'Structure taking shape — navigation patterns emerging.',
            images: [
                { src: '/images/case-study/iq-plugin/Mid-Iteration.png', alt: 'Mid-Iteration', caption: 'Navigation patterns taking shape', figNumber: 'FIG_02' },
            ],
        },
        {
            id: '03_V3',
            index: '03',
            label: 'V3',
            iconName: 'LayoutGrid',
            title: 'Refined Layout',
            description: 'Card-based navigation with clearer feature hierarchy.',
            images: [
                { src: '/images/case-study/iq-plugin/Mid-Iteration-1.png', alt: 'Refined Layout', caption: 'Card-based hierarchy emerging', figNumber: 'FIG_03' },
            ],
        },
        {
            id: '04_FINAL',
            index: '04',
            label: 'Final',
            iconName: 'CheckCircle',
            isKey: true,
            title: 'Production',
            description: 'Final polished design ready for engineering handoff.',
            images: [
                { src: '/images/case-study/iq-plugin/Final Look.png', alt: 'Final Production Design', caption: 'Production-ready design', figNumber: 'FIG_04' },
            ],
        },
    ],
}
