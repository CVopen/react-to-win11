import { session } from '@/utils/storage'

export interface IWinState {
  boot: boolean
  lock: boolean
  theme: 'darkTheme' | 'lightTheme'
}

export const initialState: IWinState = {
  boot: true,
  lock: typeof session.getItem('lock') === 'boolean' ? session.getItem('lock') : true,
  theme: session.getItem('theme') || 'darkTheme',
}
