'use client'

import React, { useRef, useState } from 'react'
import { m } from 'framer-motion'

interface MagneticProps {
    children: React.ReactNode
    className?: string
    strength?: number // How strong the pull is (higher = moves further)
}

export default function Magnetic({
    children,
    className = '',
    strength = 0.5
}: MagneticProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e
        const container = containerRef.current
        if (!container) return

        const { height, width, left, top } = container.getBoundingClientRect()

        // Calculate distance from the static container's center
        const middleX = clientX - (left + width / 2)
        const middleY = clientY - (top + height / 2)

        setPosition({ x: middleX * strength, y: middleY * strength })
    }

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 })
    }

    const { x, y } = position

    return (
        <div
            ref={containerRef}
            className={`relative flex items-center justify-center ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ padding: '30px', margin: '-30px' }} // Substantial hit area without affecting layout
        >
            <m.div
                animate={{ x, y }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.1,
                    restDelta: 0.001
                }}
            >
                {children}
            </m.div>
        </div>
    )
}
