import React from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { WorkItem } from '@/data/career-data'

interface WordUGameCardProps {
    work: WorkItem
    onPlay: () => void
}

export default function WordUGameCard({ work, onPlay }: WordUGameCardProps) {
    return (
        <a
            href={work.link}
            onClick={(e) => {
                e.preventDefault();
                onPlay();
            }}
            className="group/game relative block aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-[#078B9C]/50 hover:bg-white/[0.04] hover:shadow-[0_0_40px_-10px_rgba(7,139,156,0.3)] active:scale-[0.98]"
        >
            <div className="absolute inset-0 overflow-hidden">
                {work.image && (
                    <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover/game:scale-110"
                    />
                )}
                <div className="absolute inset-0 bg-slate-900/60 transition-colors duration-500 group-hover/game:bg-slate-900/40" />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover/game:scale-125 group-hover/game:bg-[#078B9C] group-hover/game:border-[#078B9C] transition-all duration-300 ease-spring shadow-2xl mb-6">
                    <Play className="w-6 h-6 text-white ml-1 fill-current" />
                </div>

                <div className="relative pointer-events-none transform transition-all duration-500">
                    <h3 className="text-3xl font-black text-white mb-2 drop-shadow-lg tracking-tight group-hover/game:scale-105 transition-transform duration-300">
                        {work.title}
                    </h3>
                    <div className="overflow-hidden h-0 group-hover/game:h-auto transition-all duration-500">
                        <p className="text-lg text-slate-200 font-medium opacity-0 transform translate-y-4 group-hover/game:opacity-100 group-hover/game:translate-y-0 transition-all duration-500 delay-100">
                            {work.description}
                        </p>
                        <div className="mt-4 flex items-center justify-center opacity-0 group-hover/game:opacity-100 transition-opacity duration-500 delay-200">
                            <span className="px-4 py-1.5 rounded-full bg-[#078B9C]/20 border border-[#078B9C]/40 text-[#078B9C] text-xs font-mono font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(7,139,156,0.2)]">
                                Click to Play
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    )
}
