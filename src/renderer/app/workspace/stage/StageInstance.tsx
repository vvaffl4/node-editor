import { Stage } from '@inlet/react-pixi';
import * as React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { ReactReduxContext, useSelector } from 'react-redux';
import ContextBridge from '_/renderer/util/ContextBridge';
import { RootState } from '_/store/store';
import StageConnection from './StageConnection';
import StageDragConnection from './StageDragConnection';
import StageGrid from './StageGrid';

const StageInstance: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const nodes = useSelector((state: RootState) => 
    Object.values(state.nodeInstances.byId));

  useEffect(() => {
    const el = ref.current!;
    const resize = () => {
      console.log('resize');
      setSize({ width: el.clientWidth, height: el.clientHeight });
    }
    
    setSize({ width: el.clientWidth, height: el.clientHeight });
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    }
  }, [ref])

  return (
    <div ref={ref} className='absolute inset-0'>
      <ContextBridge
        Context={ReactReduxContext}
        render={children => (
          <Stage width={size.width} height={size.height} options={{ backgroundColor: 0x1f2937, antialias: true }}>{children}</Stage>
        )}
      >
        <StageGrid width={size.width} height={size.height} gridWidth={25} gridHeight={25}/>
        <StageDragConnection/>
        {/* {
          nodes
            .filter(node => node.outputs)
            .map(output => output.outputs.reduce(<StageConnection sourceIdentifier={}/>)
        } */}
      </ContextBridge>
    </div>
  )
}

export default StageInstance;