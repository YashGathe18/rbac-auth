import { User, AuthenticatedUser } from '@/types/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// This would typically be stored in a database
const users: User[] = [];

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function register(username: string, password: string, role: 'user' | 'moderator' | 'admin' = 'user'): Promise<AuthenticatedUser | null> {
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return null;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: Date.now().toString(),
    username,
    password: hashedPassword,
    role,
  };

  users.push(newUser);

  return {
    id: newUser.id,
    username: newUser.username,
    role: newUser.role,
  };
}

export async function login(username: string, password: string): Promise<string | null> {
  const user = users.find(u => u.username === username);
  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

  return token;
}

export function verifyToken(token: string): AuthenticatedUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthenticatedUser;
    return decoded;
  } catch (error) {
    return null;
  }
}

