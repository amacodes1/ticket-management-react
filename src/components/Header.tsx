"use client";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { Ticket, Menu, X } from "lucide-react";
import { clearSession, getSession } from "../lib/auth";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const nav = useNavigate();
  const session = getSession();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    clearSession();
    toast.success("Logged out successfully");
    nav("/");
  }

  // Get initials for avatar
  const getInitials = (name?: string) => {
    if (!name) return "";
    const parts = name.trim().split(" ").filter(Boolean);
    if (parts.length === 0) return "";
    if (parts.length === 1) return (parts[0][0] ?? "").toUpperCase();
    return ((parts[0][0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
  };


  return (
    <header className="w-full bg-white dark:bg-[#111827] shadow-sm fixed top-0 z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-container-xl px-6 md:px-16 lg:px-20 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#9B8AFB] flex items-center justify-center">
            <Ticket className="w-6 h-6 text-white" />
          </div>
          <div className="text-lg font-semibold text-[#111827] dark:text-white">
            TicketApp
          </div>
        </Link>

        {/* Center: Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
          <Link
            to="/"
            className="text-base text-[#111827] dark:text-white hover:text-[#9B8AFB]"
          >
            Home
          </Link>
          <Link
            to="/tickets"
            className="text-base text-[#111827] dark:text-white hover:text-[#9B8AFB]"
          >
            Tickets
          </Link>
          <Link
            to="/dashboard"
            className="text-base text-[#111827] dark:text-white hover:text-[#9B8AFB]"
          >
            Dashboard
          </Link>
        </nav>

        {/* Right: Profile / Login / Theme Toggle */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#9B8AFB] text-white font-semibold flex items-center justify-center">
                  {getInitials(session.name)}
                </div>
                <div className="text-sm font-medium text-[#111827] dark:text-white">
                  {session.name}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1 font-semibold cursor-pointer text-[#9B8AFB] text-base hover:text-[#9B8AFB]/80"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="px-3 py-1 bg-[#9B8AFB] cursor-pointer text-white rounded text-base hover:bg-[#9B8AFB]/90"
            >
              Login
            </Link>
          )}

          {/* <button
            onClick={toggleTheme}
            className="p-2 rounded-lg cursor-pointer hover:bg-[#9B8AFB]/20 dark:hover:bg-gray-800 text-[#111827] dark:text-white"
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button> */}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden cursor-pointer p-2 rounded-lg text-[#111827] dark:text-white hover:bg-[#9B8AFB]/10"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Side Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
              className="fixed right-0 top-0 h-full w-72 sm:w-80 bg-white dark:bg-[#111827] border-l border-gray-200 dark:border-gray-700 shadow-xl z-50 p-6 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-base font-semibold text-[#111827] dark:text-white">
                    TicketApp
                  </h2>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="p-2 text-[#111827] cursor-pointer dark:text-white hover:bg-[#9B8AFB]/10 rounded-lg"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-5">
                  <Link
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    className="text-base text-[#111827] dark:text-white hover:text-[#9B8AFB]"
                  >
                    Home
                  </Link>
                  <Link
                    to="/tickets"
                    onClick={() => setMenuOpen(false)}
                    className="text-base text-[#111827] dark:text-white hover:text-[#9B8AFB]"
                  >
                    Tickets
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="text-base text-[#111827] dark:text-white hover:text-[#9B8AFB]"
                  >
                    Dashboard
                  </Link>

                  {session ? (
                    <div className="flex flex-col border-t border-gray-200 pt-4 mt-8">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#9B8AFB] text-white font-semibold flex items-center justify-center">
                          {getInitials(session.name)}
                        </div>
                        <span className="text-sm text-[#111827] dark:text-white">
                          {session.name}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          handleLogout();
                          setMenuOpen(false);
                        }}
                        className="text-[#9B8AFB] cursor-pointer font-semibold text-sm mt-2"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/auth/login"
                      onClick={() => setMenuOpen(false)}
                      className="mt-4 px-3 py-2 bg-[#9B8AFB] cursor-pointer text-white rounded text-center text-base hover:bg-[#9B8AFB]/90"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>

              {/* Theme toggle at bottom */}
              {/* <button
                onClick={toggleTheme}
                className="mt-6 p-3 w-full rounded-lg cursor-pointer flex items-center justify-center gap-2 text-[#111827] dark:text-white hover:bg-[#9B8AFB]/10 dark:hover:bg-gray-800"
              >
                {isDark ? (
                  <>
                    <Sun className="w-5 h-5" /> <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5" /> <span>Dark Mode</span>
                  </>
                )}
              </button> */}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
