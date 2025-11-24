import { z } from "zod";

export const signupSchema = z.object({
  firstname: z.string().min(2, "Họ không được để trống"),
  lastname: z.string().min(2, "Tên không được để trống"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  password: z.string().min(8, "Mật khẩu tối thiểu 6 ký tự")
});

export type SignupSchema = z.infer<typeof signupSchema>;
