import { createSlice } from '@reduxjs/toolkit'

import { initialState } from './state'
import reducers from './reducers'

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: reducers,
})

export default appSlice.reducer
export const { addCount } = appSlice.actions
