import { CaseStudyData } from '@/types/caseStudy'

interface StructuredDataProps {
  type: 'website' | 'person' | 'article' | 'caseStudy'
  data?: CaseStudyData
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anujaharsha.com'

  const getWebsiteSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Anuja Harsha Nimmagadda',
    url: siteUrl,
    description:
      'Senior Product Designer specializing in untangling complex enterprise systems. 13+ years transforming legacy workflows into intuitive experiences at scale.',
    author: {
      '@type': 'Person',
      name: 'Anuja Harsha Nimmagadda',
      url: siteUrl,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  })

  const getPersonSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Anuja Harsha Nimmagadda',
    alternateName: ['Anuja Harsha', 'Anuja Nimmagadda'],
    url: siteUrl,
    jobTitle: 'Senior Product Designer',
    description:
      'Senior Product Designer & Complexity Architect with 13+ years transforming high-ambiguity enterprise systems into high-impact products. Pioneering AI-Native design, vibe coding, and high-fidelity code prototyping. Known for the interactive Brain Gears portfolio experience. Open to work.',
    email: 'anujanimmagadda@gmail.com',
    telephone: '+1-781-354-7394',
    sameAs: [
      'https://www.linkedin.com/in/anu159',
    ],
    knowsAbout: [
      'User Experience Design',
      'Enterprise UX',
      'B2B Enterprise UX',
      'AI/ML UX',
      'AI-Native Design',
      'Vibe Coding',
      'Code Prototyping',
      'High Fidelity Code Prototyping',
      'Legacy System Modernization',
      'Design Systems',
      'Product Design',
      'Product Strategy',
      'Systems Thinking',
      'Cross-functional Leadership',
      'Engineering Empathy',
      'Data Science UX',
      'Machine Learning UX',
      'Interactive Animation',
      'Brain Gear Animation',
      'Framer Motion',
      'Next.js',
      'TypeScript',
      'Multi-Agent AI Workflow',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Senior Product Designer',
      occupationLocation: {
        '@type': 'Country',
        name: 'United States',
      },
      skills: 'Enterprise UX, AI-Native Design, Vibe Coding, Code Prototyping, Systems Thinking, Design Systems, Cross-functional Leadership',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Bridgeport',
    },
    seeks: {
      '@type': 'Demand',
      name: 'Senior or Staff Product Designer role',
      description: 'Open to work — seeking Senior or Staff Product Designer roles at innovative companies. Specializes in complex enterprise systems, AI-Native design, and code prototyping.',
    },
  })

  const getArticleSchema = () => {
    if (!data) return null

    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.heroTitle,
      description: data.heroSubheading,
      author: {
        '@type': 'Person',
        name: 'Anuja Harsha Nimmagadda',
        url: siteUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Anuja Harsha Nimmagadda',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/og-image.png`,
        },
      },
      image: data.coverImage && typeof data.coverImage === 'string'
        ? `${siteUrl}${data.coverImage}`
        : data.coverImage?.src
          ? `${siteUrl}${data.coverImage.src}`
          : `${siteUrl}/images/og-image.png`,
      datePublished: data.publishedDate || '2025-01-02T00:00:00.000Z',
      dateModified: data.updatedDate || '2025-01-02T00:00:00.000Z',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${siteUrl}/work/${data.slug}/`,
      },
    }
  }

  const getCaseStudySchema = () => {
    if (!data) return null

    // Enhanced schema with Project type for better SEO
    return {
      '@context': 'https://schema.org',
      '@type': ['Article', 'CreativeWork'],
      headline: data.heroTitle,
      description: data.heroSubtitle || data.heroSubheading,
      author: {
        '@type': 'Person',
        name: 'Anuja Harsha Nimmagadda',
        url: siteUrl,
        jobTitle: 'Senior Product Designer',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Anuja Harsha Nimmagadda',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/og-image.png`,
        },
      },
      image: data.coverImage
        ? `${siteUrl}${data.coverImage.src}`
        : `${siteUrl}/images/og-image.png`,
      url: `${siteUrl}/work/${data.slug}/`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${siteUrl}/work/${data.slug}/`,
      },
      datePublished: data.publishedDate || '2025-01-02T00:00:00.000Z',
      dateModified: data.updatedDate || '2025-01-02T00:00:00.000Z',
      about: {
        '@type': 'Thing',
        name: data.scope?.join(', ') || 'UX Design',
      },
      keywords: data.scope?.join(', ') || 'UX Design, Enterprise Design',
      // Additional Project schema properties
      projectType: 'Case Study',
      workExample: {
        '@type': 'CreativeWork',
        name: data.heroTitle,
        description: data.heroSubtitle || data.heroSubheading,
      },
    }
  }

  let schema

  switch (type) {
    case 'website':
      schema = getWebsiteSchema()
      break
    case 'person':
      schema = getPersonSchema()
      break
    case 'article':
      schema = getArticleSchema()
      break
    case 'caseStudy':
      schema = getCaseStudySchema()
      break
    default:
      return null
  }

  if (!schema) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

