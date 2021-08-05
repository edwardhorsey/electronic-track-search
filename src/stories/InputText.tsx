import React from 'react';
import {
  UseFormRegister,
  FieldValues,
  DeepMap,
  FieldErrors,
} from 'react-hook-form';

export interface InputTextProps {
  name: string;
  label: string;
  id: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  errors: DeepMap<FieldValues, FieldErrors>;
  errorMessage?: string;
  required?: boolean;
}

export const InputText = ({
  name,
  label,
  id,
  placeholder,
  errors,
  errorMessage,
  register,
  required = false,
}: InputTextProps): JSX.Element => (
  <div className="flex flex-col mb-2">
    <label htmlFor={id} className="flex flex-col ml-3">
      <span className="pl-1">{label}</span>
      <input
        type="text"
        className="border border-gray-200 p-2 mt-1 mb-1
        rounded-lg appearance-none focus:outline-none
        focus:border-gray-500"
        id={id}
        placeholder={placeholder}
        {...register(name, { required })}
      />
    </label>
    {errors[name]?.type === 'required' && (
      <span className="mb-3 ml-3 pl-1 text-normal text-red-500">
        {errorMessage || `${label} is required`}
      </span>
    )}
  </div>
);
