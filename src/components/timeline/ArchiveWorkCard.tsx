import React from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { WorkItem } from '@/data/career-data'
import { ARCHIVE_GALLERY_DATA } from '@/data/archive-gallery'

interface ArchiveWorkCardProps {
    work: WorkItem
    onOpenLightbox: (id: string) => void
}

export default function ArchiveWorkCard({ work, onOpenLightbox }: ArchiveWorkCardProps) {
    const hasGallery = !!ARCHIVE_GALLERY_DATA[work.id];

    const handleClick = (e: React.MouseEvent) => {
        if (hasGallery) {
            e.preventDefault();
            onOpenLightbox(work.id);
        }
    };

    return (
        <a
            href={work.link}
            onClick={handleClick}
            target={work.link.startsWith('http') ? "_blank" : "_self"}
            rel={work.link.startsWith('http') ? "noopener noreferrer" : ""}
            className="group/archive relative block h-full aspect-square cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-[0_8px_30px_var(--overlay-black-50)] active:scale-[0.98]"
        >
            {work.image ? (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover/archive:scale-110"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 transition-opacity duration-300 group-hover/archive:opacity-0" />
                </div>
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center">
                    <span className="font-mono text-xs text-white/20 uppercase tracking-widest">{work.tags[0]}</span>
                </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-500 group-hover/archive:opacity-90" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 translate-y-2 transition-transform duration-500 group-hover/archive:translate-y-0">
                <h3 className="text-white font-sans text-xl font-bold leading-tight mb-3 drop-shadow-md">
                    {work.title}
                </h3>
                <div className="flex flex-wrap gap-2 opacity-80 group-hover/archive:opacity-100 transition-opacity duration-300">
                    {work.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] text-white/90 font-mono font-medium bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Hover Icon */}
            <div className="absolute top-4 right-4 z-20 opacity-0 transform translate-x-2 -translate-y-2 transition-all duration-500 group-hover/archive:opacity-100 group-hover/archive:translate-x-0 group-hover/archive:translate-y-0">
                <div className="bg-white/10 backdrop-blur-md rounded-full p-2.5 border border-white/20 shadow-lg group-hover/archive:bg-white/20">
                    <ArrowUpRight className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
            </div>
        </a>
    )
}

