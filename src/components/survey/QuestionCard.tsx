'use client';

import { motion } from 'framer-motion';
import { Question } from '@/types/survey';
import { useSurveyStore } from '@/lib/survey-store';
import { OptionPill } from './OptionPill';
import { MultiSelect } from './MultiSelect';
import { ScaleInput } from './ScaleInput';
import { TextInput, TextArea } from './TextInput';

interface QuestionCardProps {
  question: Question;
  index: number;
  error?: string;
}

export function QuestionCard({ question, index, error }: QuestionCardProps) {
  const { answers, setAnswer } = useSurveyStore();
  const rawValue = answers[question.id];

  const stringValue = typeof rawValue === 'string' ? rawValue : '';
  const arrayValue = Array.isArray(rawValue) ? rawValue : [];

  const qNum = String(question.questionNumber).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        type: 'spring',
        stiffness: 280,
        damping: 24,
      }}
      className="relative bg-white/70 backdrop-blur-sm border border-stone-100 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Question number */}
      <span className="block font-display text-5xl font-bold text-stone-100 select-none mb-3 leading-none">
        {qNum}
      </span>

      {/* Question text */}
      <h3 className="font-display text-xl md:text-2xl text-stone-900 leading-snug mb-1">
        {question.text}
        {question.required && (
          <span className="text-red-400 ml-1 font-sans text-base">*</span>
        )}
      </h3>

      {/* Hint */}
      {question.hint && (
        <p className="text-sm text-stone-400 font-sans mb-5 mt-1">{question.hint}</p>
      )}

      {/* Input */}
      <div className="mt-4">
        {question.type === 'text' && (
          <TextInput
            value={stringValue}
            onChange={(e) => setAnswer(question.id, e.target.value)}
            placeholder={question.placeholder}
            error={error}
          />
        )}

        {question.type === 'email' && (
          <TextInput
            type="email"
            value={stringValue}
            onChange={(e) => setAnswer(question.id, e.target.value)}
            placeholder={question.placeholder}
            error={error}
          />
        )}

        {question.type === 'textarea' && (
          <TextArea
            value={stringValue}
            onChange={(e) => setAnswer(question.id, e.target.value)}
            placeholder={question.placeholder}
            error={error}
          />
        )}

        {question.type === 'single-select' && question.options && (
          <div className="flex flex-wrap gap-2.5">
            {question.options.map((opt, i) => (
              <motion.div
                key={opt}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 22 }}
              >
                <OptionPill
                  label={opt}
                  selected={stringValue === opt}
                  onClick={() => setAnswer(question.id, stringValue === opt ? '' : opt)}
                />
              </motion.div>
            ))}
            {error && <p className="w-full text-xs text-red-500 font-sans mt-1">{error}</p>}
          </div>
        )}

        {question.type === 'multi-select' && question.options && (
          <>
            <MultiSelect
              options={question.options}
              selected={arrayValue}
              onChange={(vals) => setAnswer(question.id, vals)}
              maxSelections={question.maxSelections}
            />
            {error && <p className="text-xs text-red-500 font-sans mt-1">{error}</p>}
          </>
        )}

        {question.type === 'scale' && (
          <>
            <ScaleInput
              min={question.scaleMin}
              max={question.scaleMax}
              value={stringValue ? parseInt(stringValue) : null}
              onChange={(v) => setAnswer(question.id, String(v))}
              minLabel={question.scaleMinLabel}
              maxLabel={question.scaleMaxLabel}
            />
            {error && <p className="text-xs text-red-500 font-sans mt-2">{error}</p>}
          </>
        )}
      </div>
    </motion.div>
  );
}
