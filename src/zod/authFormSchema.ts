import { z } from 'zod';

import { ZOD_ERRORS } from '@/constants/zodMessages';
import { TypeForm } from '@/types/enums/authForms';

export const authFormValidator = (type: TypeForm) => {
  const baseSchema = z.object({
    email: z.email(ZOD_ERRORS.email.invalid),
    password: z
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/, {
        message: ZOD_ERRORS.password.invalid,
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
            .min(1, ZOD_ERRORS.name.required)
            .regex(/^[A-Z]/, ZOD_ERRORS.name.capitalized),
          age: z
            .number(ZOD_ERRORS.age.required)
            .min(1, ZOD_ERRORS.age.min)
            .max(100, ZOD_ERRORS.age.max),
          confirmPassword: z
            .string()
            .min(1, ZOD_ERRORS.confirmPassword.required),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: ZOD_ERRORS.confirmPassword.mismatch,
          path: ['confirmPassword'],
        });

    default:
      return baseSchema;
  }
};
