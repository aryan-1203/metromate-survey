'use client';

import { motion } from 'framer-motion';
import { Banknote, AlertTriangle, Sliders } from 'lucide-react';

const problems = [
  {
    icon: Banknote,
    title: 'Broker fees',
    stat: '₹20K–50K',
    description: 'Drained every time you move. For connecting two people who could have found each other.',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-500',
    statColor: 'text-rose-600',
    border: 'hover:border-rose-200',
  },
  {
    icon: AlertTriangle,
    title: 'Fake listings',
    stat: '1 in 3',
    description: 'Listings are either fake, outdated, or already rented by the time you call.',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    statColor: 'text-amber-600',
    border: 'hover:border-amber-200',
  },
  {
    icon: Sliders,
    title: 'Zero lifestyle filters',
    stat: 'No filters',
    description: 'Are they vegetarian? Early risers? Will they blast music at midnight? Nobody knows.',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-500',
    statColor: 'text-indigo-600',
    border: 'hover:border-indigo-200',
  },
];

export function ProblemSection() {
  return (
    <section className="relative z-10 py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-sans font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            The problem
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-stone-900">
            Finding a flat in India is{' '}
            <span className="italic text-rose-500">broken.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.12, type: 'spring', stiffness: 280, damping: 24 }}
              className={`bg-white/80 backdrop-blur-sm border border-stone-100 ${p.border} rounded-2xl p-6 hover:shadow-lg transition-all duration-300`}
            >
              <div className={`w-11 h-11 ${p.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                <p.icon size={20} className={p.iconColor} />
              </div>
              <div className={`font-display text-2xl font-bold ${p.statColor} mb-1`}>{p.stat}</div>
              <h3 className="font-sans font-semibold text-stone-800 mb-2">{p.title}</h3>
              <p className="text-sm text-stone-500 font-sans leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
