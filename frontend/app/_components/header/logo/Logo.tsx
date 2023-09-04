import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <div className='flex flex-1'>
      <Link
        href='/'
        className='-m-1.5 p-1.5'
      >
        <span className='sr-only'>Your Company</span>
        <Image
          className='h-8 w-auto'
          priority={true}
          src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
          alt='The icon does not exists'
          width={30}
          height={30}
        />
      </Link>
    </div>
  );
};

export default Logo;
