import React from 'react';
import { User, Activity, CheckCircle2 } from 'lucide-react';

interface ProjectSnapshotProps {
    data: {
        problem: string;
        role: string;
        keyDecisions: string[];
        impactDirectional: string;
        status: string;
        scale?: string;
    };
}

export const ProjectSnapshot: React.FC<ProjectSnapshotProps> = ({ data }) => {
    return (
        <div className="w-full max-w-4xl mx-auto mb-16">
            <h3 className="text-sm font-medium tracking-wider text-[var(--accent-teal)] uppercase mb-6 flex items-center gap-2">
                <Activity className="w-4 h-4" /> Project Snapshot
            </h3>

            {/* Metro Grid Layout - Sharp Corners, Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
                {/* Tile 1: Problem Statement */}
                <div className="bg-white p-8 md:col-span-2">
                    <h4 className="text-slate-400 text-xs uppercase tracking-wider mb-2 font-bold">The Challenge</h4>
                    <p className="text-xl font-light text-slate-900 leading-relaxed text-balance">
                        {data.problem}
                    </p>
                </div>

                {/* Tile 2: Role */}
                <div className="bg-white p-6 flex flex-col justify-between group hover:bg-slate-50 transition-colors h-full">
                    <h4 className="text-slate-400 text-xs uppercase tracking-wider mb-4 font-bold flex items-center gap-2">
                        <User className="w-4 h-4" /> Responsibility
                    </h4>
                    <p className="text-2xl font-serif text-slate-900 leading-tight">
                        {data.role}
                    </p>
                </div>

                {/* Tile 3: Scale/Status or Just Status if Scale not present */}
                <div className="bg-white p-6 flex flex-col justify-between group hover:bg-slate-50 transition-colors h-full">
                    {data.scale ? (
                        <>
                            <h4 className="text-slate-400 text-xs uppercase tracking-wider mb-4 font-bold flex items-center gap-2">
                                <Activity className="w-4 h-4" /> Scale
                            </h4>
                            <div className="space-y-4">
                                <p className="text-2xl font-serif text-slate-900 leading-tight">
                                    {data.scale}
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 ${data.status.toLowerCase().includes('live') ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'}`} />
                                    <span className="text-xs font-mono uppercase tracking-wide text-slate-500">{data.status}</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <h4 className="text-slate-400 text-xs uppercase tracking-wider mb-4 font-bold flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" /> Status
                            </h4>
                            <div className="flex items-center gap-3 mt-auto">
                                <div className={`w-3 h-3 ${data.status.toLowerCase().includes('live') ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'}`} />
                                <p className="text-xl font-serif text-slate-900 leading-tight">
                                    {data.status}
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Tile 4: Key Pivots */}
                <div className="bg-white p-8 md:col-span-2 md:grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="text-slate-400 text-xs uppercase tracking-wider mb-4 font-bold">Key Strategy Pivots</h4>
                        <ul className="space-y-3">
                            {data.keyDecisions.map((decision, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm pl-3 border-l-2 border-[var(--accent-teal)]">
                                    {decision}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-6 md:mt-0">
                        <h4 className="text-slate-400 text-xs uppercase tracking-wider mb-4 font-bold">Directional Impact</h4>
                        <p className="text-lg font-medium text-[var(--accent-teal)] text-balance">
                            {data.impactDirectional}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
