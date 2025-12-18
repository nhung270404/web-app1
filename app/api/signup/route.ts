import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/user.model';
import '@/lib/mongo';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstname, lastname, email, phone, password } = body;

    if (!firstname || !lastname || !phone || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const exists = await User.findOne({
      $or: [
        { phone },
        ...(email?.trim() ? [{ email: email.trim() }] : []),
      ],
    });

    if (exists) {
      return NextResponse.json(
        { message: 'Email hoặc số điện thoại đã tồn tại' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      firstname,
      lastname,
      phone,
      email: email?.trim() ? email.trim() : undefined,
      password: hashedPassword,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
