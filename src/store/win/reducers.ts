import { session } from '@/utils/storage'
import { PayloadAction } from '@reduxjs/toolkit'
import { desktopS, IWinState } from './state'

const wallunlock = (state: IWinState) => {
  state.lock = false
  session.setItem('lock', state.lock)
}

const changeTheme = (state: IWinState) => {
  state.theme = state.theme === 'darkTheme' ? 'lightTheme' : 'darkTheme'
  session.setItem('theme', state.theme)
}

const changeDesktopSize = (state: IWinState, action: PayloadAction<desktopS>) => {
  state.desktopSize = action.payload
}

export default { wallunlock, changeTheme, changeDesktopSize }
