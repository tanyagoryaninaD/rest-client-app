import { z } from 'zod';

import { AUTH_ERRORS } from '@/constants/zodMessages';
import { TypeForm } from '@/types/enums/authForms';

export const authFormValidator = (type: TypeForm) => {
  const baseSchema = z.object({
    email: z.email(AUTH_ERRORS.email.invalid),
    password: z
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/, {
        message: AUTH_ERRORS.password.invalid,
      }),
  });

  switch (type) {
    case TypeForm.SignIn:
      return baseSchema;

    case TypeForm.SignUp:
      return baseSchema
        .extend({
          name: z
            .string()
            .min(1, AUTH_ERRORS.name.required)
            .regex(/^[A-Z]/, AUTH_ERRORS.name.capitalized),
          age: z
            .number(AUTH_ERRORS.age.required)
            .min(1, AUTH_ERRORS.age.min)
            .max(100, AUTH_ERRORS.age.max),
          confirmPassword: z
            .string()
            .min(1, AUTH_ERRORS.confirmPassword.required),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: AUTH_ERRORS.confirmPassword.mismatch,
          path: ['confirmPassword'],
        });

    default:
      return baseSchema;
  }
};
