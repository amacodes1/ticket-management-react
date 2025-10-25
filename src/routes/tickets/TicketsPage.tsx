import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import {
  loadTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../../lib/ticketStorage";
import type { Ticket } from "../../types";
import TicketCard from "./TicketCard";
import TicketForm from "./TicketForm";

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [editing, setEditing] = useState<Ticket | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setTickets(loadTickets());
  }, []);

  function handleCreate(
    payload: Omit<Ticket, "id" | "createdAt" | "updatedAt">
  ) {
    try {
      const t = createTicket(payload);
      setTickets((prev) => [t, ...prev]);
      toast.success("Ticket created");
      setShowForm(false);
    } catch {
      toast.error("Failed to create ticket");
    }
  }

  function handleUpdate(updated: Ticket) {
    try {
      const t = updateTicket(updated);
      setTickets((prev) => prev.map((p) => (p.id === t.id ? t : p)));
      setEditing(null);
      toast.success("Ticket updated");
    } catch {
      toast.error("Failed to update ticket");
    }
  }

  function handleDelete(id: string) {
    try {
      deleteTicket(id);
      setTickets((prev) => prev.filter((t) => t.id !== id));
      toast.success("Ticket deleted");
    } catch {
      toast.error("Failed to delete ticket");
    }
  }

  return (
    <main className="mx-auto max-w-container-xl px-6 py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Tickets</h2>
        <div>
          <button
            className="px-4 py-2 cursor-pointer bg-[#6B46C1] text-white rounded"
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
          >
            New Ticket
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mt-6">
          <TicketForm
            onCancel={() => setShowForm(false)}
            onSubmit={handleCreate}
            initial={null}
          />
        </div>
      )}

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {tickets.length === 0 ? (
          <div className="text-gray-600">
            No tickets yet. Create your first ticket.
          </div>
        ) : (
          tickets.map((t) => (
            <TicketCard
              key={t.id}
              ticket={t}
              onEdit={() => {
                setEditing(t);
                setShowForm(true);
              }}
              onDelete={() => handleDelete(t.id)}
            />
          ))
        )}
      </div>

      {editing && (
        <div className="mt-6">
          <TicketForm
            onCancel={() => {
              setEditing(null);
              setShowForm(false);
            }}
            onSubmit={(
              payload: Omit<Ticket, "id" | "createdAt" | "updatedAt">
            ) => handleUpdate({ ...editing, ...payload })}
            initial={editing}
          />
        </div>
      )}
    </main>
  );
}
