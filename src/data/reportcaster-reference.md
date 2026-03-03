Report Caster CaseStudy

REPORTCASTER: REBUILDING A LEGACY PRODUCT AND REBUILDING MYSELF

A true story of taking on a 40-year-old system no one else wanted to touch — and turning it into clarity, structure, and a scalable future.

⸻

01 — How I Landed the Project (And Why It Mattered)

One week into joining the company, my design director mentioned there was a legacy scheduling tool in the pipeline — something old, massive, and untouched for decades. He hadn’t assigned it to anyone yet.

No designer had taken it.
No engineer wanted to own it.
No PM had a roadmap for it.

Everyone knew it existed — a scheduling engine buried deep inside the platform — but only a handful knew how it worked, and only one engineer truly understood the system end-to-end.

I said, “I’ll do it.”
He gave it to me the same day.

Later I understood why the hesitation existed:
	•	The system was 40+ years old
	•	It powered millions of automated jobs
	•	It was built on extremely legacy code
	•	There was zero documentation
	•	Customer Support was the only source of truth
	•	Even the Head PM (15 years in the org) only knew it at a surface level
	•	The design director had never seen it
	•	The last redesign attempt never happened because no one knew where to begin

I had one sandbox link, a brief demo from a support engineer, and a scattering of tribal knowledge.

That was it.

So I started.

⸻

What this reveals about my thinking and capabilities

I don’t wait for clarity — I create it.
I’m comfortable taking ownership when no one else does.
I step into ambiguity without hesitation and build structure from scratch.
I don’t get intimidated by legacy complexity — I get curious.

⸻

02 — Learning the System No One Documented

There was no onboarding.
No spec.
No design file.
No historical rationale.

Just: “Here’s the sandbox. Figure it out.”

So I treated the product like a black-box investigation.

What I did:
	•	Took hundreds of screenshots across every corner of the system
	•	Grouped and categorized all flows
	•	Sat with Customer Support frequently
	•	Held 1:1s with customer reps who used the tool all day
	•	Had long conversations with the one engineer who built it decades ago
	•	Spoke to QA and SMEs who had absorbed tribal knowledge over the years

I mapped:
	•	Every scheduling workflow
	•	Every entry point
	•	Every dialog
	•	Every branching path
	•	Every admin capability
	•	Every explorer interaction
	•	Every job-health pattern
	•	Every failure & recovery rule
	•	The burst logic, retention logic, blackout logic
	•	The behavior users relied on but the UI never expressed

Eventually, I created a full mind map that represented the actual product mental model.

By the time I finished, I knew more about the system’s UX and workflows than anyone else in the org — because no one had ever consolidated all the pieces before.

And I realized a major truth:

ReportCaster wasn’t a “feature.”
It was a product inside a product, with five independent subsystems.

The five core components:
	1.	Scheduling workflow
	2.	Distribution list creation
	3.	Access list creation
	4.	RC Explorer (asset view)
	5.	RC Admin (job health & system configuration)

All of them scattered, hidden, or deeply buried.

It became obvious:
This needed a structural redesign, not a UI facelift.

⸻

What this reveals about my thinking and capabilities

I can learn undocumented enterprise systems independently and deeply.
I build product understanding using real user behavior, not assumptions.
I don’t rely on existing documentation — I reconstruct the system myself.
This is critical for high-level enterprise design work.

⸻

03 — Why I Chose Version 1 (Independent Product)

My first instinct was simple:

The rest of the product ecosystem worked like this:
	•	Click “Create Visualization” → full independent Designer environment
	•	Click “Data Flow” → full independent environment
	•	Click “Manage Data” → independent environment

Everything large and complex had its own dedicated tab and ecosystem.

ReportCaster, given its size and complexity, fit that pattern perfectly.

So I designed Version 1 as a standalone product within the platform:
	•	One unified place
	•	No more 6–7 tabs opening
	•	Dedicated scheduling
	•	Dedicated explorer
	•	Dedicated admin
	•	Independent navigation
	•	Scalable for future additions
	•	Consistent with how the platform handled other complex tools

I also knew:
	•	Some customers actually bought the scheduling system separately → business opportunity
	•	RC users often spent their entire day inside it → independence would help them
	•	The system had 5 subsystems → clearly too big for a tiny in-hub presence
	•	A unified tab could massively reduce context switching

I created the first set of screens, tested the IA, validated it with my director, and it looked good.

But it was rejected.

The reason?

“Leadership wants all workflows to be centralized in the hub to increase adoption.”

That was a fair constraint — not a design flaw.

So I moved on.

⸻

What this reveals about my thinking and capabilities

I understand ecosystem consistency and align designs with platform-level patterns.
I push for user-centric architecture, but when constraints change, I adjust direction quickly.
I don’t cling to ideas — I evaluate feasibility and pivot rationally.

⸻

04 — Why I Built Version 2 (Plugin Integration)

If independence wasn’t viable, the next logical step was a plugin.

The platform had custom plugins already:
	•	Portals → brought into the hub as a plugin
	•	Server directories → brought into the hub as a plugin
	•	Home view → custom plugin
	•	Management Center → merged client + server + settings into a plugin

Everything was migrating into the hub.

So I thought:

“If the reason Version 1 was rejected is ‘it’s outside the hub,’ then the natural solution is to bring RC inside the hub as a plugin.”

This aligned perfectly with leadership’s long-term goal.

I built:
	•	A hub-friendly plugin
	•	Fully integrated navigation
	•	Consistent page patterns
	•	Consolidated sub-systems
	•	Future-proof IA
	•	No more fragmentation
	•	Easy access for beginners and power users

Again — it worked.

But it was rejected.

“Too much engineering effort.
Too big of an addition this year.”

So I had two rejections.

Instead of fighting the decisions, I reframed the problem from scratch.

⸻

What this reveals about my thinking and capabilities

I don’t force solutions — I follow the constraints, observe patterns, and rethink the architecture.
I align with organizational goals (hub adoption) instead of designing in isolation.
I can propose large-scale solutions but also know when to reduce scope intelligently.

⸻

05 — Version 3 (The Breakthrough): Designing WITH the Platform Instead of FOR It

At this point, I stopped thinking “Where should RC live?”
and started asking:

“How does the platform WANT workflows to behave?”

That’s when I saw the actual pattern:

Every major workflow starts in the plus (+) menu.
	•	Create visualization → opens new environment
	•	Fetch new data → modal
	•	Explore data → modal
	•	Create document → modal
	•	Create data flow → new environment

This menu wasn’t UI —
it was platform architecture.

It controlled:
	•	workflow initiation
	•	context anchoring
	•	avoiding tabs
	•	predictable entry points
	•	how the entire platform structured creation

So the question became obvious:

“If ReportCaster is fundamentally a creation workflow, why isn’t it initiated from the + menu?”

That insight changed everything.

What I designed:
	•		•	Create Schedule → modal
	•		•	Create Distribution List → modal
	•		•	Create Access List → modal

Why modal?

Because the side panel was never designed for multi-step, high-cognitive workflows.
It was for file properties — simple, read-only interactions.

A modal:
	•	matched platform conventions
	•	reduced cognitive load
	•	kept users in context
	•	didn’t require a plugin
	•	reduced engineering risk
	•	supported guided workflows
	•	eliminated the basic vs advanced split

Once the schedule modal worked, I realized:

“The pattern is scalable.
Lists can follow the same structure.”

That gave us:
	•	a unified model
	•	predictable UI
	•	consistent creation patterns
	•	minimal engineering friction

Explorer Integration (The Big Idea)

During conversations with the lead architect, I learned something important:

The Home page of the platform was essentially a filtered view of assets.

Favorites → filter
Recents → filter
Getting started → filter

So I suggested:

“Why not treat RC Explorer as a filtered view of RC assets inside the main workspace?”

This idea was big:
It would allow the platform to create filtered explorers for:
	•	Designer assets
	•	Data flows
	•	DSML assets
	•	Reporting assets
	•	ANY subsystem

This would unify the entire platform’s asset navigation system.

My director of design loved this idea.

It was rejected only because of timeline and engineering load — not because it was wrong.

Final decision:
	•	Explorer → filtered RC view in Home
	•	Admin → brought out of buried menus into the main management center navigation
	•	Scheduling → modal creation flow from the + menu
	•	Lists → modal creation flows
	•	All within the hub, all consistent, all discoverable

This was the version that finally aligned with:
	•	platform architecture
	•	engineering constraints
	•	user mental models
	•	long-term scalability
	•	minimal disruption to legacy logic

It was the solution that balanced everything.

⸻

What this reveals about my thinking and capabilities

I think in systems, not screens.
I understand the platform’s patterns at an architectural level.
I can take constraints, business goals, engineering limitations, and user needs — and synthesize them into one coherent direction.
This is staff-level synthesis and reasoning, not UI iteration.

⸻

06 — Aligning and Leading a Team That Didn’t Know RC

Once the direction was approved, the next challenge began:

Onboarding everyone.

I had to bring up to speed:
	•	lead architect
	•	lead engineer
	•	a full engineering squad
	•	the new PM
	•	QA
	•	Documentation
	•	SMEs
	•	Support
	•	And sometimes leadership

Most of them had never truly seen RC end-to-end.

So I:
	•	ran dozens of demos
	•	walked through legacy flows
	•	explained what users hacked to survive
	•	explained failure states, retry logic, bursting logic
	•	translated tribal knowledge into understandable UX rationale
	•	explained every IA and structural decision
	•	created prototypes for alignment
	•	mediated between engineers when interpretations conflicted
	•	clarified legacy behaviors that couldn’t be broken
	•	documented every workflow and edge case

I was working on another feature simultaneously (a full ML redesign).
I eventually onboarded a junior designer and handed her the UI work once all UX and architecture were set.

This project demanded more than design —
it demanded clarity, influence, communication, and patience.

By the time I left the team, the engineers who intimidated me initially had become collaborators I respected — and who respected me.

⸻

What this reveals about my thinking and capabilities

I can onboard, align, and guide large cross-functional teams.
I can communicate complexity clearly.
I can mediate between technical and product perspectives.
I take initiative and lead without a title.
My credibility comes from clarity, depth, and consistent follow-through.

⸻

07 — Shipping Impact

When the redesign shipped, these were the improvements:
	•	4–6 clicks → 1 click to create a schedule
	•	Multi-tab workflows → single contextual workflow
	•	Explorer → 1 click away
	•	Admin → clearly surfaced, no longer buried
	•	Consistent list creation workflows
	•	A unified mental model for all RC tasks
	•	Better recurrence model (new UI + natural language summary)
	•	Dramatically easier onboarding for new users
	•	Customer support tickets dropped
	•	RC became structurally ready for future features

In a Virtual User Group session I hosted, a long-time customer praised the redesign directly and said he was excited for what was coming next.

That moment mattered because I had seen RC users hack their way around a broken UI for years — and now they finally had a system that worked with them, not against them.

⸻

What this reveals about my thinking and capabilities

I design for long-term scalability, not surface polish.
I create systems that simplify onboarding and reduce support load.
I improve fundamental architecture, not just UI.
I build experiences that users can immediately feel the benefit of.

⸻

08 — What This Project Made Me

This was not just a redesign.
It was a turning point in how I understand product, platforms, people, and myself.

Through RC, I learned to:
	•	think in platform patterns
	•	redesign at architecture scale
	•	interpret undocumented logic
	•	balance constraints rationally
	•	collaborate with deeply technical engineers
	•	communicate clearly
	•	design for long-term extensibility
	•	understand customer realities
	•	own outcomes end-to-end
	•	operate like a product owner when needed
	•	make decisions at Staff/Principal level

RC didn’t intimidate me.
It made me sharper.

It made me more patient.
More structured.
More strategic.
More confident in how I solve problems.

It made me the designer I am today.

⸻

What this reveals about my thinking and capabilities

I don’t just redesign products — I redesign myself through them.
I grow through ambiguity.
I thrive in complex environments.
I can operate at a level where product, engineering, and UX thinking converge.
My value is not just in the screens I design — but in the clarity, direction, and systems-level problem-solving I bring to teams.
