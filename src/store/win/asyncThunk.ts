import { createAsyncThunk } from '@reduxjs/toolkit'
import { WritableDraft } from 'immer/dist/internal'

import { IWinState } from './state'

export const bootstrapAsync = createAsyncThunk('app/bootstrap', () => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, 3000)
  })
})

export default {
  [bootstrapAsync.fulfilled.type](state: WritableDraft<IWinState>) {
    state.boot = false
  },
}
