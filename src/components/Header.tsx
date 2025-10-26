import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Ticket, Sun, Moon } from "lucide-react";
import { clearSession, getSession } from "../lib/auth";
import { useState, useEffect } from "react";

export default function Header() {
  const nav = useNavigate();
  const session = getSession();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  function handleLogout() {
    clearSession();
    toast.success("Logged out successfully");
    nav("/");
  }

  function toggleTheme() {
    setIsDark(!isDark);
  }
  return (
    <header className="w-full bg-white dark:bg-[#111827] shadow-sm fixed top-0 z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-container-xl px-6 md:px-16 lg:px-20 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#9B8AFB] flex items-center justify-center">
            <Ticket className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-lg font-semibold">TicketApp</div>
          </div>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            to="/tickets"
            className="hidden md:inline text-base text-[#111827] dark:text-white hover:text-[#9B8AFB]"
          >
            Tickets
          </Link>
          <Link
            to="/dashboard"
            className="hidden md:inline text-base text-[#111827] dark:text-white hover:text-[#9B8AFB]"
          >
            Dashboard
          </Link>

          {session ? (
            <>
              <div className="text-sm hidden sm:block text-[#111827] dark:text-white">
                Hi, {session.name}
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1 cursor-pointer font-semibold text-[#9B8AFB] text-base hover:text-[#9B8AFB]/80"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth/login"
              className="px-3 py-1 bg-[#9B8AFB] text-white rounded text-base hover:bg-[#9B8AFB]/90"
            >
              Login
            </Link>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-[#9B8AFB]/20 dark:hover:bg-gray-800 text-[#111827] dark:text-white"
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
