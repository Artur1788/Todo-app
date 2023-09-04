'use client';

import useModal from '@/app/_hooks/useAuthModal';
import React, { FC, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-hot-toast';

import Input from '../inputs/Input';
import Button from '../button/Button';
import Axios from '@/app/_axios/axios';
import useToken from '@/app/_hooks/useToken';

interface ModalProps {}

export interface FormValues {
  name?: string;
  lastName?: string;
  email: string;
  password: string;
  description?: string;
  status?: string;
}

const Modal: FC<ModalProps> = () => {
  const { isOpen, onClose } = useModal();
  const { setToken } = useToken();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>();

  const handleClose: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const id = (e.target as HTMLDivElement).id;

    if (id === 'wrapper') {
      onClose();
      setIsRegister(false);
      reset();
    }
  };

  const handleIsRegister = () => {
    reset();
    setIsRegister(!isRegister);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setIsLoading(true);
      const {
        data: { token },
      } = await Axios.post(
        `${isRegister ? 'api/user' : 'api/user/login'}`,
        data
      );

      if (!isRegister) {
        toast.success('You have successfully logged in', {
          position: 'top-left',
        });
        setToken(token);
        localStorage.setItem('token', JSON.stringify(token));
      } else {
        toast.success('You have successfully registered', {
          position: 'top-left',
        });
        setIsRegister(!isRegister);
      }

      reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    } finally {
      setIsLoading(false);
      reset();
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      id='wrapper'
      className='fixed inset-0 z-10 flex justify-center items-center bg-slate-700/80'
      onClick={handleClose}
    >
      <div className='w-full relative z-50 md:w-4/6 lg:w-3/6 xl:w-2/6 my-6 mx-auto h-full md:h-auto lg:h-auto rounded-md bg-slate-100 overflow-hidden p-7'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=' '
        >
          <div className='w-full flex justify-end cursor-pointer self-end mb-4'>
            <IoMdClose
              size={18}
              onClick={onClose}
            />
          </div>
          {isRegister && (
            <>
              <Input
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
              <Input
                id='lastName'
                label='LastName'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
            </>
          )}

          <Input
            id='email'
            label='Email'
            type='email'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id='password'
            type='password'
            label='Password'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />

          <Button
            disabled={isLoading}
            label='Submit'
            type='submit'
          />
        </form>
        <hr />
        <div className='flex justify-center items-center my-5 gap-x-3 text-neutral-500'>
          <p>
            {isRegister
              ? 'Already have an account?'
              : "Still don't have an account?"}
          </p>
          <span
            className='hover:underline hover:text-neutral-700 cursor-pointer text-neutral-600'
            onClick={handleIsRegister}
          >
            {isRegister ? 'Login' : 'Register'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
