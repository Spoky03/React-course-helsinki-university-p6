import { createSlice, current } from "@reduxjs/toolkit"


const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'dupsko',
    reducers: {
        handleSetNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return ''
        }
    }
})
export const { handleSetNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch(handleSetNotification(message))
        setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000)
    }
}

export default notificationSlice.reducer