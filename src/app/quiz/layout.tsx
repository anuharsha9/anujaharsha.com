import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inside My Head — A Design-Thinking Quiz | Anuja Harsha',
  description:
    'A short interactive walk through how I actually think. Face a few real design scenarios and watch the reasoning light up — the brain behind the portfolio.',
  alternates: { canonical: 'https://anujaharsha.com/quiz/' },
  openGraph: {
    title: 'Inside My Head — A Design-Thinking Quiz',
    description: 'Face a few real design scenarios and watch how I think.',
    type: 'website',
    images: ['/opengraph-image'],
  },
}

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
