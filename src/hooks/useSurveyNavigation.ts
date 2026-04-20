'use client';

import { useSurveyStore } from '@/lib/survey-store';
import { QUESTIONS, QUESTIONS_BY_SECTION, SECTIONS, TOTAL_QUESTIONS } from '@/lib/survey-data';

export function useSurveyNavigation() {
  const {
    currentSection,
    answers,
    nextSection,
    prevSection,
    complete,
  } = useSurveyStore();

  const sectionQuestions = QUESTIONS_BY_SECTION(currentSection);
  const currentSectionData = SECTIONS.find((s) => s.id === currentSection);

  // Total questions answered so far (across all sections before current)
  const questionsBeforeSection = QUESTIONS.filter(
    (q) => q.section < currentSection
  ).length;

  const overallProgress =
    ((questionsBeforeSection + sectionQuestions.length) / TOTAL_QUESTIONS) * 100;

  const sectionProgress =
    ((currentSection - 1) / SECTIONS.length) * 100 +
    (1 / SECTIONS.length) * 100;

  const canGoBack = currentSection > 1;
  const isLastSection = currentSection === SECTIONS.length;

  const handleNext = () => {
    if (isLastSection) {
      complete();
    } else {
      nextSection();
    }
  };

  const handleBack = () => {
    if (canGoBack) prevSection();
  };

  // Count answered questions for this session
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / TOTAL_QUESTIONS) * 100);

  return {
    currentSection,
    currentSectionData,
    sectionQuestions,
    overallProgress,
    sectionProgress,
    canGoBack,
    isLastSection,
    handleNext,
    handleBack,
    answeredCount,
    progressPercent,
    totalQuestions: TOTAL_QUESTIONS,
    totalSections: SECTIONS.length,
  };
}
