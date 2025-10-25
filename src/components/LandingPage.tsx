import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <main className="mx-auto max-w-container-xl px-6">
      <section className="relative overflow-hidden mt-8">
        {/* Decorative circles (absolute) */}
        <div
          className="absolute -left-20 -top-10 w-48 h-48 rounded-full bg-[#C6B9FF] opacity-60 blur-md"
          aria-hidden
        />
        <div
          className="absolute right-8 -top-6 w-28 h-28 rounded-full bg-black opacity-7"
          aria-hidden
        />
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold">
                TicketApp — Ship less, deliver faster
              </h1>
              <p className="mt-4 text-gray-600">
                A lightweight ticket management app tailored for teams and solo
                makers. Track issues, assign work, and close the loop.
              </p>
              <div className="mt-6 flex gap-3">
                <Link
                  to="/auth/signup"
                  className="px-5 py-3 rounded bg-[#6B46C1] text-white inline-flex items-center"
                >
                  Get Started
                </Link>
                <Link to="/auth/login" className="px-5 py-3 rounded border">
                  Login
                </Link>
              </div>
            </div>
            <motion.div
              initial={{ scale: 0.95, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4"
            >
              {/* Hero visual box */}
              {/* <div className="h-56 md:h-72 rounded-lg bg-linear-to-tr from-white to-[#C6B9FF] shadow-lg border flex items-center justify-center">
                <div className="text-center">
                  <div className="text-sm text-gray-700">Track</div>
                  <div className="text-3xl font-bold">
                    Open · In Progress · Closed
                  </div>
                </div>
              </div> */}
            </motion.div>
          </div>
        </div>

        {/* wave SVG at bottom edge */}
        <div className="mt-2">
          <svg
            viewBox="0 0 1440 120"
            className="w-full"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0,80 C360,160 1080,0 1440,80 L1440 0 L0 0 Z"
              fill="#F7F6FF"
            />
          </svg>
        </div>
      </section>

      <section className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="rounded-xl shadow p-6 bg-white">
          <h3 className="font-semibold">Create Tickets</h3>
          <p className="text-sm text-gray-600 mt-2">
            Quickly add tasks and issues with validation and status tags.
          </p>
        </div>
        <div className="rounded-xl shadow p-6 bg-white">
          <h3 className="font-semibold">Track Progress</h3>
          <p className="text-sm text-gray-600 mt-2">
            See open and resolved work at a glance on the dashboard.
          </p>
        </div>
        <div className="rounded-xl shadow p-6 bg-white">
          <h3 className="font-semibold">Secure</h3>
          <p className="text-sm text-gray-600 mt-2">
            Simple but effective local session simulation and protected routes.
          </p>
        </div>
      </section>
    </main>
  );
}
