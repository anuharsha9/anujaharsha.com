import Link from 'next/link'
import Button from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import {
    ChairMark,
    OriginTimeline,
    AdaptiveLoop,
    AuroraBand,
    RouteFlex,
    FiveProducts,
} from '@/components/philosophy/PhilosophyVisuals'

/* ── Small static typography helpers (no animation, clean scroll) ── */
function Eyebrow({ children }: { children: React.ReactNode }) {
    return <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.35em] text-[var(--accent-teal)]/80">{children}</p>
}
function H2({ children }: { children: React.ReactNode }) {
    return <h2 className="text-[1.65rem] font-bold leading-tight tracking-tight text-white md:text-4xl">{children}</h2>
}
function P({ children }: { children: React.ReactNode }) {
    return <p className="text-[1.05rem] leading-[1.75] text-zinc-300 md:text-lg">{children}</p>
}

/* A section = a quiet band in the single reading column. Visual is optional. */
function Section({ eyebrow, title, children }: { eyebrow?: string; title?: string; children: React.ReactNode }) {
    return (
        <section className="border-t border-white/[0.06] py-12 md:py-16">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && <H2>{title}</H2>}
            <div className="mt-6 space-y-5">{children}</div>
        </section>
    )
}

const LAWS = [
    ['Prominence = importance', 'The thing that matters most is unmistakably the biggest. Never make the user hunt for the headline.'],
    ['State before words', 'On-track / off-track, gain / loss, asset / debt is readable by color + sign + weight before you read the label.'],
    ['Fact ≠ forecast', 'A current balance looks settled and exact; a projection looks uncertain (range, lighter). A forecast must never masquerade as a fact.'],
    ['Actionable looks actionable', 'Tappable, editable, "ask" elements invite the action; static info stays quiet.'],
    ['One element, one job', 'No Swiss-army cards.'],
]

const AESTHETIC = [
    ['Northern lights (aurora)', 'Curtains of light that ripple — horizontal bands that drift and breathe. Subtle, alive, ethereal.'],
    ['Ocean waves', 'The movement pattern everywhere — slow, organic, continuous. Never abrupt.'],
    ['Dark, dim lighting', 'Not "dark mode for looks." Genuinely preferred — ocean at night, lit from below, barely there.'],
    ['Teal accent', 'The color of deep ocean + aurora. It is the system, not decoration.'],
]

const BELIEFS = [
    'Complexity isn’t the enemy. Illegible complexity is. The job is clarity, not removal.',
    'The best products come from solving a real problem you actually have — not from guessing at a market.',
    'Don’t build what already exists. Build what’s missing.',
    'Design that engineering can’t build isn’t good design. Feasibility is part of the craft.',
    'A small, surgical fix that cuts real cognitive load is worth as much as a big redesign.',
    'You earn the right to a strong opinion by understanding the system better than anyone expected you to.',
    'Never a loose end. Every path must resolve into a conclusive, satisfying, actionable next step — never a dangling question with no way forward.',
]

const HOW_I_WORK = [
    ['I befriend engineering and I listen. A lot.', 'I don’t throw designs over a wall. I get into the technical layer, learn the constraints, understand what’s actually buildable. Engineers trust me because I do the work to understand their world — and that trust is what gets good design shipped.'],
    ['I build the map when there isn’t one.', 'No docs? I’ll create them. No process? I’ll make one. I don’t wait for tickets or for someone to hand me clarity. (At one point my PM wrote the Jira tickets after seeing my mockups.)'],
    ['I back my design with evidence, not taste.', 'Instincts don’t mean anything if you can’t back them with logic. When I disagree with an engineer or a PM, I don’t pull rank — I make the case with user-comprehension logic, and we land on the better answer.'],
    ['Product comes first. Always. Zero ego.', 'I don’t think about myself when I’m working — I think about the product. I’ll vent privately when it’s hard, but it never touches the work.'],
    ['I build what I actually need.', 'Every product I’ve made on my own came from a real problem I had. Because I have the chops, they come out good enough that other people want them too. I’m not showing off — the impressive part is a side effect.'],
]

export default function PhilosophyPage() {
    return (
        <main className="relative min-h-screen">
            <article className="relative z-10 mx-auto w-full max-w-2xl px-5 pb-24 pt-28 md:px-6 md:pt-32">

                {/* Title block */}
                <header className="mt-10 md:mt-14">
                    <Eyebrow>Design Philosophy</Eyebrow>
                    <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl">
                        How I think,<br />design, and work.
                    </h1>
                    <p className="mt-6 text-lg leading-relaxed text-zinc-400 md:text-xl">
                        In my own words — built from my origin story, my craft, and my work.
                    </p>
                </header>

                {/* The one line */}
                <div className="mt-12 rounded-2xl border border-[var(--accent-teal)]/20 bg-[var(--accent-teal)]/[0.04] p-7 md:p-9">
                    <p className="text-xl font-light leading-relaxed text-zinc-100 md:text-2xl">
                        I make complex technical systems{' '}
                        <span className="font-medium text-[var(--accent-teal-bright)]">obvious</span> — as obvious as
                        knowing to sit in a chair — without dumbing them down. Everything else is in service of that.
                    </p>
                </div>

                {/* §1 Origin */}
                <Section eyebrow="Origin" title="I knew at 15">
                    <P>
                        I didn’t fall into design. I didn’t get bored of engineering at 25 and pivot. I knew at
                        15 and never looked back. A career-counseling workshop, one line on a board — <em>Interest +
                        Talent = Career</em> — and it hit me like a light bulb. A decade of art classes plus the kid who
                        was bizarrely good with computers. Art + computers = design. That was it.
                    </P>
                    <div className="py-4">
                        <OriginTimeline />
                    </div>
                    <P>
                        By 21 I had two bachelor’s degrees, four years of experience, a grade-4 violin diploma, and a
                        husband. I didn’t <em>find</em> design — I grew up with it. It became the backbone of who I
                        am, and maybe that’s why I’ve survived legacy systems, 40-year-old products, engineer-led
                        teams, ML workflows, startups, motherhood, and layoffs. There’s real power in that kind of
                        clarity. It becomes part of your spine.
                    </P>
                </Section>

                {/* §2 Identity */}
                <Section eyebrow="Identity" title="Who I actually am">
                    <P>
                        I’m a Senior Product Designer by title, but the real work is <strong className="font-semibold text-white">obsessing
                        over how humans experience things.</strong> I’m a user-experience specialist who happens to
                        carry a product-design title. Thirteen-plus years in, started at 16 — at this point UX is{' '}
                        <em>instinct</em>, not process. I feel when something’s wrong before I can name it.
                    </P>
                    <P>
                        I don’t just design — I <strong className="font-semibold text-white">build.</strong> Feel the
                        problem → design the solution → ship the code. I prototype in real code because the biggest risk
                        usually isn’t the visuals, it’s the logic. B2B enterprise is my home: data-heavy,
                        technical, the kind of product most designers find intimidating or boring. That’s exactly
                        where I do my best work.
                    </P>
                    <P>
                        My AI-era stance: in a world of AI, human experience matters <em>more</em>, not less — because AI
                        is built for humans. The more powerful the technology, the more the experience layer matters. AI
                        didn’t replace my judgment; it removed my one bottleneck — the raw hours of hand-coding
                        between an idea and shipped reality. The judgment was always mine; now it moves at the speed of my
                        thinking.
                    </P>
                </Section>

                {/* §3 Chair */}
                <Section eyebrow="The core idea" title="The Chair Philosophy">
                    <div className="flex justify-center py-4">
                        <ChairMark />
                    </div>
                    <blockquote className="border-l-2 border-[var(--accent-teal)]/50 pl-5 text-xl font-light italic leading-relaxed text-zinc-100 md:text-2xl">
                        When you look at a chair, the only thing that comes to mind is to sit on it.
                    </blockquote>
                    <P>
                        That’s it. The design is so good you don’t <em>think</em> about the design — you just do
                        the thing. No instructions, no onboarding, no tutorial. You look, you sit.
                    </P>
                    <P>
                        Everything in the world is either designed so well you don’t notice it (you just use it) or so
                        badly you can’t stop noticing (frustration). A door handle, a water bottle, an enterprise BI
                        tool — I judge them all the same way: <em>is it as obvious as knowing to sit in a chair?</em> The
                        whole point of making anything is to reach that obviousness. You get there by obsessing over how
                        humans experience things. That’s the job.
                    </P>
                </Section>

                {/* §4 The 5 Laws */}
                <Section eyebrow="The chair test, operational" title="The 5 Affordance Laws">
                    <P>
                        The chair test, turned into five laws you can name in a review (&ldquo;that fails law 3&rdquo;).
                        Bake them into the primitives so obviousness is structural and inherited for free — never
                        re-applied screen by screen.
                    </P>
                    <ol className="mt-2 space-y-4">
                        {LAWS.map(([t, d], i) => (
                            <li key={t} className="flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                                <span className="mt-0.5 font-mono text-lg leading-none text-[var(--accent-teal)]">0{i + 1}</span>
                                <span>
                                    <span className="block font-semibold text-white">{t}</span>
                                    <span className="mt-1 block text-[0.95rem] leading-relaxed text-zinc-400">{d}</span>
                                </span>
                            </li>
                        ))}
                    </ol>
                </Section>

                {/* §5 The pattern */}
                <Section eyebrow="My point of view" title="The pattern in everything I build">
                    <P>
                        When I look at my work — professional and personal — it’s all the same kind of thing:{' '}
                        <strong className="font-semibold text-white">adaptive systems that learn the user and help them
                        decide or improve.</strong> A scheduling engine made legible. An ML platform nobody could use,
                        turned into one they relied on. A natural-language layer over data so people could just{' '}
                        <em>ask</em>. And on my own time: a forecasting engine for my finances, an authorization system
                        for AI agents, a writing coach that learns my style, a cooking companion that learns how I cook.
                    </P>
                    <div className="py-6">
                        <AdaptiveLoop />
                    </div>
                    <P>
                        I didn’t plan that pattern — it’s how my brain works. I can’t build the boring
                        version of anything. The moment I touch a problem I’m asking &ldquo;how could this learn? how
                        could this adapt? how could this make the person better at the thing?&rdquo; An archive for my
                        articles became an AI writing coach because I literally can’t help it.
                    </P>
                    <p className="text-xl font-light leading-relaxed text-[var(--accent-teal-bright)] md:text-2xl">
                        Software should learn you and extend your thinking.
                    </p>
                </Section>

                {/* §6 Drawn to */}
                <Section eyebrow="What pulls me" title="What I’m drawn to">
                    <P>
                        I run toward the hard problem nobody wants to touch — the 40-year-old black box with no
                        documentation, the powerful system nobody can actually use, the mess everyone’s avoiding. I
                        get genuinely obsessed. The less I can find, the more I want to find. I’ll build the
                        architecture from scratch, sit in support calls, ask hundreds of questions, befriend the one
                        engineer who remembers how it works — until I understand it better than almost anyone who
                        didn’t write the code. You can’t rebuild something beautifully until you understand the
                        mess.
                    </P>
                    <P>
                        And I’m a <strong className="font-semibold text-white">utility person, not an entertainment
                        person.</strong> I build things people <em>need</em>, not things that just engage them.
                        Productivity over novelty. If it doesn’t solve a real problem in someone’s actual life,
                        I’m not interested. I only build what’s missing — never what already exists.
                    </P>
                </Section>

                {/* §7 How I work */}
                <Section eyebrow="In practice" title="How I work">
                    <div className="space-y-4">
                        {HOW_I_WORK.map(([t, d]) => (
                            <div key={t} className="border-l-2 border-white/[0.08] pl-5">
                                <p className="font-semibold text-white">{t}</p>
                                <p className="mt-1 text-[0.95rem] leading-relaxed text-zinc-400">{d}</p>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* §8 Aesthetic */}
                <Section eyebrow="Taste, not trend" title="Aurora, ocean, dim light">
                    <P>
                        I’ve loved the northern lights for as long as I can remember, and I try to get waves into my
                        work somehow. My love for the ocean and dark, dim lighting is just who I am.
                    </P>
                    <div className="py-4">
                        <AuroraBand />
                    </div>
                    <dl className="space-y-3">
                        {AESTHETIC.map(([t, d]) => (
                            <div key={t} className="grid grid-cols-1 gap-1 sm:grid-cols-[180px_1fr] sm:gap-4">
                                <dt className="font-mono text-[12px] uppercase tracking-wider text-[var(--accent-teal-bright)]">{t}</dt>
                                <dd className="text-[0.95rem] leading-relaxed text-zinc-400">{d}</dd>
                            </div>
                        ))}
                    </dl>
                    <P>
                        Intensity is &ldquo;whispering intensity&rdquo; — the screen is alive, but barely; you’re not
                        sure if it’s moving. The user is floating on a boat: the fixed aurora is the ocean, and
                        content drifts into view, holds steady so you can read it, then drifts away. Serene, continuous,
                        breathing — never snappy or jarring.
                    </P>
                </Section>

                {/* §9 Voice */}
                <Section eyebrow="Copy & tone" title="Apple-style minimalist">
                    <P>Simple, straightforward, direct, confident — never boastful. Lead with outcomes and specifics. Let whitespace do the work. My raw voice, not AI filler.</P>
                    <div className="space-y-3">
                        {[
                            ['Connecting the structural integrity of code with the emotional resonance of design.', 'I prototype in code because the biggest risk isn’t the visuals — it’s the logic.'],
                            ['Passionate designer creating human-centered solutions.', 'Senior Product Designer. Enterprise systems. AI-augmented workflow.'],
                        ].map(([bad, good], i) => (
                            <div key={i} className="grid grid-cols-1 gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:grid-cols-2">
                                <p className="text-sm leading-relaxed text-zinc-500 line-through decoration-rose-500/40">{bad}</p>
                                <p className="text-sm leading-relaxed text-zinc-200">{good}</p>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* §10 Beliefs */}
                <Section eyebrow="Convictions" title="What I believe about design">
                    <ul className="space-y-3">
                        {BELIEFS.map((b, i) => (
                            <li key={i} className="flex gap-3 text-[1.02rem] leading-relaxed text-zinc-300">
                                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-teal)]" />
                                {b}
                            </li>
                        ))}
                    </ul>
                </Section>

                {/* §11 How I operate */}
                <Section eyebrow="Beyond design" title="Clarity plus adaptability">
                    <P>
                        I always have a plan — and I’m always willing to adjust it when life throws a curveball. Clear
                        about the goal, flexible about the path. I don’t white-knuckle one plan and break when reality
                        interferes; I hold the destination firm and let the route flex.
                    </P>
                    <div className="flex justify-center py-4">
                        <RouteFlex />
                    </div>
                    <P>
                        A career across two countries, legacy systems, restructurings, building a life from very little —
                        clarity plus adaptability. It’s the most durable way I know to operate.
                    </P>
                </Section>

                {/* §12 Worked with */}
                <Section eyebrow="Collaboration" title="How I want to be worked with">
                    <ul className="space-y-2.5">
                        {[
                            'Plan before execute — present a plan and get approval before writing code. No surprises.',
                            'Teach as you go — narrate the why, surface tradeoffs, explain in plain language. No jargon dumps.',
                            'Talk in prose, not menus — I reframe questions; multiple-choice flattens that.',
                            'Real data, no assumptions — sourced numbers, never invented; model as a band with a floor and ceiling.',
                            'UX substance > visual polish — judge a change by whether it helps the user decide and act.',
                            'Rewrite over patch — if a file gets messy, do a clean rewrite.',
                            'Document everything — so the history persists.',
                        ].map((t, i) => (
                            <li key={i} className="flex gap-3 text-[0.98rem] leading-relaxed text-zinc-400">
                                <span className="font-mono text-xs text-[var(--accent-teal)]/70">{String(i + 1).padStart(2, '0')}</span>
                                {t}
                            </li>
                        ))}
                    </ul>
                </Section>

                {/* §14 Proof */}
                <Section eyebrow="The proof" title="Made obvious, then shipped">
                    <P>
                        <strong className="font-semibold text-white">Professional (13+ years):</strong> Led the UX
                        modernization of over half of WebFOCUS, a ~50-year-old enterprise analytics platform — including
                        the ~40-year-old scheduling engine (ReportCaster), the ML workflows, and the natural-language
                        query layer. Took systems customers couldn’t use and made them ones they relied on. WebFOCUS
                        was named a Customer Experience Leader in Dresner’s 2025 awards during that period.
                    </P>
                    <P>
                        <strong className="font-semibold text-white">On my own:</strong> five live, working AI products —
                        all built for myself, to solve my own problems. All proof of the same philosophy: adaptive
                        systems that learn the user, made obvious, built because I needed them.
                    </P>
                    <div className="pt-2">
                        <FiveProducts />
                    </div>
                </Section>

                {/* Closing */}
                <section className="mt-14 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 md:p-10">
                    <p className="text-lg font-light leading-relaxed text-zinc-200 md:text-xl">
                        The short version: I knew at 15. I build things I actually need, and because I have the chops, they
                        come out good enough that other people want them too. I make complex technical systems as obvious
                        as a chair — and the harder it is to understand, the more I want it.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button variant="primary" href="/" icon={<ArrowRight className="h-4 w-4" />}>
                            See the work
                        </Button>
                        <Button variant="secondary" href="mailto:hello@anujaharsha.com">
                            Let&rsquo;s talk
                        </Button>
                    </div>
                </section>

            </article>
        </main>
    )
}
