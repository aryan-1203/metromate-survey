'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useSurveyStore } from '@/lib/survey-store';
import { Share2, Mail, CheckCircle2, Loader2 } from 'lucide-react';

const ReactConfetti = dynamic(() => import('react-confetti'), { ssr: false });

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

export function ThankYou() {
  const { answers } = useSurveyStore();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const hasFired = useRef(false);

  const city = (answers['q1_city'] as string) || 'your city';
  const role = answers['q2_role'] as string;
  const excitement = answers['q7_excitement'] as string;
  const waitlist = answers['q11_waitlist'] as string;
  const topFeatures = (answers['q8_features'] as string[]) || [];

  // Window size + confetti timer
  useEffect(() => {
    const update = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    const t = setTimeout(() => setShowConfetti(false), 5000);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', update);
    };
  }, []);

  // Fire once: POST answers to /api/submit → Google Sheets
  useEffect(() => {
    if (hasFired.current) return;
    hasFired.current = true;

    setSubmitStatus('sending');
    fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers }),
    })
      .then((res) => {
        if (res.ok) {
          setSubmitStatus('success');
        } else {
          setSubmitStatus('error');
        }
      })
      .catch(() => setSubmitStatus('error'));
  }, [answers]);

  const summaryItems = [
    role && { label: 'You are a', value: role },
    excitement && { label: 'Excitement level', value: `${excitement}/5` },
    topFeatures.length > 0 && {
      label: 'Top features wanted',
      value: topFeatures.slice(0, 2).join(', '),
    },
    waitlist && { label: 'Waitlist', value: waitlist },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      {showConfetti && windowSize.width > 0 && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={300}
          colors={['#6366F1', '#8B5CF6', '#A78BFA', '#4F46E5', '#FBBF24', '#34D399']}
          gravity={0.2}
        />
      )}

      <div className="max-w-lg w-full text-center space-y-8 relative z-10">
        {/* Check circle */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.1 }}
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-indigo-200"
          style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}
        >
          <motion.svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M7 18 L15 26 L29 11"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeInOut' }}
            />
          </motion.svg>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 280, damping: 24 }}
        >
          <h1 className="font-display text-3xl md:text-4xl text-stone-900 leading-snug">
            Thank you, <span className="italic text-indigo-600">{city}!</span>
          </h1>
          <p className="text-stone-500 font-sans mt-3 text-base leading-relaxed">
            You&apos;ve helped shape MetroMate. We&apos;ll be in touch when we launch in your city.
          </p>

          {/* Submission status pill */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full text-xs font-sans font-medium"
            style={{
              background:
                submitStatus === 'success'
                  ? '#F0FDF4'
                  : submitStatus === 'error'
                  ? '#FEF2F2'
                  : '#F5F2EB',
              color:
                submitStatus === 'success'
                  ? '#16A34A'
                  : submitStatus === 'error'
                  ? '#DC2626'
                  : '#7A7568',
            }}
          >
            {submitStatus === 'sending' && (
              <><Loader2 size={12} className="animate-spin" /> Saving your response…</>
            )}
            {submitStatus === 'success' && (
              <><CheckCircle2 size={12} /> Response saved to our records</>
            )}
            {submitStatus === 'error' && (
              <>⚠ Couldn&apos;t save — but we still appreciate you!</>
            )}
          </motion.div>
        </motion.div>

        {/* Summary */}
        {summaryItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, type: 'spring', stiffness: 280, damping: 24 }}
            className="bg-white border border-stone-100 rounded-2xl p-6 text-left space-y-3"
          >
            <p className="text-xs font-sans font-semibold text-stone-400 uppercase tracking-wider mb-4">
              Your snapshot
            </p>
            {summaryItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1, type: 'spring', stiffness: 300, damping: 24 }}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-stone-400 font-sans">{item.label}</span>
                <span className="text-stone-800 font-sans font-medium">{item.value}</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, type: 'spring', stiffness: 280, damping: 24 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-sans font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-indigo-200 cursor-pointer"
          >
            <Mail size={16} />
            Join waitlist
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 border border-stone-200 bg-white text-stone-700 hover:border-indigo-200 hover:text-indigo-600 font-sans font-semibold px-7 py-3.5 rounded-full transition-colors cursor-pointer"
          >
            <Share2 size={16} />
            Share with a friend
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-xs text-stone-300 font-sans"
        >
          MetroMate · Building the future of flatmate finding in India
        </motion.p>
      </div>
    </div>
  );
}
