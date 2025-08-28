export interface User {
  id: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
