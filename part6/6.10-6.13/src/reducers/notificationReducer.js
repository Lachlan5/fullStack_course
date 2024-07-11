import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notificationChange(state, action) {
      const notification = action.payload
      state = notification
      return state
    },
    notificationReset(state, action) {
      state = ''
      return state
    }
  }
})

export const { notificationChange, notificationReset } = notificationSlice.actions
export default notificationSlice.reducer