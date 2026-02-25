import re

content_with_lines = r"""1: 'use client'
2: 
3: import React, { useRef, useState, useCallback, useEffect, useLayoutEffect } from 'react'
4: import {
5:     motion,
6:     useScroll,
7:     useTransform,
8:     useMotionValue,
9:     AnimatePresence,
10:     animate as fmAnimate,
11:     useMotionTemplate,
12:     useReducedMotion
13: } from 'framer-motion'
14: import HeroSplit from '@/components/home/HeroSplit'
15: import { ArrowDown, X, Play, Cog } from 'lucide-react'
16: import AutoPlayStory, { type MovieBeat } from '@/components/case-study/storyboard/AutoPlayStory'
17: import { useFocusTrap } from '@/hooks/useFocusTrap'
18: import {
19:     MovieBeatAssignment,
20:     MovieBeatDiscovery,
21:     MovieBeatChaos,
22:     MovieBeatPivots,
23:     MovieBeatBreakthrough,
24:     MovieBeatExecution,
25:     MovieBeatScale,
26:     MovieBeatShipped,
27: } from '@/components/case-study/storyboard/RCMovieBeats'
28: import { ML_MOVIE_BEATS } from '@/components/case-study/storyboard/MLMovieBeats'
29: 
30: const MOVIE_PACE = 1.28
31: const d = (ms: number) => Math.round(ms * MOVIE_PACE)
32: 
33: const RC_MOVIE_BEATS: MovieBeat[] = [
34:     {
35:         id: 'assignment',
36:         duration: d(7600),
37:         label: 'The Business Problem',
38:         signal: 'CUSTOMER LOSS',
39:         narration: 'The platform\'s enterprise scheduler — powering 20M+ weekly jobs — was losing customers.',
40:         narrationDelay: 0.1,
41:         component: <MovieBeatAssignment />,
42:     },
43:     {
44:         id: 'discovery',
45:         duration: d(7600),
46:         label: 'Discovery Arc',
47:         signal: 'SYSTEM ARCHAEOLOGY',
48:         narration: 'I volunteered one week in and mapped 5 undocumented subsystems from scratch.',
49:         narrationDelay: 0.1,
50:         component: <MovieBeatDiscovery />,
51:     },
52:     {
53:         id: 'chaos',
54:         duration: d(8600),
55:         label: 'The Chaos',
56:         signal: 'LEGACY DEBT',
57:         narration: '5 fragmented sub-products. Zero documentation. 4 clicks just to start a task.',
58:         narrationDelay: 0.05,
59:         component: <MovieBeatChaos />,
60:     },
61:     {
62:         id: 'pivots',
63:         duration: d(8400),
64:         label: 'Three Pivots',
65:         signal: 'ITERATION',
66:         narration: 'V1 rejected. V2 rejected. V3 — the breakthrough.',
67:         narrationDelay: 0.08,
68:         component: <MovieBeatPivots />,
69:     },
70:     {
71:         id: 'breakthrough',
72:         duration: d(9000),
73:         label: 'The Breakthrough',
74:         signal: 'UNIFIED HUB',
75:         narration: 'Three workflows. One button. Zero context switching.',
76:         narrationDelay: 0.06,
77:         component: <MovieBeatBreakthrough />,
78:     },
79:     {
80:         id: 'execution',
81:         duration: d(8400),
82:         label: 'Execution Arc',
83:         signal: 'FEATURE SYSTEM',
84:         narration: 'Consolidated 3 workflows into one "+" menu. Reduced creation clicks from 4 to 2.',
85:         narrationDelay: 0.06,
86:         component: <MovieBeatExecution />,
87:     },
88:     {
89:         id: 'scale',
90:         duration: d(7600),
91:         label: '250 Screens',
92:         signal: 'SCALE + HANDOFF',
93:         narration: 'I independently mapped the entire system and aligned a 20-person cross-functional team.',
94:         narrationDelay: 0.1,
95:         component: <MovieBeatScale />,
96:     },
97:     {
98:         id: 'shipped',
99:         duration: d(10400),
100:         label: 'Shipped + Impact',
101:         signal: 'OUTCOME',
102:         narration: 'Customers retained. Brand-new integrated system. Shipped April 2024.',
103:         narrationDelay: 0.08,
104:         component: <MovieBeatShipped />,
105:     },
106: ]
107: 
108: const [skipIntro, setSkipIntro] = useState(false)
109: const [showPhase2, setShowPhase2] = useState(false)
110: 
111: // Trigger phase 2 naturally if not skipped
112: useEffect(() => {
113:     if (skipIntro) {
114:         setShowPhase2(true)
115:         return
116:     }
117:     const timer = setTimeout(() => {
118:         setShowPhase2(true)
119:     }, 3800) // Phase 2 starts exactly at 3.8s
120:     return () => clearTimeout(timer)
121: }, [skipIntro])
122: 
123: const handleSkip = useCallback(() => {
124:     if (!skipIntro && !isWatching && !isExploringMind) {
125:         setSkipIntro(true)
126:     }
127: }, [skipIntro, isWatching, isExploringMind])
128: 
129: useEffect(() => {
130:     const handleKeyDown = (e: KeyboardEvent) => {
131:         if (e.key === 'Escape') {
132:             if (isWatching) exitWatchMode()
133:             if (isExploringMind) exitExploreMode()
134:         } else if (['Space', 'Enter', 'ArrowDown'].includes(e.code) || e.key === ' ') {
135:             handleSkip()
136:         }
137:     }
138:     window.addEventListener('keydown', handleKeyDown)
139:     return () => window.removeEventListener('keydown', handleKeyDown)
140: }, [isWatching, exitWatchMode, isExploringMind, exitExploreMode, handleSkip])
141: 
142: useEffect(() => {
143:     if (isWatching || isExploringMind) {
144:         document.body.style.overflow = 'hidden'
145:     } else {
146:         document.body.style.overflow = ''
147:     }
148:     return () => { document.body.style.overflow = '' }
149: }, [isWatching, isExploringMind])
150: 
151: 
152: // Gears logic removed in favor of Neural Data Drift
153: 
154: return (
155:     <div
156:         ref={containerRef}
157:         className="relative w-full z-10 font-sans cursor-default"
158:         style={{ height: '120vh' }}
159:         onClick={handleSkip}
160:         onWheel={handleSkip}
161:         onTouchMove={handleSkip}
162:     >
163:         {/* STICKY STAGE */}
164:         <div
165:             ref={overlayDialogRef}
166:             className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center"
167:             role={isWatching || isExploringMind ? 'dialog' : undefined}
168:             aria-modal={isWatching || isExploringMind ? true : undefined}
169:             aria-label={
170:                 isWatching
171:                     ? 'Flagship case study preview'
172:                     : isExploringMind
173:                         ? 'Explore my mind interactive mode'
174:                         : undefined
175:             }
176:             tabIndex={isWatching || isExploringMind ? -1 : undefined}
177:         >
178: 
179:             {/* --- BACKGROUND ANIMATED MOVIE --- */}
180:             <motion.div
181:                 className="absolute inset-0 z-0 bg-[var(--bg-cinematic)] flex items-center justify-center pointer-events-auto"
182:                 style={{ scale: videoScale, y: videoY, originY: 0, filter: videoFilterTemplate, opacity: videoOpacity }}
183:             >
184:                 <div className="w-full h-full transition-all duration-[1200ms]" style={{ padding: isWatching ? '4rem' : '0' }}>
185:                     <AnimatePresence mode="wait">
186:                         {activePresentation === 'RC' ? (
187:                             <motion.div key="rc-movie" className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
188:                                 <AutoPlayStory
189:                                     key={`landing-movie-${moviePlaybackVersion}`}
190:                                     beats={RC_MOVIE_BEATS}
191:                                     isInView={true}
192:                                     autoStart={true}
193:                                     loop={!isWatching} // Loop if ambient background, but stop if watching
194:                                     fullBleedBackground={true}
195:                                     onComplete={() => {
196:                                         if (isWatching) {
197:                                             setActivePresentation('ML')
198:                                         }
199:                                     }}
200:                                 />
201:                             </motion.div>
202:                         ) : activePresentation === 'ML' ? (
203:                             <motion.div key="ml-movie-beats" className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
204:                                 <AutoPlayStory
205:                                     key={`landing-ml-movie-${moviePlaybackVersion}`}
206:                                     beats={ML_MOVIE_BEATS}
207:                                     isInView={true}
208:                                     autoStart={true}
209:                                     loop={false}
210:                                     fullBleedBackground={true}
211:                                     onComplete={() => {
212:                                         if (isWatching) {
213:                                             setActivePresentation('DSML')
214:                                         }
215:                                     }}
216:                                 />
217:                             </motion.div>
218:                         ) : (
219:                             <motion.div
220:                                 key="dsml-movie"
221:                                 className="relative w-full h-full rounded-2xl overflow-hidden border border-white/[0.06] bg-zinc-950/90 shadow-2xl flex items-center justify-center group pointer-events-auto cursor-pointer"
222:                                 initial={{ opacity: 0, scale: 0.98 }}
223:                                 animate={{ opacity: 1, scale: 1 }}
224:                                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
225:                                 onClick={() => setDsmlVideoPlaying(true)}
226:                             >
227:                                 <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-transparent pointer-events-none z-10 transition-opacity duration-500" style={{ opacity: dsmlVideoPlaying ? 0.3 : 1 }} />
228: 
229:                                 <div className={`absolute top-8 left-8 md:top-12 md:left-12 z-20 pointer-events-none transition-opacity duration-500 ${dsmlVideoPlaying ? 'opacity-0' : 'opacity-100'}`}>
230:                                     <div className="font-mono text-xs text-amber-400 tracking-[0.2em] uppercase mb-4 drop-shadow-md">Up Next</div>
231:                                     <h2 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight text-white drop-shadow-lg mb-3">DSML Discovery</h2>
232:                                     <p className="text-zinc-300 text-sm md:text-lg max-w-sm drop-shadow leading-relaxed">3 Siloed Tools consolidated into 1 Discovery Hub.</p>
233:                                 </div>
234: 
235:                                 {!dsmlVideoPlaying && (
236:                                     <div className="absolute z-30 flex flex-col items-center justify-center pointer-events-none">
237:                                         <div className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white shadow-2xl transform transition-transform duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
238:                                             <Play className="w-8 h-8 fill-current ml-1" />
239:                                         </div>
240:                                         <span className="mt-6 font-sans text-xs font-bold uppercase tracking-[0.3em] text-white/80">Play Presentation</span>
241:                                     </div>
242:                                 )}
243: 
244:                                 <video
245:                                     src="/videos/iq-prototype-walkthrough.mp4"
246:                                     muted
247:                                     loop
248:                                     playsInline
249:                                     ref={(el) => {
250:                                         if (el) {
251:                                             if (dsmlVideoPlaying) el.play()
252:                                             else el.pause()
253:                                         }
254:                                     }}
255:                                     className="absolute inset-0 w-full h-full object-cover"
256:                                 />
257:                             </motion.div>
258:                         )}
259:                     </AnimatePresence>
260:                 </div>
261:             </motion.div>
262: 
263:             {/* Dark overlay that dims the video and fades out on watchMode (Allows Hero text to be readable) */}
264:             <motion.div
265:                 className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_center,var(--overlay-black-30)_0%,var(--overlay-black-80)_80%,var(--overlay-black-95)_100%)]"
266:                 style={{
267:                     opacity: overlayFade,
268:                 }}
269:             />
270: 
271:             {/* Additional deep dark overlay specifically for the interactive Brain mode */}
272:             <motion.div
273:                 className="absolute inset-0 z-[2] pointer-events-none bg-black"
274:                 style={{
275:                     opacity: brainOverlayFade,
276:                 }}
277:             />
278: 
279:             {/* --- ATMOSPHERE GLOW --- */}
280:             <motion.div
281:                 className="absolute inset-0 z-[3] pointer-events-none flex items-center justify-center"
282:                 initial={{ opacity: 0 }}
283:                 animate={{ opacity: showPhase2 ? 1 : 0 }}
284:                 transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
285:             >
286:                 <div className="w-[600px] h-[300px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(47,198,213,0.06)_0%,rgba(47,198,213,0.02)_40%,transparent_70%)] blur-[40px]" />
287:             </motion.div>
288: 
289:             {/* --- HERO TEXT (Fades out quickly on scroll, and on watch OR explore) --- */}
290:             <motion.div
291:                 ref={heroOverlayRef}
292:                 className={`absolute inset-0 z-[15] flex flex-col items-center justify-center ${isWatching ? 'pointer-events-none' : 'pointer-events-auto'}`}
293:                 style={{ opacity: combinedHeroTextOpacity, scale: heroTextScale, y: heroTextY, filter: heroTextFilterTemplate }}
294:             >
295:                 <AnimatePresence>
296:                     {!showPhase2 && (
297:                         <motion.div
298:                             key="phase1"
299:                             className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
300:                             initial={{ opacity: 1, filter: "blur(0px)" }}
301:                             animate={{ opacity: 0, filter: "blur(10px)" }}
302:                             transition={{ delay: 3.2, duration: 0.6, ease: "easeInOut" }}
303:                             exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0 } }}
304:                         >
305:                             {/* 0.0s: Fast typing */}
306:                             <TypingText
307:                                 text="When you look at a chair..."
308:                                 delay={0}
309:                                 duration={0.4}
310:                                 className="text-slate-400 font-mono text-sm md:text-base tracking-wide"
311:                             />
312: 
313:                             {/* 0.8s: Fast typing */}
314:                             <TypingText
315:                                 text="...the only thing that comes to mind is to sit on it."
316:                                 delay={0.8}
317:                                 duration={0.4}
318:                                 className="text-slate-400 font-mono text-sm md:text-base tracking-wide mt-2"
319:                             />
320: 
321:                             {/* 1.5s: Smooth fade in */}
322:                             <motion.div
323:                                 initial={{ opacity: 0, y: 10 }}
324:                                 animate={{ opacity: 1, y: 0 }}
325:                                 transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
326:                                 className="text-white text-xl md:text-2xl font-medium tracking-tight mt-12"
327:                             >
328:                                 Good UX should feel exactly like that.
329:                             </motion.div>
330: 
331:                             {/* 2.2s: Snaps instantly */}
332:                             <motion.div
333:                                 initial={{ opacity: 0, scale: 0.95 }}
334:                                 animate={{ opacity: 1, scale: 1 }}
335:                                 transition={{ delay: 2.2, duration: 0.01 }}
336:                                 className="text-[#00E5FF] text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter mt-12"
337:                             >
338:                                 Invisible.
339:                             </motion.div>
340:                         </motion.div>
341:                     )}
342:                 </AnimatePresence>
343: 
344:                 <AnimatePresence>
345:                     {showPhase2 && (
346:                         <motion.div
347:                             key="phase2"
348:                             className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto"
349:                             initial={skipIntro ? { opacity: 1 } : { opacity: 0 }}
350:                             animate={{ opacity: 1 }}
351:                             transition={{ duration: skipIntro ? 0 : 0.8 }}
352:                         >
353:                             {/* 3.8s: Fade in */}
354:                             <motion.h3
355:                                 initial={skipIntro ? { opacity: 1 } : { opacity: 0 }}
356:                                 animate={{ opacity: 1 }}
357:                                 transition={{ delay: skipIntro ? 0 : 0, duration: skipIntro ? 0 : 0.8 }}
358:                                 className="text-white text-xl md:text-2xl font-medium tracking-tight mb-8"
359:                             >
360:                                 That&apos;s why I design.
361:                             </motion.h3>
362: 
363:                             {/* 4.4s: Fades in and slides up */}
364:                             <motion.h1
365:                                 initial={skipIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
366:                                 animate={{ opacity: 1, y: 0 }}
367:                                 transition={{ delay: skipIntro ? 0 : 0.6, duration: skipIntro ? 0 : 0.8, ease: "easeOut" }}
368:                                 className="text-3xl sm:text-5xl lg:text-[4rem] font-bold tracking-tight mb-8 bg-[linear-gradient(118deg,#ffffff_0%,#eafcff_28%,#9ceaf2_56%,#2fc6d5_80%,var(--accent-teal)_100%)] bg-clip-text text-transparent pb-2 leading-tight"
369:                             >
370:                                 So I can be part of making people&apos;s lives a little easier every day.
371:                             </motion.h1>
372: 
373:                             {/* 5.0s: Small, highly legible grey text */}
374:                             <motion.p
375:                                 initial={skipIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
376:                                 animate={{ opacity: 1, y: 0 }}
377:                                 transition={{ delay: skipIntro ? 0 : 1.2, duration: skipIntro ? 0 : 0.8 }}
378:                                 className="text-slate-400 text-sm md:text-base lg:text-lg max-w-3xl font-medium tracking-wide leading-relaxed mb-12"
379:                             >
380:                                 Hi, I&apos;m Anuja — a Senior Product Designer with 13 years of experience specializing in B2B enterprise UX, product strategy, and high-fidelity code prototyping.
381:                             </motion.p>
382: 
383:                             {/* 5.5s: CTAs */}
384:                             <motion.div
385:                                 initial={skipIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
386:                                 animate={{ opacity: 1, y: 0 }}
387:                                 transition={{ delay: skipIntro ? 0 : 1.7, duration: skipIntro ? 0 : 0.8 }}
388:                                 className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
389:                                 style={{ pointerEvents: 'auto' }}
390:                             >
391:                                 <button
392:                                     onClick={(e) => { e.stopPropagation(); enterWatchMode(); }}
393:                                     className="w-full sm:w-auto px-8 py-4 bg-white text-black text-sm font-bold rounded-full hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00E5FF] focus:ring-offset-2 focus:ring-offset-black"
394:                                 >
395:                                     Watch My Case Study
396:                                 </button>
397:                                 <button
398:                                     onClick={(e) => { e.stopPropagation(); enterExploreMode(); }}
399:                                     className="w-full sm:w-auto px-8 py-4 bg-black border border-white/20 text-white text-sm font-bold rounded-full hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00E5FF] focus:ring-offset-2 focus:ring-offset-black"
400:                                 >
401:                                     Explore My Mind
402:                                 </button>
403:                             </motion.div>
404:                         </motion.div>
405:                     )}
406:                 </AnimatePresence>
407: 
408:                 {/* SCROLL INDICATOR — appears when Phase 2 is fully visible */}
409:                 <motion.div
410:                     className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center gap-4 w-full"
411:                     initial={false}
412:                     animate={{
413:                         opacity: showPhase2 ? 1 : 0,
414:                         y: showPhase2 ? 0 : 16,
415:                     }}
416:                     transition={{ delay: skipIntro ? 0 : 2.0, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
417:                 >
418:                     <div className="text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-[0.4em] flex flex-wrap justify-center px-4">
419:                         SCROLL DOWN TO DISCOVER MORE
420:                     </div>
421:                     <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
422:                         <ArrowDown className="w-4 h-4 text-zinc-500" />
423:                     </motion.div>
424:                 </motion.div>
425:             </motion.div>
426: 
427: 
428:             {/* --- THE BRAIN (Interactive) - Only visible when Explore My Mind is active --- */}
429:             <motion.div
430:                 className={`absolute inset-0 z-[20] ${isExploringMind ? 'pointer-events-auto' : 'pointer-events-none'}`}
431:                 style={{ opacity: combinedBrainOpacity, scale: brainExploreScale, originY: 0.5 }}
432:             >
433:                 <div className="absolute inset-0 w-full h-full">
434:                     <HeroSplit forceQuiz={isExploringMind} />
435:                 </div>
436:             </motion.div>
437: 
438:             {/* --- CLOSE BUTTON FOR WATCH MODE OR EXPLORE MODE --- */}
439:             <AnimatePresence>
440:                 {(isWatching || isExploringMind) && (
441:                     <motion.button
442:                         className="absolute top-6 right-6 z-[50] w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors cursor-pointer pointer-events-auto"
443:                         onClick={closeOverlayMode}
444:                         data-overlay-close
445:                         aria-label={isWatching ? 'Close case study preview' : 'Close explore mode'}
446:                         type="button"
447:                         initial={{ opacity: 0, scale: 0.8 }}
448:                         animate={{ opacity: 1, scale: 1 }}
449:                         exit={{ opacity: 0, scale: 0.8 }}
450:                         transition={{ duration: 0.2 }}
451:                     >
452:                         <X className="w-6 h-6" />
453:                     </motion.button>
454:                 )}
455:             </AnimatePresence>
456: 
457:         </div >
458:     </div >
459: )
460: }
461: 
462: // Staggered typing effect using opacity
463: function TypingText({ text, delay = 0, duration = 0.4, className = "" }: { text: string, delay?: number, duration?: number, className?: string }) {
464:     const letters = Array.from(text);
465:     const stagger = duration / letters.length;
466: 
467:     return (
468:         <motion.span
469:             initial="hidden"
470:             animate="visible"
471:             variants={{
472:                 hidden: { opacity: 1 },
473:                 visible: {
474:                     opacity: 1,
475:                     transition: {
476:                         staggerChildren: stagger,
477:                         delayChildren: delay,
478:                     }
479:                 }
480:             }}
481:             className={className}
482:         >
483:             {letters.map((char, index) => (
484:                 <motion.span
485:                     key={index}
486:                     variants={{
487:                         hidden: { opacity: 0 },
488:                         visible: { opacity: 1, transition: { duration: 0 } }
489:                     }}
490:                 >
491:                     {char}
492:                 </motion.span>
493:             ))}
494:         </motion.span>
495:     )
496: }"""

content = re.sub(r'^\d+:\s', '', content_with_lines, flags=re.MULTILINE)

with open('src/components/home/HeroLanding.tsx', 'w') as f:
    f.write(content)
