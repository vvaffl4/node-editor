import { Stage } from '@inlet/react-pixi';
import * as React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { connect, ReactReduxContext } from 'react-redux';
import { startDragging } from '_/reducers/workspace';
import ContextBridge from '_/renderer/util/ContextBridge';
import { RootState } from '_/store/store';
import NodeInstance from './dom/NodeInstance';
import StageDragConnection from './stage/StageDragConnection';
import StageGrid from './stage/StageGrid';
import StageInstance from './stage/StageInstance';

interface WorkspaceProps {
  dragging: boolean;
  startDragging: Position;
  endDragging: Position;
  nodes: string[];
}

const mapState = (state: RootState): WorkspaceProps => ({
  dragging: state.workspace.dragging,
  startDragging: state.workspace.startPosition,
  endDragging: state.workspace.dragPosition,
  nodes: state.nodeInstances.allIds
});

const Workspace: React.FC<WorkspaceProps> = ({ dragging, startDragging, endDragging, nodes }) => {
  return (
		<div className='relative w-full h-full bg-gray-800'>
      <StageInstance/>
      <div className='absolute inset-0'>
        {
          nodes.map(node => <NodeInstance key={node} identifier={node}/>)
        }
      </div>
    </div>
  )
}

export default connect(mapState)(Workspace);