/**
 * Peer testimonials — sourced from Peer_Testimonals_Anuja.pdf.
 * Named, real endorsements from Cloud Software Group colleagues (product, engineering,
 * data science, design, customer-facing) plus two early-career founders.
 * Quotes here are faithful excerpts; the full unedited letters live in the PDF.
 *
 * `pull` is a short, punchy one-liner (≤~9 words) drawn from the full quote — shown
 * on the marquee cards; clicking a card opens the full `quote`.
 */

export interface Testimonial {
    id: string
    name: string
    role: string
    pull: string
    quote: string
    source: 'csg' | 'early-career'
}

export const TESTIMONIALS: Testimonial[] = [
    {
        id: 'vijay-raman',
        name: 'Vijay Raman',
        role: 'VP of Product Management',
        pull: 'A rare combination of strategy and design intuition.',
        quote: 'She brings a rare combination of strategic thinking, design intuition, and the ability to work seamlessly across product, engineering, and business teams. Any team would be lucky to have her.',
        source: 'csg',
    },
    {
        id: 'dave-pfeiffer',
        name: 'Dave Pfeiffer',
        role: 'Director of Design',
        pull: 'Fearless — takes on hard problems under tight timelines.',
        quote: 'She approaches her work with a fearless attitude and is never afraid to explore new ideas or directions. Anuja is willing to take on difficult problems and push for creative solutions, even under tight timelines.',
        source: 'csg',
    },
    {
        id: 'marcus-horbach',
        name: 'Marcus Horbach, Ph.D.',
        role: 'Principal Data Scientist',
        pull: 'Striking clarity in spite of deep ML complexity.',
        quote: 'The clarity of her designs, in spite of the underlying data science and machine learning complexity, is impressive. Her design solutions are rooted in a deep understanding of the purpose of the product.',
        source: 'csg',
    },
    {
        id: 'aniket-awchare',
        name: 'Aniket Awchare',
        role: 'Sr. Product Manager',
        pull: 'Turns intricate workflows into elegant, user-centric design.',
        quote: 'Anuja demonstrated exceptional ability to understand intricate workflows and translate them into elegant, user-centric designs that elevated the product’s usability and visual appeal. An invaluable contributor to any design-led team.',
        source: 'csg',
    },
    {
        id: 'yingchun-chen',
        name: 'Yingchun Chen',
        role: 'Principal System Software Engineer',
        pull: 'Grasped a highly intricate system — fast.',
        quote: 'She impressed everyone with how quickly she grasped all aspects of a highly intricate system and translated it into a clear, modern, user-centered design. The kind of UX leader any team would be lucky to have.',
        source: 'csg',
    },
    {
        id: 'karishma-khadge',
        name: 'Karishma Khadge',
        role: 'Sr. Product Manager',
        pull: 'Her workshops became the basis for key product decisions.',
        quote: 'Her design thinking workshops and prototype walkthroughs often became the foundation for key product decisions, driving clarity and alignment across cross-functional teams.',
        source: 'csg',
    },
    {
        id: 'anita-george',
        name: 'Anita George',
        role: 'Principal Account Technology Strategist',
        pull: 'Anticipating the user’s next move — next-level UI.',
        quote: 'Anticipating the next move of the user, that is next level UI! Her design was clean, intuitive, and clearly addressed the needs of users across different skill levels.',
        source: 'csg',
    },
    {
        id: 'shay-bagwell',
        name: 'Shay Bagwell',
        role: 'Lead Customer Marketing Manager · ibi',
        pull: 'A collaborative teammate and strong user-research advocate.',
        quote: 'I recommend Anuja for any team needing a qualified UI/UX team member. I worked with her on a couple of projects where her design was impactful. She is a collaborative teammate, strong advocate for user research and great designer. Any team would be lucky to have her.',
        source: 'csg',
    },
    {
        id: 'radhika-tekumalla',
        name: 'Radhika Tekumalla',
        role: 'Founder · Kedazzle (EdTech)',
        pull: 'She “just gets it” — designs our users loved.',
        quote: "Smart and very attuned to user needs, she 'just gets it' and developed intuitive designs that were very well received by our end users. Dedicated, thoughtful, and highly creative — she'd be an asset to any team.",
        source: 'early-career',
    },
    {
        id: 'vikram-patel',
        name: 'Vikram Patel',
        role: 'CEO & Co-founder · 9P Studio',
        pull: 'By the time she left, she thought in systems.',
        quote: "She joined us at 18, fresh off learning Photoshop — she didn't know what 'UX' was yet, but she had intensity, discipline, and raw talent you can't teach. By the time she left, she was thinking in systems, trusted with high-stakes decisions, operating far beyond her years — ready for a much bigger stage.",
        source: 'early-career',
    },
]
