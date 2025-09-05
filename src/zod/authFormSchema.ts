import { useTranslations } from 'next-intl';
import { z } from 'zod';

import { TypeForm } from '@/types/enums/authForms';

export const useAuthFormValidator = (type: TypeForm) => {
  const t = useTranslations('authErrors');
  const baseSchema = z.object({
    email: z.email({ message: t('email.invalid') }),
    password: z
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/, {
        message: t('password.invalid'),
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
            .min(1, { message: t('name.required') })
            .regex(/^[A-Z]/, { message: t('name.capitalized') }),
          confirmPassword: z
            .string()
            .min(1, { message: t('confirmPassword.required') }),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: t('confirmPassword.mismatch'),
          path: ['confirmPassword'],
        });
  }
};
