# A real run

Nothing here was drawn by hand.

1. A coding agent got one prompt: build the home screen of a neighborhood tool library in Vite, React, and Tailwind, with made-up data, and "make it look good". That's `before/`.
2. A fresh agent with the skill installed got `/unslopovich treat the home screen`. It ran the detector, opened the app in a browser at several widths, and followed the skill. Where the skill asks the user to approve a direction, it was told to take it as approved.
3. `treatment.diff` is everything it changed. `report.md` is what it told the user, including what it left alone and what it didn't check.

| | Before | After |
|---|---|---|
| Score | 14/24 | 18/24 |
| Page width on a 375 px phone | 595 px | 375 px |
| Detector findings | 8 | 2, both left for the user to decide |
| Files changed | | 6, +83 / -33 |

The biggest fix wasn't about looks. On a phone the page was wider than the screen, so the buttons people come for were off the edge. The look was already decent, so the skill kept it.
