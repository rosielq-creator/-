# GreenTomato Continuous Fashion Site and Maya Profile Design

## Objective

Rebuild the existing GreenTomato homepage and artist profile experience as a continuous, fashion-led HTML website. The primary goal is to create a memorable luxury creative-studio impression; contact conversion is secondary and occurs after the brand experience.

The redesign combines By Monolog's editorial restraint and Success Stories scale with Essential's experimental motion. It may closely reference their visual and interaction language, while retaining GreenTomato's identity, content, and client work.

## Fixed Decisions

- Retain the existing content and case-study data, but rebuild the homepage and artist pages in HTML, CSS, and JavaScript.
- Use a cream-white and ink-black palette.
- Use generous whitespace and selectively break the grid.
- Build one continuous document, not canvas-like full-page slides.
- Use strong experimental motion on desktop; preserve the creative idea but reduce heavy motion on mobile.
- Provide English and Chinese language modes.
- Remove the horizontal `About / Artists / Work / Services / Contact` directory section completely.
- Use only authentic source material and official brand/client case-study assets.
- Do not reuse any previously AI-generated photographs, including as placeholders.
- Maya is the first complete artist-profile prototype.

## Homepage Information Architecture

The homepage order is:

1. Brand motion hero
2. Concise About statement
3. Artists
4. Success Stories / Work
5. Services
6. Contact and footer

### Navigation

Use a minimal text navigation with language selection and Contact access. It contracts while scrolling and does not rely on a full-width rule. Contact anchors to the form without introducing a separate page-like panel.

### Hero

The hero contains no video. It uses an oversized `GreenTomato` wordmark and a short, rewritten bilingual business proposition. Split type, masks, displacement, and scroll-linked movement establish the initial impact.

### About

Use two or three short statements to define the studio's perspective and services. The composition is asymmetrical and spacious rather than a conventional centered introduction.

### Artists

Display artists in a restrained broken-grid composition. The default view emphasizes image and name; hover or focus reveals one concise positioning statement. Selecting an artist opens a dedicated profile page. Do not turn the section into a directory or biography-card wall.

### Work

Reference By Monolog's Success Stories: medium-sized media, varied aspect ratios, and a controlled editorial grid. Curate the existing official assets and remove weaker items rather than enlarging them to manufacture impact.

The media play control plays or pauses in place. A separate project control opens the case-study page. Case-study pages continue to lead with category, title, and project information rather than a redundant static cover.

### Services

Avoid a uniform card grid. Use large but readable service phrases, supporting copy, and selected case fragments. Motion connects demonstrated work to the capability statement.

### Contact and Footer

`Tell us your story` becomes the natural conclusion of Services. The form collects only:

- Name
- Email
- Brand / company
- Project description

Labels remain visible. Inputs use clear boundaries, focus states, validation, and success/failure feedback. The form and footer form one ending rather than two separate panels.

Submissions will write to a new dedicated GreenTomato Leads Google Sheet and trigger a notification to the currently configured Gmail account. The exact Sheet and recipient must be confirmed before external setup.

## Continuous Section Transitions

Transitions use content hand-offs rather than background-color changes, horizontal rules, or mandatory screen snapping.

- **Hero to About:** the large GreenTomato lettering separates laterally and creates negative space. The business proposition remains while the About statements rise through that opening.
- **About to Artists:** the final About statement scales into the Artists introduction. The first artist is revealed from a masked page edge; the remaining portraits enter at varied speeds.
- **Artists to Work:** artist images narrow and reposition into the first case-study apertures. Artist labels leave while case titles inherit their baseline, expressing that the artists lead to the work.
- **Within Work:** each case enters from a controlled crop and settles at its native editorial ratio. Titles move slightly in the opposite direction. Media never needs to become full screen.
- **Work to Services:** the final case briefly anchors while service language passes above it. The media crop contracts and releases whitespace for Services.
- **Services to Contact:** service terms leave until `Tell us your story` remains. That phrase becomes the form title while the form fields reveal in sequence.
- **Contact to Footer:** the form composition contracts upward and the GreenTomato mark emerges from below, creating a single final cadence.

Motion must remain progressive enhancement. The document remains readable and operable if JavaScript fails, motion is disabled, or `prefers-reduced-motion` is enabled.

## Maya Artist Profile

Maya's page is the reusable profile-system prototype. Her presentation is a high-luxury fashion model: composed, reserved, and editorial, with occasional eye contact or restrained interaction. Avoid presenter, influencer-host, or persistently smiling behavior.

The page sequence is:

1. Introduction
2. Persona
3. Portfolio
4. Campaigns
5. Platform Data
6. Collaborate

### Character-Led Narrative

Maya appears only on her dedicated profile page, not as a character roaming across homepage sections. Transparent-background character video lets Maya enter, stop, turn, look, gesture, and leave as the user reaches relevant profile sections.

- **Introduction:** Maya enters from a page edge and stops while her name, role, and one-line positioning appear.
- **Persona:** a restrained turn or gaze leads toward concise information about personality, aesthetic, audience, and content direction.
- **Portfolio:** Maya moves aside to release space for authentic work in an editorial grid.
- **Campaigns:** gesture and gaze guide attention toward brand cases, each limited to brand, objective, delivery, and result.
- **Platform Data:** Maya rests at one side while large data points identify platform, reporting period, and last update. No values may be invented.
- **Collaborate:** Maya approaches or turns toward the collaboration entry, then leaves as the GreenTomato brand closes the page.

Use separate transparent WebM clips for individual actions rather than one long continuous video. Each clip requires a poster frame and a non-transparent fallback. Section entry triggers the appropriate clip; reverse scrolling must return to a visually coherent state.

The Maya videos do not yet exist and form a separate production track. The web structure may use neutral motion blocks or layout guides during development, but may not use old AI-generated photographs as stand-ins.

On mobile, Maya is smaller and edge-aligned, and may leave the frame entirely when needed. She must never cover portfolio media, data, form fields, or controls.

## Visual System

- Cream-white base, ink-black type, no additional large color fields.
- High-contrast editorial display typography paired with highly readable body typography.
- Hierarchy comes from scale, whitespace, crop, overlap, and motion.
- Broken-grid moments are reserved for display type, artist imagery, project rhythm, and section hand-offs.
- Body copy, controls, form labels, and reported data retain stable alignment.
- Borders are minimized except where they materially improve form comprehension and interaction clarity.

## Bilingual Behavior

English is the default international-facing presentation. Chinese is editorially rewritten rather than mechanically translated. Language switching must preserve structure, selected project state, form contents, and approximate scroll position. Layouts must tolerate different line lengths without overlap or large jumps.

## Technical Boundaries

- Keep current case-study data as the content source.
- Separate shared shell, language content, homepage sections, project media controls, artist-profile sections, character-video orchestration, and contact submission into understandable modules.
- Keep normal semantic HTML document flow under all animation layers.
- Use responsive image sources and lazy loading.
- Load character and case videos when approaching the viewport; stop or unload media when appropriate.
- Scope motion by section so one animation failure does not break the full page.
- Preserve native links, focus order, keyboard control, labels, and semantic headings.
- Provide reduced-motion and lower-performance fallbacks.

## Delivery Phases

1. Rebuild the homepage and shared visual/motion system using curated authentic assets.
2. Build Maya's profile structure and character-motion interfaces with neutral layout guides.
3. Produce and integrate Maya's approved transparent video clips.
4. Create the dedicated Google Sheet, connect submission and Gmail notification after target confirmation, then complete site-wide QA.

## Acceptance Criteria

- The desktop and mobile experiences remain one continuous HTML document, not canvas screens or mandatory full-page slides.
- The removed horizontal section-directory block does not appear anywhere.
- Section changes are communicated primarily by content hand-off motion, not background color blocks or hard separator rules.
- Only authentic source and official client/brand materials appear; previous AI-generated photographs are absent.
- Work uses medium editorial media sizing and does not compensate for weak assets by making them full screen.
- Work play controls play or pause media in place; project navigation remains separate.
- Maya's character motion never obscures primary content or controls.
- English and Chinese modes remain legible and structurally stable.
- The contact form has persistent labels, clear input boundaries, keyboard access, validation, and success/failure feedback.
- Core content remains accessible with JavaScript unavailable and with reduced motion enabled.
- Mobile removes cursor-only behavior and heavy scroll locking while preserving masks and content hand-offs.
- Performance testing covers responsive media, deferred video loading, lower-performance fallbacks, and current desktop/mobile browsers.

## Product Insight

The motion system must communicate relationships between brand, artists, work, and services; motion without narrative will feel like a template. Curating fewer credible assets is more valuable than filling every grid position. Maya's character presence should improve comprehension and commercial positioning, not compete with her work or platform evidence.
