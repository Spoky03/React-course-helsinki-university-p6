import { configureStore } from '@reduxjs/toolkit'

import filterReducer from './reducers/filterReducer'
import {default as anecdoteReducer} from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const store =  configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      filter: filterReducer,
      notification : notificationReducer
    }
  })  

export default store