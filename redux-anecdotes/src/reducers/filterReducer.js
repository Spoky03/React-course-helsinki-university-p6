import { createSlice, current } from "@reduxjs/toolkit"
// const filterReducer = (state = 'ALL', action) => {
//     switch(action.type) {
//       case 'SET_FILTER': {
//         return action.payload
//       }
//       default:
//         return state
//     }
// }
  

// export const filterAnecdotes = (content) => {
//     return {
//       type: 'SET_FILTER',
//       payload: content
//     }
// }

const filterSlice = createSlice({
    name: 'filter',
    initialState: 'ALL',
    reducers: {
        setFilter(state, action) {
            return action.payload
        }
    }
})


export const { setFilter } = filterSlice.actions
export default filterSlice.reducer