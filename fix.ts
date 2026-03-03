import fs from 'fs';

const filePath = '/Users/anu/Work/anu-portfolio-exploration/src/components/case-study-experiment/CinematicCaseStudy.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Find the precise replacement start
const startMarker = '<div className="max-w-[1440px] mx-auto px-6 md:px-16 pt-8">';
const startIdx = content.indexOf(startMarker); // It occurs late in the file

if (startIdx !== -1) {
    const endMarker = '</div>\n                    </div>\n                )}';
    const endIdx = content.indexOf(endMarker, startIdx);
    
    // Replace the grid logic
    const newContent = `                        <div className="max-w-[1440px] mx-auto px-6 md:px-16 pt-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-16">
                                <div className="space-y-8">
                                    <div className="inline-block w-max border border-white/10 rounded-full px-4 py-1">
                                        <span className="text-[var(--accent-teal)] font-mono text-[10px] uppercase tracking-[0.2em]">
                                            EVIDENCE: SUPPORT CALLS
                                        </span>
                                    </div>
                                    <h4 className="text-3xl md:text-5xl font-bold text-white tracking-tight">The Detective Work</h4>
                                    <p className="text-zinc-400 font-light text-xl leading-relaxed">
                                        Because enterprise security blocked direct user access, I had to build my own research network to uncover the real problems.
                                    </p>
                                </div>
                                <div className="space-y-8">
                                    <div className="flex items-start gap-6">
                                        <div className="w-12 h-12 rounded-full border border-[var(--accent-teal)]/20 flex items-center justify-center shrink-0 mt-1">
                                            <HeadphonesIcon className="w-5 h-5 text-[var(--accent-teal)]" strokeWidth={1.5} />
                                        </div>
                                        <p className="text-zinc-400 font-light text-lg leading-relaxed m-0">
                                            Shadowed <strong className="text-white font-medium">Support Reps</strong> to map user workarounds and pain points.
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-6">
                                        <div className="w-12 h-12 rounded-full border border-[var(--accent-teal)]/20 flex items-center justify-center shrink-0 mt-1">
                                            <UsersIcon className="w-5 h-5 text-[var(--accent-teal)]" strokeWidth={1.5} />
                                        </div>
                                        <p className="text-zinc-400 font-light text-lg leading-relaxed m-0">
                                            Deconstructed logic with <strong className="text-white font-medium">the sole engineer</strong> who maintained it for decades.
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-6">
                                        <div className="w-12 h-12 rounded-full border border-[var(--accent-teal)]/20 flex items-center justify-center shrink-0 mt-1">
                                            <FileWarningIcon className="w-5 h-5 text-[var(--accent-teal)]" strokeWidth={1.5} />
                                        </div>
                                        <p className="text-zinc-400 font-light text-lg leading-relaxed m-0">
                                            Extracted hidden failure rules from <strong className="text-white font-medium">internal QA SMEs</strong>.
                                        </p>
                                    </div>
                                </div>
                            </div>
`;
    // We replace from startIdx to the end of the file
    content = content.substring(0, startIdx) + newContent + content.substring(endIdx);
    fs.writeFileSync(filePath, content, 'utf8');
} else {
    console.error("Marker not found");
}

