'use client'

import { useRouter } from 'next/navigation'
import ImmersiveBrainExperience from '@/components/home/ImmersiveBrainExperience'
import { ArrowLeft } from 'lucide-react'

export default function QuizPage() {
    const router = useRouter()

    return (
        <div className="bg-black relative overflow-clip min-h-screen">
            <ImmersiveBrainExperience forceQuiz={true} />

            {/* Home button to return to homepage */}
            <button
                onClick={() => router.push('/')}
                className="fixed top-6 left-6 z-[9999] flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300 cursor-pointer"
                aria-label="Back to homepage"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-widest">Home</span>
            </button>
        </div>
    )
}

