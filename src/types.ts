export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: "user" | "family" | "admin";
  createdAt: string; // ISO
}
