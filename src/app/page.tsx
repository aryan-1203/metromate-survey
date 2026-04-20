import { ParticleBackground } from '@/components/survey/ParticleBackground';
import { Hero } from '@/components/landing/Hero';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { CTASection } from '@/components/landing/CTASection';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-stone-50 overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        <Hero />
        <ProblemSection />
        <CTASection />
      </div>
    </div>
  );
}
