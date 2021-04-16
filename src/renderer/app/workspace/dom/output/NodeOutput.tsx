import { Typography } from '@material-ui/core';
import * as React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import { connect, useDispatch } from 'react-redux';
import { startDragging, drag, stopDragging } from '_/reducers/workspace';
import { RootState } from '_/store/store';

interface NodeOutputProps {
  identifier: string;
  name: string;
  type: string;
  dragging: boolean;
}

const mapState = (state: RootState, { parentIdentifier } : { parentIdentifier: string }): Partial<NodeOutputProps> => ({
	...state.workspace,
  // parentIdentifier: state.nodeInstances.by[parentIdentifier]
});

const NodeOutput: React.FC<NodeOutputProps> = ({ name, dragging }) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [startPosition, setStartPosition] = useState<Position>();
  const [position, setPosition] = useState<Position>();

  const startHandle = (_: any, data: DraggableData) => {
    const absolutePosition = ref.current!.getBoundingClientRect();
    const position = { x: data.x, y: data.y };

    setStartPosition(position);
    setPosition(position);
    dispatch(startDragging({ output: name, position: {x: absolutePosition.x, y: absolutePosition.y - 16 }}));
  }

  const dragHandle = (_: any, data: DraggableData) => {
    const absolutePosition = ref.current!.getBoundingClientRect();
    const position = { x: data.x, y: data.y };

    setPosition(position);
    dispatch(drag({ x: absolutePosition.x, y: absolutePosition.y - 16 }));
  }
  
  const stopHandle = (_: any, data: DraggableData) => {
    setPosition(startPosition);
    dispatch(stopDragging());
  }

	return (
    <div className='output'>
      <div className='float-right -mr-2 h-full'>
        <Draggable
          position={position}
          onStart={startHandle}
          onDrag={dragHandle}
          onStop={stopHandle}
        >
          <div 
            ref={ref} 
            className='w-4 h-4 bg-green-600 border border-gray-700 rounded-full select-none'
            style={dragging ? { pointerEvents: 'none' } : {}}
          />
        </Draggable>
      </div>
      <div className='mx-4'>
        <Typography align='right' className='select-none' gutterBottom>
          { name }
        </Typography>
      </div>
    </div>
	)
}

export default connect(mapState)(NodeOutput);