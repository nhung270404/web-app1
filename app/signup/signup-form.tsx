'use client';

import { ComponentPropsWithoutRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema, SignupSchema } from '@/lib/schemas/signup.schema';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Facebook } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';



export function SignupForm({
                             className,
                             ...props
                           }: ComponentPropsWithoutRef<'div'>) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data: SignupSchema) => {
    await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    router.push('/login');
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold text-blue-600">
            Đăng ký
          </CardTitle>

          <p className="text-center text-sm text-muted-foreground">
            Đã có tài khoản?{' '}
            <Link
              href="/login"
              className="font-medium text-primary underline transition-colors hover:text-blue-600"
            >
              Đăng nhập
            </Link>
          </p>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <Label>Họ</Label>
              <Input {...register('firstname')} className="mt-2"/>
              {errors.firstname &&
                <p className="text-sm text-red-500">
                  {errors.firstname.message}
                </p>}
            </div>

            <div>
              <Label>Tên</Label>
              <Input {...register('lastname')} className="mt-2"/>
              {errors.lastname &&
                <p className="text-sm text-red-500">
                  {errors.lastname.message}
                </p>}
            </div>

            <div>
              <Label>Email (không bắt buộc)</Label>
              <Input {...register('email')} className="mt-2"/>
              {errors.email &&
                <p className="text-sm text-red-500">
                  {errors.email.message}
                </p>}
            </div>

            <div>
              <Label>Số điện thoại</Label>
              <Input {...register('phone')} className="mt-2"/>
              {errors.phone &&
                <p className="text-sm text-red-500">
                  {errors.phone.message}
                </p>}
            </div>

            <div>
              <Label>Mật khẩu</Label>
              <Input type="password" {...register('password')} className="mt-2"/>
              {errors.password &&
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>}
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Đăng ký
            </Button>
            <div className="flex items-center gap-3 my-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">
    Hoặc đăng ký bằng
  </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Social register */}
            <div className="flex gap-3">
              {/* Google */}
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
              >
                <FcGoogle className="h-5 w-5" />
                Google
              </button>

              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#1877F2] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#166FE5]"
              >
                <Facebook className="h-5 w-5" />
                Facebook
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
