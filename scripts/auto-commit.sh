#!/bin/bash
# ─────────────────────────────────────────────────────────────
# Auto-commit: commits all changes to current branch daily
# ─────────────────────────────────────────────────────────────

REPO="/Users/anu/Work/anu-portfolio-exploration"
cd "$REPO" || exit 1

# Only commit if there are changes
if [ -z "$(git status --porcelain)" ]; then
    echo "$(date): No changes to commit" >> /tmp/portfolio-autocommit.log
    exit 0
fi

BRANCH=$(git branch --show-current)
TIMESTAMP=$(date '+%Y-%m-%d %H:%M')

git add -A
git commit -m "auto-save: $TIMESTAMP [$BRANCH]"

echo "$(date): Committed changes on $BRANCH" >> /tmp/portfolio-autocommit.log
