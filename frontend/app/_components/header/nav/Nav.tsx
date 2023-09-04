'use client';
import React, { FC } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Nav: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      <div className='flex gap-x-12'>
        <Link
          className={`
              relative
              text-sm 
              font-semibold 
              leading-6 
              after:transition-all
              after:duration-300
              after:content-['']
              after:absolute
              after:bottom-0
              after:left-0
              after:w-0
              after:h-0
              hover:after:w-full
              hover:after:h-[2px]
              ${pathname === '/todos' ? 'text-blue-700' : 'text-gray-900'}
              ${
                pathname === '/todos'
                  ? 'hover:after:bg-blue-700'
                  : 'hover:after:bg-black'
              }
            `}
          href={'/todos'}
        >
          Todos
        </Link>
        <Link
          className={`
              relative
              text-sm 
              font-semibold 
              leading-6 
              after:transition-all
              after:duration-300
              after:content-['']
              after:absolute
              after:bottom-0
              after:left-0
              after:w-0
              after:h-0
              hover:after:w-full
              hover:after:h-[2px]
            ${pathname === '/diagrams' ? 'text-blue-700' : 'text-gray-900'}
            ${
              pathname === '/diagrams'
                ? 'hover:after:bg-blue-700'
                : 'hover:after:bg-black'
            }
            `}
          href={'/'}
        >
          Diagram
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
