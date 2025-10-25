import type { TicketStatus } from "../types";

export function validateTitle(title?: string) {
  if (!title || title.trim().length === 0) return "Title is required.";
  if (title.trim().length > 120) return "Title must be under 120 characters.";
  return null;
}

export function validateStatus(status: string | undefined) {
  const allowed: TicketStatus[] = ["open", "in_progress", "closed"];
  if (!status) return "Status is required.";
  if (!allowed.includes(status as TicketStatus))
    return "Status must be open, in_progress, or closed.";
  return null;
}

export function validateDescription(desc?: string) {
  if (!desc) return null;
  if (desc.length > 2000) return "Description too long.";
  return null;
}
