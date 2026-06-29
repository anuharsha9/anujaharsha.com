'use client'

import ImmersiveBrainExperience from '@/components/home/ImmersiveBrainExperience'

export default function QuizPage() {
    return (
        <div className="bg-black relative overflow-clip min-h-screen">
            <ImmersiveBrainExperience forceQuiz={true} />
        </div>
    )
}
