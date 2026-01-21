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
      'Senior Product Designer specializing in enterprise design, legacy modernization, and AI/ML UX.',
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
    url: siteUrl,
    jobTitle: 'Senior Product Designer',
    description:
      'Senior Product Designer specializing in enterprise design, legacy modernization, and AI/ML UX. 13+ years transforming complex systems into intuitive experiences.',
    email: 'anujanimmagadda@gmail.com',
    telephone: '+1-781-354-7394',
    sameAs: [
      'https://www.linkedin.com/in/anu159',
      // Add other social profiles here
    ],
    knowsAbout: [
      'User Experience Design',
      'Enterprise UX',
      'AI/ML UX',
      'Legacy System Modernization',
      'Design Systems',
      'Product Design',
    ],
    alumniOf: {
      '@type': 'Organization',
      name: 'Design Education', // Update with actual education
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

