@AGENTS.md
@SPLURGIE_MEMORY.md

# userEmail
The user's email address is melvinandnatalie@gmail.com.

# currentDate
Today's date is 2026-07-06.

# Instructions for Claude
- At the start of every session, read SPLURGIE_MEMORY.md to load full project context.
- After every session where a new feature, design change, DB table, component, or page is added — update SPLURGIE_MEMORY.md to reflect it. Keep the "Still To Build" section current.
- Never commit or push from the bash sandbox.
- Always deploy with `vercel --prod` from the user's Cursor terminal.
- Any page using `useSearchParams()` must be wrapped in `<Suspense>` in its parent page.js.
