'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SECTIONS, TOTAL_QUESTIONS } from '@/lib/survey-data';
import { useSurveyStore } from '@/lib/survey-store';
import Link from 'next/link';

interface SurveyShellProps {
  children: React.ReactNode;
  showProgress?: boolean;
}

export function SurveyShell({ children, showProgress = true }: SurveyShellProps) {
  const { currentSection, answers } = useSurveyStore();
  const answered = Object.keys(answers).length;
  const progressPercent = Math.round((answered / TOTAL_QUESTIONS) * 100);
  const sectionName = SECTIONS.find((s) => s.id === currentSection)?.name ?? '';

  return (
    <div className="min-h-screen bg-stone-50 relative">
      {showProgress && (
        <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-sm border-b border-stone-100">
          <div className="max-w-2xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
            <Link href="/" className="font-display text-lg tracking-tight">
              <span className="text-indigo-600">Metro</span>
              <span className="text-stone-900">Mate</span>
            </Link>

            <div className="flex items-center gap-3">
              <div className="overflow-hidden h-6">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={sectionName}
                    initial={{ y: -24 }}
                    animate={{ y: 0 }}
                    exit={{ y: 24 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="block text-xs font-sans text-stone-500 font-medium"
                  >
                    {sectionName}
                  </motion.span>
                </AnimatePresence>
              </div>

              <span className="text-xs font-sans font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                {answered} / {TOTAL_QUESTIONS}
              </span>
            </div>
          </div>

          <ProgressBar value={progressPercent} />
        </header>
      )}

      <main className="max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {showProgress && (
          <div className="flex items-center gap-3 mb-8">
            {SECTIONS.map((s) => (
              <div
                key={s.id}
                className={`flex items-center gap-1.5 transition-all duration-300 ${
                  s.id === currentSection ? 'opacity-100' : 'opacity-30'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 text-white ${
                    s.id < currentSection
                      ? 'bg-indigo-500'
                      : s.id === currentSection
                      ? 'ring-4 ring-indigo-100'
                      : 'bg-stone-200 text-stone-500'
                  }`}
                  style={
                    s.id === currentSection
                      ? { background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }
                      : {}
                  }
                >
                  {s.id < currentSection ? '✓' : s.id}
                </div>
                {s.id < SECTIONS.length && (
                  <div
                    className={`h-px w-8 transition-all duration-500 ${
                      s.id < currentSection
                        ? 'bg-indigo-400'
                        : 'bg-stone-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {children}
      </main>
    </div>
  );
}
