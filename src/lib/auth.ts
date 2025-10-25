import type { UserSession } from "../types";

const SESSION_KEY = "ticketapp_session";

export function saveSession(session: UserSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): UserSession | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserSession;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!getSession();
}

// mock register/login functions (very simple)
export async function mockRegister(
  email: string,
  password: string,
  name = ""
): Promise<UserSession> {
  // simulate network latency
  await new Promise((r) => setTimeout(r, 400));
  // store credentials in localStorage users list (for demo only)
  const usersRaw = localStorage.getItem("ticketapp_users") || "[]";
  const users = JSON.parse(usersRaw) as Array<{
    email: string;
    password: string;
    name?: string;
  }>;
  if (users.find((u) => u.email === email)) {
    throw new Error("Email already registered");
  }
  users.push({ email, password, name });
  localStorage.setItem("ticketapp_users", JSON.stringify(users));
  const session: UserSession = {
    token: btoa(email + ":" + Date.now()),
    email,
    name,
  };
  saveSession(session);
  return session;
}

export async function mockLogin(
  email: string,
  password: string
): Promise<UserSession> {
  await new Promise((r) => setTimeout(r, 350));
  const usersRaw = localStorage.getItem("ticketapp_users") || "[]";
  const users = JSON.parse(usersRaw) as Array<{
    email: string;
    password: string;
    name?: string;
  }>;
  const found = users.find((u) => u.email === email && u.password === password);
  if (!found) throw new Error("Invalid email or password");
  const session: UserSession = {
    token: btoa(email + ":" + Date.now()),
    email,
    name: found.name || "",
  };
  saveSession(session);
  return session;
}
