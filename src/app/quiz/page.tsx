'use client'

import { useRouter } from 'next/navigation'
import ImmersiveBrainExperience from '@/components/home/ImmersiveBrainExperience'
import { X } from 'lucide-react'

export default function QuizPage() {
    const router = useRouter()

    return (
        <div className="bg-black relative overflow-clip min-h-screen">
            <ImmersiveBrainExperience forceQuiz={true} />

            {/* Fixed X button to return to homepage */}
            <button
                onClick={() => router.push('/')}
                className="fixed top-6 right-6 z-[9999] w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Back to homepage"
            >
                <X className="w-6 h-6" />
            </button>
        </div>
    )
}
