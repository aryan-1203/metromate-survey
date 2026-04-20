'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  className?: string;
  trackClassName?: string;
}

export function ProgressBar({ value, className, trackClassName }: ProgressBarProps) {
  return (
    <div className={cn('h-[3px] bg-stone-100 w-full overflow-hidden', trackClassName)}>
      <motion.div
        className={cn(
          'h-full origin-left',
          'bg-gradient-to-r from-indigo-500 to-violet-500',
          className
        )}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: value / 100 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        style={{ transformOrigin: 'left' }}
      />
    </div>
  );
}
