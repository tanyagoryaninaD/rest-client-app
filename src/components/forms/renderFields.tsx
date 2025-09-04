import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { SignInSignUpValues } from '@/types/authForms';
import type { InputProps } from '@/types/elements/input';
import { getErrorMessage } from '@/utils/getFormFieldErrorMessage';

import Input from '../elements/Input/Input';

interface FormFieldsProps {
  formConfig: InputProps[];
  register?: UseFormRegister<SignInSignUpValues>;
  hookFormErrors?: FieldErrors<SignInSignUpValues>;
}

function FormFields({ register, hookFormErrors, formConfig }: FormFieldsProps) {
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
            placeholder={field.placeholder}
            label={field.label}
            autoFocus={field.autoFocus}
            errorMessage={errorMessage}
          />
        );
      })}
    </>
  );
}

export default FormFields;
