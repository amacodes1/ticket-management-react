import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getSession } from "../lib/auth";
import WavyBg from "../assets/tsxsvgs/WavyBg";
import circle from "../assets/circle.svg";

export default function Hero() {
  const session = getSession();

  return (
    <section className="relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute w-96 h-96 bg-[#9B8AFB]/20 rounded-full -top-32 -left-32 z-0"></div>
      <div className="absolute hidden sm:block w-56 h-56 bg-[#9B8AFB]/20 rounded-full -top-32 -right-12 z-0"></div>

      {/* Wavy background */}
      <div className="absolute bottom-5 rotate-180 left-0 w-full text-[#9B8AFB] z-0">
        <WavyBg />
      </div>

      {/* Animated Circle SVG */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="hidden md:block absolute top-1/2 right-8 transform -translate-y-1/2 w-80 h-80 text-[#9B8AFB] z-0"
      >
        <img src={circle} alt="" className="w-full h-full opacity-80" />
      </motion.div>

      {/* Main content */}
      <div className="relative min-h-[95vh] md:h-[520px] flex flex-col justify-center px-6 md:px-16 lg:px-20 z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: -10 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col gap-4 max-w-lg md:-mt-10"
        >
          <motion.h1
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-black tracking-tight text-left text-[#111827] dark:text-white"
          >
            TicketApp
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-xl text-[#111827]/80 dark:text-white/80 text-left leading-relaxed"
          >
            Streamline your customer support experience.{" "}
            <span className="block">
              Track, manage, and resolve tickets effortlessly with a beautiful,
              intuitive interface.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 mt-3"
          >
            {session ? (
              <Link
                to="/dashboard"
                className="flex items-center justify-center rounded-full h-12 px-8 bg-[#9B8AFB] text-white font-semibold shadow-lg shadow-[#9B8AFB]/30 hover:bg-[#9B8AFB]/90 transition-all"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="flex items-center justify-center rounded-full h-12 px-4 md:px-8 bg-[#9B8AFB] text-white font-semibold shadow-lg shadow-[#9B8AFB]/30 hover:bg-[#9B8AFB]/90 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/auth/signup"
                  className="flex items-center justify-center rounded-full h-12 px-8 bg-[#9B8AFB]/10 text-[#9B8AFB] font-semibold hover:bg-[#9B8AFB]/20 transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
