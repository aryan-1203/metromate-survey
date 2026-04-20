'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OptionPillProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function OptionPill({ label, selected, onClick, disabled }: OptionPillProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled && !selected}
      whileHover={!disabled || selected ? { scale: 1.04 } : {}}
      whileTap={!disabled || selected ? { scale: 0.97 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-sans font-medium cursor-pointer select-none transition-all duration-150',
        selected
          ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-transparent shadow-md shadow-indigo-200'
          : 'bg-white text-stone-700 border-stone-200 hover:border-indigo-300 hover:text-indigo-600',
        disabled && !selected && 'opacity-40 cursor-not-allowed'
      )}
    >
      <motion.span
        initial={false}
        animate={{ width: selected ? 16 : 0, opacity: selected ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="overflow-hidden flex-shrink-0"
      >
        <Check size={12} strokeWidth={3} />
      </motion.span>
      {label}
    </motion.button>
  );
}
