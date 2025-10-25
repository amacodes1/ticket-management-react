import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Ticket, Search, Plus, AlertTriangle } from 'lucide-react';
import {
  loadTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../../lib/ticketStorage";
import type { Ticket as TicketType } from "../../types";
import TicketCard from "./TicketCard";
import TicketForm from "./TicketForm";

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fade-in-scale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  .animate-fade-in-scale {
    animation: fade-in-scale 0.2s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default function TicketsPage() {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [editing, setEditing] = useState<TicketType | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    setTickets(loadTickets());
  }, []);

  const filteredTickets = tickets.filter(ticket => 
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleCreate(
    payload: Omit<TicketType, "id" | "createdAt" | "updatedAt">
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

  function handleUpdate(updated: TicketType) {
    try {
      const t = updateTicket(updated);
      setTickets((prev) => prev.map((p) => (p.id === t.id ? t : p)));
      setEditing(null);
      setShowForm(false);
      toast.success("Ticket updated");
    } catch {
      toast.error("Failed to update ticket");
    }
  }

  function handleDelete(id: string) {
    try {
      deleteTicket(id);
      setTickets((prev) => prev.filter((t) => t.id !== id));
      setDeleteConfirm(null);
      toast.success("Ticket deleted");
    } catch {
      toast.error("Failed to delete ticket");
    }
  }

  return (
    <div className="bg-white dark:bg-[#111827] text-[#111827] dark:text-white font-display">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="mx-auto max-w-7xl w-full">
          <header className="flex items-center bg-white dark:bg-[#111827] p-6 justify-between sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <Ticket className="text-[#9B8AFB] w-8 h-8" />
              <h1 className="text-2xl font-bold leading-tight tracking-[-0.015em]">TicketApp</h1>
            </div>
            <button 
              className="bg-[#9B8AFB] text-white font-medium py-3 px-6 rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9B8AFB] transition-all hidden sm:block"
              onClick={() => {
                setEditing(null);
                setShowForm(true);
              }}
            >
              Create New Ticket
            </button>
          </header>
          <main className="p-6 md:p-8">
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#9B8AFB] focus:border-transparent transition-shadow text-[#111827] dark:text-white" 
                  placeholder="Search tickets by title, description..." 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTickets.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 bg-white dark:bg-gray-800/50 rounded-lg p-6 border-2 border-dashed border-gray-300 dark:border-gray-700">
                  <Plus className="text-gray-400 dark:text-gray-500 w-12 h-12" />
                  <p className="text-gray-500 dark:text-gray-400">You have no more tickets.</p>
                  <button 
                    className="bg-[#9B8AFB] text-white font-medium py-2 px-4 rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9B8AFB] transition-all"
                    onClick={() => {
                      setEditing(null);
                      setShowForm(true);
                    }}
                  >
                    Create New Ticket
                  </button>
                </div>
              ) : (
                filteredTickets.map((t) => (
                  <TicketCard
                    key={t.id}
                    ticket={t}
                    onEdit={() => {
                      setEditing(t);
                      setShowForm(true);
                    }}
                    onDelete={() => setDeleteConfirm(t.id)}
                  />
                ))
              )}
            </div>
          </main>
        </div>
      </div>
      
      {(showForm || editing) && (
        <div className="fixed inset-0 bg-white/80 dark:bg-[#111827]/80 backdrop-blur-sm flex items-center justify-center min-h-screen p-4 z-50">
          <div className="w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-xl shadow-2xl p-6 md:p-8 lg:p-12 font-display">
            <div className="relative flex h-auto w-full flex-col">
              <h1 className="text-zinc-900 dark:text-white tracking-light text-2xl md:text-3xl font-bold leading-tight text-left pb-6">
                {editing ? `Edit Ticket #${editing.id.slice(0, 8).toUpperCase()}` : 'Create New Ticket'}
              </h1>
            </div>
            <TicketForm
              onCancel={() => {
                setShowForm(false);
                setEditing(null);
              }}
              onSubmit={editing ? 
                (payload: Omit<TicketType, "id" | "createdAt" | "updatedAt">) => handleUpdate({ ...editing, ...payload }) :
                handleCreate
              }
              initial={editing}
            />
          </div>
        </div>
      )}
      
      {deleteConfirm && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#111827] rounded-xl shadow-lg w-full max-w-sm p-6 flex flex-col items-center text-center animate-fade-in-scale">
            <div className="mb-4">
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertTriangle className="text-[#EF4444] w-8 h-8" />
              </div>
            </div>
            <h1 className="text-[#111827] dark:text-white tracking-tight text-[24px] font-bold leading-tight pb-2">Delete Ticket?</h1>
            <p className="text-[#111827] dark:text-gray-300 text-base font-normal leading-normal pb-6">You are about to permanently delete this ticket. This action cannot be undone.</p>
            <div className="flex flex-col sm:flex-row justify-stretch w-full gap-3">
              <button 
                className="flex-1 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-[#EF4444] text-white text-base font-bold leading-normal tracking-[0.015em]"
                onClick={() => handleDelete(deleteConfirm)}
              >
                <span className="truncate">Delete</span>
              </button>
              <button 
                className="flex-1 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-gray-200 dark:bg-gray-700 text-[#111827] dark:text-white text-base font-bold leading-normal tracking-[0.015em]"
                onClick={() => setDeleteConfirm(null)}
              >
                <span className="truncate">Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
