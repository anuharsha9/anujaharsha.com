# Timeline Fix (Phase 2.1)

## Changes
- [x] **Dot Vertical Alignment**: Corrected the vertical position of the terminal dot from `md:top-[17px]` to `md:top-[35px]`.
    - **Reasoning**: The flex container has `pt-6` (24px). The connector line inside the item is at 19px. Total offset = 43px. The dot height is 16px (center at 8px). So dot top should be `43 - 8 = 35px`. My previous change to 17px was based on a miscalculation (assuming pt-6 was 6px).
    - **Result**: The dot should now be perfectly centered with the "BA Animation & VFX" icon connector line.

## Visual Check (User Screenshot)
- The user screenshot showed the dot sitting distinctly above the timeline item. This aligns with the `17px` vs `35px` discrepancy (18px too high). The fix moves it down by exactly that amount.
