/**
 * Architecture Blueprint — unified types for the merged
 * sketches + architecture diagrams section.
 * 
 * Replaces: ProcessArtifactViewer, SystemTopologyBlueprint, IQArchitectureBlueprint
 */

export interface BlueprintImage {
    /** Image source path */
    src: string
    /** Alt text for accessibility */
    alt: string
    /** Mono-style label shown above image (e.g. "// FIG_01: UI_STRUCTURE") */
    label: string
    /** Caption text below the image */
    caption: string
    /** 'full' spans 2 columns, 'half' takes 1 column */
    size: 'full' | 'half'
}

export interface SketchArtifact {
    /** Image source path */
    src: string
    /** Alt text */
    alt: string
    /** Caption shown in lightbox */
    caption?: string
    /** Whether image needs 90° rotation */
    needsRotation?: boolean
    /** Whether image needs slight upscale */
    needsScale?: boolean
}

export interface ArchitectureBlueprintData {
    /** Section heading config */
    heading: {
        tag: string
        title: string
        description: string
        color: 'teal' | 'blue' | 'violet' | 'amber' | 'rose'
    }

    /** Optional sketches/process artifacts section */
    sketches?: {
        title: string
        description: string
        artifacts: SketchArtifact[]
        /** Optional PDF download link */
        pdfUrl?: string
    }

    /** Architecture diagram images — displayed in a labeled grid */
    diagrams: BlueprintImage[]

    /** Optional footer insight */
    footer?: {
        /** Terminal-style title for the footer (e.g. "architecture_summary.log") */
        title: string
        /** Label prefix (e.g. "INSIGHT:") */
        label: string
        /** The main insight text */
        text: string
        /** A phrase within text to highlight */
        highlight?: string
    }
}
