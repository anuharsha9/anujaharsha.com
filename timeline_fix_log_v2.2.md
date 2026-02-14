# Timeline Fix (Phase 2.2)

## Changes
- [x] **Dot Horizontal Alignment**: Updated horizontal position from `md:-left-[66px]` to `md:-left-[72px]`.
    - **Reasoning**: To align the dot's center (16px width -> 8px) with the spine's center. The spine is at `left-[30px]` and 4px wide (center 32px).
    - Wrapper starts at 96px.
    - Target Center = 32px.
    - Dot Left should be `32 - 8 = 24px`.
    - Relative Left = `24 - 96 = -72px`.
    - Previous `-66px` resulted in a center of `30px + 6px offset`. The dot was 6px to the right of center.

## Verification
- Dot should now be perfectly centered on the vertical spine line.
