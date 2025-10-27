import type { Ticket } from "../../types";
import { Edit, Trash2 } from 'lucide-react';

function statusClass(status: Ticket["status"]) {
  if (status === "open") return "bg-green-500/10 text-green-600";
  if (status === "in_progress") return "bg-amber-500/10 text-amber-600";
  return "bg-gray-500/20 text-gray-600";
}

function formatStatus(status: Ticket["status"]) {
  if (status === "in_progress") return "In Progress";
  if (status === "open") return "Open";
  return "Closed";
}

export default function TicketCard({
  ticket,
  onEdit,
  onDelete,
}: {
  ticket: Ticket;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 bg-white dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold text-[#111827] dark:text-white">{ticket.title}</p>
        <div className="flex items-center gap-2">
          <button 
            className="p-2 rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            onClick={onEdit}
          >
            <Edit className="w-4 h-4" />
          </button>
          <button 
            className="p-2 rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            onClick={onDelete}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{ticket.description}</p>
      <div className="flex items-center justify-between mt-2">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusClass(ticket.status)}`}>
          {formatStatus(ticket.status)}
        </span>
      </div>
    </div>
  );
}
