import { session } from '@/utils/storage'
import { ReactNode } from 'react'

export type TdesktopS = 'large' | 'middle' | 'small'

export interface TAppList {
  src: string
  name?: string
  hide?: boolean
  isRemove?: true
}

export interface IActiveAppList {
  name: string
  app: ReactNode
  isHide: boolean
}
export interface IWinState {
  boot: boolean
  lock: boolean
  theme: 'darkTheme' | 'lightTheme'
  desktopSize: TdesktopS
  appListTar: TAppList[]
  activeApp: string
  activeAppList: IActiveAppList[]
}

export const initialState: IWinState = {
  boot: true,
  lock: typeof session.getItem('lock') === 'boolean' ? session.getItem('lock') : true,
  theme: session.getItem('theme') || 'lightTheme',
  desktopSize: session.getItem('desktopSize') || 'middle',
  appListTar: [
    { src: 'home', hide: true, isRemove: true },
    { src: 'search', hide: true, isRemove: true },
    { src: 'settings', hide: true, isRemove: true },
    { src: 'explorer', hide: true, name: 'explorer', isRemove: true },
    { src: 'edge', hide: true, name: 'Microsoft Edge', isRemove: true },
  ],
  activeApp: '',
  activeAppList: [],
}
