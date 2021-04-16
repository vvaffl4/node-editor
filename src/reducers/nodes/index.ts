import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NodeParameter {
  identifier: string;
  name: string;
  type: string;
  target?: string;
}

export interface NodeInstance {
  identifier: string;
	name: string;
  position: Position;
  inputs: NodeParameter[];
  outputs: NodeParameter[];
}

const initialState: Table<string, NodeInstance> = {
  byId: {
    'node1': { 
      identifier: 'node1',
      name: 'node1', 
      position: {x: 300, y: 0}, 
      inputs: [
        { 
          identifier: 'string1',
          name: 'String',
          type: 'string'
        },
        { 
          identifier: 'string2',
          name: 'String',
          type: 'string'
        }
      ], 
      outputs: [{ 
        identifier: 'string2',
        name: 'String',
        type: 'string'
      }]
    },
    "node2": {
      identifier: 'node2',
      name: "node2", 
      position: {x: 300, y: 200}, 
      inputs: [{ 
        identifier: 'string1',
        name: 'String',
        type: 'string'
      }], 
      outputs: [{ 
        identifier: 'string2',
        name: 'String',
        type: 'string'
      }]
    }
  },
  allIds: ['node1', 'node2']
};

export const nodeInstanceSlice = createSlice({
  name: 'nodeInstance',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<NodeInstance>) => ({
      byId: {...state.byId, [action.payload.identifier]: action.payload}, 
      allIds: [...state.allIds, action.payload.identifier]
    }),
    remove: (state, action: PayloadAction<NodeInstance>) => {
      const {[action.payload.name]: removed, ...rest} = state.byId;
      
      return {
        byId: rest,
        allIds: state.allIds.filter(id => id !== action.payload.name)
      };
    },
    move: (state, action: PayloadAction<{ name: string, position: Position }>) => ({
      byId: {
        ...state.byId,
        [action.payload.name]: {...state.byId[action.payload.name], position: action.payload.position}
      },
      allIds: state.allIds
    })
  }
})

export const { add, remove, move } = nodeInstanceSlice.actions

export default nodeInstanceSlice.reducer;