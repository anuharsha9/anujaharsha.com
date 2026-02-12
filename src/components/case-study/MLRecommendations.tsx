'use client'

import { motion } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface MLRecommendationsProps {
  isLightBackground?: boolean
}

export default function MLRecommendations({ isLightBackground = false, showHeader = true }: MLRecommendationsProps & { showHeader?: boolean }) {
  const recommendations = [
    {
      name: 'Marcus Horbach',
      tag: '[DOMAIN_EXPERT]',
      role: 'Principal Data Scientist',
      company: 'Cloud Software Group',
      quote: 'The clarity of her designs, in spite of the underlying data science and machine learning complexity, is impressive and has greatly contributed to the success of our products. Her design solutions are rooted in a deep understanding of the purpose of the product, always leading to clean designs and products that are a genuine joy to use.'
    },
    {
      name: 'Karishma Khadge',
      tag: '[PRODUCT_STRATEGY]',
      role: 'Senior Product Manager',
      company: 'Cloud Software Group',
      quote: 'Anuja led UX design initiatives with remarkable creativity, empathy, and precision. She consistently demonstrated a deep understanding of user-centered design and the ability to translate complex product requirements into intuitive and visually engaging experiences. What truly stands out is her collaborative spirit and problem-solving mindset.'
    },
    {
      name: 'Vijay Raman',
      tag: '[EXECUTIVE_LEADERSHIP]',
      role: 'VP of Product Management',
      company: 'Cloud Software Group',
      quote: 'Anuja made a significant impact modernizing UX across our legacy enterprise products. She brings a rare combination of strategic thinking, design intuition, and the ability to work seamlessly across product, engineering, and business teams. Anuja is bold in her ideas and consistently proactive in turning complex problems into practical, user-centered solutions.'
    },
    {
      name: 'Anita George',
      tag: '[CUSTOMER_PROXY]',
      role: 'Principal Account Technology Strategist',
      company: 'Cloud Software Group',
      quote: "During a User Acceptance Test session, Anuja observed me navigating the screen, asking targeted questions about my workflow choices and tracking my visual focus. I was highly impressed with Anuja's approach. Her design was clean, intuitive, and clearly addressed the needs of users across different skill levels."
    },
  ]

  return (
    <div className="space-y-10">
      {/* Section Header */}
      {showHeader && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-3"
        >
          <ComponentHeading
            variant="block"
            tag="// CROSS_FUNCTIONAL_EVIDENCE"
            title="Validation from Cross-Functional Team"
            description="Verified testimonials from key stakeholders across domain expertise, product strategy, executive leadership, and customer-facing roles."
            color="blue"
            align="center"
            className="mb-0"
          />
        </motion.div>
      )}

      {/* Testimonial Cards - 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white border border-slate-200 p-8 h-full relative hover:shadow-lg transition-all duration-300"
          >
            {/* Large Quotation Mark Decoration */}
            <span className="absolute top-4 left-6 text-5xl text-blue-100 font-serif leading-none select-none pointer-events-none">
              &ldquo;
            </span>

            {/* Quote Text */}
            <blockquote className="relative z-10 pt-8">
              <p className="font-serif italic text-lg text-slate-700 leading-relaxed">
                {r.quote}
              </p>
            </blockquote>

            {/* Author Info */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              {/* Role Tag */}
              <span className="font-mono text-[10px] uppercase tracking-widest text-blue-600 block mb-1">
                {r.tag}
              </span>

              {/* Author Name */}
              <p className="font-sans font-bold text-slate-900">
                {r.name}
              </p>

              {/* Title */}
              <p className="font-sans text-xs text-slate-500">
                {r.role}, {r.company}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* System Outcome Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-slate-900 p-6"
      >
        <div className="flex items-start gap-3">
          <span className="font-mono text-sm text-emerald-400 flex-shrink-0">
            &gt; VALIDATION:
          </span>
          <p className="text-slate-300 text-sm leading-relaxed">
            Four perspectives, one conclusion: <span className="text-emerald-400 font-medium">design clarity at the intersection of complexity</span>.
            From domain experts validating technical accuracy to customer proxies confirming usability — the cross-functional evidence confirms systemic improvement.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
