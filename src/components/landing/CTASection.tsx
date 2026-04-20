'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Zap } from 'lucide-react';

export function CTASection() {
  const router = useRouter();

  return (
    <section className="relative z-10 py-20 md:py-32 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          className="relative overflow-hidden rounded-3xl px-8 py-14 md:py-20"
          style={{
            background: 'linear-gradient(135deg, #1A1A18 0%, #2d2b6b 60%, #1A1A18 100%)',
          }}
        >
          {/* Subtle glow blob */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #6366F1, transparent 70%)' }}
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 280, damping: 24 }}
            className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 rounded-full px-4 py-1.5 mb-6 text-xs font-sans text-indigo-300 font-semibold uppercase tracking-widest"
          >
            <Zap size={12} className="text-indigo-400" />
            Be part of the solution
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 280, damping: 24 }}
            className="font-display text-3xl md:text-4xl text-white leading-snug mb-5"
          >
            Help us build the flatmate app{' '}
            <span className="text-indigo-400 italic">India actually deserves.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 280, damping: 24 }}
            className="text-stone-400 font-sans mb-10 text-base leading-relaxed"
          >
            3 minutes. 13 questions. Your answers shape our product roadmap.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, type: 'spring', stiffness: 280, damping: 24 }}
          >
            <motion.button
              onClick={() => router.push('/survey')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-sans font-semibold text-base px-8 py-3.5 rounded-full shadow-xl shadow-indigo-900/40 transition-all duration-200 cursor-pointer"
            >
              Take the survey
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
