import { loadTickets } from "../lib/ticketStorage";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const tickets = loadTickets();
  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "open").length;
  const inProg = tickets.filter((t) => t.status === "in_progress").length;
  const closed = tickets.filter((t) => t.status === "closed").length;

  return (
    <main className="mx-auto max-w-container-xl px-6 py-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-sm text-gray-600">Overview of your tickets</p>

      <div className="grid sm:grid-cols-4 gap-4 mt-6">
        <div className="p-4 rounded shadow bg-white">
          <div className="text-sm text-gray-500">Total</div>
          <div className="text-2xl font-bold">{total}</div>
        </div>
        <div className="p-4 rounded shadow bg-white">
          <div className="text-sm text-gray-500">Open</div>
          <div className="text-2xl font-bold text-green-600">{open}</div>
        </div>
        <div className="p-4 rounded shadow bg-white">
          <div className="text-sm text-gray-500">In Progress</div>
          <div className="text-2xl font-bold text-amber-500">{inProg}</div>
        </div>
        <div className="p-4 rounded shadow bg-white">
          <div className="text-sm text-gray-500">Closed</div>
          <div className="text-2xl font-bold text-gray-500">{closed}</div>
        </div>
      </div>

      <div className="mt-8">
        <Link
          to="/tickets"
          className="px-4 py-2 rounded bg-[#6B46C1] text-white"
        >
          Manage tickets
        </Link>
      </div>
    </main>
  );
}
