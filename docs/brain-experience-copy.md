# Brain Experience — Copy Rewrite (for review)

> Proposed copy for the gear-brain quiz + the hover "thoughts." Voice: Apple-minimalist —
> short, direct, confident, never boastful; both options genuinely defensible; each reveal
> tied to a real belief or artifact. **Edit freely, then I wire it into the data files.**
> Source of voice: `docs/Anuja_Design_Philosophy_Master.md`. Geometry/SVG untouched.

Maps to: `QUIZ_QUESTIONS_DATA` in `ImmersiveBrainExperience.tsx` and `GEAR_INSPECTOR` in `gear-inspector.ts`.

---

## Part A — The Quiz

### `start` — the fork
- **statement:** Two ways in.
- **question:** Are you hiring, or just here to look?
- **I'm hiring** → *"Good. Thirteen years turning systems people dread into ones they rely on. What follows isn't a portfolio tour — it's how I actually think. Answer honestly; the machine lights up either way."*
- **Just looking** → *"Then look close. One idea runs through all of it: the complex thing should be as obvious as knowing to sit in a chair. Let me show you how I get there."*

### HIRING TRACK

**`hire_1` — ambiguity** · *statement:* Dropped in the deep end.
**Q:** New project. No brief, no docs, six weeks, three people who each want something different. Where do I start?
- **Listen before I draw** → *"The brief is never the real problem. First week I don't design — I listen. Support calls, the one engineer who still remembers how it works, the customer nobody asked. The real priority surfaces once people feel heard."*
- **Write the map nobody wrote** → *"No brief? I write the one that's missing and put it in front of everyone. A team aligns faster around a tangible wrong answer than a perfect one that never comes. (At one job my PM started writing the tickets after my mockups.)"*

**`hire_2` — stakeholder churn** · *statement:* Reading the room.
**Q:** A stakeholder keeps changing direction and the team's losing faith. What's actually going on?
- **Find what's really driving it** → *"They're not difficult — they're cornered. Shifting direction usually means pressure someone can't say out loud. I find the real constraint in private, then hand the team one stable target."*
- **Absorb it so the team can build** → *"I stand between the noise and the work — but I don't just block it, I translate it. I turn the shifting signals into one clear direction. It's the job nobody writes down, and it's the one that ships products."*

**`hire_3` — measuring design** · *statement:* Proving it worked.
**Q:** Your VP asks, "How do we know design is actually working?" What do I say?
- **Outcomes, not output** → *"I stopped counting screens years ago. Are customers staying? Are support tickets dropping? Are engineers shipping faster because the spec is clear? Design's value is the problems that quietly stop happening."*
- **Show the before and after** → *"Leadership can't feel the difference — so I show it. The chaos we inherited beside the clarity we built, side by side. When the contrast is real, the story sells itself. (It's part of how WebFOCUS landed a Dresner CX award.)"*

### EXPLORER TRACK

**`explore_1` — curiosity** · *statement:* The task is never the task.
**Q:** A brief lands: "redesign the settings page." What do I actually do with that?
- **Question the task itself** → *"Most 'redesign X' is a symptom. Why are people in settings at all? What broke upstream that sent them there? The real problem is usually three levels deeper — and solving it often makes the settings page unnecessary."*
- **Ship it, then learn** → *"I can move fast when speed is the point — but I spend thirty minutes understanding why first. In thirteen years that small tax has saved me from building the wrong thing more times than I can count. Curiosity is efficient, not slow."*

**`explore_2` — obsession** · *statement:* Still thinking about it at 11pm.
**Q:** We shipped. It works. I can't stop thinking about it. Why?
- **Something still feels off** → *"I live in the gap between 'works' and 'inevitable.' It's the animation 100ms too slow, the label that makes you think for half a second. Users feel it even when they can't name it — and I can't unsee it."*
- **Because it could be great** → *"My bar isn't perfection — it's 'would I be proud to show this to someone I respect?' Fifty tiny improvements compound into the reason someone says 'this just feels different.'"*

**`explore_3` — collaboration under constraint** · *statement:* Design meets the deadline.
**Q:** An engineer says my design is three sprints. I have one. What now?
- **Find the 80/20 together** → *"I sit with engineering, not across from it. I ask 'what's expensive?' and we almost always find 80% of the experience ships in 20% of the effort. The rest goes to v2. That conversation builds trust that outlasts the sprint."*
- **Prototype it to kill the doubt** → *"The best argument is a working thing. I've built the 'complex' interaction myself to show it's forty lines of code — not to prove anyone wrong, to remove the uncertainty. I prototype in real code because the risk is never the visuals, it's the logic."*

---

## Part B — The Gear "Thoughts" (post-quiz hover)

Each gear reveals one facet of how I think. `thought` = the line on hover.

| gear id | proposed `thought` |
|---|---|
| `gear-scattered-workflows` | I stopped waiting for the dev handoff and learned to ship the production code myself. This whole site is the proof. |
| `gear-legacy-systems` | Design is my first language — CorelDRAW in 5th grade, my first logo prize at 16. I didn't pivot into this; I grew up in it. |
| `gear-hidden-features` | Violin taught me rhythm, logic taught me structure, art taught me to see. Design is where all three meet. |
| `gear-fragmented-ui` | I run at the 40-year black box nobody will touch — map it, befriend the one engineer who remembers, rebuild it from scratch — until I understand it better than people who never read the code. |
| `gear-missing-briefs` | I didn't know machine learning, so I embedded with the data scientists and took an MIT course on my own dime. You earn a strong opinion by understanding the system better than anyone expected. |
| `gear-conflicting-teams` | When a team won't align, I stop arguing and build the thing. A working prototype is the source of truth no meeting can be. |
| `gear-shifting-priorities` | I know when to ship the hack that unblocks revenue and when to fight for the refactor. Speed is a design decision too. |
| `gear-motherhood` | Two kids and a career taught me to respect time. I don't grind — I orbit. Elite focus over long hours. |
| `gear-career-ambition` | Consistency at scale isn't a PDF guideline — it's one component behaving identically across 50 squads. Build it into the primitive and obviousness is inherited for free. |
| `gear-life` | I design for the person, not the screen — their cognitive load, their workflow. Make the complex thing as obvious as sitting in a chair. |

*(The per-gear mini-quiz reveals can get the same pass if you want — flag it and I'll extend this doc.)*

---

## Notes
- Every line is condensed from your own philosophy doc — no invented claims. Numbers/awards (13 yrs, Dresner, MIT, 50 squads) are yours; swap any you'd phrase differently.
- The emoji on the option buttons (🤝🔭🎧✏️…) are a separate decision — keep, swap for custom glyphs, or drop. Not changed here.
