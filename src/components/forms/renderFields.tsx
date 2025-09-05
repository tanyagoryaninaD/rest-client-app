import { useTranslations } from 'next-intl';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { SignInSignUpValues } from '@/types/authForms';
import type { InputProps } from '@/types/elements/input';
import type { TypeForm } from '@/types/enums/authForms';
import { getErrorMessage } from '@/utils/getFormFieldErrorMessage';

import Input from '../elements/Input/Input';

interface FormFieldsProps {
  formConfig: InputProps[];
  register?: UseFormRegister<SignInSignUpValues>;
  hookFormErrors?: FieldErrors<SignInSignUpValues>;
  typeForm: TypeForm;
}

function FormFields({
  register,
  hookFormErrors,
  formConfig,
  typeForm,
}: FormFieldsProps) {
  const t = useTranslations('authForms');
  return (
    <>
      {formConfig.map((field) => {
        const errorMessage = getErrorMessage(field.name, hookFormErrors);
        return (
          <Input
            register={register}
            id={field.name}
            key={field.name}
            name={field.name}
            type={field.type}
            label={t(`${typeForm}.fields.${field.name}.label`)}
            placeholder={t(`${typeForm}.fields.${field.name}.placeholder`)}
            autoFocus={field.autoFocus}
            errorMessage={errorMessage}
          />
        );
      })}
    </>
  );
}

export default FormFields;
