"use client";
import { motion, useAnimation } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function ChallengesSection() {
  const challenges = [
    {
      id: 1,
      number: 200,
      suffix: "B+",
      title: "Customer Requests Lost Yearly",
      text: "Over $200B worth of customer requests are lost yearly due to inefficient ticketing and poor support workflows.",
    },
    {
      id: 2,
      number: 25,
      suffix: "M+",
      title: "Unresolved Tickets Monthly",
      text: "More than 25 million tickets go unresolved every month, leading to customer churn and revenue loss.",
    },
    {
      id: 3,
      number: 70,
      suffix: "%",
      title: "Delayed Responses",
      text: "70% of support teams fail to respond within expected timeframes, reducing overall customer satisfaction.",
    },
    {
      id: 4,
      number: 32,
      suffix: "%",
      title: "Reduced Productivity",
      text: "Companies report a 32% drop in productivity when managing requests without a unified ticketing solution.",
    },
  ];

  // Intersection Observer hook
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section
      ref={ref}
      className="relative py-16 px-6 md:px-16 lg:px-20 text-[#111827] dark:text-white"
    >
      <div className="max-w-6xl mx-auto text-center mb-12">
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-2xl md:text-4xl font-bold tracking-tight"
        >
          The Challenges Companies Face
        </motion.h2>
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 text-[#111827]/70 dark:text-white/70 text-sm md:text-lg"
        >
          Why modern teams turn to{" "}
          <span className="text-[#9B8AFB] font-semibold">TicketApp</span> for
          better support management
        </motion.p>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
        {challenges.map((item, index) => (
          <motion.div
            key={item.id}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.7, delay: 0.3 + index * 0.2 }}
            className="flex flex-col items-start text-left relative"
          >
            {/* Accent line */}
            <div className="w-[30%] sm:w-[40%] h-1 bg-[#9B8AFB] dark:bg-[#9B8AFB]/70 mb-6"></div>

            {/* Animated CountUp (only runs when inView) */}
            <h3 className="text-2xl md:text-5xl font-extrabold text-[#9B8AFB] dark:text-[#B8AFFF]">
              {inView && (
                <CountUp
                  start={0}
                  end={item.number}
                  duration={2.5}
                  suffix={item.suffix}
                />
              )}
            </h3>

            <h4 className="text-lg md:text-xl font-semibold mt-3">
              {item.title}
            </h4>

            <p className="mt-2 text-[#111827]/70 dark:text-white/70 text-sm leading-relaxed">
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
