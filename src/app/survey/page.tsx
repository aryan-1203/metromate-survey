'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSurveyStore } from '@/lib/survey-store';
import { QUESTIONS_BY_SECTION } from '@/lib/survey-data';
import { SurveyShell } from '@/components/survey/SurveyShell';
import { SurveyHero } from '@/components/survey/SurveyHero';
import { QuestionCard } from '@/components/survey/QuestionCard';
import { NavigationRow } from '@/components/survey/NavigationRow';
import { SectionTransition } from '@/components/survey/SectionTransition';
import { ThankYou } from '@/components/survey/ThankYou';
import { ParticleBackground } from '@/components/survey/ParticleBackground';
import { useSurveyNavigation } from '@/hooks/useSurveyNavigation';
import { SECTIONS } from '@/lib/survey-data';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

type Stage = 'intro' | 'survey';

const REQUIRED_FIELDS: Record<number, string[]> = {
  1: ['q1_city', 'q2_role', 'q3_housing'],
  2: [],
  3: ['q7_excitement'],
  4: ['q11_waitlist'],
};

export default function SurveyPage() {
  const [stage, setStage] = useState<Stage>('intro');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { isComplete, answers, currentSection } = useSurveyStore();
  const { handleNext, handleBack, canGoBack, isLastSection } = useSurveyNavigation();

  const sectionQuestions = QUESTIONS_BY_SECTION(currentSection);

  const validate = () => {
    const required = REQUIRED_FIELDS[currentSection] ?? [];
    const newErrors: Record<string, string> = {};

    for (const qId of required) {
      const val = answers[qId];
      if (!val || (typeof val === 'string' && val.trim() === '') || (Array.isArray(val) && val.length === 0)) {
        newErrors[qId] = 'This field is required.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onNext = () => {
    if (!validate()) {
      toast.error('Please fill in the required fields.', {
        description: 'Fields marked with * are required.',
      });
      return;
    }
    setErrors({});
    handleNext();
  };

  if (isComplete) {
    return <ThankYou />;
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      <ParticleBackground />

      <AnimatePresence mode="wait">
        {stage === 'intro' ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35 }}
            className="relative z-10"
          >
            <SurveyHero onStart={() => setStage('survey')} />
          </motion.div>
        ) : (
          <motion.div
            key="survey"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <SurveyShell>
              <SectionTransition sectionKey={currentSection}>
                {/* Section heading */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                  className="mb-8"
                >
                  <p className="text-xs font-sans font-semibold text-stone-400 uppercase tracking-widest mb-1">
                    Section {currentSection} of {SECTIONS.length}
                  </p>
                  <h2 className="font-display text-2xl md:text-3xl text-stone-900">
                    {SECTIONS.find((s) => s.id === currentSection)?.name}
                  </h2>
                </motion.div>

                {/* Questions */}
                <div className="space-y-4 md:space-y-5">
                  {sectionQuestions.map((q, i) => (
                    <QuestionCard
                      key={q.id}
                      question={q}
                      index={i}
                      error={errors[q.id]}
                    />
                  ))}
                </div>

                {/* Navigation */}
                <div className="mt-8">
                  <NavigationRow
                    onNext={onNext}
                    onBack={handleBack}
                    canGoBack={canGoBack}
                    isLastSection={isLastSection}
                  />
                </div>
              </SectionTransition>
            </SurveyShell>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
