

import os

svg_path = 'public/assets/brain-gears-white.svg'
ts_path = 'src/data/brain-gears-svg.ts'

try:
    with open(svg_path, 'r') as f:
        svg_content = f.read()
    
    # Escape backticks if any (unlikely in standard SVG but safe to do)
    svg_content = svg_content.replace('`', '\\`')
    
    # Create TS content
    ts_content = f"""export const BRAIN_GEARS_SVG = `
{svg_content}
`;
"""
    
    with open(ts_path, 'w') as f:
        f.write(ts_content)
        
    print(f"Successfully created {ts_path}")

except Exception as e:
    print(f"Error: {e}")
