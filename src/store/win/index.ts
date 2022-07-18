import { createSlice } from '@reduxjs/toolkit'

import { initialState } from './state'
import reducers from './reducers'
import extraReducers from './asyncThunk'

export const winSlice = createSlice({
  name: 'win',
  initialState,
  reducers: reducers,
  extraReducers,
})

export default winSlice.reducer
export const { wallunlock, changeTheme, changeDesktopSize, changeAppList, changeAppActive, changeAppIsHide, closeApp } =
  winSlice.actions
