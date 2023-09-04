import React, { FC } from 'react';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  small?: boolean;
  type?: 'submit';
}

const Button: FC<ButtonProps> = ({ onClick, label, disabled, small }) => {
  return (
    <button
      className={`disabled:opacity-50 flex items-center justify-center gap-x-3 disabled:cursor-not-allowed rounded-md hover:opacity-90 transition w-full bg-sky-600 text-slate-700 
      ${small ? 'py-1' : 'py-3'}
      ${small ? 'text-sm' : 'text-md'}
      ${small ? 'font-light' : 'font-semibold'}
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {disabled ? (
        <>
          <AiOutlineLoading3Quarters className='animate-spin' />
          Processing...
        </>
      ) : (
        `${label}`
      )}
    </button>
  );
};

export default Button;
