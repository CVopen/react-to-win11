import { isExploer } from '@/utils'
import { session } from '@/utils/storage'
import { PayloadAction } from '@reduxjs/toolkit'
import { ReactNode } from 'react'
import { TdesktopS, IWinState, TAppList, IActiveAppList } from './state'

const hideApp = (state: IWinState, name: string) => {
  if (isExploer(name)) {
    state.appListTar[3].hide = false
  }
  if (name === 'Microsoft Edge') {
    state.appListTar[4].hide = false
  }
}

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
  action.payload.app && state.activeAppList.push({ name: state.activeApp, app: action.payload.app, isHide: false })

  hideApp(state, action.payload.name)
}

const changeAppActive = (state: IWinState, action: PayloadAction<string>) => {
  hideApp(state, action.payload)
  state.activeApp = action.payload
}

const changeAppIsHide = (state: IWinState, action: PayloadAction<string | { name: string }>) => {
  let isPrevew = false
  if (typeof action.payload !== 'string') {
    action.payload = action.payload.name
    isPrevew = true
  }

  const item = state.activeAppList.find(({ name }) => name === action.payload)
  if (!item) return

  item.isHide = isPrevew ? false : !item.isHide

  if (!item.isHide) {
    state.activeApp = action.payload
    return
  }

  if (!isExploer(action.payload)) {
    state.activeApp = ''
    return
  }

  const eList = state.activeAppList.reduce((target, item) => {
    if (isExploer(item.name)) target.push(item)
    return target
  }, [] as IActiveAppList[])
  if (eList.length === 1) {
    state.activeApp = ''
  } else {
    const nextExplorerApp = eList.find((item) => !item.isHide)
    state.activeApp = nextExplorerApp ? nextExplorerApp.name : ''
  }
}

const closeApp = (state: IWinState, action: PayloadAction<string>) => {
  state.activeAppList = state.activeAppList.reduce((target, item) => {
    if (item.name !== action.payload) {
      target.push(item)
    } else {
      changeAppIsHide(state, { payload: action.payload, type: 'win/changeAppIsHide' })
    }
    return target
  }, [] as IActiveAppList[])

  if (isExploer(action.payload)) {
    const isExplorerHide = state.activeAppList.reduce((target, item) => {
      if (isExploer(item.name)) target.push(item)
      return target
    }, [] as IActiveAppList[]).length
    if (!isExplorerHide) state.appListTar[3].hide = true
  } else if (action.payload === 'Microsoft Edge') {
    state.appListTar[4].hide = true
  } else {
    state.appListTar = state.appListTar.reduce((target, item) => {
      if (item.name !== action.payload) target.push(item)
      return target
    }, [] as typeof state.appListTar)
  }
}

export default {
  wallunlock,
  changeTheme,
  changeDesktopSize,
  changeAppList,
  changeAppActive,
  changeAppIsHide,
  closeApp,
}
