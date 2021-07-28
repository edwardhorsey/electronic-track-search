import React from 'react';

export interface InputTextProps {
  id: string;
  placeholder: string;
}

export const InputText = ({
  id,
  placeholder,
}: InputTextProps): JSX.Element => (
  <input
    type="text"
    className="border border-gray-200 p-2 mt-1 mb-1
    rounded-lg appearance-none focus:outline-none
    focus:border-gray-500"
    id={id}
    placeholder={placeholder}
  />
);
