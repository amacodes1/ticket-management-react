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
      toast.error("Please fix the validation errors");
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
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
          {errors.title && (
            <div className="text-sm text-red-600">{errors.title}</div>
          )}
        </div>
        <div>
          <label className="block text-sm">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Ticket["status"])}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="open">open</option>
            <option value="in_progress">in_progress</option>
            <option value="closed">closed</option>
          </select>
          {errors.status && (
            <div className="text-sm text-red-600">{errors.status}</div>
          )}
        </div>
      </div>

      <div className="mt-3">
        <label className="block text-sm">Description (optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded px-3 py-2 w-full h-28"
        />
        {errors.description && (
          <div className="text-sm text-red-600">{errors.description}</div>
        )}
      </div>

      <div className="mt-3 flex items-center gap-3">
        <button
          type="submit"
          className="px-4 py-2 rounded cursor-pointer bg-[#6B46C1] text-white"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-2 rounded cursor-pointer border"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
