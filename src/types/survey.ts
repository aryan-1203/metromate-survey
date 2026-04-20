export type QuestionType = 'text' | 'email' | 'textarea' | 'single-select' | 'multi-select' | 'scale';

export interface Question {
  id: string;
  section: number;
  sectionName: string;
  questionNumber: number;
  text: string;
  hint?: string;
  type: QuestionType;
  options?: string[];
  maxSelections?: number;
  scaleMin?: number;
  scaleMax?: number;
  scaleMinLabel?: string;
  scaleMaxLabel?: string;
  required?: boolean;
  placeholder?: string;
}

export interface SurveyAnswer {
  [questionId: string]: string | string[];
}

export interface SurveyState {
  currentSection: number;
  currentQuestionIndex: number;
  answers: SurveyAnswer;
  isComplete: boolean;
  setAnswer: (questionId: string, value: string | string[]) => void;
  nextSection: () => void;
  prevSection: () => void;
  complete: () => void;
  goToSection: (section: number) => void;
}
