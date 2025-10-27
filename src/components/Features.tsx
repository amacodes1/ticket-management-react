import { Plus, ClipboardList, Users, ChartBarIncreasing } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function Features() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  const features = [
    {
      icon: Plus,
      title: "Easy Ticket Submission",
      text: "Submit new support tickets in seconds with our intuitive interface.",
    },
    {
      icon: ClipboardList,
      title: "Streamlined Ticket Tracking",
      text: "Keep track of all your tickets in one place, with clear status updates.",
    },
    {
      icon: Users,
      title: "Seamless Team Collaboration",
      text: "Collaborate with your team to resolve issues faster and more efficiently.",
    },
    {
      icon: ChartBarIncreasing,
      title: "Performance Insights",
      text: "Analyze team performance and identify areas to improve response times.",
    },
  ];

  return (
    <main ref={ref} className="px-6 md:px-16 lg:px-20 mb-20 scroll-mt-24">
      <div className="flex flex-col gap-16">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
          }}
          className="flex flex-col gap-4 text-center"
        >
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
            Why Use Ticket App
          </h2>
          <p className="text-sm md:text-lg text-[#111827]/70 dark:text-white/70 max-w-3xl mx-auto">
            Discover how TicketApp can streamline your support process.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate={controls}
              variants={cardVariants}
              className="flex flex-col gap-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-[#9B8AFB]/10 rounded-lg flex items-center justify-center">
                <item.icon className="text-[#9B8AFB] w-6 h-6" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg md:text-xl font-bold">{item.title}</h3>
                <p className="text-[#111827]/70 dark:text-white/70 text-sm md:text-base">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
