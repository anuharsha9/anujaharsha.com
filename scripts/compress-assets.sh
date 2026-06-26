#!/usr/bin/env bash
# Asset compression sweep — videos to lower-bitrate H.264 + faststart,
# large PNGs/JPGs re-encoded via sharp. Idempotent: encodes to a sibling
# `.compressed.*` file first and only swaps in if the new file is smaller.
#
# Usage:
#   bash scripts/compress-assets.sh           # do everything
#   bash scripts/compress-assets.sh --videos  # videos only
#   bash scripts/compress-assets.sh --images  # images only
#   bash scripts/compress-assets.sh --dry-run # list candidates only

set -uo pipefail
# Note: NOT using `set -e`. Per-file failure should not bail the loop —
# the explicit if/else around ffmpeg + sharp handles non-zero exit.

MODE="${1:---all}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DRY_RUN=false

case "$MODE" in
    --dry-run) DRY_RUN=true; SCOPE="all" ;;
    --videos)  SCOPE="videos" ;;
    --images)  SCOPE="images" ;;
    --all|*)   SCOPE="all" ;;
esac

VIDEO_MIN_KB=2048
IMAGE_MIN_KB=300

size_bytes() {
    stat -f%z "$1" 2>/dev/null || stat -c%s "$1" 2>/dev/null
}

human_size() {
    local b
    b=$(size_bytes "$1")
    if   [ "$b" -gt 1048576 ]; then printf "%d.%01dM" $((b / 1048576)) $(((b * 10 / 1048576) % 10))
    elif [ "$b" -gt 1024 ];    then printf "%dK" $((b / 1024))
    else                            printf "%dB" "$b"
    fi
}

compress_video() {
    local src="$1"
    local b_orig
    b_orig=$(size_bytes "$src")
    local kb_orig=$((b_orig / 1024))
    if [ "$kb_orig" -lt "$VIDEO_MIN_KB" ]; then
        printf "  · %s: %s — skip\n" "$(basename "$src")" "$(human_size "$src")"
        return
    fi
    local tmp="${src%.*}.compressed.mp4"
    printf "  · %s: %s → compressing..." "$(basename "$src")" "$(human_size "$src")"
    if [ "$DRY_RUN" = true ]; then
        printf " (dry-run)\n"
        return
    fi
    # -nostdin prevents ffmpeg from consuming the parent `while read` loop's
    # stdin, which was silently eating the next iteration's filename.
    if ffmpeg -nostdin -loglevel error -i "$src" \
        -c:v libx264 -crf 26 -preset slow \
        -c:a aac -b:a 96k \
        -movflags +faststart \
        -pix_fmt yuv420p \
        -y "$tmp" 2>/dev/null
    then
        local b_new
        b_new=$(size_bytes "$tmp")
        if [ "$b_new" -lt "$b_orig" ]; then
            local pct=$(( 100 - (b_new * 100 / b_orig) ))
            mv "$tmp" "$src"
            printf " → %s (-%d%%)\n" "$(human_size "$src")" "$pct"
        else
            rm -f "$tmp"
            printf " → kept original\n"
        fi
    else
        rm -f "$tmp"
        printf " → ffmpeg failed, skipped\n"
    fi
}

compress_image() {
    local src="$1"
    local ext="${src##*.}"
    local ext_lc
    ext_lc=$(printf "%s" "$ext" | tr '[:upper:]' '[:lower:]')
    local b_orig
    b_orig=$(size_bytes "$src")
    local kb_orig=$((b_orig / 1024))
    if [ "$kb_orig" -lt "$IMAGE_MIN_KB" ]; then
        printf "  · %s: %s — skip\n" "$(basename "$src")" "$(human_size "$src")"
        return
    fi
    local tmp="${src%.*}.compressed.${ext_lc}"
    printf "  · %s: %s → optimizing..." "$(basename "$src")" "$(human_size "$src")"
    if [ "$DRY_RUN" = true ]; then
        printf " (dry-run)\n"
        return
    fi
    if node -e "
        const sharp = require('sharp');
        const ext = '${ext_lc}';
        const src = process.argv[1];
        const out = process.argv[2];
        const pipe = sharp(src);
        const config = ext === 'png'
            ? pipe.png({ compressionLevel: 9, palette: true, effort: 10 })
            : pipe.jpeg({ quality: 82, progressive: true, mozjpeg: true });
        config.toFile(out).then(() => process.exit(0)).catch(e => { console.error(e.message); process.exit(1); });
    " "$src" "$tmp" 2>/dev/null
    then
        local b_new
        b_new=$(size_bytes "$tmp")
        if [ "$b_new" -lt "$b_orig" ]; then
            local pct=$(( 100 - (b_new * 100 / b_orig) ))
            mv "$tmp" "$src"
            printf " → %s (-%d%%)\n" "$(human_size "$src")" "$pct"
        else
            rm -f "$tmp"
            printf " → kept original\n"
        fi
    else
        rm -f "$tmp"
        printf " → sharp failed, skipped\n"
    fi
}

if [ "$SCOPE" = "videos" ] || [ "$SCOPE" = "all" ]; then
    echo ""
    echo "═══ VIDEOS ═══"
    while IFS= read -r f; do compress_video "$f"; done < <(find "$ROOT/public/videos" -type f -name "*.mp4")
fi

if [ "$SCOPE" = "images" ] || [ "$SCOPE" = "all" ]; then
    echo ""
    echo "═══ PNG IMAGES ═══"
    while IFS= read -r f; do compress_image "$f"; done < <(find "$ROOT/public/images" -type f -name "*.png")

    echo ""
    echo "═══ JPG IMAGES ═══"
    while IFS= read -r f; do compress_image "$f"; done < <(find "$ROOT/public/images" -type f \( -name "*.jpg" -o -name "*.jpeg" \))
fi

echo ""
echo "Done."
