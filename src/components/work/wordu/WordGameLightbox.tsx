'use client'

import React from 'react'
import WorduGame from './WorduGame'
import SystemLightbox from '@/components/ui/SystemLightbox'

interface WordGameLightboxProps {
    isOpen: boolean
    onClose: () => void
}

export default function WordGameLightbox({ isOpen, onClose }: WordGameLightboxProps) {
    // iPhone 17 Pro Max dimensions aspect ratio ~ 19.5:9
    // We'll create a mockup container that looks like the phone

    return (
        <SystemLightbox
            isOpen={isOpen}
            onClose={onClose}
            title="SYSTEM_GAME_MODE: WORDU"
            indexString="[ 01 / 01 ]"
            shortcuts={[
                { key: "ESC", label: "CLOSE" },
                { key: "SPACE", label: "PLAY" },
                { key: "← →", label: "NAVIGATE" }
            ]}
            className="flex items-center justify-center p-0 md:p-0 overflow-hidden"
            showArrows={false}
        >
            {/* iPhone 17 Pro Max Mockup Container */}
            <div className="relative w-[340px] md:w-[400px] aspect-[9/19.5] bg-black rounded-[55px] border-[8px] border-[var(--surface-charcoal-900)] shadow-2xl overflow-hidden ring-1 ring-white/10">

                {/* Dynamic Island / Notch Area */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-b-[20px] z-50 flex items-center justify-center gap-2">
                    {/* Camera lens simulation */}
                    <div className="w-3 h-3 rounded-full bg-[var(--surface-charcoal-950)] ring-1 ring-white/5" />
                </div>

                {/* Screen Content */}
                <div className="w-full h-full bg-white relative overflow-hidden flex flex-col">
                    {/* Status Bar simulation */}
                    <div className="w-full h-[40px] flex items-center justify-between px-6 pt-2 z-40 text-black font-medium text-xs">
                        <span>9:41</span>
                        <div className="flex items-center gap-1.5">
                            <div className="w-4 h-2.5 bg-black rounded-[2px]" /> {/* Signal */}
                            <div className="w-4 h-2.5 bg-black rounded-[2px]" /> {/* WiFi */}
                            <div className="w-6 h-2.5 border border-black rounded-[4px] relative">
                                <div className="absolute inset-[1px] right-2 bg-black rounded-[1px]" />
                            </div> {/* Battery */}
                        </div>
                    </div>

                    {/* Game Content */}
                    <div className="flex-1 w-full relative">
                        <WorduGame />
                    </div>

                    {/* Home Indicator */}
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-black/20 rounded-full z-50" />
                </div>

                {/* Side Buttons (Visual Only) */}
                <div className="absolute top-[100px] -left-[10px] w-[3px] h-[26px] bg-[var(--surface-charcoal-800)] rounded-l-md" /> {/* Mute */}
                <div className="absolute top-[140px] -left-[10px] w-[3px] h-[50px] bg-[var(--surface-charcoal-800)] rounded-l-md" /> {/* Vol Up */}
                <div className="absolute top-[200px] -left-[10px] w-[3px] h-[50px] bg-[var(--surface-charcoal-800)] rounded-l-md" /> {/* Vol Down */}
                <div className="absolute top-[180px] -right-[10px] w-[3px] h-[80px] bg-[var(--surface-charcoal-800)] rounded-r-md" /> {/* Power */}
            </div>
        </SystemLightbox>
    )
}
