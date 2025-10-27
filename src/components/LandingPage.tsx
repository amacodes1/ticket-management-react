import Hero from './Hero';
import Features from './Features';
import ChallengesSection from './ChallengeSection';

export default function Landing() {
  return (
    <div className=" text-[#111827] dark:text-white transition-colors duration-300">
      <div className="relative w-full max-w-7xl mx-auto">
        <Hero />
        <ChallengesSection />
        <Features />
      </div>
    </div>
  );
}
