import type { Ticket } from "../types";

const KEY = "ticketapp_tickets";

export function loadTickets(): Ticket[] {
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Ticket[];
  } catch {
    return [];
  }
}

export function saveTickets(list: Ticket[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function createTicket(
  newTicket: Omit<Ticket, "id" | "createdAt" | "updatedAt">
): Ticket {
  const list = loadTickets();
  const ticket: Ticket = {
    ...newTicket,
    id: cryptoRandomId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  list.unshift(ticket);
  saveTickets(list);
  return ticket;
}

export function updateTicket(updated: Ticket): Ticket {
  const list = loadTickets();
  const idx = list.findIndex((t) => t.id === updated.id);
  if (idx === -1) throw new Error("Ticket not found");
  updated.updatedAt = new Date().toISOString();
  list[idx] = updated;
  saveTickets(list);
  return updated;
}

export function deleteTicket(id: string) {
  const list = loadTickets();
  const newList = list.filter((t) => t.id !== id);
  saveTickets(newList);
}

function cryptoRandomId() {
  return Math.random().toString(36).slice(2, 9);
}
