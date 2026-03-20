import { CaseStudyData } from '@/types/caseStudy'

interface StructuredDataProps {
  type: 'website' | 'person' | 'article' | 'caseStudy' | 'profilePage' | 'portfolio'
  data?: CaseStudyData
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anujaharsha.com'

  const getWebsiteSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Anuja Harsha Nimmagadda — Senior Product Designer',
    url: siteUrl,
    description:
      'Senior Product Designer who makes complex enterprise products easier to understand, use, and adopt. 13 years modernizing legacy workflows, designing AI-native experiences, and shipping data-driven platforms at scale.',
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
    image: `${siteUrl}/images/og-avatar.png`,
    jobTitle: 'Senior Product Designer',
    description:
      'Senior Product Designer who makes complex enterprise products easier to understand, use, and adopt. 13 years modernizing legacy workflows, designing AI-native experiences, and shipping data-driven platforms at scale. Specializes in enterprise complexity, data workflow modernization, and AI-native design.',
    email: 'anujanimmagadda@gmail.com',
    telephone: '+1-781-354-7394',
    sameAs: [
      'https://www.linkedin.com/in/anu159',
      'https://medium.com/@anujaharsha',
      'https://adplist.org/mentors/anuja-harsha',
    ],
    knowsAbout: [
      // Growing role capabilities (Shift UX 2026)
      'UX Architecture',
      'Information Architecture',
      'Design Strategy',
      'Design Technology',
      'Experience Design',
      // Core expertise
      'Enterprise UX Design',
      'B2B Enterprise Product Design',
      'Legacy System Modernization',
      'Data Workflow Modernization',
      'Complex Systems Design',
      'Design Systems',
      'Product Strategy',
      'Systems Thinking',
      'Cross-functional Leadership',
      'Engineering Empathy',
      // AI / ML
      'AI-Native Design',
      'Machine Learning UX',
      'Data Science UX',
      'ML Workflow Design',
      // Technical
      'Code Prototyping',
      'High Fidelity Prototyping',
      'Next.js',
      'TypeScript',
      'React',
      'Framer Motion',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Senior Product Designer',
      occupationLocation: {
        '@type': 'Country',
        name: 'United States',
      },
      skills: 'Enterprise UX, AI-Native Design, Legacy Modernization, Code Prototyping, Systems Thinking, Design Systems, Cross-functional Leadership, Data Workflow Modernization',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Bridgeport',
    },
    seeks: {
      '@type': 'Demand',
      name: 'Senior or Staff Product Designer role',
      description: 'Open to work — seeking Senior or Staff Product Designer roles. Specializes in making complex enterprise products easier to understand, use, and adopt. 13 years across legacy modernization, AI-native design, and data-driven platforms.',
    },
  })

  /**
   * ProfilePage schema — Google's dedicated schema for portfolio/about pages.
   * Helps Google understand this is a professional profile with work samples.
   */
  const getProfilePageSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: '2024-01-01T00:00:00.000Z',
    dateModified: new Date().toISOString(),
    mainEntity: {
      '@type': 'Person',
      name: 'Anuja Harsha Nimmagadda',
      alternateName: ['Anuja Harsha', 'Anuja Nimmagadda'],
      url: siteUrl,
      image: `${siteUrl}/images/og-avatar.png`,
      jobTitle: 'Senior Product Designer',
      description: 'I make complex enterprise products easier to understand, use, and adopt.',
      sameAs: [
        'https://www.linkedin.com/in/anu159',
        'https://medium.com/@anujaharsha',
        'https://adplist.org/mentors/anuja-harsha',
      ],
    },
  })

  /**
   * ItemList schema — makes case studies appear as a structured collection.
   * Google may display these as rich results with project thumbnails.
   */
  const getPortfolioSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'UX Case Studies by Anuja Harsha Nimmagadda',
    description: 'Enterprise product design case studies: legacy modernization, AI workflow design, and platform unification.',
    numberOfItems: 3,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        url: `${siteUrl}/work/reportcaster/`,
        name: 'Legacy Modernization — Enterprise Scheduling Platform Redesign',
        description: 'Modernized a 40-year enterprise scheduling platform without disrupting 20M+ active workflows. Consolidated 5 subsystems into 1 unified hub.',
      },
      {
        '@type': 'ListItem',
        position: 2,
        url: `${siteUrl}/work/ml-functions/`,
        name: 'AI Workflow Design — Making ML Accessible Without Sacrificing Power',
        description: 'Transformed engineer-only ML workflows into guided experiences any business user could operate. Zero ML knowledge to full UX ownership.',
      },
      {
        '@type': 'ListItem',
        position: 3,
        url: `${siteUrl}/work/iq-plugin/`,
        name: 'Platform Unification — AI Features Discovery & DSML Hub',
        description: 'Unified three fragmented AI capabilities (NLQ, Insights, ML) into one discoverable DSML Hub, driving a 25% adoption boost.',
      },
    ],
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
        jobTitle: 'Senior Product Designer',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Anuja Harsha Nimmagadda',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/opengraph-image`,
        },
      },
      image: data.coverImage && typeof data.coverImage === 'string'
        ? `${siteUrl}${data.coverImage}`
        : data.coverImage?.src
          ? `${siteUrl}${data.coverImage.src}`
          : `${siteUrl}/opengraph-image`,
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
          url: `${siteUrl}/opengraph-image`,
        },
      },
      image: data.coverImage
        ? `${siteUrl}${data.coverImage.src}`
        : `${siteUrl}/opengraph-image`,
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
    case 'profilePage':
      schema = getProfilePageSchema()
      break
    case 'portfolio':
      schema = getPortfolioSchema()
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
