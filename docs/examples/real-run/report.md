# Dr. Unslopovich: treat the home screen

Command picked: `treat` (the user said "treat the home screen").

## Diagnosis (before)

```text
Dr. Unslopovich's diagnosis
Verdict: A well-dressed home screen that spills past the edge of every phone, prints yesterday's date forever, and whispers half its text below readable contrast.
Stack: Vite 8 + React 19 + TypeScript + Tailwind v4; web app (a members' page, judged as an app, not a site). Light theme only.
Reviewed: Home (the only screen). Top tasks: (1) see what is out with me and when it is due, then extend or plan the return; (2) find a tool on the shelf and borrow it or join the queue. Running app via Vite + Playwright at 375, 768, 1280, 1920, dark emulation, 200% zoom (640 CSS px), keyboard tab order.
Score: 14/24 Admitted  Task path 2 · Truth 2 · Native fit 2 · States 3 · Access 2 · Specificity 3
Performance: Not profiled. Static leads: 12 catalog cards rendered unvirtualized (fine at this size, would matter at a few hundred tools); two Google Fonts families (Fraunces, Inter) loaded by a CSS @import, which blocks rendering until the stylesheet fetch returns.
```

### Critical
- `src/App.tsx:40` The main grid has no column template below `lg`, so its single implicit column sizes to the min-content of the category chip row. At 375 wide the page renders 595 px wide: loan badges, "Plan return", and every "Borrow" button sit off-screen and the page scrolls sideways. Hurts every phone user on both top tasks. -> `grid-cols-[minmax(0,1fr)]` on the base grid.

### Noticeable
- `src/App.tsx:15,17` "Monday, November 16" and "Morning," are hard-coded strings. Correct today only; wrong every other day and every afternoon. -> Format the date from `new Date()` and pick Morning/Afternoon/Evening by the hour.
- `src/App.tsx:20` The due sentence always says "tomorrow" (also for `dueInDays <= 0`), and says "is" for two tools. -> Say "today" or "tomorrow" from the soonest due loan; agree the verb with the count.
- `src/components/*` Secondary text is ink at 40-60% opacity: 2.3:1 to 3.9:1 on paper and white (tool details, "Back in 3 days", "Day 3 of 4", pickup times, noticeboard dates, footer, search placeholder and icon). Below 4.5:1 for body text. -> One solid `ink-muted` token (#5c645f, 5.6:1 on paper, 6.1:1 on white).
- `src/App.tsx:26` "Find a tool", the screen's one primary action, is white on clay-500: 3.16:1. Avatar initials the same (`Header.tsx:44`). -> Ink text on clay-500 (4.7:1), keeping the brand clay; hover lightens to clay-400 so the text stays readable.
- `src/components/Loans.tsx:31`, `Sidebar.tsx:40` "Due tomorrow" badge and the return note are clay-600 on clay-50: 3.84:1. -> A `clay-700` text token (#ad521c, 4.7:1).
- `src/App.tsx:24` + `Header.tsx:8` "Find a tool" jumps to `#catalog-heading`, which then lands under the 64 px sticky header. -> `scroll-margin-top` on headings with ids.
- `src/components/Catalog.tsx:87` The search field has only a placeholder for a label, and is 15 px, so iOS zooms on focus. -> `aria-label="Search the shelf"`, 16 px text.
- Focus: buttons and links rely on the browser's default ring, not one in the palette. -> One `:focus-visible` outline in moss-600, in the base layer so the search field's own ring still wins.
- Dead controls: Borrow, Join queue, Plan return, Request a tool, Loan history, Notifications, and the nav links (`href="#"`) look live and do nothing. Not changed: wiring them is business logic and data flow. Listed for the product owner.

### Minor
- `src/components/Catalog.tsx:12,14` [hover-scale] Catalog cards lift and their icons grow on hover, but the card itself is not clickable, so the hover promises an action that is not there. -> Remove both; the Borrow and heart buttons keep their own hover.
- `src/components/Sidebar.tsx:8` [tracked-caps-label] "YOUR YEAR AT THE LIBRARY" eyebrow in tracked caps. -> Sentence-case `h2` in the body face.
- `src/components/Sidebar.tsx:16` "$1,480 not spent buying" comes from `savedEstimate` but reads as a measured figure. -> "not spent buying, estimated".
- `src/components/Loans.tsx:27` Tool details truncate in loan cards at 1280 ("2,700 PSI gas, 4 n..."), hiding what the user borrowed. -> Let them wrap.
- `src/components/Loans.tsx:72` "Loan history" link is 20 px tall. -> `py-1` for a 28 px target.
- Motion has no reduced-motion fallback. -> Global `prefers-reduced-motion: reduce` rule that zeroes transition durations.
- Tool tiles use seven category tints (amber, sky, cyan, rose, lime, stone, orange) next to the moss/clay brand. They map to category consistently but compete with the clay "due soon" signal. Suggestion only, not changed: replace with photos of the library's actual tools when there are some (the tinted panes are image placeholders).

### Ask first
- `src/components/Header.tsx:20` Main nav is `hidden md:flex` with nothing in its place: under 768 wide, Browse, My loans and Community cannot be reached at all. Critical in severity, but the fix changes navigation structure. -> Proposed: a bottom tab bar or a compact row of the same four links on phones.
- `src/components/Header.tsx:42` [status-dot] The bell's unread dot is always on, wired to nothing, and has no text backup for screen readers. -> Wire it to a real unread count and say it in the label ("Notifications, 2 unread"), or remove it.
- `src/components/Catalog.tsx:72` "shared by 140 neighbours" is hard-coded and not in the data. Is 140 real? If not, remove it; if it is, move it into `library` data.
- `src/components/Loans.tsx:13` "Extend 3 days" updates only its own card; the greeting ("due back tomorrow") and the return note still say the old date. Fixing it means lifting loan state up, a data-flow change.
- `src/components/Header.tsx:16` [tracked-caps-label] "TOOL LIBRARY" in tracked caps under "Maple Street". It is part of the logo lockup, so the brand wins unless the owner says otherwise.
- `src/components/Header.tsx:44` The "PR" avatar looks like an account button but is a `span`: not focusable, no menu. Make it a button to an account page once one exists.

### Worth keeping
- The brand: paper background, moss and clay, Fraunces headings over Inter. It already looks like this library and nobody else.
- The product's own nouns: "Out with you", "On the shelf", "Noticeboard", "Join queue", "Back in 3 days", "2 of 3 in".
- The greeting is not a "Welcome back" banner: it tells you what is due and what is ready. That is the task, at the top.
- A real empty state for search ("Nothing matches that yet... Request a tool"), a real disabled "Extended" state, `aria-pressed` on chips and the wishlist heart, real `<button>`s and `<a>`s throughout.
- The availability dot in the catalog has its text beside it ("2 of 3 in", "Back in 3 days") and a grey/green pair that is not color-only. A status, not a tell.

## Severity call and direction

Call: **Heavy** by the treatment rule (Task path 2, Truth 2), though the visual design is mostly sound. Because the product has a real brand, the direction is that brand written out, and the passes mostly confirmed what was there. What I would have shown the user before the first edit (taken as approved for this run):

- **Product.** A members' page for a volunteer-run neighbourhood tool library: what you have out, what is ready to collect, and what is on the shelf to borrow.
- **Use.** A phone in the garage or at the door checking a due date; a laptop on a weeknight browsing for the weekend job. Short visits, a few times a month.
- **Character.** Neighbourly, practical, a little handmade.
- **The bright spot.** "Out with you": the due date (clay when it is close) and the reservation that is ready. Everything else stays quiet.
- **Signature.** The plain-spoken sentence under the greeting ("Your pressure washer is due back tomorrow"), kept and made true every day.

Pass notes: spacing already ran on a consistent scale (unchanged); color got two text tokens for contrast and kept the brand fills; icons are one hand-drawn 1.75 stroke set (unchanged); copy got the real date, the due sentence, the estimate label; type lost the eyebrow and the 15 px input; layout got the grid fix; details got focus, scroll margin, label, target; motion lost the hover lift and gained a reduced-motion fallback.

Ask first items were not applied. The run's standing approval covered the direction; the skill's unbending rules (navigation, data flow, invented claims, logo) each need an answer about the specific item, which nobody was there to give.

## What changed, and why

`src/index.css` (tokens first)
- `--color-ink-muted: #5c645f`: solid secondary text, 5.6:1 on paper, 6.1:1 on white.
- `--color-clay-700: #ad521c`: clay as text on clay-50, 4.7:1. `--color-clay-400: #e3905c`: hover fill for the clay button with ink text.
- `@layer base`: one `:focus-visible` outline in moss-600 with 2 px offset; `scroll-margin-top: 5rem` on `h2[id]`.
- `prefers-reduced-motion: reduce` rule zeroing transition durations.

`src/App.tsx`
- Grid: `grid-cols-[minmax(0,1fr)]` below `lg` (fixes the 595 px page at 375).
- Greeting: date from `toLocaleDateString`, Morning/Afternoon/Evening from the hour, "today"/"tomorrow" from the soonest loan, verbs agree with the count.
- "Find a tool": ink text on clay-500, hover clay-400, `transition-colors`, dropped the decorative shadow.

`src/components/Catalog.tsx`
- Removed the card lift, card hover shadow, and icon scale on hover (the card is not a control).
- Search: `aria-label="Search the shelf"`, 16 px text; placeholder and icon on `ink-muted`.
- Secondary text on `ink-muted`. Availability dot kept, with `// unslopovich-ignore status-dot` and the reason.

`src/components/Loans.tsx`
- Secondary text on `ink-muted`; "Due tomorrow" badge on `clay-700`; "Waiting on return" on `ink-muted`.
- Tool details wrap instead of truncating. "Loan history" gets `py-1`.

`src/components/Sidebar.tsx`
- Eyebrow -> sentence-case `h2`, no tracking. "not spent buying, estimated". Icons, dates, bodies on `ink-muted`; return note on `clay-700`.

`src/components/Header.tsx`
- Avatar initials ink on clay-500. Open-hours dot and bell button marked `unslopovich-ignore` with reasons (verified false positives).

Diff: 6 files, +83 / -33. No dependencies added, no logic or data changed, nav untouched. `npx tsc -b` passes.

## Score

| Dimension | Before | After | Why after |
|---|---|---|---|
| Task path | 2 | 3 | No sideways scroll at 375; "Find a tool" lands on the heading. Still no nav under 768 and the main actions are not wired (Ask first / not mine to change). |
| Truth | 2 | 3 | Date, time of day, due wording, estimate label now true. "140 neighbours", the always-on bell dot, and extend-not-reflected remain (Ask first). |
| Native fit | 2 | 3 | No horizontal scroll, palette focus ring, 16 px labelled search. Nav links still `href="#"`. |
| States | 3 | 3 | Unchanged: empty and disabled states were already there; no loading or error states because the data is static. |
| Access | 2 | 3 | All body text 4.5:1 or better, CTA 4.7:1, focus visible in order. Bell dot has no text; avatar not focusable. |
| Specificity | 3 | 3 | Was already specific. Lost the eyebrow and hover lift; category tints remain as a suggestion. |
| **Total** | **14/24 Admitted** | **18/24 Outpatient** | |

## Detector results

Before (`node scripts/detect.js src --json`, 9 files): 8 hits.
- hover-scale `Catalog.tsx:12`, `Catalog.tsx:14` -> fixed (removed)
- status-dot `Catalog.tsx:35` -> verified status with text backup; silenced with a reason
- tracked-caps-label `Header.tsx:16` -> logo lockup; Ask first, still reported
- status-dot `Header.tsx:37` -> "Open today" dot with text; silenced with a reason
- icon-tile `Header.tsx:40` -> false positive (round ghost icon button, no tinted tile); silenced
- status-dot `Header.tsx:42` -> bell dot, hard-coded; Ask first, still reported
- tracked-caps-label `Sidebar.tsx:8` -> fixed

After: 2 hits, both kept on purpose as Ask first items.
- tracked-caps-label `Header.tsx:16` (logo lockup)
- status-dot `Header.tsx:49` (bell dot)

Note: the detector's ignore comment must be a `//` line or a trailing comment; a JSX `{/* ... */}` line above an element does not silence it, so the ignores sit as `//` comments inside the element's props.

## Verification

- Page width (scrollWidth): before 375 -> 595; after 375 -> 375, 768 -> 768, 1280 -> 1280, 1920 -> 1920, 200% zoom (640 CSS px at 2x) -> 640. No console errors.
- Keyboard: tabbed 16 stops at 1280 from the top: logo, 4 nav links, bell, Find a tool, Loan history, Extend/Plan return x2, Available now, search, chips. Every stop shows the 2 px outline (search keeps its own moss ring). Reading order matches the layout.
- "Find a tool": URL becomes `#catalog-heading`, heading sits 80 px from the top, clear of the 64 px header.
- "Extend 3 days" still switches to "Extended"; searching "zzz" still shows the empty state.
- Contrast computed from the token values (not measured with a tool on rendered pixels).
- `npx tsc -b` passes.

## Self-check

1. Cover the logo: no. The moss/clay/paper palette, Fraunces, and the library's own nouns ("Out with you", "Back in 3 days") carry it.
2. Neighbor test: another tool library would likely get a tinted card grid; this one keeps the due-date sentence as its signature and the clay "due soon" as the only warm signal in the loans area.
3. Containers: down slightly (CTA shadow and card hover shadow gone); none added.
4. Colors: moss = available/selected/brand, clay = due soon/primary action, ink-muted = secondary text. The seven category tints still carry only category; listed as a suggestion.
5. Dots: availability dot (with text, grey vs green), open-hours dot (with text), bell dot (no text, hard-coded: Ask first). Color-blind users get the first two from the text.
6. Task: "Find a tool", Extend, Plan return, and the search are where they were; on phones they are now on-screen instead of off to the right.
7. Detector: 2 hits kept, both Ask first (logo lockup, bell dot).
8. Fresh look: I could not start a sub-agent in this run, so no fresh-context review happened.
9. Not checked: see below.

## Not checked
- Performance not profiled (no Lighthouse, no production build trace).
- No fresh-context reviewer; I could not start a sub-agent.
- Dark mode: the app has no dark palette; the dark-emulated screenshot is identical to light. Whether it should have one is a product decision.
- Screen reader not run; names and order checked from the DOM and tab order only.
- Real devices and iOS Safari (input zoom fix verified by size only, not on a device).
- Contrast of text over the tinted tool panes ("Popular" pill) not measured.
- Time-of-day greeting checked only at the time of the run (morning).
- Saved visit: `app/.unslopovich/visits/2026-11-16-1014-home.md`. No `.unslopovich/chart.md` exists; run `chart` to record the brand, the logo lockup, and the Ask first answers.
