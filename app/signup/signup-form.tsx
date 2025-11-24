'use client'

import { ComponentPropsWithoutRef } from 'react';
import { useRouter } from 'next/navigation';
import { Trans, useTranslation } from 'react-i18next';
import { signupSchema, SignupSchema } from '@/lib/schemas/signup.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SignupForm({className, ...props}: ComponentPropsWithoutRef<'div'>) {
  const router = useRouter();
  const {t} = useTranslation();

  // form state (react-hook-form + zod)
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: ""
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = form;

  // API check email / phone tồn tại
  const checkExists = async (field: "email" | "phone", value: string) => {
    if (!value) return;

    try {
      const res = await fetch(`/api/check?field=${field}&value=${value}`);
      const data = await res.json();

      if (data.exists) {
        setError(field, {
          type: "manual",
          message: field === "email" ? "Email đã tồn tại" : "Số điện thoại đã tồn tại"
        });
      }
    } catch (e) {
      console.error("Check failed", e);
    }
  };

  // Submit handler
  const onSubmit = async (data: SignupSchema) => {
    try {
      await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(data)
      });

      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t("i_signup")}</CardTitle>

          <CardDescription>
            <Trans
              i18nKey="i_signup_desc"
              components={{
                1: <Link href="/login" className="text-primary underline" />
              }}
            />
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            {/* Firstname */}
            <div className="grid gap-2">
              <Label>Họ</Label>
              <Input {...register("firstname")} />
              {errors.firstname && (
                <p className="text-red-500 text-sm">{errors.firstname.message}</p>
              )}
            </div>

            {/* Lastname */}
            <div className="grid gap-2">
              <Label>Tên</Label>
              <Input {...register("lastname")} />
              {errors.lastname && (
                <p className="text-red-500 text-sm">{errors.lastname.message}</p>
              )}
            </div>

            {/* Email (optional) */}
            <div className="grid gap-2">
              <Label>Email (không bắt buộc)</Label>
              <Input
                {...register("email")}
                onBlur={(e) => checkExists("email", e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="grid gap-2">
              <Label>Số điện thoại</Label>
              <Input
                {...register("phone")}
                onBlur={(e) => checkExists("phone", e.target.value)}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label>Mật khẩu</Label>
              <Input type="password" {...register("password")} />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              {t("i_signup")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}