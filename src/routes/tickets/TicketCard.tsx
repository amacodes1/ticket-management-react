import type { Ticket } from "../../types";

function statusClass(status: Ticket["status"]) {
  if (status === "open") return "bg-green-50 text-green-700";
  if (status === "in_progress") return "bg-amber-50 text-amber-700";
  return "bg-gray-100 text-gray-700";
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
    <article className="bg-white rounded shadow p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{ticket.title}</h3>
          <div className="text-sm text-gray-500">{ticket.description}</div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className={`px-2 py-1 text-xs rounded ${statusClass(
              ticket.status
            )}`}
          >
            {ticket.status}
          </span>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="text-sm px-3 py-1 cursor-pointer border rounded"
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (!confirm("Are you sure you want to delete this ticket?"))
                  return;
                onDelete();
              }}
              className="text-sm px-3 py-1 cursor-pointer rounded bg-red-50 text-red-600 border"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
