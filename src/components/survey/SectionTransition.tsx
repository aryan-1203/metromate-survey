'use client';

import { AnimatePresence, motion } from 'framer-motion';

interface SectionTransitionProps {
  sectionKey: number;
  children: React.ReactNode;
}

export function SectionTransition({ sectionKey, children }: SectionTransitionProps) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={sectionKey}
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -80, opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 26,
          opacity: { duration: 0.2 },
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
