import { Graphics } from '@inlet/react-pixi';
import PIXI from 'pixi.js';
import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '_/store/store';

interface StageGridProps {
  width: number;
  height: number;
  gridWidth: number;
  gridHeight: number;
}

const mapState = (state: RootState): StageGridProps => ({
  width: 500,
  height: 500,
  gridWidth: 25,
  gridHeight: 25
});

const StageGrid: React.FC<StageGridProps> = ({ width, height, gridWidth, gridHeight }) => {
  const draw = React.useCallback((g: PIXI.Graphics) => {

    g.clear();
    g.lineStyle(1, 0x000000, 0.2);
    for (let i = gridWidth; i < width; i += gridWidth) {
      g.moveTo(i, 0);
      g.lineTo(i, height)
    }
    for (let i = gridHeight; i < height; i += gridHeight) {
      g.moveTo(0, i);
      g.lineTo(width, i)
    }
  }, [width, height, gridWidth, gridHeight])

  return (
    <Graphics draw={draw} />
	)
}

export default StageGrid;