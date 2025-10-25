export type TicketStatus = "open" | "in_progress" | "closed";

export interface Ticket {
  id: string;
  title: string;
  description?: string;
  priority?: number;
  status: TicketStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface UserSession {
  token: string;
  email: string;
  name?: string;
}
