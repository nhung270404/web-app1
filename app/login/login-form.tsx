'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter, useSearchParams } from 'next/navigation';
import { ComponentPropsWithoutRef, FormEvent, useState } from 'react';
import { POST_METHOD } from '@/lib/req';
import { Trans, useTranslation } from 'react-i18next';
import Link from 'next/link';
import { User } from 'lucide-react';
import { Lock } from 'lucide-react';


export function LoginForm({
														className,
														...props
													}: ComponentPropsWithoutRef<'div'>) {
	const redirect = typeof window !== 'undefined'
		? new URLSearchParams(window.location.search).get('redirect')
		: null;
	const router = useRouter();
	const { t } = useTranslation();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError('');

		console.log('CLICK LOGIN');

		try {
			const res = await POST_METHOD('/api/login', {
				username,
				password,
			});

			console.log('LOGIN RESPONSE:', res);

			// bỏ check success để test
			window.location.href = redirect || '/control';

		} catch (err) {
			console.error(err);
			setError('Sai tài khoản hoặc mật khẩu');
		}
	};



	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-center text-2xl font-bold text-blue-600">{t('i_login')}</CardTitle>
					<CardDescription className="text-center">
						<Trans
							i18nKey="i_login_desc"
							components={{
								0: <strong className="font-bold" />,
								1: (
									<Link
										href="/signup"
										className="text-primary underline transition-colors hover:text-blue-600"
									/>
								),
							}}
						/>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col gap-6">
							{/*<div className="grid gap-4">*/}
							{/*	<Label>{t('i_phone_or_email')}</Label>*/}
							{/*	<Input*/}
							{/*		value={username}*/}
							{/*		onChange={(e) => setUsername(e.target.value)}*/}
							{/*		required*/}
							{/*	/>*/}
							{/*</div>*/}

							<div className="grid gap-2">
								<Label>{t('i_phone_or_email')}</Label>

								<div className="relative">
									<User
										className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
									/>

									<Input
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										placeholder={t('i_phone_or_email')}
										className="pl-10"
										required
									/>
								</div>
							</div>
							{/*<div className="grid gap-4">*/}
							{/*	<Label>{t('i_password')}</Label>*/}
							{/*	<Input*/}
							{/*		type="password"*/}
							{/*		value={password}*/}
							{/*		onChange={(e) => setPassword(e.target.value)}*/}
							{/*		required*/}
							{/*	/>*/}
							{/*</div>*/}

							<div className="grid gap-2">
								<Label>{t('i_password')}</Label>

								<div className="relative">
									<Lock
										className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
									/>

									<Input
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder={t('i_password')}
										className="pl-10 h-11 rounded-lg"
										required
									/>
								</div>
							</div>

							{error && (
								<p className="text-sm text-red-500">{error}</p>
							)}

							<Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
								{t('i_login')}
							</Button>
						</div>
						<div className="mt-3 text-center">
							<Link
								href="/forgot-password"
								className="text-sm text-muted-foreground hover:text-blue-600 transition-colors"
							>
								{t('i_forgot_password', { defaultValue: 'Quên mật khẩu ?' })}
							</Link>
						</div>
						<div className="mt-6">
							{/* Divider */}
							<div className="flex items-center gap-3 mb-4">
								<div className="h-px flex-1 bg-border" />
								<span className="h-2 w-2 rounded-full bg-muted-foreground" />
								<div className="h-px flex-1 bg-border" />
							</div>

							{/* Policy links */}
							<div className="text-center text-sm text-muted-foreground">
								<Link
									href="/privacy-policy"
									className="hover:text-blue-600 transition-colors"
								>
									Chính sách bảo mật
								</Link>
								<span className="mx-2">•</span>
								<Link
									href="/terms"
									className="hover:text-blue-600 transition-colors"
								>
									Điều khoản dịch vụ
								</Link>
							</div>
						</div>

					</form>
				</CardContent>
			</Card>
		</div>
	);
}
