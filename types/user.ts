export type Role = 'user' | 'moderator' | 'admin';

export interface User {
  id: string;
  username: string;
  password: string;
  role: Role;
}

export interface AuthenticatedUser {
  id: string;
  username: string;
  role: Role;
}

