import type { ArchitectureBlueprintData } from '@/types/architectureBlueprint'

/**
 * ReportCaster — Raw Sketchbook + Workflow Map
 */
export const rcArchitectureBlueprint: ArchitectureBlueprintData = {
    heading: {
        tag: 'PROCESS & ARCHITECTURE',
        title: 'The Raw Sketchbook',
        description:
            'Before pixels, there was paper. 100+ pages of notes, logic maps, and questions that built this system.',
        color: 'teal',
    },
    sketches: {
        title: 'Physical Sketches',
        description: 'Hand-drawn logic maps, user journeys, and architecture brainstorms.',
        artifacts: [
            {
                src: '/images/case-study/ReportCaster/process/rc-sketchbook_Page_01_Image_0001.jpg',
                alt: 'Making notes on legacy system',
                caption: 'Deconstructing the fragmentation of the 5 connected subsystems.',
                needsRotation: true,
            },
            {
                src: '/images/case-study/ReportCaster/process/rc-sketchbook_Page_02_Image_0001.jpg',
                alt: 'Mapping user journeys',
                caption: 'Tracing the complex paths users had to navigate.',
                needsRotation: true,
            },
            {
                src: '/images/case-study/ReportCaster/process/rc-sketchbook_Page_03_Image_0001.jpg',
                alt: 'Identifying friction points',
                caption: 'Documenting the friction and dead-ends in the legacy workflow.',
                needsRotation: true,
            },
            {
                src: '/images/case-study/ReportCaster/process/rc-sketchbook_Page_04_Image_0001.jpg',
                alt: 'Brainstorming architecture',
                caption: 'How the scheduling modal could live in the + menu.',
                needsRotation: true,
            },
            {
                src: '/images/case-study/ReportCaster/process/rc-sketchbook_Page_05_Image_0001.jpg',
                alt: 'Simplifying complexity',
                caption: 'Sketches on how we could simplify complex rules.',
                needsScale: true,
            },
            {
                src: '/images/case-study/ReportCaster/process/rc-sketchbook_Page_06_Image_0001.jpg',
                alt: 'Unifying workflows',
                caption: 'Exploring how scattered lists could be unified with the main flow.',
                needsScale: true,
            },
            {
                src: '/images/case-study/ReportCaster/process/rc-sketchbook_Page_07_Image_0001.jpg',
                alt: 'Visualizing the new interface',
                caption: 'Early sketches of what the new unified version could look like.',
                needsScale: true,
            },
            ...Array.from({ length: 7 }, (_, i) => {
                const pageNum = i + 8
                const needsRotation = pageNum === 13
                return {
                    src: `/images/case-study/ReportCaster/process/rc-sketchbook_Page_${String(pageNum).padStart(2, '0')}_Image_0001.jpg`,
                    alt: `Process sketch page ${pageNum}`,
                    needsRotation,
                    needsScale: !needsRotation,
                }
            }),
        ],
        pdfUrl: '/assets/rc-sketchbook.pdf',
    },
    diagrams: [
        {
            src: '/images/case-study/ReportCaster/ReportCaster Basic Map Workflow.png',
            alt: 'ReportCaster System Workflow Map',
            label: '// SYSTEM_WORKFLOW',
            caption: 'Complete workflow map showing how all 5 ReportCaster subsystems connect — scheduling, distribution, access lists, explorer, and admin.',
            size: 'full',
        },
    ],
}

/**
 * ML Functions — System Blueprint + Topology
 */
export const mlArchitectureBlueprint: ArchitectureBlueprintData = {
    heading: {
        tag: 'PROCESS & ARCHITECTURE',
        title: 'The System Blueprint',
        description:
            'Physical sketches and architecture maps that defined how the new ML wizard would work within the WebFOCUS platform.',
        color: 'blue',
    },
    sketches: {
        title: 'Physical Sketches',
        description: 'Hand-drawn system notes, user flows, and logic maps.',
        artifacts: [
            {
                src: '/images/case-study/ml-functions/Machine learning functions-handdrawn-wireframes.png',
                alt: 'Early concept wireframes',
                caption: 'Sketching the "Train Model" wizard steps on paper.',
            },
            {
                src: '/images/case-study/ml-functions/process/ml-iq-sketchbook_Page_01_Image_0001.jpg',
                alt: 'System Notes',
                caption: 'Initial thoughts and requirements gathering.',
                needsRotation: true,
                needsScale: true,
            },
            {
                src: '/images/case-study/ml-functions/process/ml-iq-sketchbook_Page_02_Image_0001.jpg',
                alt: 'User Flow Mapping',
                caption: "Mapping the data scientist's journey through the system.",
                needsRotation: true,
                needsScale: true,
            },
            {
                src: '/images/case-study/ml-functions/process/ml-iq-sketchbook_Page_03_Image_0001.jpg',
                alt: 'Architecture Diagram',
                caption: 'Connecting the disparate machine learning subsystems.',
                needsRotation: true,
                needsScale: true,
            },
            {
                src: '/images/case-study/ml-functions/process/ml-iq-sketchbook_Page_04_Image_0001.jpg',
                alt: 'Logic Map',
                caption: 'Defining decision trees for model training.',
                needsRotation: true,
                needsScale: true,
            },
            {
                src: '/images/case-study/ml-functions/process/ml-iq-sketchbook_Page_05_Image_0001.jpg',
                alt: 'Early Wireframes',
                caption: 'Conceptualizing the drag-and-drop interface.',
                needsRotation: true,
                needsScale: true,
            },
            {
                src: '/images/case-study/ml-functions/process/ml-iq-sketchbook_Page_06_Image_0001.jpg',
                alt: 'Refining Flow',
                caption: 'Refining the step-by-step model configuration.',
                needsRotation: true,
                needsScale: true,
            },
            {
                src: '/images/case-study/ml-functions/process/ml-iq-sketchbook_Page_07_Image_0001.jpg',
                alt: 'Identifying Pain Points',
                caption: 'Solving for parameter fragmentation.',
                needsRotation: true,
                needsScale: true,
            },
            {
                src: '/images/case-study/ml-functions/process/ml-iq-sketchbook_Page_08_Image_0001.jpg',
                alt: 'Brainstorming Solutions',
                caption: 'Exploring different layout options.',
                needsRotation: true,
                needsScale: true,
            },
            {
                src: '/images/case-study/ml-functions/process/ml-iq-sketchbook_Page_09_Image_0001.jpg',
                alt: 'UI Layout Sketches',
                caption: 'Visualizing the results dashboard.',
                needsRotation: true,
                needsScale: true,
            },
            {
                src: '/images/case-study/ml-functions/process/ml-iq-sketchbook_Page_10_Image_0001.jpg',
                alt: 'Finalizing Approach',
                caption: 'The chosen direction for the ML workflow.',
                needsRotation: true,
                needsScale: true,
            },
        ],
        pdfUrl: '/assets/ml-iq-sketchbook.pdf',
    },
    diagrams: [
        {
            src: '/images/case-study/ml-functions/1. ML UI Structure.png',
            alt: 'ML UI Structure',
            label: '// UI_STRUCTURE',
            caption: 'How the ML workflow redesign fits within the existing WebFOCUS shell and navigation.',
            size: 'full',
        },
        {
            src: '/images/case-study/ml-functions/Overview of ML workflow based on user.png',
            alt: 'ML workflow by user type',
            label: '// USER_WORKFLOW',
            caption: 'How Train Model and Run Model connect and flow into each other by user type.',
            size: 'half',
        },
        {
            src: '/images/case-study/ml-functions/ML functions inital workflow.png',
            alt: 'ML workflow in IQ Plugin',
            label: '// IQ_PLUGIN_FLOW',
            caption: 'Entry points, data selection, and training steps within IQ Plugin.',
            size: 'half',
        },
        {
            src: '/images/case-study/ml-functions/all model types architecture map.png',
            alt: 'All model types architecture',
            label: '// MODEL_TAXONOMY',
            caption: 'Complete system architecture for all ML model types supported.',
            size: 'full',
        },
    ],
    footer: {
        title: 'architecture_summary.log',
        label: 'INSIGHT:',
        text: "We didn't just redesign screens; we re-architected the user's mental model. From scattershot tasks to a linear, coherent journey.",
        highlight: "user's mental model",
    },
}

/**
 * IQ Plugin — Building the System
 */
export const iqArchitectureBlueprint: ArchitectureBlueprintData = {
    heading: {
        tag: 'PROCESS & ARCHITECTURE',
        title: 'Building the System',
        description:
            'From hand-drawn sketches to system flowcharts — the structural foundation that makes three complex features feel like one.',
        color: 'teal',
    },
    sketches: {
        title: 'Physical Sketches',
        description: 'Early hand-drawn concepts and explorations.',
        artifacts: [
            {
                src: '/images/case-study/iq-plugin/hand-drawn-sketches.png',
                alt: 'Hand-drawn feature sketches',
                caption: 'Early sketches exploring how NLQ, Insights, and Predict Data could live together.',
            },
            {
                src: '/images/case-study/iq-plugin/Early concept - 1.png',
                alt: 'Early concept exploration',
                caption: 'First concept mockup — testing the unified hub layout.',
            },
            {
                src: '/images/case-study/iq-plugin/IQ Wireframes.png',
                alt: 'IQ Plugin wireframes',
                caption: 'Navigation patterns, information hierarchy, and feature discoverability.',
            },
        ],
        pdfUrl: '/assets/ml-iq-sketchbook.pdf',
    },
    diagrams: [
        {
            src: '/images/case-study/iq-plugin/IQ Structure flowchart.png',
            alt: 'IQ Plugin System Flowchart',
            label: '// SYSTEM_FLOWCHART',
            caption: 'User journeys across NLQ, Insights, and Predict Data — all paths connect through unified dataset selection.',
            size: 'full',
        },
        {
            src: '/images/case-study/iq-plugin/Structure Layout in HUB 1.png',
            alt: 'Hub Integration Layout',
            label: '// HUB_INTEGRATION',
            caption: 'How IQ Plugin fits within the WebFOCUS Hub — one-click access from the workspace.',
            size: 'half',
        },
        {
            src: '/images/case-study/iq-plugin/IQ Dataset Selection Workflow 2.png',
            alt: 'Dataset Selection Workflow',
            label: '// DATASET_WORKFLOW',
            caption: 'Select once, use across all three features. Eliminates redundant data picking.',
            size: 'half',
        },
        {
            src: '/images/case-study/iq-plugin/Mockups for IQ Plugin Reponsive UI 1.png',
            alt: 'Responsive UI Mockups',
            label: '// RESPONSIVE_DESIGN',
            caption: 'Enterprise BI on any screen — all three features work seamlessly across devices.',
            size: 'full',
        },
    ],
    footer: {
        title: 'design_principle.log',
        label: 'DESIGN_PRINCIPLE:',
        text: "Every architectural decision optimized for pattern consistency. Same navigation logic, same data selection flow, same error handling. Learn one workflow, know them all.",
        highlight: 'pattern consistency',
    },
}
