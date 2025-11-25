import '@/lib/init';
import UserModel, { IUser } from '@/models/user.model';
import jwt from 'jsonwebtoken';

export const Login = async (body: {username: string, password: string}) => {
  let user: IUser | null = null
  try {
    const rs = await UserModel.findOne(
      {
        $or: [{ phone: body.username }, { email: body.username }],
      },
      { __v: 0 },
    ).populate('roles', { name: 1 });
    if (rs) user = rs
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
  if (!user) {
    throw new Error('Invalid credentials');
  }
  const isValid = await user.validPassword(body.password);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  const JWT_SECRET = process.env.JWT_SECRET!;
  return jwt.sign({ ...user, password: undefined }, JWT_SECRET, {
    expiresIn: '30d',
  });
};