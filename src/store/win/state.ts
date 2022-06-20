import { session } from '@/utils/storage'

export type desktopS = 'large' | 'middle' | 'small'

export interface IWinState {
  boot: boolean
  lock: boolean
  theme: 'darkTheme' | 'lightTheme'
  desktopSize: desktopS
}

export const initialState: IWinState = {
  boot: true,
  lock: typeof session.getItem('lock') === 'boolean' ? session.getItem('lock') : true,
  theme: session.getItem('theme') || 'darkTheme',
  desktopSize: session.getItem('desktopSize') || 'middle',
}
