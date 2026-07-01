/**
 * Peer testimonials — sourced from Peer-Testimonials-Anuja.pdf (public/assets).
 * Named, real endorsements from Cloud Software Group colleagues (product, engineering,
 * data science, design, customer-facing) plus two early-career founders.
 *
 * Three tiers of text:
 *  - `pull`  — short punchy one-liner (≤~9 words) shown on the marquee cards.
 *  - `quote` — a faithful mid-length excerpt (fallback when there’s no full letter).
 *  - `full`  — the complete, unedited letter from the PDF, shown in the lightbox on click.
 *              Ligature artifacts from PDF extraction are cleaned up (workflows, fluency…).
 *              Marcus = the best of his letter in his words (not the full formal letter).
 *              Shay has no clean full letter in the PDF (the source entry duplicates
 *              Yingchun’s text), so it falls back to `quote`.
 */

export interface Testimonial {
    id: string
    name: string
    role: string
    pull: string
    quote: string
    /** The complete letter, shown in the lightbox. Falls back to `quote` when absent. */
    full?: string
    source: 'csg' | 'early-career'
}

export const TESTIMONIALS: Testimonial[] = [
    {
        id: 'vijay-raman',
        name: 'Vijay Raman',
        role: 'VP of Product Management',
        pull: 'A rare combination of strategy and design intuition.',
        quote: 'She brings a rare combination of strategic thinking, design intuition, and the ability to work seamlessly across product, engineering, and business teams. Any team would be lucky to have her.',
        full: `I had the pleasure of working with Anuja at Cloud Software Group, where she made a significant impact modernizing UX across our legacy enterprise products. She brings a rare combination of strategic thinking, design intuition, and the ability to work seamlessly across product, engineering, and business teams.

What sets her apart is her empathy and cross-functional fluency — she listens deeply, challenges with purpose, and quickly earned the trust of stakeholders at all levels. In short, Anuja is a standout design leader who brings clarity, collaboration, and strategic impact to every project. Any team would be lucky to have her.`,
        source: 'csg',
    },
    {
        id: 'dave-pfeiffer',
        name: 'Dave Pfeiffer',
        role: 'Director of Design',
        pull: 'Fearless — takes on hard problems under tight timelines.',
        quote: 'She approaches her work with a fearless attitude and is never afraid to explore new ideas or directions. Anuja is willing to take on difficult problems and push for creative solutions, even under tight timelines.',
        full: `I had the opportunity to work with Anuja, a senior UX designer who brings energy and determination to tackling complex design challenges. She approaches her work with a fearless attitude and is never afraid to explore new ideas or directions. Anuja is willing to take on difficult problems and push for creative solutions, even under tight timelines. Her enthusiasm for design and willingness to engage with stakeholders made her a valuable part of the team.`,
        source: 'csg',
    },
    {
        id: 'marcus-horbach',
        name: 'Marcus Horbach, Ph.D.',
        role: 'Principal Data Scientist',
        pull: 'Striking clarity in spite of deep ML complexity.',
        quote: 'The clarity of her designs, in spite of the underlying data science and machine learning complexity, is impressive. Her design solutions are rooted in a deep understanding of the purpose of the product.',
        full: `The clarity of her designs, in spite of the underlying data science and machine learning complexity, is impressive and has greatly contributed to the success of our products.

The key characteristic of her work is that her design solutions are rooted in a deep understanding of the purpose of the product. From that basis, she skillfully navigates the technical UI-design complexities, always leading to clean designs and to products that are a genuine joy to use.

Beyond her technical excellence, Anuja is a collaborative, thoughtful, and inspiring team member — always willing to mentor others, share her knowledge, and push the boundaries of what’s possible in AI-powered UX.`,
        source: 'csg',
    },
    {
        id: 'aniket-awchare',
        name: 'Aniket Awchare',
        role: 'Sr. Product Manager',
        pull: 'Turns intricate workflows into elegant, user-centric design.',
        quote: 'Anuja demonstrated exceptional ability to understand intricate workflows and translate them into elegant, user-centric designs that elevated the product’s usability and visual appeal. An invaluable contributor to any design-led team.',
        full: `I had the privilege of collaborating with Anuja on a major initiative to modernize the UI of a new offering for a business intelligence platform. From the outset, Anuja demonstrated exceptional ability to understand intricate workflows and translate them into elegant, user-centric designs that elevated the product’s usability and visual appeal. Her strong command of design principles, attention to detail, and clear communication made collaboration seamless and productive. Anuja’s professionalism, creativity, and dedication to delivering intuitive user experiences make her an invaluable contributor to any design-led team or organization.`,
        source: 'csg',
    },
    {
        id: 'yingchun-chen',
        name: 'Yingchun Chen',
        role: 'Principal System Software Engineer',
        pull: 'Grasped a highly intricate system — fast.',
        quote: 'She impressed everyone with how quickly she grasped all aspects of a highly intricate system and translated it into a clear, modern, user-centered design. The kind of UX leader any team would be lucky to have.',
        full: `I had the pleasure of working closely with Anuja Harsha Nimmagadda on a project to modernize the UI of a complex business intelligence product using the latest HTML standards. From the start, she impressed everyone with how quickly she grasped all aspects of a highly intricate system and translated that understanding into a clear, modern, and user-centered design. Beyond her technical and design talent, she’s a collaborative, thoughtful teammate who makes every project better. I truly enjoyed working with her. She’s the kind of UX leader any team would be lucky to have.`,
        source: 'csg',
    },
    {
        id: 'karishma-khadge',
        name: 'Karishma Khadge',
        role: 'Sr. Product Manager',
        pull: 'Her workshops became the basis for key product decisions.',
        quote: 'Her design thinking workshops and prototype walkthroughs often became the foundation for key product decisions, driving clarity and alignment across cross-functional teams.',
        full: `I had the pleasure of working with Anuja at Cloud Software Group, where she led UX design initiatives with remarkable creativity, empathy, and precision — consistently translating complex product requirements into intuitive, visually engaging experiences.

Her design thinking workshops and prototype walkthroughs often became the foundation for key product decisions, driving clarity and alignment across cross-functional teams. I’d highly recommend her to any organization looking for a strategic, detail-oriented, and passionate UX leader who can shape exceptional digital experiences.`,
        source: 'csg',
    },
    {
        id: 'anita-george',
        name: 'Anita George',
        role: 'Principal Account Technology Strategist',
        pull: 'Anticipating the user’s next move — next-level UI.',
        quote: 'Anticipating the next move of the user, that is next level UI! Her design was clean, intuitive, and clearly addressed the needs of users across different skill levels.',
        full: `I first worked with Anuja during a User Acceptance Test of a prototype for model building and testing within our enterprise BI platform. She observed me navigating the screen, asking targeted questions about my workflow and tracking my visual focus.

I was highly impressed. Her design was clean, intuitive, and clearly addressed the needs of users across different skill levels. Anuja has a remarkable ability to bridge the gap between core product features and an enhanced user experience. Anticipating the next move of the user — that is next level UI!`,
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
        quote: "Smart and very attuned to user needs, she ‘just gets it’ and developed intuitive designs that were very well received by our end users. Dedicated, thoughtful, and highly creative — she’d be an asset to any team.",
        full: `Anuja was my EdTech startup KeDazzle’s Lead UX Designer, and I was super impressed by her design thinking and user empathy that led her to develop high-quality mobile app and website designs. Smart and very attuned to user needs, she ‘just gets it’ and developed intuitive designs that were very well received by our end users. Dedicated, thoughtful, and highly creative — she’d be an asset to any team.`,
        source: 'early-career',
    },
    {
        id: 'vikram-patel',
        name: 'Vikram Patel',
        role: 'CEO & Co-founder · 9P Studio',
        pull: 'By the time she left, she thought in systems.',
        quote: "She joined us at 18, fresh off learning Photoshop — she didn’t know what 'UX' was yet, but she had intensity, discipline, and raw talent you can’t teach. By the time she left, she was thinking in systems, trusted with high-stakes decisions, operating far beyond her years — ready for a much bigger stage.",
        full: `Anuja joined us as an 18-year-old intern who had just learned Photoshop. She didn’t know what 'UX' was yet — but she had intensity, discipline, and raw talent you can’t teach.

We ran a scrappy startup with no layers and no managers. Within months she became the designer we relied on for everything — UI, wireframes, branding, game design, motion graphics, client presentations. If it needed design, Anuja owned it.

By the time she left, she wasn’t junior anymore. She was thinking in systems, trusted with high-stakes decisions, operating far beyond her years — ready for a much bigger stage.`,
        source: 'early-career',
    },
]
