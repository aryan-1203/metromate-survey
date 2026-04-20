'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

const headlineWords = ['Find', 'your', 'flatmate.', 'No', 'broker.', 'No', 'drama.'];

const stats = [
  { value: '10M+', label: 'migrants/year', color: 'text-indigo-500' },
  { value: '₹30,000', label: 'avg broker fee wasted', color: 'text-violet-500' },
];

export function Hero() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 z-10">
      {/* Live badge */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 24 }}
        className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-10 text-sm font-sans text-indigo-600"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        Now building — your input shapes what we build first
      </motion.div>

      {/* Headline */}
      <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-stone-900 leading-[1.05] text-center max-w-3xl mb-8">
        {headlineWords.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.06, type: 'spring', stiffness: 260, damping: 22 }}
            className={`inline-block mr-3 md:mr-4 last:mr-0 ${
              word === 'flatmate.' ? 'text-indigo-600' : ''
            }`}
          >
            {word}
          </motion.span>
        ))}
      </h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 280, damping: 24 }}
        className="text-lg md:text-xl text-stone-500 font-sans text-center max-w-lg leading-relaxed mb-10"
      >
        MetroMate matches you with compatible flatmates in{' '}
        <span className="text-stone-700 font-medium">Pune, Mumbai, Bengaluru</span> and beyond.
      </motion.p>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, type: 'spring', stiffness: 280, damping: 24 }}
        className="flex gap-6 md:gap-12 mb-12"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 + i * 0.15, type: 'spring', stiffness: 300, damping: 24 }}
            className="text-center px-5 py-4 rounded-2xl bg-white/80 border border-stone-100 shadow-sm"
          >
            <div className={`font-display text-3xl md:text-4xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-sm text-stone-400 font-sans mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA button — indigo gradient */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, type: 'spring', stiffness: 280, damping: 24 }}
      >
        <motion.button
          onClick={() => router.push('/survey')}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-sans font-semibold text-lg px-10 py-4 rounded-full shadow-xl shadow-indigo-200 transition-all duration-200 cursor-pointer"
        >
          Take the 3-min survey
          <ArrowRight size={20} />
        </motion.button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
        className="text-xs text-stone-400 font-sans mt-5"
      >
        Anonymous · 3 minutes · No sign-up required
      </motion.p>
    </section>
  );
}
