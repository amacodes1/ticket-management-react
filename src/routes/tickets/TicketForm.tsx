import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import {
  validateTitle,
  validateStatus,
  validateDescription,
} from "../../utils/validators";
import type { Ticket } from "../../types";

export default function TicketForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial: Ticket | null;
  onSubmit: (payload: Omit<Ticket, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}) {
  const editing = !!initial;
  const [title, setTitle] = useState(initial?.title || "");
  const [status, setStatus] = useState<Ticket["status"]>(
    initial?.status || "open"
  );
  const [description, setDescription] = useState(initial?.description || "");
  const [priority] = useState(initial?.priority ?? 3);
  const [errors, setErrors] = useState<{
    title?: string;
    status?: string;
    description?: string;
  }>({});

  const statusColors = {
    open: '#22C55E',
    in_progress: '#F59E0B',
    closed: '#9CA3AF'
  };

  useEffect(() => {
    setErrors({});
  }, [title, status, description]);

  function runValidation() {
    const t = validateTitle(title);
    const s = validateStatus(status);
    const d = validateDescription(description);
    const errs: { title?: string; status?: string; description?: string } = {};
    if (t) errs.title = t;
    if (s) errs.status = s;
    if (d) errs.description = d;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!runValidation()) {
      toast.error("Please enter the required fields correctly.");
      return;
    }
    onSubmit({
      title: title.trim(),
      status,
      description: description.trim(),
      priority,
    });
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-col min-w-20 flex-1">
        <label className="text-zinc-800 dark:text-zinc-200 text-base font-medium leading-normal pb-2" htmlFor="title">Title*</label>
        <input 
          className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-zinc-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#9B8AFB]/50 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 h-14 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 p-4 text-base font-normal leading-normal" 
          id="title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Fix login button on mobile"
        />
        <p className="text-red-500 text-sm mt-1 h-4">{errors.title || ''}</p>
      </div>
      <div className="flex flex-col min-w-40 flex-1">
        <label className="text-zinc-800 dark:text-zinc-200 text-base font-medium leading-normal pb-2" htmlFor="description">Description (optional but recommended)</label>
        <textarea 
          className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-zinc-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#9B8AFB]/50 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 min-h-36 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 p-4 text-base font-normal leading-normal" 
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide a detailed description of the issue..."
        />
        <p className="text-red-500 text-sm mt-1 h-4">{errors.description || ''}</p>
      </div>
      <div className="flex flex-col min-w-40 flex-1 relative">
        <label className="text-zinc-800 dark:text-zinc-200 text-base font-medium leading-normal pb-2" htmlFor="status">Status*</label>
        <div className="relative flex items-center">
          <span 
            className="absolute left-4 w-2 h-2 rounded-full" 
            style={{ backgroundColor: statusColors[status] }}
          />
          <select 
            className="flex w-full min-w-0 flex-1 cursor-pointer resize-none overflow-hidden rounded-lg text-zinc-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#9B8AFB]/50 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 h-14 pl-8 pr-12 text-base font-normal leading-normal" 
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Ticket["status"])}
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <p className="text-red-500 text-sm mt-1 h-4">{errors.status || ''}</p>
      </div>
      <div className="flex justify-end pt-8">
        <div className="flex flex-col sm:flex-row flex-1 gap-3 justify-end">
          <button 
            className="flex min-w-[84px] max-w-full sm:max-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-zinc-100 text-zinc-800 dark:text-zinc-200 text-base font-bold leading-normal tracking-[0.015em] hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors" 
            type="button"
            onClick={onCancel}
          >
            <span className="truncate">Cancel</span>
          </button>
          <button 
            className="flex min-w-[84px] max-w-full sm:max-w-[180px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#9B8AFB] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#9B8AFB]/90 transition-colors" 
            type="submit"
            onClick={handleSubmit}
          >
            <span className="truncate">{editing ? 'Save Changes' : 'Create Ticket'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
