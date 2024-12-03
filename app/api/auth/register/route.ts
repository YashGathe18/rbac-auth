import { NextResponse } from 'next/server';
import { register } from '@/lib/auth';

export async function POST(req: Request) {
  const { username, password, role } = await req.json();

  const user = await register(username, password, role);

  if (!user) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}

