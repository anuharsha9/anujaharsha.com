import JobLogRedesignViz from '@/components/case-study/JobLogRedesignViz'
import BeatFragmentation from '@/components/case-study/storyboard/BeatFragmentation'
import BeatBreakthrough from '@/components/case-study/storyboard/BeatBreakthrough'
import BeatScheduler from '@/components/case-study/storyboard/BeatScheduler'
import BeatRecurrence from '@/components/case-study/storyboard/BeatRecurrence'

export default function ScreenshotPage() {
    return (
        <div className="bg-[#09090b] min-h-screen text-white pt-24 pb-24 font-sans antialiased">
            <h1 className="text-center text-4xl mb-24">Screenshot Target Page</h1>
            
            <div id="target-job-log-redesign" className="w-full max-w-5xl mx-auto mb-[2000px] border border-white/10 rounded-2xl p-8 bg-[#141417]">
                <h2 className="text-2xl mb-8 opacity-50">JobLogRedesignViz (25s)</h2>
                <JobLogRedesignViz />
            </div>

            <div id="target-beat-fragmentation" className="w-full max-w-5xl mx-auto mb-[2000px] border border-white/10 rounded-2xl p-8 bg-[#141417]">
                <h2 className="text-2xl mb-8 opacity-50">BeatFragmentation (15s)</h2>
                <BeatFragmentation />
            </div>

            <div id="target-beat-breakthrough" className="w-full max-w-5xl mx-auto mb-[2000px] border border-white/10 rounded-2xl p-8 bg-[#141417]">
                <h2 className="text-2xl mb-8 opacity-50">BeatBreakthrough (7s)</h2>
                <BeatBreakthrough />
            </div>

            <div id="target-beat-scheduler" className="w-full max-w-5xl mx-auto mb-[2000px] border border-white/10 rounded-2xl p-8 bg-[#141417]">
                <h2 className="text-2xl mb-8 opacity-50">BeatScheduler (7s)</h2>
                <BeatScheduler />
            </div>

            <div id="target-beat-recurrence" className="w-full max-w-5xl mx-auto mb-[2000px] border border-white/10 rounded-2xl p-8 bg-[#141417]">
                <h2 className="text-2xl mb-8 opacity-50">BeatRecurrence (7s)</h2>
                <BeatRecurrence />
            </div>
            
            <div className="h-[2000px]"></div>
        </div>
    )
}
