import { Link } from "react-router-dom";
import { Plus, ClipboardList, Users } from 'lucide-react';

export default function Landing() {
  return (
    <div className="bg-white dark:bg-[#111827] text-[#111827] dark:text-white transition-colors duration-300">
      <div className="relative w-full max-w-7xl mx-auto">
        <div className="relative overflow-hidden">
          <div className="absolute w-96 h-96 bg-[#9B8AFB]/20 rounded-full -top-32 -left-32 z-0"></div>
          <div className="relative min-h-[70vh] md:min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24 pb-32 z-10">
            <div className="flex flex-col gap-6 items-center">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter">TicketApp</h1>
              <p className="text-lg md:text-xl max-w-2xl text-[#111827]/80 dark:text-white/80">Manage Support Tickets Effortlessly</p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link
                  to="/auth/login"
                  className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-[#9B8AFB] text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-[#9B8AFB]/30 hover:bg-[#9B8AFB]/90 transition-all"
                >
                  <span className="truncate">Login</span>
                </Link>
                <Link
                  to="/auth/signup"
                  className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-[#9B8AFB]/10 text-[#9B8AFB] text-base font-bold leading-normal tracking-wide hover:bg-[#9B8AFB]/20 transition-all"
                >
                  <span className="truncate">Get Started</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="wavy-bg">
            <svg data-name="Layer 1" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
              <path className="fill-white dark:fill-[#111827]" d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
            </svg>
          </div>
        </div>
        <main className="px-4 md:px-8 py-16 sm:py-24">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-4 text-center">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Key Features</h2>
              <p className="text-lg text-[#111827]/70 dark:text-white/70 max-w-3xl mx-auto">Discover how TicketApp can streamline your support process.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-[#9B8AFB]/10 rounded-lg flex items-center justify-center">
                  <Plus className="text-[#9B8AFB] w-6 h-6" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold">Easy Ticket Submission</h3>
                  <p className="text-[#111827]/70 dark:text-white/70">Submit new support tickets in seconds with our intuitive interface.</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-[#9B8AFB]/10 rounded-lg flex items-center justify-center">
                  <ClipboardList className="text-[#9B8AFB] w-6 h-6" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold">Streamlined Ticket Tracking</h3>
                  <p className="text-[#111827]/70 dark:text-white/70">Keep track of all your tickets in one place, with clear status updates.</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-[#9B8AFB]/10 rounded-lg flex items-center justify-center">
                  <Users className="text-[#9B8AFB] w-6 h-6" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold">Seamless Team Collaboration</h3>
                  <p className="text-[#111827]/70 dark:text-white/70">Collaborate with your team to resolve issues faster and more efficiently.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
