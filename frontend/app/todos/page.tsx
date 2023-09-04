'use client';

import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useNodesState, Node } from 'reactflow';

import Axios from '../_axios/axios';
import useToken from '../_hooks/useToken';
import Flow from '../_components/flow/Flow';
import Button from '../_components/button/Button';
import useAuthModal from '../_hooks/useAuthModal';

interface UserData {
  id: string;
  name: string;
  lastName: string;
  email: string;
}

// need to be changed at all

const Todos = () => {
  const { token } = useToken();
  const onOpen = useAuthModal((state) => state.onOpen);
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Axios.get('api/user/me');

        if (!data) throw new Error('Something went wrong');
        setUserData(data);

        const { data: todos } = await Axios.get('/api/todo');
        if (!todos) throw new Error('Something went wrong');

        const initialNodes: Node[] = todos.map((node: any, idx: number) => {
          return {
            id: node._id,
            connectable: false,
            textUpdater: true,
            type: 'textUpdater',
            position: {
              x: idx * Math.floor(Math.random() * (150 - 50) + 50),
              y: idx * Math.floor(Math.random() * (150 - 50) + 50),
            },
            data: {
              value: 'sadasd',
            },
          };
        });

        setNodes(initialNodes);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error('You have to be authorized');
          onOpen();
          router.replace('/');
        }
      }
    })();
  }, []);

  return (
    <div className='w-full flex flex-col'>
      <div className='w-[200px] text-center self-end mb-3'>
        <Button
          onClick={() => onOpen()}
          label='Create todo'
        />
      </div>
      <Flow
        nodes={nodes}
        setNodes={setNodes}
        onNodesChange={onNodesChange}
      />
    </div>
  );
};

export default Todos;
