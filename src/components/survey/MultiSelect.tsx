'use client';

import { motion } from 'framer-motion';
import { OptionPill } from './OptionPill';

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
  maxSelections?: number;
}

export function MultiSelect({ options, selected, onChange, maxSelections }: MultiSelectProps) {
  const toggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((v) => v !== option));
    } else {
      if (maxSelections && selected.length >= maxSelections) return;
      onChange([...selected, option]);
    }
  };

  const atMax = maxSelections ? selected.length >= maxSelections : false;

  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((option, i) => (
        <motion.div
          key={option}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04, type: 'spring', stiffness: 300, damping: 24 }}
        >
          <OptionPill
            label={option}
            selected={selected.includes(option)}
            onClick={() => toggle(option)}
            disabled={atMax && !selected.includes(option)}
          />
        </motion.div>
      ))}
      {maxSelections && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full text-xs text-stone-400 font-sans mt-1"
        >
          {selected.length}/{maxSelections} selected
        </motion.p>
      )}
    </div>
  );
}
