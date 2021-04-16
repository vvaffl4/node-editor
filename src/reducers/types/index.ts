import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NodeType {
	name: string;
	argumentIdentifiers: string[];
	bodyIdentifier: string;
	returnIdentifier: string;
	func: string;
}

const initialState: NodeType[] = [];

export const nodeTypeSlice = createSlice({
  name: 'nodeType',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<NodeType>) => [...state, action.payload],
    remove: (state, action: PayloadAction<NodeType>) => state.filter(nodeType => nodeType != action.payload)
  }
})

export const { add, remove } = nodeTypeSlice.actions

export default nodeTypeSlice.reducer;