import React, { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormValues } from '../modals/AuthModal';

interface InputProps {
  id: RegisterId;
  label: string;
  disabled?: boolean;
  register?: UseFormRegister<FormValues> | undefined;
  errors?: FieldErrors;
  required?: boolean;
  type?: string;
}

type RegisterId = keyof FormValues;

const Input: FC<InputProps> = ({
  id,
  label,
  disabled,
  type = 'text',
  errors,
  register,
  required,
}) => {
  return (
    <div className='flex flex-col gap-y-1 mb-6'>
      <label
        htmlFor={id}
        className='font-light'
      >
        {label} {required && '*'}
      </label>
      <input
        id={id}
        disabled={disabled}
        placeholder={`Type the ${id}`}
        type={type}
        {...(register && { ...register(id, { required }) })}
        className={`
          w-full
          p-3
          font-light
          bg-white
          border
          rounded-md
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${errors?.[id] ? 'border-red-700' : 'border-neutral-300'}
          ${errors?.[id] ? 'focus:border-rose-700' : 'focus:border-black'}
        `}
      />
    </div>
  );
};

export default Input;
