/**
 * Peer testimonials — sourced from Peer_Testimonals_Anuja.pdf.
 * Named, real endorsements from Cloud Software Group colleagues (product, engineering,
 * data science, design, customer-facing) plus two early-career founders.
 * Quotes here are faithful excerpts; the full unedited letters live in the PDF.
 *
 * Ordered by strength — the first 3 show by default in the wall; the rest reveal on "show all".
 */

export interface Testimonial {
    id: string
    name: string
    role: string
    quote: string
    source: 'csg' | 'early-career'
}

export const TESTIMONIALS: Testimonial[] = [
    {
        id: 'vijay-raman',
        name: 'Vijay Raman',
        role: 'VP of Product Management',
        quote: 'She brings a rare combination of strategic thinking, design intuition, and the ability to work seamlessly across product, engineering, and business teams. Any team would be lucky to have her.',
        source: 'csg',
    },
    {
        id: 'dave-pfeiffer',
        name: 'Dave Pfeiffer',
        role: 'Director of Design',
        quote: 'She approaches her work with a fearless attitude and is never afraid to explore new ideas or directions. Anuja is willing to take on difficult problems and push for creative solutions, even under tight timelines.',
        source: 'csg',
    },
    {
        id: 'marcus-horbach',
        name: 'Marcus Horbach, Ph.D.',
        role: 'Principal Data Scientist',
        quote: 'The clarity of her designs, in spite of the underlying data science and machine learning complexity, is impressive. Her design solutions are rooted in a deep understanding of the purpose of the product.',
        source: 'csg',
    },
    {
        id: 'aniket-awchare',
        name: 'Aniket Awchare',
        role: 'Sr. Product Manager',
        quote: 'Anuja demonstrated exceptional ability to understand intricate workflows and translate them into elegant, user-centric designs that elevated the product’s usability and visual appeal. An invaluable contributor to any design-led team.',
        source: 'csg',
    },
    {
        id: 'yingchun-chen',
        name: 'Yingchun Chen',
        role: 'Principal System Software Engineer',
        quote: 'She impressed everyone with how quickly she grasped all aspects of a highly intricate system and translated it into a clear, modern, user-centered design. The kind of UX leader any team would be lucky to have.',
        source: 'csg',
    },
    {
        id: 'karishma-khadge',
        name: 'Karishma Khadge',
        role: 'Sr. Product Manager',
        quote: 'Her design thinking workshops and prototype walkthroughs often became the foundation for key product decisions, driving clarity and alignment across cross-functional teams.',
        source: 'csg',
    },
    {
        id: 'anita-george',
        name: 'Anita George',
        role: 'Principal Account Technology Strategist',
        quote: 'Anticipating the next move of the user, that is next level UI! Her design was clean, intuitive, and clearly addressed the needs of users across different skill levels.',
        source: 'csg',
    },
    {
        id: 'radhika-tekumalla',
        name: 'Radhika Tekumalla',
        role: 'Founder · Kedazzle (EdTech)',
        quote: "Smart and very attuned to user needs, she 'just gets it' and developed intuitive designs that were very well received by our end users. Dedicated, thoughtful, and highly creative — she'd be an asset to any team.",
        source: 'early-career',
    },
    {
        id: 'vikram-patel',
        name: 'Vikram Patel',
        role: 'CEO & Co-founder · 9P Studio',
        quote: "She joined us at 18, fresh off learning Photoshop — she didn't know what 'UX' was yet, but she had intensity, discipline, and raw talent you can't teach. By the time she left, she was thinking in systems, trusted with high-stakes decisions, operating far beyond her years — ready for a much bigger stage.",
        source: 'early-career',
    },
    // 10th endorser — Shay Bagwell, Lead Customer Marketing Manager — held out: her testimonial
    // text in Peer_Testimonals.pdf is a copy-paste of Yingchun Chen's words (a source error).
    // Add once her real quote is provided.
]
