import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '@/models/user.model';
import '@/lib/mongo';

export const Login = async (body: {
	username: string;
	password: string;
}) => {
	const username = body.username
		.toLowerCase()
		.replace('+84', '0')
		.replace(/\s+/g, '');

	// 1️⃣ tìm user bằng email hoặc phone
	const user = await User.findOne({
		$or: [
			{ email: username },
			{ phone: username },
		],
	}).select('+password');

	if (!user) {
		throw new Error('Invalid credentials');
	}

	// 2️⃣ so sánh password
	const isValid = await bcrypt.compare(body.password, user.password);
	if (!isValid) {
		throw new Error('Invalid credentials');
	}

	// 3️⃣ tạo JWT
	const token = jwt.sign(
		{
			userId: user._id,
			email: user.email,
			phone: user.phone,
			roles: user.roles,
		},
		process.env.JWT_SECRET!,
		{ expiresIn: '30d' }
	);

	return token;
};
