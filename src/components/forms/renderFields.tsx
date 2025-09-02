import type { JSX } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { InputProps, SingInSingUpValues } from '@/types/elements/input';
import Input from '../elements/Input/Input';
import { getErrorMessage } from '@/utils/getFormFieldErrorMessage';

type Props = {
  formConfig: InputProps[];
  register?: UseFormRegister<SingInSingUpValues>;
  hookFormErrors?: FieldErrors<SingInSingUpValues>;
};

function FormFields({
  register,
  hookFormErrors,
  formConfig,
}: Props): JSX.Element {
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
