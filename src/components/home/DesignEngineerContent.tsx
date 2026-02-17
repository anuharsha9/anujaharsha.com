'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Code2, Layers, Zap, Palette } from 'lucide-react'

const SKILLS = [
    { icon: Code2, label: 'Code-First Design', desc: 'Prototyping in React, not Figma' },
    { icon: Layers, label: 'Systems Thinking', desc: 'Scalable design tokens & architecture' },
    { icon: Zap, label: 'AI Workflows', desc: 'Orchestrating AI-driven design pipelines' },
    { icon: Palette, label: 'Visual Craft', desc: 'Motion, typography, spatial harmony' },
]

export default function DesignEngineerContent() {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SKILLS.map((skill, i) => (
                    <motion.div
                        key={skill.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="group relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-white/[0.12] transition-all duration-500"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] group-hover:bg-white/[0.08] transition-colors">
                                <skill.icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <h4 className="text-white font-medium text-lg">{skill.label}</h4>
                                <p className="text-slate-500 text-sm mt-1">{skill.desc}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
