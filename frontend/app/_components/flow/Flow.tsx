import { FC } from 'react';
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Node,
  ReactFlow,
} from 'reactflow';

import 'reactflow/dist/style.css';

interface FlowProps {
  nodes: Node[];
  setNodes: React.Dispatch<
    React.SetStateAction<Node<any, string | undefined>[]>
  >;
  onNodesChange: any;
}

const Flow: FC<FlowProps> = ({ nodes, onNodesChange }) => {
  return (
    <div className='h-[calc(100vh-7rem-180px)] w-full border bg-slate-400/10'>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        // onNodeClick={(e) => console.log(e.target)}
      >
        <Controls />
        <MiniMap />
        <Background
          variant={BackgroundVariant.Dots}
          gap={12}
          size={1}
        />
      </ReactFlow>
    </div>
  );
};

export default Flow;
