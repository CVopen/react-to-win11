export interface IWinState {
  boot: boolean
  lock: boolean
}

export const initialState: IWinState = {
  boot: true,
  lock: true,
}
