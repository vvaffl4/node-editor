import { Graphics } from '@inlet/react-pixi';
import PIXI from 'pixi.js';
import * as React from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '_/store/store';

const StageDragConnection: React.FC = () => {
  const dragging = useSelector((state: RootState) => state.workspace.dragging);
  const startPosition = useSelector((state: RootState) => state.workspace.startPosition);
  const endPosition = useSelector((state: RootState) => state.workspace.dragPosition);

  const draw = useCallback((g: PIXI.Graphics) => {
    const xDelta = (endPosition.x - startPosition.x);

    g.clear();
    g.lineStyle(2, 0xAAAAAA, 1);
    g.moveTo(startPosition.x, startPosition.y);
    g.bezierCurveTo(startPosition.x + xDelta * 0.5, startPosition.y, endPosition.x - xDelta * 0.5, endPosition.y, endPosition.x, endPosition.y);
  }, [startPosition, endPosition]);

  return (
    dragging ? <Graphics draw={draw} /> : null
	)
};

export default StageDragConnection;