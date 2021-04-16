import { Graphics } from '@inlet/react-pixi';
import PIXI from 'pixi.js';
import * as React from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '_/store/store';

interface StageConnectionProps {
  sourceIdentifier: string;
  targetIdentifier: string;
}

const StageConnection: React.FC<StageConnectionProps> = ({ sourceIdentifier, targetIdentifier }) => {
  const sourceNode = useSelector((state: RootState) => state.nodeInstances.byId[sourceIdentifier.split('.')[0]]);
  const targetNode = useSelector((state: RootState) => state.nodeInstances.byId[targetIdentifier.split('.')[0]]);

  const draw = useCallback((g: PIXI.Graphics) => {
    const xDelta = (targetNode.position.x - sourceNode.position.x);

    g.clear();
    g.lineStyle(2, 0xAAAAAA, 1);
    g.moveTo(sourceNode.position.x, sourceNode.position.y);
    g.bezierCurveTo(
      sourceNode.position.x + xDelta * 0.5, 
      sourceNode.position.y, 
      targetNode.position.x - xDelta * 0.5, 
      targetNode.position.y, 
      targetNode.position.x, 
      targetNode.position.y);
  }, [sourceNode.position, targetNode.position]);

  return (
    <Graphics draw={draw} />
	)
};

export default StageConnection;