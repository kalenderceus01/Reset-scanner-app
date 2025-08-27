export type Role = "user" | "family" | "admin";

export interface User {
  id: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
}
