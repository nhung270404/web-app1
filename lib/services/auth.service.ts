import {IUser} from '@/models/user.model';
import jwt from 'jsonwebtoken';
import {POST_METHOD} from "@/lib/req";

export const Login = async (body: { username: string, password: string }) => {
	let user: IUser | undefined
	try {
		const userName = body.username.toLowerCase()
			.replace("+84", "0")
			.replace(/[^\w\s.{@,1}]/g, '')
			.replace(/\s+/g, '')
		console.log(userName, "username")
		const rs: IUser = await POST_METHOD("/auth/login", {username: userName, password: body.password});
		if (rs) user = rs;
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
	return jwt.sign({...user, password: undefined}, JWT_SECRET, {
		expiresIn: '30d',
	});
};