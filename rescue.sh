#!/bin/bash
P="/Users/anu/Work/anu-portfolio-exploration"
cd "$P"

echo "Step 1: Restoring committed versions of corrupted files..."
git checkout -- src/app/globals.css
git checkout -- src/styles/tokens.css
git checkout -- src/lib/design-system.ts
git checkout -- tailwind.config.ts
git checkout -- src/components/ui/ComponentHeading.tsx
git checkout -- src/components/loading/LoadingScreen.tsx
git checkout -- src/components/transitions/PageTransition.tsx
git checkout -- src/components/work/MotionWorkCard.tsx
git checkout -- src/components/work/GameLightbox.tsx
git checkout -- src/app/page.tsx

echo "Step 2: Cleaning up helper scripts..."
rm -f "$P/restore.sh" "$P/fix-bom.sh"

echo ""
echo "All corrupted files restored to last committed version!"
echo "Your site should work again at localhost:3000"
