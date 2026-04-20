import { create } from 'zustand';
import { SurveyState } from '@/types/survey';
import { SECTIONS } from './survey-data';

export const useSurveyStore = create<SurveyState>((set) => ({
  currentSection: 1,
  currentQuestionIndex: 0,
  answers: {},
  isComplete: false,

  setAnswer: (questionId, value) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: value },
    })),

  nextSection: () =>
    set((state) => {
      const nextSection = state.currentSection + 1;
      if (nextSection > SECTIONS.length) {
        return { isComplete: true };
      }
      return { currentSection: nextSection, currentQuestionIndex: 0 };
    }),

  prevSection: () =>
    set((state) => {
      const prevSection = state.currentSection - 1;
      if (prevSection < 1) return state;
      return { currentSection: prevSection, currentQuestionIndex: 0 };
    }),

  complete: () => set({ isComplete: true }),

  goToSection: (section) =>
    set({ currentSection: section, currentQuestionIndex: 0 }),
}));
