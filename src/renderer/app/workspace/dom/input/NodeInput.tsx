import { Slider, Typography } from '@material-ui/core';
import * as React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { DraggableData } from 'react-draggable';
import { connect, useDispatch } from 'react-redux';
import { stopDragging } from '_/reducers/workspace';
import { RootState } from '_/store/store';

interface NodeInputProps {
  name: string;
  dragging: boolean;
}

const mapState = (state: RootState): Partial<NodeInputProps> => ({
	...state.workspace
});

const NodeInput: React.FC<NodeInputProps> = ({ name, dragging }) => {
  const ref = useRef<HTMLDivElement>(null);

  const mouseUpHandle = () => {
    console.log('mouse up');
  }

	return (
    <div className='input'>
      <div className='float-left -ml-2 h-full'>
        <div 
          ref={ref} 
          className='w-4 h-4 bg-blue-600 border border-gray-700 rounded-full'
          onMouseOver={mouseUpHandle}
        />
      </div>
      <div className='mx-4'>
        <Typography id="discrete-slider-small-steps" className='select-none text-white' gutterBottom>
          { name }
        </Typography>
        <Slider
          defaultValue={0.00000005}
          aria-labelledby="discrete-slider-small-steps"
          step={0.00000001}
          marks
          min={-0.00000005}
          max={0.0000001}
          valueLabelDisplay="auto"
        /> 
      </div>
    </div>
	)
}

export default connect(mapState)(NodeInput);