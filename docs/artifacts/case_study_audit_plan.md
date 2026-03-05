# Case Study Audit & Simplification Plan (V3: The Cinematic Hero Aesthetic)

## Synthesizing the Vision (Post-Homepage Review)
I just reviewed the incredible `HeroLanding.tsx` and the homepage layout. The aesthetic is stunning: "Neural Mainframe," deep cinematic vignettes, floating orbs, massive transparent gradients, and auto-playing scrollytelling. It feels powerful, immersive, and incredibly premium.  

Your critique is spot-on: transitioning from that immersive, Apple-like cinematic homepage sequence into a standard React site with boxed components breaks the magic. The case study needs to feel like an extension of the hero experience—not a standard B2B webpage.

***

## The Execution Plan: The Cinematic Experiment Route

### Vision: The Core Philosophy
We are shifting from a "reading" layout to a "scrollytelling" experience. We will use the full height of the viewport, dramatic contrast, and huge, kinetic typography. We will strip out arbitrary React boxes (`SectionBlock`) entirely.

### Step 1: Set Up the Cinematic Sandbox
* Create `src/app/experiment/case-study/[slug]/page.tsx`
* Create `src/components/case-study-experiment/CinematicCaseStudy.tsx`
* This ensures complete safety for the live portfolio while we build the new paradigm.

### Step 2: Full-Bleed Scrollytelling (No More standard "Sections")
* We will replace the standard `SectionBlock` with a `CinematicScene.tsx`.
* **The Layout:** Images/videos will anchor to the background (full bleed or massive floating plates), and the text will be massive, high-contrast typography that fades in and out as the user scrolls, much like the `HeroLanding` quote sequence.
* No more small paragraphs next to arbitrary grids. One thought, one screen, one impact.

### Step 3: Apple-Style Bento Callouts
* For areas where we absolutely *must* show dense information (e.g., the 5 legacy sub-systems or the "250 screens" moment), we will use an ultra-premium, dark-mode `BentoGallery.tsx`.
* Native, familiar Apple hardware pages layout: Glassmorphic tiles, tight gaps, minimal text, interactive hover states.

### Step 4: The AutoPlay Data Viewer
* You specifically asked for an improved `AutoSequenceDataViewer`. I will rebuild this as a high-end cinematic component.
* Instead of a web-app component, it will feel like a HUD terminal overlaying the background, typing out data points or cycling through architectural diagrams on a timer, with slick Framer Motion transitions.

### Step 5: "Better Business Framing"
* We will extract the true business impact (20M+ schedules, churn prevention) and display them using massive, screen-filling numbers (e.g., `HeroLanding` typography scale) that format dynamically on scroll. 
* No fake data. Just leveraging the insane scale of what you actually built.

***

### Ready to Execute?
The vision is clear: we are throwing out the standard React portfolio template and bringing the cinematic, "Neural Mainframe" magic directly into the case study. 

If this hits the mark, I will run the terminal commands to set up the `experiment` route and start building the `CinematicCaseStudy` frame right now.
