import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Anu Harsha | Design Manifesto',
  description: 'Untangling 50 years of tech debt. See how I compartmentalize and redesign enterprise systems for zero friction.',
  alternates: { canonical: 'https://anujaharsha.com/manifesto/' },
  openGraph: {
    title: 'Anu Harsha | Design Manifesto',
    description: 'Untangling 50 years of tech debt. See how I compartmentalize and redesign enterprise systems for zero friction.',
    type: 'website',
    images: ['/opengraph-image'],
  },
}

export default function ManifestoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
