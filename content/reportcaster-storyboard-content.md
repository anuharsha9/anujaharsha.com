# REPORTCASTER STORYBOARD — MASTER CONTENT DOCUMENT

> **Purpose**: Single source of truth for all RC case study content, narrative, and animation planning.
> **Last updated**: Feb 18, 2026
> **Status**: Content captured. Storyboard build pending.

---

## TABLE OF CONTENTS

1. [The Full Story (Polished Voice)](#the-full-story-polished)
2. [Anu's Raw Voice (Authentic Version)](#anus-raw-voice)
3. [Tile Architecture (Original Plan)](#tile-architecture)
4. [Storyboard Beat Map + Animation Opportunities](#storyboard-beats)
5. [Content Gaps to Fill](#content-gaps)
6. [Quick Timeline Reference](#timeline)

---

## THE FULL STORY (POLISHED) {#the-full-story-polished}

### REPORTCASTER: REBUILDING A LEGACY PRODUCT AND REBUILDING MYSELF

A true story of taking on a 40-year-old system no one else wanted to touch — and turning it into clarity, structure, and a scalable future.

---

### 01 — How I Landed the Project (And Why It Mattered)

One week into joining the company, my design director mentioned there was a legacy scheduling tool in the pipeline — something old, massive, and untouched for decades. He hadn't assigned it to anyone yet.

No designer had taken it.
No engineer wanted to own it.
No PM had a roadmap for it.

Everyone knew it existed — a scheduling engine buried deep inside the platform — but only a handful knew how it worked, and only one engineer truly understood the system end-to-end.

I said, "I'll do it."
He gave it to me the same day.

Later I understood why the hesitation existed:
- The system was 40+ years old
- It powered millions of automated jobs
- It was built on extremely legacy code
- There was zero documentation
- Customer Support was the only source of truth
- Even the Head PM (15 years in the org) only knew it at a surface level
- The design director had never seen it
- The last redesign attempt never happened because no one knew where to begin

I had one sandbox link, a brief demo from a support engineer, and a scattering of tribal knowledge.

That was it.

So I started.

**What this reveals about my thinking and capabilities:**

I don't wait for clarity — I create it.
I'm comfortable taking ownership when no one else does.
I step into ambiguity without hesitation and build structure from scratch.
I don't get intimidated by legacy complexity — I get curious.

---

### 02 — Learning the System No One Documented

There was no onboarding.
No spec.
No design file.
No historical rationale.

Just: "Here's the sandbox. Figure it out."

So I treated the product like a black-box investigation.

**What I did:**
- Took hundreds of screenshots across every corner of the system
- Grouped and categorized all flows
- Sat with Customer Support frequently
- Held 1:1s with customer reps who used the tool all day
- Had long conversations with the one engineer who built it decades ago
- Spoke to QA and SMEs who had absorbed tribal knowledge over the years

**I mapped:**
- Every scheduling workflow
- Every entry point
- Every dialog
- Every branching path
- Every admin capability
- Every explorer interaction
- Every job-health pattern
- Every failure & recovery rule
- The burst logic, retention logic, blackout logic
- The behavior users relied on but the UI never expressed

Eventually, I created a full mind map that represented the actual product mental model.

By the time I finished, I knew more about the system's UX and workflows than anyone else in the org — because no one had ever consolidated all the pieces before.

And I realized a major truth:

**ReportCaster wasn't a "feature."
It was a product inside a product, with five independent subsystems.**

The five core components:
1. Scheduling workflow
2. Distribution list creation
3. Access list creation
4. RC Explorer (asset view)
5. RC Admin (job health & system configuration)

All of them scattered, hidden, or deeply buried.

It became obvious:
**This needed a structural redesign, not a UI facelift.**

**What this reveals about my thinking and capabilities:**

I can learn undocumented enterprise systems independently and deeply.
I build product understanding using real user behavior, not assumptions.
I don't rely on existing documentation — I reconstruct the system myself.
This is critical for high-level enterprise design work.

---

### 03 — Why I Chose Version 1 (Independent Product)

My first instinct was simple:

The rest of the product ecosystem worked like this:
- Click "Create Visualization" → full independent Designer environment
- Click "Data Flow" → full independent environment
- Click "Manage Data" → independent environment

Everything large and complex had its own dedicated tab and ecosystem.

ReportCaster, given its size and complexity, fit that pattern perfectly.

So I designed Version 1 as a standalone product within the platform:
- One unified place
- No more 6–7 tabs opening
- Dedicated scheduling
- Dedicated explorer
- Dedicated admin
- Independent navigation
- Scalable for future additions
- Consistent with how the platform handled other complex tools

I also knew:
- Some customers actually bought the scheduling system separately → business opportunity
- RC users often spent their entire day inside it → independence would help them
- The system had 5 subsystems → clearly too big for a tiny in-hub presence
- A unified tab could massively reduce context switching

I created the first set of screens, tested the IA, validated it with my director, and it looked good.

**But it was rejected.**

The reason?

"Leadership wants all workflows to be centralized in the hub to increase adoption."

That was a fair constraint — not a design flaw.

So I moved on.

**What this reveals about my thinking and capabilities:**

I understand ecosystem consistency and align designs with platform-level patterns.
I push for user-centric architecture, but when constraints change, I adjust direction quickly.
I don't cling to ideas — I evaluate feasibility and pivot rationally.

---

### 04 — Why I Built Version 2 (Plugin Integration)

If independence wasn't viable, the next logical step was a plugin.

The platform had custom plugins already:
- Portals → brought into the hub as a plugin
- Server directories → brought into the hub as a plugin
- Home view → custom plugin
- Management Center → merged client + server + settings into a plugin

Everything was migrating into the hub.

So I thought:

"If the reason Version 1 was rejected is 'it's outside the hub,' then the natural solution is to bring RC inside the hub as a plugin."

This aligned perfectly with leadership's long-term goal.

I built:
- A hub-friendly plugin
- Fully integrated navigation
- Consistent page patterns
- Consolidated sub-systems
- Future-proof IA
- No more fragmentation
- Easy access for beginners and power users

Again — it worked.

**But it was rejected.**

"Too much engineering effort.
Too big of an addition this year."

So I had two rejections.

Instead of fighting the decisions, I reframed the problem from scratch.

**What this reveals about my thinking and capabilities:**

I don't force solutions — I follow the constraints, observe patterns, and rethink the architecture.
I align with organizational goals (hub adoption) instead of designing in isolation.
I can propose large-scale solutions but also know when to reduce scope intelligently.

---

### 05 — Version 3 (The Breakthrough): Designing WITH the Platform Instead of FOR It

At this point, I stopped thinking "Where should RC live?"
and started asking:

**"How does the platform WANT workflows to behave?"**

That's when I saw the actual pattern:

Every major workflow starts in the plus (+) menu.
- Create visualization → opens new environment
- Fetch new data → modal
- Explore data → modal
- Create document → modal
- Create data flow → new environment

This menu wasn't UI —
**it was platform architecture.**

It controlled:
- workflow initiation
- context anchoring
- avoiding tabs
- predictable entry points
- how the entire platform structured creation

So the question became obvious:

**"If ReportCaster is fundamentally a creation workflow, why isn't it initiated from the + menu?"**

That insight changed everything.

**What I designed:**
- Create Schedule → modal
- Create Distribution List → modal
- Create Access List → modal

**Why modal?**

Because the side panel was never designed for multi-step, high-cognitive workflows.
It was for file properties — simple, read-only interactions.

A modal:
- matched platform conventions
- reduced cognitive load
- kept users in context
- didn't require a plugin
- reduced engineering risk
- supported guided workflows
- eliminated the basic vs advanced split

Once the schedule modal worked, I realized:

"The pattern is scalable.
Lists can follow the same structure."

That gave us:
- a unified model
- predictable UI
- consistent creation patterns
- minimal engineering friction

**Explorer Integration (The Big Idea)**

During conversations with the lead architect, I learned something important:

The Home page of the platform was essentially a filtered view of assets.

Favorites → filter
Recents → filter
Getting started → filter

So I suggested:

"Why not treat RC Explorer as a filtered view of RC assets inside the main workspace?"

This idea was big:
It would allow the platform to create filtered explorers for:
- Designer assets
- Data flows
- DSML assets
- Reporting assets
- ANY subsystem

This would unify the entire platform's asset navigation system.

My director of design loved this idea.

It was rejected only because of timeline and engineering load — not because it was wrong.

**Final decision:**
- Explorer → filtered RC view in Home
- Admin → brought out of buried menus into the main management center navigation
- Scheduling → modal creation flow from the + menu
- Lists → modal creation flows
- All within the hub, all consistent, all discoverable

This was the version that finally aligned with:
- platform architecture
- engineering constraints
- user mental models
- long-term scalability
- minimal disruption to legacy logic

It was the solution that balanced everything.

**What this reveals about my thinking and capabilities:**

I think in systems, not screens.
I understand the platform's patterns at an architectural level.
I can take constraints, business goals, engineering limitations, and user needs — and synthesize them into one coherent direction.
This is staff-level synthesis and reasoning, not UI iteration.

---

### 06 — Aligning and Leading a Team That Didn't Know RC

Once the direction was approved, the next challenge began:

**Onboarding everyone.**

I had to bring up to speed:
- lead architect
- lead engineer
- a full engineering squad
- the new PM
- QA
- Documentation
- SMEs
- Support
- And sometimes leadership

Most of them had never truly seen RC end-to-end.

So I:
- ran dozens of demos
- walked through legacy flows
- explained what users hacked to survive
- explained failure states, retry logic, bursting logic
- translated tribal knowledge into understandable UX rationale
- explained every IA and structural decision
- created prototypes for alignment
- mediated between engineers when interpretations conflicted
- clarified legacy behaviors that couldn't be broken
- documented every workflow and edge case

I was working on another feature simultaneously (a full ML redesign).
I eventually onboarded a junior designer and handed her the UI work once all UX and architecture were set.

This project demanded more than design —
it demanded clarity, influence, communication, and patience.

By the time I left the team, the engineers who intimidated me initially had become collaborators I respected — and who respected me.

**What this reveals about my thinking and capabilities:**

I can onboard, align, and guide large cross-functional teams.
I can communicate complexity clearly.
I can mediate between technical and product perspectives.
I take initiative and lead without a title.
My credibility comes from clarity, depth, and consistent follow-through.

---

### 07 — Shipping Impact

When the redesign shipped, these were the improvements:
- 4–6 clicks → 1 click to create a schedule
- Multi-tab workflows → single contextual workflow
- Explorer → 1 click away
- Admin → clearly surfaced, no longer buried
- Consistent list creation workflows
- A unified mental model for all RC tasks
- Better recurrence model (new UI + natural language summary)
- Dramatically easier onboarding for new users
- Customer support tickets dropped
- RC became structurally ready for future features

In a Virtual User Group session I hosted, a long-time customer praised the redesign directly and said he was excited for what was coming next.

That moment mattered because I had seen RC users hack their way around a broken UI for years — and now they finally had a system that worked with them, not against them.

**What this reveals about my thinking and capabilities:**

I design for long-term scalability, not surface polish.
I create systems that simplify onboarding and reduce support load.
I improve fundamental architecture, not just UI.
I build experiences that users can immediately feel the benefit of.

---

### 08 — What This Project Made Me

This was not just a redesign.
It was a turning point in how I understand product, platforms, people, and myself.

Through RC, I learned to:
- think in platform patterns
- redesign at architecture scale
- interpret undocumented logic
- balance constraints rationally
- collaborate with deeply technical engineers
- communicate clearly
- design for long-term extensibility
- understand customer realities
- own outcomes end-to-end
- operate like a product owner when needed
- make decisions at Staff/Principal level

RC didn't intimidate me.
It made me sharper.

It made me more patient.
More structured.
More strategic.
More confident in how I solve problems.

It made me the designer I am today.

**What this reveals about my thinking and capabilities:**

I don't just redesign products — I redesign myself through them.
I grow through ambiguity.
I thrive in complex environments.
I can operate at a level where product, engineering, and UX thinking converge.
My value is not just in the screens I design — but in the clarity, direction, and systems-level problem-solving I bring to teams.

---

## ANU'S RAW VOICE (AUTHENTIC VERSION) {#anus-raw-voice}

> This is Anu's unfiltered telling of the story. Preserve this tone — the humor, the :D, the "HA!", the casual confidence.

The PM was there. She knew about ReportCaster. She wasn't just any PM, she was Head PM. She was the manager of all the PM's in the org. She'd been there for 15 years. But she didn't know anything about UX. This was just meant to be a redesign at the behest of multiple customer requests. The entire product was modernized, but RC was pending. Why? It was HUGE. Nobody had touched it. When I came, I had no idea either. My manager (the director of design) said this - we have this project in the pipeline for the design team, I'm yet to assign it to a designer. I said - I'd like to do it. Give me a chance. I guess he was impressed. He gave it to me without hesitation. It had ONLY been a week since I joined :P. FYI, my manager didn't know anything about RC. not a clue. He was the director of design.

Then I found out - there were about 200 people in my business unit. People knew ReportCaster existed. They knew it was a scheduling tool. That's it. Literally the only people who knew how to use it were the support team, and ONE engineer who did RC code in the 80s and 90s, still with the company. And the backend engineers who made the product work. The head PM had basic knowledge. But there wasn't a roadmap or plans to make RC better, add features or anything. It was stated to be a UI makeover. Not even a redesign. There was literally no documentation at ALL. I had a sandbox. And that's it.

But, I wasn't gonna let this go. I went in the sandbox and used RC as much as I gathered from the demo given by the lead support guy on RC in the initiation call. He shared a presentation and that was my bible. I took hundreds of screenshots. Grouped them. Mapped them.

After all my months of research, I created mind maps, pain points, IA and mapped the entire ReportCaster - A-Z. Spoke to customer support regularly. 1:1 with customer reps of RC. 1:1 with that ONE engineer who knew about it. I built my network. I mapped my product. I validated everything I had with customer support and customer Reps over and over I had everything I needed to begin my work. I was the one person who knew more about ReportCaster workflows than anyone else. Sure, I didn't know too much of the technical stuff - way too deep for a designer. I'm not an engineer, but I made sure I understood constraints of a legacy system, old FOCUS code, customer dependency, no JS or React or anything.

What I discovered was ReportCaster was a product in itself. It was so huge and so powerful. It had millions of schedules running. Users whose entire job was to use RC all day. There was this customer that had 13 million schedules running everyday. I thought - that's some powerful shit. We had hundreds of enterprise customers.

There were 5 main aspects to it.

- schedule workflow
- Distribution list creation
- Access list creation
- ReportCaster explorer - its own personal asset viewer
- ReportCaster Status - its own admin settings panel with dashboards and millions of settings and configuration options.

They were all scattered throughout the product.

Creation of schedules and lists were buried under 4 clicks.
Explorer was in the hamburger menu of the main product header and status was buried inside management center > admin console.

So I thought let's create it like a unified product. Because we did have other features which were independent and opened outside the hub, like the main data visualization tool or the data flow and migration tool. So I thought let's create it the similar way with similar consistency.

When I began the initial few design drafts, it was just me and me validating everything with my director of design. I was new, still getting to learn the design system, still onboarding.

I made a few versions where initially I felt out of place. But then after a few rounds of iterations and understanding the design system better I created a fully independent version of RC, that incorporated the main 3 workflows + admin status + explorer. It was beautiful. Looked exactly like the rest of the product. Seamless and easy to use.

But it got rejected by engineers and PM. That's not the direction they want. They want the HUB to be central. This takes them outside the hub. They liked the experience — but not the fact that it was outside the hub.

So I created a version where the entire independent version was integrated in the HUB in a plugin form, with an icon on the side nav on the hub. I loved this version the most.

That too got rejected. Saying it's too much to create a new plugin in the HUB etc. too much engineering effort. We don't like this direction much either. I was thrown with a bunch of technical jargon and constraints.

Now I was perplexed. They said they wanted it fully integrated in the HUB. We had a plus menu in the HUB, the place where major workflows began. Like create visualization or data flow or explore data.

So I got an idea. I decided to add an option that said create schedule in the plus menu. It would bring up a dialog box. The scheduler workflow in a dialog box in the HUB. Same with the workflows of creating distribution list and access list. The explorer integrated in the home view of the HUB alongside recents and favorites. That I got from the lead architect who designed the hub — that the home area is like a filter for assets in the workspace. So I thought just like there's a space for favorites and recents. We could create a space for RC assets — scheduled and lists. Or best thing would be add a filter option in the workspace where all files live and add RC and its assets as deep dive filters. We had dozens and dozens of file types, that would've been a great addition, but it was too much work for the HUB feature team for that year so it got pushed as a later project and the RC in home areas idea was finalized.

Then the admin would have its own tab in the management center — not buried inside admin console of the product, but have its own dedicated visible space in the main management center on the left navigation.

So there it was — the final workflow of ReportCaster. UX done. Time for getting the UI done.

As I got that done — hundreds of screens — the team who was going to work on it was being assembled.

But the people who were going to work with me — the lead architect, the lead engineer, the core group of engineers, the QA, and the new PM — they were unaware of ReportCaster.
So now came the presentation part — it was left to me to onboard them. The first people I onboarded were the lead architect and the lead engineer. With whom the design discussions were finalized.

Then came the entire group of engineers: new PM, the QA team, the documentation team.

I onboarded everyone. Dozens of demos of the old and new ReportCaster to everyone.

Once the team was built and onboarded, it took a while for it to work like a well oiled machine. I was still working on the UI. I was part another feature team for ML. So I was managing both projects simultaneously while having a 1 year old at home. All day.

I realized I needed help. There were 3 other designers on the team, all working on one feature. Here I was, working on two features at the same time. That said something about the trust I had from leadership.

I was allowed to borrow one designer from that 3 designer feature — a junior designer. I onboarded her and made sure she knew everything I did. Eventually I left the team due to other pressing work in other feature teams I was part of and let that other designer and another one take over. My job was mainly done — I had done all the heavy lifting and UX — the UI was taking time because well, hundreds and hundreds of screens.

Thing is I won some and I lost some with RC, but I grew immensely. I did things I never did before. I grew. I matured. I learned leadership. My director of design literally mentored me into it with daily 1:1 calls and built my confidence and backed me up when I needed backing. I was in a room full of senior engineers who'd worked for decades. By the time I left the team: they'd become my family. They were no longer intimidating. I had earned respect and trust from them. They valued my opinion. I was the youngest in the room with an unspoken authority on the experience of RC. And I applied that to every other feature team I worked for since.

RC made me the design leader I am today.

Once the product was shipped — overall the product metrics — from 4 clicks to one to create schedules/lists. 1 click for explorer vs 3. 2 clicks for admin as opposed to 3. No more individual browser tabs for each schedule and lists. Or status and explorer. Everything smoothly integrated within the hub ecosystem.

Upon shipping customer feedback was extremely positive. The new experience was praised and in a virtual user group that I was hosting a customer praised my work and said he's looking forward for what's next.

What my revamped experience for RC did was expand room for additional new features that the PM went on to add after the initial launch. I designed for the future, allowing room for new features. Creating an experience where more could fit without restricting anything.

From me hearing from customer support and seeing tickets where our customers were hacking their way around the UI of RC and customizing to fit their needs — to shipping an experience that made onboarding and training easy for new users and made life easy for existing users and get praise and excitement from customers about upcoming things for RC. I had never felt so proud of myself.

---

### Anu's 46-Point Raw Timeline (from Feb 18, 2026 conversation)

1. When I joined the ibi WebFOCUS team at TIBCO Software (Now CSG) — as a Senior Product Designer — I entered with Zero domain knowledge.
2. I had never worked in data analytics, never heard of BI tools, Knew something called Machine Learning existed.
3. I was onboarding and my director told me there is project called ReportCaster in the pipeline to be assigned to the design team — he'll pick a person to lead that.
4. Well, I was enthusiastic. I said — please allow me. I'd like to do it. HA!
5. He asked — are you sure? I said — YES.
6. So week 3 — Monday. first kickoff meeting. Few people. Head of Product Management(15 years at the company), Gold support customer support lead (host & presenter)(20 years at the company), my manager(director of Design), original RC engineer (35+ years at webFOCUS), Backend guy for webFOCUS (very important man, 30+ years at WebFOCUS), and ME :D duh!
7. The request — Complete UI refresh. why? Too many customer requests asking for modernization.
8. Next day I got his presentation slide, a sandbox link on how to use it. That's all.
9. Those people in the meeting were the only ones who knew about RC. My director of design and me were hearing about RC for the first time.
10. RC was only worked on by engineers for 40 years. NO UX ever. I was the first designer to take it on — ever in 40 years.
11. So I had the customer support guy, Chris and Principal original RC engineer Yingchun Chen, a sandbox and a presentation. NO documentation. No design files. No RC team. No nothing.
12. So I interviewed those people like crazy. I joined Chris's customer support team meetings for a month every week. :D — One month since I got the project.
13. Found ticket and visual evidence of customers customizing RC UI to their preferences and convenience.
14. Noted down lots of pain points from my interviews with the CS team.
15. Made note of all important things and big issues.
16. I also investigated the sandbox like crazy. Took hundreds of screenshots.
17. I made a mind map in Miro. 6 weeks into the project.
18. I found out RC is a full fledged enterprise scheduling system with 5 main systems. Explorer, Status(admin), scheduler, distribution list, access list and it also had a Report Library (found in explorer).
19. Explorer in a new tab, Admin 2 clicks inside the management center. Schedules, DL and AL all 3 opened in new browser tabs.
20. BIG NO NO.
21. Then I started working on possibilities. 2 months into the project.
22. I made wireframes and maps for a new workflow. I came up with a V1 — independent like other features in webFOCUS — Designer and Reporting Server. They had their own views outside the webFOCUS Hub. Leadership was exploring to sell RC as independent product too. Hence my V1. Rejected. Leadership said we want to promote the HUB.
23. V2 — RC in the HUB embedded with its own view. — Rejected. — very technically challenging.
24. V3 — Breakthrough — Modal based workflows. — 3 months into the project.
25. Explorer embedded in the Home view of HUB.
26. Status in the management center — 1 click only after entering management center. — added visibility.
27. Scheduler, DL and AL — starting from + plus menu of the HUB and opening as modal workflows in the HUB — where HUB is the parent of the workflow.
28. Reimagined the scheduler with over 10 iterations. There were 2 schedule creation options — basic and advanced. Consolidated into one single scheduler view.
29. Reimagined the DL and AL completely.
30. Reimagined the recurrences in scheduler completely adding Natural Language summary to it for easy understanding.
31. Reimagined Job log workflow to reduce friction, confusion and clicks.
32. Got approval from director of design, Head PM.
33. Onboarded lead architect of webFOCUS, lead architect of RC, to start working and got their approval for new workflow. 4 months into the project.
34. Then a team was formed. Me the UX lead, head PM was RC PM until a new PM came in. Lead architect of WF, Lead architect for RC.
35. Did all the visual designs and tickets. — 5 months into the project.
36. Onboarded the QA team. — 6 months into the project.
37. Onboarded the New Engineering team — 6 months into the project.
38. Onboarded the PM — 7 months into the project.
39. Onboarded the first designer. — 8 months into the project.
40. Onboarded the second designer. — 13 months into the project.
41. Exited the team — 14 months into the project.
42. RC shipped. — 18 months into the project.
43. Did Virtual user group. — customer PRAISE. My moment of victory and validation :D :D :D — 16 months after my exit.
44. Joined the RC team post layoffs. — 14 months after my exit.
45. Continued improving and maintaining. — 14 months after my exit.
46. Before handing off to the two designers — I created over 250 screens. RC was very technical and too many options, too many types of DL and tasks. LOTS of screens and workflows were needed to revamp aside from the main 5 systems. Niche minute workflows like test connection validations, email lists UI, chip UI for clean email views in input boxes, improved dialog boxes, error handling, THERE WAS SO MUCH. — 12 months into the project.

---

## TILE ARCHITECTURE (ORIGINAL PLAN) {#tile-architecture}

### TILE 1: Title + Impact at a Glance (Fast Skimmable Executive Summary)

**Goal:** Instantly position you as a strategic IC who can evaluate legacy systems, modernize them, and drive cross-functional alignment.

This tile should cover:
1. What the product is (40-year-old scheduler).
2. Why it mattered (millions of daily jobs).
3. Who asked for this redesign (enterprise customers + SMEs).
4. Why it was urgent (fragmented, outdated, customers building workarounds).
5. Your first bold move (volunteering immediately).
6. Hard impact metrics (click reduction, consolidation, etc.).

This tile becomes your "hook".

---

### TILE 2: Demo (keeps as-is, but with clearer narrative framing)

**Goal:** Position the demo not as "here's a video," but as "Here's the outcome of my design decisions."

Updated content will:
- explain the core design philosophy behind the demo
- frame the experience as an integrated, in-hub flow
- highlight the new scheduling model you designed
- emphasize the before/after contrast when viewing the demo

---

### TILE 3: Product & Context (Deep Context + Voice of Customer)

**Goal:** Satisfy all "who motivated the design?" questions.

**Who motivated the redesign:**
- Enterprise customers
- Gold-account customer representatives
- Customer support
- Internal SMEs
- Design leadership
- Competitive pressure (Tableau, Power BI)

**What influenced decisions — customers specifically said:**
- "We need a modern UI."
- "This part of WebFOCUS feels outdated compared to Power BI / Tableau."
- "Workflows are fragmented."
- "Schedules open in new tabs — we get lost."
- "ReportCaster feels outside the product."

**Key pain points:**
- Fragmented workflows
- Too many browser tabs
- Basic vs. Advanced schedules confusing
- Too many right-click menus
- Legacy IBI design system limitations
- Outdated, Word-95-style scheduler
- No guidance for new users
- SME + support ticket insights

**Design constraints:**
- 40-year-old IBI design system
- No modern JS
- Old Focus codebase
- No external APIs
- Limited engineering
- No PM support initially
- Outdated UI patterns baked into the system
- Heavy backward compatibility requirements

**Competitive analysis:**
- Power BI's right-panel scheduling
- Tableau's integrated flows
- Qlik NPrinting's configuration model
- What others did well
- What WebFOCUS could uniquely do better
- What you learned and applied

**High-level strategy:**
- Pull ReportCaster into the hub
- Unify 3 tools → 1 integrated experience
- Merge Basic + Advanced → one smart scheduler
- Create a guided 5-step flow
- Reduce cognitive load + context switching
- Bring scheduling entry-points closer to assets

---

### TILE 4: Design Process (4 Steps) — Rewritten as Narrative Flow

**Step 1 — Discovery & Understanding (Bold entry)**
- Volunteered two weeks into the job
- No docs, no PM, massive legacy code
- Mapped 5 complex workflows + hundreds of screens
- Interviewed SMEs, customer support, engineering, data science
- Collected customer quotes
- Captured all functional quirks (priority, blackout, burst, heartbeats, crash recovery, hold files etc.)
- Identified contradictions & fragmentation

**Step 2 — Strategy + Information Architecture (Big decisions)**
- Proposed embedding ReportCaster inside the hub
- Proposed combining Basic + Advanced schedules
- Proposed converting the outdated multi-panel UI into a modern dialog model
- Structured everything to support BOTH embedded and standalone versions
- Battled constraints of the IBI design system
- Multiple iterations + engineering feasibility discussions
- Won over the architect

**Step 3 — Workflow, Interaction Model, Visuals**
- Designed all state flows, recovery, distribution, alerts, burst logic
- Designed the 5-step scheduling flow
- Built the role-specific control model (Analyst / Admin / Power User)
- Competitor alignments
- Multiple rounds of SME validation
- Design reviews with design director
- Engineering constraints shaping UI choices
- UI model that stayed true to modernization patterns
- Everything integrated inside the hub — no more browser-tab sprawl

**Step 4 — Delivery, Cross-Functional Leadership & Tough Moments**
- Participated in engineering dry runs
- Daily standups, one-on-ones with QA, support
- UX QA, padding fixes, detail-level reviews
- Interpreted legacy code behavior into UX decisions
- Mentored and onboarded a new designer
- Handed over the work seamlessly
- Returned to support the team later when they needed senior UX direction again

---

### TILE 5: My Role & Outcomes (Leadership + ownership)

**Leadership arc:**
- Volunteered for project
- Drove discovery
- Defined strategy
- Led cross-functional alignment
- Unified engineering around feasibility
- Designed the workflow & UI
- Influenced architecture
- Mentored designers
- Made the hard call to step away
- Ensured continuity
- Returned later to support the product

**What you're proud of:**
- Integration into the hub
- One unified scheduler
- Modern dialog-based UI
- Scalable IA
- Designed to support a standalone version (validated later by customers)
- Outcome validation (engineering, support, leadership, customer sentiment)

**Outcome metrics:**
- 60% fewer clicks
- 3 → 1 unified tools
- 50% faster task completion
- Fewer support tickets
- Improved discoverability
- Customers validated direction during VUGs
- Architecture still used today

---

### TILE 6: Stakes

**What problem existed:**
- Scheduling lived outside the WebFOCUS hub in an outdated, separate tool
- Users needed 10–15 clicks and multiple browser tabs to create or edit a schedule
- "Basic" vs. "Advanced" schedules duplicated effort and caused confusion
- Entry points were hidden behind right-click menus
- Power users memorized workarounds; new users were completely lost

**Why it mattered:**
ReportCaster is the silent backbone of WebFOCUS. If scheduling breaks, enterprise reporting breaks. Many organizations run millions of automated jobs through it annually.

**Who was affected:**
- BI developers creating hundreds of recurring jobs
- Admins responsible for uptime, job health, crash recovery
- Analysts who needed quick changes without opening 10+ dialogs
- Enterprise customers whose operations rely on precise report delivery
- Customer support, overloaded with navigation/confusion tickets

**Business/User Impact:**
- Competitive pressure from Power BI, Tableau, Qlik made RC look ancient
- Customers repeatedly requested "modern UX" in VUGs
- Support reported excessive tickets tied to tab sprawl, Basic/Advanced confusion, users losing track mid-workflow

---

### TILE 7: Constraints

**Legacy Systems:**
- 40-year-old Focus codebase
- IBI design system with limited patterns & legacy components
- No modern JS framework allowed
- Strict backward-compatibility requirements

**Missing Documentation:**
- Almost no usable documentation existed
- SME knowledge scattered across support, QA, senior engineers, long email threads

**No PM Initially:**
- Zero product requirements
- No clear owner
- No roadmap — I built the foundational structure myself

**Conservative Engineering:**
- Extreme sensitivity to regression risk
- Long-lived logic (bursting, blackout rules, retention, priorities) couldn't be refactored
- "If we break this, enterprise jobs stop" energy everywhere

**SME Complexity:**
- Bursting logic, Heartbeats, Retention policies, Crash recovery, Job health monitoring, Advanced distribution rules
- Each required deep understanding to avoid UX oversights

---

### TILE 8: Strategy

**How I framed the problem:**
"Unify the mental model. Simplify configuration. Bring scheduling into the hub. Build a guided flow, not a maze."

**How I aligned stakeholders:**
- Built workflow diagrams that everyone aligned around
- Created a phased modernization strategy to reduce engineering risk
- Walked teams through narrative walkthroughs instead of raw mockups
- Presented early IA to design leadership to secure long-term support

**How I clarified workflows:**
- Collapsed Basic + Advanced into one unified flow
- Reduced branching paths into a single, predictable guided path
- Anchored scheduling in a 5-step model
- Simplified distribution and bursting without removing power
- Rebuilt job visibility and monitoring patterns

**How I unblocked teams:**
- Translated undocumented behaviors into UX decisions
- Managed trade-offs when legacy technical limits prevented ideal states
- Settled feasibility disagreements between architect, engineers, and PM
- Created low-fi prototypes that engineering used to validate behavior

---

### TILE 9: The Work

**Flows:**
- Documented all scheduling entry points across Explorer, Admin, and legacy Scheduler
- Created "as-is" → "ideal" flows that unified branching paths
- Designed the 5-step guided flow: Asset → Schedule → Recurrence → Distribution → Review

**Wireframes:**
- Low-fidelity first to validate feasibility and structure
- Built structural flows before touching UI components
- Worked around severe limitations of legacy front-end patterns

**Iterations:**
- 25–30 versions refining: IA, Distribution controls, Burst logic, Failover states, Advanced rule configuration, Review/Confirm model

**Key Decisions:**
- Merging Basic + Advanced schedules
- Embedding in the hub
- Five-step model
- Removing multi-tab workflows
- Simplifying the visual hierarchy
- Preserving advanced features without overwhelming new users

---

### TILE 10: Impact

**Metrics:**
- 60% fewer clicks
- 50% faster schedule creation
- 3 tools → 1 unified experience
- Fewer support tickets tied to navigation & lost workflows

**Adoption:**
- SMEs immediately validated the new model
- Engineers accepted unified flows as "cleanest version ever shipped"
- Leadership greenlit future enhancements based on this foundation

**System Unification:**
- Explorer, Admin, and Scheduler brought into one consistent UX
- Scheduling became a first-class citizen inside the WebFOCUS hub

---

### What I'd Do Next

- Build job health analytics directly into Explorer
- Add schedule templates for fast creation of common workflows
- Introduce bulk editing for enterprise admins managing large fleets
- Improve explained configuration, especially around bursting & distribution
- Add predictive insights to detect failing or inefficient schedules
- Expand the standalone scheduler version customers requested
- Introduce guided onboarding for new analysts

---

## STORYBOARD BEATS + ANIMATION OPPORTUNITIES {#storyboard-beats}

The full storyboard will be a scrollytelling experience — a continuous vertical scroll where each beat is an animated scene. Not a slide deck.

| # | Beat | Visual / Animation | Content Status |
|---|------|--------------------|---------------|
| 1 | **"Week 1. Zero domain knowledge."** | Intro card fade-in with title + "never heard of BI tools" | ✅ Have it |
| 2 | **"The Room" — Kickoff meeting** | Animated seating chart: 5 seats with years of experience | ✅ Have it (names, years, vibe) |
| 3 | **"What I Got"** | Three items animate in. Then "No ___" strikethroughs | ✅ Have it |
| 4 | **"The Investigation"** | Timeline bar Month 1→2 with animated icons popping in | ✅ Have it |
| 5 | **"What I Found" — 5 Systems** | System map chaos — 5 boxes scattered across tabs/windows | ✅ Have it — **ANIMATION** |
| 6 | **"Three Pivots"** | V1 builds → REJECTED → V2 builds → REJECTED → V3 → APPROVED | ✅ Have it — **ANIMATION** |
| 7 | **"The Breakthrough" — + Menu** | + menu opening → modals launching from Hub | ✅ Have it — **ANIMATION** |
| 8 | **"Scheduler Redesign"** | Basic vs. Advanced → unified flow. 2 separate workflows consolidated | ⚠️ NEED DETAILS — **ANIMATION** |
| 9 | **"Recurrence Redesign"** | Old cryptic codes → NLP summary | ✅ Have it — **RESERVED ANIMATION** |
| 10 | **"Job Log Redesign"** | Before/after wireframe animation | ✅ BUILT — **EXISTING ANIMATION** |
| 11 | **"250 Screens"** | Cascading wireframe waterfall with counter | ✅ Have it — **ANIMATION** |
| 12 | **"Building the Team"** | Person icons appearing month by month on timeline | ✅ Have it — **ANIMATION** |
| 13 | **"The Handoff"** | Google Drive folder tree expanding → designers | ✅ Have it |
| 14 | **"Shipped + Customer Praise"** | Big number: Month 18. 20M+ schedules. Quote. ":D :D :D" | ✅ Have it |
| 15 | **"Asked vs. Delivered"** | Split: "UI makeover" shrinks, "System architecture" grows | ✅ Have it — **ANIMATION** |

**Total animations: 10** (1 existing + 2 reserved + 7 new)

---

## CONTENT GAPS TO FILL {#content-gaps}

### ✅ Gap 1: Scheduler — Basic vs. Advanced (Beat 8) — FILLED

**Visual references:** Screenshots of both workflows shared (Feb 18, 2026) — includes old entry points and navigation paths.

**ENTRY POINT 1 — "Basic Schedule" (right-click path):**
- Navigation: Hub → Workspaces → Caster folder → right-click filename → Schedule → right-click → choose method (Email, FTP, Printer, Report Library, Repository)
- Opens a "Distribute Email" form (old-style dialog) with fields: To, CC, From address, Reply address, Subject
- Distribution options: "Send the report as the message" checkbox, "Have an attachment" toggle, Address types (Burst, Reply To), file format selectors (HTML, Excel, PDF, etc.)
- This was the "quick" path — 1 task, 1 distribution method. Fewer steps. Used by beginners or for one-off schedules.
- **Problem:** Very hidden. Required navigating to the right folder, right-clicking the right file, finding "Schedule" in a context menu. Zero discoverability.

**ENTRY POINT 2 — "Advanced Schedule" (+ Content path):**
- Navigation: Hub → Workspaces → "+ Content" button → dropdown menu (Data, Application, InfoAssist, Schedule → sub-options: Access List, Distribution List, **Schedule**), Other
- Opens the **full scheduler interface** with a heavy ribbon toolbar: Save & Close, Delete | Properties, Recurrences, Tasks, Distribution, Notifications, Log Reports (organized under "Actions" and "Show" groups)
- **Schedule → Properties tab:** Path field, Summary text area, Job Priority Level (Normal -3 dropdown), "Delete this schedule if it is not scheduled to run again" checkbox, "Enabled (Scheduled job runs at specified time)" checkbox
- **Schedule → Recurrences tab:** Old recurrence dialog with all the complex date/time configuration, plus a Schedule Details sidebar on the right listing: Run Once, Minutes, Hourly, Daily, Weekly, Monthly, Yearly, Custom
- Multiple tasks + multiple distribution methods. A much longer, more complex multi-step workflow with significantly more screens.

**The Core Problem (two entry points, two UIs):**
- Basic = 1 task, 1 distribution. Advanced = multiple tasks, multiple distributions.
- Users had to choose *upfront* which path they needed — terrible for discoverability
- A user who starts Basic and realizes they need Advanced has to abandon and start over
- Basic was buried in a right-click menu; Advanced was in the + Content dropdown — neither was obvious
- The Advanced scheduler had an intimidating ribbon toolbar with 8+ action buttons

**The Solution (unified modal via + menu):**
- Consolidated into one unified "Report Caster - Create Schedule" modal accessible from the Hub's + menu
- Left sidebar with clear steps: Task → Distribution → Recurrence → Properties → Log Reports
- All options available, but progressively disclosed — beginners see simplicity, power users get full control
- No more choosing Basic vs. Advanced upfront. Add more tasks or distributions as needed without restarting.
- Cancel / Run ▾ / Save ▾ buttons at the bottom — clean, modern, unified

**For the Recurrence animation:** The "before" state should reference the Advanced scheduler's recurrence UI (cryptic, complex date/time configuration with the old ribbon toolbar). The "after" state is the clean Recurrence tab with progressive disclosure and the natural language summary approach.

**Log Reports — OLD (3 fragmented access points):**
1. **Old scheduler ribbon → Log Reports tab:** Bare split-panel layout. Top panel: "Number of Jobs: 0" table (Job Number, Start Time, End Time, Status). Bottom panel: "Log Report for Job" (Date, Time, Message, Status). Both panels mostly empty. Minimal detail.
2. **RC Status/Admin page → Job Log button in ribbon:** Separate standalone "TIBCO WebFOCUS | ReportCaster" app. Left sidebar: folder tree (Job Logs → Users → admin → schedule folders). Right: table with Job ID, Start Time, count, Job Status. Completely disconnected from the scheduler.
3. **Right-click schedule file in Hub → "View Log":** Opens job log in a **new browser tab** — yanks the user out of context entirely.

**Log Reports — NEW (2 improved access points):**
1. **Unified modal → Log Reports tab (sidebar):** Last step in the flow: Task → Distribution → Recurrence → Properties → **Log Reports**. Table: Sr No, Job Number, Status (Success in blue, Error in red). Clicking a row opens "Job Process Log Report" detail overlay: Job Description, User, Job Number, Start/End Time, full chronological execution log with timestamps, color-coded errors (red/orange for failed distributions: *"myfirstfex.htm not distributed to ssancheti@tibco.com / Distribution on hold."*), pagination (Page 1/20), action icons (download, copy, edit, refresh). All inline — no new tabs.
2. **RC Admin (Management Center) → Job Log and Traces tab:** Still available in the admin console, but redesigned and nicer.

**Key insight:** Old version had 3 ways to see the same information, all disconnected and bare-bones. New version has 2 — both improved, both contextual. The scheduler path keeps users in-flow; the admin path is for system-level monitoring.

### ✅ Gap 2: Distribution Lists Before/After — FILLED

**Visual references:** Screenshots shared (Feb 18, 2026) — BOTH old and new.

**Old DL experience:**
- Opened in its own browser tab (separate from hub)
- Multiple nested dialogs with old Windows-style UI
- Main list view showing DL members in a cramped table
- "Add New Member" dialog with cryptic pattern options: Plain Text, Wildcard, Regular Expression
- Members added via small popup dialogs with "OK / Cancel" buttons
- "Select members" dialog box with tiny checkboxes
- Summary view showing member details
- Overall: felt like a 1990s Windows application

**Key issues:** Multiple dialog hops to add a single member. Cryptic pattern types. No inline editing. Every action required a separate popup.

**New DL experience (REDESIGNED):**
- "Create Distribution List" modal launches from the Hub (via + menu)
- **Step 1:** Clean icon cards for Distribution Methods (Email, FTP, Printer) with clear "+Add email" and "Import list" buttons
- **Step 2 — Add Email (Existing List tab):** Dual-pane member picker. Browse existing DLs on the left, selected members on the right. Checkboxes + arrow buttons to move between. Paginated (1/10). Shows Burst Value + Email columns.
- **Step 2 — Add Email (New tab):** Inline editable table with "+New email" button. Columns: Pattern (dropdown: Wildcard/Plain text/Regular expression/Other), Burst Value, Email. Edit icons per row — no separate popup needed.
- **Edit Email modal:** Modern email input with domain autocomplete (@cloud.com). Shows matching emails as suggestions. "To" field with removable chips for selected emails.
- **Full Create DL modal:** Shows method tab (Email selected), Pattern column with types, Burst Value, and email addresses. Edit pencil icon per row. Save button.
- Overall: everything happens inside one modal dialog. No new browser tabs. No nested popups. Inline editing. Modern patterns.

---

### ✅ Gap 3: Access Lists Before/After — FILLED

**Visual references:** Screenshots shared (Feb 18, 2026) — BOTH old and new.

**Old AL (Library Access List) experience:**
- Similar old Windows-style UI as DL
- Multiple nested dialogs and popups
- Small icons in a cramped toolbar
- Separate dialogs for adding members, setting permissions
- "Add new member" dialog, "Select members" dialog, permission configuration — all separate windows
- Overall: same fragmented, dialog-heavy pattern as DL

**Key issues:** Same as DL — too many dialog hops, cramped layouts, not integrated with the hub.

**New AL experience (REDESIGNED):**
- "ReportCaster - Create Access List" modal launches from the Hub (via + menu)
- **Empty state:** Clean people icon with "Add members to the access list" message + "+ Add member" button
- **Member table view:** Shows "Total members: 19", columns: Burst Value (e.g. FRANCE, ENGLAND), Member (with user/group icons). Edit pencil + delete trash toolbar buttons. Save button with dropdown.
- **Add Member — New tab:** Same inline editing pattern as DL. Tabs: New (4), Existing List (0).
- **Add Member — Existing List tab:** Dual-pane picker. Left: available members from existing library access lists with Burst Value + Member columns (groups like Administrators, Developers, RetailSamples/User1, etc.). Right: selected members. Arrow buttons to move between. Paginated (1/10).
- **Empty Existing List state:** "No existing access lists found in the library" with clean icon
- Same consistent modal pattern as DL — unified creation paradigm across all RC list types.

---

### ✅ THE + MENU — V3 BREAKTHROUGH (Visual confirmation)

**Visual reference:** Screenshot shared (Feb 18, 2026).

The + menu in the Hub header opens a "Start something new" dropdown organized by category:

| Section | Options |
|---------|---------|
| **Content** | Create Visualization, Assemble Visualizations, Compose Document |
| **Data** | Get Data, Get Data (Advanced), Create Data Flow, Create DBMS SQL Flow, Create Cluster Business View |
| **Discover** | Explore Data |
| **ReportCaster** | **Create Schedule**, **Create Distribution List**, **Create Access List** (highlighted) |

**This IS the breakthrough.** RC workflows sit at the same level as every other creation workflow in the platform. One click from the Hub. No buried menus, no separate tabs, no choosing Basic vs. Advanced. This was the V3 idea that got approved — and it fundamentally changed how users discover and interact with ReportCaster.

---

### ✅ Gap 4: Explorer Before/After — FILLED

**Visual references:** Screenshots shared (Feb 18, 2026) — BOTH old and new.

**Old Explorer:**
- Opened in its **own browser tab** — completely separate from the hub
- Accessed via hamburger menu in main product header
- Windows Explorer-style layout: folder tree on left, table on right
- Table columns: Title, Schedule ID, Path, Owner, Last Time Executed, Last Job Status, Next Run Time, Method, Destination Address, Priority
- Shows all workspace folders with schedule assets
- No connection to the hub's home view, recents, or favorites
- Felt like a standalone file browser from the early 2000s

**New Explorer (REDESIGNED):**
- Integrated directly into the Hub's Home sidebar as a dedicated "ReportCaster Explorer" view
- Sits alongside "Recently worked on," "Shared with me," "My Workspace," "Getting started," "Favorites" — same level of visibility
- Active state: highlighted in the left sidebar with blue accent
- **Header:** "ReportCaster Explorer" with RC badge icon
- **Filters bar:** Type (e.g. Distribution List), Owner (select), Last Modified (date picker), "+ More Filters," "Clear" — all inline
- **Folders section:** Horizontal folder cards (My Content, Personal Content, Provider, etc.)
- **Items section:** Card grid of RC assets (Embedded Img Test, Report to SFTP, url to repo, AHTML_map_schedule, etc.) with RC asset icons
- **View controls:** Sort by title, list/grid/detail view toggles, settings, refresh
- **Pagination:** "1-20 of 80" with items per page selector and page navigation
- Clean, modern hub-native design. Feels like a first-class citizen, not an afterthought.

---

### ✅ Gap 5: Admin/Status Before/After — FILLED

**Visual references:** Screenshots found in project (Feb 18, 2026) — full design evolution.

**OLD — Legacy Admin (`RC legacy admin status.png`):**
- Labeled "TIBCO WebFOCUS | ReportCaster" — felt like a completely separate product
- Massive ribbon toolbar with ~15+ action buttons crammed across the top:
  - Manage Server: Stop, Restart, Suspend, Server Log
  - Show: Server Status, Server Performance, Job Status, Job Log, Configuration, Blackout Periods, Execution IDs
  - Tools: Global Updates, Purge Job Logs, Purge Library, Delete Schedules
  - Actions: Unsubscribe Watch List Users, Refresh
- Server Status view showed distribution server info (Host:Port, Mode, Running/Queued counts)
- Services table (Cache Cleaner, Console, Dispatcher, etc.) with status and schedule counts
- Very technical, admin-heavy UI — not designed for discoverability
- Every function jammed into one flat ribbon with no hierarchy

**DESIGN EVOLUTION — 4 iterations explored:**

**V1.1 — Independent version (`RC - V1.1 - Independent version - Admin.png`):**
- Still standalone "ReportCaster" app, but ribbon eliminated
- Top tabs: Home, Schedule, Distribution List, Access List, **Status**, Explorer
- Left sidebar replaces ribbon: icon buttons for Server Status, Server Performance, Job Status, Job Log, Configuration, Blackout Periods, Execution IDs
- Action links (Server Log, Suspend, Restart) moved to top-right — cleaner
- Same Distribution Server info panel (Host:Port, Mode, Running, Queued)
- Improvement: organized hierarchy instead of flat ribbon. Still a separate app.

**V2.1 — Hub Integration (`RC Hub Integration V2.1 - Admin (Status).png`):**
- Fully integrated into the Hub — header reads "TIBCO WebFOCUS | Hub"
- "Report Caster" becomes a section within the Hub, not a separate app
- Left sidebar: Hub navigation icons (+ button, Home, content areas, calendar, people, search)
- Calendar icon highlighted = RC Status view active
- Tabs simplified to just "Home" + "Status"
- Same sidebar icons for admin functions (Server Status, Server Performance, Job Status, Job Log, Configuration, Blackout Periods, Execution IDs, Tools — added new "Tools" option)
- Added "Auto Refresh every 30 sec" + View Trace, Edit, Delete, View Trace toolbar
- Key shift: RC admin is now hub-native — no separate app to launch

**V2.2 — Two option variants explored:**
- **Option 1 (`RC Hub Integration V2.2 - Status - Option 1.png`):** Same Hub integration, but flattened sidebar icons into **horizontal sub-tabs** under Status: Job Status, Job Log, Blackout Periods, Execution IDs. Action toolbar (Auto Refresh, View Trace, Edit, Delete) sits below tabs.
- **Option 2 (`RC Hub Integration V2.2 - Status - Option 2.png`):** Kept sidebar icon pattern from V2.1, added "Tools" as new sidebar item. Same Home/Status tab structure. Server Log, Suspend, Restart, Stop actions in top-right.
- These variants explored whether admin sub-sections work better as sidebar icons vs. horizontal tabs.

**FINAL — Management Center (`ReportCaster Status (Admin).png`):**
- Moved to the platform's centralized **Management Center** (not the Hub itself)
- Left sidebar: Client Administration tree with Administration Console, **ReportCaster Console** (highlighted/active), Security Center, Private Resources, Import/Export Packages, White Labeling, Custom Sign in, Magnify Console + Server Administration section
- Top tabs within RC Console: **Configuration**, Job Log and Traces, Job Status, Server, Execution IDs, Blackout Periods, Tools
- Configuration view: tree structure — General > Servers > Email > FTP > Report Library > LDAP > Configuration Files. Items: Tasks & Distribution, Notifications, Zip Settings, Schedule Default Timezone
- Clean, professional admin interface — 1 click from Management Center sidebar instead of buried 3 clicks deep
- Admin functions properly belong in the admin center, not jammed into the end-user Hub

**Design insight:** The evolution shows the journey from "everything in one ribbon" → "organized sidebar" → "hub-native" → "proper admin center." The final decision separated concerns: end-user workflows live in the Hub (via + menu), admin/server management lives in Management Center. This was the right architectural call.

---

### ✅ RECURRENCE REDESIGN — Component Spec, Iterations & Final Implementation

**Visual references:** Screenshots shared (Feb 18, 2026) — 8 early dialog iterations + component spec sheet + 10+ final implementation screens.

**Old recurrence dialog:**
- Part of the legacy scheduler's "Basic vs. Advanced" paradigm
- Generic platform date/time pickers — not designed for scheduling use cases
- Limited frequency options, cramped layouts

**Phase 1 — Redesign exploration — 8 UI variations:**
Title: "Types of new recurrences dialog boxes but different user interfaces"
- All 8 share the same functional structure: Frequency selector (Run Once / Minutes / Hourly / Daily / Weekly / Monthly / Yearly / Custom), Start/End date-time pickers, day-of-week checkboxes, Advanced settings (Repeat schedule every X minutes/hours, Last For X hours/minutes, Enabled toggle)
- Variations explore: dark vs. light backgrounds, horizontal vs. vertical day checkboxes, inline vs. popup calendars, toggle button vs. radio button frequency selectors, compact vs. spacious layouts
- Some show calendar month grids inline; others use dropdown date pickers
- All include the Advanced Settings section with repeat interval and duration controls

**Phase 2 — Custom component spec sheet (designed from scratch):**

| Component | Details |
|-----------|---------|
| **Frequency dropdown** | "Every" dropdown with options: Once, On, Every. Blue highlight on selected. |
| **Unit dropdown** | Options: Minutes (highlighted), Hours, Days, Weeks, Months, Years. Blue accent on active. |
| **Day picker** | Monday dropdown → opens checkbox list: Sunday through Saturday. Checkboxes with blue checked state. |
| **Date and Time Selector** | Input field ("3/9/2023 - 9:30 AM") + calendar icon. Calendar picker: month/year navigation (< Jan ▼ 2019 >), full 7-column date grid (Su-Sa), selected date highlighted in blue circle (12th). Time inputs: 12h / 30m / AM spinners. Cancel + OK (blue) buttons. |
| **Time Zone Selector** | Shows "New York (EST)(UTC-5:00)" + arrow. Two tabs: Time Zones, Time Offsets (UTC). Country selector: "United States" dropdown. Scrollable city list: Adak, Anchorage, Boise, Chicago, Denver, Detroit, Honolulu, Indianapolis, Indiana/Marengo, Indiana/Petersburg, Indiana/Vevay. Cancel + OK (blue) buttons. |

**Phase 3 — Final Implementation (inside Hub — "Report Caster - Create Schedule" modal):**

All recurrence screens live inside the **Recurrence tab** of the Create Schedule modal. The modal sidebar shows: Task → Distribution → **Recurrence** (active, blue highlight) → Properties → Log Reports. This is the unified scheduler — no more "Basic vs. Advanced" choice.

**Every frequency mode documented:**

| Mode | Key UI | Natural Language Summary |
|------|--------|--------------------------|
| **Once** | "Schedule runs: Once" + single date picker + time zone. Simplest view — just a date, time, and timezone. Help icon (?) in top-right. | *"The schedule runs once on 9th March 2023 at 9:30am"* |
| **On (specific dates)** | "Schedule runs: On" + **multi-date chip input** showing removable date tags (1/3/2023 ×, 1/4/2023 ×, 1/5/2023 ×, etc.) + calendar icon to add more + "At" time picker (12h 30m AM) + Schedule repeats every + Time zone | *"The schedule runs on the dates (multiple dates) at 12:30 pm."* |
| **Every 5 Days** | "Schedule runs: Every 5 Days" + Start/End date-time + Schedule repeats every (Minutes dropdown) + Until time / Lasts for radio + Time zone | *"The schedule runs every 5 days starting from 5th September 2023 at 9:30 am and ending on 6th September 2028 at 6:30 pm."* |
| **Every 5 Hours on [Day]** | "Every 5 Hours" + "on:" **single day dropdown** (Monday) + Start/End dates + Time zone | *"The schedule runs every 5 hours on Mondays from 5th September 2023 at 9:30 am and ends on 9th December 2023 at 6:30 pm."* |
| **Every 5 Minutes on Multiple Days** | "Every 5 Minutes" + "On:" **Multiple Days dropdown** + Start/End dates + Time zone | *"The schedule runs every 5 minutes on Mondays, Tuesdays, Wednesdays, and Fridays from September 5th, 2023, at 9:30 am until December 9th, 2023, at 6:30 pm."* |
| **Every 5 Months** | "Every 5 Months" + two modes via radio: **"On dates"** (clickable date grid 01-31 with multi-select, highlighted dates: 05, 09, 11, 16, 22) OR **"On"** (ordinal dropdown: "The second" + day: "Sunday"). Also: "Last day of the month" checkbox + "X days before the month ends" option. Full advanced settings. | *"The schedule runs every 3 months on dates 01/02/2023, 02/02/2023 at 12:30 pm starting from 01/03/2023 until 01/03/2025."* |
| **Every 2 Years** | "Every 2 Years" + Start/End dates + Schedule repeats every + Time zone. Cleanest "every" view — no day/date selectors needed. | *"The schedule runs every 2 years starting from 5th September 2023 at 9:30 am and ending on 6th September 2028 at 6:30 pm."* |

**Progressive disclosure in action:**
- Selecting "Once" → shows only a single date field + time zone (3 fields total)
- Selecting "Every + Hours" → adds "on" day dropdown
- Selecting "Every + Minutes" → adds "On: Multiple Days" dropdown
- Selecting "Every + Months" → explodes into date grid (01-31) + ordinal selector + last-day-of-month options
- The form grows and shrinks based on what's actually needed — no upfront "Basic vs. Advanced" choice

**Validation states:**
- **Red error banner:** "The end date should always be equal to or greater than the start date." (dismissable ×)
- **Orange warning banner:** "Primary end date and end time would always precede secondary end time." (dismissable ×)
- Both are contextual, inline, and color-coded — appearing only when validation fails

**🔑 THE NATURAL LANGUAGE SUMMARY — Key UX Breakthrough:**
Every recurrence configuration displays a **bold blue summary sentence** at the bottom that translates the scheduling parameters into plain English. This was designed to solve a critical problem: enterprise users would configure complex schedules and have no way to verify what they'd actually set up. The sentence updates dynamically as the user changes parameters. Examples:
- *"The schedule runs once on 9th March 2023 at 9:30am"*
- *"The schedule runs every 5 hours on Mondays from 5th September 2023 at 9:30 am..."*
- *"The schedule runs every 5 minutes on Mondays, Tuesdays, Wednesdays, and Fridays from September 5th, 2023..."*
- *"The schedule runs every 3 months on dates 01/02/2023, 02/02/2023 at 12:30 pm..."*

This is progressive disclosure AND confirmation feedback in one pattern. The user can glance at the sentence and immediately know if their schedule is right — no mental math required.

**Design insight:** The component spec sheet and 8 early iterations show the depth of exploration. The final implementation shows every combination working inside a single unified recurrence tab. These custom components were designed specifically for the scheduling use case — the time zone selector with country → city drill-down, the frequency + unit dropdown cascade, the day-of-week checkbox picker, and the date grid for monthly scheduling all address the specific complexity of enterprise report scheduling. This is the level of component-level thinking that went into the redesign.

---

## QUICK TIMELINE REFERENCE {#timeline}

| When | What |
|------|------|
| Week 1 | Joined company. Zero domain knowledge. |
| Week 1 | Volunteered for RC. Director impressed, assigned immediately. |
| Week 3 | First kickoff meeting. The Room. |
| Week 3 | Got presentation + sandbox. That's it. |
| Month 1 | Joined Chris's CS team meetings weekly. Built network. |
| Month 1-2 | Investigation: hundreds of screenshots, 1:1s, mind maps |
| Week 6 | Mind map in Miro. Discovered 5 subsystems. |
| Month 2 | Started working on possibilities. |
| Month 2-3 | V1 (Independent) → Rejected. V2 (Plugin) → Rejected. |
| Month 3 | V3 Breakthrough — Modal-based workflows. |
| Month 3-4 | Reimagined scheduler (10+ iterations), DL, AL, recurrences, job log |
| Month 4 | Got approval. Onboarded lead architects. |
| Month 5 | Visual designs and tickets done. |
| Month 6 | Onboarded QA + Engineering teams. |
| Month 7 | Onboarded PM. |
| Month 8 | Onboarded first designer. |
| Month 12 | 250+ screens created. Niche workflows done. |
| Month 13 | Onboarded second designer. |
| Month 14 | Exited the team. |
| Month 18 | RC shipped (April 2024). |
| Month 28 | Joined RC team post layoffs. Continued improving. |
| Month 30 | Virtual User Group — customer PRAISE. :D :D :D |

---

## KEY PEOPLE

| Person | Role | Years at Company | Significance |
|--------|------|-----------------|-------------|
| Chris Kaplan | Gold Support TAM & Team Lead | 20 years | Primary source of truth. RC bible. |
| Yingchun Chen | Principal System Software Engineer | 35+ years | Original RC engineer. Second knowledge hub. |
| Dave Pfeiffer | Director of Design | — | Anu's manager and mentor. Daily 1:1 calls. Built her confidence. |
| Head PM | Head of Product Management | 15 years | Surface-level RC knowledge. Managed PM team. |
| Backend Lead | Lead Backend Engineer | 30+ years | "Very important man" for WebFOCUS. |
| Lead Architect | WebFOCUS Lead Architect | 40 years | Approved V3 architecture. |

---

## TESTIMONIALS

**Yingchun Chen, Principal System Software Engineer:**
> "She impressed everyone with how quickly she grasped all aspects of a highly intricate system and translated that understanding into a clear, modern, and user-centered design."

**Dave Pfeiffer, Director of Design:**
> "Anuja brings energy and determination to tackling complex design challenges. She approaches her work with a fearless attitude and is never afraid to explore new ideas."

---

*End of master content document.*
