'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScaleInputProps {
  min?: number;
  max?: number;
  value: number | null;
  onChange: (value: number) => void;
  minLabel?: string;
  maxLabel?: string;
}

export function ScaleInput({
  min = 1,
  max = 5,
  value,
  onChange,
  minLabel,
  maxLabel,
}: ScaleInputProps) {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);

  return (
    <div className="space-y-3">
      <div className="flex gap-3 flex-wrap">
        {numbers.map((n, i) => {
          const selected = value === n;
          return (
            <motion.button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 320, damping: 22 }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.93 }}
              className={cn(
                'relative w-12 h-12 rounded-full text-base font-sans font-semibold border transition-all duration-150 cursor-pointer',
                selected
                  ? 'text-white border-transparent shadow-lg shadow-indigo-200'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-indigo-300 hover:text-indigo-600'
              )}
              style={
                selected
                  ? { background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }
                  : {}
              }
            >
              {n}
              {selected && (
                <motion.span
                  initial={{ scale: 2, opacity: 0.4 }}
                  animate={{ scale: 1, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 rounded-full bg-indigo-400 pointer-events-none"
                />
              )}
            </motion.button>
          );
        })}
      </div>
      {(minLabel || maxLabel) && (
        <div className="flex justify-between text-xs font-sans italic text-stone-400">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}
    </div>
  );
}
