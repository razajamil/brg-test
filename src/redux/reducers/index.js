import { combineReducers } from 'redux'
import createEntityReducers from './entityReducers'

export const rootReducer = combineReducers({
  ...createEntityReducers()
})
