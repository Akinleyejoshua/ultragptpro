import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { promptReducer } from './features/prompt'

const rootReducer = combineReducers({
  prompt: promptReducer,
})

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    
  })
}
