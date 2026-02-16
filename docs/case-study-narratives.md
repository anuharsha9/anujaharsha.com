# Case Study Narratives — Raw Reference
> **Purpose:** This document preserves the detailed personal stories, collaboration specifics, design decisions, and emotional beats shared by Anuja for all three case studies. It serves as the canonical source of truth for case study content — use it when refining copy, building new components, or onboarding anyone to the project narrative.

---

## Table of Contents
1. [ReportCaster](#reportcaster)
2. [ML Functions](#ml-functions)
3. [IQ Plugin](#iq-plugin)
4. [Cross-Cutting Themes](#cross-cutting-themes)

---

## ReportCaster

### Origin Story — "One Week In"
- One week into joining the company, her design director mentioned a legacy scheduling tool in the pipeline — something old, massive, and untouched for decades.
- He hadn't assigned it to anyone yet. No designer had taken it. No engineer wanted to own it. No PM had a roadmap for it.
- Anu said, "I'll do it." He gave it to her the same day.
- The system was 40+ years old, powered millions of automated jobs, built on extremely legacy code, and had **zero documentation**.
- About 200 people were in the business unit. Everyone knew ReportCaster existed — they knew it was "a scheduling tool." That's it.
- The only people who truly knew it were the support team and one engineer who had written RC code in the 80s and 90s and was still with the company.
- The Head PM had 15 years in the org but only knew RC at a surface level. The director of design had never seen it.
- The "redesign" was originally stated as a **UI makeover — not even a redesign**.
- There was literally no documentation at all. She had a sandbox. And that was it.

### Discovery Process — Building a Knowledge Network
- **Chris Kaplan** — Gold Support Technical Account Manager and team lead. Became Anu's primary source of truth.
  - She embedded herself in his team meetings.
  - Asked relentless questions: What works? What doesn't? What hurts? Which issues take the longest to solve? What are users not able to get done? What features suck? Which customer issues take longest to resolve?
- **Yingchun Chen** — Principal engineer and **the original engineer of ReportCaster**. Second knowledge hub.
  - Between Chris and Yingchun, she could reconstruct decades of tribal knowledge that had never been written down.
- Took hundreds of screenshots across every corner of the system. Grouped them. Mapped them. Created mind maps, pain point analyses, and information architecture diagrams.
- Validated everything with customer support and customer reps — over and over — until she was confident she understood the system end-to-end.
- **Key insight:** ReportCaster wasn't a "feature." It was a **product inside a product** — with five independent subsystems, customers running 13 million schedules a day, and users whose entire job was to live inside RC. This needed a structural redesign, not a UI facelift.

### Three Architectural Pivots

#### V1: Independent Product → Rejected
- She was confident about V1 — had scored WebFOCUS against competitors and designed a standalone RC product that matched existing platform patterns.
- V1 rejection stung. But the feedback was fair: leadership wanted all workflows centralized in the hub.

#### V2: Hub Plugin → Rejected
- V2 was her **favorite version** — a hub plugin with integrated navigation and consolidated subsystems.
- It aligned perfectly with the platform's long-term direction.
- But it got rejected too: too much engineering effort for that year's timeline.

#### V3: Modal-Based Architecture → Shipped
- Two rejections in. Instead of fighting, she reframed the problem from scratch.
- Stopped asking "Where should RC live?" and started asking: **"How does the platform WANT workflows to behave?"**
- That's when she saw the pattern: Every major workflow starts in the plus (+) menu: create visualization, fetch data, explore data. This menu wasn't just UI — it was platform architecture.
- If ReportCaster is fundamentally a creation workflow, why isn't it initiated from the + menu?
- That insight changed everything: Create Schedule → modal. Create Distribution List → modal. Create Access List → modal.
- The modal approach worked within the existing legacy code without a rewrite.
- When both UX and engineering won, leadership was absolutely thrilled and said yes.

### Schedule Dialog — Obsessive Iteration
- The schedule dialog itself went through **at least two dozen iterations**.
- Getting approval from the WebFOCUS lead architect (40 years at the company), the Head PM, and the Director of Design simultaneously was a task in itself.
- Every single detail was carefully crafted keeping the entire WebFOCUS design system, the platform ecosystem, legacy code constraints, and original workflows all in mind.

### The Natural Language Recurrence "Aha Moment"
- She was configuring a recurrence pattern and tried to read the schedule out loud — "Runs Monday to Friday at 6:00 PM, recurring every week."
- She thought: why not just show that at the bottom? What better UX is there than letting users read their schedule like a sentence?
- Product management gave instant approval.
- When she pitched the natural language summary to the lead engineer, he said **"YEAH"** — and from that moment, he became her biggest cheerleader on the RC team.

### Team Onboarding & Knowledge Transfer
- Once the direction was approved, the next challenge: onboarding everyone.
- The lead architect, lead engineer, a full engineering squad, the new PM, QA, documentation — most of them had **never truly seen ReportCaster end-to-end**.
- She ran dozens of demos. Walked through legacy flows, explained what users had hacked to survive, translated tribal knowledge into understandable UX rationale, and clarified legacy behaviors that couldn't be broken.
- She was simultaneously working on ML Functions — managing both projects while having a 1-year-old at home.

### Getting Help — Designer Onboarding
- She realized she needed help. There were 3 other designers on the team, all working on one feature. She was working on **two features simultaneously** — that said something about the trust leadership had in her.
- Borrowed one designer first, at month 9. Onboarded a second at month 13.
- By then, she had already finished the schedule workflow, distribution lists, and access lists. The architecture for explorer and admin was set.
- Had everything ready for knowledge transfer: workflows, maps, scratchpad documents, initial notes, dozens of recorded meetings, annotated Sketch files, and delegation plans.
- Also onboarded the new PM who was transitioning under the Head PM.

### Mentorship & Growth
- Her director of design mentored her through all of this with **daily 1:1 calls**.
- He built her confidence and backed her up when she needed it.
- She was in rooms full of senior engineers who'd worked for decades — and by the time she left the team, they'd become family.
- They respected her opinion. She was the youngest in the room with an unspoken authority on the experience of RC.
- She remained point of contact for about **6 months after exit** — the other designers reached out regularly until they didn't need her anymore.

### Emotional Beats
- V1 rejection **stung**.
- V2 was her **favorite** — losing it hurt.
- V3 breakthrough felt like vindication — UX and engineering both won.
- The natural language recurrence moment — pure design joy.
- The lead engineer's "YEAH" — turning a skeptic into a cheerleader.
- A long-time customer praising the redesign at a Virtual User Group session she hosted.

### Reflection
- RC was not just a redesign. It was a turning point.
- Through RC, she learned to think in platform patterns, redesign at architecture scale, interpret undocumented logic, and operate like a product owner when needed.
- **"RC made me the design leader I am today."**
- Biggest regret: The embedded Explorer view — it would have expanded the filtered-view pattern to Designer, Reporting Server, everything.

---

## ML Functions

### Growth Story — MIT Certification
- Zero ML background could have been a liability — instead, it became an advantage.
- Enrolled in **MIT's AI/ML product design certification** — self-funded, $3,000 cost.
- Did it for resume value AND genuine learning.
- The course connected her to concepts the Principal Data Scientist was discussing — it gave her the vocabulary to participate meaningfully.

### The 6-Month Embedding with the Principal Data Scientist
- **Marcus Horbach** — Principal Data Scientist. Weekly sessions for months.
- The embedding wasn't formal training — it was collaborative learning:
  - Learning ML concepts (what's a confusion matrix, what do these metrics mean, when is a model "good enough")
  - Discussing improvements to the existing workflow
  - Talking about user experience from a data science perspective
  - Receiving validation that her design instincts were sound
- By the time she started designing, she understood the domain deeply enough to **challenge assumptions and ask the right questions**.

### Collaboration on the Confusion Matrix
- The confusion matrix screen alone went through **10+ iterations**.
- The Principal Data Scientist pushed for advanced metrics; she pushed for clarity.
- That productive tension produced what he called **"the best screen in the entire UX revamp."**
- She was balancing data scientist needs with amateur learning — making something that satisfied experts while remaining accessible.

### Challenging Assumptions
- She pushed back against assumptions:
  - Example: Preventing model selection on incompatible datasets. The assumption was that users would know which model types work with which data. She insisted on upstream validation — don't let users get to step 3 only to fail.
  - This became the "Upstream Validation" UX principle.

### Three Personas with Conflicting Needs
- **Data scientists** wanted depth and control over hyperparameters.
- **Business users** wanted simplicity and guidance.
- **Analysts** wanted both.
- The existing experience served none of them well.
- Key insight: "If I find this frustrating after weeks of study, a first-time user has no chance."

### The 4-Step UX Spine
- She asked the Principal Data Scientist: "What do you absolutely need to train a model responsibly?"
- His answer: problem type, target variable, predictors, and hyperparameters.
- That became the 4-step UX spine — a linear flow that made ML accessible without dumbing it down.

### Dual-Experience Approach
- Emerged from engineering constraints — couldn't rebuild the advanced mode.
- It had to coexist with the new guided flow.
- What felt like a limitation became a feature: experts got their power, newcomers got guidance.

### January 2025 Layoffs Impact
- Layoffs hit in January 2025.
- She took on additional responsibilities — RC, WebFOCUS Designer — while managing a newborn.
- The emotional impact included:
  - Increased responsibility
  - Protectiveness of her work
  - A realization of her **unique product understanding** compared to others
  - She was one of the few people who understood the full ecosystem

### Cross-Project Pattern Sharing
- Due to the platform's integrated nature (WebFOCUS Designer, Data Flow, ML Functions, ReportCaster, NLQ, Insights), design patterns are inherently shared and consistent across features.
- It's not a direct transfer from one specific project to another — it's that the platform is a single ecosystem and patterns must be consistent.
- The structured flows, upstream validation, right-click entry, and dual-experience patterns from ML became the foundation for IQ Plugin.

### SME Validation
- 5/5 SMEs found the entry point without help during testing.
- Dead-ends were replaced with clear guidance.
- Design demos to 150-200 person business unit earned leadership support.

### Key People
- **Marcus Horbach** — Principal Data Scientist: "The clarity of her designs, in spite of the underlying data science and machine learning complexity, is impressive and has greatly contributed to the success of our products."
- **Anita George** — Principal Account Tech Strategist: Observed Anu navigating the screen during UAT. "Her design was clean, intuitive, and clearly addressed the needs of users across different skill levels."

---

## IQ Plugin

### Origin Story — Co-Created Vision
- This wasn't assigned — it was **invented**.
- Strategic discussions about consolidating product lines raised a question: what if we created a central IQ Hub that unified all of WebFOCUS's data science capabilities?
- **Karishma** (PM) and Anu started brainstorming together.
  - Met 3-4 times a week across timezones — Karishma in India, Anu in the US.
  - Mapped user journeys and personas in FigJam.
  - Anu built dozens of concept mockups exploring what a unified Hub could look like.
- When they pitched the concept to their Director of Design, he started sketching his own ideas — that's how compelling the vision was.
- Eventually, the VP approved it, and Karishma and Anu were given ownership to execute.

### The Problem — Feature Invisibility
- WebFOCUS had three powerful data science features:
  - **NLQ** (ask questions in plain English)
  - **Insights** (auto-generated visualizations)
  - **ML** (predictive model training)
- All shipping. None legacy. But they were **invisible** — buried in different menus with different entry points.
- Less than 5% adoption despite high capability.
- Customer feedback from support reps, PMs, and leadership all confirmed: users didn't know these features existed.
- **The problem wasn't quality — it was discoverability.**

### Battles with Veteran Architects
- Every element was a battle:
  - The Lead Architect of IQ Plugin had been at the company for **over 20 years**.
  - The Lead Architect of WebFOCUS itself — **over 35 years**.
  - They were cautious about new design elements, let alone an entire embedded Hub.
  - It was a tug of war for everything: the navigation bar with large tiles, the "Get Started" panel, the unified entry point.
- Anu defended each decision with industry examples, interaction logic, and visual prototypes.
- Her Director of Design was fully in her corner — trusting her to make her own case.

### Cross-Functional Coordination
- IQ Plugin needed alignment from the Hub team, other PMs, and engineering teams that had never collaborated.
- She drove most of that alignment herself — creating meetings, nudging stakeholders, setting up sessions that nobody else was initiating.

### The "Room Full of Seniors" Moment
- A defining meeting for IQ Plugin and ML — she found herself across from:
  - The Director of Engineering
  - The Principal Data Scientist
  - The Head PM
  - The Lead Architect
  - The Director of QA
- They were discussing whether a data flow step belonged in the ML workflow.
- She was two years into the company. Everyone else had been there for decades.
- It hit her afterward: **she wasn't just the designer in the room — she was driving the conversation.**

### Design Evolution Details
- **Navigation bar fight:** The large-tile navigation was contentious — veteran architects preferred traditional navigation. Anu defended it with platform pattern analysis and usability rationale.
- **"Get Started" panel pivot:** Originally designed as a detailed onboarding wizard; pivoted to a simpler "Get Started" panel that surfaces the most common actions without overwhelming new users.
- **Illustrated empty states:** Used custom illustrations for empty states to guide users — instead of a blank screen, users see what they could do next.

### Handoff & Maternity Leave (Softened Tone)
- When she transitioned off the project, she made sure the foundation was solid: documentation, recorded walkthroughs, 1:1 knowledge transfers, and annotated design files.
- The architecture was strong enough to carry forward.
- The engineers later told her they missed the rapport and the design partnership they'd built together.
- **Note:** This is shared softly — it's not about ego, it's about the working relationship.

### UX Principles (Filled In)
1. **Unified Entry Point** — Three separate tools buried in different menus became one DSML Hub. Users no longer need to know which tool to use — they just describe what they want to do.
2. **Progressive Disclosure** — Business users see out-of-the-box results first. Advanced users can access hyperparameters, custom prompts, and configuration — but only when they choose to.
3. **Contextual Onboarding** — Each workflow includes a "Get Started" panel with inline guidance. No separate tutorial needed — learning happens inside the tool itself.
4. **Consistent Interaction Patterns** — Navigation tiles, cards, and entry points follow the same pattern across NLQ, Insights, and ML. Learn one, know all three.
5. **Responsive by Default** — Every screen adapts from desktop to tablet. The Hub was designed for embedded contexts (like IQ Plugin inside Designer pages), not just standalone use.
6. **Error Prevention Over Error Handling** — If a dataset doesn't support NLQ, we tell the user before they try. Upstream validation prevents frustration at every step.

### Unrealized Vision
- Proper tutorials and onboarding flows — never got full green light.
- NLQ as a chat interface for WebFOCUS itself (step-by-step workflow guidance).
- Connecting ReportCaster and IQ (schedule generated insights automatically).
- These remain opportunities for the platform.

---

## Cross-Cutting Themes

### Personal Brand Pillars
- **Complexity Architect** — Takes undocumented, fragmented, legacy systems and creates clear, unified architectures.
- **Design Engineer** — Comfortable in code, comfortable with engineers, comfortable with ambiguity.
- **Initiative & Ownership** — Volunteers for hard projects. Takes things on that nobody else will.
- **Influence Without Authority** — Drives decisions in rooms full of people decades more senior.
- **Growth Mindset** — MIT certification, embedding with domain experts, learning ML from scratch.

### Recurring Emotional Beats
- The "I'll do it" moment (RC volunteering, IQ Plugin co-creation)
- Rejection and resilience (V1/V2 rejections in RC)
- The "aha moment" (natural language recurrence in RC, 4-step spine in ML)
- Earning respect from veterans (RC lead engineer, IQ Plugin architects)
- Bittersweet transitions (engineers missing her, remaining as knowledge hub)
- **The retrospective realization:** Throughout her years at CSG, she always felt like she wasn't good enough — kept pushing herself to improve, do more, do better, all while raising two little humans. It was only after leaving CSG that she realized what she had actually achieved and learned, and what she was truly capable of. This is NOT imposter syndrome as a trope — this is authentic context. The portfolio should let the work speak for itself.

### Collaboration Style
- Embeds with domain experts (Chris Kaplan, Yingchun Chen, Marcus Horbach)
- Asks relentless questions
- Creates her own documentation when none exists
- Runs demos and walkthroughs proactively
- Mentored by her Director of Design through daily 1:1 calls

### The DI Merger Context
- Keep vague in all copy. There were "strategic product consolidation talks" — don't name the merger directly.

### Platform Ecosystem
- WebFOCUS is an integrated platform: Designer, Data Flow, ML Functions, ReportCaster, NLQ, Insights, IQ Plugin.
- Design patterns must be consistent across all features — they're not separate products, they're one ecosystem.
- What she designed for one feature inherently informed the others.

### Work Context During Projects
- Managing multiple enterprise projects simultaneously (RC + ML + IQ)
- Having a young child at home during this period
- Layoffs in January 2025 adding additional responsibilities
- Being one of the few people who understood the full ecosystem

---

## Gap-Filling Details (Feb 2025)

### IQ Plugin — Navigation Bar Visual Details
- **There was NO navigation before** — IQ Hub was created entirely from scratch.
- The navigation tiles use **custom icon glyphs** designed specifically for each workflow:
  - `ds-icon-discover` → Discover: "Explore how IQ helps you analyze and act on data—smarter."
  - `ds-icon-insights` → Insights: "Reveal patterns and trends with instant visual insights."
  - `ds-icon-nlq` → Ask a Question: "Use natural language to ask and get visual answers."
  - `ds-icon-predict` → Predict Data: "Apply ML models to forecast trends and outcomes."
- **Rest state:** Transparent background, icon + title + description with blue underline accent.
- **Hover/Selected state:** `primary-color-lite` background fill, same icon/title/description layout.
- **Architects' alternative:** Traditional sidebar with a list view as navigation — like the WebFOCUS home page. No visual differentiation between workflows.
- **Anu's argument:** The large tiles provided scannability, visual hierarchy, and made each workflow feel like a distinct capability rather than a menu item. It also aligned with the "discoverability" problem — buried list items are exactly what caused <5% adoption.

### IQ Plugin — Concept Evolution (4 Stages Visible)
- From the screenshot labeled "IQ Plugin Concept Evolution," four distinct concept stages are visible:
  1. **Concept 1:** Tabbed interface with visualization-heavy layout — classification metrics chart prominently displayed, sidebar with model list
  2. **Concept 2:** "What are Insights?" educational layout — large hero image, icon tiles below for navigation, instructional copy
  3. **Concept 3:** Split layout — left sidebar with feature list, right panel with "What are Insights?" hero, modular card sections below
  4. **Concept 4:** Clean wizard-style — "What is Predict Data?" header, step-by-step explanation, icon tiles for related workflows
- Evolution shows a clear progression from **data-heavy dashboards → educational/onboarding approaches → clean modular layouts**.

### ML Functions — Predict Data Landing Page (NEW)
- **There was NO Predict Data landing page** in the original ML workflow — it was a very broken workflow to even begin training a model.
- To increase adoption and discoverability, a landing page to start model training was a must.
- **Landing page capabilities:**
  - Select or change a dataset
  - Show both Run and Train model options
  - Show existing models for the dataset:
    - Models previously trained on the dataset
    - Models available to run on the dataset
- **The Train/Run Tab Split:**
  - Initially had everything on a single display
  - Engineering said: "It's too confusing — code-wise it's also difficult to manage and achieve"
  - Eventually split Train and Run into **2 tabs** on the landing page
  - Took brainstorming to get there: clean UX and easy decision-making vs. engineering requirement of separating run and train model
- **Model Cards (Innovation):**
  - Model display originally used **tables** — very dense, hard to scan
  - Needed a better way to show models that would enhance decision-making in picking the right model to run or compare models
  - Anu introduced a **model card** pattern instead of tables
  - Iterated on the model card with the Principal Data Scientist and Director of Design:
    - Data Scientist ensured the right details appeared for informed decision-making
    - Director of Design ensured design system compliance (she was still new — less than a year at the org)

### ML Functions — Confusion Matrix Final Screen
- **Threshold slider:** A slider ranging from 0.0000 ("Favors recall") to 1.0000 ("Favors precision")
  - Current threshold and F1-optimal threshold displayed
  - Users can drag the slider to see how changing the threshold affects predictions
- **Three-panel layout:**
  1. **Classification-metrics per threshold (line chart):** Shows Accuracy, Precision, Recall, F1-score curves as threshold changes
  2. **Confusion Matrix (center):** True Positive, True Negative, False Positive, False Negative grid — shown for both current threshold and F1-optimal threshold
  3. **Classification-metrics (bar chart):** Side-by-side comparison of Current Threshold vs. F1 Optimal Threshold across Accuracy, Precision, Recall, F1-score
- **Explanation section above:** Detailed text explaining what P/N, TP/FP/TN/FN mean, with formulas for Accuracy, Precision, Recall, F1-score
- **Model sidebar (left):** Lists all trained models with AUC scores (Logistic Regression, K-Nearest Neighbors, Random Forest, Extreme Gradient Boosting, Neural Networks)
- **Tab navigation (top):** ROC Precision/Recall, Classification Metrics/Confusion Matrix, Predicted Probabilities, Feature Importances, Learning Curve, Fitted Values, Training Log
- **Key design insight:** The "meeting in the middle" wasn't about a single screen compromise — it was about the entire Predict Data experience: creating the landing page, splitting Train/Run, introducing model cards, and then this multi-panel confusion matrix view that satisfies both data scientists (threshold control, AUC scores, all metrics) and business users (visual charts, clear explanations, side-by-side comparisons).

### Launch Status (Critical for Portfolio Framing)
- **ReportCaster:** ✅ Shipped April 2024. Live in production. Powering 20M+ weekly schedules.
- **IQ Plugin:** ⏳ Pre-launch. Expected to launch sometime in 2026. No adoption data available.
- **ML Functions:** ⏳ Pre-launch. Has not launched yet. No adoption data. Success evidence is from SME testing (5/5 found entry without help) and the Principal Data Scientist's endorsement.

### January 2025 Layoffs — Confirmed Details
- **Date is confirmed: January 2025.** This is correct, not a typo.
- Impact was NOT about reducing ML scope or cutting features.
- Impact was about **taking on additional projects** — RC, WebFOCUS Designer — on top of existing work.
- She was juggling RC, IQ Plugin, and Designer all at once.
- **Workload management response:**
  - Created daily trackers, weekly trackers, ticket trackers — all in Slack
  - Shared with her manager and Director of Design so they never had to wonder what she was up to or where she was at
  - They always knew her whereabouts and work progress
  - "Workload prioritization was mandatory."

### Designer Onboarding Methodology (RC)
- **Assets created:** Google Docs, Zoom recordings, Sketch files
- **Delivery method:** A huge Google Drive folder with everything needed to understand the system
- **Cadence:** Weekly sessions for weeks
- **Structure:** One topic of RC per week — handled week by week
- **Session types:** Walkthroughs, legacy teardowns, design reviews — all of the above
- **Duration:** Continued until the designers were self-sufficient (roughly 6 months of being available as POC after exit)

---

## Original Long-Form Case Study Narratives (Feb 2025)

> **Purpose:** These are Anuja's original full-length case study write-ups — the raw storytelling versions she authored herself. They complement the structured notes above with richer narrative flow, problem framing, and reflection.

---

### IQ Plugin — Full Narrative

The IQ Plugin was a defining project in my role as a UX/Product Designer, challenging me to create a powerful yet intuitive experience for users interacting with advanced data science and machine learning (DSML) capabilities. My goal was to ensure that WebFOCUS IQ could meet the needs of diverse users, from business analysts to data scientists, by offering an accessible, streamlined interface. This case study outlines the journey, challenges, and impact of building the IQ Plugin.

**Problem Statement & Goals**

The development of the IQ Plugin was driven by a need to centralize and improve the discovery of DSML features within the WebFOCUS ecosystem. Key goals included:

- **Competitive Advantage:** Enable organizations to gain a competitive edge by leveraging DSML for tasks such as customer segmentation, demand forecasting, fraud detection, and personalized recommendations.
- **Market Alignment:** Align WebFOCUS IQ with market trends, integrating features like Automated Insights, Natural Language Query (NLQ), Predict Data, and a centralized Discover Page.
- **User Adoption:** Ensure that users could easily adopt the IQ features, reducing the need for extensive training and support.
- **Feedback Loop:** Establish a continuous feedback loop with users to refine and improve the DSML features.

**Target Users**

- **Technical Business Users:** Users familiar with data manipulation and analysis, seeking tools to streamline predictive analytics and machine learning processes.
- **Non-Technical Business Users:** Users requiring simple, guided workflows to derive insights without advanced data science knowledge.

**Research & Competitive Analysis**

To develop an effective IQ Plugin, I conducted competitive research into existing DSML features in other leading analytics platforms:

- **Power BI:** Integrated with Azure Machine Learning for predictive analytics, emphasizing ease of access to ML models within dashboards.
- **Tableau:** Enabled Python and R script integration for custom analytics, providing powerful capabilities at the cost of complexity.
- **QlikView/Qlik Sense:** Offered built-in predictive analytics but had a steep learning curve.

These insights guided the approach for the IQ Plugin: to create an experience that was feature-rich like Power BI and Tableau, but with significantly improved ease of use for non-technical users.

**Ideation & Concept Development**

The concept for the IQ Plugin evolved through extensive ideation and iteration:

- **User Journey Mapping:** Created distinct user journeys for technical and non-technical users. This allowed me to ensure that both advanced and casual users had meaningful and satisfying experiences.
- **Wireframes & Prototypes:** Developed wireframes that mapped out key workflows, focusing on providing users a centralized place to access all DSML capabilities, from Automated Insights to Predict Data.

**Design Approach**

- **User-Centered Design:** A key focus was keeping both user personas in mind—balancing the needs of technical users with non-technical users. The design provided an inclusive experience, enabling users of all backgrounds to leverage advanced data capabilities without feeling overwhelmed.
- **Iterative Design:** Throughout the design process, I adopted an iterative approach, creating prototypes and gathering feedback through usability testing. This iterative loop allowed the team to refine each component, from Automated Insights to NLQ and Predict Data, based on real user input.
- **Balancing Complexity:** Balancing the complexity of advanced analytics for technical users with an approachable design for non-technical users was essential. I incorporated educational elements like tooltips, prompts, onboarding guides, and detailed Discover Pages to help users explore features comfortably.

**Design Process**

- **Wireframing & Prototyping:** The design started with basic wireframes, which helped establish key workflows. These were later turned into high-fidelity prototypes, tested with representative users.
- **Usability Testing:** Multiple rounds of usability testing were conducted with both internal stakeholders and target users. The feedback helped refine the NLQ and Predict Data features to ensure their usability for diverse user types.
- **Stakeholder Engagement:** Regular collaboration with the Product Manager, engineering, and QA teams was essential in refining the design. I onboarded new team members as the project expanded, ensuring they understood the design goals and user needs.

**Final Solution**

The IQ Plugin was developed as a set of four key components, each with a specific focus on simplifying advanced analytics:

1. **Automated Insights:** Provided instant insights from datasets, allowing users to make informed decisions without needing to write queries.
2. **Ask a Question (NLQ):** Allowed users to interact with their data using natural language, making it easy for non-technical users to explore data without SQL knowledge.
3. **Predict Data:** Enabled users to perform predictive analytics seamlessly within WebFOCUS, providing technical users with options to customize models while guiding less experienced users through the process.
4. **Discover Page:** A centralized hub that provided an overview of the features, sample data, community links, help articles, and YouTube videos, ensuring users had all the resources they needed.

**Challenges & Solutions**

- **Complexity vs. Simplicity:** One of the core challenges was designing a tool that offered deep functionality while remaining simple. The solution was to provide guided user experiences, step-by-step workflows, and educational resources to reduce the learning curve.
- **Engaging a Broader Audience:** Ensuring the product was appealing to both technical and non-technical users required numerous iterations and feedback loops. I leveraged detailed user journeys and scenario-based testing to find an effective balance.

**Impact & Outcomes**

- **Internal Usability Tests & Feedback:** Internal usability tests and customer feedback on the UI have been tremendously positive. The IQ Plugin has been well received by users for its ease of access and functionality, with many appreciating the streamlined experience for accessing DSML tools.
- **Positive Feedback in Virtual User Groups:** The early preview of the IQ Plugin was well received in Virtual User Groups, with users expressing excitement over the centralized and intuitive approach to data science features.
- **Reduced Learning Curve:** By incorporating educational elements and simplifying the workflows, we ensured that the learning curve for IQ features was minimal. Both technical and non-technical users found the interface approachable, even those who were new to DSML.

**Reflection & Learnings**

Reflecting on the IQ Plugin project, I am most proud of how we created a cohesive and intuitive experience for a diverse user base. The biggest takeaway from this project was the value of involving users throughout every stage of design—from initial research to final usability testing. This user-centered approach ensured that the product was both powerful and accessible.

Another key learning was the importance of balancing complexity and simplicity. For technical users, we retained the depth they needed, while non-technical users benefited from an intuitive interface that walked them through each process. The project reinforced the idea that great design is about empowerment—giving users the confidence and tools to achieve their goals with ease.

The IQ Plugin project exemplifies my skills in leading complex design initiatives, collaborating with cross-functional teams, and delivering user-centered products that balance advanced capabilities with intuitive design. This project, more than any other, showcased the importance of empathy in designing technology that works for everyone, from data scientists to everyday business users.

---

### ReportCaster — Narrative Story Version

**NARRATIVE STORY BY ANUJA HARSHA NIMMAGADDA**

When I joined the WebFOCUS team, I didn't walk into a shiny new greenfield product. I walked into a forest.

Hidden in that forest was ReportCaster — a 30-plus-year-old scheduling tool quietly powering millions of reports for enterprise customers. It wasn't on the homepage. It wasn't in the sales deck. But if you talked to anyone who'd been around long enough, they'd say: "Oh, if ReportCaster breaks, the business stops."

The UI looked like it had time-traveled from a Windows 95 screenshot. The workflows were scattered across different tools. The people who truly understood it lived in support, in engineering, and in long email threads — not in any product spec.

There was no PM deck, no Figma file, no documentation. Just a critical, legacy product… and a lot of pain.

Two weeks into my role, I raised my hand and said: "I'll take this."

That was the beginning.

**Walking Into the Dark: No PM, No Doc, Just a Critical Tool**

On paper, this was not a safe project to volunteer for. There was no dedicated PM for ReportCaster when I started. No UX baseline, no previous designer to inherit from. Zero up-to-date documentation — most of what existed was stale or purely technical.

The tool lived partly inside the WebFOCUS ecosystem and partly in its own aging UI, with workflows that jumped across multiple environments.

It really did feel like walking into a dense forest at night, with a flashlight whose battery might or might not be dying.

So I started with the only thing that made sense: "If I can't read the product, I'll read the people."

I booked time with:
- Long-time engineers who had lived with this codebase for decades
- Support engineers who handled "fire drills" when something broke
- Internal power users who had built entire workflows on top of ReportCaster
- Product stakeholders who were hearing "we need a more modern scheduler" from customers but didn't know what that actually meant in UX terms

My goal wasn't to ask, "What do you want ReportCaster to look like?" My goal was to understand, "Why do you still rely on this thing, despite how painful it is?"

**Meeting the People Behind the Schedules**

As I talked to teams and customers, three clear personas emerged — not from a template, but from patterns in conversations:

- **Business Analyst:** Wants to schedule recurring reports quickly. Doesn't care how "clever" the system is, just wants it to work. Overwhelmed by cryptic terminology and dense forms.
- **IT Administrator:** Watches thousands of schedules, jobs, and failures. Needs visibility and control, not surprises. Uses workarounds and tools outside the product to track things.
- **Power User:** Knows every quirk and workaround. Can weave together complex distribution rules and dependencies. Nervous that "modernization" will strip away control.

One thing was unexpectedly consistent: Nobody defended the UI. Everybody defended the reliability.

That changed the design brief in my head. This wasn't "Let's make it pretty." It was "Let's modernize how it feels without breaking how it works."

At the same time, I benchmarked Power Automate, Tableau Scheduler, Qlik NPrinting, and others. They offered sophisticated flows but often assumed a level of technical comfort many analysts didn't have.

That was our opportunity: match the power, dial down the intimidation.

**The Real Problem: Not Just the UI, but the Journey**

Once I mapped the existing journey, the problem came into focus. To schedule a single report, a typical user might:
1. Right-click an asset in the Hub
2. Launch an external ReportCaster UI in a new tab
3. Navigate multiple forms and dialogues
4. Configure time, format, recipients, and distribution rules
5. Save, go somewhere else, and then hunt for that schedule later

It could easily take 10–15 clicks across 3 different tools. If you didn't already know where everything lived, it felt like playing UI treasure hunt.

From a UX standpoint, this translated to:
- Fragmented entry points
- Zero sense of "home" for scheduling
- Mental model mismatch between how users thought and how the system was structured

So I rewrote the problem for myself: "How do we bring scheduling home to the Hub, reduce the cognitive burden, and still respect the complexity power users rely on?"

**Setting the Strategy: Bring It Home to the Hub**

I framed the strategy around four pillars:
1. **Embed scheduling in the Hub** — No more jumping to an external legacy interface. The Hub is where users think, plan, and act — scheduling should live there too.
2. **Turn forms into guided flows** — Old ReportCaster was a wall of fields. I replaced that with a step-based, guided journey showing only what mattered at each step.
3. **Design for both beginners and pros** — New users should feel guided. Power users shouldn't lose reach or control.
4. **Anchor everything in a modern design system** — This wasn't a facelift. It was a chance to align ReportCaster with the evolving WebFOCUS design system and accessibility standards.

This strategy became the lens we used to say "yes" or "no" to ideas — repeated in stakeholder reviews, engineer syncs, and design critiques.

**Process: Unraveling the Old, Designing the New**

*1. Mapping the Forest*

The first phase was painful and necessary. I walked through the old product screen by screen and noted what each control did. I traced how many clicks it took to complete common tasks. I captured edge cases — failure states, edit flows, distribution quirks. It wasn't glamorous. It was forensic.

From that, we built a current-state workflow map — how a schedule was created, updated, monitored, and debugged.

Whenever someone said, "It's not that bad," I could point to it and ask: "Would you design it like this today?"

*2. Designing the New Workflow*

Next, I defined a streamlined 5-step flow mirroring how people actually think:
1. Pick what you want to schedule (a report, dashboard, etc.)
2. Choose when and how often it runs
3. Decide who receives it and in what format
4. Confirm and save
5. Monitor and manage schedules from a central place

It meant collapsing multiple legacy controls, renaming things to match users' mental models, and negotiating with engineering around refactors.

*3. From Sketches to Prototypes*

I started with low-fidelity flows and wireframes: "What happens after they choose schedule type?" "Where do they see upcoming schedules?" "If something fails, what's the first thing they see?"

As alignment grew, I moved into high-fidelity prototypes that:
- Embedded scheduling UI directly in the Hub
- Used consistent design system patterns
- Introduced progressive disclosure — simple defaults for most users, advanced toggles for pros

We iterated dozens of times, trading off: When to show advanced filters vs. hide them. Inline editing vs. separate detail panels. How much data to reveal upfront.

Instead of getting lost in the forest, I was carving a path for others.

**Collaboration: Leading Without Owning the Org Chart**

ReportCaster taught me a lot about leading in spaces where UX wasn't the default center of gravity.

Some realities:
- Long-time engineers were protective of a system that hadn't failed them.
- PM focus was split across initiatives — no clean UX ownership.
- Deadlines were set by release trains, not UX timelines.

So I leaned on what I do best — building relationships, listening, and being relentlessly clear.

I:
- Turned vague "we should modernize this" chats into concrete prototypes.
- Used support tickets and user pain as evidence.
- Invited engineers into early design reviews.
- Documented decisions so no one felt blindsided.

I wasn't just designing screens. I was designing alignment.

**The Final Experience: Scheduling Belongs in the Hub**

In the final experience:
- Scheduling starts directly in the Hub.
- The user sees a guided flow, not a maze of forms.
- Schedules can be viewed, edited, and managed in a unified dashboard.
- Errors and statuses are visible, not buried in logs.

Impact:
- 60% fewer clicks per scheduling task
- Scheduling time was cut roughly in half
- 3 separate tools merged into 1 cohesive flow
- 1-click access from Hub (down from 2+)

The sentiment changed from: "I'm scared to touch that thing." To: "This finally feels like part of the product, not an awkward bolt-on."

**What This Project Did to Me (In a Good Way)**

On paper, this is a story about a legacy enterprise product. In reality, it's also a story about me growing into a different kind of designer.

This project taught me that:
- **Initiative matters.** Nobody asked me to own ReportCaster. I claimed it — and that opened doors to deeper trust, influence, and harder problems.
- **Leadership is a behavior, not a title.** I didn't wait for perfect conditions. I led through clarity, persistence, and collaboration.
- **Enterprise UX is psychological.** Respect what long-time users and engineers love while still advocating for change.
- **The boring parts hold leverage.** Support calls, old specs, weird edge cases — those were the clues that made the design stronger.

If I had to summarize this project in one line: I didn't just redesign a scheduler. I redesigned how the team thought about UX in a 40-year-old product.

ReportCaster is now a foundation we can build on — and the trust, workflows, and patterns built here have fed directly into new initiatives like ML workflows and plugins.

UX isn't a "nice to have." It's what makes all that complexity usable.

---

### ReportCaster — Formal Case Study Version

The ReportCaster project was a significant milestone in my career as a UX/Product Designer. It was an ambitious project that I initially took on independently before successfully building a dedicated team around it. When my Design Director/Manager brought up the need for a redesign, I volunteered to take on the challenge. My goal was to transform a traditionally complex scheduling and reporting tool into a streamlined, user-friendly experience, making it accessible to a broad range of users, from business analysts to IT administrators.

**Problem Statement & Goals**

ReportCaster was a powerful feature within the WebFOCUS ecosystem, but it suffered from a steep learning curve, a dated UI, and an overly complex workflow. The goals of the redesign included:

- **Complete UI Redesign:** Upgrade from the outdated Bindows UI to a modern, intuitive interface.
- **Simplify Workflow Complexity:** Make scheduling reports and distributing them intuitive for users across varying skill levels.
- **Customer Retention:** Address repeated customer requests for a refreshed UI to retain and satisfy existing customers.
- **Improve Efficiency:** Reduce the time and effort required for users to set up and manage their reporting schedules.

**Target Users**

All WebFOCUS Users: ReportCaster needed to serve all WebFOCUS users, including business analysts, IT administrators, and other stakeholders. The focus was on reducing the learning curve for new users while maintaining the familiarity and robustness for those who used ReportCaster daily.

**Research & Competitive Analysis**

I spent several weeks studying the ReportCaster feature in-depth, mapping out existing workflows, creating mind maps, and gathering screenshots. I also reached out to the support team to understand user pain points. In addition, I onboarded the lead engineers and QA team early on and later brought in a new Product Manager.

Competitive research included:
- **Microsoft Power Automate:** User-friendly workflow automation, emphasizing simplicity and integration.
- **Tableau Scheduler:** Integrated experience for automating dashboard delivery but required familiarity with the Tableau environment.
- **Qlik NPrinting:** Advanced scheduling capabilities but often considered too complex for non-technical users.

**ReportCaster Complexity**

ReportCaster is a comprehensive tool that includes features such as creating schedules, sending reports, managing distribution lists, creating access lists, maintaining its own file browser (ReportCaster Explorer), and managing an admin center. This complexity required thoughtful planning and an understanding of how each component fit into the broader WebFOCUS ecosystem.

**Final Solution**

The final solution was to break down the ReportCaster tool into five separate workflows, simplifying navigation and improving usability:

1. **Main Scheduler:** Redesigned as a dialog box with individual tabs to configure schedules, streamlining the process and making it more intuitive.
2. **Distribution List Creator:** Moved to a separate dialog box to simplify the management of distribution lists.
3. **Access List Creator:** Redesigned as a dedicated dialog box, making it easier for users to manage permissions.
4. **Admin Center:** Integrated into the WebFOCUS Admin center as its own tab, ensuring that all administrative controls were consolidated in a single location.
5. **ReportCaster Explorer:** Melded into the Home plugin of the WebFOCUS Hub, improving visibility and usability by making it a part of the main workspace.

**Impact & Outcomes**

- Internal usability tests and customer feedback on the UI have been tremendously positive.
- The update was well received in Virtual User Groups, with users expressing enthusiasm over the modernized interface.
- Reduced learning curve for long-time and new users alike.
- 30% reduction in support requests related to scheduling and automation tasks.

**Reflection**

This project reinforced the value of collaboration and adaptability. Building a team around ReportCaster, onboarding new members, and facilitating a seamless transition were key to the project's success. It taught me the importance of empathy—not just for users, but for my colleagues and the challenges they faced.

---

### Predict Data — Full Narrative

The Predict Data feature was a pivotal project that allowed me to leverage my skills as a UX/Product Designer to create an intuitive and accessible experience for machine learning within WebFOCUS. Predict Data aimed to empower users by simplifying complex predictive analytics, providing a seamless integration into the broader analytics workflow. My role in this project was to ensure that both technical and non-technical users could easily use machine learning to make informed decisions without the need for specialized data science skills.

**Problem Statement & Goals**

Predict Data was designed to address the growing need for predictive analytics capabilities within the WebFOCUS ecosystem:

- **Democratize Predictive Analytics:** Make advanced predictive modeling accessible to all users, regardless of their technical expertise.
- **Seamless Integration:** Ensure that predictive analytics capabilities were fully integrated into existing WebFOCUS workflows, providing a unified experience.
- **User Empowerment:** Enable users to derive actionable insights from their data, enhancing data-driven decision-making across the organization.

**Target Users**

- **Data Analysts & Technical Users:** Users with experience in data analysis who needed a streamlined approach to building and using predictive models.
- **Non-Technical Business Users:** Users looking for simple, guided workflows to utilize predictive analytics without having to understand the complexities of machine learning.

**Research & Competitive Analysis**

- **Power BI:** Leveraged Azure Machine Learning integration for predictive insights, but was challenging for less experienced users.
- **Tableau:** Enabled integration with Python and R for custom analytics, which required technical knowledge to use effectively.
- **Qlik Sense:** Offered predictive capabilities, but these features were often seen as inaccessible for non-technical users.

These insights highlighted the need for an easy-to-use predictive analytics tool — one that provided the depth required by analysts but also catered to business users with limited technical skills.

**Ideation & Concept Development**

The concept for Predict Data was built on the foundation of inclusivity and simplicity. I collaborated closely with product management and engineering teams to define the scope and conceptualize how machine learning could be integrated seamlessly.

- **User Journey Mapping:** Created distinct user journeys for technical and non-technical personas, focusing on simplifying the entire predictive modeling process—from data selection to model interpretation.
- **Wireframes & Prototyping:** Developed initial wireframes that visualized how users would interact with the feature. These were iteratively improved upon to provide the best user experience for different personas.

**Design Approach**

- **User-Centered Design:** Emphasized designing for the end-user, regardless of their technical background. Integrated user-centered design principles throughout.
- **Iterative Design:** The Predict Data design evolved through multiple iterations based on user testing and stakeholder feedback. By testing early prototypes with both technical and non-technical users, I refined workflows and made adjustments to improve overall usability.
- **Guided Experience:** Given the complexity of predictive analytics, I focused on creating a guided experience for non-technical users. Tooltips, onboarding wizards, and contextual help were incorporated to walk users through each step.

**Final Solution**

The final design allowed users to create predictive models effortlessly:

- **Guided Model Creation:** Users were guided step-by-step through the process of selecting data, choosing a model, training, and evaluating it. This guided approach was crucial in reducing the intimidation factor.
- **Advanced Options for Technical Users:** The interface offered customization options, enabling more experienced users to fine-tune model parameters and experiment with different configurations.
- **Seamless Workflow Integration:** Predict Data was integrated within the broader WebFOCUS ecosystem, allowing users to seamlessly move between data analysis, predictive modeling, and reporting without switching platforms.

**Challenges & Solutions**

- **Balancing Complexity and Simplicity:** Addressed by designing a dual-experience interface: a guided mode for non-technical users and an advanced customization option for more experienced users.
- **User Engagement:** Incorporated instant feedback during model training and clear visualizations to help users understand prediction results — making the process more interactive and informative.

**Impact & Outcomes**

- Internal usability tests and customer feedback have been tremendously positive.
- Positive reception during Virtual User Group meetings, with users particularly excited about the seamless integration and guided workflows.
- Minimal learning curve — the guided experience ensured users could get started quickly with minimal support.

**Reflection & Learnings**

Reflecting on the Predict Data project, I am proud of the way we democratized machine learning for all WebFOCUS users. Designing an experience that catered to both advanced technical users and non-technical business users was a complex challenge that required empathy, iteration, and a deep understanding of user needs. This project taught me the importance of balancing depth with simplicity—ensuring that the most powerful features remain approachable to those who may be less technically inclined.
