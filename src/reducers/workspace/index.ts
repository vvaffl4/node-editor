import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Workspace {
  dragging: boolean;
  startPosition: Position;
  dragPosition: Position;
  dragOutput?: string;
  selectedNodes: string[];
}

const initialState: Workspace = {
  dragging: false,
  startPosition: {x: 0, y: 0},
  dragPosition: {x: 0, y: 0},
  selectedNodes: []
};

const startDraggingAction = (state: Workspace, action: PayloadAction<{output: string, position: Position}>): Workspace => ({
  ...state, 
  dragging: true, 
  dragOutput: action.payload.output,
  startPosition: action.payload.position, 
  dragPosition: action.payload.position
});

const dragAction = (state: Workspace, action: PayloadAction<Position>): Workspace => ({ 
  ...state, 
  dragPosition: action.payload
})

const stopDraggingAction = (state: Workspace): Workspace => ({
  ...state, 
  dragging: false,
  dragOutput: undefined
})

const selectNodesAction = (state: Workspace, action: PayloadAction<string[]>): Workspace => ({
  ...state,
  selectedNodes: action.payload
});

const addNodesToSelection = (state: Workspace, action: PayloadAction<string[]>): Workspace => ({
  ...state,
  selectedNodes: [...action.payload]
})

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    startDragging: startDraggingAction,
    drag: dragAction,
    stopDragging: stopDraggingAction,
    selectNodes: selectNodesAction
  }
})

export const { startDragging, drag, stopDragging, selectNodes } = workspaceSlice.actions

export default workspaceSlice.reducer;