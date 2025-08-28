export type Role = 'user' | 'premium' | 'familyAdmin';

export interface User {
  id: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
}

// Express Request'e user alanı ekle
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {};
