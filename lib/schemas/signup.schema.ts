import * as yup from 'yup';

export const signupSchema = yup.object({
  firstname: yup
    .string()
    .required('Họ không được để trống')
    .min(2, 'Họ tối thiểu 2 ký tự'),

  lastname: yup
    .string()
    .required('Tên không được để trống')
    .min(2, 'Tên tối thiểu 2 ký tự'),

  email: yup
    .string()
    .transform((value) => (value === '' ? null : value))
    .nullable()
    .notRequired()
    .email('Email không đúng định dạng')
    .trim()
    .lowercase(),


  phone: yup
    .string()
    .required('Số điện thoại bắt buộc')
    .matches(
      /^(0|\+84)[35789][0-9]{8}$/,
      'Số điện thoại không hợp lệ'
    ),

  password: yup
    .string()
    .required('Mật khẩu bắt buộc')
    .min(6, 'Mật khẩu tối thiểu 6 ký tự'),
});

export type SignupSchema = yup.InferType<typeof signupSchema>;
