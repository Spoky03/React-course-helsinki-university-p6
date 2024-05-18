import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// const reducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)
//   switch(action.type) {
//     case 'VOTE': {
//       const id = action.payload.id
//       const anecdoteToChange = state.find(a => a.id === id)
//       const changedAnecdote = {
//         ...anecdoteToChange,
//         votes: anecdoteToChange.votes + 1
//       }
//       return state.map(anecdote =>
//         anecdote.id !== id ? anecdote : changedAnecdote
//       )
//     }
//     case 'NEW': {
//       return [...state, asObject(action.payload.content)]
//     }
//     default:
//       return state
//   }
// }

// export const voteAnecdote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: { id }
//   }
// }
// export const newAnecdote = (content) => {
//   return {
//     type: 'NEW',
//     payload: {
//       id: getId(),
//       content
//     }
//   }
// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const anecdoteToChange = state.find(a => a.id === action.payload)
      anecdoteToChange.votes++
    },
    create(state, action) {
      state.push(action.payload)
    },
    append(state, action) {
      return state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, create, append, setAnecdotes} = anecdoteSlice.actions


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(create(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    await anecdoteService.voteOn(id)
    dispatch(vote(id))
  }
}
export default anecdoteSlice.reducer