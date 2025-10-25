import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Ticket } from 'lucide-react';
import { clearSession, getSession } from "../lib/auth";

export default function Header() {
  const nav = useNavigate();
  const session = getSession();
  function handleLogout() {
    clearSession();
    toast.success("Logged out successfully");
    nav("/");
  }
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="mx-auto max-w-container-xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#9B8AFB] flex items-center justify-center">
            <Ticket className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-lg font-semibold">TicketApp</div>
            {/* <div className="text-xs text-gray-500 -mt-0.5">
              Manage tickets, stay organized
            </div> */}
          </div>
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/tickets" className="hidden md:inline text-sm">
            Tickets
          </Link>
          <Link to="/dashboard" className="hidden md:inline text-sm">
            Dashboard
          </Link>
          {session ? (
            <>
              <div className="text-sm hidden sm:block">{session.email}</div>
              <button
                onClick={handleLogout}
                className="px-3 py-1 cursor-pointer text-[#9B8AFB] text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth/login" className="px-3 py-1 bg-[#9B8AFB] text-white rounded text-sm">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
