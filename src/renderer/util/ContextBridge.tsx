import * as React from 'react';

interface ContextBridgeProps {
  render: ((children: React.ReactNode) => React.ReactNode);
  Context: React.Context<any>;
  children: React.ReactNode;
}

const ContextBridge: React.FC<ContextBridgeProps> = ({ render, Context, children}) => (
  <Context.Consumer>
    {value =>
      render(<Context.Provider value={value}>{children}</Context.Provider>)
    }
  </Context.Consumer>
);

export default ContextBridge;