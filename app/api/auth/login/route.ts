import { NextResponse } from 'next/server';
import { login } from '@/lib/auth';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const token = await login(username, password);

  if (!token) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

  return response;
}

