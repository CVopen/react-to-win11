import { session } from '@/utils/storage'
import { PayloadAction } from '@reduxjs/toolkit'
import { IWinState } from './state'

const wallunlock = (state: IWinState) => {
  state.lock = false
  session.setItem('lock', state.lock)
}

const changeTheme = (state: IWinState) => {
  state.theme = state.theme === 'darkTheme' ? 'lightTheme' : 'darkTheme'
  session.setItem('theme', state.theme)
}

export default { wallunlock, changeTheme }
