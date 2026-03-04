#!/bin/bash
# ─────────────────────────────────────────────────────────────
# Video Converter + S3 Uploader
# ─────────────────────────────────────────────────────────────
# Converts .mov originals → high-quality web-optimized .mp4
# Then uploads to S3 and serves via CloudFront
#
# USAGE:
#   1. Place your .mov files in a folder (e.g. ~/Desktop/video-originals/)
#   2. Run: ./scripts/upload-videos.sh ~/Desktop/video-originals/
#
# Expected files in the folder:
#   intro-video.mov           → ME page hero
#   rc-prototype-walkthrough.mov  → RC case study
#   rc-old-workflow.mov       → RC before/after
#   ml-prototype-walkthrough.mov  → ML case study
#   iq-prototype-walkthrough.mov  → DSML case study
#
# You can also pass a single file:
#   ./scripts/upload-videos.sh ~/Desktop/intro-video.mov
# ─────────────────────────────────────────────────────────────

set -e

S3_BUCKET="s3://anujaharsha.com"
CF_DISTRIBUTION="E1RKSKYEABLX6E"
REGION="us-east-1"
OUTPUT_DIR="/tmp/portfolio-videos-optimized"

mkdir -p "$OUTPUT_DIR"

convert_video() {
    local input="$1"
    local basename=$(basename "$input" .mov)
    local output="$OUTPUT_DIR/${basename}.mp4"

    echo ""
    echo "🎬 Converting: $basename"
    echo "   Input:  $input"
    echo "   Output: $output"

    # High-quality web settings:
    # - H.264 with CRF 20 (visually lossless, great quality)
    # - Faststart for progressive download (play before fully loaded)
    # - AAC audio at 128k
    # - Scale to max 1920px wide, maintain aspect ratio
    ffmpeg -i "$input" \
        -c:v libx264 \
        -preset slow \
        -crf 20 \
        -pix_fmt yuv420p \
        -vf "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease" \
        -c:a aac -b:a 128k \
        -movflags +faststart \
        -y \
        "$output"

    local size=$(ls -lh "$output" | awk '{print $5}')
    echo "   ✅ Done: $size"
}

upload_to_s3() {
    local file="$1"
    local basename=$(basename "$file")

    echo ""
    echo "☁️  Uploading: $basename → S3"

    aws s3 cp "$file" "$S3_BUCKET/videos/$basename" \
        --region "$REGION" \
        --cache-control "public, max-age=31536000, immutable" \
        --content-type "video/mp4"

    echo "   ✅ Uploaded to $S3_BUCKET/videos/$basename"
}

# ─── Main ───

INPUT="$1"

if [ -z "$INPUT" ]; then
    echo "Usage: ./scripts/upload-videos.sh <folder-with-mov-files>"
    echo "   or: ./scripts/upload-videos.sh <single-file.mov>"
    exit 1
fi

if [ -d "$INPUT" ]; then
    # Process all .mov files in directory
    for mov in "$INPUT"/*.mov; do
        [ -f "$mov" ] || continue
        convert_video "$mov"
    done
elif [ -f "$INPUT" ]; then
    convert_video "$INPUT"
else
    echo "❌ Not found: $INPUT"
    exit 1
fi

echo ""
echo "═══════════════════════════════════════"
echo "📁 Converted files in: $OUTPUT_DIR"
ls -lh "$OUTPUT_DIR"/*.mp4 2>/dev/null
echo "═══════════════════════════════════════"
echo ""

read -p "Upload all to S3? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    for mp4 in "$OUTPUT_DIR"/*.mp4; do
        [ -f "$mp4" ] || continue
        upload_to_s3 "$mp4"
    done

    echo ""
    echo "🔄 Invalidating CloudFront cache for /videos/*"
    aws cloudfront create-invalidation \
        --distribution-id "$CF_DISTRIBUTION" \
        --paths "/videos/*" \
        --query 'Invalidation.Id' \
        --output text

    echo ""
    echo "✅ All done! Videos will be live via CloudFront in 1-3 minutes."
    echo "   Test: https://anujaharsha.com/videos/intro-video.mp4"
else
    echo "Skipped upload. Files are in $OUTPUT_DIR"
fi
