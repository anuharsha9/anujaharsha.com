# Updated Timeline Fix Logic

## Changes (Phase 2)
- [x] **EraBlock.tsx Refactoring**:
    - Wrapped the `flex` container in a `relative` div that does *not* possess `overflow-hidden` or `mask`. This solves the issue where the absolute positioned dot was being clipped out of existence.
    - Moved the dot/blocker logic to be a sibling of the flex container (inside the wrapper), ensuring it stays visible.
    - Adjusted vertical positioning to `md:top-[17px]` (Desktop) to precisely align with the vertical center of the milestone items (accounting for `pt-6` on the flex container).
    - Verified horizontal positioning (`md:-left-[66px]`) aligns perfectly with the spine (30px absolute) relative to the content start (96px absolute).
    - Verified JSX structure is correct after complex edits.

## Expected Result
- The "Terminal Dot" (cyan pulse) should now be visible to the left of the "Foundation" timeline items.
- The blocker div below the dot should successfully hide the vertical spine that runs beneath it, effectively "terminating" the timeline at the dot as requested.
