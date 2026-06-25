import re

with open("public/tailored-resumes/resume-universal-2026.html", "r") as f:
    content = f.read()

# Split the content at <body>
head_part, body_part = content.split("<body>", 1)

new_body = """<body>

    <!-- Header -->
    <header>
        <h1>Anuja Harsha Nimmagadda</h1>
        <div class="contact-info">
            <a href="mailto:anujanimmagadda@gmail.com">anujanimmagadda@gmail.com</a>
            <a href="tel:+17813547394">+1 781-354-7394</a>
            <span>Bluffdale, UT</span>
            <a href="https://www.anujaharsha.com" class="link" target="_blank">anujaharsha.com</a>
            <a href="https://www.linkedin.com/in/anu159" class="link" target="_blank">linkedin.com/in/anu159</a>
        </div>
        <h2>Staff Product Designer | Product Strategist</h2>
    </header>

    <!-- Summary -->
    <section>
        <h3 class="section-title">Summary</h3>
        <p class="summary" style="margin-bottom: 0.5rem;">
            Strategic design leader, high-agency Product Owner, and de facto organizational unblocker with 13+ years of experience transforming highly ambiguous technical constraints into intuitive enterprise software. I operate as a force multiplier between engineering, product management, and design, specializing in the complex legacy modernization and data workflow problems most designers avoid.
        </p>
        <p class="summary">
            Leveraging a zero-ego builder mentality and advanced AI-agent prompting, I act as an empathy bridge to engineering—decoding backend constraints to write functional specs, eliminate structural friction, and ship runtime-feasible, production-ready UI.
        </p>
    </section>

    <!-- Technical Skills -->
    <section>
        <h3 class="section-title">Technical and Design Skills</h3>
        <table class="skills-table">
            <tr>
                <td>Product Strategy:</td>
                <td>Systems Architecture, Extreme Ambiguity Resolution, Legacy System Modernization, Cross-Functional Team Leadership, Business Intelligence (BI) / Data Analytics.</td>
            </tr>
            <tr>
                <td>Domain Expertise:</td>
                <td>B2B Enterprise SaaS, Machine Learning/Artificial Intelligence Infrastructure, Data Analytics Pipelines, Cybersecurity UX, Fintech Compliance.</td>
            </tr>
            <tr>
                <td>AI-Native Prototyping:</td>
                <td>Agentic AI Workflows (Cursor, Claude Code, Google Antigravity), Rapid Prototyping, Context-Aware Prompting, Next.js, React, Tailwind CSS.</td>
            </tr>
        </table>
    </section>

    <!-- Professional Experience -->
    <section>
        <h3 class="section-title">Professional Experience</h3>

        <!-- Role 1: Cloud Software Group -->
        <div class="role-block">
            <div class="role-header">
                <span class="role-title">Senior Product Designer</span>
                <span class="role-date">August 2022 - November 2025</span>
            </div>
            <div class="role-company"><strong>Cloud Software Group (ibi WebFOCUS)</strong></div>
            <p style="font-size: 0.875rem; margin-bottom: 0.5rem;">Commanded the cross-organizational product vision for WebFOCUS, a mission-critical data platform within a $175M P&L enterprise business unit. By architecting a consolidated analytics platform and driving deep product modernizations, I directly enabled enterprise deal expansion—boosting competitive win rates and cross-sell opportunities across Fortune 500 accounts.</p>
            <ul>
                <li><strong>High-Stakes Legacy Modernization:</strong> Led the execution of a 2025 Dresner Award-winning modernization for an undocumented, 50-year-old scheduling engine. Re-architected workflows processing 20M+ weekly jobs, effectively modernizing 50% of the complex B2B platform.</li>
                <li><strong>Systems Architecture & Executive Alignment:</strong> Acted as the absolute connective tissue across 3 global time zones, aligning 4 PMs, a 30+ person engineering org, and a distributed QA team to secure executive buy-in for a cloud-native overhaul.</li>
                <li><strong>Enterprise AI & ML Strategy:</strong> Architected the unified B2B Data Science and Machine Learning Hub (IQ Plugin), bringing order to system fragmentation by consolidating three isolated workflows (NLQ, Insights, ML) into a single unified entry point.</li>
                <li><strong>Technical Feasibility & Engineering Velocity:</strong> Partnered directly with veteran Principal Data Scientists to conduct rigorous technical discovery on predictive models. Translated complex backend logic into crystal-clear functional specs and UI workflows, achieving 100% SME discoverability and driving a 25% increase in Natural Language Query adoption.</li>
            </ul>
        </div>

        <!-- Role 2: Fractional Product Design Leader -->
        <div class="role-block">
            <div class="role-header">
                <span class="role-title">Fractional Product Design Leader | Principal Consultant</span>
                <span class="role-date">April 2017 - July 2022</span>
            </div>
            <ul>
                <li><strong>Zero-to-One Product Architecture:</strong> Retained by executive teams as a fractional design leader to direct end-to-end product architecture for early-stage B2B and SaaS startups (OneView, Kedazzle). Successfully navigated absolute ambiguity to establish scalable design-to-engineering workflows from the ground up.</li>
                <li><strong>Systemic Friction Resolution:</strong> Acted as a specialized consultant to resolve broken development pipelines. Translated complex business requirements into high-fidelity specifications and production-ready CSS, permanently reducing engineering handover cycles from three rounds of friction down to one.</li>
                <li><strong>Rapid Domain Acquisition:</strong> Parachuted into highly complex, specialized sectors to deliver immediate organizational ROI—from architecting a Fintech Exception Management dashboard tracking multi-currency risks to designing cross-platform cybersecurity controls for IoT devices.</li>
            </ul>
        </div>

        <!-- Role 3: f1Studioz -->
        <div class="role-block">
            <div class="role-header">
                <span class="role-title">Enterprise Product Designer</span>
                <span class="role-date">November 2016 - March 2017</span>
            </div>
            <div class="role-company"><strong>f1Studioz</strong></div>
            <ul>
                <li><strong>Accelerated Complex Onboarding:</strong> Parachuted into complex, in-flight enterprise projects to architect data-heavy B2B dashboards and functional workflows under aggressive, client-driven timelines.</li>
                <li><strong>Multi-Platform Systems Design:</strong> Led the end-to-end architectural redesign of a multi-platform enterprise facility management system (Web, Mobile, Tablet), establishing scalable patterns for seamless cross-device synchronization.</li>
                <li><strong>Client-Facing Leadership:</strong> Acted as the primary strategic liaison between enterprise clients, product managers, and engineering teams. Translated highly ambiguous client demands into strict functional requirements to protect engineering scopes and ensure rapid delivery.</li>
            </ul>
        </div>

        <!-- Role 4: 9P Studioz -->
        <div class="role-block" style="margin-bottom: 0;">
            <div class="role-header">
                <span class="role-title">Founding Product Designer</span>
                <span class="role-date">August 2012 - November 2016</span>
            </div>
            <div class="role-company"><strong>9P Studioz</strong></div>
            <ul>
                <li><strong>Foundational Design Leadership:</strong> Operated as the solo founding designer for a high-velocity tech incubator, managing end-to-end UX architecture and startup demands across multiple concurrent ventures.</li>
                <li><strong>High-Velocity Execution (Time-to-Value):</strong> Directed the design-to-engineering pipeline to successfully ship 35+ digital products across iOS and Android. Forged the early operational muscle to balance rapid agile execution with the rigorous technical demands of scaling platforms.</li>
                <li><strong>Product Strategy & Growth:</strong> Designed retention-loop mechanics and iterated on session analytics to achieve high-impact launches, collaborating directly with engineering leaders under strict startup constraints.</li>
            </ul>
        </div>
    </section>

    <!-- AI-Native Prototyping -->
    <section style="page-break-inside: avoid; margin-top: 1rem;">
        <h3 class="section-title">AI-Native Prototyping & Technical Empathy</h3>
        <p style="font-size: 0.875rem; margin-bottom: 0.5rem;"><strong>AI as an Empathy Bridge:</strong> Actively utilizing AI agents (Cursor, Claude) and context-aware prompting to build high-fidelity, functional prototypes in React and Next.js. I use AI as a force multiplier to translate design vision into engineering reality, handing developers runtime-feasible UI to eliminate architectural friction.</p>
        
        <div style="font-size: 0.875rem;">
            <ul style="list-style-type: disc;">
                <li style="margin-bottom: 0.25rem;"><strong>College OS (Early 2026):</strong> Architected and deployed an AI-native dashboard prototype for tracking college application materials, proving complex data relationship models through functional, testable interfaces.</li>
                <li style="margin-bottom: 0.25rem;"><strong>Word Train (January 2026):</strong> Developed a logic-driven interactive word game for iOS and web, executing end-to-end frontend deployment to rapidly sharpen code-based interaction prototyping speeds.</li>
                <li><strong>Interactive Portfolio Architecture (November 2025):</strong> Engineered a custom code-based portfolio system utilizing Next.js and React to showcase testable prototypes over static screens, prioritizing a "slow-reveal" narrative that integrates philosophical design principles with complex visual interactions.</li>
            </ul>
        </div>
    </section>

    <!-- Education and Certifications -->
    <section style="page-break-inside: avoid;">
        <h3 class="section-title">Education & Certifications</h3>
        <div class="edu-item" style="margin-bottom: 0.25rem;">
            <div class="school">MIT xPRO</div>
            <div class="degree">Professional Certificate: Designing and Building AI Products and Services</div>
        </div>
        <div class="edu-item" style="margin-bottom: 0.25rem;">
            <div class="school">Georgia Institute of Technology</div>
            <div class="degree">Professional Certificate in Human-Computer Interaction</div>
        </div>
        <div class="edu-item" style="margin-bottom: 0.25rem;">
            <div class="school">Dr. B.R. Ambedkar Open University</div>
            <div class="degree">Master of Arts in English Literature</div>
        </div>
        <div class="edu-item" style="margin-bottom: 0.25rem;">
            <div class="school">SNDT Women's University, Mumbai</div>
            <div class="degree">Bachelor of Arts in English Literature</div>
        </div>
        <div class="edu-item" style="margin-bottom: 0;">
            <div class="school">Mahatma Gandhi University</div>
            <div class="degree">Bachelor of Arts in VFX &amp; Animation</div>
        </div>
    </section>

</body>
</html>"""

# Also update the <title> tag to match the new header
head_part = head_part.replace(
    "<title>Anuja Harsha Nimmagadda - Senior Product Designer</title>",
    "<title>Anuja Harsha Nimmagadda - Staff Product Designer</title>"
)

with open("public/tailored-resumes/resume-universal-2026.html", "w") as f:
    f.write(head_part + new_body)

print("Updated resume successfully")
