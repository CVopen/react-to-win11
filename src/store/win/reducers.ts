import { explorerList } from '@/utils'
import { session } from '@/utils/storage'
import { PayloadAction } from '@reduxjs/toolkit'
import { ReactNode } from 'react'
import { TdesktopS, IWinState, TAppList } from './state'

const wallunlock = (state: IWinState) => {
  state.lock = false
  session.setItem('lock', state.lock)
}

const changeTheme = (state: IWinState) => {
  state.theme = state.theme === 'darkTheme' ? 'lightTheme' : 'darkTheme'
  session.setItem('theme', state.theme)
}

const changeDesktopSize = (state: IWinState, action: PayloadAction<TdesktopS>) => {
  state.desktopSize = action.payload
}

const changeAppList = (state: IWinState, action: PayloadAction<{ info?: TAppList; app?: ReactNode; name: string }>) => {
  action.payload.info && state.appListTar.push(action.payload.info)
  state.activeApp = action.payload.name
  action.payload.app && state.activeAppList.push({ name: state.activeApp, app: action.payload.app })

  if (explorerList.includes(action.payload.name)) {
    state.appListTar[3].hide = false
  }
  if (action.payload.name === 'Microsoft Edge') {
    state.appListTar[4].hide = false
  }
}

const changeAppActive = (state: IWinState, action: PayloadAction<string>) => {
  if (explorerList.includes(action.payload)) {
    state.appListTar[3].hide = false
  }
  if (action.payload === 'Microsoft Edge') {
    state.appListTar[4].hide = false
  }
  state.activeApp = action.payload
}

export default { wallunlock, changeTheme, changeDesktopSize, changeAppList, changeAppActive }
