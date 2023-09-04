'use client';

import React, { FC } from 'react';

import { useRouter } from 'next/navigation';

import useToken from '@/app/_hooks/useToken';
import useAuthModal from '@/app/_hooks/useAuthModal';

const UserMenu: FC = () => {
  const { onOpen } = useAuthModal();
  const { token, removeToken } = useToken();
  const router = useRouter();

  const logout = () => {
    removeToken();
    localStorage.removeItem('token');
    router.replace('/');
  };

  return (
    <div className='flex flex-1 justify-end'>
      <button
        onClick={!token ? onOpen : logout}
        type='button'
        className='
      rounded-md 
    bg-indigo-50 
      px-2.5 
      py-1.5 
      text-sm 
      font-semibold 
    text-indigo-600 
      shadow-sm 
      transition-colors 
      duration-150 
    hover:bg-indigo-100
    '
      >
        {!token ? 'Log in' : 'Log out'}
      </button>
    </div>
  );
};

export default UserMenu;
