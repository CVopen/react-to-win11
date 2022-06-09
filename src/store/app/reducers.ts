import { PayloadAction } from '@reduxjs/toolkit'
import { AppState } from './state'

const addCount = (state: AppState, action: PayloadAction<number>) => {
  state.count += action.payload
}

export default {
  addCount,
}
