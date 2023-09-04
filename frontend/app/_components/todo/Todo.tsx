import React, { FC } from 'react';

import { IoMdClose } from 'react-icons/io';

interface TodoProps {
  name: string;
  description: string;
  status: string;
}

const Todo: FC<TodoProps> = ({ name, description, status }) => {
  return (
    <div className='flex flex-col gap-y-3'>
      <div className='w-full flex justify-end cursor-pointer self-end mb-4'>
        <IoMdClose size={18} />
      </div>
      <article>
        <h4>{name}</h4>
        <p>{description}</p>
        <small>{status}</small>
      </article>
    </div>
  );
};

export default Todo;
