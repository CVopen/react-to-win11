import { PayloadAction } from '@reduxjs/toolkit'
import { IWinState } from './state'

const wallunlock = (state: IWinState) => {
  state.lock = false
}

export default { wallunlock }
