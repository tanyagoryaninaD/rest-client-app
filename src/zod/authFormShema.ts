import { AUTH_ERRORS } from '@/constants/zodMessages';
import { z } from 'zod';

export const singUpShema = z
  .object({
    name: z
      .string()
      .min(1, AUTH_ERRORS.name.required)
      .regex(/^[A-Z]/, AUTH_ERRORS.name.capitalized),
    age: z
      .number(AUTH_ERRORS.age.required)
      .min(1, AUTH_ERRORS.age.min)
      .max(100, AUTH_ERRORS.age.max),
    email: z.email(AUTH_ERRORS.email.invalid),
    password: z
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/, {
        message: AUTH_ERRORS.password.invalid,
      }),
    confirmPassword: z.string().min(1, AUTH_ERRORS.confirmPassword.required),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: AUTH_ERRORS.confirmPassword.missmatch,
    path: ['confirmPassword'],
    when(payload) {
      return singUpShema
        .pick({ password: true, confirmPassword: true })
        .safeParse(payload.value).success;
    },
  });

export const singInSchema = z.object({
  email: z.email(AUTH_ERRORS.email.invalid),
  password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/, {
    message: AUTH_ERRORS.password.invalid,
  }),
});
