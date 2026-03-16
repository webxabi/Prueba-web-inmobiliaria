import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import bcrypt from 'bcryptjs';
import { login } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Faltan credenciales' }, { status: 400 });
    }

    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as any;

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 401 });
    }

    const validPassword = bcrypt.compareSync(password, user.password_hash);
    if (!validPassword) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    // Set session cookie
    await login(user.id.toString());

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
