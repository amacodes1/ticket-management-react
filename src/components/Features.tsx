import { Plus, ClipboardList, Users } from 'lucide-react';

export default function Features() {
  return (
    <main className="px-6 md:px-16 lg:px-20 mb-20">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-2xl md:text-5xl font-bold tracking-tight">
            Why Use Ticket App
          </h2>
          <p className="text-sm md:text-lg text-[#111827]/70 dark:text-white/70 max-w-3xl mx-auto">
            Discover how TicketApp can streamline your support process.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-[#9B8AFB]/10 rounded-lg flex items-center justify-center">
              <Plus className="text-[#9B8AFB] w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg md:text-xl font-bold">
                Easy Ticket Submission
              </h3>
              <p className="text-[#111827]/70 dark:text-white/70 text-sm md:text-base">
                Submit new support tickets in seconds with our intuitive
                interface.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-[#9B8AFB]/10 rounded-lg flex items-center justify-center">
              <ClipboardList className="text-[#9B8AFB] w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg md:text-xl font-bold">
                Streamlined Ticket Tracking
              </h3>
              <p className="text-[#111827]/70 dark:text-white/70 text-sm md:text-base">
                Keep track of all your tickets in one place, with clear status
                updates.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-[#9B8AFB]/10 rounded-lg flex items-center justify-center">
              <Users className="text-[#9B8AFB] w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg md:text-xl font-bold">
                Seamless Team Collaboration
              </h3>
              <p className="text-[#111827]/70 dark:text-white/70 text-sm md:text-base">
                Collaborate with your team to resolve issues faster and more
                efficiently.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-[#9B8AFB]/10 rounded-lg flex items-center justify-center">
              <Users className="text-[#9B8AFB] w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg md:text-xl font-bold">
                Seamless Team Collaboration
              </h3>
              <p className="text-[#111827]/70 dark:text-white/70 text-sm md:text-base">
                Collaborate with your team to resolve issues faster and more
                efficiently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}