import { loadTickets } from "../lib/ticketStorage";
import { Link } from "react-router-dom";
import { getSession } from "../lib/auth";
import { Ticket, Play, Clock, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const tickets = loadTickets();
  const session = getSession();
  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "open").length;
  const inProg = tickets.filter((t) => t.status === "in_progress").length;
  const closed = tickets.filter((t) => t.status === "closed").length;

  return (
    <main className="flex-1 py-16 mb-20 md:mb-26">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#111827] dark:text-white sm:text-4xl">
          Welcome back, {session?.name || session?.email || "User"}
        </h1>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#9B8AFB]/20">
                <Ticket className="text-[#9B8AFB] w-6 h-6" />
              </div>
              <p className="text-lg font-medium text-[#111827] dark:text-white">
                Total Tickets
              </p>
            </div>
            <p className="text-4xl font-bold tracking-tight text-[#111827] dark:text-white">
              {total}
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-xl bg-green-50 dark:bg-green-900/20 p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/20">
                <Play className="text-green-600 w-6 h-6" />
              </div>
              <p className="text-lg font-medium text-[#111827] dark:text-white">
                Open Tickets
              </p>
            </div>
            <p className="text-4xl font-bold tracking-tight text-green-600">
              {open}
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/20">
                <Clock className="text-amber-600 w-6 h-6" />
              </div>
              <p className="text-lg font-medium text-[#111827] dark:text-white">
                In Progress
              </p>
            </div>
            <p className="text-4xl font-bold tracking-tight text-amber-600">
              {inProg}
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20">
                <CheckCircle className="text-blue-600 w-6 h-6" />
              </div>
              <p className="text-lg font-medium text-[#111827] dark:text-white">
                Resolved Tickets
              </p>
            </div>
            <p className="text-4xl font-bold tracking-tight text-blue-600">
              {closed}
            </p>
          </div>
        </div>
        <div className="mt-10">
          <Link
            className="flex w-full items-center justify-center rounded-lg bg-[#9B8AFB] px-6 py-4 text-lg font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-[#9B8AFB]/90 focus:outline-none focus:ring-2 focus:ring-[#9B8AFB] focus:ring-offset-2"
            to="/tickets"
          >
            Manage Tickets
          </Link>
        </div>
      </div>
    </main>
  );
}
