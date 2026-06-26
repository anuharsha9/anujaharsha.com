/**
 * Life tab content — single source of truth for "Direction D" layout.
 * Pulls dated milestones from LifeContextStrip and combines with photos + same-time pairs.
 */

import {
    Bot, Mountain, GraduationCap, Award, Baby, MapPin, Heart, Palette, type LucideIcon,
} from 'lucide-react'

export interface LifeMilestone {
    title: string
    subtitle: string
    year: string
    icon: LucideIcon
}

/* The full unified set of life moments (from LifeContextStrip, deduped — SLC stay merged). */
export const ALL_MILESTONES: LifeMilestone[] = [
    { title: 'High School Graduation', subtitle: 'Hyderabad',                year: '2012',        icon: GraduationCap },
    { title: 'BA in Animation & VFX',  subtitle: 'Enrolled',                 year: 'Jun 2012',    icon: Palette },
    { title: 'Got Married',            subtitle: 'New Chapter',              year: 'Aug 2016',    icon: Heart },
    { title: "Bachelor's in English",  subtitle: 'Literature',               year: 'Jan 2017',    icon: GraduationCap },
    { title: 'Moved to Boston',        subtitle: 'The American Dream',       year: 'Mar 2017',    icon: MapPin },
    { title: 'Moved to Denver',        subtitle: 'Colorado',                 year: 'Feb 2019',    icon: Mountain },
    { title: 'Moved to Salt Lake City',subtitle: 'Home base since',          year: 'Aug 2019',    icon: Mountain },
    { title: 'HCI Certificate',        subtitle: 'Georgia Tech',             year: 'Jan 2021',    icon: Award },
    { title: 'First Child',            subtitle: 'Becoming a mother',        year: '2021',        icon: Baby },
    { title: 'MITx Pro Certificate',   subtitle: 'PD for AI and ML',         year: 'Apr 2024',    icon: Award },
    { title: 'Masters in English',     subtitle: 'Literature & Critical Theory', year: '2024–25', icon: GraduationCap },
    { title: 'Second Child',           subtitle: 'The greatest production release', year: 'Sep 2024', icon: Baby },
    { title: 'Vibe Coding · AI',       subtitle: 'Built this portfolio',     year: 'Nov 2025',    icon: Bot },
]

/* Photos used in the "What I'm holding now" room and the "Makes" galleries. */
export const FAMILY_PHOTO = { src: '/images/life/family.jpeg', alt: 'Anuja with family' }

export interface MakeGallery {
    id: string
    label: string
    subtitle: string
    icon: LucideIcon
    cover: string
    images: string[]
}

export const MAKES_GALLERIES: MakeGallery[] = [
    {
        id: 'painting', label: 'Paintings', subtitle: 'Canvas work', icon: Palette,
        cover: '/images/life/Painting1.jpg',
        images: ['/images/life/Painting1.jpg'],
    },
    {
        id: 'baking', label: 'Baking', subtitle: 'Pink Cake Patisserie', icon: Heart,
        cover: '/images/life/Bake4.jpg',
        images: ['/images/life/Bake4.jpg'],
    },
    {
        id: 'cooking', label: 'Cooking', subtitle: 'Food as expression', icon: Heart,
        cover: '/images/life/Food1.jpeg',
        images: ['/images/life/Food1.jpeg', '/images/life/Food3.jpeg'],
    },
    {
        id: 'graphic', label: 'Graphic Design', subtitle: 'Before product — print', icon: Palette,
        cover: '/images/archive/graphic-design/graphic design portfolio1.png',
        images: Array.from({ length: 13 }, (_, i) => `/images/archive/graphic-design/graphic design portfolio${i + 1}.png`),
    },
]

/* "Same time" hero pairs — 4 hand-picked simultaneity stories.
 * Each pair has a career side and a life side, anchored to a year/range.
 * (My picks while Anuja was at lunch — easily edited if she wants different ones.) */
export interface SameTimePair {
    year: string
    title: string
    career: { title: string; description: string; icon: LucideIcon }
    life:   { title: string; description: string; icon: LucideIcon }
}

export const SAME_TIME_PAIRS: SameTimePair[] = [
    {
        year: '2016 — 17',
        title: 'The American Dream',
        career: {
            title: 'Last year in India · agency + freelance',
            description: 'Closing the chapter on early Indian agency work — branding, mobile, prototyping for startups.',
            icon: Palette,
        },
        life: {
            title: 'Married · finished Bachelor’s · moved to Boston',
            description: 'Aug 2016 wedding. Jan 2017 Bachelor’s in English. Mar 2017 moved to the U.S. Three life events in seven months.',
            icon: Heart,
        },
    },
    {
        year: '2021',
        title: 'Becoming a mother, becoming a senior IC',
        career: {
            title: 'HCI Certificate · Georgia Tech',
            description: 'Formal HCI training alongside applied enterprise work.',
            icon: Award,
        },
        life: {
            title: 'First child',
            description: 'Becoming a mother for the first time. The world reorganizing itself around a new center.',
            icon: Baby,
        },
    },
    {
        year: '2024',
        title: 'Peak overload',
        career: {
            title: 'Shipped ML Functions · Cloud Software Group',
            description: 'AI/ML training UX for non-technical users. MITx Pro Cert in Product Design for AI/ML (Apr 2024) backing the craft.',
            icon: Bot,
        },
        life: {
            title: 'Second child · Masters in English (Literature)',
            description: 'Sep 2024 second baby. 2024–25 finished a Master’s in English Literature & Critical Theory. The most overloaded year, on both sides.',
            icon: GraduationCap,
        },
    },
    {
        year: '2025',
        title: 'The year of both, at full intensity',
        career: {
            title: 'Shipped IQ Plugin · vibe-coded this portfolio',
            description: 'Unified BI insights with natural-language querying. Then built this site itself with AI orchestration (Nov 2025).',
            icon: Bot,
        },
        life: {
            title: 'Two small kids · the quiet hours',
            description: 'A second year of mothering two. Painting on Sunday afternoons. Reading literature at night. The quiet hours that fund the loud ones.',
            icon: Heart,
        },
    },
]
