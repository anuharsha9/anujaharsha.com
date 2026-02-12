import React from 'react';
import { motion } from 'framer-motion';

interface Metric {
    value: string;
    label: string;
}

interface ScaleAndResponsibilityProps {
    data: {
        metrics: Metric[];
        status: string;
        description: string;
    };
    accentColor?: 'teal' | 'amber' | 'violet';
}

export const ScaleAndResponsibility: React.FC<ScaleAndResponsibilityProps> = ({ data, accentColor = 'teal' }) => {
    const accentVar = accentColor === 'teal' ? 'var(--accent-teal)'
        : accentColor === 'amber' ? 'var(--accent-amber)'
            : 'var(--accent-violet)';

    return (
        <section className="w-full max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="py-12 md:py-16"
            >
                {/* Metrics Grid — Minimal & Large Type */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 mb-16 items-center">
                    {data.metrics.map((metric, idx) => (
                        <div
                            key={idx}
                            className={`
                                flex flex-col items-center justify-center text-center
                                ${idx !== data.metrics.length - 1 ? 'md:border-r border-slate-100' : ''}
                            `}
                        >
                            <span
                                className="text-5xl md:text-6xl font-extralight mb-2 tracking-tighter number-font"
                                style={{ color: accentVar }}
                            >
                                {metric.value}
                            </span>
                            <span className="text-slate-400 text-[11px] uppercase tracking-[0.2em] font-medium">
                                {metric.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Status + Description — Clean Text */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 mb-2">
                        <div
                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                            style={{ backgroundColor: accentVar }}
                        />
                        <span className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-medium">{data.status}</span>
                    </div>

                    <p className="text-slate-700 text-lg md:text-xl leading-relaxed font-light text-balance">
                        {data.description}
                    </p>
                </div>
            </motion.div>
        </section>
    );
};
