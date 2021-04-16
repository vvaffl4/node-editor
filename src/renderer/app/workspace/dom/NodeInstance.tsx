import { Paper, Slider, Typography } from '@material-ui/core';
import * as React from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { connect, useDispatch } from 'react-redux';
import { move } from '_/reducers/nodes';
import { RootState } from '_/store/store';
import NodeInput from './input/NodeInput';
import NodeOutput from './output/NodeOutput';
import { NodeInstance as NodeInstanceState } from '_/reducers/nodes';
import { selectNodes } from '_/reducers/workspace';

interface NodeInstanceProps extends NodeInstanceState {
	selected: boolean
}

const mapState = (state: RootState, { identifier }: { identifier: string }): NodeInstanceProps => ({
	...state.nodeInstances.byId[identifier],
	selected: state.workspace.selectedNodes.includes(identifier)
});

const NodeInstance: React.FC<NodeInstanceProps> = ({ identifier, name, position, selected, inputs, outputs }) => {
	const dispatch = useDispatch();

	const startDragHandle = (event: DraggableEvent, data: DraggableData) => {
		dispatch(move({ name, position: { x: data.x, y: data.y}}));
	}

	const dragHandle = (event: DraggableEvent, data: DraggableData) => {
		dispatch(move({ name, position: { x: data.x, y: data.y}}));
	}
	
	const stopDragHandle = (event: DraggableEvent, data: DraggableData) => {
		dispatch(move({ name, position: { x: data.x, y: data.y}}));
	}

	const selectHandle = () => {
		dispatch(selectNodes([ name ]));
	}

	console.log(name, selected);

	return (
		<Draggable
			handle='.handle'
			defaultPosition={position}
			position={position}
			grid={[25, 25]}
			scale={1}
			onStart={startDragHandle}
			onDrag={dragHandle}
			onStop={stopDragHandle}
			onMouseDown={selectHandle}
		>
			<Paper 
				className='w-40 border border-transparent'
				elevation={3}
				variant={selected ? 'outlined' : 'elevation'}
			>
				<div 
					className='handle px-4 w-full h-8 bg-indigo-600 rounded-sm text-white text-md leading-8 select-none'
					style={{ textShadow: '0px 1px 2px #000000' }}
				>
					{ name }
				</div>
				<div className='w-full'>
					<ul>
						{
							outputs.map(output => (
								<li key={output.identifier}>
									<NodeOutput parentIdentifier={identifier} {...output}/>
								</li>
							))
						}
						{
							inputs.map(input => (
								<li key={input.identifier}>
									<NodeInput {...input}/>
								</li>
							))
						}
					</ul>
				</div>
			</Paper>
		</Draggable>
	)
}

export default connect(mapState)(NodeInstance);