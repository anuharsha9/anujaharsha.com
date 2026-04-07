import * as THREE from 'three';
import { SVGLoader } from 'three-stdlib';
import { BRAIN_GEARS_SVG } from './src/data/brain-gears-svg';

const loader = new SVGLoader();
const svgData = loader.parse(BRAIN_GEARS_SVG);

console.log("Parsed paths count:", svgData.paths.length);
svgData.paths.forEach((p, i) => {
    // try to find id from userData.node
    console.log(`Path ${i} ID:`, p.userData?.node?.id, p.userData?.node?.parentNode?.id);
});
