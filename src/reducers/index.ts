import { combineReducers } from 'redux'
import workspace from './workspace'
import nodeTypes from './types'
import nodeInstances from './nodes'

const rootReducer = combineReducers({
  workspace,
  nodeTypes,
  nodeInstances
});

export default rootReducer;