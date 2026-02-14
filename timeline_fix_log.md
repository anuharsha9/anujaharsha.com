# Landing Page Timeline Fix

## Changes
- [x] **PolymathManifesto.tsx**: Deleted unused file to prevent confusion.
- [x] **EraBlock.tsx**: Moved "Terminal Dot" inside the flex container to ensure vertical alignment with timeline items.
- [x] **EraBlock.tsx adjusted**: Set dot position to `md:top-[35px] md:-left-[34px]` to align with item connector and spine.
- [x] **UnifiedTimelineLayout.tsx**: Changed `max-w-[1400px]` to `max-w-[1440px]` to match `EraBlock` container width, resolving horizontal spine misalignment (20px gap).

## Rationale
The "two timelines" or "line really off" issue was caused by:
1.  **Horizontal Misalignment**: `UnifiedTimelineLayout` (drawing the main spine) was `max-w-1400px` while `EraBlock` (drawing the nodes/content) was `max-w-1440px`. Since both are centered (`mx-auto`), this created a ~20px offset between the spine and the content/nodes.
2.  **Vertical Misalignment**: The "Terminal Dot" for the last era was absolutely positioned relative to the section container (`top-12`), while the horizontal timeline items were pushed down by padding and labels, causing the dot to float significantly above the items it was meant to originate from.
