'use client'

/**
 * Native, on-brand résumé render. The content is extracted from the canonical
 * print résumé (public/tailored-resumes/resume-universal-2026.html) and styled
 * to match the portfolio's design language (cinematic dark, teal accents, mono
 * section labels) instead of embedding a fragile PDF. The PDF download in the
 * lightbox header still serves the real print-ready file — this render is the
 * "for show" version a visitor reads in place.
 *
 * If the résumé content changes, update both this and the source HTML/PDF.
 */

const CONTACT = [
    { label: 'anujanimmagadda@gmail.com', href: 'mailto:anujanimmagadda@gmail.com', accent: false },
    { label: '+1 781-354-7394', href: 'tel:+17813547394', accent: false },
    { label: 'anujaharsha.com', href: 'https://www.anujaharsha.com', accent: true },
    { label: 'linkedin.com/in/anu159', href: 'https://www.linkedin.com/in/anu159', accent: true },
]

const SUMMARY = [
    'Strategic design leader, high-agency Product Owner, and de facto organizational unblocker with 13+ years of experience transforming highly ambiguous technical constraints into intuitive enterprise software. I operate as a force multiplier between engineering, product management, and design, specializing in zero-to-one product execution, complex legacy modernization, and the data workflow problems most designers avoid.',
    'Leveraging a zero-ego builder mentality and advanced AI-agent prompting, I act as an empathy bridge to engineering—decoding backend constraints to write functional specs, eliminate structural friction, and ship runtime-feasible, production-ready UI.',
]

const SKILLS = [
    { label: 'Product Strategy', value: 'Systems Architecture, Zero-to-One Product Execution, Extreme Ambiguity Resolution, Legacy System Modernization, Cross-Functional Team Leadership, Business Intelligence (BI) / Data Analytics.' },
    { label: 'Domain Expertise', value: 'B2B Enterprise SaaS, Machine Learning / Artificial Intelligence Infrastructure, Data Analytics Pipelines, Cybersecurity UX, Fintech Compliance.' },
    { label: 'AI-Native Prototyping', value: 'Agentic AI Workflows (Cursor, Claude Code, Google Antigravity), Rapid Prototyping, Context-Aware Prompting, Next.js, React, Tailwind CSS.' },
]

interface Bullet { lead: string; rest: string }
interface Role { title: string; date: string; company?: string; intro?: string; bullets: Bullet[] }

const EXPERIENCE: Role[] = [
    {
        title: 'Senior Product Designer',
        date: 'August 2022 – November 2025',
        company: 'Cloud Software Group (ibi WebFOCUS)',
        intro: 'Commanded the cross-organizational product vision for WebFOCUS, a mission-critical data platform within a $175M P&L enterprise business unit. By architecting a consolidated analytics platform and driving deep product modernizations, I directly enabled enterprise deal expansion—boosting competitive win rates and cross-sell opportunities across Fortune 500 accounts.',
        bullets: [
            { lead: 'High-Stakes Legacy Modernization:', rest: 'Led the execution of a 2025 Dresner Award-winning modernization for an undocumented, 50-year-old scheduling engine. Re-architected workflows processing 20M+ weekly jobs, effectively modernizing 50% of the complex B2B platform.' },
            { lead: 'Systems Architecture & Cultural Transformation:', rest: 'Acted as the absolute connective tissue across 3 global time zones, dedicating significant bandwidth to aligning 4 PMs, a 30+ person engineering org, and distributed QA. Transitioned engineering’s perception of UX from "decoration" to a core strategic pillar, establishing deep trust with veteran engineers to secure buy-in for a cloud-native overhaul.' },
            { lead: 'Enterprise AI & ML Strategy:', rest: 'Architected the unified B2B Data Science and Machine Learning Hub (IQ Plugin), bringing order to system fragmentation by consolidating three isolated workflows (NLQ, Insights, ML) into a single unified entry point.' },
            { lead: 'Technical Feasibility & Engineering Velocity:', rest: 'Partnered directly with veteran Principal Data Scientists to conduct rigorous technical discovery on predictive models. Translated complex backend logic into crystal-clear functional specs and UI workflows, achieving 100% SME discoverability and driving a 25% increase in Natural Language Query adoption.' },
        ],
    },
    {
        title: 'Fractional Product Design Leader | Principal Consultant',
        date: 'April 2017 – July 2022',
        bullets: [
            { lead: 'Zero-to-One Product Architecture:', rest: 'Retained by executive teams as a fractional design leader to direct end-to-end product architecture for early-stage B2B and SaaS startups (OneView, Kedazzle). Navigated absolute ambiguity to establish scalable design-to-engineering workflows from the ground up.' },
            { lead: 'Systemic Friction Resolution:', rest: 'Acted as a specialized consultant to resolve broken development pipelines. Translated complex business requirements into high-fidelity specifications and production-ready CSS, permanently reducing engineering handover cycles from three rounds of friction down to one.' },
            { lead: 'Rapid Domain Acquisition & Client Partnership:', rest: 'Parachuted into highly complex, specialized client environments to deliver immediate organizational ROI. Acted as the strategic client liaison to untangle ambiguous demands, architecting everything from a Fintech Exception Management dashboard to cross-platform IoT cybersecurity controls.' },
        ],
    },
    {
        title: 'Enterprise Product Designer',
        date: 'November 2016 – March 2017',
        company: 'f1Studioz',
        bullets: [
            { lead: 'Accelerated Complex Onboarding:', rest: 'Parachuted into complex, in-flight enterprise projects to architect data-heavy B2B dashboards and functional workflows under aggressive, client-driven timelines.' },
            { lead: 'Multi-Platform Systems Design:', rest: 'Led the end-to-end architectural redesign of a multi-platform enterprise facility management system (Web, Mobile, Tablet), establishing scalable patterns for seamless cross-device synchronization.' },
            { lead: 'Client-Facing Leadership:', rest: 'Acted as the primary strategic liaison between enterprise clients, product managers, and engineering teams. Translated highly ambiguous client demands into strict functional requirements to protect engineering scopes and ensure rapid delivery.' },
        ],
    },
    {
        title: 'Founding Product Designer',
        date: 'August 2012 – November 2016',
        company: '9P Studioz',
        bullets: [
            { lead: 'Foundational Design Leadership:', rest: 'Operated as the solo founding designer for a high-velocity tech incubator, managing end-to-end UX architecture and startup demands across multiple concurrent ventures.' },
            { lead: 'High-Velocity Execution (Time-to-Value):', rest: 'Directed the design-to-engineering pipeline to successfully ship 35+ digital products across iOS and Android. Forged the early operational muscle to balance rapid agile execution with the rigorous technical demands of scaling platforms.' },
            { lead: 'Product Strategy & Growth:', rest: 'Designed retention-loop mechanics and iterated on session analytics to achieve high-impact launches, collaborating directly with engineering leaders under strict startup constraints.' },
        ],
    },
]

const AI_INTRO = 'AI as an Empathy Bridge: Actively utilizing AI agents (Cursor, Claude) and context-aware prompting to build high-fidelity, functional prototypes in React and Next.js. I use AI as a force multiplier to translate design vision into engineering reality, handing developers runtime-feasible UI to eliminate architectural friction.'
const AI_BULLETS: Bullet[] = [
    { lead: 'Pathwise (Early 2026):', rest: 'Architected and deployed an AI-native dashboard prototype for tracking college application materials and education ROI, proving complex data-relationship models through functional, testable interfaces.' },
    { lead: 'WordU (January 2026):', rest: 'Developed a logic-driven interactive word game for iOS and web, executing end-to-end frontend deployment to rapidly sharpen code-based interaction prototyping speeds.' },
    { lead: 'Custom Code-Based Architecture (November 2025):', rest: 'Engineered a fully custom interactive platform utilizing Next.js, React, and agentic AI (Cursor, Google Antigravity). Designed to bypass static screens entirely, delivering a living, testable UI environment that proves high-fidelity visual interactions and complex front-end deployment.' },
]

const COMMUNITY = [
    { heading: 'Community Leadership', items: [
        { lead: 'Active Mentor on ADPList:', rest: 'Mentoring designers on career growth, portfolio building, and enterprise UX.' },
        { lead: 'Design and Leadership Writer:', rest: 'Active contributor on Medium, sharing insights on design systems and leadership.' },
    ] },
    { heading: 'Industry Contributions', items: [
        { lead: 'IBI Community Articles:', rest: 'Authored two technical articles for the Cloud Software Group community on The Secret Behind Better BI and Enhancing UX in WebFOCUS DSML.' },
    ] },
]

const EDUCATION = [
    { school: 'MIT xPRO', degree: 'Professional Certificate: Designing and Building AI Products and Services' },
    { school: 'Georgia Institute of Technology', degree: 'Professional Certificate in Human-Computer Interaction' },
    { school: 'Dr. B.R. Ambedkar Open University', degree: 'Master of Arts in English Literature' },
    { school: 'SNDT Women’s University, Mumbai', degree: 'Bachelor of Arts in English Literature' },
    { school: 'Mahatma Gandhi University', degree: 'Bachelor of Arts in VFX & Animation' },
]

const SECTION_LABEL = 'mb-4 border-b border-white/[0.08] pb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent-teal)]'

function BulletList({ bullets }: { bullets: Bullet[] }) {
    return (
        <ul className="space-y-2.5">
            {bullets.map((b, i) => (
                <li key={i} className="relative pl-5 text-[13.5px] leading-relaxed text-zinc-400">
                    <span className="absolute left-0 top-[0.55em] h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[var(--accent-teal)]/70" />
                    <span className="font-semibold text-zinc-200">{b.lead}</span> {b.rest}
                </li>
            ))}
        </ul>
    )
}

export default function ResumeDocument() {
    return (
        <article className="mx-auto max-w-3xl px-6 py-10 md:px-10 md:py-14 text-zinc-300">
            {/* Header */}
            <header className="border-b border-white/10 pb-6">
                <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl">
                    Anuja Harsha Nimmagadda
                </h2>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent-teal)] md:text-sm">
                    Staff Product Designer · Product Strategist
                </p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px]">
                    {CONTACT.map(c => (
                        <a
                            key={c.href}
                            href={c.href}
                            target={c.href.startsWith('http') ? '_blank' : undefined}
                            rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className={`transition-colors hover:text-white ${c.accent ? 'text-[var(--accent-teal-bright)]' : 'text-zinc-400'}`}
                        >
                            {c.label}
                        </a>
                    ))}
                </div>
            </header>

            {/* Summary */}
            <section className="mt-8">
                <h3 className={SECTION_LABEL}>Summary</h3>
                <div className="space-y-3">
                    {SUMMARY.map((p, i) => (
                        <p key={i} className="text-sm leading-relaxed text-zinc-300">{p}</p>
                    ))}
                </div>
            </section>

            {/* Skills */}
            <section className="mt-8">
                <h3 className={SECTION_LABEL}>Technical & Design Skills</h3>
                <dl className="space-y-3">
                    {SKILLS.map(s => (
                        <div key={s.label} className="grid grid-cols-1 gap-1 sm:grid-cols-[170px_1fr] sm:gap-4">
                            <dt className="font-mono text-[11px] uppercase tracking-wider text-zinc-200">{s.label}</dt>
                            <dd className="text-[13.5px] leading-relaxed text-zinc-400">{s.value}</dd>
                        </div>
                    ))}
                </dl>
            </section>

            {/* Experience */}
            <section className="mt-8">
                <h3 className={SECTION_LABEL}>Professional Experience</h3>
                <div className="space-y-7">
                    {EXPERIENCE.map((role, i) => (
                        <div key={i}>
                            <div className="flex flex-col justify-between gap-0.5 sm:flex-row sm:items-baseline sm:gap-4">
                                <h4 className="text-[15px] font-bold text-white">{role.title}</h4>
                                <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-zinc-500">{role.date}</span>
                            </div>
                            {role.company && (
                                <p className="mt-0.5 text-[13px] font-semibold text-[var(--accent-teal-bright)]">{role.company}</p>
                            )}
                            {role.intro && (
                                <p className="mt-2 text-[13.5px] leading-relaxed text-zinc-400">{role.intro}</p>
                            )}
                            <div className="mt-3">
                                <BulletList bullets={role.bullets} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* AI-Native Prototyping */}
            <section className="mt-8">
                <h3 className={SECTION_LABEL}>AI-Native Prototyping & Technical Empathy</h3>
                <p className="mb-3 text-[13.5px] leading-relaxed text-zinc-300">{AI_INTRO}</p>
                <BulletList bullets={AI_BULLETS} />
            </section>

            {/* Publications & Community */}
            <section className="mt-8">
                <h3 className={SECTION_LABEL}>Publications & Community</h3>
                <div className="space-y-5">
                    {COMMUNITY.map(group => (
                        <div key={group.heading}>
                            <p className="mb-2 text-[13px] font-semibold text-zinc-200">{group.heading}</p>
                            <BulletList bullets={group.items} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Education */}
            <section className="mt-8">
                <h3 className={SECTION_LABEL}>Education & Certifications</h3>
                <div className="space-y-3">
                    {EDUCATION.map(e => (
                        <div key={e.school} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                            <span className="text-[14px] font-bold text-white">{e.school}</span>
                            <span className="text-[13px] italic text-zinc-400">{e.degree}</span>
                        </div>
                    ))}
                </div>
            </section>
        </article>
    )
}
